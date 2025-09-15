import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '이용약관 - 전국 파크골프장 현황',
  description: '전국 파크골프장 현황 사이트의 이용약관입니다. 서비스 이용에 관한 조건과 규정을 안내합니다.',
  keywords: '이용약관, 서비스 약관, 사이트 이용규정',
};

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            📜 이용약관
          </h1>
          <p className="text-gray-600">
            서비스 이용에 관한 조건과 규정을 안내드립니다
          </p>
        </header>

        <main className="bg-white rounded-lg shadow-sm border p-6 space-y-8">
          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">
              제1조 (목적)
            </h2>
            <p className="text-gray-700 leading-relaxed">
              이 약관은 전국 파크골프장 현황 사이트(이하 "사이트")에서 제공하는 
              파크골프장 정보 서비스(이하 "서비스")의 이용조건 및 절차에 관한 사항과 
              기타 필요한 사항을 규정함을 목적으로 합니다.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">
              제2조 (정의)
            </h2>
            <p className="text-gray-700 leading-relaxed mb-3">
              이 약관에서 사용하는 용어의 정의는 다음과 같습니다.
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700">
              <li>"사이트"란 전국 파크골프장 현황 정보를 제공하는 웹사이트를 말합니다.</li>
              <li>"서비스"란 사이트에서 제공하는 파크골프장 정보, 지도, 뉴스 등 모든 서비스를 말합니다.</li>
              <li>"이용자"란 이 약관에 따라 사이트가 제공하는 서비스를 받는 자를 말합니다.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">
              제3조 (약관의 효력 및 변경)
            </h2>
            <p className="text-gray-700 leading-relaxed mb-3">
              ① 이 약관은 서비스를 이용하고자 하는 모든 이용자에 대하여 그 효력을 발생합니다.
            </p>
            <p className="text-gray-700 leading-relaxed mb-3">
              ② 사이트는 필요한 경우 이 약관을 변경할 수 있으며, 약관이 변경된 경우 
              지체없이 이를 공지하거나 통지합니다.
            </p>
            <p className="text-gray-700 leading-relaxed">
              ③ 이용자는 변경된 약관에 동의하지 않을 경우 서비스 이용을 중단할 수 있습니다.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">
              제4조 (서비스의 제공)
            </h2>
            <p className="text-gray-700 leading-relaxed mb-3">
              사이트는 다음과 같은 서비스를 제공합니다.
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700">
              <li>전국 파크골프장 현황 정보 제공</li>
              <li>파크골프장 위치 지도 서비스</li>
              <li>파크골프 관련 뉴스 정보</li>
              <li>파크골프장 검색 및 필터링 서비스</li>
              <li>기타 파크골프 관련 정보 서비스</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">
              제5조 (서비스 이용)
            </h2>
            <p className="text-gray-700 leading-relaxed mb-3">
              ① 서비스는 별도의 회원가입 없이 누구나 무료로 이용할 수 있습니다.
            </p>
            <p className="text-gray-700 leading-relaxed mb-3">
              ② 서비스는 연중무휴, 1일 24시간 제공됩니다. 다만, 시스템 점검 등의 
              사유로 서비스가 일시 중단될 수 있습니다.
            </p>
            <p className="text-gray-700 leading-relaxed">
              ③ 이용자는 서비스를 이용함에 있어 관련 법령 및 이 약관을 준수해야 합니다.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">
              제6조 (이용자의 의무)
            </h2>
            <p className="text-gray-700 leading-relaxed mb-3">
              이용자는 다음 행위를 하여서는 안됩니다.
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700">
              <li>서비스 운영을 고의로 방해하는 행위</li>
              <li>다른 이용자의 서비스 이용을 방해하는 행위</li>
              <li>타인의 명예를 손상시키거나 불이익을 주는 행위</li>
              <li>음란하거나 폭력적인 내용을 게시하는 행위</li>
              <li>저작권 등 타인의 권리를 침해하는 행위</li>
              <li>기타 관련 법령에 위반되는 행위</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">
              제7조 (저작권 및 지적재산권)
            </h2>
            <p className="text-gray-700 leading-relaxed mb-3">
              ① 사이트가 작성한 저작물에 대한 저작권 기타 지적재산권은 사이트에 귀속합니다.
            </p>
            <p className="text-gray-700 leading-relaxed mb-3">
              ② 이용자는 서비스를 이용함으로써 얻은 정보 중 사이트에게 지적재산권이 
              귀속된 정보를 사이트의 사전 승낙 없이 복제, 송신, 출판, 배포, 방송 
              기타 방법에 의하여 영리목적으로 이용하거나 제3자에게 이용하게 하여서는 안됩니다.
            </p>
            <p className="text-gray-700 leading-relaxed">
              ③ 사이트는 약정에 따라 이용자에게 귀속된 저작권을 침해하지 않습니다.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">
              제8조 (면책조항)
            </h2>
            <p className="text-gray-700 leading-relaxed mb-3">
              ① 사이트는 천재지변 또는 이에 준하는 불가항력으로 인하여 서비스를 
              제공할 수 없는 경우에는 서비스 제공에 관한 책임이 면제됩니다.
            </p>
            <p className="text-gray-700 leading-relaxed mb-3">
              ② 사이트는 이용자의 귀책사유로 인한 서비스 이용의 장애에 대하여는 
              책임을 지지 않습니다.
            </p>
            <p className="text-gray-700 leading-relaxed mb-3">
              ③ 사이트는 이용자가 서비스를 이용하여 기대하는 수익을 상실한 것에 
              대하여 책임을 지지 않으며, 그 밖의 서비스를 통하여 얻은 자료로 인한 
              손해에 관하여 책임을 지지 않습니다.
            </p>
            <p className="text-gray-700 leading-relaxed">
              ④ 사이트는 제공하는 정보의 정확성, 완전성을 보장하지 않으며, 
              이용자는 본인의 판단과 책임 하에 서비스를 이용해야 합니다.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">
              제9조 (분쟁의 해결)
            </h2>
            <p className="text-gray-700 leading-relaxed mb-3">
              ① 사이트와 이용자는 서비스와 관련하여 발생한 분쟁을 원만하게 
              해결하기 위하여 필요한 모든 노력을 하여야 합니다.
            </p>
            <p className="text-gray-700 leading-relaxed">
              ② 제1항의 규정에도 불구하고 분쟁으로 인하여 소송이 제기될 경우 
              소송은 대한민국 법원의 관할로 합니다.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">
              제10조 (준거법)
            </h2>
            <p className="text-gray-700 leading-relaxed">
              이 약관 및 사이트와 이용자간의 서비스 이용계약은 대한민국 법령에 
              따라 규정되고 이행됩니다.
            </p>
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
