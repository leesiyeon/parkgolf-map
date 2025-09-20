import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: '파크골프 기본 규칙 완벽 정리 - 스코어 계산법, 플레이 순서 | 파크골프 규칙',
  description: '파크골프 기본 규칙을 쉽게 설명합니다. 스코어 계산법, 플레이 순서, 기본 룰을 완벽 정리하여 초보자도 쉽게 이해할 수 있습니다.',
  keywords: '파크골프 규칙, 파크골프 스코어, 파크골프 플레이 순서, 파크골프 룰, 파크골프 기본규칙, 파크골프 점수',
};

export default function BasicRulesPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* 브레드크럼 */}
        <nav className="flex mb-8 text-sm text-gray-500">
          <Link href="/" className="hover:text-blue-600">홈</Link>
          <span className="mx-2">/</span>
          <Link href="/guide" className="hover:text-blue-600">가이드</Link>
          <span className="mx-2">/</span>
          <Link href="/guide#rules" className="hover:text-blue-600">규칙 & 에티켓</Link>
          <span className="mx-2">/</span>
          <span className="text-gray-900">기본 규칙</span>
        </nav>

        <article className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
          {/* 헤더 */}
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-8 py-12 text-white">
            <div className="text-center">
              <div className="inline-flex items-center justify-center p-3 bg-white/20 rounded-full mb-6">
                <span className="text-4xl">📋</span>
              </div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
                파크골프 기본 규칙
              </h1>
              <p className="text-xl text-blue-100 max-w-2xl mx-auto">
                스코어 계산법부터 플레이 순서까지, 파크골프의 모든 규칙을 완벽 정리
              </p>
              <div className="mt-6 text-sm text-blue-100">
                <span>📖 읽기 시간: 8분</span>
                <span className="mx-2">•</span>
                <span>📋 규칙 가이드</span>
              </div>
            </div>
          </div>

          {/* 콘텐츠 */}
          <div className="px-8 py-12">
            {/* 목차 */}
            <div className="bg-blue-50 rounded-xl p-6 mb-8">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">📋 이 글에서 다룰 내용</h2>
              <ul className="space-y-2 text-sm">
                <li><a href="#basic-concept" className="text-blue-600 hover:underline">1. 파크골프 기본 개념</a></li>
                <li><a href="#scoring" className="text-blue-600 hover:underline">2. 스코어 계산법</a></li>
                <li><a href="#play-order" className="text-blue-600 hover:underline">3. 플레이 순서</a></li>
                <li><a href="#course-rules" className="text-blue-600 hover:underline">4. 코스 내 규칙</a></li>
                <li><a href="#penalty-rules" className="text-blue-600 hover:underline">5. 벌타 규칙</a></li>
                <li><a href="#special-situations" className="text-blue-600 hover:underline">6. 특수 상황 처리</a></li>
              </ul>
            </div>

            {/* 핵심 요약 */}
            <div className="bg-green-50 border border-green-200 rounded-xl p-6 mb-8">
              <h2 className="text-xl font-semibold text-green-800 mb-4">⚡ 파크골프 핵심 규칙 요약</h2>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <h3 className="font-medium text-green-700 mb-2">기본 원칙</h3>
                  <ul className="space-y-1 text-sm text-green-600">
                    <li>• 적은 타수로 홀컵에 공 넣기</li>
                    <li>• 공이 정지한 곳에서 다음 샷</li>
                    <li>• 홀컵에서 먼 사람이 먼저 플레이</li>
                    <li>• 다른 플레이어 방해 금지</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-medium text-green-700 mb-2">스코어</h3>
                  <ul className="space-y-1 text-sm text-green-600">
                    <li>• 파(Par): 기준 타수</li>
                    <li>• 홀인원: 1타에 홀컵 성공</li>
                    <li>• 버디: 기준보다 1타 적게</li>
                    <li>• 보기: 기준보다 1타 많게</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* 본문 */}
            <div className="prose prose-lg max-w-none">
              <section id="basic-concept" className="mb-12">
                <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                  <span className="bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm mr-3">1</span>
                  파크골프 기본 개념
                </h2>

                <div className="bg-blue-50 p-6 rounded-xl mb-6">
                  <h3 className="text-xl font-semibold text-blue-900 mb-4">🎯 게임의 목표</h3>
                  <p className="text-blue-800 mb-4">
                    파크골프의 목표는 <strong>가장 적은 타수로 공을 홀컵에 넣는 것</strong>입니다. 
                    각 홀마다 정해진 기준 타수(파)가 있으며, 이보다 적은 타수로 완주하는 것이 좋은 스코어입니다.
                  </p>
                  
                  <div className="grid md:grid-cols-3 gap-4 mt-6">
                    <div className="bg-white p-4 rounded-lg border border-blue-200">
                      <h4 className="font-semibold text-blue-800 mb-2">파3 홀</h4>
                      <p className="text-sm text-blue-700">30-50m 거리<br/>기준 타수: 3타</p>
                    </div>
                    <div className="bg-white p-4 rounded-lg border border-blue-200">
                      <h4 className="font-semibold text-blue-800 mb-2">파4 홀</h4>
                      <p className="text-sm text-blue-700">51-80m 거리<br/>기준 타수: 4타</p>
                    </div>
                    <div className="bg-white p-4 rounded-lg border border-blue-200">
                      <h4 className="font-semibold text-blue-800 mb-2">파5 홀</h4>
                      <p className="text-sm text-blue-700">81m 이상 거리<br/>기준 타수: 5타</p>
                    </div>
                  </div>
                </div>

                <div className="bg-purple-50 p-6 rounded-xl">
                  <h3 className="text-xl font-semibold text-purple-900 mb-4">🏌️‍♂️ 플레이 방식</h3>
                  <div className="space-y-3 text-purple-800">
                    <p><strong>1. 티샷:</strong> 각 홀의 티잉 구역에서 첫 번째 샷을 합니다.</p>
                    <p><strong>2. 세컨드 샷:</strong> 공이 멈춘 지점에서 다음 샷을 계속합니다.</p>
                    <p><strong>3. 홀아웃:</strong> 공이 홀컵에 들어갈 때까지 반복합니다.</p>
                    <p><strong>4. 스코어 기록:</strong> 총 타수를 기록하고 다음 홀로 이동합니다.</p>
                  </div>
                </div>
              </section>

              <section id="scoring" className="mb-12">
                <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                  <span className="bg-green-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm mr-3">2</span>
                  스코어 계산법
                </h2>

                <div className="bg-green-50 p-6 rounded-xl mb-6">
                  <h3 className="text-xl font-semibold text-green-900 mb-4">📊 스코어 용어</h3>
                  
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse border border-gray-300 rounded-lg overflow-hidden">
                      <thead>
                        <tr className="bg-green-100">
                          <th className="border border-gray-300 px-4 py-3 text-left font-semibold">용어</th>
                          <th className="border border-gray-300 px-4 py-3 text-left font-semibold">의미</th>
                          <th className="border border-gray-300 px-4 py-3 text-left font-semibold">파3 기준</th>
                          <th className="border border-gray-300 px-4 py-3 text-left font-semibold">파4 기준</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td className="border border-gray-300 px-4 py-3 font-medium text-yellow-700">홀인원</td>
                          <td className="border border-gray-300 px-4 py-3">1타에 홀컵 성공</td>
                          <td className="border border-gray-300 px-4 py-3 text-center">1타</td>
                          <td className="border border-gray-300 px-4 py-3 text-center">1타</td>
                        </tr>
                        <tr className="bg-gray-50">
                          <td className="border border-gray-300 px-4 py-3 font-medium text-blue-700">이글</td>
                          <td className="border border-gray-300 px-4 py-3">기준보다 2타 적게</td>
                          <td className="border border-gray-300 px-4 py-3 text-center">1타</td>
                          <td className="border border-gray-300 px-4 py-3 text-center">2타</td>
                        </tr>
                        <tr>
                          <td className="border border-gray-300 px-4 py-3 font-medium text-green-700">버디</td>
                          <td className="border border-gray-300 px-4 py-3">기준보다 1타 적게</td>
                          <td className="border border-gray-300 px-4 py-3 text-center">2타</td>
                          <td className="border border-gray-300 px-4 py-3 text-center">3타</td>
                        </tr>
                        <tr className="bg-gray-50">
                          <td className="border border-gray-300 px-4 py-3 font-medium text-gray-700">파</td>
                          <td className="border border-gray-300 px-4 py-3">기준 타수와 동일</td>
                          <td className="border border-gray-300 px-4 py-3 text-center">3타</td>
                          <td className="border border-gray-300 px-4 py-3 text-center">4타</td>
                        </tr>
                        <tr>
                          <td className="border border-gray-300 px-4 py-3 font-medium text-orange-700">보기</td>
                          <td className="border border-gray-300 px-4 py-3">기준보다 1타 많게</td>
                          <td className="border border-gray-300 px-4 py-3 text-center">4타</td>
                          <td className="border border-gray-300 px-4 py-3 text-center">5타</td>
                        </tr>
                        <tr className="bg-gray-50">
                          <td className="border border-gray-300 px-4 py-3 font-medium text-red-700">더블보기</td>
                          <td className="border border-gray-300 px-4 py-3">기준보다 2타 많게</td>
                          <td className="border border-gray-300 px-4 py-3 text-center">5타</td>
                          <td className="border border-gray-300 px-4 py-3 text-center">6타</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                <div className="bg-yellow-50 p-6 rounded-xl">
                  <h3 className="text-xl font-semibold text-yellow-900 mb-4">🏆 최종 스코어 계산</h3>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold text-yellow-800 mb-3">총합 계산법</h4>
                      <div className="bg-white p-4 rounded-lg border border-yellow-200">
                        <p className="text-sm text-yellow-700 mb-2">
                          <strong>예시: 9홀 플레이</strong>
                        </p>
                        <ul className="text-sm text-yellow-700 space-y-1">
                          <li>1홀(파3): 4타 → +1</li>
                          <li>2홀(파4): 3타 → -1</li>
                          <li>3홀(파3): 3타 → 0</li>
                          <li>...계속...</li>
                          <li><strong>총합: 35타 (파대비 +8)</strong></li>
                        </ul>
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold text-yellow-800 mb-3">스코어 표현</h4>
                      <div className="bg-white p-4 rounded-lg border border-yellow-200">
                        <ul className="text-sm text-yellow-700 space-y-2">
                          <li><strong>언더파:</strong> 기준보다 적은 타수</li>
                          <li>예) 27홀 파에서 -3 = 3언더</li>
                          <li><strong>오버파:</strong> 기준보다 많은 타수</li>
                          <li>예) 27홀 파에서 +5 = 5오버</li>
                          <li><strong>이븐파:</strong> 기준과 동일한 타수</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              <section id="play-order" className="mb-12">
                <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                  <span className="bg-purple-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm mr-3">3</span>
                  플레이 순서
                </h2>

                <div className="space-y-6">
                  <div className="bg-purple-50 p-6 rounded-xl">
                    <h3 className="text-xl font-semibold text-purple-900 mb-4">🥇 티샷 순서</h3>
                    
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-semibold text-purple-800 mb-3">첫 홀</h4>
                        <ul className="space-y-2 text-sm text-purple-700">
                          <li>• 가위바위보 또는 추첨으로 결정</li>
                          <li>• 나이 순서로 결정하기도 함</li>
                          <li>• 일반적으로 연장자가 먼저</li>
                          <li>• 합의된 순서로 진행</li>
                        </ul>
                      </div>
                      
                      <div>
                        <h4 className="font-semibold text-purple-800 mb-3">두 번째 홀부터</h4>
                        <ul className="space-y-2 text-sm text-purple-700">
                          <li>• 이전 홀 최고 스코어가 먼저</li>
                          <li>• 동점일 경우 이전 순서 유지</li>
                          <li>• 홀인원 시 다음 홀 선타권</li>
                          <li>• 오너(Honor) 시스템</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div className="bg-blue-50 p-6 rounded-xl">
                    <h3 className="text-xl font-semibold text-blue-900 mb-4">⛳ 세컨드 샷 이후 순서</h3>
                    
                    <div className="bg-white p-4 rounded-lg border border-blue-200 mb-4">
                      <h4 className="font-semibold text-blue-800 mb-2">기본 원칙</h4>
                      <p className="text-blue-700 text-sm">
                        <strong>홀컵에서 가장 먼 사람이 먼저 플레이합니다.</strong>
                        이는 공정성을 위한 가장 중요한 규칙입니다.
                      </p>
                    </div>
                    
                    <div className="space-y-3">
                      <div className="flex items-start space-x-3">
                        <span className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-semibold flex-shrink-0 mt-0.5">1</span>
                        <p className="text-sm text-blue-800">모든 플레이어가 티샷을 완료합니다.</p>
                      </div>
                      <div className="flex items-start space-x-3">
                        <span className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-semibold flex-shrink-0 mt-0.5">2</span>
                        <p className="text-sm text-blue-800">홀컵에서 가장 먼 공의 주인이 먼저 플레이합니다.</p>
                      </div>
                      <div className="flex items-start space-x-3">
                        <span className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-semibold flex-shrink-0 mt-0.5">3</span>
                        <p className="text-sm text-blue-800">그 다음 먼 순서대로 계속 플레이합니다.</p>
                      </div>
                      <div className="flex items-start space-x-3">
                        <span className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-semibold flex-shrink-0 mt-0.5">4</span>
                        <p className="text-sm text-blue-800">모든 공이 홀컵에 들어갈 때까지 반복합니다.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              <section id="course-rules" className="mb-12">
                <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                  <span className="bg-orange-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm mr-3">4</span>
                  코스 내 규칙
                </h2>

                <div className="grid md:grid-cols-2 gap-8">
                  <div className="bg-orange-50 p-6 rounded-xl">
                    <h3 className="text-xl font-semibold text-orange-900 mb-4">🎯 플레이 규칙</h3>
                    
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-semibold text-orange-800 mb-2">공의 위치</h4>
                        <ul className="space-y-1 text-sm text-orange-700">
                          <li>• 공이 정지한 곳에서 플레이</li>
                          <li>• 공을 임의로 움직이면 안 됨</li>
                          <li>• 라이 개선 불가</li>
                          <li>• 마킹 후에만 집어올릴 수 있음</li>
                        </ul>
                      </div>
                      
                      <div>
                        <h4 className="font-semibold text-orange-800 mb-2">클럽 사용</h4>
                        <ul className="space-y-1 text-sm text-orange-700">
                          <li>• 파크골프 전용 클럽만 사용</li>
                          <li>• 1개의 클럽으로만 플레이</li>
                          <li>• 클럽 바꾸기 불가</li>
                          <li>• 다른 용도로 사용 금지</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-red-50 p-6 rounded-xl">
                    <h3 className="text-xl font-semibold text-red-900 mb-4">🚫 금지 사항</h3>
                    
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-semibold text-red-800 mb-2">플레이 중</h4>
                        <ul className="space-y-1 text-sm text-red-700">
                          <li>• 다른 플레이어 방해</li>
                          <li>• 큰 소리나 급작스런 움직임</li>
                          <li>• 플레이 라인에 서기</li>
                          <li>• 조언 구하기 또는 주기</li>
                        </ul>
                      </div>
                      
                      <div>
                        <h4 className="font-semibold text-red-800 mb-2">코스 관리</h4>
                        <ul className="space-y-1 text-sm text-red-700">
                          <li>• 잔디 손상시키기</li>
                          <li>• 쓰레기 버리기</li>
                          <li>• 시설물 손상</li>
                          <li>• 흡연 (금연 구역)</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              <section id="penalty-rules" className="mb-12">
                <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                  <span className="bg-red-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm mr-3">5</span>
                  벌타 규칙
                </h2>

                <div className="bg-red-50 p-6 rounded-xl mb-6">
                  <h3 className="text-xl font-semibold text-red-900 mb-4">⚠️ 주요 벌타 상황</h3>
                  
                  <div className="space-y-4">
                    <div className="bg-white p-4 rounded-lg border border-red-200">
                      <h4 className="font-semibold text-red-800 mb-2">OB (Out of Bounds) - 1타 벌타</h4>
                      <ul className="text-sm text-red-700 space-y-1">
                        <li>• 경계선 밖으로 공이 나간 경우</li>
                        <li>• 원래 위치에서 다시 플레이</li>
                        <li>• 플레이한 타수 + 벌타 1타 추가</li>
                        <li>• 흰 말뚝이나 선으로 경계 표시</li>
                      </ul>
                    </div>
                    
                    <div className="bg-white p-4 rounded-lg border border-red-200">
                      <h4 className="font-semibold text-red-800 mb-2">워터 해저드 - 1타 벌타</h4>
                      <ul className="text-sm text-red-700 space-y-1">
                        <li>• 연못, 개울 등에 공이 들어간 경우</li>
                        <li>• 해저드 경계에서 가장 가까운 지점</li>
                        <li>• 홀에서 멀어지지 않는 범위 내</li>
                        <li>• 노란색 또는 빨간색 말뚝 표시</li>
                      </ul>
                    </div>
                    
                    <div className="bg-white p-4 rounded-lg border border-red-200">
                      <h4 className="font-semibold text-red-800 mb-2">분실구 - 1타 벌타</h4>
                      <ul className="text-sm text-red-700 space-y-1">
                        <li>• 5분 이내 찾지 못한 경우</li>
                        <li>• 마지막 플레이 지점에서 재플레이</li>
                        <li>• 동반자들과 함께 찾기</li>
                        <li>• 플레이 지연 방지를 위해 빠르게 처리</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="bg-yellow-50 p-6 rounded-xl">
                  <h3 className="text-xl font-semibold text-yellow-900 mb-4">💡 벌타 처리 팁</h3>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold text-yellow-800 mb-3">사전 예방</h4>
                      <ul className="space-y-1 text-sm text-yellow-700">
                        <li>• 코스 경계 미리 확인</li>
                        <li>• 공의 방향 주의 깊게 관찰</li>
                        <li>• 무리한 샷 피하기</li>
                        <li>• 안전한 플레이 우선</li>
                      </ul>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold text-yellow-800 mb-3">발생 시 대처</h4>
                      <ul className="space-y-1 text-sm text-yellow-700">
                        <li>• 침착하게 규칙 적용</li>
                        <li>• 동반자와 상의</li>
                        <li>• 정확한 벌타 계산</li>
                        <li>• 빠른 플레이 진행</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </section>

              <section id="special-situations" className="mb-12">
                <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                  <span className="bg-indigo-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm mr-3">6</span>
                  특수 상황 처리
                </h2>

                <div className="space-y-6">
                  <div className="bg-indigo-50 p-6 rounded-xl">
                    <h3 className="text-xl font-semibold text-indigo-900 mb-4">🌧️ 날씨 상황</h3>
                    
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-semibold text-indigo-800 mb-3">비가 올 때</h4>
                        <ul className="space-y-1 text-sm text-indigo-700">
                          <li>• 플레이 중단 여부 판단</li>
                          <li>• 안전 최우선 고려</li>
                          <li>• 임시 물 제거 가능</li>
                          <li>• 우산 사용 허용</li>
                        </ul>
                      </div>
                      
                      <div>
                        <h4 className="font-semibold text-indigo-800 mb-3">강풍일 때</h4>
                        <ul className="space-y-1 text-sm text-indigo-700">
                          <li>• 공이 움직여도 벌타 없음</li>
                          <li>• 안전 거리 유지</li>
                          <li>• 신중한 샷 선택</li>
                          <li>• 플레이 중단 고려</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div className="bg-teal-50 p-6 rounded-xl">
                    <h3 className="text-xl font-semibold text-teal-900 mb-4">🐕 동물 방해</h3>
                    
                    <div className="bg-white p-4 rounded-lg border border-teal-200">
                      <h4 className="font-semibold text-teal-800 mb-2">동물이 공을 움직인 경우</h4>
                      <ul className="text-sm text-teal-700 space-y-1">
                        <li>• 벌타 없이 원래 위치로 복구</li>
                        <li>• 정확한 위치를 모를 경우 추정</li>
                        <li>• 동반자들과 합의하여 결정</li>
                        <li>• 안전을 위해 동물과 거리 유지</li>
                      </ul>
                    </div>
                  </div>

                  <div className="bg-pink-50 p-6 rounded-xl">
                    <h3 className="text-xl font-semibold text-pink-900 mb-4">🏃‍♂️ 플레이 방해</h3>
                    
                    <div className="space-y-4">
                      <div className="bg-white p-4 rounded-lg border border-pink-200">
                        <h4 className="font-semibold text-pink-800 mb-2">다른 플레이어 공에 맞은 경우</h4>
                        <ul className="text-sm text-pink-700 space-y-1">
                          <li>• 맞은 공: 그 자리에서 플레이 계속</li>
                          <li>• 맞힌 공: 원래 위치로 복구</li>
                          <li>• 벌타 없음</li>
                          <li>• 사과하고 플레이 계속</li>
                        </ul>
                      </div>
                      
                      <div className="bg-white p-4 rounded-lg border border-pink-200">
                        <h4 className="font-semibold text-pink-800 mb-2">장애물에 의한 방해</h4>
                        <ul className="text-sm text-pink-700 space-y-1">
                          <li>• 인공 장애물: 무벌타 드롭 가능</li>
                          <li>• 자연 장애물: 그대로 플레이</li>
                          <li>• 움직일 수 있는 것: 제거 가능</li>
                          <li>• 의심스러울 때: 동반자와 상의</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            </div>

            {/* CTA 섹션 */}
            <div className="mt-12 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-xl p-8 text-white text-center">
              <h2 className="text-2xl font-bold mb-4">규칙을 익혔다면 에티켓도 배워보세요! 🤝</h2>
              <p className="mb-6 text-blue-100">
                규칙과 함께 파크골프 에티켓을 지키면 더욱 즐거운 플레이가 가능합니다.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/guide/rules/etiquette-guide"
                  className="inline-flex items-center px-6 py-3 bg-white text-blue-600 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
                >
                  에티켓 가이드 보기
                  <span className="ml-2">🤝</span>
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
