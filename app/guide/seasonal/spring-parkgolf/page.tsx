import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: '봄 파크골프 완벽 가이드 - 벚꽃과 함께하는 파크골프 | 계절별 파크골프 팁',
  description: '봄철 파크골프를 완벽하게 즐기는 방법! 벚꽃 명소 파크골프장, 봄 복장, 주의사항, 추천 코스까지 봄 파크골프의 모든 것을 안내합니다.',
  keywords: '봄 파크골프, 벚꽃 파크골프장, 봄철 파크골프 복장, 봄 파크골프 팁, 계절별 파크골프, 꽃구경 파크골프',
};

const springCourses = [
  {
    name: '여의도한강 파크골프장',
    location: '서울 영등포구',
    highlight: '벚꽃축제와 함께하는 파크골프',
    bestPeriod: '4월 초-중순',
    features: ['벚꽃 터널', '한강 경관', '축제 분위기'],
    crowdLevel: '매우 높음',
    tip: '벚꽃 시즌에는 매우 붐비므로 평일 이른 아침 방문을 권장합니다.'
  },
  {
    name: '월드컵공원 파크골프장',
    location: '서울 마포구',
    highlight: '넓은 잔디밭과 봄꽃 조화',
    bestPeriod: '3월 말-5월 초',
    features: ['유채꽃', '넓은 공간', '가족 친화'],
    crowdLevel: '보통',
    tip: '주차장이 넓어 가족 단위 방문에 좋습니다.'
  },
  {
    name: '올림픽공원 파크골프장',
    location: '서울 송파구',
    highlight: '장미와 봄꽃이 어우러진 경관',
    bestPeriod: '4월-5월',
    features: ['장미원 인근', '산책로', '문화시설'],
    crowdLevel: '높음',
    tip: '파크골프 후 장미원과 조각공원 관람을 추천합니다.'
  }
];

const springTips = [
  {
    category: '복장',
    icon: '👕',
    items: [
      '얇은 긴팔 또는 반팔 + 가디건',
      '바람막이 재킷 (아침/저녁용)',
      '편한 운동화 (방수 기능)',
      '모자 (자외선 차단)',
      '선글라스'
    ]
  },
  {
    category: '준비물',
    icon: '🎒',
    items: [
      '선크림 (SPF 30 이상)',
      '물통 (충분한 수분 보충)',
      '간단한 간식',
      '작은 수건',
      '비상용 우산'
    ]
  },
  {
    category: '건강관리',
    icon: '💊',
    items: [
      '황사 마스크 (황사 시즌)',
      '알레르기 약 (꽃가루 알레르기)',
      '무릎 보호대 (관절 보호)',
      '충분한 스트레칭',
      '적절한 휴식'
    ]
  }
];

