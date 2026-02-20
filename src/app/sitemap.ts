/**
 * Dynamic sitemap generation for SEO
 * Automatically generates /sitemap.xml endpoint
 */

import { MetadataRoute } from 'next'
import { tracks } from '@/data/tracks'
import { courses } from '@/data/courses'

export default function sitemap(): MetadataRoute.Sitemap {
  // Production URL
  const baseUrl = 'https://dingcodingco.vercel.app'
  const currentDate = new Date()

  // For single-page application, only include the main URL
  // Search engines ignore hash fragments (#hero, #tracks, etc.)
  const mainPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 1.0,
    },
  ]

  // Note: Hash fragments are not indexed by search engines
  // All sections (#hero, #tracks, #track-ai-beginner, etc.) are part of the main page
  // and will be crawled when the main URL is accessed

  return mainPages
}
