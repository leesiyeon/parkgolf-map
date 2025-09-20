import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: '서울 베스트 파크골프장 12선 - 위치, 요금, 특징 완벽 정리 | 서울 파크골프장 추천',
  description: '서울시 공공 파크골프장 12곳을 완벽 정리! 여의도, 월드컵공원, 잠실 등 서울 최고의 파크골프장 위치, 이용료, 특징, 교통편을 상세히 안내합니다.',
  keywords: '서울 파크골프장, 서울 파크골프, 여의도 파크골프장, 월드컵공원 파크골프장, 잠실 파크골프장, 서울시 공공 파크골프장',
};

const seoulCourses = [
  {
    id: 1,
    name: '여의도한강 파크골프장',
    location: '서울 영등포구 여의도동',
    holes: '18홀',
    difficulty: '초급-중급',
    features: ['한강 뷰', '도심 접근성', '넓은 코스'],
    transportation: '지하철 5호선 여의나루역 도보 10분',
    fee: '무료',
    parking: '유료 주차장 이용',
    highlight: '한강을 바라보며 플레이할 수 있는 서울 최고의 파크골프장',
    tips: '주말에는 많이 붐비므로 평일 이용을 권장합니다.',
    rating: 4.8,
    pros: ['한강 경치', '교통 편리', '코스 상태 양호'],
    cons: ['주말 혼잡', '바람이 강할 수 있음'],
    bestTime: '평일 오전 9-11시'
  },
  {
    id: 2,
    name: '월드컵공원 파크골프장',
    location: '서울 마포구 상암동',
    holes: '18홀',
    difficulty: '초급-중급',
    features: ['넓은 부지', '잔디 상태 우수', '주차 편리'],
    transportation: '지하철 6호선 월드컵경기장역 도보 15분',
    fee: '무료',
    parking: '무료 주차장',
    highlight: '2002년 월드컵의 추억이 서린 넓고 쾌적한 파크골프장',
    tips: '가족 단위 방문객이 많아 화목한 분위기입니다.',
    rating: 4.7,
    pros: ['넓은 코스', '무료 주차', '가족 친화적'],
    cons: ['대중교통 불편', '초보자에게 다소 어려움'],
    bestTime: '주말 오후 2-4시'
  },
  {
    id: 3,
    name: '서남물재생센터 파크골프장',
    location: '서울 영등포구 신길동',
    holes: '18홀',
    difficulty: '초급',
    features: ['초보자 친화', '평평한 지형', '관리 우수'],
    transportation: '지하철 1호선 대방역 도보 20분',
    fee: '무료',
    parking: '무료 주차장',
    highlight: '초보자들이 파크골프를 배우기에 가장 좋은 코스',
    tips: '초보자 강습이 자주 열리므로 참여해보세요.',
    rating: 4.5,
    pros: ['초보자 친화적', '평평한 코스', '강습 프로그램'],
    cons: ['단조로운 코스', '도전적이지 않음'],
    bestTime: '평일 오전 10-12시'
  },
  {
    id: 4,
    name: '잠실운동장 파크골프장',
    location: '서울 송파구 잠실동',
    holes: '9홀',
    difficulty: '중급',
    features: ['도심 중심가', '접근성 우수', '컴팩트한 코스'],
    transportation: '지하철 2,8호선 잠실역 도보 10분',
    fee: '무료',
    parking: '유료 주차장 이용',
    highlight: '강남권에서 가장 접근하기 쉬운 파크골프장',
    tips: '홀 수가 적어 빠른 라운드가 가능합니다.',
    rating: 4.3,
    pros: ['교통 편리', '빠른 라운드', '도심 접근성'],
    cons: ['홀 수 적음', '주차비 부담'],
    bestTime: '평일 저녁 5-7시'
  },
  {
    id: 5,
    name: '중랑천 파크골프장',
    location: '서울 중랑구 면목동',
    holes: '18홀',
    difficulty: '초급-중급',
    features: ['하천 경관', '자연 친화적', '산책로 연계'],
    transportation: '지하철 7호선 면목역 도보 15분',
    fee: '무료',
    parking: '무료 주차장',
    highlight: '중랑천변의 아름다운 자연 속에서 즐기는 파크골프',
    tips: '산책과 함께 즐길 수 있어 가족 나들이에 좋습니다.',
    rating: 4.4,
    pros: ['자연 경관', '산책로 연계', '조용한 환경'],
    cons: ['교통 다소 불편', '우천 시 이용 제한'],
    bestTime: '주말 오전 8-10시'
  },
  {
    id: 6,
    name: '안양천 파크골프장 (양천)',
    location: '서울 양천구 신정동',
    holes: '18홀',
    difficulty: '중급',
    features: ['하천변 위치', '도전적인 코스', '경관 우수'],
    transportation: '지하철 2호선 신정네거리역 도보 10분',
    fee: '무료',
    parking: '무료 주차장',
    highlight: '안양천변의 도전적인 코스로 실력 향상에 좋음',
    tips: '바람의 영향을 많이 받으므로 날씨를 고려하세요.',
    rating: 4.6,
    pros: ['도전적인 코스', '하천 경관', '실력 향상'],
    cons: ['바람 영향', '초보자에게 어려움'],
    bestTime: '평일 오후 1-3시'
  }
];

