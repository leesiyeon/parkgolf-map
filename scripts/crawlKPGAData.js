const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs');
const path = require('path');

// KPGA 사이트 크롤링 함수
async function crawlKPGAData() {
  const baseUrl = 'http://www.kpga7330.com/info/club.php';
  const allCourses = [];
  const totalPages = 22; // 1페이지부터 22페이지까지

  console.log(`KPGA 파크골프장 데이터 크롤링 시작 (총 ${totalPages}페이지)`);

  for (let page = 1; page <= totalPages; page++) {
    try {
      console.log(`페이지 ${page}/${totalPages} 크롤링 중...`);
      
      const url = page === 1 ? baseUrl : `${baseUrl}?bmode=list&page=${page}`;
      
      const response = await axios.get(url, {
        timeout: 10000,
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
        }
      });

      const $ = cheerio.load(response.data);
      
      // 테이블에서 데이터 추출
      const pageData = extractTableData($);
      allCourses.push(...pageData);
      
      console.log(`페이지 ${page} 완료: ${pageData.length}개 파크골프장 데이터 수집`);
      
      // 서버 부하 방지를 위한 지연 (1초)
      await new Promise(resolve => setTimeout(resolve, 1000));
      
    } catch (error) {
      console.error(`페이지 ${page} 크롤링 실패:`, error.message);
      // 실패해도 계속 진행
      continue;
    }
  }

  console.log(`크롤링 완료: 총 ${allCourses.length}개 파크골프장 데이터 수집`);
  return allCourses;
}

// HTML 테이블에서 데이터 추출
function extractTableData($) {
  const courses = [];
  
  // 테이블 행을 찾아서 데이터 추출
  $('table tr').each((index, element) => {
    const $row = $(element);
    const cells = $row.find('td');
    
    if (cells.length >= 4) {
      // 각 셀에서 텍스트 추출
      const 지역 = $(cells[0]).text().trim();
      const 시설명Raw = $(cells[1]).text().trim();
      const 주소 = $(cells[2]).text().trim();
      const 규모 = $(cells[3]).text().trim();
      const 홀수 = $(cells[4]).text().trim();
      
      // 시설명에서 대괄호 제거 및 정리
      const 시설명 = 시설명Raw.replace(/^\[|\]$/g, '').trim();
      
      // 유효한 데이터인지 확인 (헤더 행이 아닌지)
      if (지역 && 시설명 && 지역 !== '지역' && 시설명 !== '파크골프장명') {
        courses.push({
          지역,
          시설명,
          주소,
          규모,
          홀수,
          latitude: null,
          longitude: null,
          연락처: '',
          운영기관: '',
          기존매칭: '신규'
        });
      }
    }
  });
  
  return courses;
}

// 기존 CSV 데이터와 매칭
async function matchWithExistingData(kpgaCourses) {
  console.log('기존 CSV 데이터와 매칭 중...');
  
  const existingData = await loadExistingCSVData();
  console.log(`기존 데이터: ${existingData.length}개`);
  
  const matchedCourses = kpgaCourses.map(course => {
    const match = findCoordinatesFromExisting(course.시설명, existingData);
    
    if (match) {
      return {
        ...course,
        latitude: parseFloat(match.latitude) || null,
        longitude: parseFloat(match.longitude) || null,
        연락처: match.연락처 || '',
        운영기관: match.운영기관 || '',
        규모: course.규모 || match.규모 || '',
        홀수: course.홀수 || match.홀수 || '',
        기존매칭: '매칭됨'
      };
    }
    
    return course;
  });
  
  const matchedCount = matchedCourses.filter(c => c.기존매칭 === '매칭됨').length;
  console.log(`매칭 완료: ${matchedCount}개 매칭됨, ${kpgaCourses.length - matchedCount}개 신규`);
  
  return matchedCourses;
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
      if (fs.existsSync(filePath)) {
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
      }
    } catch (error) {
      console.error(`CSV 파일 로드 실패: ${csvFile}`, error.message);
    }
  }
  
  return allData;
}

