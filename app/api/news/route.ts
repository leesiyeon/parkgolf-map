import { NextResponse } from 'next/server';
import Parser from 'rss-parser';

const parser = new Parser({
  headers: {
    'User-Agent': 'Mozilla/5.0 (compatible; ParkGolf-News-Bot/1.0)',
  },
});

// 캐싱을 위한 변수들
let cachedNews: any[] = [];
let lastFetchTime = 0;
const CACHE_DURATION = 30 * 60 * 1000; // 30분

export async function GET() {
  try {
    // 캐시 확인
    const now = Date.now();
    if (cachedNews.length > 0 && (now - lastFetchTime) < CACHE_DURATION) {
      return NextResponse.json(cachedNews);
    }

    // 여러 키워드로 파크골프 뉴스 검색
    const keywords = ['파크골프', '파크골프장', '파크골프 대회'];
    const allNews: any[] = [];

    for (const keyword of keywords) {
      try {
        const googleNewsUrl = `https://news.google.com/rss/search?q=${encodeURIComponent(keyword)}&hl=ko&gl=KR&ceid=KR:ko`;
        const feed = await parser.parseURL(googleNewsUrl);
        
        // 각 뉴스 아이템 처리
        const newsItems = feed.items.slice(0, 5).map(item => ({
          title: item.title || '',
          link: item.link || '',
          pubDate: item.pubDate || item.isoDate || new Date().toISOString(),
          contentSnippet: item.contentSnippet || item.content?.replace(/<[^>]*>/g, '').substring(0, 150),
          source: extractSource(item.title || ''),
        }));

        allNews.push(...newsItems);
      } catch (keywordError) {
        console.error(`Error fetching news for keyword ${keyword}:`, keywordError);
      }
    }

    // 중복 제거 (제목 기준)
    const uniqueNews = allNews.filter((item, index, self) => 
      index === self.findIndex(t => t.title === item.title)
    );

    // 날짜순 정렬 (최신순)
    uniqueNews.sort((a, b) => new Date(b.pubDate).getTime() - new Date(a.pubDate).getTime());

    // 최대 15개로 제한
    const limitedNews = uniqueNews.slice(0, 15);

    // 캐시 업데이트
    cachedNews = limitedNews;
    lastFetchTime = now;

    return NextResponse.json(limitedNews);
  } catch (error) {
    console.error('Error fetching park golf news:', error);
    
    // 캐시된 뉴스가 있으면 반환
    if (cachedNews.length > 0) {
      return NextResponse.json(cachedNews);
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
