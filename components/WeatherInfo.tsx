'use client';

import { useState, useEffect } from 'react';

interface WeatherData {
  temperature: number;
  description: string;
  icon: string;
  humidity: number;
  windSpeed: number;
  feelsLike: number;
  pressure: number;
  visibility: number | null;
  cloudiness: number;
}

interface WeatherInfoProps {
  latitude: number;
  longitude: number;
  courseName?: string;
  compact?: boolean;
}

export default function WeatherInfo({ 
  latitude, 
  longitude, 
  courseName, 
  compact = false 
}: WeatherInfoProps) {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (latitude && longitude) {
      fetchWeather();
    }
  }, [latitude, longitude]);

  const fetchWeather = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await fetch(`/api/weather?lat=${latitude}&lon=${longitude}`);
      
      if (!response.ok) {
        throw new Error('날씨 정보를 가져올 수 없습니다');
      }
      
      const weatherData = await response.json();
      setWeather(weatherData);
    } catch (err) {
      setError(err instanceof Error ? err.message : '알 수 없는 오류');
    } finally {
      setLoading(false);
    }
  };

  const getWeatherIcon = (iconCode: string) => {
    const iconMap: { [key: string]: string } = {
      '01d': '☀️', '01n': '🌙',
      '02d': '⛅', '02n': '☁️',
      '03d': '☁️', '03n': '☁️',
      '04d': '☁️', '04n': '☁️',
      '09d': '🌧️', '09n': '🌧️',
      '10d': '🌦️', '10n': '🌧️',
      '11d': '⛈️', '11n': '⛈️',
      '13d': '❄️', '13n': '❄️',
      '50d': '🌫️', '50n': '🌫️'
    };
    return iconMap[iconCode] || '🌤️';
  };

  const getWeatherAdvice = (temp: number, description: string) => {
    if (temp < 0) return '❄️ 매우 추워요. 따뜻하게 입고 나오세요!';
    if (temp < 10) return '🧥 쌀쌀해요. 겉옷을 챙기세요.';
    if (temp > 30) return '🌡️ 더워요. 충분한 수분 섭취하세요!';
    if (description.includes('비')) return '☔ 비가 와요. 우산을 챙기세요.';
    if (description.includes('눈')) return '⛄ 눈이 와요. 미끄럽지 않게 조심하세요.';
    if (temp >= 15 && temp <= 25) return '🌿 파크골프하기 좋은 날씨예요!';
    return '🌤️ 좋은 하루 되세요!';
  };

  if (loading) {
    return (
      <div className={`bg-gradient-to-r from-blue-50 to-sky-50 rounded-xl border border-blue-100 ${compact ? 'p-3' : 'p-4'}`}>
        <div className="animate-pulse flex items-center">
          <div className={`bg-blue-200 rounded-full mr-3 ${compact ? 'w-6 h-6' : 'w-8 h-8'}`}></div>
          <div>
            <div className={`h-4 bg-blue-200 rounded mb-1 ${compact ? 'w-16' : 'w-20'}`}></div>
            <div className={`h-3 bg-blue-200 rounded ${compact ? 'w-12' : 'w-16'}`}></div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={`bg-yellow-50 rounded-xl border border-yellow-200 ${compact ? 'p-3' : 'p-4'}`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center text-yellow-700">
            <span className="mr-2">⚠️</span>
            <span className={`${compact ? 'text-xs' : 'text-sm'}`}>
              {compact ? '날씨 정보 오류' : '날씨 정보를 불러올 수 없습니다'}
            </span>
          </div>
          {!compact && (
            <button
              onClick={() => fetchWeather()}
              className="text-xs text-yellow-600 hover:text-yellow-800 transition-colors px-2 py-1 rounded bg-yellow-100 hover:bg-yellow-200"
            >
              재시도
            </button>
          )}
        </div>
        {!compact && (
          <div className="mt-2 text-xs text-yellow-600">
            잠시 후 다시 시도하거나 새로고침해주세요
          </div>
        )}
      </div>
    );
  }

  if (!weather) return null;

  if (compact) {
    return (
      <div className="bg-gradient-to-r from-blue-50 to-sky-50 rounded-lg p-3 border border-blue-100">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <span className="text-lg mr-2">{getWeatherIcon(weather.icon)}</span>
            <div>
              <div className="font-semibold text-gray-900 text-sm">
                {weather.temperature}°C
              </div>
              <div className="text-xs text-gray-600">
                {weather.description}
              </div>
            </div>
          </div>
          <div className="text-xs text-gray-500">
            체감 {weather.feelsLike}°C
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-r from-blue-50 to-sky-50 rounded-xl p-4 border border-blue-100">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          <span className="text-3xl mr-3">{getWeatherIcon(weather.icon)}</span>
          <div>
            <div className="font-bold text-gray-900 text-xl">
              {weather.temperature}°C
            </div>
            <div className="text-sm text-gray-700 font-medium">
              {weather.description}
            </div>
          </div>
        </div>
        
        <div className="text-right">
          <div className="text-sm text-gray-600 mb-1">
            체감온도
          </div>
          <div className="font-semibold text-gray-900">
            {weather.feelsLike}°C
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="flex items-center">
          <span className="mr-2">💧</span>
          <div>
            <div className="text-xs text-gray-500">습도</div>
            <div className="font-medium text-gray-900">{weather.humidity}%</div>
          </div>
        </div>
        
        <div className="flex items-center">
          <span className="mr-2">💨</span>
          <div>
            <div className="text-xs text-gray-500">바람</div>
            <div className="font-medium text-gray-900">{weather.windSpeed}m/s</div>
          </div>
        </div>
        
        <div className="flex items-center">
          <span className="mr-2">📊</span>
          <div>
            <div className="text-xs text-gray-500">기압</div>
            <div className="font-medium text-gray-900">{weather.pressure}hPa</div>
          </div>
        </div>
        
        <div className="flex items-center">
          <span className="mr-2">☁️</span>
          <div>
            <div className="text-xs text-gray-500">구름</div>
            <div className="font-medium text-gray-900">{weather.cloudiness}%</div>
          </div>
        </div>
      </div>

      <div className="bg-white/60 rounded-lg p-3 border border-blue-200">
        <div className="text-sm text-gray-700">
          {getWeatherAdvice(weather.temperature, weather.description)}
        </div>
      </div>

      <button
        onClick={fetchWeather}
        className="mt-3 text-xs text-blue-600 hover:text-blue-800 transition-colors"
        title="새로고침"
      >
        🔄 날씨 새로고침
      </button>
    </div>
  );
}
