const axios = require('axios');
const fs = require('fs');
const path = require('path');

// 카카오 REST API 키
const KAKAO_APP_KEY = 'ef5a4dbdea686edf9ab17e4fe4cfd2d1';

// 대안: 다른 지오코딩 서비스 사용 또는 수동 좌표 매핑
const ALTERNATIVE_GEOCODING = true; // 카카오 API 실패시 대안 사용

// 지오코딩 함수 (카카오 Geocoding API)
async function geocodeAddress(address, retries = 3) {
  try {
    // 주소 정리
    const cleanAddress = address
      .replace(/\(.*?\)/g, '') // 괄호 안 내용 제거
      .replace(/\s+/g, ' ')     // 연속 공백 정리
      .replace(/(\d+)-(\d+)$/, '$1-$2') // 번지 형식 정리
      .trim();

    // 카카오 REST API 시도
    try {
      const response = await axios.get('https://dapi.kakao.com/v2/local/search/address.json', {
        headers: {
          'Authorization': `KakaoAK ${KAKAO_APP_KEY}`
        },
        params: {
          query: cleanAddress
        },
        timeout: 5000
      });

      if (response.data.documents && response.data.documents.length > 0) {
        const result = response.data.documents[0];
        return {
          latitude: parseFloat(result.y),
          longitude: parseFloat(result.x),
          success: true,
          method: 'kakao_api'
        };
      }
    } catch (apiError) {
      console.log(`카카오 API 오류: ${apiError.response?.status || apiError.message}`);
    }

    // 대안 1: OpenStreetMap Nominatim (무료)
    if (ALTERNATIVE_GEOCODING) {
      try {
        const nominatimResponse = await axios.get('https://nominatim.openstreetmap.org/search', {
          params: {
            q: cleanAddress + ', 대한민국',
            format: 'json',
            limit: 1,
            countrycodes: 'kr'
          },
          headers: {
            'User-Agent': 'ParkGolf-Map/1.0'
          },
          timeout: 5000
        });

        if (nominatimResponse.data && nominatimResponse.data.length > 0) {
          const result = nominatimResponse.data[0];
          return {
            latitude: parseFloat(result.lat),
            longitude: parseFloat(result.lon),
            success: true,
            method: 'nominatim'
          };
        }
      } catch (nominatimError) {
        console.log(`Nominatim 오류: ${nominatimError.message}`);
      }

      // 대안 2: 지역명 기반 대략적 좌표
      const regionCoords = getRegionCoordinates(address);
      if (regionCoords) {
        return {
          latitude: regionCoords.lat + (Math.random() - 0.5) * 0.1, // 약간의 랜덤 오프셋
          longitude: regionCoords.lng + (Math.random() - 0.5) * 0.1,
          success: true,
          method: 'region_approx'
        };
      }
    }

    return {
      latitude: null,
      longitude: null,
      success: false,
      method: 'failed'
    };

  } catch (error) {
    if (retries > 0) {
      console.log(`재시도 (${retries}회 남음): ${address}`);
      await new Promise(resolve => setTimeout(resolve, 1000));
      return geocodeAddress(address, retries - 1);
    }
    
    return {
      latitude: null,
      longitude: null,
      success: false,
      method: 'error',
      error: error.message
    };
  }
}

// 지역별 대략적 좌표 (시/도청 위치 기준)
function getRegionCoordinates(address) {
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

  for (const [region, coords] of Object.entries(regionMap)) {
    if (address.includes(region)) {
      return coords;
    }
  }
  return null;
}

