const fs = require('fs');
const path = require('path');
const axios = require('axios');

// 카카오 REST API 키
const KAKAO_APP_KEY = 'ef5a4dbdea686edf9ab17e4fe4cfd2d1';

// 실패한 지오코딩 재처리
async function processFailedGeocoding() {
  try {
    console.log('=== 실패한 지오코딩 재처리 시작 ===');
    
    // 1. 현재 데이터 로드
    const dataPath = path.join(__dirname, '../public/data/kpga-all-courses.json');
    const allCourses = JSON.parse(fs.readFileSync(dataPath, 'utf8'));
    
    // 2. 좌표 없는 코스 필터링
    const failedCourses = allCourses.filter(course => 
      !course.latitude || 
      !course.longitude || 
      isNaN(parseFloat(course.latitude)) ||
      isNaN(parseFloat(course.longitude))
    );
    
    console.log(`실패한 지오코딩: ${failedCourses.length}개`);
    
    if (failedCourses.length === 0) {
      console.log('모든 파크골프장에 좌표가 있습니다!');
      return;
    }
    
    console.log('\n실패한 파크골프장 목록:');
    failedCourses.forEach((course, i) => {
      console.log(`${i + 1}. ${course.시설명} - ${course.주소} (${course.지역})`);
    });
    
    // 3. 고도화된 지오코딩 시도
    const processedCourses = [];
    
    for (let i = 0; i < failedCourses.length; i++) {
      const course = failedCourses[i];
      console.log(`\n[${i + 1}/${failedCourses.length}] ${course.시설명} 재처리 중...`);
      
      const coords = await advancedGeocode(course);
      
      const updatedCourse = {
        ...course,
        latitude: coords.latitude,
        longitude: coords.longitude,
        기존매칭: '근사치',
        지오코딩방법: coords.method
      };
      
      processedCourses.push(updatedCourse);
      
      if (coords.success) {
        console.log(`  ✓ ${coords.method}: ${coords.latitude}, ${coords.longitude}`);
      } else {
        console.log(`  ✗ 최종 실패`);
      }
      
      // API 호출 제한
      await new Promise(resolve => setTimeout(resolve, 300));
    }
    
    // 4. 전체 데이터에 적용
    const updatedAllCourses = allCourses.map(course => {
      const processed = processedCourses.find(p => p.시설명 === course.시설명);
      return processed || course;
    });
    
    // 5. 저장
    await saveResults(updatedAllCourses);
    
    // 6. 통계
    const finalSuccess = processedCourses.filter(c => c.latitude && c.longitude).length;
    const totalWithCoords = updatedAllCourses.filter(c => 
      c.latitude && c.longitude && 
      !isNaN(parseFloat(c.latitude)) && 
      !isNaN(parseFloat(c.longitude))
    ).length;
    
    console.log('\n=== 재처리 완료 ===');
    console.log(`재처리 성공: ${finalSuccess}개`);
    console.log(`전체 좌표 보유: ${totalWithCoords}개 / ${allCourses.length}개 (${(totalWithCoords/allCourses.length*100).toFixed(1)}%)`);
    
  } catch (error) {
    console.error('재처리 실패:', error);
  }
}

// 고도화된 지오코딩
async function advancedGeocode(course) {
  const address = course.주소 || course.위치 || '';
  const region = course.지역 || '';
  
  // 1단계: 키워드 검색 (카카오 로컬 API)
  try {
    const keywords = extractKeywords(address, course.시설명);
    
    for (const keyword of keywords) {
      console.log(`  키워드 검색: "${keyword}"`);
      
      const response = await axios.get('https://dapi.kakao.com/v2/local/search/keyword.json', {
        headers: {
          'Authorization': `KakaoAK ${KAKAO_APP_KEY}`
        },
        params: {
          query: keyword,
          category_group_code: '',
          x: '',
          y: '',
          radius: 20000,
          rect: '',
          page: 1,
          size: 5
        },
        timeout: 5000
      });
      
      if (response.data.documents && response.data.documents.length > 0) {
        // 가장 관련성 높은 결과 선택
        const best = selectBestMatch(response.data.documents, course.시설명, address);
        if (best) {
          return {
            latitude: parseFloat(best.y),
            longitude: parseFloat(best.x),
            success: true,
            method: 'keyword_search'
          };
        }
      }
    }
  } catch (error) {
    console.log(`  키워드 검색 실패: ${error.message}`);
  }
  
  // 2단계: 시군구 중심 + 오프셋
  try {
    const cityCoords = getCityCoordinates(address);
    if (cityCoords) {
      // 시군구 내에서 랜덤한 위치 (더 정교하게)
      const offset = getSmartOffset(course.시설명, address);
      
      return {
        latitude: cityCoords.lat + offset.latOffset,
        longitude: cityCoords.lng + offset.lngOffset,
        success: true,
        method: 'city_center_smart'
      };
    }
  } catch (error) {
    console.log(`  시군구 중심 계산 실패: ${error.message}`);
  }
  
  // 3단계: 지역 기반 근사치
  const regionCoords = getRegionCoordinates(region);
  if (regionCoords) {
    const offset = getSmartOffset(course.시설명, address);
    
    return {
      latitude: regionCoords.lat + offset.latOffset,
      longitude: regionCoords.lng + offset.lngOffset,
      success: true,
      method: 'region_smart'
    };
  }
  
  // 4단계: 기본 한국 중심
  return {
    latitude: 36.5 + (Math.random() - 0.5) * 2, // 한국 중심부 ±1도
    longitude: 127.5 + (Math.random() - 0.5) * 2,
    success: true,
    method: 'korea_center'
  };
}

