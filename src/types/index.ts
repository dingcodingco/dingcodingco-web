/**
 * TypeScript interfaces for Portfolio-Web
 * Auto-generated from prd.md by Data Agent
 */

// Course status type
export type CourseStatus = 'published' | 'coming_soon';

// Course level type
export type CourseLevel =
  | 'STEP 1' | 'STEP 2' | 'STEP 3'
  | 'Lv0' | 'Lv1' | 'Lv2' | 'Lv3'
  | '알고리즘'
  | '취업';

// Track interface
export interface Track {
  id: string;
  name: string;
  slug: string;
  iconName: 'ai-beginner' | 'ai-developer' | 'spring-backend';
  tagline: string;
  description: string;
  badge: string;
  estimatedDuration: string;
  courseCount: number;
  studentCount: number;
  rating: number;
  courseIds: string[];
}

// Course review interface
export interface CourseReview {
  rating: number;        // 5.0
  content: string;       // "실무에 바로 적용할 수 있어요!"
  author: string;        // "김*민"
  date?: string;         // Optional: "2025-01"
}

// Course interface
export interface Course {
  id: string;
  trackId: string;
  title: string;
  level: CourseLevel;
  duration: string;
  price: number;
  salePrice?: number;
  isFree: boolean;
  status: CourseStatus;
  inflearnUrl: string;
  thumbnailUrl?: string;
  description: string;
  expectedRelease?: string;
  sortOrder: number;
  reviews?: CourseReview[];  // NEW: Best reviews (2-3)
}

// Trust & Conversion Optimization Types

export interface Achievement {
  metric: string;           // "38개", "7,000+", "4.9/5.0"
  label: string;           // "기업 합격", "수강생", "만족도"
  icon: string;            // Lucide icon name
  gradient: string;        // Tailwind gradient class
  trackId?: string;        // Optional: track-specific
}

export interface OutcomeStory {
  id: string;
  category: 'non-developer' | 'developer' | 'career-change';
  beforeState: string;     // "기획자 (코딩 경험 0)"
  afterState: string;      // "웹앱 런칭 (월 300만원 수익)"
  duration: string;        // "4주"
  trackId: string;
  achievement: string;     // "수익화 성공"
  quote: string;           // 한 줄 추천사
  metrics?: {
    label: string;         // "월 수익", "연봉"
    value: string;         // "300만원", "5,000만원"
  };

  // ✨ NEW: 수강평 소스 추적 (실제 인프런 수강평 기반)
  reviewUrl?: string;      // 인프런 원본 수강평 링크
  reviewAuthor?: string;   // 익명화된 작성자명 (김*민)
  reviewRating?: number;   // 별점 (4.0-5.0)
  reviewDate?: string;     // 작성 날짜
  isVerified?: boolean;    // 수동 검증 완료 여부
}

export interface FAQ {
  id: string;
  question: string;
  answer: string;
  category: 'enrollment' | 'refund' | 'difficulty' | 'outcomes';
  relatedTrackId?: string;
  proofLinks?: Array<{
    label: string;
    href: string;
  }>;
}

export interface TrustBadge {
  icon: string;
  label: string;           // "38개 기업 검증"
  subtitle: string;        // "실전 면접 통과"
  gradient?: string;       // Optional gradient
}

export interface ActivityTemplate {
  template: string;
  timeRange: string;
  weight: number;
  names?: string[];
  achievements?: string[];
  ratings?: string[];
}

// Instructor Profile Types

export interface InstructorProfile {
  name: string;
  title: string;
  profileImage: string;
  inflearnUrl: string;
  youtubeUrl: string;
  youtubeSubscribers: string;
  verificationBadge: string;
}

export interface InstructorStat {
  icon: 'Award' | 'Users' | 'Star';
  value: string;
  label: string;
  subtitle: string;
  gradient: string;
}

export interface TechStack {
  icon: string;
  name: string;
  color: string;
}

export interface Timeline {
  year: string;
  milestone: string;
}

export interface PhilosophyMessage {
  id: string;
  title?: string;
  message: string;
  author?: string;
  usage: 'hero' | 'footer' | 'about-page';
}

export interface TrustIndicator {
  icon: 'CheckCircle' | 'Star' | 'Award' | 'Youtube' | 'Shield' | 'TrendingUp';
  label: string;
  subtitle?: string;
}
