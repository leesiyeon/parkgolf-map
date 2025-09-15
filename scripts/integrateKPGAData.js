const fs = require('fs');
const path = require('path');

// KPGA 사이트에서 복사한 데이터를 파싱하는 함수
function parseKPGATableData(rawText) {
  const lines = rawText.trim().split('\n');
  const courses = [];
  
  for (const line of lines) {
    // 빈 줄이나 헤더 라인 건너뛰기
    if (!line.trim() || line.includes('지역') || line.includes('파크골프장명')) {
      continue;
    }
    
    // 탭이나 여러 공백으로 구분된 데이터 파싱
    const parts = line.split(/\s{2,}|\t/).filter(part => part.trim());
    
    if (parts.length >= 4) {
      const course = {
        지역: parts[0]?.trim() || '',
        시설명: parts[1]?.trim().replace(/\[|\]/g, '') || '', // 대괄호 제거
        주소: parts[2]?.trim() || '',
        규모: parts[3]?.trim() || '',
        홀수: parts[4]?.trim() || ''
      };
      
      courses.push(course);
    }
  }
  
  return courses;
}

// 기존 CSV 데이터 로드
async function loadExistingCSVData() {
  const csvFiles = [
    '제목 없는 스프레드시트 - 서울특별시_파크골프장 현황_20230508.csv',
    '제목 없는 스프레드시트 - 인천광역시_파크골프장 현황_20250310.csv',
    '제목 없는 스프레드시트 - 전라남도_파크골프장현황_20250227.csv',
    '제목 없는 스프레드시트 - 대구광역시_파크골프장_좌표포함_20250305.csv',
    '제목 없는 스프레드시트 - 전북특별자치도_파크골프장 현황_20250228.csv',
    '제목 없는 스프레드시트 - 광주광역시_파크골프장 현황_좌표포함_20250311.csv',
    '제목 없는 스프레드시트 - 경상남도 거창군_파크골프장_좌표포함_20250801.csv',
    '제목 없는 스프레드시트 - 경상북도_파크골프장_좌표포함_20250310.csv',
    '제목 없는 스프레드시트 - 강원특별자치도_파크골프장_좌표포함_20250307.csv',
    '제목 없는 스프레드시트 - 세종특별자치시_파크골프장_좌표포함_20250314.csv'
  ];
  
  const allData = [];
  
  for (const csvFile of csvFiles) {
    try {
      const filePath = path.join(__dirname, '../public/data', csvFile);
      const csvContent = fs.readFileSync(filePath, 'utf-8');
      const lines = csvContent.split('\n');
      
      if (lines.length > 1) {
        const headers = lines[0].split(',').map(h => h.trim().replace(/"/g, ''));
        
        for (let i = 1; i < lines.length; i++) {
          if (lines[i].trim()) {
            const values = parseCSVLine(lines[i]);
            const row = {};
            headers.forEach((header, index) => {
              row[header] = values[index] || '';
            });
            if (row.시설명) {
              allData.push(row);
            }
          }
        }
      }
    } catch (error) {
      console.error(`CSV 파일 로드 실패: ${csvFile}`, error.message);
    }
  }
  
  return allData;
}

// CSV 라인 파싱 (따옴표 처리)
function parseCSVLine(line) {
  const result = [];
  let current = '';
  let inQuotes = false;
  
  for (let i = 0; i < line.length; i++) {
    const char = line[i];
    
    if (char === '"') {
      if (inQuotes && line[i + 1] === '"') {
        current += '"';
        i++; // 다음 따옴표 건너뛰기
      } else {
        inQuotes = !inQuotes;
      }
    } else if (char === ',' && !inQuotes) {
      result.push(current.trim());
      current = '';
    } else {
      current += char;
    }
  }
  
  result.push(current.trim());
  return result;
}

// 기존 데이터에서 좌표 찾기
function findCoordinatesFromExisting(courseName, existingData) {
  // 정확한 매칭 시도
  let match = existingData.find(item => item.시설명 === courseName);
  
  if (!match) {
    // 부분 매칭 시도
    match = existingData.find(item => 
      item.시설명.includes(courseName) || courseName.includes(item.시설명)
    );
  }
  
  if (!match) {
    // 키워드 기반 매칭
    const courseKeywords = courseName.replace(/파크골프장|골프장/g, '').split(/\s+/);
    match = existingData.find(item => {
      const itemKeywords = item.시설명.replace(/파크골프장|골프장/g, '').split(/\s+/);
      return courseKeywords.some(keyword => 
        keyword.length > 1 && itemKeywords.some(itemKeyword => 
          itemKeyword.includes(keyword) || keyword.includes(itemKeyword)
        )
      );
    });
  }
  
  return match;
}

// 통합 데이터 생성
function mergeKPGAWithExisting(kpgaCourses, existingData) {
  return kpgaCourses.map(course => {
    const existingMatch = findCoordinatesFromExisting(course.시설명, existingData);
    
    return {
      연번: '',
      시설명: course.시설명,
      위치: course.주소,
      규모: course.규모 || existingMatch?.규모 || '',
      홀수: course.홀수 || existingMatch?.홀수 || '',
      운영기관: existingMatch?.운영기관 || '',
      연락처: existingMatch?.연락처 || '',
      latitude: existingMatch?.latitude ? parseFloat(existingMatch.latitude) : null,
      longitude: existingMatch?.longitude ? parseFloat(existingMatch.longitude) : null,
      지역: course.지역,
      주소KPGA: course.주소,
      기존매칭: existingMatch ? '매칭됨' : '신규'
    };
  });
}

// CSV 변환
function convertToCSV(data) {
  if (data.length === 0) return '';
  
  const headers = Object.keys(data[0]);
  const csvRows = [headers.join(',')];
  
  data.forEach(row => {
    const values = headers.map(header => {
      const value = row[header] || '';
      return `"${value.toString().replace(/"/g, '""')}"`;
    });
    csvRows.push(values.join(','));
  });
  
  return csvRows.join('\n');
}

// 메인 처리 함수
async function processKPGAData(rawKPGAText) {
  try {
    console.log('KPGA 데이터 파싱 중...');
    const kpgaCourses = parseKPGATableData(rawKPGAText);
    console.log(`파싱된 KPGA 데이터: ${kpgaCourses.length}개`);
    
    console.log('기존 CSV 데이터 로드 중...');
    const existingData = await loadExistingCSVData();
    console.log(`기존 데이터: ${existingData.length}개`);
    
    console.log('데이터 통합 중...');
    const mergedData = mergeKPGAWithExisting(kpgaCourses, existingData);
    
    // 매칭 통계
    const matchedCount = mergedData.filter(item => item.기존매칭 === '매칭됨').length;
    const newCount = mergedData.filter(item => item.기존매칭 === '신규').length;
    
    console.log(`통합 완료: 총 ${mergedData.length}개 (기존 매칭: ${matchedCount}개, 신규: ${newCount}개)`);
    
    // JSON 저장
    const jsonPath = path.join(__dirname, '../public/data/kpga-integrated.json');
    fs.writeFileSync(jsonPath, JSON.stringify(mergedData, null, 2), 'utf-8');
    console.log(`JSON 저장: ${jsonPath}`);
    
    // CSV 저장
    const csvPath = path.join(__dirname, '../public/data/kpga-integrated.csv');
    const csvContent = convertToCSV(mergedData);
    fs.writeFileSync(csvPath, csvContent, 'utf-8');
    console.log(`CSV 저장: ${csvPath}`);
    
    return mergedData;
    
  } catch (error) {
    console.error('데이터 처리 실패:', error);
    throw error;
  }
}

// 테스트용 샘플 데이터
const sampleKPGAData = `
지역	파크골프장명	주소	규모(㎡)	Hole
전남	고금파크골프장	전라남도 완도군 고금면 농산리 759-1	9
전남	곡성동악파크골프장	전라남도 곡성군 죽동리 체육공원내	18
전남	광양시파크골프장	전라남도 광양시 강변동길 216	18
전남	구례군파크골프장	전라남도 구례군 서시천로 106	9
전남	남악파크골프장	전라남도 무안군 심향읍 남악리 2597	18
`;

// 모듈 export
module.exports = {
  processKPGAData,
  parseKPGATableData,
  loadExistingCSVData,
  mergeKPGAWithExisting
};

// 직접 실행시 테스트
if (require.main === module) {
  console.log('테스트 데이터로 실행 중...');
  processKPGAData(sampleKPGAData)
    .then(() => console.log('테스트 완료'))
    .catch(console.error);
}
