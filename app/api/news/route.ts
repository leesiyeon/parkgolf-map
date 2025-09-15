import { NextResponse } from 'next/server';
import Parser from 'rss-parser';

const parser = new Parser({
  headers: {
    'User-Agent': 'Mozilla/5.0 (compatible; ParkGolf-News-Bot/1.0)',
  },
  timeout: 8000, // 8초 타임아웃
});

// 캐싱을 위한 변수들
let cachedNews: any[] = [];
let lastFetchTime = 0;
const CACHE_DURATION = 15 * 60 * 1000; // 15분으로 단축
const REQUEST_TIMEOUT = 10000; // 10초 요청 타임아웃

// 타임아웃이 있는 fetch 함수
const fetchWithTimeout = async (url: string, timeout: number) => {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeout);
  
  try {
    const result = await parser.parseURL(url);
    clearTimeout(timeoutId);
    return result;
  } catch (error) {
    clearTimeout(timeoutId);
    throw error;
  }
};

export async function GET() {
  try {
    // 캐시 확인
    const now = Date.now();
    if (cachedNews.length > 0 && (now - lastFetchTime) < CACHE_DURATION) {
      const response = NextResponse.json(cachedNews);
      response.headers.set('Cache-Control', 'public, s-maxage=900, stale-while-revalidate=1800');
      response.headers.set('X-Cache-Status', 'HIT');
      return response;
    }

    // 여러 키워드로 파크골프 뉴스 검색 (병렬 처리)
    const keywords = ['파크골프', '파크골프장'];
    
    // 모든 키워드에 대해 병렬로 요청
    const fetchPromises = keywords.map(async (keyword) => {
      try {
        const googleNewsUrl = `https://news.google.com/rss/search?q=${encodeURIComponent(keyword)}&hl=ko&gl=KR&ceid=KR:ko`;
        const feed = await fetchWithTimeout(googleNewsUrl, REQUEST_TIMEOUT);
        
        // 각 뉴스 아이템 처리 (상위 4개만)
        return feed.items.slice(0, 4).map(item => ({
          title: item.title || '',
          link: item.link || '',
          pubDate: item.pubDate || item.isoDate || new Date().toISOString(),
          contentSnippet: item.contentSnippet || item.content?.replace(/<[^>]*>/g, '').substring(0, 120),
          source: extractSource(item.title || ''),
          keyword, // 어떤 키워드로 검색된 뉴스인지 추가
        }));
      } catch (keywordError) {
        console.error(`Error fetching news for keyword ${keyword}:`, keywordError);
        return []; // 실패한 경우 빈 배열 반환
      }
    });

    // 모든 요청을 병렬로 실행하고 결과 수집
    const results = await Promise.allSettled(fetchPromises);
    const allNews: any[] = [];
    
    results.forEach((result) => {
      if (result.status === 'fulfilled') {
        allNews.push(...result.value);
      }
    });

    // 중복 제거 (제목 기준, 더 효율적인 방법 사용)
    const seenTitles = new Set();
    const uniqueNews = allNews.filter(item => {
      if (seenTitles.has(item.title)) {
        return false;
      }
      seenTitles.add(item.title);
      return true;
    });

    // 날짜순 정렬 (최신순)
    uniqueNews.sort((a, b) => new Date(b.pubDate).getTime() - new Date(a.pubDate).getTime());

    // 최대 12개로 제한
    const limitedNews = uniqueNews.slice(0, 12);

    // 캐시 업데이트
    cachedNews = limitedNews;
    lastFetchTime = now;

    // 응답 헤더에 캐시 정보 추가
    const response = NextResponse.json(limitedNews);
    response.headers.set('Cache-Control', 'public, s-maxage=900, stale-while-revalidate=1800'); // 15분 캐시, 30분 재검증
    response.headers.set('X-Cache-Status', 'MISS');
    return response;
  } catch (error) {
    console.error('Error fetching park golf news:', error);
    
    // 캐시된 뉴스가 있으면 반환
    if (cachedNews.length > 0) {
      const response = NextResponse.json(cachedNews);
      response.headers.set('Cache-Control', 'public, s-maxage=300, stale-while-revalidate=600'); // 에러시 5분 캐시
      response.headers.set('X-Cache-Status', 'STALE');
      return response;
    }
    
    return NextResponse.json(
      { error: '뉴스를 불러오는데 실패했습니다.' },
      { status: 500 }
    );
  }
}

// 뉴스 제목에서 언론사명 추출
function extractSource(title: string): string {
  // 일반적인 뉴스 제목 패턴에서 언론사 추출
  const sourcePatterns = [
    /- ([가-힣\w\s]+)$/,  // "제목 - 언론사" 패턴
    /\[([가-힣\w\s]+)\]/, // "[언론사] 제목" 패턴
    /\(([가-힣\w\s]+)\)$/, // "제목 (언론사)" 패턴
  ];

  for (const pattern of sourcePatterns) {
    const match = title.match(pattern);
    if (match && match[1]) {
      return match[1].trim();
    }
  }

  return '구글 뉴스';
}
