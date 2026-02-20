# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**딩코딩코 로드맵** - Learning platform with 3 educational tracks (AI 비개발자, AI 개발자, 스프링 백엔드) for Korean developers and non-developers. Built with Next.js 15, focusing on performance through static data architecture.

## Key Architecture Decisions

### Static-First Data Strategy
- **Course/Track Content**: TypeScript files in `src/data/` (NOT Supabase)
  - `src/data/tracks.ts` - 3 track definitions
  - `src/data/courses.ts` - 10+ course listings
- **Supabase MCP**: Only for user-generated data (waitlist, quiz responses)
- **Rationale**: 0ms query time, better SEO, version-controlled content, minimal database costs

### Technology Stack
- **Framework**: Next.js 15.3.5+ with App Router
- **Language**: TypeScript (strict mode)
- **Styling**: Tailwind CSS + shadcn/ui (Radix UI components)
- **Database**: Supabase (MCP integration, minimal schema)
- **Deployment**: Vercel (automatic CI/CD)
- **Forms**: react-hook-form + zod validation

## Development Commands

```bash
# Development server (port 3000)
npm run dev

# Production build (static generation)
npm run build

# Start production server
npm start

# Lint TypeScript/React code
npm run lint

# Type checking (if configured)
npx tsc --noEmit
```

## Project Structure

```
src/
├── app/                          # Next.js App Router
│   ├── layout.tsx                # Root layout with metadata
│   ├── page.tsx                  # Homepage
│   ├── globals.css               # Tailwind directives + global styles
│   ├── roadmaps/                 # Learning track pages
│   │   ├── page.tsx              # Track listing (3 cards)
│   │   ├── [trackSlug]/page.tsx  # Track detail with course list
│   │   └── quiz/page.tsx         # Track recommendation quiz
│   ├── courses/
│   │   └── [courseSlug]/page.tsx # Course detail + Inflearn CTA
│   ├── api/                      # API routes (Supabase MCP)
│   │   ├── waitlist/route.ts     # Email collection for coming_soon courses
│   │   └── quiz/route.ts         # Quiz response tracking
│   └── components/               # React components
│       ├── TrackCard.tsx         # Reusable track card
│       ├── CourseList.tsx        # Course items with badges
│       └── WaitlistForm.tsx      # Email signup form
├── data/                         # Static data (primary content source)
│   ├── tracks.ts                 # Track definitions (ai-beginner, ai-developer, spring-backend)
│   └── courses.ts                # Course data (published + coming_soon)
├── lib/                          # Utilities
│   ├── utils.ts                  # cn() helper, class merging
│   └── course-utils.ts           # Data access helpers (getTrackById, getCoursesByTrack)
└── types/
    └── index.ts                  # TypeScript interfaces (Track, Course)

public/
└── assets/                       # Images, icons, thumbnails

supabase/
└── migrations/
    └── 001_waitlist_schema.sql   # Minimal schema (course_waitlist, quiz_responses)
```

## Data Architecture

### Static Data Pattern (Primary Content Source)

**DO NOT FETCH FROM DATABASE** - Import static data instead:

```typescript
// ✅ CORRECT - Static import (instant, no database call)
import { tracks } from '@/data/tracks'
import { getCoursesByTrack } from '@/lib/course-utils'

export default async function RoadmapsPage() {
  return <TrackGrid tracks={tracks} />
}

// ❌ WRONG - Do not query Supabase for course/track data
const { data } = await supabase.from('tracks').select('*') // NEVER DO THIS
```

### Static Data Structure

```typescript
// src/data/tracks.ts
export interface Track {
  id: string              // 'ai-beginner', 'ai-developer', 'spring-backend'
  name: string            // 'AI 비개발자'
  icon: string            // '🎨'
  tagline: string         // '코딩 몰라도 4주 만에 수익화 서비스 런칭'
  description: string
  badge: string           // '인기 트랙', '개발자 필수', '취업 완성'
  estimatedDuration: string
  courseCount: number
  studentCount: number
  rating: number
  courseIds: string[]     // References to courses.ts by id
}

// src/data/courses.ts
export interface Course {
  id: string              // 'python-core', 'sql-core', etc.
  trackId: string         // Reference to track id
  title: string
  level: string           // 'STEP 1', 'Lv0', 'Lv1', etc.
  duration: string        // '1시간', '2시간', '11시간'
  price: number           // 0 for free, actual price for paid
  salePrice?: number      // Optional discounted price
  isFree: boolean
  status: 'published' | 'coming_soon'
  inflearnUrl: string     // External link to Inflearn course
  thumbnailUrl?: string
  description: string
  expectedRelease?: string // For coming_soon courses
  sortOrder: number
}
```

