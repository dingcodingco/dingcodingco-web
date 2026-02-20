-- Portfolio-Web Database Schema
-- Phase 7: Supabase MCP Integration
-- Purpose: Email collection and quiz analytics

-- Course waitlist for "coming soon" courses
CREATE TABLE IF NOT EXISTS course_waitlist (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  course_id TEXT NOT NULL,
  email TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  CONSTRAINT course_waitlist_unique UNIQUE(course_id, email)
);

-- Quiz responses for analytics
CREATE TABLE IF NOT EXISTS quiz_responses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  coding_experience TEXT NOT NULL,
  goal TEXT NOT NULL,
  recommended_track_id TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE course_waitlist ENABLE ROW LEVEL SECURITY;
ALTER TABLE quiz_responses ENABLE ROW LEVEL SECURITY;

-- RLS Policies (public INSERT only)
CREATE POLICY "Allow public insert on course_waitlist"
  ON course_waitlist
  FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Allow public insert on quiz_responses"
  ON quiz_responses
  FOR INSERT
  WITH CHECK (true);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_course_waitlist_course_id ON course_waitlist(course_id);
CREATE INDEX IF NOT EXISTS idx_course_waitlist_created_at ON course_waitlist(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_quiz_responses_created_at ON quiz_responses(created_at DESC);

-- Comments for documentation
COMMENT ON TABLE course_waitlist IS 'Email collection for coming soon courses';
COMMENT ON TABLE quiz_responses IS 'User quiz responses for track recommendations';
COMMENT ON COLUMN course_waitlist.course_id IS 'Course slug identifier (e.g., git-core, spring-core)';
COMMENT ON COLUMN course_waitlist.email IS 'User email address for notifications';
COMMENT ON COLUMN quiz_responses.coding_experience IS 'User coding experience level (none, basic, intermediate)';
COMMENT ON COLUMN quiz_responses.goal IS 'User goal (side-project, career-change, upskill)';
COMMENT ON COLUMN quiz_responses.recommended_track_id IS 'Recommended track slug based on quiz results';
