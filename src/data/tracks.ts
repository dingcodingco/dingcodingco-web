/**
 * Track data extracted from prd.md
 * Static data for 3 learning tracks
 */

import { Track } from '@/types';

export const tracks: Track[] = [
  {
    id: 'ai-beginner',
    name: 'AI 비개발자',
    slug: 'ai-beginner',
    iconName: 'ai-beginner',
    tagline: '코딩 몰라도 4주 만에 수익화 서비스 런칭',
    description: '코딩 경험 0도 괜찮아요. 4주 만에 진짜 돈 버는 서비스를 만들어보세요.',
    badge: '인기 트랙',
    estimatedDuration: '4-6주',
    courseCount: 3,
    studentCount: 7000,
    rating: 4.9,
    courseIds: ['python-core', 'sql-core', 'ai-vibe-coding'],
  },
  {
    id: 'ai-developer',
    name: 'AI 개발자',
    slug: 'ai-developer',
    iconName: 'ai-developer',
    tagline: '현업 개발자의 10배 생산성 부스터',
    description: '이미 코딩하는 개발자라면, AI로 10배 빠르게 일하세요.',
    badge: '개발자 필수',
    estimatedDuration: '4주',
    courseCount: 1,
    studentCount: 300,
    rating: 4.9,
    courseIds: ['10x-ai-native-developer'],
  },
  {
    id: 'spring-backend',
    name: '스프링 백엔드',
    slug: 'spring-backend',
    iconName: 'spring-backend',
    tagline: 'Lv0 → 38개 기업 합격 백엔드 개발자',
    description: 'Lv0부터 시작해서 38개 기업 합격한 백엔드 개발자가 되세요.',
    badge: '취업 완성',
    estimatedDuration: '12-16주',
    courseCount: 8,
    studentCount: 2000,
    rating: 4.9,
    courseIds: [
      'sql-db-core',
      'git-core',
      'spring-boot-lv1',
      'jpa-lv2',
      'deployment-lv3',
      'resume-strategy',
      'interview-challenge',
      'algorithm-essentials',
    ],
  },
];
