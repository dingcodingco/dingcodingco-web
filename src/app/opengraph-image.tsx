import { ImageResponse } from 'next/og'
import fs from 'fs'
import path from 'path'

export const runtime = 'nodejs'
export const alt = '딩코딩코 - AI 코딩 교육 플랫폼'
export const size = {
  width: 1200,
  height: 630,
}
export const contentType = 'image/png'

export default async function Image() {
  // Serve the static screenshot
  const imagePath = path.join(process.cwd(), 'public', 'og-images', 'default.png')
  const imageBuffer = fs.readFileSync(imagePath)

  return new Response(imageBuffer, {
    headers: {
      'Content-Type': 'image/png',
    },
  })
}