// 배치 지오코딩
async function batchGeocodeAll() {
  try {
    console.log('=== 전체 파크골프장 지오코딩 시작 ===');
    
    // 1. 데이터 로드
    const dataPath = path.join(__dirname, '../public/data/kpga-all-courses.json');
    const allCourses = JSON.parse(fs.readFileSync(dataPath, 'utf8'));
    
    console.log(`총 ${allCourses.length}개 파크골프장 지오코딩 시작`);
    
    const results = [];
    let successCount = 0;
    let failCount = 0;
    const methodStats = {};

    // 2. 모든 코스에 대해 지오코딩
    for (let i = 0; i < allCourses.length; i++) {
      const course = allCourses[i];
      const progress = ((i + 1) / allCourses.length * 100).toFixed(1);
      
      console.log(`\n[${i + 1}/${allCourses.length}] (${progress}%) ${course.시설명}`);
      console.log(`주소: ${course.주소}`);
      
      // 기존에 유효한 좌표가 있는지 확인
      const hasValidCoords = course.latitude && course.longitude && 
                            !isNaN(parseFloat(course.latitude)) && 
                            !isNaN(parseFloat(course.longitude)) &&
                            parseFloat(course.latitude) >= 33 && parseFloat(course.latitude) <= 39 &&
                            parseFloat(course.longitude) >= 124 && parseFloat(course.longitude) <= 132;
      
      let geocodeResult;
      
      if (hasValidCoords) {
        // 이미 유효한 좌표가 있으면 사용
        geocodeResult = {
          latitude: parseFloat(course.latitude),
          longitude: parseFloat(course.longitude),
          success: true,
          method: 'existing'
        };
        console.log(`  ✓ 기존 좌표 사용: ${geocodeResult.latitude}, ${geocodeResult.longitude}`);
      } else {
        // 지오코딩 실행
        geocodeResult = await geocodeAddress(course.주소);
        
        if (geocodeResult.success) {
          console.log(`  ✓ ${geocodeResult.method}: ${geocodeResult.latitude}, ${geocodeResult.longitude}`);
        } else {
          console.log(`  ✗ 실패: ${geocodeResult.method}`);
        }
      }
      
      // 결과 저장
      const updatedCourse = {
        ...course,
        latitude: geocodeResult.latitude,
        longitude: geocodeResult.longitude,
        기존매칭: geocodeResult.success ? 
          (geocodeResult.method === 'existing' ? course.기존매칭 : '지오코딩') : 
          course.기존매칭,
        지오코딩방법: geocodeResult.method
      };
      
      results.push(updatedCourse);
      
      // 통계 업데이트
      if (geocodeResult.success) {
        successCount++;
        methodStats[geocodeResult.method] = (methodStats[geocodeResult.method] || 0) + 1;
      } else {
        failCount++;
      }
      
      // API 호출 제한 (500ms 대기)
      if (geocodeResult.method !== 'existing') {
        await new Promise(resolve => setTimeout(resolve, 500));
      }
      
      // 중간 저장 (50개마다)
      if ((i + 1) % 50 === 0) {
        console.log(`\n중간 저장 중... (${i + 1}개 완료)`);
        await saveResults(results, `backup_${i + 1}`);
      }
    }
    
    // 3. 최종 결과 저장
    await saveResults(results);
    
    // 4. 통계 출력
    console.log('\n=== 지오코딩 완료 ===');
    console.log(`총 처리: ${allCourses.length}개`);
    console.log(`성공: ${successCount}개 (${(successCount/allCourses.length*100).toFixed(1)}%)`);
    console.log(`실패: ${failCount}개 (${(failCount/allCourses.length*100).toFixed(1)}%)`);
    console.log('\n방법별 통계:');
    Object.entries(methodStats).forEach(([method, count]) => {
      console.log(`  ${method}: ${count}개`);
    });
    
    return results;
    
  } catch (error) {
    console.error('지오코딩 실패:', error);
    throw error;
  }
}

// 결과 저장
async function saveResults(results, suffix = '') {
  try {
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-').slice(0, 19);
    const baseName = suffix ? `kpga-geocoded-${suffix}` : `kpga-geocoded-${timestamp}`;
    
    // JSON 저장
    const jsonPath = path.join(__dirname, '../public/data', `${baseName}.json`);
    fs.writeFileSync(jsonPath, JSON.stringify(results, null, 2), 'utf8');
    
    // CSV 저장
    const csvPath = path.join(__dirname, '../public/data', `${baseName}.csv`);
    const csvContent = convertToCSV(results);
    fs.writeFileSync(csvPath, csvContent, 'utf8');
    
    // 메인 파일도 업데이트
    if (!suffix) {
      const mainJsonPath = path.join(__dirname, '../public/data/kpga-all-courses.json');
      const mainCsvPath = path.join(__dirname, '../public/data/kpga-all-courses.csv');
      
      fs.writeFileSync(mainJsonPath, JSON.stringify(results, null, 2), 'utf8');
      fs.writeFileSync(mainCsvPath, csvContent, 'utf8');
      
      console.log(`\n메인 파일 업데이트:`);
      console.log(`  JSON: ${mainJsonPath}`);
      console.log(`  CSV: ${mainCsvPath}`);
    }
    
    console.log(`\n파일 저장 완료:`);
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
  console.log('424개 파크골프장 전체 지오코딩을 시작합니다...');
  console.log('예상 소요 시간: 약 3-5분');
  console.log('중간 저장: 50개마다 백업 파일 생성');
  
  batchGeocodeAll()
    .then(() => {
      console.log('\n🎉 모든 지오코딩이 완료되었습니다!');
    })
    .catch(error => {
      console.error('\n❌ 지오코딩 실패:', error);
    });
}

module.exports = {
  batchGeocodeAll,
  geocodeAddress
};
