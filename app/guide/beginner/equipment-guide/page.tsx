import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: '파크골프 장비 완벽 가이드 - 클럽, 공, 복장 선택법 | 파크골프 초보자',
  description: '파크골프 초보자를 위한 완벽한 장비 가이드! 클럽 선택법, 공의 종류, 적절한 복장, 대여 방법까지 모든 것을 알려드립니다.',
  keywords: '파크골프 장비, 파크골프 클럽, 파크골프 공, 파크골프 복장, 파크골프 용품, 파크골프 클럽 추천',
};

export default function EquipmentGuidePage() {
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
          <span className="text-gray-900">장비 가이드</span>
        </nav>

        <article className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
          {/* 헤더 */}
          <div className="bg-gradient-to-r from-orange-600 to-red-600 px-8 py-12 text-white">
            <div className="text-center">
              <div className="inline-flex items-center justify-center p-3 bg-white/20 rounded-full mb-6">
                <span className="text-4xl">🏌️‍♂️</span>
              </div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
                파크골프 장비 가이드
              </h1>
              <p className="text-xl text-orange-100 max-w-2xl mx-auto">
                클럽부터 복장까지, 파크골프에 필요한 모든 장비를 완벽 정리
              </p>
              <div className="mt-6 text-sm text-orange-100">
                <span>📖 읽기 시간: 7분</span>
                <span className="mx-2">•</span>
                <span>👤 초보자 필수</span>
              </div>
            </div>
          </div>

          {/* 콘텐츠 */}
          <div className="px-8 py-12">
            {/* 목차 */}
            <div className="bg-orange-50 rounded-xl p-6 mb-8">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">📋 이 글에서 다룰 내용</h2>
              <ul className="space-y-2 text-sm">
                <li><a href="#essential" className="text-orange-600 hover:underline">1. 필수 장비 (클럽, 공)</a></li>
                <li><a href="#clothing" className="text-orange-600 hover:underline">2. 복장 및 신발</a></li>
                <li><a href="#optional" className="text-orange-600 hover:underline">3. 선택 장비</a></li>
                <li><a href="#buying-guide" className="text-orange-600 hover:underline">4. 구매 가이드</a></li>
                <li><a href="#rental" className="text-orange-600 hover:underline">5. 대여 방법</a></li>
                <li><a href="#maintenance" className="text-orange-600 hover:underline">6. 장비 관리법</a></li>
              </ul>
            </div>

            {/* 빠른 체크리스트 */}
            <div className="bg-green-50 border border-green-200 rounded-xl p-6 mb-8">
              <h2 className="text-xl font-semibold text-green-800 mb-4">✅ 파크골프 필수 체크리스트</h2>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <h3 className="font-medium text-green-700 mb-2">반드시 필요한 것</h3>
                  <ul className="space-y-1 text-sm text-green-600">
                    <li>☑️ 파크골프 클럽 1개</li>
                    <li>☑️ 파크골프 공 2-3개</li>
                    <li>☑️ 편한 운동화</li>
                    <li>☑️ 활동하기 편한 복장</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-medium text-green-700 mb-2">있으면 좋은 것</h3>
                  <ul className="space-y-1 text-sm text-green-600">
                    <li>☑️ 모자 (햇빛 차단)</li>
                    <li>☑️ 물통</li>
                    <li>☑️ 작은 수건</li>
                    <li>☑️ 선크림</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* 본문 */}
            <div className="prose prose-lg max-w-none">
              <section id="essential" className="mb-12">
                <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                  <span className="bg-orange-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm mr-3">1</span>
                  필수 장비 - 클럽과 공
                </h2>

                {/* 파크골프 클럽 */}
                <div className="bg-blue-50 p-6 rounded-xl mb-6">
                  <h3 className="text-xl font-semibold text-blue-900 mb-4">🏌️‍♂️ 파크골프 클럽</h3>
                  
                  <div className="grid md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <h4 className="font-semibold text-blue-800 mb-3">클럽의 특징</h4>
                      <ul className="space-y-2 text-sm text-blue-700">
                        <li>• <strong>길이:</strong> 약 84cm (일반 골프클럽보다 짧음)</li>
                        <li>• <strong>무게:</strong> 약 500-600g</li>
                        <li>• <strong>헤드:</strong> 스테인리스 스틸 재질</li>
                        <li>• <strong>샤프트:</strong> 카본 또는 스틸</li>
                        <li>• <strong>로프트:</strong> 약 30도 (고정)</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold text-blue-800 mb-3">클럽 선택 기준</h4>
                      <ul className="space-y-2 text-sm text-blue-700">
                        <li>• <strong>신장에 맞는 길이</strong> (가장 중요)</li>
                        <li>• <strong>그립감:</strong> 손에 잘 맞는지 확인</li>
                        <li>• <strong>무게:</strong> 너무 무겁지 않은 것</li>
                        <li>• <strong>브랜드:</strong> 검증된 브랜드 선택</li>
                        <li>• <strong>가격:</strong> 5만원-20만원대</li>
                      </ul>
                    </div>
                  </div>

                  <div className="bg-white p-4 rounded-lg border border-blue-200">
                    <h4 className="font-semibold text-blue-900 mb-2">💡 초보자 클럽 추천</h4>
                    <p className="text-sm text-blue-800">
                      처음에는 중간 가격대(8-12만원)의 카본 샤프트 클럽을 추천합니다. 
                      너무 저렴한 클럽은 내구성이 떨어질 수 있고, 너무 비싼 클럽은 초보자에게 부담스러울 수 있습니다.
                    </p>
                  </div>
                </div>

                {/* 파크골프 공 */}
                <div className="bg-green-50 p-6 rounded-xl">
                  <h3 className="text-xl font-semibold text-green-900 mb-4">⚽ 파크골프 공</h3>
                  
                  <div className="grid md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <h4 className="font-semibold text-green-800 mb-3">공의 특징</h4>
                      <ul className="space-y-2 text-sm text-green-700">
                        <li>• <strong>크기:</strong> 지름 60mm (탁구공보다 큼)</li>
                        <li>• <strong>무게:</strong> 약 95g</li>
                        <li>• <strong>재질:</strong> 합성수지</li>
                        <li>• <strong>색상:</strong> 흰색, 노란색 등</li>
                        <li>• <strong>표면:</strong> 매끄러운 표면</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold text-green-800 mb-3">공 선택 팁</h4>
                      <ul className="space-y-2 text-sm text-green-700">
                        <li>• <strong>개수:</strong> 2-3개 준비 (분실 대비)</li>
                        <li>• <strong>색상:</strong> 잔디에서 잘 보이는 색</li>
                        <li>• <strong>품질:</strong> 균일한 무게와 모양</li>
                        <li>• <strong>가격:</strong> 개당 3,000-5,000원</li>
                        <li>• <strong>브랜드:</strong> 공인구 사용 권장</li>
                      </ul>
                    </div>
                  </div>

                  <div className="bg-white p-4 rounded-lg border border-green-200">
                    <h4 className="font-semibold text-green-900 mb-2">🎯 공 관리 팁</h4>
                    <p className="text-sm text-green-800">
                      파크골프 공은 잃어버리기 쉬우므로 이름을 적어두거나 특별한 마킹을 해두세요. 
                      또한 플레이 후에는 깨끗이 닦아서 보관하면 오래 사용할 수 있습니다.
                    </p>
                  </div>
                </div>
              </section>

              <section id="clothing" className="mb-12">
                <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                  <span className="bg-purple-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm mr-3">2</span>
                  복장 및 신발
                </h2>

                <div className="grid md:grid-cols-2 gap-8">
                  <div className="bg-purple-50 p-6 rounded-xl">
                    <h3 className="text-xl font-semibold text-purple-900 mb-4">👕 복장</h3>
                    
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-semibold text-purple-800 mb-2">기본 원칙</h4>
                        <ul className="space-y-1 text-sm text-purple-700">
                          <li>• 활동하기 편한 복장</li>
                          <li>• 너무 화려하지 않은 색상</li>
                          <li>• 계절에 맞는 옷차림</li>
                          <li>• 정장이나 골프웨어 불필요</li>
                        </ul>
                      </div>
                      
                      <div>
                        <h4 className="font-semibold text-purple-800 mb-2">계절별 추천</h4>
                        <ul className="space-y-1 text-sm text-purple-700">
                          <li>• <strong>봄/가을:</strong> 긴팔 티셔츠, 바람막이</li>
                          <li>• <strong>여름:</strong> 반팔, 모자 필수</li>
                          <li>• <strong>겨울:</strong> 보온성 좋은 옷, 장갑</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-blue-50 p-6 rounded-xl">
                    <h3 className="text-xl font-semibold text-blue-900 mb-4">👟 신발</h3>
                    
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-semibold text-blue-800 mb-2">신발 선택 기준</h4>
                        <ul className="space-y-1 text-sm text-blue-700">
                          <li>• 편안한 운동화 (가장 중요)</li>
                          <li>• 미끄럽지 않은 밑창</li>
                          <li>• 잔디를 손상시키지 않는 소재</li>
                          <li>• 방수 기능 (이슬, 비 대비)</li>
                        </ul>
                      </div>
                      
                      <div>
                        <h4 className="font-semibold text-blue-800 mb-2">피해야 할 신발</h4>
                        <ul className="space-y-1 text-sm text-blue-700">
                          <li>• 하이힐이나 구두</li>
                          <li>• 스파이크 신발</li>
                          <li>• 너무 무거운 신발</li>
                          <li>• 밑창이 너무 딱딱한 신발</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              <section id="optional" className="mb-12">
                <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                  <span className="bg-green-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm mr-3">3</span>
                  선택 장비 (있으면 좋은 것들)
                </h2>

                <div className="grid md:grid-cols-3 gap-6">
                  <div className="bg-yellow-50 p-4 rounded-xl border border-yellow-200">
                    <div className="text-2xl mb-2">🧢</div>
                    <h3 className="font-semibold text-yellow-800 mb-2">모자</h3>
                    <p className="text-sm text-yellow-700">
                      햇빛 차단과 시야 확보에 도움됩니다. 특히 여름철에는 필수입니다.
                    </p>
                  </div>
                  
                  <div className="bg-blue-50 p-4 rounded-xl border border-blue-200">
                    <div className="text-2xl mb-2">💧</div>
                    <h3 className="font-semibold text-blue-800 mb-2">물통</h3>
                    <p className="text-sm text-blue-700">
                      플레이 중 수분 보충용. 특히 더운 날씨에는 반드시 준비하세요.
                    </p>
                  </div>
                  
                  <div className="bg-pink-50 p-4 rounded-xl border border-pink-200">
                    <div className="text-2xl mb-2">🧴</div>
                    <h3 className="font-semibold text-pink-800 mb-2">선크림</h3>
                    <p className="text-sm text-pink-700">
                      야외 활동이므로 자외선 차단제는 필수입니다.
                    </p>
                  </div>
                  
                  <div className="bg-green-50 p-4 rounded-xl border border-green-200">
                    <div className="text-2xl mb-2">🧤</div>
                    <h3 className="font-semibold text-green-800 mb-2">장갑</h3>
                    <p className="text-sm text-green-700">
                      겨울철 보온용 또는 그립감 향상용으로 사용할 수 있습니다.
                    </p>
                  </div>
                  
                  <div className="bg-purple-50 p-4 rounded-xl border border-purple-200">
                    <div className="text-2xl mb-2">🎒</div>
                    <h3 className="font-semibold text-purple-800 mb-2">작은 가방</h3>
                    <p className="text-sm text-purple-700">
                      공과 개인용품을 넣을 수 있는 작은 가방이 있으면 편리합니다.
                    </p>
                  </div>
                  
                  <div className="bg-gray-50 p-4 rounded-xl border border-gray-200">
                    <div className="text-2xl mb-2">📝</div>
                    <h3 className="font-semibold text-gray-800 mb-2">스코어카드</h3>
                    <p className="text-sm text-gray-700">
                      점수 기록용. 대부분의 골프장에서 제공하지만 개인적으로 준비해도 좋습니다.
                    </p>
                  </div>
                </div>
              </section>

              <section id="buying-guide" className="mb-12">
                <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                  <span className="bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm mr-3">4</span>
                  구매 가이드
                </h2>

                <div className="bg-blue-50 p-6 rounded-xl mb-6">
                  <h3 className="text-xl font-semibold text-blue-900 mb-4">💰 예산별 구매 가이드</h3>
                  
                  <div className="space-y-4">
                    <div className="bg-white p-4 rounded-lg border border-blue-200">
                      <h4 className="font-semibold text-blue-800 mb-2">🥉 기본형 (5-8만원)</h4>
                      <ul className="text-sm text-blue-700 space-y-1">
                        <li>• 스틸 샤프트 클럽</li>
                        <li>• 기본형 공 2개</li>
                        <li>• 총 예산: 5-8만원</li>
                        <li>• 추천: 처음 시작하는 분</li>
                      </ul>
                    </div>
                    
                    <div className="bg-white p-4 rounded-lg border border-blue-200">
                      <h4 className="font-semibold text-blue-800 mb-2">🥈 표준형 (8-15만원)</h4>
                      <ul className="text-sm text-blue-700 space-y-1">
                        <li>• 카본 샤프트 클럽</li>
                        <li>• 고급형 공 3개</li>
                        <li>• 기본 액세서리 포함</li>
                        <li>• 총 예산: 8-15만원</li>
                        <li>• 추천: 꾸준히 즐기실 분</li>
                      </ul>
                    </div>
                    
                    <div className="bg-white p-4 rounded-lg border border-blue-200">
                      <h4 className="font-semibold text-blue-800 mb-2">🥇 고급형 (15만원 이상)</h4>
                      <ul className="text-sm text-blue-700 space-y-1">
                        <li>• 프리미엄 카본 클럽</li>
                        <li>• 전용 가방 및 액세서리</li>
                        <li>• 고급 공 세트</li>
                        <li>• 총 예산: 15만원 이상</li>
                        <li>• 추천: 진지하게 즐기는 분</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="bg-yellow-50 p-6 rounded-xl">
                  <h3 className="text-xl font-semibold text-yellow-900 mb-4">🛒 구매처별 특징</h3>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold text-yellow-800 mb-3">온라인 쇼핑몰</h4>
                      <ul className="space-y-1 text-sm text-yellow-700">
                        <li>✅ 가격이 저렴함</li>
                        <li>✅ 다양한 제품 선택</li>
                        <li>❌ 직접 체험 불가</li>
                        <li>❌ A/S 불편함</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold text-yellow-800 mb-3">전문 매장</h4>
                      <ul className="space-y-1 text-sm text-yellow-700">
                        <li>✅ 전문 상담 가능</li>
                        <li>✅ 직접 체험 가능</li>
                        <li>✅ A/S 편리함</li>
                        <li>❌ 가격이 비쌈</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </section>

              <section id="rental" className="mb-12">
                <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                  <span className="bg-red-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm mr-3">5</span>
                  대여 방법
                </h2>

                <div className="bg-red-50 p-6 rounded-xl">
                  <h3 className="text-xl font-semibold text-red-900 mb-4">🏌️‍♂️ 파크골프장 장비 대여</h3>
                  
                  <div className="grid md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <h4 className="font-semibold text-red-800 mb-3">대여 가능한 곳</h4>
                      <ul className="space-y-2 text-sm text-red-700">
                        <li>• 대부분의 공공 파크골프장</li>
                        <li>• 일부 민간 파크골프장</li>
                        <li>• 파크골프 용품점</li>
                        <li>• 동호회 (회원 간 대여)</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold text-red-800 mb-3">대여 비용</h4>
                      <ul className="space-y-2 text-sm text-red-700">
                        <li>• 클럽: 2,000-5,000원</li>
                        <li>• 공: 500-1,000원</li>
                        <li>• 세트 대여: 3,000-6,000원</li>
                        <li>• 보증금: 10,000-20,000원</li>
                      </ul>
                    </div>
                  </div>

                  <div className="bg-white p-4 rounded-lg border border-red-200">
                    <h4 className="font-semibold text-red-900 mb-2">💡 대여 시 주의사항</h4>
                    <ul className="text-sm text-red-800 space-y-1">
                      <li>• 사전 예약 권장 (특히 주말)</li>
                      <li>• 신분증 지참 필수</li>
                      <li>• 장비 파손 시 변상 책임</li>
                      <li>• 반납 시간 엄수</li>
                      <li>• 깨끗하게 사용 후 반납</li>
                    </ul>
                  </div>
                </div>

                <div className="bg-gray-50 p-6 rounded-xl mt-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">🤔 구매 vs 대여 비교</h3>
                  
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse border border-gray-300 rounded-lg overflow-hidden">
                      <thead>
                        <tr className="bg-gray-100">
                          <th className="border border-gray-300 px-4 py-3 text-left font-semibold">구분</th>
                          <th className="border border-gray-300 px-4 py-3 text-left font-semibold text-green-700">구매</th>
                          <th className="border border-gray-300 px-4 py-3 text-left font-semibold text-blue-700">대여</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td className="border border-gray-300 px-4 py-3 font-medium">초기 비용</td>
                          <td className="border border-gray-300 px-4 py-3 text-green-700">높음 (5만원 이상)</td>
                          <td className="border border-gray-300 px-4 py-3 text-blue-700">낮음 (3천원/회)</td>
                        </tr>
                        <tr className="bg-gray-50">
                          <td className="border border-gray-300 px-4 py-3 font-medium">장기 비용</td>
                          <td className="border border-gray-300 px-4 py-3 text-green-700">저렴함</td>
                          <td className="border border-gray-300 px-4 py-3 text-blue-700">비쌈 (누적)</td>
                        </tr>
                        <tr>
                          <td className="border border-gray-300 px-4 py-3 font-medium">편의성</td>
                          <td className="border border-gray-300 px-4 py-3 text-green-700">높음 (언제든 사용)</td>
                          <td className="border border-gray-300 px-4 py-3 text-blue-700">낮음 (예약 필요)</td>
                        </tr>
                        <tr className="bg-gray-50">
                          <td className="border border-gray-300 px-4 py-3 font-medium">추천 대상</td>
                          <td className="border border-gray-300 px-4 py-3 text-green-700">정기적 플레이어</td>
                          <td className="border border-gray-300 px-4 py-3 text-blue-700">가끔 즐기는 분</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </section>

              <section id="maintenance" className="mb-12">
                <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                  <span className="bg-indigo-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm mr-3">6</span>
                  장비 관리법
                </h2>

                <div className="grid md:grid-cols-2 gap-8">
                  <div className="bg-indigo-50 p-6 rounded-xl">
                    <h3 className="text-xl font-semibold text-indigo-900 mb-4">🏌️‍♂️ 클럽 관리</h3>
                    
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-semibold text-indigo-800 mb-2">사용 후 관리</h4>
                        <ul className="space-y-1 text-sm text-indigo-700">
                          <li>• 헤드 부분 깨끗이 닦기</li>
                          <li>• 그립 부분 건조시키기</li>
                          <li>• 샤프트에 물기 제거</li>
                          <li>• 전용 커버 씌우기</li>
                        </ul>
                      </div>
                      
                      <div>
                        <h4 className="font-semibold text-indigo-800 mb-2">보관 방법</h4>
                        <ul className="space-y-1 text-sm text-indigo-700">
                          <li>• 서늘하고 건조한 곳</li>
                          <li>• 직사광선 피하기</li>
                          <li>• 세워서 보관</li>
                          <li>• 정기적인 점검</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-teal-50 p-6 rounded-xl">
                    <h3 className="text-xl font-semibold text-teal-900 mb-4">⚽ 공 관리</h3>
                    
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-semibold text-teal-800 mb-2">청소 방법</h4>
                        <ul className="space-y-1 text-sm text-teal-700">
                          <li>• 미지근한 물로 세척</li>
                          <li>• 중성세제 사용 가능</li>
                          <li>• 부드러운 천으로 닦기</li>
                          <li>• 완전히 건조 후 보관</li>
                        </ul>
                      </div>
                      
                      <div>
                        <h4 className="font-semibold text-teal-800 mb-2">보관 팁</h4>
                        <ul className="space-y-1 text-sm text-teal-700">
                          <li>• 전용 케이스 사용</li>
                          <li>• 고온 장소 피하기</li>
                          <li>• 압력 가하지 않기</li>
                          <li>• 정기적으로 상태 확인</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-yellow-50 p-6 rounded-xl mt-6">
                  <h3 className="text-xl font-semibold text-yellow-900 mb-4">⚠️ 교체 시기</h3>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold text-yellow-800 mb-3">클럽 교체 신호</h4>
                      <ul className="space-y-1 text-sm text-yellow-700">
                        <li>• 그립이 매끄러워짐</li>
                        <li>• 헤드에 심한 손상</li>
                        <li>• 샤프트 균열 발견</li>
                        <li>• 전체적인 변형</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold text-yellow-800 mb-3">공 교체 신호</h4>
                      <ul className="space-y-1 text-sm text-yellow-700">
                        <li>• 표면에 깊은 스크래치</li>
                        <li>• 모양이 변형됨</li>
                        <li>• 무게감이 달라짐</li>
                        <li>• 굴러가는 방향이 이상함</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </section>
            </div>

            {/* CTA 섹션 */}
            <div className="mt-12 bg-gradient-to-r from-orange-500 to-red-500 rounded-xl p-8 text-white text-center">
              <h2 className="text-2xl font-bold mb-4">장비 준비가 끝났다면 첫 라운드를 준비해보세요! 🎯</h2>
              <p className="mb-6 text-orange-100">
                이제 파크골프장 방문과 첫 플레이를 위한 가이드를 확인해보세요.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/guide/beginner/first-round"
                  className="inline-flex items-center px-6 py-3 bg-white text-orange-600 rounded-lg font-semibold hover:bg-orange-50 transition-colors"
                >
                  첫 라운드 가이드
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
