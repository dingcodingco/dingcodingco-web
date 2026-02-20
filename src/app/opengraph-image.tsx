import { ImageResponse } from 'next/og'
import { fetchLogoAsBase64, createGradientBackground } from '@/lib/og-generator'

export const runtime = 'edge'
export const alt = '딩코딩코 - AI 코딩 교육 플랫폼'
export const size = {
  width: 1200,
  height: 630,
}
export const contentType = 'image/png'

export default async function Image() {
  // Get base URL for logo fetching
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'

  // Fetch logo with graceful degradation
  const logoBase64 = await fetchLogoAsBase64(baseUrl)

  return new ImageResponse(
    (
      <div
        style={{
          background: createGradientBackground('#1e40af'),
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: 'Inter, system-ui, sans-serif',
          padding: '80px',
          position: 'relative',
        }}
      >
        {/* Logo - Top Left */}
        {logoBase64 && (
          <div
            style={{
              position: 'absolute',
              top: 60,
              left: 60,
              width: 120,
              height: 120,
              display: 'flex',
              filter: 'drop-shadow(0 10px 25px rgba(0, 0, 0, 0.5))',
            }}
          >
            <img
              src={logoBase64}
              width="120"
              height="120"
              alt="딩코딩코 로고"
              style={{
                borderRadius: '24px',
              }}
            />
          </div>
        )}

        {/* Main Content Container */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            maxWidth: '1000px',
          }}
        >
          {/* Brand Name */}
          <div
            style={{
              fontSize: 84,
              fontWeight: 700,
              color: 'white',
              textAlign: 'center',
              marginBottom: 24,
              lineHeight: 1.1,
              letterSpacing: '-0.02em',
            }}
          >
            딩코딩코
          </div>

          {/* Subtitle */}
          <div
            style={{
              fontSize: 56,
              color: '#60a5fa',
              textAlign: 'center',
              marginBottom: 32,
              fontWeight: 600,
              letterSpacing: '-0.01em',
            }}
          >
            AI 코딩 교육 플랫폼
          </div>

          {/* Value Proposition */}
          <div
            style={{
              fontSize: 36,
              color: '#e2e8f0',
              textAlign: 'center',
              marginBottom: 48,
              lineHeight: 1.4,
              fontWeight: 300,
            }}
          >
            코딩 몰라도 4주 만에 수익화 | 10배 생산성 | 38개 기업 합격
          </div>

          {/* Separator Line */}
          <div
            style={{
              width: '80%',
              height: 2,
              background: 'linear-gradient(90deg, transparent, #475569, transparent)',
              marginBottom: 32,
            }}
          />

          {/* Stats Row */}
          <div
            style={{
              display: 'flex',
              gap: 48,
              alignItems: 'center',
              fontSize: 32,
              color: '#94a3b8',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center' }}>
              👥 14,556명 수강
            </div>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              ⭐ 4.9/5.0
            </div>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              🎓 3개 트랙
            </div>
          </div>
        </div>

        {/* Footer - Domain */}
        <div
          style={{
            position: 'absolute',
            bottom: 40,
            right: 60,
            fontSize: 24,
            color: '#64748b',
            fontWeight: 400,
          }}
        >
          dingcodingco.com
        </div>
      </div>
    ),
    {
      ...size,
    }
  )
}
