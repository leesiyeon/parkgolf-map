import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '개인정보처리방침 - 전국 파크골프장 현황',
  description: '전국 파크골프장 현황 사이트의 개인정보처리방침입니다. 개인정보 수집, 이용, 보관에 대한 정책을 안내합니다.',
  keywords: '개인정보처리방침, 개인정보보호, 프라이버시 정책',
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            🔒 개인정보처리방침
          </h1>
          <p className="text-gray-600">
            개인정보 보호에 관한 정책을 안내드립니다
          </p>
        </header>

        <main className="bg-white rounded-lg shadow-sm border p-6 space-y-8">
          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">
              1. 개인정보의 처리 목적
            </h2>
            <p className="text-gray-700 leading-relaxed">
              본 사이트는 파크골프장 정보 제공을 목적으로 하며, 별도의 개인정보를 수집하지 않습니다. 
              단, 웹사이트 이용 과정에서 다음과 같은 정보가 자동으로 생성되어 수집될 수 있습니다.
            </p>
            <ul className="list-disc list-inside mt-3 space-y-1 text-gray-700">
              <li>IP 주소, 쿠키, 방문 일시, 서비스 이용 기록</li>
              <li>웹사이트 이용 통계 및 분석을 위한 정보</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">
              2. 개인정보의 처리 및 보유 기간
            </h2>
            <p className="text-gray-700 leading-relaxed">
              본 사이트는 별도의 개인정보를 수집하지 않으므로, 개인정보 보유 기간이 적용되지 않습니다. 
              단, 웹사이트 이용 과정에서 자동 생성되는 로그 정보는 통계 분석 목적으로 
              최대 1년간 보관될 수 있습니다.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">
              3. 개인정보의 제3자 제공
            </h2>
            <p className="text-gray-700 leading-relaxed">
              본 사이트는 이용자의 개인정보를 제3자에게 제공하지 않습니다. 
              단, 다음의 경우에는 예외로 합니다.
            </p>
            <ul className="list-disc list-inside mt-3 space-y-1 text-gray-700">
              <li>이용자가 사전에 동의한 경우</li>
              <li>법령의 규정에 의거하거나, 수사 목적으로 법령에 정해진 절차와 방법에 따라 수사기관의 요구가 있는 경우</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">
              4. 개인정보 처리의 위탁
            </h2>
            <p className="text-gray-700 leading-relaxed">
              본 사이트는 개인정보 처리 업무를 외부에 위탁하지 않습니다. 
              단, 웹사이트 호스팅 및 관련 기술적 서비스를 위해 다음과 같은 업체의 서비스를 이용할 수 있습니다.
            </p>
            <ul className="list-disc list-inside mt-3 space-y-1 text-gray-700">
              <li>웹호스팅 서비스 제공업체</li>
              <li>지도 서비스 제공업체 (카카오맵)</li>
              <li>뉴스 정보 제공업체 (구글 뉴스)</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">
              5. 이용자의 권리·의무 및 행사방법
            </h2>
            <p className="text-gray-700 leading-relaxed">
              이용자는 개인정보주체로서 다음과 같은 권리를 행사할 수 있습니다.
            </p>
            <ul className="list-disc list-inside mt-3 space-y-1 text-gray-700">
              <li>개인정보 처리정지 요구권</li>
              <li>손해배상청구권</li>
            </ul>
            <p className="text-gray-700 leading-relaxed mt-3">
              단, 본 사이트는 별도의 개인정보를 수집하지 않으므로, 
              개인정보 열람, 정정·삭제, 처리정지 요구 등은 해당사항이 없습니다.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">
              6. 개인정보의 안전성 확보조치
            </h2>
            <p className="text-gray-700 leading-relaxed">
              본 사이트는 개인정보의 안전성 확보를 위해 다음과 같은 조치를 취하고 있습니다.
            </p>
            <ul className="list-disc list-inside mt-3 space-y-1 text-gray-700">
              <li>관리적 조치: 개인정보 취급 직원의 최소화 및 교육</li>
              <li>기술적 조치: 개인정보처리시스템 등의 접근권한 관리, 접근통제시스템 설치</li>
              <li>물리적 조치: 전산실, 자료보관실 등의 접근통제</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">
              7. 쿠키의 사용
            </h2>
            <p className="text-gray-700 leading-relaxed">
              본 사이트는 이용자에게 개별화된 서비스를 제공하기 위해 쿠키를 사용할 수 있습니다. 
              쿠키는 웹사이트를 운영하는데 이용되는 서버가 이용자의 컴퓨터 브라우저에게 보내는 
              소량의 정보이며 이용자들의 PC 컴퓨터내의 하드디스크에 저장되기도 합니다.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">
              8. 개인정보처리방침의 변경
            </h2>
            <p className="text-gray-700 leading-relaxed">
              이 개인정보처리방침은 시행일로부터 적용되며, 법령 및 방침에 따른 변경내용의 
              추가, 삭제 및 정정이 있는 경우에는 변경사항의 시행 7일 전부터 
              공지사항을 통하여 고지할 것입니다.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">
              9. 개인정보 보호책임자
            </h2>
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-gray-700">
                개인정보 처리에 관한 업무를 총괄해서 책임지고, 개인정보 처리와 관련한 
                정보주체의 불만처리 및 피해구제 등을 위하여 아래와 같이 개인정보 보호책임자를 
                지정하고 있습니다.
              </p>
              <div className="mt-3 text-sm text-gray-600">
                <p>개인정보 보호책임자: 사이트 관리자</p>
                <p>연락처: 사이트 문의를 통해 연락 가능</p>
              </div>
            </div>
          </section>

          <section className="text-center pt-4 border-t">
            <p className="text-sm text-gray-500">
              시행일자: 2024년 1월 1일
            </p>
          </section>
        </main>
      </div>
    </div>
  );
}
