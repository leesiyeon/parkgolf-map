import { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: '파크골프맵 - 전국 파크골프장 현황',
    short_name: '파크골프맵',
    description: '전국 파크골프장 위치를 지도에서 확인하고 파크골프 뉴스를 실시간으로 받아보세요',
    start_url: '/',
    display: 'standalone',
    background_color: '#f9fafb',
    theme_color: '#3b82f6',
    icons: [
      {
        src: '/icon-192',
        sizes: '192x192',
        type: 'image/png',
        purpose: 'any',
      },
      {
        src: '/icon-192',
        sizes: '192x192',
        type: 'image/png',
        purpose: 'maskable',
      },
      {
        src: '/icon-512',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'any',
      },
      {
        src: '/icon-512',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'maskable',
      },
      {
        src: '/icon',
        sizes: '32x32',
        type: 'image/png',
      },
    ],
  }
}
