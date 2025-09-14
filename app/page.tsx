'use client';

import { useState, useEffect } from 'react';
import Papa from 'papaparse';
import Map from '@/components/Map';
import CourseModal from '@/components/CourseModal';
import CourseList from '@/components/CourseList';
import { ParkGolfCourse } from '@/types/parkgolf';

export default function Home() {
  const [courses, setCourses] = useState<ParkGolfCourse[]>([]);
  const [selectedCourse, setSelectedCourse] = useState<ParkGolfCourse | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState<'map' | 'list'>('map');
  const [searchFilter, setSearchFilter] = useState<string>('all');
  const [filteredCourses, setFilteredCourses] = useState<ParkGolfCourse[]>([]);

  // CSV 데이터 파싱 함수
  const parseCourseData = (row: any): ParkGolfCourse => {
    const lat = parseFloat(row.latitude);
    const lng = parseFloat(row.longitude);
    
    return {
      ...row,
      latitude: lat,
      longitude: lng
    };
  };

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
    // 다중 CSV 파일 로드 (좌표 포함)
    const loadCourses = async () => {
      try {
        const csvFiles = [
          '/data/제목 없는 스프레드시트 - 서울특별시_파크골프장 현황_20230508.csv',
          '/data/제목 없는 스프레드시트 - 인천광역시_파크골프장 현황_20250310.csv',
          '/data/제목 없는 스프레드시트 - 전라남도_파크골프장현황_20250227.csv',
          '/data/제목 없는 스프레드시트 - 대구광역시_파크골프장_좌표포함_20250305.csv',
          '/data/제목 없는 스프레드시트 - 전북특별자치도_파크골프장 현황_20250228.csv',
          '/data/제목 없는 스프레드시트 - 광주광역시_파크골프장 현황_좌표포함_20250311.csv',
          '/data/제목 없는 스프레드시트 - 경상남도 거창군_파크골프장_좌표포함_20250801.csv',
          '/data/제목 없는 스프레드시트 - 경상북도_파크골프장_좌표포함_20250310.csv',
          '/data/제목 없는 스프레드시트 - 강원특별자치도_파크골프장_좌표포함_20250307.csv',
          '/data/제목 없는 스프레드시트 - 세종특별자치시_파크골프장_좌표포함_20250314.csv'
        ];

        const allCourses: ParkGolfCourse[] = [];

        for (const csvFile of csvFiles) {
          const response = await fetch(csvFile);
          const csvText = await response.text();
          
          await new Promise<void>((resolve) => {
            Papa.parse(csvText, {
              header: true,
              complete: (results) => {
                const rawData = results.data as any[];
                
                // 유효한 데이터만 필터링하고 좌표 변환
                const validCourses = rawData
                  .filter(row => row.시설명 && row.latitude && row.longitude)
                  .map(row => parseCourseData(row));
                
                allCourses.push(...validCourses);
                resolve();
              },
              error: (error: any) => {
                resolve();
              }
            });
          });
        }
        
        setCourses(allCourses);
        setLoading(false);
      } catch (error) {
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
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">전국 파크골프장 현황</h1>
              <p className="text-gray-600 mt-1">전국 파크골프장 정보를 확인하세요.</p>
            </div>
            
            {/* 뷰 모드 전환 버튼 */}
            <div className="flex bg-gray-100 rounded-lg p-1">
              <button
                onClick={() => setViewMode('map')}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  viewMode === 'map'
                    ? 'bg-white text-blue-600 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                🗺️ 지도
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  viewMode === 'list'
                    ? 'bg-white text-blue-600 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                📋 목록
              </button>
            </div>
          </div>
        </div>
      </header>
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
        {viewMode === 'map' ? (
          <div className="bg-white rounded-lg shadow-sm border h-[400px] sm:h-[500px] lg:h-[600px]">
            <Map courses={courses} onMarkerClick={handleMarkerClick} />
          </div>
        ) : (
          <div className="h-[500px] sm:h-[600px] lg:h-[700px] xl:h-[800px] overflow-y-auto">
            <CourseList 
              courses={filteredCourses} 
              onCourseClick={handleMarkerClick}
              searchFilter={searchFilter}
              onFilterChange={setSearchFilter}
            />
          </div>
        )}
        
        {/* 통계 카드 - 지도 탭에서만 표시 */}
        {viewMode === 'map' && (
          <div className="mt-4 sm:mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-12 gap-3 sm:gap-4">
          <div className="bg-white p-3 sm:p-4 rounded-lg shadow-sm border">
            <h3 className="font-semibold text-gray-900 mb-1 sm:mb-2 text-sm sm:text-base">
              총 파크골프장
            </h3>
            <p className="text-xl sm:text-2xl font-bold text-blue-600">
              {courses.length}개
            </p>
          </div>
          
          <div className="bg-white p-3 sm:p-4 rounded-lg shadow-sm border">
            <h3 className="font-semibold text-gray-900 mb-1 sm:mb-2 text-sm sm:text-base">서울시</h3>
            <p className="text-xl sm:text-2xl font-bold text-green-600">
              {courses.filter(course => {
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
              }).length}개
            </p>
          </div>
          
          <div className="bg-white p-3 sm:p-4 rounded-lg shadow-sm border">
            <h3 className="font-semibold text-gray-900 mb-1 sm:mb-2 text-sm sm:text-base">인천시</h3>
            <p className="text-xl sm:text-2xl font-bold text-purple-600">
              {courses.filter(course => course.위치?.includes('남동구') || course.위치?.includes('연수구') || (course.위치?.includes('서구') && course.위치?.includes('인천'))).length}개
            </p>
          </div>
          
          <div className="bg-white p-3 sm:p-4 rounded-lg shadow-sm border">
            <h3 className="font-semibold text-gray-900 mb-1 sm:mb-2 text-sm sm:text-base">세종시</h3>
            <p className="text-xl sm:text-2xl font-bold text-rose-600">
              {courses.filter(course => course.위치?.includes('세종특별자치시')).length}개
            </p>
          </div>
          
          <div className="bg-white p-3 sm:p-4 rounded-lg shadow-sm border">
            <h3 className="font-semibold text-gray-900 mb-1 sm:mb-2 text-sm sm:text-base">광주광역시</h3>
            <p className="text-xl sm:text-2xl font-bold text-indigo-600">
              {courses.filter(course => (course.위치?.includes('서구') && !course.위치?.includes('인천')) || (course.위치?.includes('북구') && !course.위치?.includes('대구')) || course.위치?.includes('동구') || course.위치?.includes('남구') || course.위치?.includes('광산구')).length}개
            </p>
          </div>
          
          <div className="bg-white p-3 sm:p-4 rounded-lg shadow-sm border">
            <h3 className="font-semibold text-gray-900 mb-1 sm:mb-2 text-sm sm:text-base">전라남도</h3>
            <p className="text-xl sm:text-2xl font-bold text-green-600">
              {courses.filter(course => course.위치?.includes('전라남도')).length}개
            </p>
          </div>
          
          <div className="bg-white p-3 sm:p-4 rounded-lg shadow-sm border">
            <h3 className="font-semibold text-gray-900 mb-1 sm:mb-2 text-sm sm:text-base">대구광역시</h3>
            <p className="text-xl sm:text-2xl font-bold text-red-600">
              {courses.filter(course => course.위치?.includes('대구광역시')).length}개
            </p>
          </div>
          
          <div className="bg-white p-3 sm:p-4 rounded-lg shadow-sm border">
            <h3 className="font-semibold text-gray-900 mb-1 sm:mb-2 text-sm sm:text-base">전북특별자치도</h3>
            <p className="text-xl sm:text-2xl font-bold text-yellow-600">
              {courses.filter(course => course.위치?.includes('전북특별자치도')).length}개
            </p>
          </div>
          
          <div className="bg-white p-3 sm:p-4 rounded-lg shadow-sm border">
            <h3 className="font-semibold text-gray-900 mb-1 sm:mb-2 text-sm sm:text-base">경상남도</h3>
            <p className="text-xl sm:text-2xl font-bold text-teal-600">
              {courses.filter(course => course.위치?.includes('경상남도')).length}개
            </p>
          </div>
          
          <div className="bg-white p-3 sm:p-4 rounded-lg shadow-sm border">
            <h3 className="font-semibold text-gray-900 mb-1 sm:mb-2 text-sm sm:text-base">경상북도</h3>
            <p className="text-xl sm:text-2xl font-bold text-cyan-600">
              {courses.filter(course => course.위치?.includes('경상북도')).length}개
            </p>
          </div>
          
          <div className="bg-white p-3 sm:p-4 rounded-lg shadow-sm border">
            <h3 className="font-semibold text-gray-900 mb-1 sm:mb-2 text-sm sm:text-base">강원특별자치도</h3>
            <p className="text-xl sm:text-2xl font-bold text-emerald-600">
              {courses.filter(course => course.위치?.includes('강원특별자치도')).length}개
            </p>
          </div>
          
          <div className="bg-white p-3 sm:p-4 rounded-lg shadow-sm border">
            <h3 className="font-semibold text-gray-900 mb-1 sm:mb-2 text-sm sm:text-base">
              총 홀 수
            </h3>
            <p className="text-xl sm:text-2xl font-bold text-orange-600">
              {courses.reduce((total, course) => total + parseInt(course.홀수?.replace('홀', '') || '0'), 0)}홀
            </p>
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