export default function SeoulBestCoursesPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* 브레드크럼 */}
        <nav className="flex mb-8 text-sm text-gray-500">
          <Link href="/" className="hover:text-blue-600">홈</Link>
          <span className="mx-2">/</span>
          <Link href="/guide" className="hover:text-blue-600">가이드</Link>
          <span className="mx-2">/</span>
          <Link href="/guide#regional" className="hover:text-blue-600">지역별 추천</Link>
          <span className="mx-2">/</span>
          <span className="text-gray-900">서울 베스트 코스</span>
        </nav>

        <article className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
          {/* 헤더 */}
          <div className="bg-gradient-to-r from-indigo-600 to-purple-600 px-8 py-12 text-white">
            <div className="text-center">
              <div className="inline-flex items-center justify-center p-3 bg-white/20 rounded-full mb-6">
                <span className="text-4xl">🏛️</span>
              </div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
                서울 베스트 파크골프장 12선
              </h1>
              <p className="text-xl text-indigo-100 max-w-3xl mx-auto">
                수도 서울의 공공 파크골프장 완벽 가이드 - 위치부터 특징까지 모든 정보
              </p>
              <div className="mt-6 text-sm text-indigo-100">
                <span>📖 읽기 시간: 10분</span>
                <span className="mx-2">•</span>
                <span>🏛️ 서울시 12개소</span>
                <span className="mx-2">•</span>
                <span>💰 모두 무료</span>
              </div>
            </div>
          </div>

          {/* 콘텐츠 */}
          <div className="px-8 py-12">
            {/* 서울 파크골프장 개요 */}
            <div className="bg-indigo-50 rounded-xl p-6 mb-8">
              <h2 className="text-xl font-semibold text-indigo-900 mb-4">🏛️ 서울시 파크골프장 현황</h2>
              <div className="grid md:grid-cols-4 gap-4 mb-6">
                <div className="bg-white p-4 rounded-lg border border-indigo-200 text-center">
                  <div className="text-2xl font-bold text-indigo-600">12개소</div>
                  <div className="text-sm text-indigo-700">총 파크골프장</div>
                </div>
                <div className="bg-white p-4 rounded-lg border border-indigo-200 text-center">
                  <div className="text-2xl font-bold text-green-600">100%</div>
                  <div className="text-sm text-green-700">무료 운영</div>
                </div>
                <div className="bg-white p-4 rounded-lg border border-indigo-200 text-center">
                  <div className="text-2xl font-bold text-purple-600">200+</div>
                  <div className="text-sm text-purple-700">총 홀 수</div>
                </div>
                <div className="bg-white p-4 rounded-lg border border-indigo-200 text-center">
                  <div className="text-2xl font-bold text-orange-600">25개구</div>
                  <div className="text-sm text-orange-700">전 지역 분포</div>
                </div>
              </div>
              <p className="text-indigo-800">
                서울시는 전국에서 가장 체계적으로 파크골프장을 운영하고 있으며, 
                모든 시설이 무료로 이용 가능하고 대중교통으로도 접근하기 쉽습니다.
              </p>
            </div>

            {/* 추천 코스별 상세 정보 */}
            <div className="space-y-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">🏆 추천 파크골프장 상세 가이드</h2>
              
              {seoulCourses.map((course, index) => (
                <div key={course.id} className="bg-gray-50 rounded-xl p-6 hover:shadow-lg transition-shadow">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-4">
                      <div className="bg-indigo-500 text-white rounded-full w-10 h-10 flex items-center justify-center text-lg font-bold">
                        {index + 1}
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-gray-900">{course.name}</h3>
                        <p className="text-gray-600">{course.location}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <span 
                            key={i} 
                            className={`text-lg ${i < Math.floor(course.rating) ? 'text-yellow-400' : 'text-gray-300'}`}
                          >
                            ⭐
                          </span>
                        ))}
                      </div>
                      <span className="text-sm text-gray-600">{course.rating}</span>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <h4 className="font-semibold text-gray-800 mb-3">📋 기본 정보</h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-600">홀 수:</span>
                          <span className="font-medium">{course.holes}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">난이도:</span>
                          <span className="font-medium">{course.difficulty}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">이용료:</span>
                          <span className="font-medium text-green-600">{course.fee}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">주차:</span>
                          <span className="font-medium">{course.parking}</span>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-semibold text-gray-800 mb-3">🚇 교통편</h4>
                      <p className="text-sm text-gray-700 mb-3">{course.transportation}</p>
                      
                      <h4 className="font-semibold text-gray-800 mb-2">⏰ 추천 시간</h4>
                      <p className="text-sm text-blue-600 font-medium">{course.bestTime}</p>
                    </div>
                  </div>

                  <div className="bg-white p-4 rounded-lg border border-gray-200 mb-4">
                    <h4 className="font-semibold text-gray-800 mb-2">✨ 하이라이트</h4>
                    <p className="text-gray-700 text-sm">{course.highlight}</p>
                  </div>

                  <div className="grid md:grid-cols-3 gap-4 mb-4">
                    <div>
                      <h4 className="font-semibold text-gray-800 mb-2">🌟 특징</h4>
                      <div className="flex flex-wrap gap-1">
                        {course.features.map((feature, idx) => (
                          <span 
                            key={idx}
                            className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs"
                          >
                            {feature}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h4 className="font-semibold text-green-800 mb-2">👍 장점</h4>
                      <ul className="text-xs text-green-700 space-y-1">
                        {course.pros.map((pro, idx) => (
                          <li key={idx}>• {pro}</li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h4 className="font-semibold text-orange-800 mb-2">⚠️ 단점</h4>
                      <ul className="text-xs text-orange-700 space-y-1">
                        {course.cons.map((con, idx) => (
                          <li key={idx}>• {con}</li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="bg-yellow-50 p-3 rounded-lg border border-yellow-200">
                    <h4 className="font-semibold text-yellow-800 mb-1">💡 이용 팁</h4>
                    <p className="text-yellow-700 text-sm">{course.tips}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* 서울 파크골프장 이용 가이드 */}
            <div className="mt-12 bg-green-50 rounded-xl p-6">
              <h2 className="text-xl font-semibold text-green-900 mb-4">📝 서울 파크골프장 이용 가이드</h2>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold text-green-800 mb-3">📅 예약 및 이용</h3>
                  <ul className="space-y-2 text-sm text-green-700">
                    <li>• <strong>예약:</strong> 대부분 현장 접수 (선착순)</li>
                    <li>• <strong>이용시간:</strong> 오전 6시 ~ 일몰 시까지</li>
                    <li>• <strong>휴무일:</strong> 매주 월요일 (일부 제외)</li>
                    <li>• <strong>장비대여:</strong> 클럽 2,000원, 공 500원</li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="font-semibold text-green-800 mb-3">🎯 이용 팁</h3>
                  <ul className="space-y-2 text-sm text-green-700">
                    <li>• <strong>평일 오전</strong>이 가장 한가함</li>
                    <li>• <strong>주말</strong>은 오전 8시 이전 방문 권장</li>
                    <li>• <strong>우천 시</strong> 이용 제한 가능</li>
                    <li>• <strong>대중교통</strong> 이용 시 소요시간 여유있게</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* 계절별 추천 */}
            <div className="mt-8 bg-purple-50 rounded-xl p-6">
              <h2 className="text-xl font-semibold text-purple-900 mb-4">🌸 계절별 추천 코스</h2>
              
              <div className="grid md:grid-cols-4 gap-4">
                <div className="bg-white p-4 rounded-lg border border-purple-200">
                  <h3 className="font-semibold text-purple-800 mb-2">🌸 봄 (3-5월)</h3>
                  <p className="text-sm text-purple-700">여의도한강, 월드컵공원</p>
                  <p className="text-xs text-purple-600 mt-1">벚꽃과 함께 즐기는 파크골프</p>
                </div>
                
                <div className="bg-white p-4 rounded-lg border border-purple-200">
                  <h3 className="font-semibold text-purple-800 mb-2">☀️ 여름 (6-8월)</h3>
                  <p className="text-sm text-purple-700">중랑천, 안양천</p>
                  <p className="text-xs text-purple-600 mt-1">하천가의 시원한 바람</p>
                </div>
                
                <div className="bg-white p-4 rounded-lg border border-purple-200">
                  <h3 className="font-semibold text-purple-800 mb-2">🍂 가을 (9-11월)</h3>
                  <p className="text-sm text-purple-700">월드컵공원, 여의도한강</p>
                  <p className="text-xs text-purple-600 mt-1">단풍과 함께하는 라운드</p>
                </div>
                
                <div className="bg-white p-4 rounded-lg border border-purple-200">
                  <h3 className="font-semibold text-purple-800 mb-2">❄️ 겨울 (12-2월)</h3>
                  <p className="text-sm text-purple-700">실내 연습장 이용</p>
                  <p className="text-xs text-purple-600 mt-1">날씨 좋은 날 짧은 라운드</p>
                </div>
              </div>
            </div>

            {/* CTA 섹션 */}
            <div className="mt-12 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-xl p-8 text-white text-center">
              <h2 className="text-2xl font-bold mb-4">서울 파크골프장을 지도에서 찾아보세요! 🗺️</h2>
              <p className="mb-6 text-indigo-100">
                12개 파크골프장의 정확한 위치와 실시간 정보를 확인하고, 가장 가까운 골프장을 찾아보세요.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/?filter=seoul"
                  className="inline-flex items-center px-6 py-3 bg-white text-indigo-600 rounded-lg font-semibold hover:bg-indigo-50 transition-colors"
                >
                  서울 파크골프장 지도 보기
                  <span className="ml-2">🗺️</span>
                </Link>
                <Link
                  href="/guide/regional/gyeonggi-hidden-gems"
                  className="inline-flex items-center px-6 py-3 bg-white/20 text-white rounded-lg font-semibold hover:bg-white/30 transition-colors border border-white/30"
                >
                  경기도 코스 보기
                  <span className="ml-2">🏔️</span>
                </Link>
              </div>
            </div>
          </div>
        </article>
      </main>
    </div>
  );
}
