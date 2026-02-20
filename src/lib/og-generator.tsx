/**
 * OG Image Generator Utilities
 * Shared components, themes, and helpers for dynamic OG image generation
 */

// Track-specific theme configuration V2 (Warm & Friendly)
export const TRACK_THEMES_V2 = {
  'ai-beginner': {
    color: '#ED4D9E',
    badge: '인기 트랙',
    tagline: '코딩 몰라도 4주 만에 수익화',
    orbColors: [
      'rgba(237, 77, 158, 0.18)',   // Pink orb (강도 증가)
      'rgba(255, 149, 0, 0.12)',    // Orange orb
      'rgba(249, 168, 212, 0.12)',  // Light pink orb
    ],
  },
  'ai-developer': {
    color: '#24B6F5',
    badge: '개발자 필수',
    tagline: '현업 개발자의 10배 생산성 부스터',
    orbColors: [
      'rgba(36, 182, 245, 0.15)',   // Cyan orb
      'rgba(147, 51, 234, 0.1)',    // Purple orb
      'rgba(59, 130, 246, 0.12)',   // Blue orb
    ],
  },
  'spring-backend': {
    color: '#2AB856',
    badge: '취업 완성',
    tagline: 'Lv0 → 38개 기업 합격 백엔드 개발자',
    orbColors: [
      'rgba(42, 184, 86, 0.15)',    // Green orb
      'rgba(34, 197, 94, 0.12)',    // Emerald orb
      'rgba(132, 204, 22, 0.1)',    // Lime orb
    ],
  },
} as const

export type TrackId = keyof typeof TRACK_THEMES_V2

/**
 * Fetch logo as Base64 with graceful degradation
 * For Edge Runtime, we fetch from the public URL
 * @param baseUrl - Base URL for the application
 * @returns Base64 data URI or null if logo cannot be loaded
 */
export async function fetchLogoAsBase64(baseUrl: string): Promise<string | null> {
  try {
    const logoUrl = `${baseUrl}/assets/dingco-logo.png`
    const response = await fetch(logoUrl)

    if (!response.ok) {
      console.error('Failed to fetch logo:', response.statusText)
      return null
    }

    const arrayBuffer = await response.arrayBuffer()
    const buffer = Buffer.from(arrayBuffer)
    const base64Logo = buffer.toString('base64')
    return `data:image/png;base64,${base64Logo}`
  } catch (error) {
    console.error('Failed to load logo:', error)
    return null
  }
}

/**
 * Get theme configuration for a specific track (V2)
 * @param trackId - Track identifier
 * @returns Theme object with colors and metadata
 */
export function getTrackTheme(trackId: string) {
  return TRACK_THEMES_V2[trackId as TrackId] || TRACK_THEMES_V2['ai-beginner']
}

/**
 * Create warm background with gradient orbs (V2)
 * @param orbColors - Array of 3 orb colors
 * @returns CSS background string
 */
export function createWarmBackground(orbColors: string[]): string {
  return `
    radial-gradient(circle at 15% 20%, ${orbColors[0]} 0%, transparent 50%),
    radial-gradient(circle at 85% 45%, ${orbColors[1]} 0%, transparent 45%),
    radial-gradient(circle at 25% 85%, ${orbColors[2]} 0%, transparent 40%),
    #FFFFFF
  `
}

/**
 * Format student count with Korean units
 * @param count - Number of students
 * @returns Formatted string (e.g., "7,000명")
 */
export function formatStudentCount(count: number): string {
  return `${count.toLocaleString('ko-KR')}명`
}

/**
 * Format course count with Korean grammar
 * @param count - Number of courses
 * @returns Formatted string (e.g., "3개 강의")
 */
export function formatCourseCount(count: number): string {
  return `${count}개 강의`
}

/**
 * Create 3-tier gradient background
 * @param accentColor - Optional accent color for bottom glow
 * @returns Linear gradient CSS string
 */
export function createGradientBackground(accentColor?: string): string {
  if (accentColor) {
    return `linear-gradient(135deg, #0f172a 0%, #1e293b 50%, ${accentColor}15 100%)`
  }
  return 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #1e40af15 100%)'
}
