'use client';

import { useState } from 'react';
import { ParkGolfCourse } from '@/types/parkgolf';

interface CourseListProps {
  courses: ParkGolfCourse[];
  onCourseClick: (course: ParkGolfCourse) => void;
  searchFilter: string;
  onFilterChange: (filter: string) => void;
}

export default function CourseList({ courses, onCourseClick, searchFilter, onFilterChange }: CourseListProps) {
  const [selectedProvince, setSelectedProvince] = useState<string>('all');
  const [selectedCity, setSelectedCity] = useState<string>('all');
  const [textSearch, setTextSearch] = useState<string>('');

  // 검색어 하이라이트 함수
  const highlightText = (text: string, searchTerm: string) => {
    if (!searchTerm.trim() || !text) return text;
    
    const regex = new RegExp(`(${searchTerm.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
    const parts = text.split(regex);
    
    return parts.map((part, index) => 
      regex.test(part) ? 
        <mark key={index} className="bg-yellow-200 px-1 rounded">{part}</mark> : 
        part
    );
  };

  // 시/도 단위 필터 옵션 (실제 데이터 기반)
  const provinceOptions = [
    { value: 'all', label: '전체' },
    { value: 'gyeongnam', label: '경상남도 (68개)' },
    { value: 'gyeongbuk', label: '경상북도 (62개)' },
    { value: 'gyeonggi', label: '경기도 (43개)' },
    { value: 'gangwon', label: '강원특별자치도 (37개)' },
    { value: 'jeonnam', label: '전라남도 (36개)' },
    { value: 'daegu', label: '대구광역시 (33개)' },
    { value: 'chungnam', label: '충청남도 (32개)' },
    { value: 'seoul', label: '서울특별시 (25개)' },
    { value: 'jeonbuk', label: '전북특별자치도 (22개)' },
    { value: 'chungbuk', label: '충청북도 (18개)' },
    { value: 'busan', label: '부산광역시 (10개)' },
    { value: 'gwangju', label: '광주광역시 (9개)' },
    { value: 'ulsan', label: '울산광역시 (7개)' },
    { value: 'sejong', label: '세종특별자치시 (7개)' },
    { value: 'jeju', label: '제주특별자치도 (6개)' },
    { value: 'incheon', label: '인천광역시 (5개)' },
    { value: 'daejeon', label: '대전광역시 (4개)' }
  ];

  // 시/군/구 단위 필터 옵션 (실제 데이터 기반)
  const getCityOptions = (province: string) => {
    switch (province) {
      case 'gyeonggi':
        return [
          { value: 'all', label: '전체 시/군' },
          { value: '고양시', label: '고양시 (4개)' },
          { value: '남양주시', label: '남양주시 (3개)' },
          { value: '하남시', label: '하남시 (3개)' },
          { value: '양평군', label: '양평군 (3개)' },
          { value: '용인시', label: '용인시 (3개)' },
          { value: '파주시', label: '파주시 (3개)' },
          { value: '가평군', label: '가평군 (2개)' },
          { value: '동두천시', label: '동두천시 (2개)' },
          { value: '시흥시', label: '시흥시 (2개)' },
          { value: '연천군', label: '연천군 (2개)' },
          { value: '이천시', label: '이천시 (2개)' },
          { value: '포천시', label: '포천시 (2개)' },
          { value: '광주시', label: '광주시 (1개)' },
          { value: '구리시', label: '구리시 (1개)' },
          { value: '군포시', label: '군포시 (1개)' },
          { value: '김포시', label: '김포시 (1개)' },
          { value: '성남시', label: '성남시 (1개)' },
          { value: '수원시', label: '수원시 (1개)' },
          { value: '안산시', label: '안산시 (1개)' },
          { value: '양주시', label: '양주시 (1개)' },
          { value: '여주시', label: '여주시 (1개)' },
          { value: '의정부시', label: '의정부시 (1개)' },
          { value: '평택시', label: '평택시 (1개)' },
          { value: '화성시', label: '화성시 (1개)' }
        ];
      case 'seoul':
        return [
          { value: 'all', label: '전체 구' },
          { value: '마포구', label: '마포구 (3개)' },
          { value: '도봉구', label: '도봉구 (2개)' },
          { value: '성동구', label: '성동구 (2개)' },
          { value: '양천구', label: '양천구 (2개)' },
          { value: '구로구', label: '구로구 (2개)' },
          { value: '영등포구', label: '영등포구 (2개)' },
          { value: '노원구', label: '노원구 (2개)' },
          { value: '관악구', label: '관악구 (1개)' },
          { value: '동작구', label: '동작구 (1개)' },
          { value: '강서구', label: '강서구 (1개)' },
          { value: '금천구', label: '금천구 (1개)' },
          { value: '송파구', label: '송파구 (1개)' },
          { value: '중랑구', label: '중랑구 (1개)' },
          { value: '광진구', label: '광진구 (1개)' },
          { value: '동대문구', label: '동대문구 (1개)' }
        ];
      case 'busan':
        return [
          { value: 'all', label: '전체 구/군' },
          { value: '강서구', label: '강서구 (4개)' },
          { value: '사상구', label: '사상구 (3개)' },
          { value: '기장군', label: '기장군 (1개)' },
          { value: '금정구', label: '금정구 (1개)' },
          { value: '북구', label: '북구 (1개)' }
        ];
      case 'daegu':
        return [
          { value: 'all', label: '전체 구/군' },
          { value: '달성군', label: '달성군 (14개)' },
          { value: '군위군', label: '군위군 (6개)' },
          { value: '동구', label: '동구 (3개)' },
          { value: '달서구', label: '달서구 (2개)' },
          { value: '북구', label: '북구 (2개)' },
          { value: '서구', label: '서구 (2개)' },
          { value: '수성구', label: '수성구 (2개)' },
          { value: '남구', label: '남구 (1개)' }
        ];
      case 'gwangju':
        return [
          { value: 'all', label: '전체 구' },
          { value: '서구', label: '서구' },
          { value: '북구', label: '북구' },
          { value: '동구', label: '동구' },
          { value: '남구', label: '남구' },
          { value: '광산구', label: '광산구' }
        ];
      case 'daejeon':
        return [
          { value: 'all', label: '전체 구' },
          { value: '서구', label: '서구' },
          { value: '중구', label: '중구' },
          { value: '유성구', label: '유성구' },
          { value: '대덕구', label: '대덕구' }
        ];
      case 'ulsan':
        return [
          { value: 'all', label: '전체 구/군' },
          { value: '동구', label: '동구' },
          { value: '북구', label: '북구' },
          { value: '울주군', label: '울주군' }
        ];
      case 'incheon':
        return [
          { value: 'all', label: '전체 구/군' },
          { value: '연수구', label: '연수구' },
          { value: '중구', label: '중구' },
          { value: '남동구', label: '남동구' }
        ];
      default:
        return [{ value: 'all', label: '전체' }];
    }
  };

  // 필터 변경 핸들러
  const handleProvinceChange = (province: string) => {
    setSelectedProvince(province);
    setSelectedCity('all');
    
    if (province === 'all') {
      onFilterChange('all');
    } else {
      onFilterChange(province);
    }
  };

  const handleCityChange = (city: string) => {
    setSelectedCity(city);
    
    if (city === 'all') {
      onFilterChange(selectedProvince);
    } else {
      onFilterChange(city);
    }
  };

  // 텍스트 검색과 지역 필터를 모두 적용한 필터링된 코스 목록
  const getFilteredCourses = () => {
    let filtered = courses;

    // 지역 필터 적용
    if (selectedProvince !== 'all') {
      // 시/도 필터
      const regionMap: { [key: string]: string } = {
        'gyeonggi': '경기',
        'seoul': '서울', 
        'busan': '부산',
        'daegu': '대구',
        'gwangju': '광주',
        'daejeon': '대전',
        'ulsan': '울산',
        'incheon': '인천',
        'sejong': '세종',
        'gyeongnam': '경남',
        'gyeongbuk': '경북',
        'jeonnam': '전남',
        'jeonbuk': '전북',
        'chungnam': '충남',
        'chungbuk': '충북',
        'gangwon': '강원',
        'jeju': '제주'
      };
      
      const targetRegion = regionMap[selectedProvince];
      if (targetRegion) {
        filtered = filtered.filter(course => course.지역 === targetRegion);
      }
      
      // 시/군/구 필터 
      if (selectedCity !== 'all') {
        filtered = filtered.filter(course => 
          course.주소?.includes(selectedCity) || course.위치?.includes(selectedCity)
        );
      }
    }

    // 텍스트 검색 적용 (시설명, 위치, 홀수, 운영기관, 규모, 연락처, 지역, 주소 모두 검색)
    if (textSearch.trim()) {
      const searchTerm = textSearch.toLowerCase().trim();
      filtered = filtered.filter(course => 
        course.시설명?.toLowerCase().includes(searchTerm) ||
        course.위치?.toLowerCase().includes(searchTerm) ||
        course.홀수?.toLowerCase().includes(searchTerm) ||
        course.운영기관?.toLowerCase().includes(searchTerm) ||
        course.규모?.toLowerCase().includes(searchTerm) ||
        course.연락처?.toLowerCase().includes(searchTerm) ||
        course.지역?.toLowerCase().includes(searchTerm) ||
        course.주소?.toLowerCase().includes(searchTerm)
      );
    }

    return filtered;
  };

  const filteredCourses = getFilteredCourses();

  return (
    <div className="bg-white rounded-lg shadow-sm border">
      <div className="p-4 sm:p-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-3">
          <h2 className="text-lg sm:text-xl font-bold text-gray-900">
            파크골프장 목록 ({filteredCourses.length}개)
            {textSearch && <span className="text-sm text-gray-500 font-normal ml-2">(검색: "{textSearch}")</span>}
          </h2>
          
          {/* 계층형 지역 필터 */}
          <div className="flex flex-col gap-3">
            {/* 1단계: 시/도 선택 */}
            <div className="flex flex-wrap gap-2">
              <span className="text-sm font-medium text-gray-700 self-center mr-2">시/도:</span>
              {provinceOptions.map((option) => (
                <button
                  key={option.value}
                  onClick={() => handleProvinceChange(option.value)}
                  className={`px-3 py-1 rounded-full text-sm transition-colors ${
                    selectedProvince === option.value
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
            
            {/* 2단계: 시/군/구 선택 (시/도가 선택된 경우에만 표시) */}
            {selectedProvince !== 'all' && selectedProvince !== 'sejong' && selectedProvince !== 'jeju' && (
              <div className="flex flex-wrap gap-2">
                <span className="text-sm font-medium text-gray-700 self-center mr-2">
                  {selectedProvince === 'gyeonggi' || selectedProvince === 'jeonnam' || selectedProvince === 'jeonbuk' || selectedProvince === 'chungnam' || selectedProvince === 'chungbuk' || selectedProvince === 'gyeongnam' || selectedProvince === 'gyeongbuk' || selectedProvince === 'gangwon' ? '시/군:' : '구:'}
                </span>
                {getCityOptions(selectedProvince).map((option) => (
                  <button
                    key={option.value}
                    onClick={() => handleCityChange(option.value)}
                    className={`px-3 py-1 rounded-full text-sm transition-colors ${
                      selectedCity === option.value
                        ? 'bg-green-600 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* 텍스트 검색 입력 필드 */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            🔍 파크골프장 검색
          </label>
          <div className="relative">
            <input
              type="text"
              placeholder="시설명, 지역, 홀수, 운영기관 등으로 검색하세요... (예: 18홀, 마포구, 한강사업본부, 경기도)"
              value={textSearch}
              onChange={(e) => setTextSearch(e.target.value)}
              className="w-full pl-10 pr-12 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm placeholder-gray-500 transition-colors"
            />
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            {textSearch && (
              <button
                onClick={() => setTextSearch('')}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 transition-colors"
                title="검색어 지우기"
              >
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}
          </div>
          {textSearch && (
            <div className="mt-2 text-sm text-gray-600">
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                "{textSearch}" 검색 중
              </span>
            </div>
          )}
        </div>
        
        <div className="space-y-3">
          {filteredCourses.map((course, index) => (
            <div
              key={`${course.연번}-${index}`}
              onClick={() => onCourseClick(course)}
              className="group bg-white border border-gray-200 rounded-xl p-5 hover:border-blue-300 hover:shadow-lg cursor-pointer transition-all duration-200 hover:transform hover:scale-[1.02]"
            >
              <div className="flex justify-between items-start mb-3">
                <h3 className="font-semibold text-gray-900 text-sm sm:text-base group-hover:text-blue-700 transition-colors">
                  {highlightText(course.시설명, textSearch)}
                </h3>
                <div className="flex items-center space-x-2">
                  <span className="text-xs bg-gradient-to-r from-blue-500 to-blue-600 text-white px-3 py-1 rounded-full flex-shrink-0 font-medium">
                    {highlightText(course.홀수 || '', textSearch)}
                  </span>
                  {course.latitude && course.longitude && (
                    <div className="w-2 h-2 bg-green-500 rounded-full" title="지도에 표시됨"></div>
                  )}
                </div>
              </div>
              
              <div className="flex items-start mb-3">
                <span className="text-blue-500 mr-2 mt-0.5">📍</span>
                <p className="text-gray-700 text-xs sm:text-sm leading-relaxed">
                  {highlightText(course.위치, textSearch)}
                </p>
              </div>
              
              <div className="grid grid-cols-2 gap-3 text-xs">
                {course.규모 && (
                  <div className="flex items-center text-gray-600">
                    <span className="mr-1">📏</span>
                    {highlightText(course.규모, textSearch)}
                  </div>
                )}
                {course.운영기관 && (
                  <div className="flex items-center text-gray-600">
                    <span className="mr-1">🏢</span>
                    {highlightText(course.운영기관, textSearch)}
                  </div>
                )}
                {course.지역 && (
                  <div className="flex items-center text-gray-600">
                    <span className="mr-1">🌍</span>
                    {highlightText(course.지역, textSearch)}
                  </div>
                )}
                {course.연락처 && (
                  <div className="flex items-center text-gray-600">
                    <span className="mr-1">📞</span>
                    {highlightText(course.연락처, textSearch)}
                  </div>
                )}
              </div>
              
              {(course.개장일 || course.개장) && (
                <div className="mt-3 pt-3 border-t border-gray-100">
                  <div className="flex items-center text-xs text-gray-500">
                    <span className="mr-1">📅</span>
                    개장: {highlightText(course.개장일 || course.개장 || '', textSearch)}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
        
        {filteredCourses.length === 0 && (
          <div className="text-center py-12 text-gray-500">
            {textSearch ? (
              <div>
                <div className="text-lg mb-2">🔍</div>
                <div className="text-base mb-3">"{textSearch}"에 대한 검색 결과가 없습니다.</div>
                <div className="text-sm space-y-1">
                  <p>검색 팁:</p>
                  <ul className="text-xs space-y-1 mt-2">
                    <li>• 간단한 키워드로 검색해보세요 (예: "18홀", "서울", "한강")</li>
                    <li>• 지역명으로 검색해보세요 (예: "마포구", "경기도")</li>
                    <li>• 홀수로 검색해보세요 (예: "9홀", "18홀", "36홀")</li>
                  </ul>
                </div>
                <button
                  onClick={() => setTextSearch('')}
                  className="mt-4 px-4 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition-colors"
                >
                  검색 초기화
                </button>
              </div>
            ) : (
              <div>
                <div className="text-lg mb-2">📋</div>
                <div>파크골프장 데이터가 없습니다.</div>
              </div>
            )}
          </div>
        )}
        
        {/* 검색 도움말 */}
        {!textSearch && filteredCourses.length > 0 && (
          <div className="mt-6 p-4 bg-blue-50 rounded-lg">
            <h4 className="font-semibold text-blue-900 mb-2">💡 검색 도움말</h4>
            <div className="text-sm text-blue-800 space-y-1">
              <p>• <strong>지역 검색</strong>: "서울", "경기도", "마포구", "강남구" 등</p>
              <p>• <strong>홀수 검색</strong>: "9홀", "18홀", "36홀" 등</p>
              <p>• <strong>시설명 검색</strong>: "한강", "올림픽", "체육공원" 등</p>
              <p>• <strong>운영기관</strong>: "한강사업본부", "시청", "구청" 등</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
