'use client';

import { useState, useEffect } from 'react';

interface NewsItem {
  title: string;
  link: string;
  pubDate: string;
  contentSnippet?: string;
  source?: string;
}

export default function ParkGolfNews() {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchParkGolfNews();
  }, []);

  const fetchParkGolfNews = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // API 라우트로 요청
      const response = await fetch('/api/news');
      
      if (!response.ok) {
        throw new Error('뉴스를 불러오는데 실패했습니다.');
      }
      
      const newsData = await response.json();
      setNews(newsData);
    } catch (err) {
      setError(err instanceof Error ? err.message : '알 수 없는 오류가 발생했습니다.');
    } finally {
      setLoading(false);
    }
  };

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
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <div className="animate-pulse">
          <div className="h-6 bg-gray-200 rounded w-1/4 mb-4"></div>
          {[...Array(5)].map((_, i) => (
            <div key={i} className="mb-4">
              <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
              <div className="h-3 bg-gray-200 rounded w-1/2"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <div className="text-center">
          <div className="text-red-500 mb-2">⚠️</div>
          <p className="text-red-600 mb-4">{error}</p>
          <button
            onClick={fetchParkGolfNews}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
          >
            다시 시도
          </button>
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
            onClick={fetchParkGolfNews}
            className="text-sm text-blue-600 hover:text-blue-800 transition-colors"
            title="새로고침"
          >
            🔄 새로고침
          </button>
        </div>

        {news.length === 0 ? (
          <div className="text-center py-8">
            <div className="text-gray-400 text-lg mb-2">📰</div>
            <p className="text-gray-500">파크골프 관련 뉴스가 없습니다.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {news.map((item, index) => (
              <article
                key={index}
                className="border-b border-gray-100 last:border-b-0 pb-4 last:pb-0"
              >
                <div className="group">
                  <h3 className="font-medium text-gray-900 mb-2 leading-snug">
                    <a
                      href={item.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-blue-600 transition-colors group-hover:underline"
                    >
                      {item.title}
                    </a>
                  </h3>
                  
                  {item.contentSnippet && (
                    <p className="text-sm text-gray-600 mb-2 line-clamp-2">
                      {item.contentSnippet}
                    </p>
                  )}
                  
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <span>{formatDate(item.pubDate)}</span>
                    {item.source && (
                      <span className="bg-gray-100 px-2 py-1 rounded">
                        {item.source}
                      </span>
                    )}
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
