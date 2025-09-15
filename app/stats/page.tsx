'use client';

import { useState, useEffect } from 'react';
import { Metadata } from 'next';
import Papa from 'papaparse';
import { ParkGolfCourse } from '@/types/parkgolf';

interface RegionStats {
  region: string;
  count: number;
  totalHoles: number;
  avgHoles: number;
  hasCoordinates: number;
  hasContact: number;
  operatorTypes: { [key: string]: number };
}

export default function StatsPage() {
  const [courses, setCourses] = useState<ParkGolfCourse[]>([]);
  const [regionStats, setRegionStats] = useState<RegionStats[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedRegion, setSelectedRegion] = useState<string>('all');
  const [activeTab, setActiveTab] = useState<'overview' | 'details'>('overview');
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const itemsPerPage = 6;

  useEffect(() => {
    loadCourseData();
  }, []);

  const loadCourseData = async () => {
    try {
      const response = await fetch('/data/kpga-all-courses.csv');
      const csvText = await response.text();
      
      Papa.parse(csvText, {
        header: true,
        complete: (results) => {
          const data = results.data as ParkGolfCourse[];
          const validCourses = data.filter(course => course.시설명?.trim());
          
          setCourses(validCourses);
          calculateRegionStats(validCourses);
          setLoading(false);
        }
      });
    } catch (error) {
      console.error('데이터 로드 실패:', error);
      setLoading(false);
    }
  };

  const calculateRegionStats = (data: ParkGolfCourse[]) => {
    const regionMap: { [key: string]: ParkGolfCourse[] } = {};
    
    // 지역별로 데이터 그룹화
    data.forEach(course => {
      const region = course.지역 || '기타';
      if (!regionMap[region]) {
        regionMap[region] = [];
      }
      regionMap[region].push(course);
    });

    // 지역별 통계 계산
    const stats: RegionStats[] = Object.entries(regionMap).map(([region, courses]) => {
      const validHoles = courses
        .map(c => parseInt(c.홀수?.replace('홀', '') || '0'))
        .filter(h => h > 0);
      
      const totalHoles = validHoles.reduce((sum, holes) => sum + holes, 0);
      const avgHoles = validHoles.length > 0 ? Math.round(totalHoles / validHoles.length) : 0;
      
      const hasCoordinates = courses.filter(c => c.latitude && c.longitude && c.latitude > 0).length;
      const hasContact = courses.filter(c => c.연락처?.trim()).length;
      
      // 운영기관 분류
      const operatorTypes: { [key: string]: number } = {};
      courses.forEach(c => {
        const operator = c.운영기관 || '기타';
        const type = getOperatorType(operator);
        operatorTypes[type] = (operatorTypes[type] || 0) + 1;
      });

      return {
        region,
        count: courses.length,
        totalHoles,
        avgHoles,
        hasCoordinates,
        hasContact,
        operatorTypes
      };
    });

    // 개수별로 정렬
    stats.sort((a, b) => b.count - a.count);
    setRegionStats(stats);
  };

  const getOperatorType = (operator: string): string => {
    if (operator.includes('군') || operator.includes('시') || operator.includes('구') || 
        operator.includes('청') || operator.includes('공단') || operator.includes('공사')) {
      return '공공기관';
    } else if (operator.includes('협회') || operator.includes('연합회')) {
      return '협회/단체';
    } else if (operator.includes('주식회사') || operator.includes('(주)') || operator.includes('㈜')) {
      return '민간기업';
    } else {
      return '기타';
    }
  };

  // 검색 및 필터링
  let filteredStats = regionStats;
  
  if (searchTerm) {
    filteredStats = filteredStats.filter(stat => 
      stat.region.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }
  
  if (selectedRegion !== 'all') {
    filteredStats = filteredStats.filter(stat => stat.region === selectedRegion);
  }

  // 페이지네이션
  const totalPages = Math.ceil(filteredStats.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedStats = filteredStats.slice(startIndex, startIndex + itemsPerPage);

  const totalCourses = courses.length;
  const totalHoles = courses.reduce((sum, c) => {
    const holes = parseInt(c.홀수?.replace('홀', '') || '0');
    return sum + (holes > 0 ? holes : 0);
  }, 0);

  // 검색이나 필터가 변경되면 첫 페이지로 이동
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, selectedRegion]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">통계 데이터를 불러오는 중...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <div className="inline-flex items-center justify-center p-2 bg-blue-100 rounded-full mb-4">
              <span className="text-3xl">📊</span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">
              지역별 파크골프장
              <span className="block text-blue-200">상세 통계</span>
            </h1>
            <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
              전국 {totalCourses}개 파크골프장의 지역별 분포와 현황을 자세히 알아보세요
            </p>
          </div>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* 전체 현황 요약 */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          <div className="bg-white rounded-xl shadow-sm border p-6 text-center">
            <div className="text-3xl font-bold text-blue-600 mb-2">{totalCourses}</div>
            <div className="text-gray-600 text-sm">전체 파크골프장</div>
          </div>
          <div className="bg-white rounded-xl shadow-sm border p-6 text-center">
            <div className="text-3xl font-bold text-green-600 mb-2">{regionStats.length}</div>
            <div className="text-gray-600 text-sm">서비스 지역</div>
          </div>
          <div className="bg-white rounded-xl shadow-sm border p-6 text-center">
            <div className="text-3xl font-bold text-purple-600 mb-2">{totalHoles.toLocaleString()}</div>
            <div className="text-gray-600 text-sm">전체 홀 수</div>
          </div>
          <div className="bg-white rounded-xl shadow-sm border p-6 text-center">
            <div className="text-3xl font-bold text-orange-600 mb-2">
              {Math.round(totalHoles / totalCourses)}
            </div>
            <div className="text-gray-600 text-sm">평균 홀 수</div>
          </div>
        </div>

        {/* 탭 네비게이션 */}
        <div className="bg-white rounded-xl shadow-sm border mb-8">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6">
              <button
                onClick={() => setActiveTab('overview')}
                className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === 'overview'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                📊 전체 개요
              </button>
              <button
                onClick={() => setActiveTab('details')}
                className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === 'details'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                🗺️ 지역별 상세
              </button>
            </nav>
          </div>

          {activeTab === 'details' && (
            <div className="p-6">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
                <h2 className="text-xl font-semibold text-gray-900">지역별 상세 분석</h2>
                
                {/* 검색 및 필터 */}
                <div className="flex flex-col sm:flex-row gap-3">
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="지역명을 입력하세요 (예: 경기, 서울)"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 pr-4 py-2.5 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 placeholder-gray-500 text-gray-900 font-medium transition-colors"
                    />
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <span className="text-gray-500 text-lg">🔍</span>
                    </div>
                  </div>
                  
                  <select
                    value={selectedRegion}
                    onChange={(e) => setSelectedRegion(e.target.value)}
                    className="px-4 py-2.5 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 font-medium bg-white transition-colors"
                  >
                    <option value="all" className="text-gray-900 font-medium">전체 지역</option>
                    {regionStats.map((stat) => (
                      <option key={stat.region} value={stat.region} className="text-gray-900 font-medium">
                        {stat.region} ({stat.count}개)
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              
              {/* 결과 수 표시 */}
              <div className="flex items-center justify-between mb-4">
                <div className="text-sm font-medium text-gray-700">
                  총 <span className="text-blue-600 font-bold">{filteredStats.length}개</span> 지역 중 
                  <span className="text-green-600 font-bold"> {paginatedStats.length}개</span> 표시
                </div>
                {searchTerm && (
                  <button
                    onClick={() => setSearchTerm('')}
                    className="text-xs px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded-full text-gray-700 font-medium transition-colors"
                  >
                    검색 초기화
                  </button>
                )}
              </div>
            </div>
          )}
        </div>

        {/* 전체 개요 탭 */}
        {activeTab === 'overview' && (
          <div className="space-y-8">
            {/* 추가 인사이트 */}
            <div className="bg-white rounded-xl shadow-sm border p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">지역별 순위</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* 파크골프장 수 TOP 5 */}
                <div>
                  <h3 className="font-medium text-gray-900 mb-4">🏆 파크골프장 수 TOP 5</h3>
                  <div className="space-y-3">
                    {regionStats.slice(0, 5).map((stat, index) => (
                      <div key={stat.region} className="flex items-center justify-between">
                        <div className="flex items-center">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold text-white mr-3 ${
                            index === 0 ? 'bg-yellow-500' :
                            index === 1 ? 'bg-gray-400' :
                            index === 2 ? 'bg-orange-500' :
                            'bg-blue-500'
                          }`}>
                            {index + 1}
                          </div>
                          <span className="font-medium text-gray-900">{stat.region}</span>
                        </div>
                        <span className="text-gray-600">{stat.count}개</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 평균 홀 수 TOP 5 */}
                <div>
                  <h3 className="font-medium text-gray-900 mb-4">⛳ 평균 홀 수 TOP 5</h3>
                  <div className="space-y-3">
                    {regionStats
                      .filter(stat => stat.avgHoles > 0)
                      .sort((a, b) => b.avgHoles - a.avgHoles)
                      .slice(0, 5)
                      .map((stat, index) => (
                        <div key={stat.region} className="flex items-center justify-between">
                          <div className="flex items-center">
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold text-white mr-3 ${
                              index === 0 ? 'bg-yellow-500' :
                              index === 1 ? 'bg-gray-400' :
                              index === 2 ? 'bg-orange-500' :
                              'bg-green-500'
                            }`}>
                              {index + 1}
                            </div>
                            <span className="font-medium text-gray-900">{stat.region}</span>
                          </div>
                          <span className="text-gray-600">{stat.avgHoles}홀</span>
                        </div>
                      ))}
                  </div>
                </div>
              </div>
            </div>

            {/* 전국 분포 차트 영역 (향후 확장 가능) */}
            <div className="bg-white rounded-xl shadow-sm border p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">지역별 분포 현황</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {regionStats.slice(0, 8).map((stat) => (
                  <div key={stat.region} className="text-center p-4 bg-gray-50 rounded-lg">
                    <div className="text-2xl font-bold text-blue-600 mb-1">{stat.count}</div>
                    <div className="text-sm text-gray-600">{stat.region}</div>
                    <div className="text-xs text-gray-500 mt-1">{stat.totalHoles}홀</div>
                  </div>
                ))}
              </div>
              {regionStats.length > 8 && (
                <div className="mt-4 text-center">
                  <button
                    onClick={() => setActiveTab('details')}
                    className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                  >
                    모든 지역 보기 →
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

        {/* 지역별 상세 탭 */}
        {activeTab === 'details' && (
          <>
            {/* 지역별 상세 통계 */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
              {paginatedStats.map((stat) => (
            <div key={stat.region} className="bg-white rounded-xl shadow-sm border p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold text-gray-900">{stat.region}</h3>
                <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                  {stat.count}개
                </span>
              </div>

              <div className="space-y-4">
                {/* 기본 정보 */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="text-2xl font-bold text-gray-900 mb-1">
                      {stat.totalHoles.toLocaleString()}
                    </div>
                    <div className="text-sm text-gray-600">총 홀 수</div>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="text-2xl font-bold text-gray-900 mb-1">{stat.avgHoles}</div>
                    <div className="text-sm text-gray-600">평균 홀 수</div>
                  </div>
                </div>

                {/* 데이터 완성도 */}
                <div>
                  <h4 className="font-medium text-gray-900 mb-3">데이터 완성도</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">위치 정보</span>
                      <div className="flex items-center">
                        <div className="w-24 bg-gray-200 rounded-full h-2 mr-2">
                          <div
                            className="bg-green-600 h-2 rounded-full"
                            style={{
                              width: `${(stat.hasCoordinates / stat.count) * 100}%`
                            }}
                          ></div>
                        </div>
                        <span className="text-sm font-medium text-gray-900">
                          {Math.round((stat.hasCoordinates / stat.count) * 100)}%
                        </span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">연락처</span>
                      <div className="flex items-center">
                        <div className="w-24 bg-gray-200 rounded-full h-2 mr-2">
                          <div
                            className="bg-blue-600 h-2 rounded-full"
                            style={{
                              width: `${(stat.hasContact / stat.count) * 100}%`
                            }}
                          ></div>
                        </div>
                        <span className="text-sm font-medium text-gray-900">
                          {Math.round((stat.hasContact / stat.count) * 100)}%
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 운영기관 분류 */}
                <div>
                  <h4 className="font-medium text-gray-900 mb-3">운영기관 분류</h4>
                  <div className="space-y-2">
                    {Object.entries(stat.operatorTypes).map(([type, count]) => (
                      <div key={type} className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">{type}</span>
                        <span className="text-sm font-medium text-gray-900">{count}개</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

            {/* 페이지네이션 */}
            {totalPages > 1 && (
              <div className="flex justify-center items-center space-x-2 bg-white rounded-lg p-4 border">
                <button
                  onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                  disabled={currentPage === 1}
                  className="px-4 py-2 rounded-lg border-2 border-gray-300 text-gray-700 font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors"
                >
                  ← 이전
                </button>
                
                <div className="flex space-x-1">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <button
                      key={page}
                      onClick={() => setCurrentPage(page)}
                      className={`px-3 py-2 rounded-lg border-2 font-medium transition-colors ${
                        currentPage === page
                          ? 'bg-blue-600 text-white border-blue-600 shadow-md'
                          : 'border-gray-300 text-gray-700 hover:bg-gray-50 hover:border-gray-400'
                      }`}
                    >
                      {page}
                    </button>
                  ))}
                </div>
                
                <button
                  onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                  disabled={currentPage === totalPages}
                  className="px-4 py-2 rounded-lg border-2 border-gray-300 text-gray-700 font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors"
                >
                  다음 →
                </button>
              </div>
            )}
          </>
        )}
      </main>
    </div>
  );
}
