'use client';

import { useEffect, useRef, useState } from 'react';
import { ParkGolfCourse } from '@/types/parkgolf';

declare global {
  interface Window {
    kakao: any;
  }
}

interface MapProps {
  courses: ParkGolfCourse[];
  onMarkerClick: (course: ParkGolfCourse) => void;
}

export default function Map({ courses, onMarkerClick }: MapProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<any>(null);
  const [clusterer, setClusterer] = useState<any>(null);
  const [markers, setMarkers] = useState<any[]>([]);
  const [overlays, setOverlays] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isInitialLoad, setIsInitialLoad] = useState(true);


  // 카카오맵 초기화
  useEffect(() => {
    
    let retryCount = 0;
    const maxRetries = 20; // 2초로 단축
    
    const initializeMap = () => {
      // 기본 체크
      if (!mapRef.current) {
        setError('지도 컨테이너를 찾을 수 없습니다.');
        setIsLoading(false);
        return;
      }

      // 카카오 객체 체크
      if (!window.kakao?.maps) {
        if (retryCount < maxRetries) {
          retryCount++;
          setTimeout(initializeMap, 100);
          return;
        } else {
          setError('카카오맵 SDK 로드 실패 - 페이지를 새로고침해주세요');
          setIsLoading(false);
          return;
        }
      }

      // 카카오맵 로드
      window.kakao.maps.load(() => {
        try {
          const container = mapRef.current;
          const options = {
            center: new window.kakao.maps.LatLng(37.5665, 126.9780), // 서울
            level: 13
          };

          const newMap = new window.kakao.maps.Map(container, options);

          // 지도 타입 설정
          newMap.setMapTypeId(window.kakao.maps.MapTypeId.ROADMAP);

          // 줌 컨트롤 추가
          const zoomControl = new window.kakao.maps.ZoomControl();
          newMap.addControl(zoomControl, window.kakao.maps.ControlPosition.TOPRIGHT);

          // 클러스터러 생성 (스타일 개선 + 싱글 클릭)
          const newClusterer = new window.kakao.maps.MarkerClusterer({
            map: newMap,
            averageCenter: true,
            minLevel: 10,
            styles: [
              {
                width: '40px',
                height: '40px',
                background: 'rgba(51, 204, 255, 0.9)',
                borderRadius: '20px',
                color: '#fff',
                textAlign: 'center',
                fontWeight: 'bold',
                fontSize: '14px',
                lineHeight: '40px',
                border: '2px solid #fff',
                boxShadow: '0 2px 6px rgba(0,0,0,0.3)'
              },
              {
                width: '50px',
                height: '50px',
                background: 'rgba(255, 153, 51, 0.9)',
                borderRadius: '25px',
                color: '#fff',
                textAlign: 'center',
                fontWeight: 'bold',
                fontSize: '16px',
                lineHeight: '50px',
                border: '2px solid #fff',
                boxShadow: '0 2px 6px rgba(0,0,0,0.3)'
              },
              {
                width: '60px',
                height: '60px',
                background: 'rgba(255, 51, 102, 0.9)',
                borderRadius: '30px',
                color: '#fff',
                textAlign: 'center',
                fontWeight: 'bold',
                fontSize: '18px',
                lineHeight: '60px',
                border: '2px solid #fff',
                boxShadow: '0 2px 6px rgba(0,0,0,0.3)'
              }
            ]
          });

          // 클러스터 클릭 이벤트 (싱글 클릭으로 즉시 확대)
          window.kakao.maps.event.addListener(newClusterer, 'clusterclick', (cluster: any) => {
            // 클러스터 중심으로 한 단계 확대
            const level = newMap.getLevel() - 1;
            newMap.setLevel(level < 1 ? 1 : level, { anchor: cluster.getCenter() });
          });

          setMap(newMap);
          setClusterer(newClusterer);
          setIsLoading(false);
          setError(null);

        } catch (err) {
          setError(`지도 생성 실패: ${(err as Error).message}`);
          setIsLoading(false);
        }
      });
    };

    // 즉시 시작
    const timer = setTimeout(initializeMap, 100);
    
    return () => clearTimeout(timer);
  }, []);

  // 마커 생성
  useEffect(() => {
    if (!map || !clusterer || courses.length === 0) return;



    // 기존 마커와 오버레이 정리
    clusterer.clear();
    overlays.forEach(overlay => overlay.setMap(null));

    const newMarkers: any[] = [];
    const newOverlays: any[] = [];

    courses.forEach((course, index) => {
      if (course.latitude && course.longitude) {
        // 좌표 유효성 검사 (한국 영역)
        const lat = course.latitude;
        const lng = course.longitude;
        
        // 한국 좌표 범위: 위도 33-39, 경도 124-132
        const isValidKoreanCoord = lat >= 33 && lat <= 39 && lng >= 124 && lng <= 132;
        
        if (!isValidKoreanCoord) {
          return;
        }
        
        try {
          const position = new window.kakao.maps.LatLng(lat, lng);
          const marker = new window.kakao.maps.Marker({ position });

          // 클릭 이벤트
          window.kakao.maps.event.addListener(marker, 'click', () => {
            onMarkerClick(course);
          });

          // 마커 라벨 생성 (줌 레벨에 따라 표시)
          const shortName = course.시설명.length > 12 ? 
            course.시설명.substring(0, 12) + '...' : course.시설명;
          
          const labelContent = `
            <div style="
              background: rgba(255, 255, 255, 0.95);
              color: #1f2937;
              border: 1px solid rgba(0, 0, 0, 0.1);
              border-radius: 6px;
              padding: 4px 8px;
              font-size: 11px;
              font-weight: 600;
              font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
              box-shadow: 0 2px 8px rgba(0,0,0,0.25);
              white-space: nowrap;
              max-width: 150px;
              overflow: hidden;
              text-overflow: ellipsis;
              transform: translateY(-40px);
              pointer-events: none;
              text-align: center;
              letter-spacing: -0.02em;
              backdrop-filter: blur(4px);
            ">
              ${shortName}
            </div>
          `;

          const customOverlay = new window.kakao.maps.CustomOverlay({
            content: labelContent,
            position: position,
            xAnchor: 0.5,
            yAnchor: 0.8, // 라벨이 마커 위쪽에 위치하도록 조정
            zIndex: 100
          });

          // 초기에는 표시하지 않음 (줌 레벨에 따라 후에 제어)
          
          newMarkers.push(marker);
          newOverlays.push(customOverlay);
        } catch (err) {
          // 마커 생성 실패 시 무시
        }
      }
    });

    if (newMarkers.length > 0) {
      // 클러스터러에 마커 추가
      clusterer.addMarkers(newMarkers);
      setMarkers(newMarkers);
      setOverlays(newOverlays);


      // 초기 로드 시에만 지도 범위 조정 (모든 마커가 보이도록)
      if (isInitialLoad) {
        const bounds = new window.kakao.maps.LatLngBounds();
        newMarkers.forEach(marker => {
          bounds.extend(marker.getPosition());
        });
        map.setBounds(bounds, 50, 50, 50, 50);
        setIsInitialLoad(false);
      }
    }

  }, [map, clusterer, courses, onMarkerClick, isInitialLoad]);

  // 줌 레벨에 따른 라벨 표시 제어
  useEffect(() => {
    if (!map || overlays.length === 0) return;

    const handleZoomChanged = () => {
      const level = map.getLevel();
      
      // 줌 레벨 8 이하(더 확대된 상태)일 때만 라벨 표시
      overlays.forEach(overlay => {
        if (level <= 8) {
          if (!overlay.getMap()) {
            overlay.setMap(map);
          }
        } else {
          overlay.setMap(null);
        }
      });
    };

    // 초기 줌 레벨 체크
    handleZoomChanged();

    // 줌 변경 이벤트 리스너 등록
    window.kakao.maps.event.addListener(map, 'zoom_changed', handleZoomChanged);

    return () => {
      window.kakao.maps.event.removeListener(map, 'zoom_changed', handleZoomChanged);
    };
  }, [map, overlays]);

  return (
    <div className="w-full h-full relative">
      <div 
        ref={mapRef} 
        className="w-full h-full rounded-lg"
        style={{
          width: '100%',
          height: '100%',
          minHeight: '400px'
        }}
      />
      
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100 bg-opacity-90 rounded-lg">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-2"></div>
            <p className="text-gray-600">카카오맵 로딩중...</p>
          </div>
        </div>
      )}
      
      {error && (
        <div className="absolute inset-0 flex items-center justify-center bg-red-50 rounded-lg">
          <div className="text-center p-4">
            <p className="text-red-600 mb-2 font-medium">{error}</p>
            <button 
              onClick={() => window.location.reload()} 
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
            >
              새로고침
            </button>
          </div>
        </div>
      )}
    </div>
  );
}