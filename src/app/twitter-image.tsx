import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const alt = '딩코딩코 - AI 코딩 교육 플랫폼'
export const size = {
  width: 1200,
  height: 630,
}
export const contentType = 'image/png'

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: 'system-ui, sans-serif',
          padding: '80px',
        }}
      >
        {/* Main Title */}
        <div
          style={{
            fontSize: 72,
            fontWeight: 'bold',
            color: 'white',
            textAlign: 'center',
            marginBottom: 24,
            lineHeight: 1.2,
          }}
        >
          딩코딩코
        </div>

        {/* Subtitle */}
        <div
          style={{
            fontSize: 48,
            color: '#3b82f6',
            textAlign: 'center',
            marginBottom: 48,
            fontWeight: 600,
          }}
        >
          AI 코딩 교육 플랫폼
        </div>

        {/* Description */}
        <div
          style={{
            fontSize: 32,
            color: '#cbd5e1',
            textAlign: 'center',
            marginBottom: 64,
            maxWidth: '900px',
            lineHeight: 1.4,
          }}
        >
          코딩 몰라도 4주 만에 수익화<br />
          14,556명이 선택한 검증된 커리큘럼
        </div>

        {/* Stats */}
        <div
          style={{
            display: 'flex',
            gap: 48,
            alignItems: 'center',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div
              style={{
                fontSize: 28,
                color: '#94a3b8',
              }}
            >
              👥 14,556명 수강
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div
              style={{
                fontSize: 28,
                color: '#94a3b8',
              }}
            >
              ⭐ 4.9/5.0 평점
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div
              style={{
                fontSize: 28,
                color: '#94a3b8',
              }}
            >
              🎓 3개 트랙
            </div>
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  )
}
