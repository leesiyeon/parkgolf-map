import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: '파크골프 가이드 - 초보자부터 고수까지 | 전국 파크골프장 현황',
  description: '파크골프 초보자 가이드, 규칙, 에티켓, 지역별 추천 골프장까지! 파크골프에 대한 모든 정보를 한곳에서 확인하세요.',
  keywords: '파크골프 가이드, 파크골프 초보자, 파크골프 규칙, 파크골프 에티켓, 파크골프 팁, 파크골프 장비',
};

const guideCategories = [
  {
    id: 'beginner',
    title: '🌟 초보자 가이드',
    description: '파크골프를 처음 시작하는 분들을 위한 완벽 가이드',
    articles: [
      {
        title: '파크골프란? 기본 개념부터 시작하기',
        description: '파크골프의 정의, 일반 골프와의 차이점, 매력 포인트',
        slug: 'what-is-parkgolf',
        readTime: '5분'
      },
      {
        title: '파크골프 장비 완벽 가이드',
        description: '클럽, 공, 복장 등 필수 장비와 선택 방법',
        slug: 'equipment-guide',
        readTime: '7분'
      },
      {
        title: '첫 라운드 준비하기',
        description: '처음 파크골프장 방문 시 알아야 할 모든 것',
        slug: 'first-round',
        readTime: '6분'
      }
    ]
  },
  {
    id: 'rules',
    title: '📋 규칙 & 에티켓',
    description: '파크골프의 기본 규칙과 매너를 배워보세요',
    articles: [
      {
        title: '파크골프 기본 규칙 완벽 정리',
        description: '스코어 계산법, 플레이 순서, 기본 룰 총정리',
        slug: 'basic-rules',
        readTime: '8분'
      },
      {
        title: '파크골프장 에티켓 가이드',
        description: '다른 플레이어와 함께하는 매너 있는 플레이',
        slug: 'etiquette-guide',
        readTime: '5분'
      },
      {
        title: '안전 수칙과 주의사항',
        description: '안전한 파크골프를 위한 필수 수칙들',
        slug: 'safety-rules',
        readTime: '4분'
      }
    ]
  },
  {
    id: 'regional',
    title: '🗺️ 지역별 추천',
    description: '전국 각지의 추천 파크골프장을 소개합니다',
    articles: [
      {
        title: '서울 베스트 파크골프장 12선',
        description: '서울시 공공 파크골프장 완벽 가이드와 추천 코스',
        slug: 'seoul-best-courses',
        readTime: '10분'
      },
      {
        title: '경기도 숨은 명소 파크골프장',
        description: '경기도 지역의 특색 있는 파크골프장들',
        slug: 'gyeonggi-hidden-gems',
        readTime: '12분'
      },
      {
        title: '부산·경남 해안가 파크골프장',
        description: '바다 전망을 즐기며 플레이할 수 있는 특별한 코스들',
        slug: 'busan-coastal-courses',
        readTime: '9분'
      }
    ]
  },
  {
    id: 'seasonal',
    title: '🌸 계절별 가이드',
    description: '사계절 내내 즐기는 파크골프 팁과 추천',
    articles: [
      {
        title: '봄 파크골프 완벽 가이드',
        description: '벚꽃과 함께하는 봄 파크골프의 매력',
        slug: 'spring-parkgolf',
        readTime: '6분'
      },
      {
        title: '여름 더위를 피하는 파크골프 팁',
        description: '무더운 여름, 시원하게 파크골프 즐기기',
        slug: 'summer-tips',
        readTime: '5분'
      },
      {
        title: '가을 단풍과 함께하는 파크골프',
        description: '가을 정취를 만끽할 수 있는 추천 코스',
        slug: 'autumn-courses',
        readTime: '7분'
      },
      {
        title: '겨울 파크골프, 실내 연습 가이드',
        description: '추운 겨울철 파크골프 실력 유지 방법',
        slug: 'winter-practice',
        readTime: '6분'
      }
    ]
  }
];

