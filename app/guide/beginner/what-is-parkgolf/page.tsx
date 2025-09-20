import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: '파크골프란? 기본 개념부터 시작하기 | 파크골프 완벽 가이드',
  description: '파크골프의 정의, 일반 골프와의 차이점, 매력 포인트를 상세히 알아보세요. 초보자도 쉽게 이해할 수 있는 파크골프 기본 가이드입니다.',
  keywords: '파크골프란, 파크골프 정의, 파크골프 vs 골프, 파크골프 특징, 파크골프 매력, 파크골프 기본',
};

export default function WhatIsParkGolfPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* 브레드크럼 */}
        <nav className="flex mb-8 text-sm text-gray-500">
          <Link href="/" className="hover:text-blue-600">홈</Link>
          <span className="mx-2">/</span>
          <Link href="/guide" className="hover:text-blue-600">가이드</Link>
          <span className="mx-2">/</span>
          <Link href="/guide#beginner" className="hover:text-blue-600">초보자 가이드</Link>
          <span className="mx-2">/</span>
          <span className="text-gray-900">파크골프란?</span>
        </nav>

        <article className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
          {/* 헤더 */}
          <div className="bg-gradient-to-r from-green-600 to-blue-600 px-8 py-12 text-white">
            <div className="text-center">
              <div className="inline-flex items-center justify-center p-3 bg-white/20 rounded-full mb-6">
                <span className="text-4xl">🌟</span>
              </div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
                파크골프란?
              </h1>
              <p className="text-xl text-green-100 max-w-2xl mx-auto">
                누구나 쉽게 즐길 수 있는 새로운 스포츠, 파크골프의 모든 것
              </p>
              <div className="mt-6 text-sm text-green-100">
                <span>📖 읽기 시간: 5분</span>
                <span className="mx-2">•</span>
                <span>👤 초보자 추천</span>
              </div>
            </div>
          </div>

          {/* 콘텐츠 */}
          <div className="px-8 py-12">
            {/* 목차 */}
            <div className="bg-blue-50 rounded-xl p-6 mb-8">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">📋 이 글에서 다룰 내용</h2>
              <ul className="space-y-2 text-sm">
                <li><a href="#definition" className="text-blue-600 hover:underline">1. 파크골프의 정의</a></li>
                <li><a href="#vs-golf" className="text-blue-600 hover:underline">2. 일반 골프와의 차이점</a></li>
                <li><a href="#characteristics" className="text-blue-600 hover:underline">3. 파크골프의 특징</a></li>
                <li><a href="#benefits" className="text-blue-600 hover:underline">4. 파크골프의 매력과 장점</a></li>
                <li><a href="#history" className="text-blue-600 hover:underline">5. 파크골프의 역사</a></li>
              </ul>
            </div>

            {/* 본문 */}
            <div className="prose prose-lg max-w-none">
              <section id="definition" className="mb-12">
                <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                  <span className="bg-green-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm mr-3">1</span>
                  파크골프의 정의
                </h2>
                
                <div className="bg-green-50 border-l-4 border-green-500 p-6 rounded-r-lg mb-6">
                  <p className="text-lg font-semibold text-green-800 mb-2">
                    파크골프(Park Golf)란?
                  </p>
                  <p className="text-green-700">
                    공원이나 자연환경을 활용하여 만든 골프장에서 즐기는 스포츠로, 
                    일반 골프보다 간단하고 누구나 쉽게 접근할 수 있도록 고안된 레저 스포츠입니다.
                  </p>
                </div>

                <p className="text-gray-700 mb-4">
                  파크골프는 1983년 일본 홋카이도에서 시작된 스포츠로, 골프의 재미는 그대로 유지하면서도 
                  더 쉽고 부담 없이 즐길 수 있도록 만들어졌습니다. 한국에는 2000년대 초반에 도입되어 
                  현재 전국 400여 개의 파크골프장에서 많은 사람들이 즐기고 있습니다.
                </p>

                <div className="grid md:grid-cols-2 gap-6 mt-8">
                  <div className="bg-blue-50 p-6 rounded-xl">
                    <h3 className="font-semibold text-blue-900 mb-3">🎯 파크골프의 목표</h3>
                    <ul className="text-sm text-blue-800 space-y-2">
                      <li>• 적은 타수로 홀컵에 공 넣기</li>
                      <li>• 자연과 함께하는 건강한 운동</li>
                      <li>• 남녀노소 누구나 즐길 수 있는 스포츠</li>
                    </ul>
                  </div>
                  <div className="bg-purple-50 p-6 rounded-xl">
                    <h3 className="font-semibold text-purple-900 mb-3">⏱️ 플레이 시간</h3>
                    <ul className="text-sm text-purple-800 space-y-2">
                      <li>• 9홀: 약 1-1.5시간</li>
                      <li>• 18홀: 약 2-3시간</li>
                      <li>• 부담 없는 운동량</li>
                    </ul>
                  </div>
                </div>
              </section>

              <section id="vs-golf" className="mb-12">
                <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                  <span className="bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm mr-3">2</span>
                  일반 골프와의 차이점
                </h2>

                <div className="overflow-x-auto">
                  <table className="w-full border-collapse border border-gray-300 rounded-lg overflow-hidden">
                    <thead>
                      <tr className="bg-gray-100">
                        <th className="border border-gray-300 px-4 py-3 text-left font-semibold">구분</th>
                        <th className="border border-gray-300 px-4 py-3 text-left font-semibold text-green-700">파크골프</th>
                        <th className="border border-gray-300 px-4 py-3 text-left font-semibold text-blue-700">일반 골프</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="border border-gray-300 px-4 py-3 font-medium">클럽 개수</td>
                        <td className="border border-gray-300 px-4 py-3 text-green-700">1개 (파크골프 전용클럽)</td>
                        <td className="border border-gray-300 px-4 py-3 text-blue-700">여러 개 (드라이버, 아이언 등)</td>
                      </tr>
                      <tr className="bg-gray-50">
                        <td className="border border-gray-300 px-4 py-3 font-medium">홀 거리</td>
                        <td className="border border-gray-300 px-4 py-3 text-green-700">30-100m (짧음)</td>
                        <td className="border border-gray-300 px-4 py-3 text-blue-700">100-500m (길음)</td>
                      </tr>
                      <tr>
                        <td className="border border-gray-300 px-4 py-3 font-medium">이용료</td>
                        <td className="border border-gray-300 px-4 py-3 text-green-700">무료-5,000원</td>
                        <td className="border border-gray-300 px-4 py-3 text-blue-700">50,000원-200,000원</td>
                      </tr>
                      <tr className="bg-gray-50">
                        <td className="border border-gray-300 px-4 py-3 font-medium">복장</td>
                        <td className="border border-gray-300 px-4 py-3 text-green-700">자유로운 복장</td>
                        <td className="border border-gray-300 px-4 py-3 text-blue-700">정장 또는 골프웨어</td>
                      </tr>
                      <tr>
                        <td className="border border-gray-300 px-4 py-3 font-medium">접근성</td>
                        <td className="border border-gray-300 px-4 py-3 text-green-700">누구나 쉽게</td>
                        <td className="border border-gray-300 px-4 py-3 text-blue-700">진입장벽 높음</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </section>

              <section id="characteristics" className="mb-12">
                <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                  <span className="bg-purple-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm mr-3">3</span>
                  파크골프의 특징
                </h2>

                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">🏌️‍♂️ 플레이 특징</h3>
                    <ul className="space-y-3 text-gray-700">
                      <li className="flex items-start">
                        <span className="text-green-500 mr-2">✓</span>
                        <span><strong>단순한 장비:</strong> 클럽 1개, 공 1개면 충분</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-green-500 mr-2">✓</span>
                        <span><strong>짧은 거리:</strong> 30-100m의 짧은 홀</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-green-500 mr-2">✓</span>
                        <span><strong>간단한 규칙:</strong> 기본 규칙만 알면 바로 시작</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-green-500 mr-2">✓</span>
                        <span><strong>안전성:</strong> 공이 높이 뜨지 않아 안전</span>
                      </li>
                    </ul>
                  </div>
                  
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">🌳 환경 특징</h3>
                    <ul className="space-y-3 text-gray-700">
                      <li className="flex items-start">
                        <span className="text-blue-500 mr-2">✓</span>
                        <span><strong>공원 활용:</strong> 기존 공원을 활용한 코스</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-blue-500 mr-2">✓</span>
                        <span><strong>자연친화적:</strong> 환경을 해치지 않는 설계</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-blue-500 mr-2">✓</span>
                        <span><strong>접근성:</strong> 도심 근처에 위치</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-blue-500 mr-2">✓</span>
                        <span><strong>공공성:</strong> 대부분 공공시설로 운영</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </section>

              <section id="benefits" className="mb-12">
                <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                  <span className="bg-red-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm mr-3">4</span>
                  파크골프의 매력과 장점
                </h2>

                <div className="grid md:grid-cols-3 gap-6">
                  <div className="bg-yellow-50 p-6 rounded-xl border border-yellow-200">
                    <div className="text-2xl mb-3">💰</div>
                    <h3 className="font-semibold text-yellow-800 mb-2">경제적 부담 없음</h3>
                    <p className="text-sm text-yellow-700">
                      대부분 무료이거나 저렴한 이용료로 부담 없이 즐길 수 있습니다.
                    </p>
                  </div>
                  
                  <div className="bg-green-50 p-6 rounded-xl border border-green-200">
                    <div className="text-2xl mb-3">👨‍👩‍👧‍👦</div>
                    <h3 className="font-semibold text-green-800 mb-2">가족 스포츠</h3>
                    <p className="text-sm text-green-700">
                      남녀노소 구분 없이 온 가족이 함께 즐길 수 있는 스포츠입니다.
                    </p>
                  </div>
                  
                  <div className="bg-blue-50 p-6 rounded-xl border border-blue-200">
                    <div className="text-2xl mb-3">🏃‍♂️</div>
                    <h3 className="font-semibold text-blue-800 mb-2">적당한 운동량</h3>
                    <p className="text-sm text-blue-700">
                      과하지 않은 운동량으로 건강 관리에 최적입니다.
                    </p>
                  </div>
                  
                  <div className="bg-purple-50 p-6 rounded-xl border border-purple-200">
                    <div className="text-2xl mb-3">🧠</div>
                    <h3 className="font-semibold text-purple-800 mb-2">집중력 향상</h3>
                    <p className="text-sm text-purple-700">
                      정확한 샷을 위한 집중으로 스트레스 해소에 도움됩니다.
                    </p>
                  </div>
                  
                  <div className="bg-pink-50 p-6 rounded-xl border border-pink-200">
                    <div className="text-2xl mb-3">🤝</div>
                    <h3 className="font-semibold text-pink-800 mb-2">사교 활동</h3>
                    <p className="text-sm text-pink-700">
                      새로운 사람들과의 만남과 교류의 기회를 제공합니다.
                    </p>
                  </div>
                  
                  <div className="bg-indigo-50 p-6 rounded-xl border border-indigo-200">
                    <div className="text-2xl mb-3">🌿</div>
                    <h3 className="font-semibold text-indigo-800 mb-2">자연 친화</h3>
                    <p className="text-sm text-indigo-700">
                      자연 속에서 즐기는 힐링 스포츠로 정신 건강에 좋습니다.
                    </p>
                  </div>
                </div>
              </section>

              <section id="history" className="mb-12">
                <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                  <span className="bg-orange-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm mr-3">5</span>
                  파크골프의 역사
                </h2>

                <div className="bg-gray-50 p-6 rounded-xl">
                  <div className="space-y-6">
                    <div className="flex items-start space-x-4">
                      <div className="bg-blue-500 text-white rounded-full w-10 h-10 flex items-center justify-center text-sm font-semibold flex-shrink-0">
                        1983
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900">일본 홋카이도에서 시작</h4>
                        <p className="text-sm text-gray-600">
                          마키베츠쵸(幕別町)에서 주민들의 건강증진과 교류를 위해 개발
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-start space-x-4">
                      <div className="bg-green-500 text-white rounded-full w-10 h-10 flex items-center justify-center text-sm font-semibold flex-shrink-0">
                        2000s
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900">한국 도입</h4>
                        <p className="text-sm text-gray-600">
                          2000년대 초반 한국에 도입되어 빠르게 확산
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-start space-x-4">
                      <div className="bg-purple-500 text-white rounded-full w-10 h-10 flex items-center justify-center text-sm font-semibold flex-shrink-0">
                        현재
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900">전국 확산</h4>
                        <p className="text-sm text-gray-600">
                          전국 424개 파크골프장, 수십만 명의 동호인 보유
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            </div>

            {/* CTA 섹션 */}
            <div className="mt-12 bg-gradient-to-r from-green-500 to-blue-500 rounded-xl p-8 text-white text-center">
              <h2 className="text-2xl font-bold mb-4">파크골프에 관심이 생기셨나요? 🎯</h2>
              <p className="mb-6 text-green-100">
                이제 장비 준비와 첫 라운드 가이드를 확인해보세요!
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/guide/beginner/equipment-guide"
                  className="inline-flex items-center px-6 py-3 bg-white text-green-600 rounded-lg font-semibold hover:bg-green-50 transition-colors"
                >
                  장비 가이드 보기
                  <span className="ml-2">🏌️‍♂️</span>
                </Link>
                <Link
                  href="/"
                  className="inline-flex items-center px-6 py-3 bg-white/20 text-white rounded-lg font-semibold hover:bg-white/30 transition-colors border border-white/30"
                >
                  파크골프장 찾기
                  <span className="ml-2">🗺️</span>
                </Link>
              </div>
            </div>
          </div>
        </article>
      </main>
    </div>
  );
}