### Helper Functions (src/lib/course-utils.ts)

```typescript
export function getTrackById(id: string): Track | undefined
export function getCoursesByTrack(trackId: string): Course[]
export function getPublishedCourses(): Course[]
export function getComingSoonCourses(): Course[]
```

## Supabase MCP Integration (User Data Only)

### Schema (Minimal - Only 2 Tables)

```sql
-- Email collection for "coming soon" courses
CREATE TABLE course_waitlist (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  course_id TEXT NOT NULL,      -- References courses.ts by id (NOT FK)
  email TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(course_id, email)
);

-- Quiz response tracking (analytics)
CREATE TABLE quiz_responses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  coding_experience TEXT,       -- 'none', 'some', 'developer'
  goal TEXT,                    -- 'side-project', 'job', 'productivity'
  recommended_track_id TEXT,    -- References tracks.ts by id (NOT FK)
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- RLS Policies (public INSERT only)
ALTER TABLE course_waitlist ENABLE ROW LEVEL SECURITY;
ALTER TABLE quiz_responses ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public insert" ON course_waitlist
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow public insert" ON quiz_responses
  FOR INSERT WITH CHECK (true);
```

### MCP API Route Pattern

```typescript
// src/app/api/waitlist/route.ts
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  const { courseId, email } = await request.json()

  // Validate input
  if (!email || !courseId) {
    return NextResponse.json({ error: 'Missing fields' }, { status: 400 })
  }

  try {
    // Use Claude Code MCP tool for Supabase access
    // MCP handles authentication automatically
    await mcp__supabase__execute_sql({
      project_id: process.env.SUPABASE_PROJECT_ID!,
      query: `
        INSERT INTO course_waitlist (course_id, email)
        VALUES ($1, $2)
        ON CONFLICT (course_id, email) DO NOTHING
        RETURNING id
      `,
      params: [courseId, email]
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Waitlist error:', error)
    return NextResponse.json({ error: 'Failed to register' }, { status: 500 })
  }
}
```

### Environment Variables

```bash
# .env.local (for MCP access)
SUPABASE_PROJECT_ID=your-project-id
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

## Component Patterns

### shadcn/ui Components Used
- `card` - Track cards, course listings
- `button` - CTAs, navigation
- `input` - Forms
- `badge` - Status indicators (🆓 FREE, 💎 PREMIUM, 🔜 SOON)
- `tabs` - Content organization
- `toast` - Success notifications

### Custom Component Guidelines

**TrackCard.tsx** - Display single track with icon, title, stats
```typescript
interface TrackCardProps {
  track: Track
  href: string
}
// Should show: icon, name, tagline, badge, student count, rating
```

**CourseList.tsx** - List courses for a track with status badges
```typescript
interface CourseListProps {
  courses: Course[]
}
// Group by level (Lv0, Lv1, etc.), show free vs paid badges
```

**WaitlistForm.tsx** - Email collection for coming_soon courses
```typescript
interface WaitlistFormProps {
  courseId: string
}
// react-hook-form + zod validation, POST to /api/waitlist
```

## Quiz Logic (Decision Tree)

From PRD lines 265-280:

```
Q1: 프로그래밍 경험?
  - 전혀 없음 → ai-beginner
  - 조금 있음 → Q2
  - 현업 개발자 → Q2

Q2: 주요 목표?
  - 사이드 프로젝트/창업 → ai-beginner
  - 취업/이직 → spring-backend
  - 생산성 향상 → ai-developer

Q3: 주력 언어? (개발자 only)
  - Java/Spring → spring-backend
  - 기타 → ai-developer
