'use client';

import { useState, useEffect } from 'react';
import WeatherInfo from './WeatherInfo';

interface MajorCity {
  name: string;
  latitude: number;
  longitude: number;
  region: string;
}

const majorCities: MajorCity[] = [
  { name: '서울', latitude: 37.5665, longitude: 126.9780, region: '수도권' },
  { name: '부산', latitude: 35.1796, longitude: 129.0756, region: '영남권' },
  { name: '대구', latitude: 35.8714, longitude: 128.6014, region: '영남권' },
  { name: '광주', latitude: 35.1595, longitude: 126.8526, region: '호남권' },
  { name: '대전', latitude: 36.3504, longitude: 127.3845, region: '충청권' },
  { name: '강릉', latitude: 37.7519, longitude: 128.8761, region: '강원권' }
];

export default function WeatherSummary() {
  const [selectedCities, setSelectedCities] = useState<MajorCity[]>([]);

  useEffect(() => {
    // 랜덤하게 3개 도시 선택
    const shuffled = [...majorCities].sort(() => 0.5 - Math.random());
    setSelectedCities(shuffled.slice(0, 3));
  }, []);

  if (selectedCities.length === 0) {
    return (
      <section className="mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
          <span className="mr-2">🌤️</span>
          전국 주요 지역 날씨
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-gray-50 rounded-xl p-4 animate-pulse">
              <div className="flex items-center mb-2">
                <div className="w-6 h-6 bg-gray-200 rounded-full mr-2"></div>
                <div className="h-4 bg-gray-200 rounded w-16"></div>
              </div>
              <div className="h-3 bg-gray-200 rounded w-24"></div>
            </div>
          ))}
        </div>
      </section>
    );
  }

  return (
    <section className="mb-8">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-gray-900 flex items-center">
          <span className="mr-2">🌤️</span>
          전국 주요 지역 날씨
        </h2>
        <button
          onClick={() => {
            const shuffled = [...majorCities].sort(() => 0.5 - Math.random());
            setSelectedCities(shuffled.slice(0, 3));
          }}
          className="text-sm text-blue-600 hover:text-blue-800 transition-colors flex items-center"
        >
          <span className="mr-1">🔄</span>
          다른 지역 보기
        </button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {selectedCities.map((city) => (
          <div key={city.name} className="bg-white rounded-xl border border-gray-200 overflow-hidden">
            <div className="bg-gradient-to-r from-blue-50 to-sky-50 px-4 py-3 border-b border-gray-100">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-gray-900">{city.name}</h3>
                <span className="text-xs text-gray-500 bg-white px-2 py-1 rounded">
                  {city.region}
                </span>
              </div>
            </div>
            <div className="p-4">
              <WeatherInfo 
                latitude={city.latitude}
                longitude={city.longitude}
                compact={true}
              />
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-4 text-center">
        <p className="text-sm text-gray-500">
          💡 파크골프장을 클릭하면 해당 지역의 상세 날씨를 확인할 수 있어요
        </p>
      </div>
    </section>
  );
}
