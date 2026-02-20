/**
 * Generate JSON-LD structured data for SEO
 * Schema.org Course specification
 */

import { Track } from '@/types'

export function generateCourseJsonLd(track: Track) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Course',
    name: track.name,
    description: track.description,
    provider: {
      '@type': 'Organization',
      name: '딩코딩코',
      sameAs: 'https://www.inflearn.com/users/408812/@dingcodingco'
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: track.rating.toString(),
      reviewCount: track.studentCount.toString(),
      bestRating: '5',
      worstRating: '1'
    },
    numberOfCredits: track.courseCount.toString(),
    timeRequired: track.estimatedDuration,
    educationalLevel: 'Beginner',
    inLanguage: 'ko',
    availableLanguage: ['ko']
  }
}

export function generateOrganizationJsonLd() {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://dingcodingco.com'

  return {
    '@context': 'https://schema.org',
    '@type': 'EducationalOrganization',
    name: '딩코딩코',
    alternateName: 'Dingcodingco',
    url: baseUrl,
    logo: `${baseUrl}/assets/dingco-logo.png`,
    description: 'AI 코딩 교육 전문 기관. 비개발자부터 현업 개발자까지 14,556명이 선택한 교육 플랫폼.',
    sameAs: [
      'https://www.youtube.com/@딩코딩코',
      'https://www.inflearn.com/users/408812/@dingcodingco'
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'Customer Service',
      availableLanguage: ['Korean']
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.9',
      bestRating: '5',
      worstRating: '1',
      ratingCount: '1200'
    },
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'KR',
      addressRegion: 'Seoul'
    }
  }
}

export function generateWebSiteJsonLd() {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://dingcodingco.com'

  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: '딩코딩코 | AI 코딩 교육 플랫폼',
    alternateName: 'Dingcodingco Learning Platform',
    description: 'AI 코딩 교육 플랫폼 - 비개발자부터 현업 개발자까지. 14,556명이 선택한 검증된 커리큘럼.',
    url: baseUrl,
    publisher: {
      '@type': 'Organization',
      name: '딩코딩코',
      logo: `${baseUrl}/assets/dingco-logo.png`
    },
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${baseUrl}/?q={search_term_string}`
      },
      'query-input': 'required name=search_term_string'
    }
  }
}

/**
 * Generate FAQPage structured data
 */
export function generateFAQPageJsonLd(faqs: Array<{ question: string; answer: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer
      }
    }))
  }
}

/**
 * Generate BreadcrumbList structured data
 */
export function generateBreadcrumbJsonLd(items: Array<{ name: string; url: string }>) {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://dingcodingco.com'

  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: `${baseUrl}${item.url}`
    }))
  }
}
