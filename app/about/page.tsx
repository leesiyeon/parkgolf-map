import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '사이트 소개 - 전국 파크골프장 현황',
  description: '전국 파크골프장 현황 사이트에 대한 소개입니다. 파크골프장 정보 제공 목적과 데이터 출처에 대해 안내합니다.',
  keywords: '파크골프장 사이트, 파크골프맵, 파크골프장 정보, 사이트 소개',
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-purple-600 via-purple-700 to-indigo-800 relative overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
          <div className="text-center">
            <div className="inline-flex items-center justify-center p-3 bg-purple-100 rounded-full mb-6">
              <span className="text-4xl">ℹ️</span>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-4 tracking-tight">
              사이트
              <span className="block text-purple-200">소개</span>
            </h1>
            <p className="text-xl text-purple-100 mb-8 max-w-3xl mx-auto leading-relaxed">
              전국 파크골프장 현황 사이트에 대해 알아보고,
              <br className="hidden sm:block" />
              제공하는 서비스와 데이터에 대한 정보를 확인하세요
            </p>
          </div>
        </div>
        
        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/5 rounded-full"></div>
          <div className="absolute -bottom-20 -left-20 w-60 h-60 bg-white/5 rounded-full"></div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">

        <main className="space-y-8">
          <section className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              🎯 사이트 목적
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              전국 파크골프장 현황 사이트는 파크골프를 즐기는 분들이 전국의 파크골프장을 
              쉽게 찾을 수 있도록 도와주는 정보 제공 사이트입니다.
            </p>
            <p className="text-gray-700 leading-relaxed">
              지도와 목록을 통해 파크골프장의 위치, 홀수, 운영기관, 연락처 등의 
              상세 정보를 확인할 수 있으며, 파크골프 관련 최신 뉴스도 함께 제공합니다.
            </p>
          </section>

          <section className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              📊 제공 정보
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">🗺️ 파크골프장 지도</h3>
                <p className="text-gray-700 text-sm">
                  전국 파크골프장을 지도에서 직관적으로 확인할 수 있습니다. 
                  클러스터링 기능으로 지역별 분포도 한눈에 파악 가능합니다.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">📋 상세 목록</h3>
                <p className="text-gray-700 text-sm">
                  파크골프장의 상세 정보를 목록 형태로 제공합니다. 
                  지역별 필터링과 검색 기능으로 원하는 정보를 빠르게 찾을 수 있습니다.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">📰 뉴스</h3>
                <p className="text-gray-700 text-sm">
                  파크골프 관련 최신 뉴스와 소식을 실시간으로 제공합니다. 
                  신규 파크골프장 개장 소식, 대회 정보 등을 확인할 수 있습니다.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">📊 통계</h3>
                <p className="text-gray-700 text-sm">
                  전국 파크골프장 현황을 지역별, 홀수별로 분석한 
                  통계 정보를 제공합니다.
                </p>
              </div>
            </div>
          </section>

          <section className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              🔍 데이터 출처
            </h2>
            <div className="space-y-3">
              <div>
                <h4 className="font-medium text-gray-900">파크골프장 정보</h4>
                <p className="text-gray-700 text-sm">
                  각 지자체에서 공개한 파크골프장 현황 데이터를 수집하여 제공합니다.
                </p>
              </div>
              <div>
                <h4 className="font-medium text-gray-900">뉴스 정보</h4>
                <p className="text-gray-700 text-sm">
                  구글 뉴스 RSS를 통해 파크골프 관련 최신 뉴스를 자동 수집합니다.
                </p>
              </div>
              <div>
                <h4 className="font-medium text-gray-900">지도 서비스</h4>
                <p className="text-gray-700 text-sm">
                  카카오맵 API를 활용하여 지도 서비스를 제공합니다.
                </p>
              </div>
            </div>
          </section>

          <section className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              📞 문의
            </h2>
            <p className="text-gray-700 leading-relaxed">
              사이트 이용 중 문의사항이나 개선 사항이 있으시면 언제든지 연락해 주세요. 
              더 나은 서비스 제공을 위해 지속적으로 노력하겠습니다.
            </p>
          </section>
        </main>
      </div>
    </div>
  );
}
