import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

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

    // Sanitize inputs
    const sanitizedCourseId = courseId.trim().toLowerCase()
    const sanitizedEmail = email.trim().toLowerCase()

    // Insert into Supabase
    const { data, error } = await supabase
      .from('course_waitlist')
      .insert({
        course_id: sanitizedCourseId,
        email: sanitizedEmail
      })
      .select()

    // Handle database errors
    if (error) {
      // Check for unique constraint violation (duplicate email)
      if (error.code === '23505') {
        return NextResponse.json(
          { error: 'Email already registered for this course' },
          { status: 409 }
        )
      }

      console.error('Supabase error:', error)
      return NextResponse.json(
        { error: 'Failed to add to waitlist' },
        { status: 500 }
      )
    }

    console.log('Waitlist entry created:', data)

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
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// Disable static optimization for API routes
export const dynamic = 'force-dynamic'
