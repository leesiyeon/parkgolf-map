import { NextResponse } from 'next/server';

// 캐싱을 위한 변수들
let cachedWeatherData: { [key: string]: any } = {};
let lastFetchTimes: { [key: string]: number } = {};
const CACHE_DURATION = 10 * 60 * 1000; // 10분

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const lat = searchParams.get('lat');
  const lon = searchParams.get('lon');
  
  if (!lat || !lon) {
    return NextResponse.json({ error: 'Missing coordinates' }, { status: 400 });
  }

  // 캐시 키 생성
  const cacheKey = `${lat},${lon}`;
  const now = Date.now();
  
  // 캐시 확인
  if (cachedWeatherData[cacheKey] && 
      lastFetchTimes[cacheKey] && 
      (now - lastFetchTimes[cacheKey]) < CACHE_DURATION) {
    const response = NextResponse.json(cachedWeatherData[cacheKey]);
    response.headers.set('X-Cache-Status', 'HIT');
    return response;
  }

  // 여러 날씨 API 시도
  const apis = [
    {
      name: 'OpenWeatherMap',
      url: `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${process.env.OPENWEATHER_API_KEY || 'demo'}&units=metric&lang=kr`,
      parser: (data: any) => ({
        temperature: Math.round(data.main.temp),
        description: data.weather[0].description,
        icon: data.weather[0].icon,
        humidity: data.main.humidity,
        windSpeed: Math.round(data.wind?.speed * 10) / 10 || 0,
        feelsLike: Math.round(data.main.feels_like),
        pressure: data.main.pressure,
        visibility: data.visibility ? Math.round(data.visibility / 1000) : null,
        cloudiness: data.clouds.all
      })
    },
    {
      name: 'Fallback',
      url: null,
      parser: null
    }
  ];

  for (const api of apis) {
    try {
      if (api.url && api.parser) {
        const response = await fetch(api.url, {
          next: { revalidate: 300 }, // 5분 캐싱
          headers: {
            'User-Agent': 'ParkGolf-Weather-App/1.0'
          }
        });
        
        if (response.ok) {
          const weatherData = await response.json();
          
          if (weatherData.cod !== 401) { // API 키 오류가 아닌 경우
            const parsedData = api.parser(weatherData);
            
            // 캐시 저장
            cachedWeatherData[cacheKey] = parsedData;
            lastFetchTimes[cacheKey] = now;
            
            const nextResponse = NextResponse.json(parsedData);
            nextResponse.headers.set('X-Cache-Status', 'MISS');
            return nextResponse;
          }
        }
      }
    } catch (error) {
      console.error(`${api.name} API error:`, error);
      continue;
    }
  }

  // 모든 API가 실패한 경우 목업 데이터 반환
  const mockData = getMockWeatherData(parseFloat(lat), parseFloat(lon));
  
  // 목업 데이터도 캐시 (짧은 시간)
  cachedWeatherData[cacheKey] = mockData;
  lastFetchTimes[cacheKey] = now;
  
  const response = NextResponse.json(mockData);
  response.headers.set('X-Cache-Status', 'MOCK');
  return response;
}

// 지역별 목업 날씨 데이터 생성
function getMockWeatherData(lat: number, lon: number) {
  // 계절에 따른 기본 온도 설정 (현재 9월 중순)
  const baseTemp = 22; // 9월 평균 기온
  const randomTemp = Math.round(baseTemp + (Math.random() - 0.5) * 6);
  
  // 지역별 미세 조정
  let tempAdjustment = 0;
  if (lat > 37) tempAdjustment = -2; // 북부 지역 더 시원
  if (lat < 35) tempAdjustment = 2;  // 남부 지역 더 따뜻
  
  const temperature = Math.max(15, Math.min(28, randomTemp + tempAdjustment));
  
  // 가을철 날씨 패턴
  const weatherPatterns = [
    { description: '맑음', icon: '01d', humidity: 45 },
    { description: '구름조금', icon: '02d', humidity: 55 },
    { description: '구름많음', icon: '03d', humidity: 65 },
    { description: '흐림', icon: '04d', humidity: 75 },
  ];
  
  const weather = weatherPatterns[Math.floor(Math.random() * weatherPatterns.length)];
  
  return {
    temperature,
    description: weather.description,
    icon: weather.icon,
    humidity: weather.humidity,
    windSpeed: Math.round((Math.random() * 3 + 1) * 10) / 10,
    feelsLike: temperature + Math.round((Math.random() - 0.5) * 4),
    pressure: Math.round(1010 + (Math.random() - 0.5) * 20),
    visibility: Math.round(Math.random() * 5 + 10),
    cloudiness: weather.humidity - 20
  };
}
