'use client';

import { useState, useEffect } from 'react';
import Papa from 'papaparse';
import Map from '@/components/Map';
import CourseModal from '@/components/CourseModal';
import CourseList from '@/components/CourseList';
import WeatherSummary from '@/components/WeatherSummary';
import { ParkGolfCourse } from '@/types/parkgolf';

export default function Home() {
  const [courses, setCourses] = useState<ParkGolfCourse[]>([]);
  const [selectedCourse, setSelectedCourse] = useState<ParkGolfCourse | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState<'map' | 'list'>('map');
  const [searchFilter, setSearchFilter] = useState<string>('all');
  const [filteredCourses, setFilteredCourses] = useState<ParkGolfCourse[]>([]);


  // 지역별 필터링 함수
  const filterCourses = (filter: string, courseList: ParkGolfCourse[]) => {
    if (filter === 'all') {
      return courseList;
    }
    
    return courseList.filter(course => {
      const location = course.위치.toLowerCase();
      
      switch (filter) {
        case 'seoul':
          // 서울시 CSV 파일 기반 필터링 (정확한 12개만)
          const seoulFacilities = [
            '여의도한강 파크골프장',
            '월드컵공원 파크골프장', 
            '서남물재생센터 파크골프장',
            '잠실운동장 파크골프장',
            '중랑천 파크골프장',
            '안양천 파크골프장 (양천)',
            '안양천 파크골프장 (구로①)',
            '안양천 파크골프장 (금천)',
            '안양천 파크골프장 (영등포)',
            '안양천 파크골프장 (구로②)',
            '중랑천 파크골프장 (동대문구)',
            '중랑천 파크골프장 (광진구)'
          ];
          return seoulFacilities.includes(course.시설명);
        case 'incheon':
          return location.includes('남동구') || location.includes('연수구') || 
                 (location.includes('서구') && location.includes('인천'));
        case 'sejong':
          return location.includes('세종특별자치시');
        case 'jeonnam':
          return location.includes('전라남도');
        case 'daegu':
          return location.includes('대구광역시');
        case 'jeonbuk':
          return location.includes('전북특별자치도');
        case 'gyeongnam':
          return location.includes('경상남도');
        case 'gyeongbuk':
          return location.includes('경상북도');
        case 'gangwon':
          return location.includes('강원특별자치도');
        case 'gwangju':
          return (location.includes('서구') && !location.includes('인천')) || 
                 (location.includes('북구') && !location.includes('대구')) || 
                 location.includes('동구') || location.includes('남구') || 
                 location.includes('광산구');
        // 광주광역시 세부 구역
        case 'seo':
          return location.includes('서구') && !location.includes('인천');
        case 'buk':
          return location.includes('북구') && !location.includes('대구');
        case 'dong':
          return location.includes('동구');
        case 'nam':
          return location.includes('남구');
        case 'gwangsan':
          return location.includes('광산구');
        // 대구광역시 세부 구역
        case 'bukgu':
          return location.includes('대구광역시') && location.includes('북구');
        case 'seogu':
          return location.includes('대구광역시') && location.includes('서구');
        case 'donggu':
          return location.includes('대구광역시') && location.includes('동구');
        // 전북특별자치도 세부 시군
        case 'jeonju':
          return location.includes('전주시');
        case 'gunsan':
          return location.includes('군산시');
        case 'iksan':
          return location.includes('익산시');
        case 'jeongeup':
          return location.includes('정읍시');
        case 'namwon':
          return location.includes('남원시');
        case 'wanju':
          return location.includes('완주군');
        // 전라남도 세부 시군
        case 'mokpo':
          return location.includes('목포시');
        case 'yeosu':
          return location.includes('여수시');
        case 'suncheon':
          return location.includes('순천시');
        case 'naju':
          return location.includes('나주시');
        case 'gwangyang':
          return location.includes('광양시');
        // 서울특별시 세부 구
        case 'gangdong':
          return location.includes('강동구');
        case 'mapo':
          return location.includes('마포구');
        case 'gangseo':
          return location.includes('강서구');
        case 'songpa':
          return location.includes('송파구');
        case 'nowon':
          return location.includes('노원구');
        case 'yangcheon':
          return location.includes('양천구');
        case 'guro':
          return location.includes('구로구');
        case 'geumcheon':
          return location.includes('금천구');
        case 'yeongdeungpo':
          return location.includes('영등포');
        case 'dongdaemun':
          return location.includes('동대문구');
        case 'gwangjin':
          return location.includes('광진구');
        // 경상남도 세부 시군
        case 'geochang':
          return location.includes('거창군');
        // 경상북도 세부 시군
        case 'pohang':
          return location.includes('포항시');
        case 'gyeongju':
          return location.includes('경주시');
        case 'gimcheon':
          return location.includes('김천시');
        case 'andong':
          return location.includes('안동시');
        case 'gumi':
          return location.includes('구미시');
        case 'yeongcheon':
          return location.includes('영천시');
        case 'sangju':
          return location.includes('상주시');
        case 'mungyeong':
          return location.includes('문경시');
        case 'gyeongsan':
          return location.includes('경산시');
        case 'uiseong':
          return location.includes('의성군');
        case 'cheongsong':
          return location.includes('청송군');
        case 'yeongyang':
          return location.includes('영양군');
        case 'yeongdeok':
          return location.includes('영덕군');
        case 'cheongdo':
          return location.includes('청도군');
        case 'goryeong':
          return location.includes('고령군');
        case 'seongju':
          return location.includes('성주군');
        case 'chilgok':
          return location.includes('칠곡군');
        case 'yecheon':
          return location.includes('예천군');
        case 'bonghwa':
          return location.includes('봉화군');
        case 'uljin':
          return location.includes('울진군');
        // 강원특별자치도 세부 시군
        case 'chuncheon':
          return location.includes('춘천시');
        case 'wonju':
          return location.includes('원주시');
        case 'gangneung':
          return location.includes('강릉시');
        case 'donghae':
          return location.includes('동해시');
        case 'taebaek':
          return location.includes('태백시');
        case 'sokcho':
          return location.includes('속초시');
        case 'samcheok':
          return location.includes('삼척시');
        case 'hongcheon':
          return location.includes('홍천군');
        case 'hoengseong':
          return location.includes('횡성군');
        case 'yeongwol':
          return location.includes('영월군');
        case 'pyeongchang':
          return location.includes('평창군');
        case 'jeongseon':
          return location.includes('정선군');
        case 'cheorwon':
          return location.includes('철원군');
        case 'hwacheon':
          return location.includes('화천군');
        case 'yanggu':
          return location.includes('양구군');
        case 'inje':
          return location.includes('인제군');
        case 'goseong':
          return location.includes('고성군');
        case 'yangyang':
          return location.includes('양양군');
        default:
          return true;
      }
    });
  };

  // 필터 변경 시 코스 목록 업데이트
  useEffect(() => {
    const filtered = filterCourses(searchFilter, courses);
    setFilteredCourses(filtered);
  }, [searchFilter, courses]);

  useEffect(() => {
    // KPGA 통합 데이터 로드
    const loadCourses = async () => {
      try {
        // 통합된 KPGA 데이터 파일 사용
        const response = await fetch('/data/kpga-all-courses.csv');
        const csvText = await response.text();
        
        await new Promise<void>((resolve) => {
          Papa.parse(csvText, {
            header: true,
            complete: (results) => {
              const rawData = results.data as any[];
              
              // 유효한 데이터만 필터링하고 좌표 변환
              const validCourses = rawData
                .filter(row => row.시설명 && row.시설명.trim())
                .map(row => {
                  // 좌표가 있는 경우만 지도에 표시, 없는 경우는 목록에서만 확인 가능
                  const lat = parseFloat(row.latitude);
                  const lng = parseFloat(row.longitude);
                  
                  return {
                    연번: row.연번 || '',
                    시설명: row.시설명,
                    위치: row.위치 || '',
                    규모: row.규모 || '',
                    홀수: row.홀수 || '',
                    운영기관: row.운영기관 || '',
                    연락처: row.연락처 || '',
                    latitude: isNaN(lat) ? 0 : lat,
                    longitude: isNaN(lng) ? 0 : lng,
                    지역: row.지역 || '',
                  };
                })
                .filter(course => course.시설명); // 시설명이 있는 데이터만
              
              setCourses(validCourses);
              setLoading(false);
              console.log(`KPGA 통합 데이터 로드 완료: ${validCourses.length}개 파크골프장`);
              console.log(`좌표 있음: ${validCourses.filter(c => c.latitude && c.longitude).length}개`);
            },
            error: (error: any) => {
              console.error('KPGA 데이터 로드 실패:', error);
              setLoading(false);
            }
          });
        });
        
      } catch (error) {
        console.error('KPGA 데이터 로드 실패:', error);
        setLoading(false);
      }
    };

    loadCourses();
  }, []);

  const handleMarkerClick = (course: ParkGolfCourse) => {
    setSelectedCourse(course);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedCourse(null);
  };


  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">수도권 파크골프장 데이터를 불러오는 중...</p>
          <p className="text-sm text-gray-500 mt-2">CSV 파일을 로드하고 있습니다.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800 overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
          <div className="text-center">
            <div className="inline-flex items-center justify-center p-2 bg-blue-100 rounded-full mb-4">
              <span className="text-3xl">⛳</span>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-4 tracking-tight">
              전국 파크골프장
              <span className="block text-blue-200">현황 지도</span>
            </h1>
            <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto leading-relaxed">
              전국 424개 파크골프장 정보를 한눈에 확인하고, 
              <br className="hidden sm:block" />
              가까운 파크골프장을 쉽게 찾아보세요
            </p>
            
            {/* 통계 카드 */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-4xl mx-auto mb-8">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                <div className="text-2xl sm:text-3xl font-bold text-white">{courses.length}</div>
                <div className="text-blue-200 text-sm font-medium">총 파크골프장</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                <div className="text-2xl sm:text-3xl font-bold text-white">
                  {courses.filter(c => c.latitude && c.longitude).length}
                </div>
                <div className="text-blue-200 text-sm font-medium">지도 표시</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                <div className="text-2xl sm:text-3xl font-bold text-white">17</div>
                <div className="text-blue-200 text-sm font-medium">시/도</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                <div className="text-2xl sm:text-3xl font-bold text-white">
                  {courses.reduce((total, course) => total + parseInt(course.홀수?.replace('홀', '') || '0'), 0)}
                </div>
                <div className="text-blue-200 text-sm font-medium">총 홀 수</div>
              </div>
            </div>

            {/* 뷰 모드 전환 버튼 */}
            <div className="inline-flex bg-white/10 backdrop-blur-sm rounded-xl p-1 border border-white/20">
              <button
                onClick={() => setViewMode('map')}
                className={`px-6 py-3 rounded-lg text-sm font-semibold transition-all duration-200 ${
                  viewMode === 'map'
                    ? 'bg-white text-blue-700 shadow-lg transform scale-105'
                    : 'text-white hover:bg-white/10'
                }`}
              >
                <span className="mr-2">🗺️</span>
                지도로 보기
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`px-6 py-3 rounded-lg text-sm font-semibold transition-all duration-200 ${
                  viewMode === 'list'
                    ? 'bg-white text-blue-700 shadow-lg transform scale-105'
                    : 'text-white hover:bg-white/10'
                }`}
              >
                <span className="mr-2">📋</span>
                목록으로 보기
              </button>
            </div>
          </div>
        </div>
        
        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/5 rounded-full"></div>
          <div className="absolute -bottom-20 -left-20 w-60 h-60 bg-white/5 rounded-full"></div>
        </div>
      </div>
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* 날씨 정보 섹션 */}
        <WeatherSummary />
        
        {viewMode === 'map' ? (
          <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
            <div className="bg-gradient-to-r from-gray-50 to-blue-50 px-6 py-4 border-b border-gray-100">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-semibold text-gray-900">파크골프장 지도</h2>
                  <p className="text-sm text-gray-600">지도에서 파크골프장 위치를 확인하세요</p>
                </div>
                <div className="hidden sm:flex items-center space-x-2 text-sm text-gray-500">
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-blue-500 rounded-full mr-2"></div>
                    파크골프장
                  </div>
                </div>
              </div>
            </div>
            <div className="h-[500px] sm:h-[600px] lg:h-[700px]">
              <Map courses={courses} onMarkerClick={handleMarkerClick} />
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
            <div className="bg-gradient-to-r from-gray-50 to-green-50 px-6 py-4 border-b border-gray-100">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-semibold text-gray-900">파크골프장 목록</h2>
                  <p className="text-sm text-gray-600">상세 정보와 필터링 기능을 활용하세요</p>
                </div>
                <div className="hidden sm:flex items-center space-x-4 text-sm text-gray-500">
                  <span>{filteredCourses.length}개 표시</span>
                </div>
              </div>
            </div>
            <div className="h-[500px] sm:h-[600px] lg:h-[700px] xl:h-[800px] overflow-y-auto">
              <CourseList 
                courses={filteredCourses} 
                onCourseClick={handleMarkerClick}
                searchFilter={searchFilter}
                onFilterChange={setSearchFilter}
              />
            </div>
          </div>
        )}
      </main>
      
      <CourseModal 
        course={selectedCourse} 
        isOpen={isModalOpen} 
        onClose={handleCloseModal} 
      />
    </div>
  );
}