export default function SpringParkGolfPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-green-50">
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* 브레드크럼 */}
        <nav className="flex mb-8 text-sm text-gray-500">
          <Link href="/" className="hover:text-blue-600">홈</Link>
          <span className="mx-2">/</span>
          <Link href="/guide" className="hover:text-blue-600">가이드</Link>
          <span className="mx-2">/</span>
          <Link href="/guide#seasonal" className="hover:text-blue-600">계절별 가이드</Link>
          <span className="mx-2">/</span>
          <span className="text-gray-900">봄 파크골프</span>
        </nav>

        <article className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
          {/* 헤더 */}
          <div className="bg-gradient-to-r from-pink-500 via-rose-500 to-pink-600 px-8 py-12 text-white relative overflow-hidden">
            <div className="text-center relative z-10">
              <div className="inline-flex items-center justify-center p-3 bg-white/20 rounded-full mb-6">
                <span className="text-4xl">🌸</span>
              </div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
                봄 파크골프 완벽 가이드
              </h1>
              <p className="text-xl text-pink-100 max-w-2xl mx-auto">
                벚꽃과 봄꽃이 만개한 파크골프장에서 즐기는 특별한 라운드
              </p>
              <div className="mt-6 text-sm text-pink-100">
                <span>📖 읽기 시간: 6분</span>
                <span className="mx-2">•</span>
                <span>🌸 봄철 특별판</span>
                <span className="mx-2">•</span>
                <span>📅 3-5월 적용</span>
              </div>
            </div>
            
            {/* 장식 요소 */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/10 rounded-full"></div>
              <div className="absolute -bottom-20 -left-20 w-60 h-60 bg-white/10 rounded-full"></div>
              <div className="absolute top-1/4 left-1/4 w-20 h-20 bg-white/5 rounded-full"></div>
            </div>
          </div>

          {/* 콘텐츠 */}
          <div className="px-8 py-12">
            {/* 목차 */}
            <div className="bg-pink-50 rounded-xl p-6 mb-8">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">📋 이 글에서 다룰 내용</h2>
              <ul className="space-y-2 text-sm">
                <li><a href="#spring-charm" className="text-pink-600 hover:underline">1. 봄 파크골프의 매력</a></li>
                <li><a href="#best-courses" className="text-pink-600 hover:underline">2. 봄꽃 명소 파크골프장</a></li>
                <li><a href="#spring-preparation" className="text-pink-600 hover:underline">3. 봄철 준비사항</a></li>
                <li><a href="#weather-tips" className="text-pink-600 hover:underline">4. 봄 날씨 대응법</a></li>
                <li><a href="#health-care" className="text-pink-600 hover:underline">5. 건강 관리 팁</a></li>
                <li><a href="#photography-tips" className="text-pink-600 hover:underline">6. 추억 남기기</a></li>
              </ul>
            </div>

            {/* 봄 파크골프 하이라이트 */}
            <div className="bg-green-50 border border-green-200 rounded-xl p-6 mb-8">
              <h2 className="text-xl font-semibold text-green-800 mb-4">🌸 봄 파크골프 하이라이트</h2>
              <div className="grid md:grid-cols-3 gap-4">
                <div className="text-center">
                  <div className="text-3xl mb-2">🌸</div>
                  <h3 className="font-semibold text-green-700">벚꽃 시즌</h3>
                  <p className="text-sm text-green-600">4월 초-중순 벚꽃과 함께</p>
                </div>
                <div className="text-center">
                  <div className="text-3xl mb-2">🌡️</div>
                  <h3 className="font-semibold text-green-700">완벽한 날씨</h3>
                  <p className="text-sm text-green-600">15-20도 최적 온도</p>
                </div>
                <div className="text-center">
                  <div className="text-3xl mb-2">🌱</div>
                  <h3 className="font-semibold text-green-700">신선한 공기</h3>
                  <p className="text-sm text-green-600">맑고 상쾌한 봄 공기</p>
                </div>
              </div>
            </div>

            {/* 본문 */}
            <div className="prose prose-lg max-w-none">
              <section id="spring-charm" className="mb-12">
                <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                  <span className="bg-pink-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm mr-3">1</span>
                  봄 파크골프의 매력
                </h2>

                <div className="bg-pink-50 p-6 rounded-xl mb-6">
                  <h3 className="text-xl font-semibold text-pink-900 mb-4">🌸 왜 봄이 파크골프 최고의 계절일까요?</h3>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold text-pink-800 mb-3">자연의 아름다움</h4>
                      <ul className="space-y-2 text-sm text-pink-700">
                        <li>• 벚꽃, 진달래, 개나리 등 봄꽃 만개</li>
                        <li>• 신록이 우거진 싱그러운 경관</li>
                        <li>• 파란 하늘과 하얀 구름의 조화</li>
                        <li>• 따뜻한 햇살과 시원한 바람</li>
                      </ul>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold text-pink-800 mb-3">완벽한 컨디션</h4>
                      <ul className="space-y-2 text-sm text-pink-700">
                        <li>• 15-20도의 최적 온도</li>
                        <li>• 높은 습도로 인한 좋은 잔디 상태</li>
                        <li>• 긴 일조 시간으로 여유로운 플레이</li>
                        <li>• 겨울 동안 휴식한 몸의 재활성화</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="bg-yellow-50 p-6 rounded-xl">
                  <h3 className="text-xl font-semibold text-yellow-900 mb-4">📅 봄 파크골프 시즌 캘린더</h3>
                  
                  <div className="space-y-4">
                    <div className="flex items-center space-x-4 bg-white p-3 rounded-lg border border-yellow-200">
                      <div className="bg-green-500 text-white rounded-full w-10 h-10 flex items-center justify-center text-sm font-bold">3월</div>
                      <div>
                        <h4 className="font-semibold text-yellow-800">초봄 시즌 시작</h4>
                        <p className="text-sm text-yellow-700">개나리, 진달래 개화 / 아직 쌀쌀한 날씨</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-4 bg-white p-3 rounded-lg border border-yellow-200">
                      <div className="bg-pink-500 text-white rounded-full w-10 h-10 flex items-center justify-center text-sm font-bold">4월</div>
                      <div>
                        <h4 className="font-semibold text-yellow-800">벚꽃 시즌 절정</h4>
                        <p className="text-sm text-yellow-700">전국 벚꽃 만개 / 파크골프 성수기</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-4 bg-white p-3 rounded-lg border border-yellow-200">
                      <div className="bg-green-500 text-white rounded-full w-10 h-10 flex items-center justify-center text-sm font-bold">5월</div>
                      <div>
                        <h4 className="font-semibold text-yellow-800">신록 시즌</h4>
                        <p className="text-sm text-yellow-700">신록과 장미 / 가장 쾌적한 날씨</p>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              <section id="best-courses" className="mb-12">
                <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                  <span className="bg-rose-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm mr-3">2</span>
                  봄꽃 명소 파크골프장
                </h2>

                <div className="space-y-6">
                  {springCourses.map((course, index) => (
                    <div key={index} className="bg-rose-50 p-6 rounded-xl border border-rose-200">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h3 className="text-xl font-bold text-rose-900">{course.name}</h3>
                          <p className="text-rose-700">{course.location}</p>
                        </div>
                        <div className="bg-rose-500 text-white px-3 py-1 rounded-full text-sm">
                          {course.bestPeriod}
                        </div>
                      </div>

                      <div className="grid md:grid-cols-2 gap-6 mb-4">
                        <div>
                          <h4 className="font-semibold text-rose-800 mb-2">🌸 하이라이트</h4>
                          <p className="text-sm text-rose-700 mb-3">{course.highlight}</p>
                          
                          <h4 className="font-semibold text-rose-800 mb-2">✨ 특징</h4>
                          <div className="flex flex-wrap gap-1">
                            {course.features.map((feature, idx) => (
                              <span 
                                key={idx}
                                className="bg-white text-rose-700 px-2 py-1 rounded text-xs border border-rose-300"
                              >
                                {feature}
                              </span>
                            ))}
                          </div>
                        </div>
                        
                        <div>
                          <h4 className="font-semibold text-rose-800 mb-2">👥 혼잡도</h4>
                          <div className="flex items-center mb-3">
                            <span className="text-sm text-rose-700 mr-2">{course.crowdLevel}</span>
                            <div className="flex space-x-1">
                              {[...Array(3)].map((_, i) => (
                                <div 
                                  key={i}
                                  className={`w-3 h-3 rounded-full ${
                                    course.crowdLevel === '매우 높음' ? 'bg-red-400' :
                                    course.crowdLevel === '높음' ? (i < 2 ? 'bg-orange-400' : 'bg-gray-300') :
                                    course.crowdLevel === '보통' ? (i < 1 ? 'bg-yellow-400' : 'bg-gray-300') :
                                    'bg-gray-300'
                                  }`}
                                ></div>
                              ))}
                            </div>
                          </div>
                          
                          <h4 className="font-semibold text-rose-800 mb-2">💡 팁</h4>
                          <p className="text-sm text-rose-700">{course.tip}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              <section id="spring-preparation" className="mb-12">
                <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                  <span className="bg-green-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm mr-3">3</span>
                  봄철 준비사항
                </h2>

                <div className="grid md:grid-cols-3 gap-6">
                  {springTips.map((tip, index) => (
                    <div key={index} className="bg-green-50 p-6 rounded-xl border border-green-200">
                      <div className="text-center mb-4">
                        <div className="text-3xl mb-2">{tip.icon}</div>
                        <h3 className="text-lg font-semibold text-green-900">{tip.category}</h3>
                      </div>
                      
                      <ul className="space-y-2">
                        {tip.items.map((item, idx) => (
                          <li key={idx} className="text-sm text-green-700 flex items-start">
                            <span className="text-green-500 mr-2 flex-shrink-0">•</span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </section>

              <section id="weather-tips" className="mb-12">
                <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                  <span className="bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm mr-3">4</span>
                  봄 날씨 대응법
                </h2>

                <div className="grid md:grid-cols-2 gap-8">
                  <div className="bg-blue-50 p-6 rounded-xl">
                    <h3 className="text-xl font-semibold text-blue-900 mb-4">☔ 봄비 대비</h3>
                    
                    <div className="space-y-4">
                      <div className="bg-white p-4 rounded-lg border border-blue-200">
                        <h4 className="font-semibold text-blue-800 mb-2">사전 준비</h4>
                        <ul className="text-sm text-blue-700 space-y-1">
                          <li>• 날씨 예보 미리 확인</li>
                          <li>• 우산 또는 우비 준비</li>
                          <li>• 방수 신발 착용</li>
                          <li>• 여분의 옷 준비</li>
                        </ul>
                      </div>
                      
                      <div className="bg-white p-4 rounded-lg border border-blue-200">
                        <h4 className="font-semibold text-blue-800 mb-2">비 올 때</h4>
                        <ul className="text-sm text-blue-700 space-y-1">
                          <li>• 안전 최우선, 플레이 중단 고려</li>
                          <li>• 미끄러운 곳 주의</li>
                          <li>• 클럽과 공 잘 닦기</li>
                          <li>• 실내 대기 공간 활용</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-yellow-50 p-6 rounded-xl">
                    <h3 className="text-xl font-semibold text-yellow-900 mb-4">💨 황사·미세먼지 대비</h3>
                    
                    <div className="space-y-4">
                      <div className="bg-white p-4 rounded-lg border border-yellow-200">
                        <h4 className="font-semibold text-yellow-800 mb-2">사전 체크</h4>
                        <ul className="text-sm text-yellow-700 space-y-1">
                          <li>• 미세먼지 농도 확인</li>
                          <li>• 황사 예보 체크</li>
                          <li>• 마스크 준비</li>
                          <li>• 실내 활동 대안 계획</li>
                        </ul>
                      </div>
                      
                      <div className="bg-white p-4 rounded-lg border border-yellow-200">
                        <h4 className="font-semibold text-yellow-800 mb-2">나쁨 단계 시</h4>
                        <ul className="text-sm text-yellow-700 space-y-1">
                          <li>• 야외 활동 자제</li>
                          <li>• KF94 마스크 착용</li>
                          <li>• 충분한 수분 섭취</li>
                          <li>• 플레이 후 깨끗이 씻기</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              <section id="health-care" className="mb-12">
                <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                  <span className="bg-purple-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm mr-3">5</span>
                  건강 관리 팁
                </h2>

                <div className="bg-purple-50 p-6 rounded-xl">
                  <div className="grid md:grid-cols-2 gap-8">
                    <div>
                      <h3 className="text-xl font-semibold text-purple-900 mb-4">🤧 알레르기 대비</h3>
                      
                      <div className="space-y-4">
                        <div className="bg-white p-4 rounded-lg border border-purple-200">
                          <h4 className="font-semibold text-purple-800 mb-2">꽃가루 알레르기</h4>
                          <ul className="text-sm text-purple-700 space-y-1">
                            <li>• 알레르기 약 미리 복용</li>
                            <li>• 마스크 착용</li>
                            <li>• 선글라스로 눈 보호</li>
                            <li>• 플레이 후 샤워</li>
                          </ul>
                        </div>
                        
                        <div className="bg-white p-4 rounded-lg border border-purple-200">
                          <h4 className="font-semibold text-purple-800 mb-2">증상 완화</h4>
                          <ul className="text-sm text-purple-700 space-y-1">
                            <li>• 충분한 수분 섭취</li>
                            <li>• 비타민 C 보충</li>
                            <li>• 스트레스 관리</li>
                            <li>• 충분한 수면</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="text-xl font-semibold text-purple-900 mb-4">💪 컨디션 관리</h3>
                      
                      <div className="space-y-4">
                        <div className="bg-white p-4 rounded-lg border border-purple-200">
                          <h4 className="font-semibold text-purple-800 mb-2">봄철 특별 관리</h4>
                          <ul className="text-sm text-purple-700 space-y-1">
                            <li>• 겨울 동안 굳은 관절 풀기</li>
                            <li>• 점진적인 운동량 증가</li>
                            <li>• 충분한 워밍업</li>
                            <li>• 무리하지 않기</li>
                          </ul>
                        </div>
                        
                        <div className="bg-white p-4 rounded-lg border border-purple-200">
                          <h4 className="font-semibold text-purple-800 mb-2">부상 예방</h4>
                          <ul className="text-sm text-purple-700 space-y-1">
                            <li>• 스트레칭 충분히</li>
                            <li>• 적절한 휴식</li>
                            <li>• 수분 보충</li>
                            <li>• 무릎 보호대 착용</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              <section id="photography-tips" className="mb-12">
                <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                  <span className="bg-indigo-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm mr-3">6</span>
                  추억 남기기
                </h2>

                <div className="bg-indigo-50 p-6 rounded-xl">
                  <h3 className="text-xl font-semibold text-indigo-900 mb-4">📸 봄 파크골프 사진 촬영 팁</h3>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold text-indigo-800 mb-3">최고의 촬영 시간</h4>
                      <ul className="space-y-2 text-sm text-indigo-700">
                        <li>• <strong>골든아워:</strong> 일출 후 1시간, 일몰 전 1시간</li>
                        <li>• <strong>블루아워:</strong> 해질녘 30분간</li>
                        <li>• <strong>흐린 날:</strong> 부드러운 자연광</li>
                        <li>• <strong>벚꽃 시즌:</strong> 꽃잎 떨어지는 순간</li>
                      </ul>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold text-indigo-800 mb-3">구도와 앵글</h4>
                      <ul className="space-y-2 text-sm text-indigo-700">
                        <li>• <strong>전경:</strong> 꽃을 전경으로 골프장 배경</li>
                        <li>• <strong>로우앵글:</strong> 잔디와 하늘의 대비</li>
                        <li>• <strong>클로즈업:</strong> 플레이 순간의 집중</li>
                        <li>• <strong>와이드샷:</strong> 전체적인 봄 경관</li>
                      </ul>
                    </div>
                  </div>
                  
                  <div className="mt-6 bg-white p-4 rounded-lg border border-indigo-200">
                    <h4 className="font-semibold text-indigo-800 mb-2">📱 스마트폰 촬영 꿀팁</h4>
                    <div className="grid md:grid-cols-3 gap-4 text-sm text-indigo-700">
                      <div>
                        <strong>설정:</strong>
                        <ul className="mt-1 space-y-1">
                          <li>• HDR 모드 활용</li>
                          <li>• 포트레이트 모드</li>
                          <li>• 그리드 라인 사용</li>
                        </ul>
                      </div>
                      <div>
                        <strong>편집:</strong>
                        <ul className="mt-1 space-y-1">
                          <li>• 채도 살짝 높이기</li>
                          <li>• 밝기 조절</li>
                          <li>• 자연스러운 필터</li>
                        </ul>
                      </div>
                      <div>
                        <strong>공유:</strong>
                        <ul className="mt-1 space-y-1">
                          <li>• 해시태그 활용</li>
                          <li>• 위치 태그</li>
                          <li>• 스토리 공유</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            </div>

            {/* CTA 섹션 */}
            <div className="mt-12 bg-gradient-to-r from-pink-500 to-rose-500 rounded-xl p-8 text-white text-center">
              <h2 className="text-2xl font-bold mb-4">봄 파크골프장을 찾아 떠나보세요! 🌸</h2>
              <p className="mb-6 text-pink-100">
                벚꽃이 만개한 전국의 아름다운 파크골프장에서 특별한 봄 라운드를 즐겨보세요.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/"
                  className="inline-flex items-center px-6 py-3 bg-white text-pink-600 rounded-lg font-semibold hover:bg-pink-50 transition-colors"
                >
                  파크골프장 지도 보기
                  <span className="ml-2">🗺️</span>
                </Link>
                <Link
                  href="/guide/seasonal/summer-tips"
                  className="inline-flex items-center px-6 py-3 bg-white/20 text-white rounded-lg font-semibold hover:bg-white/30 transition-colors border border-white/30"
                >
                  여름 가이드 보기
                  <span className="ml-2">☀️</span>
                </Link>
              </div>
            </div>
          </div>
        </article>
      </main>
    </div>
  );
}
