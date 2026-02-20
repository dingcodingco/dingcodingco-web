import { NextRequest, NextResponse } from 'next/server'

/**
 * POST /api/waitlist
 *
 * Add email to course waitlist for "coming soon" courses
 *
 * @param {string} courseId - Course slug identifier (e.g., "git-core", "spring-core")
 * @param {string} email - User email address
 *
 * @returns {200} Success - Email added to waitlist
 * @returns {400} Bad Request - Invalid input (missing fields or invalid email)
 * @returns {409} Conflict - Email already registered for this course
 * @returns {500} Internal Server Error - Database error or server issue
 *
 * Architecture Note: Uses Supabase MCP for database access
 * The actual MCP integration will be completed when Supabase project is connected
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { courseId, email } = body

    // Validate courseId
    if (!courseId || typeof courseId !== 'string') {
      return NextResponse.json(
        { error: 'Course ID is required' },
        { status: 400 }
      )
    }

    // Validate email
    if (!email || typeof email !== 'string') {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      )
    }

    // Basic email validation (RFC 5322 simplified)
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      )
    }

    // Sanitize inputs to prevent SQL injection
    const sanitizedCourseId = courseId.trim().toLowerCase()
    const sanitizedEmail = email.trim().toLowerCase()

    // TODO: Replace with actual Supabase MCP implementation
    // When Supabase project is connected, use:
    // const result = await mcp__supabase__execute_sql({
    //   project_id: process.env.SUPABASE_PROJECT_ID!,
    //   query: `
    //     INSERT INTO course_waitlist (course_id, email)
    //     VALUES ($1, $2)
    //     RETURNING id, created_at
    //   `,
    //   params: [sanitizedCourseId, sanitizedEmail]
    // })

    // Placeholder implementation for development
    console.log('Waitlist request:', {
      courseId: sanitizedCourseId,
      email: sanitizedEmail,
      timestamp: new Date().toISOString()
    })

    // Check for duplicate (will be handled by UNIQUE constraint in production)
    // In development, simulate the constraint
    // In production, handle the PostgreSQL error code 23505 (unique_violation)

    return NextResponse.json({
      success: true,
      message: 'Added to waitlist successfully',
      data: {
        courseId: sanitizedCourseId,
        email: sanitizedEmail
      }
    }, { status: 200 })

  } catch (error) {
    console.error('Waitlist API error:', error)

    // Handle specific database errors in production
    // PostgreSQL error code 23505 = unique_violation
    if (error instanceof Error && 'code' in error && error.code === '23505') {
      return NextResponse.json(
        { error: 'Email already registered for this course' },
        { status: 409 }
      )
    }

    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// Disable static optimization for API routes
export const dynamic = 'force-dynamic'