export default function GuidePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-purple-600 via-purple-700 to-indigo-800 relative overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
          <div className="text-center">
            <div className="inline-flex items-center justify-center p-3 bg-purple-100 rounded-full mb-6">
              <span className="text-4xl">📚</span>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-4 tracking-tight">
              파크골프
              <span className="block text-purple-200">완벽 가이드</span>
            </h1>
            <p className="text-xl text-purple-100 mb-8 max-w-3xl mx-auto leading-relaxed">
              초보자부터 고수까지, 파크골프의 모든 것을 배워보세요.
              <br className="hidden sm:block" />
              기본 규칙부터 고급 팁, 전국 추천 코스까지 한번에!
            </p>
            
            {/* 통계 카드 */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-4xl mx-auto mb-8">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                <div className="text-2xl sm:text-3xl font-bold text-white">15+</div>
                <div className="text-purple-200 text-sm font-medium">가이드 문서</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                <div className="text-2xl sm:text-3xl font-bold text-white">4</div>
                <div className="text-purple-200 text-sm font-medium">주요 카테고리</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                <div className="text-2xl sm:text-3xl font-bold text-white">424</div>
                <div className="text-purple-200 text-sm font-medium">전국 파크골프장</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                <div className="text-2xl sm:text-3xl font-bold text-white">100%</div>
                <div className="text-purple-200 text-sm font-medium">무료 가이드</div>
              </div>
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
        {/* 빠른 시작 섹션 */}
        <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-2xl p-6 sm:p-8 mb-12 border border-green-100">
          <div className="text-center mb-6">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
              🚀 파크골프 빠른 시작
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              파크골프가 처음이신가요? 이 3단계만 따라하시면 바로 시작할 수 있어요!
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="bg-green-500 text-white rounded-full w-12 h-12 flex items-center justify-center text-xl font-bold mx-auto mb-4">1</div>
              <h3 className="font-semibold text-gray-900 mb-2">기본 개념 이해</h3>
              <p className="text-sm text-gray-600">파크골프가 무엇인지, 어떻게 플레이하는지 알아보세요</p>
            </div>
            <div className="text-center">
              <div className="bg-blue-500 text-white rounded-full w-12 h-12 flex items-center justify-center text-xl font-bold mx-auto mb-4">2</div>
              <h3 className="font-semibold text-gray-900 mb-2">장비 준비</h3>
              <p className="text-sm text-gray-600">필수 장비와 복장을 준비하고 대여 방법을 확인하세요</p>
            </div>
            <div className="text-center">
              <div className="bg-purple-500 text-white rounded-full w-12 h-12 flex items-center justify-center text-xl font-bold mx-auto mb-4">3</div>
              <h3 className="font-semibold text-gray-900 mb-2">골프장 방문</h3>
              <p className="text-sm text-gray-600">가까운 파크골프장을 찾아 첫 라운드를 즐겨보세요</p>
            </div>
          </div>
        </div>

        {/* 가이드 카테고리 */}
        <div className="space-y-12">
          {guideCategories.map((category) => (
            <section key={category.id} className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
              <div className="bg-gradient-to-r from-gray-50 to-blue-50 px-6 py-6 border-b border-gray-100">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  {category.title}
                </h2>
                <p className="text-gray-600">
                  {category.description}
                </p>
              </div>
              
              <div className="p-6">
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {category.articles.map((article) => (
                    <Link
                      key={article.slug}
                      href={`/guide/${category.id}/${article.slug}`}
                      className="group block"
                    >
                      <div className="bg-gray-50 rounded-xl p-6 h-full hover:bg-blue-50 transition-all duration-200 border border-gray-100 hover:border-blue-200 hover:shadow-lg">
                        <h3 className="font-semibold text-gray-900 mb-3 group-hover:text-blue-700 transition-colors">
                          {article.title}
                        </h3>
                        <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                          {article.description}
                        </p>
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-gray-500 bg-gray-200 px-2 py-1 rounded">
                            읽기 시간: {article.readTime}
                          </span>
                          <span className="text-blue-600 text-sm group-hover:text-blue-700">
                            읽어보기 →
                          </span>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </section>
          ))}
        </div>

        {/* CTA 섹션 */}
        <div className="mt-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-center text-white">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4">
            지금 바로 파크골프장을 찾아보세요! 🏌️‍♂️
          </h2>
          <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
            전국 424개 파크골프장의 위치와 정보를 지도에서 확인하고, 가장 가까운 골프장을 찾아보세요.
          </p>
          <Link
            href="/"
            className="inline-flex items-center px-6 py-3 bg-white text-blue-600 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
          >
            파크골프장 지도 보기
            <span className="ml-2">🗺️</span>
          </Link>
        </div>
      </main>
    </div>
  );
}
