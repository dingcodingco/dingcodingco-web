/**
 * OG Image Generator Utilities
 * Shared components, themes, and helpers for dynamic OG image generation
 */

// Track-specific theme configuration
export const TRACK_THEMES = {
  'ai-beginner': {
    color: '#ED4D9E',
    badge: '인기 트랙',
    icon: '🎨',
    valueProp: '코딩 몰라도 4주 만에 수익화 서비스 런칭',
    gradientStart: '#EC489A',
    gradientEnd: '#C13A7E',
  },
  'ai-developer': {
    color: '#24B6F5',
    badge: '개발자 필수',
    icon: '🤖',
    valueProp: '현업 개발자의 10배 생산성 부스터',
    gradientStart: '#22B4F3',
    gradientEnd: '#1A8CC2',
  },
  'spring-backend': {
    color: '#2AB856',
    badge: '취업 완성',
    icon: '🌱',
    valueProp: 'Lv0 → 38개 기업 합격 백엔드 개발자',
    gradientStart: '#28B654',
    gradientEnd: '#209244',
  },
} as const

export type TrackId = keyof typeof TRACK_THEMES

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
 * Get theme configuration for a specific track
 * @param trackId - Track identifier
 * @returns Theme object with colors and metadata
 */
export function getTrackTheme(trackId: string) {
  return TRACK_THEMES[trackId as TrackId] || TRACK_THEMES['ai-beginner']
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
