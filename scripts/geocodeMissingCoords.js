const axios = require('axios');
const fs = require('fs');
const path = require('path');

// 카카오 REST API 키 (웹 앱키와 다름 - REST API용 키 필요)
// 현재는 웹 앱키만 있으므로 브라우저 환경에서 실행해야 함
const KAKAO_APP_KEY = '0e0864229b42ff2775b3a82802207f66';

// 지오코딩 함수 (카카오 로컬 API 사용)
async function geocodeAddress(address) {
  try {
    // 주소 정리 (불필요한 정보 제거)
    const cleanAddress = address
      .replace(/\(.*?\)/g, '') // 괄호 안 내용 제거
      .replace(/\s+/g, ' ')     // 연속 공백 정리
      .trim();
    
    const response = await axios.get('https://dapi.kakao.com/v2/local/search/address.json', {
      headers: {
        'Authorization': `KakaoAK ${KAKAO_APP_KEY}` // REST API 키 필요
      },
      params: {
        query: cleanAddress
      }
    });
    
    if (response.data.documents && response.data.documents.length > 0) {
      const result = response.data.documents[0];
      const lat = parseFloat(result.y);
      const lng = parseFloat(result.x);
      
      console.log(`✓ ${address} → ${lat}, ${lng}`);
      return { latitude: lat, longitude: lng, success: true };
    } else {
      console.log(`✗ ${address} → 결과 없음`);
      return { latitude: null, longitude: null, success: false };
    }
  } catch (error) {
    console.log(`✗ ${address} → 오류: ${error.response?.status || error.message}`);
    return { latitude: null, longitude: null, success: false, error: error.message };
  }
}

// 배치 지오코딩 (API 호출 제한 고려)
async function batchGeocode(courses) {
  const results = [];
  const total = courses.length;
  
  console.log(`총 ${total}개 주소 지오코딩 시작...`);
  
  for (let i = 0; i < courses.length; i++) {
    const course = courses[i];
    console.log(`\n[${i + 1}/${total}] ${course.시설명}`);
    
    const geocodeResult = await geocodeAddress(course.주소);
    
    const updatedCourse = {
      ...course,
      latitude: geocodeResult.latitude,
      longitude: geocodeResult.longitude,
      기존매칭: geocodeResult.success ? '지오코딩' : course.기존매칭
    };
    
    results.push(updatedCourse);
    
    // API 호출 제한을 위한 지연 (1초)
    await new Promise(resolve => setTimeout(resolve, 1000));
  }
  
  return results;
}

// 메인 함수
async function geocodeMissingCoordinates() {
  try {
    console.log('=== 파크골프장 좌표 지오코딩 시작 ===');
    
    // 1. 기존 데이터 로드
    const dataPath = path.join(__dirname, '../public/data/kpga-all-courses.json');
    const allCourses = JSON.parse(fs.readFileSync(dataPath, 'utf8'));
    
    // 2. 좌표 없는 코스 필터링
    const missingCoords = allCourses.filter(course => 
      !course.latitude || 
      !course.longitude || 
      course.latitude === '' || 
      course.longitude === '' ||
      isNaN(parseFloat(course.latitude)) ||
      isNaN(parseFloat(course.longitude))
    );
    
    console.log(`전체: ${allCourses.length}개, 좌표 없음: ${missingCoords.length}개`);
    
    if (missingCoords.length === 0) {
      console.log('모든 파크골프장에 좌표가 있습니다!');
      return;
    }
    
    // 3. 지오코딩 실행
    const geocodedCourses = await batchGeocode(missingCoords);
    
    // 4. 결과 통합
    const updatedCourses = allCourses.map(course => {
      const geocoded = geocodedCourses.find(gc => gc.시설명 === course.시설명);
      return geocoded || course;
    });
    
    // 5. 통계 계산
    const successCount = geocodedCourses.filter(c => c.latitude && c.longitude).length;
    const failCount = geocodedCourses.length - successCount;
    
    console.log('\n=== 지오코딩 결과 ===');
    console.log(`성공: ${successCount}개`);
    console.log(`실패: ${failCount}개`);
    console.log(`전체 좌표 보유율: ${((allCourses.length - missingCoords.length + successCount) / allCourses.length * 100).toFixed(1)}%`);
    
    // 6. 파일 저장
    const outputJsonPath = path.join(__dirname, '../public/data/kpga-all-courses-geocoded.json');
    fs.writeFileSync(outputJsonPath, JSON.stringify(updatedCourses, null, 2), 'utf8');
    
    // CSV로도 저장
    const csvPath = path.join(__dirname, '../public/data/kpga-all-courses-geocoded.csv');
    const csvContent = convertToCSV(updatedCourses);
    fs.writeFileSync(csvPath, csvContent, 'utf8');
    
    console.log(`\n저장 완료:`);
    console.log(`JSON: ${outputJsonPath}`);
    console.log(`CSV: ${csvPath}`);
    
  } catch (error) {
    console.error('지오코딩 실패:', error);
  }
}

// CSV 변환 함수
function convertToCSV(data) {
  const headers = ['연번', '시설명', '위치', '규모', '홀수', '운영기관', '연락처', 'latitude', 'longitude', '지역', '기존매칭'];
  const csvRows = [headers.join(',')];
  
  data.forEach((row, index) => {
    const values = [
      index + 1,
      `"${row.시설명 || ''}"`,
      `"${row.주소 || ''}"`,
      `"${row.규모 || ''}"`,
      `"${row.홀수 || ''}"`,
      `"${row.운영기관 || ''}"`,
      `"${row.연락처 || ''}"`,
      row.latitude || '',
      row.longitude || '',
      `"${row.지역 || ''}"`,
      `"${row.기존매칭 || '신규'}"`
    ];
    csvRows.push(values.join(','));
  });
  
  return csvRows.join('\n');
}

// 테스트 함수 (소수 개만 먼저 테스트)
async function testGeocode() {
  try {
    console.log('=== 지오코딩 테스트 (5개만) ===');
    
    const dataPath = path.join(__dirname, '../public/data/kpga-all-courses.json');
    const allCourses = JSON.parse(fs.readFileSync(dataPath, 'utf8'));
    
    const missingCoords = allCourses.filter(course => 
      !course.latitude || 
      !course.longitude || 
      isNaN(parseFloat(course.latitude)) ||
      isNaN(parseFloat(course.longitude))
    ).slice(0, 5); // 처음 5개만
    
    console.log(`테스트할 주소 ${missingCoords.length}개:`);
    missingCoords.forEach((course, i) => {
      console.log(`${i + 1}. ${course.시설명} - ${course.주소}`);
    });
    
    const results = await batchGeocode(missingCoords);
    
    console.log('\n=== 테스트 결과 ===');
    results.forEach(result => {
      const status = result.latitude && result.longitude ? '성공' : '실패';
      console.log(`${result.시설명}: ${status} ${result.latitude ? `(${result.latitude}, ${result.longitude})` : ''}`);
    });
    
  } catch (error) {
    console.error('테스트 실패:', error);
  }
}

// 실행
if (require.main === module) {
  // 명령행 인수로 테스트 모드 결정
  const isTest = process.argv.includes('--test');
  
  if (isTest) {
    testGeocode();
  } else {
    geocodeMissingCoordinates();
  }
}

module.exports = {
  geocodeAddress,
  geocodeMissingCoordinates,
  testGeocode
};
