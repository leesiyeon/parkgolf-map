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

  // 시/도 단위 필터 옵션
  const provinceOptions = [
    { value: 'all', label: '전체' },
    { value: 'seoul', label: '서울특별시' },
    { value: 'incheon', label: '인천광역시' },
    { value: 'sejong', label: '세종특별자치시' },
    { value: 'gwangju', label: '광주광역시' },
    { value: 'daegu', label: '대구광역시' },
    { value: 'jeonnam', label: '전라남도' },
    { value: 'jeonbuk', label: '전북특별자치도' },
    { value: 'gyeongnam', label: '경상남도' },
    { value: 'gyeongbuk', label: '경상북도' },
    { value: 'gangwon', label: '강원특별자치도' }
  ];

  // 시/군/구 단위 필터 옵션 (선택된 시/도에 따라 변경)
  const getCityOptions = (province: string) => {
    switch (province) {
      case 'seoul':
        return [
          { value: 'all', label: '전체 구' },
          { value: 'gangdong', label: '강동구' },
          { value: 'mapo', label: '마포구' },
          { value: 'gangseo', label: '강서구' },
          { value: 'songpa', label: '송파구' },
          { value: 'nowon', label: '노원구' },
          { value: 'yangcheon', label: '양천구' },
          { value: 'guro', label: '구로구' },
          { value: 'geumcheon', label: '금천구' },
          { value: 'yeongdeungpo', label: '영등포구' },
          { value: 'dongdaemun', label: '동대문구' },
          { value: 'gwangjin', label: '광진구' }
        ];
      case 'gwangju':
        return [
          { value: 'all', label: '전체 구' },
          { value: 'seo', label: '서구' },
          { value: 'buk', label: '북구' },
          { value: 'dong', label: '동구' },
          { value: 'nam', label: '남구' },
          { value: 'gwangsan', label: '광산구' }
        ];
      case 'daegu':
        return [
          { value: 'all', label: '전체 구' },
          { value: 'bukgu', label: '북구' },
          { value: 'seogu', label: '서구' },
          { value: 'donggu', label: '동구' }
        ];
      case 'jeonnam':
        return [
          { value: 'all', label: '전체 시/군' },
          { value: 'mokpo', label: '목포시' },
          { value: 'yeosu', label: '여수시' },
          { value: 'suncheon', label: '순천시' },
          { value: 'naju', label: '나주시' },
          { value: 'gwangyang', label: '광양시' }
        ];
      case 'jeonbuk':
        return [
          { value: 'all', label: '전체 시/군' },
          { value: 'jeonju', label: '전주시' },
          { value: 'gunsan', label: '군산시' },
          { value: 'iksan', label: '익산시' },
          { value: 'jeongeup', label: '정읍시' },
          { value: 'namwon', label: '남원시' },
          { value: 'wanju', label: '완주군' }
        ];
      case 'gyeongnam':
        return [
          { value: 'all', label: '전체 시/군' },
          { value: 'geochang', label: '거창군' }
        ];
      case 'gyeongbuk':
        return [
          { value: 'all', label: '전체 시/군' },
          { value: 'pohang', label: '포항시' },
          { value: 'gyeongju', label: '경주시' },
          { value: 'gimcheon', label: '김천시' },
          { value: 'andong', label: '안동시' },
          { value: 'gumi', label: '구미시' },
          { value: 'yeongcheon', label: '영천시' },
          { value: 'sangju', label: '상주시' },
          { value: 'mungyeong', label: '문경시' },
          { value: 'gyeongsan', label: '경산시' },
          { value: 'uiseong', label: '의성군' },
          { value: 'cheongsong', label: '청송군' },
          { value: 'yeongyang', label: '영양군' },
          { value: 'yeongdeok', label: '영덕군' },
          { value: 'cheongdo', label: '청도군' },
          { value: 'goryeong', label: '고령군' },
          { value: 'seongju', label: '성주군' },
          { value: 'chilgok', label: '칠곡군' },
          { value: 'yecheon', label: '예천군' },
          { value: 'bonghwa', label: '봉화군' },
          { value: 'uljin', label: '울진군' }
        ];
      case 'gangwon':
        return [
          { value: 'all', label: '전체 시/군' },
          { value: 'chuncheon', label: '춘천시' },
          { value: 'wonju', label: '원주시' },
          { value: 'gangneung', label: '강릉시' },
          { value: 'donghae', label: '동해시' },
          { value: 'taebaek', label: '태백시' },
          { value: 'sokcho', label: '속초시' },
          { value: 'samcheok', label: '삼척시' },
          { value: 'hongcheon', label: '홍천군' },
          { value: 'hoengseong', label: '횡성군' },
          { value: 'yeongwol', label: '영월군' },
          { value: 'pyeongchang', label: '평창군' },
          { value: 'jeongseon', label: '정선군' },
          { value: 'cheorwon', label: '철원군' },
          { value: 'hwacheon', label: '화천군' },
          { value: 'yanggu', label: '양구군' },
          { value: 'inje', label: '인제군' },
          { value: 'goseong', label: '고성군' },
          { value: 'yangyang', label: '양양군' }
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

    // 텍스트 검색 적용 (시설명, 위치, 홀수, 운영기관, 규모, 연락처 모두 검색)
    if (textSearch.trim()) {
      const searchTerm = textSearch.toLowerCase().trim();
      filtered = filtered.filter(course => 
        course.시설명?.toLowerCase().includes(searchTerm) ||
        course.위치?.toLowerCase().includes(searchTerm) ||
        course.홀수?.toLowerCase().includes(searchTerm) ||
        course.운영기관?.toLowerCase().includes(searchTerm) ||
        course.규모?.toLowerCase().includes(searchTerm) ||
        course.연락처?.toLowerCase().includes(searchTerm)
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
            {selectedProvince !== 'all' && selectedProvince !== 'incheon' && selectedProvince !== 'sejong' && (
              <div className="flex flex-wrap gap-2">
                <span className="text-sm font-medium text-gray-700 self-center mr-2">
                  {selectedProvince === 'jeonnam' || selectedProvince === 'jeonbuk' ? '시/군:' : '구:'}
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
        <div className="mb-4">
          <div className="relative">
            <input
              type="text"
              placeholder="시설명, 위치, 홀수, 운영기관 등으로 검색하세요... (예: 18홀, 마포구, 한강사업본부)"
              value={textSearch}
              onChange={(e) => setTextSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm text-gray-600 placeholder-gray-600"
            />
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            {textSearch && (
              <button
                onClick={() => setTextSearch('')}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
              >
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}
          </div>
        </div>
        
        <div className="space-y-3">
          {filteredCourses.map((course, index) => (
            <div
              key={`${course.연번}-${index}`}
              onClick={() => onCourseClick(course)}
              className="border rounded-lg p-4 hover:bg-gray-50 cursor-pointer transition-colors"
            >
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-semibold text-gray-900 text-sm sm:text-base">
                  {course.시설명}
                </h3>
                <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                  {course.홀수}
                </span>
              </div>
              
              <p className="text-gray-600 text-xs sm:text-sm mb-2">
                📍 {course.위치}
              </p>
              
              <div className="flex flex-wrap gap-2 text-xs text-gray-500">
                <span>📏 {course.규모}</span>
                <span>🏢 {course.운영기관}</span>
                {course.개장일 && (
                  <span>📅 {course.개장일}</span>
                )}
                {course.개장 && (
                  <span>📅 {course.개장}</span>
                )}
                {course.연락처 && (
                  <span>📞 {course.연락처}</span>
                )}
              </div>
            </div>
          ))}
        </div>
        
        {filteredCourses.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            {textSearch ? 
              `"${textSearch}"에 대한 검색 결과가 없습니다.` : 
              '파크골프장 데이터가 없습니다.'
            }
          </div>
        )}
      </div>
    </div>
  );
}
