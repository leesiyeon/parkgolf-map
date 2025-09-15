// KPGA 사이트에서 복사한 데이터를 파싱하는 유틸리티

export function parseKPGATableData(rawText) {
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
      
      // 시설명에서 링크 텍스트 정리
      if (course.시설명) {
        course.시설명 = course.시설명.replace(/^\[|\]$/g, '');
      }
      
      courses.push(course);
    }
  }
  
  return courses;
}

// 기존 CSV 데이터에서 좌표 정보 찾기
export function findCoordinatesFromExisting(courseName, existingData) {
  // 정확한 매칭 시도
  let match = existingData.find(item => item.시설명 === courseName);
  
  if (!match) {
    // 부분 매칭 시도 (시설명이 포함되어 있는 경우)
    match = existingData.find(item => 
      item.시설명.includes(courseName) || courseName.includes(item.시설명)
    );
  }
  
  if (!match) {
    // 키워드 기반 매칭 (공통 단어가 있는 경우)
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
  
  return match ? {
    latitude: match.latitude,
    longitude: match.longitude,
    기존위치: match.위치,
    연락처: match.연락처 || '',
    운영기관: match.운영기관 || '',
    규모기존: match.규모 || '',
    홀수기존: match.홀수 || ''
  } : null;
}

// 통합된 데이터 생성
export function mergeKPGAWithExisting(kpgaCourses, existingData) {
  return kpgaCourses.map(course => {
    const coordinates = findCoordinatesFromExisting(course.시설명, existingData);
    
    return {
      연번: '',
      시설명: course.시설명,
      위치: course.주소,
      규모: course.규모 || coordinates?.규모기존 || '',
      홀수: course.홀수 || coordinates?.홀수기존 || '',
      운영기관: coordinates?.운영기관 || '',
      연락처: coordinates?.연락처 || '',
      latitude: coordinates?.latitude || null,
      longitude: coordinates?.longitude || null,
      지역: course.지역,
      주소KPGA: course.주소,
      기존매칭: coordinates ? '매칭됨' : '신규'
    };
  });
}

// CSV 형태로 변환
export function convertToCSV(data) {
  if (data.length === 0) return '';
  
  const headers = Object.keys(data[0]);
  const csvRows = [headers.join(',')];
  
  data.forEach(row => {
    const values = headers.map(header => {
      const value = row[header] || '';
      // CSV에서 쉼표와 따옴표 처리
      return `"${value.toString().replace(/"/g, '""')}"`;
    });
    csvRows.push(values.join(','));
  });
  
  return csvRows.join('\n');
}

// JSON 형태로 변환
export function convertToJSON(data) {
  return JSON.stringify(data, null, 2);
}
