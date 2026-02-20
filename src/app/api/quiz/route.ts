import { NextRequest, NextResponse } from 'next/server'

/**
 * POST /api/quiz
 *
 * Save quiz response for analytics
 *
 * @param {string} codingExperience - User coding experience level (none, basic, intermediate)
 * @param {string} goal - User goal (side-project, career-change, upskill)
 * @param {string} recommendedTrackId - Recommended track slug based on quiz results
 *
 * @returns {200} Success - Quiz response saved
 * @returns {400} Bad Request - Invalid input (missing fields or invalid values)
 * @returns {500} Internal Server Error - Database error or server issue
 *
 * Architecture Note: Uses Supabase MCP for database access
 * The actual MCP integration will be completed when Supabase project is connected
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { codingExperience, goal, recommendedTrackId } = body

    // Validate required fields
    if (!codingExperience || typeof codingExperience !== 'string') {
      return NextResponse.json(
        { error: 'Coding experience is required' },
        { status: 400 }
      )
    }

    if (!goal || typeof goal !== 'string') {
      return NextResponse.json(
        { error: 'Goal is required' },
        { status: 400 }
      )
    }

    if (!recommendedTrackId || typeof recommendedTrackId !== 'string') {
      return NextResponse.json(
        { error: 'Recommended track ID is required' },
        { status: 400 }
      )
    }

    // Validate enum values
    const validCodingExperience = ['none', 'basic', 'intermediate', 'advanced']
    if (!validCodingExperience.includes(codingExperience)) {
      return NextResponse.json(
        { error: 'Invalid coding experience value' },
        { status: 400 }
      )
    }

    const validGoals = ['side-project', 'career-change', 'upskill', 'hobby', 'freelance']
    if (!validGoals.includes(goal)) {
      return NextResponse.json(
        { error: 'Invalid goal value' },
        { status: 400 }
      )
    }

    // Validate track ID exists
    const validTrackIds = ['ai-beginner', 'ai-developer', 'spring-backend']
    if (!validTrackIds.includes(recommendedTrackId)) {
      return NextResponse.json(
        { error: 'Invalid track ID' },
        { status: 400 }
      )
    }

    // Sanitize inputs
    const sanitizedData = {
      codingExperience: codingExperience.trim().toLowerCase(),
      goal: goal.trim().toLowerCase(),
      recommendedTrackId: recommendedTrackId.trim().toLowerCase()
    }

    // TODO: Replace with actual Supabase MCP implementation
    // When Supabase project is connected, use:
    // const result = await mcp__supabase__execute_sql({
    //   project_id: process.env.SUPABASE_PROJECT_ID!,
    //   query: `
    //     INSERT INTO quiz_responses (coding_experience, goal, recommended_track_id)
    //     VALUES ($1, $2, $3)
    //     RETURNING id, created_at
    //   `,
    //   params: [
    //     sanitizedData.codingExperience,
    //     sanitizedData.goal,
    //     sanitizedData.recommendedTrackId
    //   ]
    // })

    // Placeholder implementation for development
    console.log('Quiz response saved:', {
      ...sanitizedData,
      timestamp: new Date().toISOString()
    })

    return NextResponse.json({
      success: true,
      message: 'Quiz response saved successfully',
      data: sanitizedData
    }, { status: 200 })

  } catch (error) {
    console.error('Quiz API error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// Disable static optimization for API routes
export const dynamic = 'force-dynamic'