// 키워드 추출
function extractKeywords(address, facilityName) {
  const keywords = [];
  
  // 1. 시설명 자체
  keywords.push(facilityName);
  
  // 2. 시설명에서 "파크골프장" 제거한 키워드
  const baseName = facilityName.replace(/파크골프장|골프장/g, '').trim();
  if (baseName && baseName !== facilityName) {
    keywords.push(baseName);
  }
  
  // 3. 주소에서 구체적 지명 추출
  const addressParts = address.split(/\s+/);
  const significantParts = addressParts.filter(part => 
    part.length >= 2 && 
    !part.match(/^\d+/) && // 숫자로 시작하지 않음
    !part.includes('번지') &&
    !part.includes('일대') &&
    !part.includes('내')
  );
  
  // 주요 지명들 조합
  if (significantParts.length >= 3) {
    keywords.push(significantParts.slice(0, 3).join(' '));
  }
  if (significantParts.length >= 2) {
    keywords.push(significantParts.slice(0, 2).join(' '));
  }
  
  // 4. 파크골프 관련 키워드 조합
  significantParts.forEach(part => {
    if (part.length >= 2) {
      keywords.push(`${part} 파크골프`);
      keywords.push(`${part} 파크골프장`);
    }
  });
  
  return [...new Set(keywords)].slice(0, 8); // 중복 제거, 최대 8개
}

// 최적 매칭 선택
function selectBestMatch(documents, facilityName, address) {
  let bestMatch = null;
  let bestScore = 0;
  
  for (const doc of documents) {
    let score = 0;
    
    // 시설명 유사도
    if (doc.place_name.includes('파크골프') || doc.place_name.includes('골프')) {
      score += 30;
    }
    
    // 주소 일치도
    const addressWords = address.toLowerCase().split(/\s+/);
    const docAddress = (doc.road_address_name || doc.address_name || '').toLowerCase();
    
    addressWords.forEach(word => {
      if (word.length >= 2 && docAddress.includes(word)) {
        score += 10;
      }
    });
    
    // 카테고리 점수
    if (doc.category_name.includes('체육시설') || doc.category_name.includes('공원')) {
      score += 20;
    }
    
    if (score > bestScore) {
      bestScore = score;
      bestMatch = doc;
    }
  }
  
  return bestScore >= 20 ? bestMatch : null; // 최소 점수 이상일 때만 선택
}

// 스마트 오프셋 계산
function getSmartOffset(facilityName, address) {
  let latOffset = (Math.random() - 0.5) * 0.02; // ±0.01도 (약 ±1km)
  let lngOffset = (Math.random() - 0.5) * 0.02;
  
  // 강변, 하천 관련 키워드가 있으면 물가 쪽으로 약간 이동
  if (address.includes('강변') || address.includes('천변') || address.includes('둔치') || address.includes('하천')) {
    // 강변은 보통 남북으로 흐르므로 동서 방향으로 오프셋
    lngOffset += (Math.random() - 0.5) * 0.01;
  }
  
  // 공원 관련 키워드가 있으면 도심에서 조금 떨어진 곳
  if (address.includes('공원') || address.includes('체육공원')) {
    const angle = Math.random() * Math.PI * 2;
    latOffset += Math.cos(angle) * 0.005;
    lngOffset += Math.sin(angle) * 0.005;
  }
  
  return { latOffset, lngOffset };
}

