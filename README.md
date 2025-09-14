# 전국 파크골프장 현황 웹사이트

Next.js와 카카오맵 API를 사용하여 전국 파크골프장의 위치를 지도에 표시하고 상세정보를 제공하는 웹사이트입니다.

## 주요 기능

- 🗺️ 카카오맵을 통한 전국 파크골프장 위치 표시
- 📍 마커 클릭 시 상세정보 모달 표시
- 📊 파크골프장 통계 정보 제공 (총 개수, 공공/민간 시설 분류)
- 📱 반응형 디자인으로 모바일/데스크톱 지원
- 📄 CSV 파일을 통한 데이터 관리

## 기술 스택

- **Frontend**: Next.js 15, React 19, TypeScript
- **Styling**: Tailwind CSS
- **Map**: 카카오맵 API
- **Data**: CSV 파일 (PapaParse)

## 설치 및 실행

### 1. 의존성 설치

```bash
npm install
```

### 2. 카카오맵 API 키 설정

1. [카카오 개발자 콘솔](https://developers.kakao.com/)에서 애플리케이션을 생성합니다.
2. 플랫폼 설정에서 Web 플랫폼을 추가하고 사이트 도메인을 등록합니다.
3. JavaScript 키를 복사합니다.
4. 프로젝트 루트에 `.env.local` 파일을 생성하고 다음 내용을 추가합니다:

```env
NEXT_PUBLIC_KAKAO_MAP_API_KEY=your_kakao_map_api_key_here
```

### 3. 개발 서버 실행

```bash
npm run dev
```

브라우저에서 [http://localhost:3000](http://localhost:3000)을 열어 확인할 수 있습니다.

## 데이터 관리

파크골프장 데이터는 `public/data/parkgolf_courses.csv` 파일에서 관리됩니다.

### CSV 파일 구조

```csv
name,address,latitude,longitude,phone,description,hole_count,facility_type,operating_hours,price,website
서울시립 파크골프장,서울특별시 강동구 천호동 123-45,37.5665,127.0780,02-1234-5678,서울시에서 운영하는 공공 파크골프장입니다.,9,공공,06:00-22:00,무료,https://example.com
```

### 필드 설명

- `name`: 파크골프장 이름
- `address`: 주소
- `latitude`: 위도
- `longitude`: 경도
- `phone`: 전화번호
- `description`: 설명
- `hole_count`: 홀 수
- `facility_type`: 시설 유형 (공공/민간)
- `operating_hours`: 운영시간
- `price`: 이용료
- `website`: 웹사이트 URL

## 프로젝트 구조

```
parkgolf-map/
├── app/
│   ├── page.tsx          # 메인 페이지
│   └── layout.tsx        # 레이아웃
├── components/
│   ├── Map.tsx           # 카카오맵 컴포넌트
│   └── CourseModal.tsx   # 상세정보 모달
├── types/
│   └── parkgolf.ts       # 타입 정의
├── public/
│   └── data/
│       └── parkgolf_courses.csv  # 파크골프장 데이터
└── ...
```

## 배포

### Vercel 배포

1. GitHub에 코드를 푸시합니다.
2. [Vercel](https://vercel.com)에서 프로젝트를 import합니다.
3. 환경변수에 `NEXT_PUBLIC_KAKAO_MAP_API_KEY`를 설정합니다.
4. 배포를 완료합니다.

### 환경변수 설정

배포 시 다음 환경변수를 설정해야 합니다:
- `NEXT_PUBLIC_KAKAO_MAP_API_KEY`: 카카오맵 JavaScript 키

## 라이선스

MIT License
