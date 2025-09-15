import { Metadata } from 'next';
import ParkGolfNews from '@/components/ParkGolfNews';

export const metadata: Metadata = {
  title: '파크골프 뉴스 - 전국 파크골프장 현황',
  description: '파크골프 관련 최신 뉴스와 소식을 확인하세요. 신규 파크골프장, 대회 소식, 파크골프 업계 동향을 실시간으로 제공합니다.',
  keywords: '파크골프 뉴스, 파크골프장 소식, 파크골프 대회, 파크골프 업계 동향',
};

export default function NewsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-green-600 via-green-700 to-emerald-800 relative overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
          <div className="text-center">
            <div className="inline-flex items-center justify-center p-3 bg-green-100 rounded-full mb-6">
              <span className="text-4xl">📰</span>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-4 tracking-tight">
              파크골프
              <span className="block text-green-200">뉴스 & 소식</span>
            </h1>
            <p className="text-xl text-green-100 mb-8 max-w-3xl mx-auto leading-relaxed">
              파크골프 관련 최신 뉴스와 소식을 실시간으로 확인하고,
              <br className="hidden sm:block" />
              새로운 파크골프장 개장 소식과 대회 정보를 받아보세요
            </p>
          </div>
        </div>
        
        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/5 rounded-full"></div>
          <div className="absolute -bottom-20 -left-20 w-60 h-60 bg-white/5 rounded-full"></div>
        </div>
      </div>
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
          <div className="bg-gradient-to-r from-gray-50 to-green-50 px-6 py-4 border-b border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-semibold text-gray-900">실시간 뉴스</h2>
                <p className="text-sm text-gray-600">구글 뉴스에서 자동 수집된 최신 파크골프 소식</p>
              </div>
              <div className="hidden sm:flex items-center space-x-2 text-sm text-gray-500">
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-green-500 rounded-full mr-2 animate-pulse"></div>
                  실시간 업데이트
                </div>
              </div>
            </div>
          </div>
          <ParkGolfNews />
        </div>
      </main>
    </div>
  );
}
