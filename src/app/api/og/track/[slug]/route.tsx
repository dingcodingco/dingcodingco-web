/**
 * Dynamic Track OG Image Generator
 * Generates custom OG images for each track with track-specific themes
 */

import { ImageResponse } from 'next/og'
import { getTrackById } from '@/lib/course-utils'
import {
  fetchLogoAsBase64,
  getTrackTheme,
  formatStudentCount,
  formatCourseCount,
  createGradientBackground,
} from '@/lib/og-generator'

export const runtime = 'edge'

export async function GET(
  request: Request,
  { params }: { params: { slug: string } }
) {
  try {
    const { slug } = params

    // Fetch track data from static data source
    const track = getTrackById(slug)

    if (!track) {
      return new Response('Track not found', { status: 404 })
    }

    // Get track-specific theme
    const theme = getTrackTheme(track.id)

    // Get base URL for logo fetching
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'

    // Fetch logo with graceful degradation
    const logoBase64 = await fetchLogoAsBase64(baseUrl)

    return new ImageResponse(
      (
        <div
          style={{
            background: createGradientBackground(theme.gradientEnd),
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

          {/* Badge - Top Right */}
          <div
            style={{
              position: 'absolute',
              top: 60,
              right: 60,
              background: `linear-gradient(135deg, ${theme.gradientStart}, ${theme.gradientEnd})`,
              color: 'white',
              fontSize: 24,
              fontWeight: 700,
              padding: '16px 32px',
              borderRadius: 999,
              display: 'flex',
              alignItems: 'center',
              boxShadow: '0 10px 25px rgba(0, 0, 0, 0.3)',
            }}
          >
            {theme.badge}
          </div>

          {/* Main Content */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              maxWidth: '1000px',
            }}
          >
            {/* Track Icon + Name */}
            <div
              style={{
                fontSize: 96,
                fontWeight: 700,
                color: 'white',
                textAlign: 'center',
                marginBottom: 24,
                lineHeight: 1.1,
                letterSpacing: '-0.02em',
                display: 'flex',
                alignItems: 'center',
                gap: 24,
              }}
            >
              <span style={{ fontSize: 80 }}>{theme.icon}</span>
              {track.name}
            </div>

            {/* Tagline */}
            <div
              style={{
                fontSize: 48,
                color: '#e2e8f0',
                textAlign: 'center',
                marginBottom: 48,
                fontWeight: 300,
                lineHeight: 1.3,
                maxWidth: '900px',
              }}
            >
              {track.tagline}
            </div>

            {/* Colored Divider */}
            <div
              style={{
                width: '70%',
                height: 4,
                background: `linear-gradient(90deg, transparent, ${theme.color}, transparent)`,
                marginBottom: 48,
                borderRadius: 2,
              }}
            />

            {/* Stats Row */}
            <div
              style={{
                display: 'flex',
                gap: 48,
                alignItems: 'center',
                fontSize: 32,
                color: '#cbd5e1',
                marginBottom: 16,
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center' }}>
                {track.estimatedDuration}
              </div>
              <div
                style={{
                  width: 4,
                  height: 4,
                  background: '#64748b',
                  borderRadius: 999,
                }}
              />
              <div style={{ display: 'flex', alignItems: 'center' }}>
                {formatCourseCount(track.courseCount)}
              </div>
              <div
                style={{
                  width: 4,
                  height: 4,
                  background: '#64748b',
                  borderRadius: 999,
                }}
              />
              <div style={{ display: 'flex', alignItems: 'center' }}>
                {formatStudentCount(track.studentCount)} 수강
              </div>
            </div>

            {/* Rating */}
            <div
              style={{
                fontSize: 32,
                color: '#fbbf24',
                fontWeight: 600,
                display: 'flex',
                alignItems: 'center',
                gap: 8,
              }}
            >
              ⭐ {track.rating.toFixed(1)}/5.0 평점
            </div>
          </div>

          {/* Footer */}
          <div
            style={{
              position: 'absolute',
              bottom: 40,
              display: 'flex',
              alignItems: 'center',
              gap: 16,
              fontSize: 24,
              color: '#64748b',
            }}
          >
            <span style={{ fontWeight: 600 }}>딩코딩코</span>
            <div
              style={{
                width: 4,
                height: 4,
                background: '#64748b',
                borderRadius: 999,
              }}
            />
            <span>dingcodingco.com</span>
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
      }
    )
  } catch (error) {
    console.error('OG Image generation failed:', error)
    return new Response('Failed to generate image', { status: 500 })
  }
}