```

Implementation: Client Component with useState, POST result to `/api/quiz`, redirect to recommended track.

## Important Implementation Rules

### ✅ DO
- Import course/track data from `src/data/*.ts` files
- Use Server Components for pages (default in App Router)
- Use Client Components only for forms, quiz, interactive UI
- Validate all form inputs with zod schemas
- Use Supabase MCP for INSERT operations only
- Include UTM parameters in Inflearn URLs
- Format prices with ₩ symbol and comma separators
- Show appropriate badges (🆓, 💎, 🔜) based on course status
- Use `cn()` helper from `src/lib/utils.ts` for class merging
- Follow existing Tailwind patterns (mobile-first responsive)

### ❌ DON'T
- Query Supabase for course/track data (use static imports)
- Install `@supabase/supabase-js` client library (use MCP instead)
- Create foreign keys between Supabase tables and static data
- Use CSS modules (Tailwind only)
- Hardcode course data in components (import from data files)
- Skip validation on API routes
- Use relative imports (use `@/*` path aliases)

## Testing & Verification

### Local Development
```bash
npm run dev
open http://localhost:3000/roadmaps

# Expected behavior:
# - 3 track cards display instantly (< 100ms)
# - No Supabase API calls in DevTools Network tab
# - Clicking track → shows course list
# - Coming soon courses → show waitlist form
```

### Build Verification
```bash
npm run build

# Expected output:
# ✓ Compiled successfully
# Route (app)                Size     First Load JS
# ┌ ○ /                      ~5 kB      ~100 kB
# ├ ○ /roadmaps              ~8 kB      ~103 kB
# ├ ○ /roadmaps/[trackSlug]  ~7 kB      ~102 kB
# └ λ /api/waitlist          ~0 kB       ~85 kB

# All content pages static (○), API routes dynamic (λ)
```

### API Testing
```bash
# Test waitlist endpoint
curl -X POST http://localhost:3000/api/waitlist \
  -H "Content-Type: application/json" \
  -d '{"courseId":"git-core","email":"test@example.com"}'

# Expected: {"success":true}
# Verify in Supabase dashboard: SELECT * FROM course_waitlist;
```

## Performance Targets (from PRD)

- First page load: < 3s on 3G, < 1s on WiFi
- Build time: < 30s for all pages
- Lighthouse scores: > 90 (performance, accessibility, SEO)
- Bundle size: < 500KB initial JS
- Course data access: 0ms (no database calls)

## Content Updates

To add/modify courses or tracks:

1. Edit `src/data/courses.ts` or `src/data/tracks.ts`
2. Follow existing TypeScript interfaces
3. Increment `sortOrder` for ordering
4. Set `status: 'published' | 'coming_soon'`
5. No database migration needed (static data)
6. Rebuild and deploy: `npm run build`

## Deployment (Vercel)

```bash
# Connect to Vercel
vercel

# Add environment variables in Vercel dashboard:
# - SUPABASE_PROJECT_ID
# - NEXT_PUBLIC_APP_URL

# Auto-deploys on Git push to main branch
git push origin main

# Preview deployments for feature branches
git push origin feature-branch
```

## Troubleshooting

**Issue**: Track cards not displaying
- ✅ Check: Import path correct? (`@/data/tracks`)
- ✅ Check: Data exported correctly in `tracks.ts`?

**Issue**: Waitlist form not submitting
- ✅ Check: Environment variable `SUPABASE_PROJECT_ID` set?
- ✅ Check: Supabase MCP connection authenticated? (run `/mcp` command)
- ✅ Check: RLS policies allow INSERT?

**Issue**: Build fails with module errors
- ✅ Check: All dependencies installed? (`npm install`)
- ✅ Check: TypeScript paths configured in `tsconfig.json`?
- ✅ Check: No circular imports between data files?

**Issue**: Courses not showing in correct order
- ✅ Check: `sortOrder` field set correctly?
- ✅ Check: Using `.sort((a, b) => a.sortOrder - b.sortOrder)`?

## Related Documentation

- PRD: `prd.md` (complete product requirements)
- Next.js App Router: https://nextjs.org/docs/app
- shadcn/ui: https://ui.shadcn.com/docs
- Tailwind CSS: https://tailwindcss.com/docs
- Supabase MCP: Use `/help mcp` in Claude Code
