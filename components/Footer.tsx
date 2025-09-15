import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-gradient-to-r from-gray-50 to-blue-50 border-t border-gray-200 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* 사이트 정보 */}
          <div>
            <div className="flex items-center space-x-3 mb-6">
              <div className="p-2 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg">
                <span className="text-white text-xl">⛳</span>
              </div>
              <div>
                <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
                  파크골프맵
                </span>
                <div className="text-xs text-gray-500">전국 파크골프장 현황</div>
              </div>
            </div>
            <p className="text-gray-600 text-sm">
              전국 파크골프장 정보를 한눈에 확인할 수 있는 
              파크골프 전문 정보 사이트입니다.
            </p>
          </div>

          {/* 빠른 링크 */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">빠른 링크</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/" className="text-gray-600 hover:text-blue-600 transition-colors">
                  파크골프장 지도
                </Link>
              </li>
              <li>
                <Link href="/news" className="text-gray-600 hover:text-blue-600 transition-colors">
                  파크골프 뉴스
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-600 hover:text-blue-600 transition-colors">
                  사이트 소개
                </Link>
              </li>
            </ul>
          </div>

          {/* 정책 */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">정책</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/terms" className="text-gray-600 hover:text-blue-600 transition-colors">
                  이용약관
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-gray-600 hover:text-blue-600 transition-colors">
                  개인정보처리방침
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* 하단 정보 */}
        <div className="border-t pt-8 mt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-500 text-sm">
              © 2024 파크골프맵. All rights reserved.
            </p>
            <div className="mt-4 md:mt-0 flex space-x-4 text-sm text-gray-500">
              <span>데이터 출처: 각 지자체 공개 정보</span>
              <span>•</span>
              <span>지도: 카카오맵</span>
              <span>•</span>
              <span>뉴스: 구글 뉴스</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
