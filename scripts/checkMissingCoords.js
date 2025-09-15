const fs = require('fs');
const path = require('path');

// 좌표가 없는 파크골프장 확인
function checkMissingCoordinates() {
  try {
    const dataPath = path.join(__dirname, '../public/data/kpga-all-courses.json');
    const data = JSON.parse(fs.readFileSync(dataPath, 'utf8'));
    
    const noCoords = data.filter(course => 
      !course.latitude || 
      !course.longitude || 
      course.latitude === '' || 
      course.longitude === '' ||
      isNaN(parseFloat(course.latitude)) ||
      isNaN(parseFloat(course.longitude))
    );
    
    console.log(`전체 파크골프장: ${data.length}개`);
    console.log(`좌표 없는 파크골프장: ${noCoords.length}개`);
    console.log(`좌표 있는 파크골프장: ${data.length - noCoords.length}개`);
    
    console.log('\n좌표 없는 파크골프장 처음 10개:');
    noCoords.slice(0, 10).forEach((course, index) => {
      console.log(`${index + 1}. ${course.시설명} (${course.주소}) - ${course.지역}`);
    });
    
    // 지역별 통계
    const regionStats = {};
    noCoords.forEach(course => {
      const region = course.지역 || '기타';
      regionStats[region] = (regionStats[region] || 0) + 1;
    });
    
    console.log('\n지역별 좌표 없는 파크골프장:');
    Object.entries(regionStats).forEach(([region, count]) => {
      console.log(`${region}: ${count}개`);
    });
    
    return noCoords;
  } catch (error) {
    console.error('데이터 확인 실패:', error);
    return [];
  }
}

if (require.main === module) {
  checkMissingCoordinates();
}

module.exports = { checkMissingCoordinates };
