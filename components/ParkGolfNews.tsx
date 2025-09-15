'use client';

import { useState, useEffect, useCallback } from 'react';

interface NewsItem {
  title: string;
  link: string;
  pubDate: string;
  contentSnippet?: string;
  source?: string;
  keyword?: string;
}

export default function ParkGolfNews() {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchParkGolfNews();
  }, []);

  const fetchParkGolfNews = useCallback(async (isRefresh = false) => {
    try {
      if (isRefresh) {
        setRefreshing(true);
      } else {
        setLoading(true);
      }
      setError(null);
      
      // API 라우트로 요청 (타임아웃 추가)
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 15000); // 15초 타임아웃
      
      const response = await fetch('/api/news', {
        signal: controller.signal,
        cache: 'no-store' // 캐시 무시하고 최신 데이터 요청
      });
      
      clearTimeout(timeoutId);
      
      if (!response.ok) {
        throw new Error('뉴스를 불러오는데 실패했습니다.');
      }
      
      const newsData = await response.json();
      setNews(newsData);
    } catch (err) {
      if (err instanceof Error && err.name === 'AbortError') {
        setError('요청 시간이 초과되었습니다. 다시 시도해주세요.');
      } else {
        setError(err instanceof Error ? err.message : '알 수 없는 오류가 발생했습니다.');
      }
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  const handleRefresh = useCallback(() => {
    fetchParkGolfNews(true);
  }, [fetchParkGolfNews]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow-sm border">
        <div className="p-4 sm:p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg sm:text-xl font-bold text-gray-900">
              📰 파크골프 뉴스
            </h2>
            <div className="w-6 h-6 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
          </div>
          <div className="animate-pulse space-y-4">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="border-b border-gray-100 pb-4">
                <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                <div className="h-3 bg-gray-200 rounded w-full mb-2"></div>
                <div className="h-3 bg-gray-200 rounded w-1/2"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white rounded-lg shadow-sm border">
        <div className="p-4 sm:p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg sm:text-xl font-bold text-gray-900">
              📰 파크골프 뉴스
            </h2>
          </div>
          <div className="text-center py-8">
            <div className="text-red-500 text-2xl mb-2">⚠️</div>
            <p className="text-red-600 mb-4 text-sm">{error}</p>
            <button
              onClick={() => fetchParkGolfNews()}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
            >
              다시 시도
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border">
      <div className="p-4 sm:p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg sm:text-xl font-bold text-gray-900">
            📰 파크골프 뉴스
          </h2>
          <button
            onClick={handleRefresh}
            disabled={refreshing}
            className="flex items-center space-x-1 text-sm text-blue-600 hover:text-blue-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            title="새로고침"
          >
            {refreshing ? (
              <>
                <div className="w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                <span>새로고침 중...</span>
              </>
            ) : (
              <>
                <span>🔄</span>
                <span>새로고침</span>
              </>
            )}
          </button>
        </div>

        {news.length === 0 ? (
          <div className="text-center py-8">
            <div className="text-gray-400 text-lg mb-2">📰</div>
            <p className="text-gray-500">파크골프 관련 뉴스가 없습니다.</p>
          </div>
        ) : (
          <div className="space-y-3">
            {news.map((item, index) => (
              <article
                key={`${item.link}-${index}`}
                className="border-b border-gray-100 last:border-b-0 pb-3 last:pb-0"
              >
                <div className="group">
                  <h3 className="font-medium text-gray-900 mb-2 leading-snug text-sm sm:text-base">
                    <a
                      href={item.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-blue-600 transition-colors group-hover:underline line-clamp-2"
                    >
                      {item.title}
                    </a>
                  </h3>
                  
                  {item.contentSnippet && (
                    <p className="text-xs sm:text-sm text-gray-600 mb-2 line-clamp-2">
                      {item.contentSnippet}
                    </p>
                  )}
                  
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <span className="flex-shrink-0">{formatDate(item.pubDate)}</span>
                    <div className="flex items-center space-x-2 ml-2">
                      {item.keyword && (
                        <span className="bg-blue-50 text-blue-600 px-2 py-0.5 rounded text-xs">
                          {item.keyword}
                        </span>
                      )}
                      {item.source && (
                        <span className="bg-gray-100 px-2 py-0.5 rounded text-xs">
                          {item.source}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}

        <div className="mt-6 text-center">
          <a
            href="https://news.google.com/search?q=파크골프&hl=ko&gl=KR&ceid=KR:ko"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-blue-600 hover:text-blue-800 transition-colors"
          >
            구글 뉴스에서 더 많은 파크골프 뉴스 보기 →
          </a>
        </div>
      </div>
    </div>
  );
}
