import { ImageResponse } from 'next/og'

export const runtime = 'edge'

export async function GET() {
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 340,
          background: 'linear-gradient(135deg, #1e40af 0%, #3b82f6 50%, #60a5fa 100%)',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: '64px',
          boxShadow: '0 16px 64px rgba(0, 0, 0, 0.1)',
        }}
      >
        ⛳
      </div>
    ),
    {
      width: 512,
      height: 512,
    }
  )
}
