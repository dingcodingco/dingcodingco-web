/**
 * Course data extracted from prd.md
 * All courses across 3 tracks with detailed information
 */

import { Course } from '@/types';

export const courses: Course[] = [
  // ========================================
  // AI 비개발자 트랙 (3 courses)
  // ========================================
  {
    id: 'python-core',
    trackId: 'ai-beginner',
    title: '단 60분! 파이썬 핵심 개념 초압축',
    level: 'STEP 1',
    duration: '1시간 4분',
    price: 0,
    isFree: true,
    status: 'published',
    inflearnUrl: 'https://www.inflearn.com/course/파이썬-핵심개념-압축강의',
    thumbnailUrl: '/assets/thumbnails/python-core.webp',
    description: '변수, 함수, 조건문 - "왜 이게 필요한지" 중심',
    sortOrder: 1,
    technologies: ['Python', '프로그래밍 기초', '변수/함수', '조건문'],
    updatedAt: '2024년 11월',
    totalReviewCount: 359,
    reviews: [
      {
        rating: 5.0,
        content: '파이썬 기초를 빠르게 다질 수 있었어요. 비개발자도 이해하기 쉽게 설명해주셔서 좋았습니다!',
        author: '김*민'
      }
    ]
  },
  {
    id: 'sql-basics-ai',
    trackId: 'ai-beginner',
    title: 'SQL/DB 핵심 개념 2시간',
    level: 'STEP 2',
    duration: '2시간 25분',
    price: 0,
    isFree: true,
    status: 'published',
    inflearnUrl: 'https://www.inflearn.com/course/lv0-단-2시간-sqldb-핵심-개',
    thumbnailUrl: '/assets/thumbnails/sql-basics-ai.webp',
    description: '데이터베이스 기초, 쿼리 작성 기본',
    sortOrder: 2,
    technologies: ['SQL', 'Database', '쿼리 작성', 'SELECT/JOIN'],
    updatedAt: '2024년 10월',
    totalReviewCount: 16,
    reviews: [
      {
        rating: 5.0,
        content: '데이터베이스가 처음이었는데 2시간 만에 핵심 개념을 이해했어요!',
        author: '최*진'
      }
    ]
  },
  {
    id: 'ai-vibe-coding',
    trackId: 'ai-beginner',
    title: '비개발자 4주만에 수익화 서비스 만들기: AI 바이브코딩',
    level: 'STEP 3',
    duration: '27시간',
    price: 165000,
    isFree: false,
    status: 'published',
    inflearnUrl: 'https://www.inflearn.com/course/비개발자-4주만에-수익화-서비스-만들',
    thumbnailUrl: '/assets/thumbnails/ai-vibe-coding.gif',
    description: 'Cursor + Claude로 웹/앱 풀스택 개발',
    sortOrder: 3,
    technologies: ['Cursor', 'Claude', 'Next.js', 'Supabase', 'React Native'],
    updatedAt: '2026년 2월',
    totalReviewCount: 265,
    reviews: [
      {
        rating: 5.0,
        content: '정말 4주 만에 서비스를 만들 수 있었어요. AI 도구 활용법이 실용적이고 바로 적용 가능했습니다!',
        author: '정*희'
      }
    ]
  },

  // ========================================
  // AI 개발자 트랙 (1 course)
  // ========================================
  {
    id: '10x-ai-native-developer',
    trackId: 'ai-developer',
    title: 'The 10x AI-Native Developer',
    level: 'STEP 1',
    duration: '16시간 38분',
    price: 198000,
    isFree: false,
    status: 'published',
    inflearnUrl: 'https://inf.run/KNWm3',
    thumbnailUrl: '/assets/thumbnails/10x-ai-native-developer.gif',
    description:
      'Claude Code 실전 활용법, MCP 서버 구축, AI 에이전트 워크플로우 자동화, 프롬프트 엔지니어링 심화, 실무 프로젝트 적용 사례',
    sortOrder: 1,
    technologies: ['Claude Code', 'MCP', 'Playwright', 'TypeScript', 'AI Agents'],
    updatedAt: '2026년 2월',
    totalReviewCount: 91,
    reviews: [
      {
        rating: 5.0,
        content: 'Claude Code 실전 활용법부터 MCP 서버 구축까지, 실무에서 바로 써먹을 수 있는 내용들이 가득했습니다!',
        author: '송*호'
      }
    ]
  },

  // ========================================
  // 스프링 백엔드 트랙 (7 courses)
  // ========================================
  {
    id: 'sql-db-core',
    trackId: 'spring-backend',
    title: '[Lv0] 단 2시간! SQL/DB 핵심 개념',
    level: 'Lv0',
    duration: '2시간 25분',
    price: 0,
    isFree: true,
    status: 'published',
    inflearnUrl: 'https://www.inflearn.com/course/lv0-단-2시간-sqldb-핵심-개',
    thumbnailUrl: '/assets/thumbnails/sql-db-core.webp',
    description: '데이터베이스 기초, SQL 쿼리',
    sortOrder: 1,
    technologies: ['SQL', 'Database', '쿼리 최적화', '인덱스'],
    updatedAt: '2024년 10월',
    totalReviewCount: 16,
    reviews: [
      {
        rating: 5.0,
        content: '데이터베이스 기초를 빠르게 잡을 수 있었어요. 쿼리 작성이 이제 자신감 생겼습니다!',
        author: '임*준'
      }
    ]
  },
  {
    id: 'git-core',
    trackId: 'spring-backend',
    title: 'Git 핵심 개념',
    level: 'Lv0',
    duration: 'TBD',
    price: 0,
    isFree: true,
    status: 'coming_soon',
    inflearnUrl: 'https://www.inflearn.com/course/git-core',
    thumbnailUrl: '/assets/thumbnails/git-core.webp',
    description: 'Git 기초, 협업 워크플로우',
    expectedRelease: '2025년 Q2',
    sortOrder: 2,
    technologies: ['Git', 'GitHub', 'Pull Request', '브랜치 전략'],
    updatedAt: '2025년 Q2 출시 예정',
  },
  {
    id: 'spring-boot-lv1',
    trackId: 'spring-backend',
    title: '[Lv1] 면접에서 "설명할 수 있는" Spring Boot',
    level: 'Lv1',
    duration: '9시간 58분',
    price: 88000,
    isFree: false,
    status: 'published',
    inflearnUrl: 'https://inf.run/oUbDy',
    thumbnailUrl: '/assets/thumbnails/spring-boot-lv1.gif',
    description: 'Spring 핵심 원리, 면접 대비',
    sortOrder: 3,
    technologies: ['Spring Boot', 'Java', 'DI/IoC', 'AOP', 'Spring MVC'],
    updatedAt: '2026년 1월',
    totalReviewCount: 36,
    reviews: [
      {
        rating: 5.0,
        content: '면접 질문에 어떻게 대답해야 할지 막막했는데, 이 강의로 자신감이 생겼어요!',
        author: '권*영'
      }
    ]
  },
  {
    id: 'jpa-lv2',
    trackId: 'spring-backend',
    title: 'JPA 심화',
    level: 'Lv2',
    duration: 'TBD',
    price: 99000,
    isFree: false,
    status: 'coming_soon',
    inflearnUrl: 'https://www.inflearn.com/course/jpa-lv2',
    thumbnailUrl: '/assets/thumbnails/jpa-lv2.webp',
    description: 'JPA 성능 최적화, 실전 패턴',
    expectedRelease: '2025년 Q3',
    sortOrder: 4,
    technologies: ['JPA', 'Hibernate', 'N+1 문제', '영속성 컨텍스트'],
    updatedAt: '2025년 Q3 출시 예정',
  },
  {
    id: 'deployment-lv3',
    trackId: 'spring-backend',
    title: '배포 & 인프라',
    level: 'Lv3',
    duration: 'TBD',
    price: 99000,
    isFree: false,
    status: 'coming_soon',
    inflearnUrl: 'https://www.inflearn.com/course/deployment-lv3',
    thumbnailUrl: '/assets/thumbnails/deployment-lv3.webp',
    description: 'AWS, Docker, CI/CD',
    expectedRelease: '2025년 Q4',
    sortOrder: 5,
    technologies: ['AWS', 'Docker', 'CI/CD', 'Kubernetes'],
    updatedAt: '2025년 Q4 출시 예정',
  },
  {
    id: 'resume-strategy',
    trackId: 'spring-backend',
    title: '6주 완성! 백엔드 이력서 차별화 전략 4가지',
    level: '취업',
    duration: '22시간 28분',
    price: 297000,
    salePrice: 239200,
    isFree: false,
    status: 'published',
    inflearnUrl: 'https://www.inflearn.com/course/6주완성-백엔드-이력서-돋보이는법',
    thumbnailUrl: '/assets/thumbnails/resume-strategy.gif',
    description: '포트폴리오, 이력서 작성법',
    sortOrder: 6,
    technologies: ['포트폴리오', '이력서', 'GitHub', '프로젝트'],
    updatedAt: '2026년 1월',
    totalReviewCount: 181,
    reviews: [
      {
        rating: 5.0,
        content: '이력서 차별화 전략 덕분에 서류 합격률이 확실히 올랐어요. 구체적인 예시가 많아서 좋았습니다!',
        author: '신*현'
      }
    ]
  },
  {
    id: 'interview-challenge',
    trackId: 'spring-backend',
    title: '3일 만에 끝내는 백엔드 면접 압축 공략집',
    level: '취업',
    duration: '3시간 33분',
    price: 33000,
    isFree: false,
    status: 'published',
    inflearnUrl: 'https://inf.run/FzriP',
    thumbnailUrl: '/assets/thumbnails/interview-challenge.gif',
    description: '기술 면접, 인성 면접 대비',
    sortOrder: 7,
    technologies: ['기술 면접', '알고리즘', '자료구조', 'CS 기초'],
    updatedAt: '2026년 2월',
    totalReviewCount: 52,
    reviews: [
      {
        rating: 5.0,
        content: '면접 전날 급하게 봤는데 핵심만 압축되어 있어서 좋았어요. 실제 면접에서 많이 도움 됐습니다!',
        author: '장*아'
      }
    ]
  },
  {
    id: 'algorithm-essentials',
    trackId: 'spring-backend',
    title: '38군데 합격 비법, 2025 코딩테스트 필수 알고리즘',
    level: '알고리즘',
    duration: '15시간 33분',
    price: 165000,
    salePrice: 140200,
    isFree: false,
    status: 'published',
    inflearnUrl: 'https://inf.run/9VcMW',
    thumbnailUrl: '/assets/thumbnails/algorithm-essentials.gif',
    description: '자료구조부터 정렬, 탐색, DP까지 취업 필수 알고리즘 완전 정복',
    sortOrder: 8,
    technologies: ['알고리즘', '자료구조', 'DP', '그래프', '백준'],
    updatedAt: '2026년 1월',
    totalReviewCount: 396,
    reviews: [
      {
        rating: 5.0,
        content: '38군데 합격 비법이라는 제목처럼 실전 코테에서 나오는 문제 유형을 정확히 다뤄주셔서 좋았습니다.',
        author: '문*희'
      }
    ]
  },
];
