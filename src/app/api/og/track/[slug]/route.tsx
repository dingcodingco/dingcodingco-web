/**
 * Track OG Image - Serves static homepage screenshot
 * Until track pages are built, use the homepage design for all tracks
 */

import { NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

export async function GET(
  request: Request,
  context: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await context.params

    // Valid track slugs
    const validTracks = ['ai-beginner', 'ai-developer', 'spring-backend']

    if (!validTracks.includes(slug)) {
      return new Response('Track not found', { status: 404 })
    }

    // Serve the homepage screenshot as OG image for all tracks
    const imagePath = path.join(process.cwd(), 'public', 'og-images', 'default.png')
    const imageBuffer = fs.readFileSync(imagePath)

    return new NextResponse(imageBuffer, {
      headers: {
        'Content-Type': 'image/png',
        'Cache-Control': 'public, max-age=31536000, immutable',
      },
    })
  } catch (error) {
    console.error('Failed to serve OG image:', error)
    return new Response('Failed to generate image', { status: 500 })
  }
}