// CSV 라인 파싱
function parseCSVLine(line) {
  const result = [];
  let current = '';
  let inQuotes = false;
  
  for (let i = 0; i < line.length; i++) {
    const char = line[i];
    
    if (char === '"') {
      if (inQuotes && line[i + 1] === '"') {
        current += '"';
        i++;
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

// 좌표 매칭 함수
function findCoordinatesFromExisting(courseName, existingData) {
  // 텍스트 정규화 함수
  const normalize = (text) => {
    return text.replace(/\s+/g, '').toLowerCase()
               .replace(/파크골프장|골프장/g, '')
               .replace(/국제|미니|실내|체육관/g, '');
  };
  
  const normalizedCourseName = normalize(courseName);
  
  // 1. 정확한 매칭
  let match = existingData.find(item => item.시설명 === courseName);
  
  if (!match) {
    // 2. 정규화된 텍스트 매칭
    match = existingData.find(item => 
      normalize(item.시설명) === normalizedCourseName
    );
  }
  
  if (!match) {
    // 3. 부분 매칭 (공백 제거 후)
    match = existingData.find(item => {
      const normalizedItem = normalize(item.시설명);
      return normalizedItem.includes(normalizedCourseName) || 
             normalizedCourseName.includes(normalizedItem);
    });
  }
  
  if (!match) {
    // 4. 키워드 매칭 (핵심 단어만)
    const courseKeywords = courseName.replace(/파크골프장|골프장/g, '')
                                    .replace(/\s+/g, '')
                                    .match(/.{2,}/g) || [];
    
    if (courseKeywords.length > 0) {
      match = existingData.find(item => {
        const itemText = item.시설명.replace(/파크골프장|골프장/g, '').replace(/\s+/g, '');
        return courseKeywords.some(keyword => 
          keyword.length >= 2 && (
            itemText.includes(keyword) || 
            keyword.includes(itemText) ||
            item.시설명.includes(keyword)
          )
        );
      });
    }
  }
  
  return match;
}

// CSV로 저장
function saveToCSV(data, filename) {
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
  
  const csvContent = csvRows.join('\n');
  const outputPath = path.join(__dirname, '../public/data', filename);
  fs.writeFileSync(outputPath, csvContent, 'utf-8');
  console.log(`CSV 파일 저장: ${outputPath}`);
  
  return outputPath;
}

// JSON으로 저장
function saveToJSON(data, filename) {
  const outputPath = path.join(__dirname, '../public/data', filename);
  fs.writeFileSync(outputPath, JSON.stringify(data, null, 2), 'utf-8');
  console.log(`JSON 파일 저장: ${outputPath}`);
  
  return outputPath;
}

// 통계 출력
function printStatistics(data) {
  const total = data.length;
  const withCoordinates = data.filter(c => c.latitude && c.longitude).length;
  const matched = data.filter(c => c.기존매칭 === '매칭됨').length;
  const regions = [...new Set(data.map(c => c.지역))];
  
  console.log('\n=== 크롤링 결과 통계 ===');
  console.log(`총 파크골프장: ${total}개`);
  console.log(`좌표 있음: ${withCoordinates}개 (${(withCoordinates/total*100).toFixed(1)}%)`);
  console.log(`기존 데이터 매칭: ${matched}개 (${(matched/total*100).toFixed(1)}%)`);
  console.log(`지역 수: ${regions.length}개`);
  console.log(`지역별 분포: ${regions.join(', ')}`);
  
  // 지역별 통계
  regions.forEach(region => {
    const count = data.filter(c => c.지역 === region).length;
    console.log(`  ${region}: ${count}개`);
  });
}

// 메인 실행 함수
async function main() {
  try {
    console.log('=== KPGA 파크골프장 데이터 크롤링 시작 ===');
    
    // 1. 크롤링 실행
    const rawData = await crawlKPGAData();
    
    if (rawData.length === 0) {
      console.error('크롤링된 데이터가 없습니다.');
      return;
    }
    
    // 2. 기존 데이터와 매칭
    const matchedData = await matchWithExistingData(rawData);
    
    // 3. 파일 저장
    const csvPath = saveToCSV(matchedData, 'kpga-all-courses.csv');
    const jsonPath = saveToJSON(matchedData, 'kpga-all-courses.json');
    
    // 4. 통계 출력
    printStatistics(matchedData);
    
    console.log('\n=== 크롤링 완료 ===');
    console.log(`CSV 파일: ${csvPath}`);
    console.log(`JSON 파일: ${jsonPath}`);
    
  } catch (error) {
    console.error('크롤링 실패:', error);
  }
}

// 직접 실행
if (require.main === module) {
  main();
}

module.exports = {
  crawlKPGAData,
  matchWithExistingData,
  saveToCSV,
  saveToJSON
};