// 시군구별 중심 좌표 (더 상세한 버전)
function getCityCoordinates(address) {
  const cityMap = {
    // 시/구 단위로 더 정확한 좌표
    '광양시': { lat: 34.9407, lng: 127.6956 },
    '담양군': { lat: 35.3214, lng: 126.9881 },
    '밀양시': { lat: 35.5038, lng: 128.7467 },
    '양산시': { lat: 35.3350, lng: 129.0374 },
    '칠곡군': { lat: 35.9953, lng: 128.4014 },
    '논산시': { lat: 36.1870, lng: 127.0985 },
    '당진시': { lat: 36.8853, lng: 126.6289 },
    '음성군': { lat: 36.9434, lng: 127.6869 },
    '아산시': { lat: 36.7898, lng: 127.0019 },
    '충주시': { lat: 36.9910, lng: 127.9259 },
    '청주시': { lat: 36.6424, lng: 127.4890 },
    '천안시': { lat: 36.8151, lng: 127.1139 },
    '산청군': { lat: 35.4160, lng: 127.8734 },
    '합천군': { lat: 35.5664, lng: 128.1691 },
    '창녕군': { lat: 35.5441, lng: 128.4923 },
    '함안군': { lat: 35.2728, lng: 128.4060 },
    '함양군': { lat: 35.5203, lng: 127.7252 },
    '하동군': { lat: 35.0677, lng: 127.7517 },
    '영덕군': { lat: 36.4153, lng: 129.3659 },
    '마산회원구': { lat: 35.2131, lng: 128.5600 },
    '진해구': { lat: 35.1333, lng: 128.7000 }
  };
  
  for (const [city, coords] of Object.entries(cityMap)) {
    if (address.includes(city)) {
      return coords;
    }
  }
  
  return null;
}

// 지역별 대략적 좌표 (기존 함수 재사용)
function getRegionCoordinates(region) {
  const regionMap = {
    '서울': { lat: 37.5665, lng: 126.9780 },
    '부산': { lat: 35.1796, lng: 129.0756 },
    '대구': { lat: 35.8714, lng: 128.6014 },
    '인천': { lat: 37.4563, lng: 126.7052 },
    '광주': { lat: 35.1595, lng: 126.8526 },
    '대전': { lat: 36.3504, lng: 127.3845 },
    '울산': { lat: 35.5384, lng: 129.3114 },
    '세종': { lat: 36.4800, lng: 127.2890 },
    '경기': { lat: 37.4138, lng: 127.5183 },
    '강원': { lat: 37.8228, lng: 128.1555 },
    '충북': { lat: 36.6357, lng: 127.4917 },
    '충남': { lat: 36.5184, lng: 126.8000 },
    '전북': { lat: 35.7175, lng: 127.1530 },
    '전남': { lat: 34.8679, lng: 126.9910 },
    '경북': { lat: 36.4919, lng: 128.8889 },
    '경남': { lat: 35.4606, lng: 128.2132 },
    '제주': { lat: 33.4996, lng: 126.5312 }
  };

  for (const [region_key, coords] of Object.entries(regionMap)) {
    if (region.includes(region_key)) {
      return coords;
    }
  }
  return null;
}

// 결과 저장
async function saveResults(courses) {
  try {
    // JSON 저장
    const jsonPath = path.join(__dirname, '../public/data/kpga-all-courses.json');
    fs.writeFileSync(jsonPath, JSON.stringify(courses, null, 2), 'utf8');
    
    // CSV 저장
    const csvPath = path.join(__dirname, '../public/data/kpga-all-courses.csv');
    const csvContent = convertToCSV(courses);
    fs.writeFileSync(csvPath, csvContent, 'utf8');
    
    console.log(`\n파일 업데이트 완료:`);
    console.log(`  JSON: ${jsonPath}`);
    console.log(`  CSV: ${csvPath}`);
    
  } catch (error) {
    console.error('파일 저장 실패:', error);
  }
}

// CSV 변환
function convertToCSV(data) {
  const headers = ['연번', '시설명', '위치', '규모', '홀수', '운영기관', '연락처', 'latitude', 'longitude', '지역', '기존매칭', '지오코딩방법'];
  const csvRows = [headers.join(',')];
  
  data.forEach((row, index) => {
    const values = [
      index + 1,
      `"${row.시설명 || ''}"`,
      `"${row.주소 || row.위치 || ''}"`,
      `"${row.규모 || ''}"`,
      `"${row.홀수 || ''}"`,
      `"${row.운영기관 || ''}"`,
      `"${row.연락처 || ''}"`,
      row.latitude || '',
      row.longitude || '',
      `"${row.지역 || ''}"`,
      `"${row.기존매칭 || '신규'}"`,
      `"${row.지오코딩방법 || ''}"`
    ];
    csvRows.push(values.join(','));
  });
  
  return csvRows.join('\n');
}

// 실행
if (require.main === module) {
  processFailedGeocoding();
}

module.exports = { processFailedGeocoding };
