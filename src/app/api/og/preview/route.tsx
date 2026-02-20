/**
 * OG Image Preview Tool
 * Development utility for testing OG images with different tracks
 * Usage: /api/og/preview?track=ai-beginner
 */

import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const track = searchParams.get('track') || 'ai-beginner'

  const validTracks = ['ai-beginner', 'ai-developer', 'spring-backend']

  if (!validTracks.includes(track)) {
    return NextResponse.json(
      { error: 'Invalid track. Use: ai-beginner, ai-developer, or spring-backend' },
      { status: 400 }
    )
  }

  // Return HTML with image preview
  const html = `
    <!DOCTYPE html>
    <html lang="ko">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>OG Image Preview - ${track}</title>
        <style>
          body {
            margin: 0;
            padding: 40px;
            background: #0f172a;
            font-family: system-ui, sans-serif;
            color: white;
          }
          h1 {
            text-align: center;
            margin-bottom: 32px;
            color: #60a5fa;
          }
          .container {
            max-width: 1200px;
            margin: 0 auto;
          }
          .selector {
            display: flex;
            gap: 16px;
            justify-content: center;
            margin-bottom: 32px;
          }
          .selector a {
            padding: 12px 24px;
            background: #1e293b;
            color: white;
            text-decoration: none;
            border-radius: 8px;
            transition: background 0.2s;
          }
          .selector a:hover {
            background: #334155;
          }
          .selector a.active {
            background: #3b82f6;
          }
          .preview {
            background: white;
            padding: 20px;
            border-radius: 12px;
            box-shadow: 0 20px 50px rgba(0, 0, 0, 0.5);
          }
          img {
            width: 100%;
            height: auto;
            display: block;
            border-radius: 8px;
          }
          .info {
            margin-top: 24px;
            padding: 20px;
            background: #1e293b;
            border-radius: 8px;
          }
          .info p {
            margin: 8px 0;
            color: #cbd5e1;
          }
          .info strong {
            color: #60a5fa;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <h1>🎨 OG Image Preview Tool</h1>

          <div class="selector">
            <a href="/api/og/preview?track=ai-beginner" ${track === 'ai-beginner' ? 'class="active"' : ''}>
              🎨 AI 비개발자
            </a>
            <a href="/api/og/preview?track=ai-developer" ${track === 'ai-developer' ? 'class="active"' : ''}>
              🤖 AI 개발자
            </a>
            <a href="/api/og/preview?track=spring-backend" ${track === 'spring-backend' ? 'class="active"' : ''}>
              🌱 스프링 백엔드
            </a>
            <a href="/opengraph-image" style="background: #059669;">
              📍 Default OG
            </a>
          </div>

          <div class="preview">
            <img
              src="/api/og/track/${track}"
              alt="OG Image Preview"
              loading="eager"
            />
          </div>

          <div class="info">
            <p><strong>Current Track:</strong> ${track}</p>
            <p><strong>Image URL:</strong> /api/og/track/${track}</p>
            <p><strong>Dimensions:</strong> 1200x630px</p>
            <p><strong>Format:</strong> PNG</p>
            <p><strong>Runtime:</strong> Edge</p>
          </div>

          <div class="info" style="margin-top: 16px;">
            <h3 style="margin-top: 0; color: #60a5fa;">Testing URLs</h3>
            <p><strong>Facebook Debugger:</strong> <a href="https://developers.facebook.com/tools/debug/" target="_blank" style="color: #60a5fa;">Open Tool</a></p>
            <p><strong>Twitter Validator:</strong> <a href="https://cards-dev.twitter.com/validator" target="_blank" style="color: #60a5fa;">Open Tool</a></p>
            <p><strong>LinkedIn Inspector:</strong> <a href="https://www.linkedin.com/post-inspector/" target="_blank" style="color: #60a5fa;">Open Tool</a></p>
          </div>
        </div>
      </body>
    </html>
  `

  return new NextResponse(html, {
    headers: {
      'Content-Type': 'text/html',
    },
  })
}
