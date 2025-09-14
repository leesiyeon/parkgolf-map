'use client';

import { ParkGolfCourse } from '@/types/parkgolf';

interface CourseModalProps {
  course: ParkGolfCourse | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function CourseModal({ course, isOpen, onClose }: CourseModalProps) {
  if (!course || !isOpen) return null;

  return (
    <>
      {/* 배경 오버레이 */}
      <div 
        className="fixed inset-0 bg-black bg-opacity-50 z-40 flex items-center justify-center p-4"
        onClick={onClose}
      >
        {/* 모달 창 */}
        <div 
          className="bg-white rounded-lg shadow-xl z-50 w-full max-w-md max-h-[90vh] overflow-y-auto"
          onClick={(e) => e.stopPropagation()}
        >
          {/* 모달 헤더 */}
          <div className="flex items-center justify-between p-4 border-b bg-blue-50 rounded-t-lg">
            <h3 className="text-lg font-semibold text-gray-900">
              파크골프장 상세정보
            </h3>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          
          {/* 모달 내용 */}
          <div className="p-4">
            <div className="space-y-4">
              {/* 시설명 */}
              <div>
                <h2 className="text-xl font-bold text-gray-900 mb-2">
                  {course.시설명}
                </h2>
                <div className="inline-block bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                  {course.홀수}
                </div>
              </div>
            
              {/* 위치 */}
              <div className="bg-gray-50 p-3 rounded-lg">
                <div className="flex items-start space-x-2">
                  <svg className="w-5 h-5 text-gray-500 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <div>
                    <p className="text-sm font-medium text-gray-700">위치</p>
                    <p className="text-sm text-gray-600">{course.위치}</p>
                  </div>
                </div>
              </div>
              
              {/* 규모 */}
              <div className="bg-gray-50 p-3 rounded-lg">
                <div className="flex items-start space-x-2">
                  <svg className="w-5 h-5 text-gray-500 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                  </svg>
                  <div>
                    <p className="text-sm font-medium text-gray-700">규모</p>
                    <p className="text-sm text-gray-600">{course.규모}</p>
                  </div>
                </div>
              </div>
              
              {/* 운영기관 */}
              <div className="bg-gray-50 p-3 rounded-lg">
                <div className="flex items-start space-x-2">
                  <svg className="w-5 h-5 text-gray-500 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-4m-5 0H9m0 0H7m2 0v-2a2 2 0 012-2h2a2 2 0 012 2v2m-6 0V9" />
                  </svg>
                  <div>
                    <p className="text-sm font-medium text-gray-700">운영기관</p>
                    <p className="text-sm text-gray-600">{course.운영기관}</p>
                  </div>
                </div>
              </div>
              
              {/* 개장일 */}
              {(course.개장일 || course.개장) && (
                <div className="bg-gray-50 p-3 rounded-lg">
                  <div className="flex items-start space-x-2">
                    <svg className="w-5 h-5 text-gray-500 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <div>
                      <p className="text-sm font-medium text-gray-700">개장일</p>
                      <p className="text-sm text-gray-600">{course.개장일 || course.개장}</p>
                    </div>
                  </div>
                </div>
              )}

              {/* 연락처 */}
              {course.연락처 && (
                <div className="bg-gray-50 p-3 rounded-lg">
                  <div className="flex items-start space-x-2">
                    <svg className="w-5 h-5 text-gray-500 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    <div>
                      <p className="text-sm font-medium text-gray-700">연락처</p>
                      <p className="text-sm text-gray-600">{course.연락처}</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
