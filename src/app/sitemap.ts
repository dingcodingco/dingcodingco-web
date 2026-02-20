/**
 * Dynamic sitemap generation for SEO
 * Automatically generates /sitemap.xml endpoint
 */

import { MetadataRoute } from 'next'
import { tracks } from '@/data/tracks'
import { courses } from '@/data/courses'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'
  const currentDate = new Date()

  // Main pages
  const mainPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/#hero`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/#tracks`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/#outcome-stories`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/#instructor`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/#faq`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.6,
    },
  ]

  // Track pages
  const trackPages: MetadataRoute.Sitemap = tracks.map((track) => ({
    url: `${baseUrl}/#track-${track.id}`,
    lastModified: currentDate,
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }))

  // Course pages (only published courses)
  const coursePages: MetadataRoute.Sitemap = courses
    .filter((course) => course.status === 'published')
    .map((course) => ({
      url: `${baseUrl}/#course-${course.id}`,
      lastModified: currentDate,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    }))

  return [...mainPages, ...trackPages, ...coursePages]
}
