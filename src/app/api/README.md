# Portfolio-Web API Routes

This document describes the API routes used for user-generated data collection.

## Architecture

- **Database**: Supabase (PostgreSQL)
- **Integration**: Supabase MCP via Claude Code
- **Static Data**: Courses and tracks are served from static files (not API)
- **User Data**: Waitlist and quiz responses are stored in Supabase

## API Endpoints

### POST /api/waitlist

Add email to course waitlist for "coming soon" courses.

**Request Body**:
```json
{
  "courseId": "git-core",
  "email": "user@example.com"
}
```

**Parameters**:
- `courseId` (string, required): Course slug identifier (e.g., "git-core", "spring-core")
- `email` (string, required): Valid email address

**Response Codes**:
- `200`: Success - Email added to waitlist
- `400`: Bad Request - Invalid input (missing fields or invalid email format)
- `409`: Conflict - Email already registered for this course (duplicate)
- `500`: Internal Server Error - Database error or server issue

**Success Response (200)**:
```json
{
  "success": true,
  "message": "Added to waitlist successfully",
  "data": {
    "courseId": "git-core",
    "email": "user@example.com"
  }
}
```

**Error Response (400)**:
```json
{
  "error": "Invalid email format"
}
```

**Error Response (409)**:
```json
{
  "error": "Email already registered for this course"
}
```

**Example Usage**:
```typescript
const response = await fetch('/api/waitlist', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    courseId: 'git-core',
    email: 'user@example.com'
  })
})

if (response.ok) {
  const data = await response.json()
  console.log(data.message) // "Added to waitlist successfully"
}
```

---

### POST /api/quiz

Save quiz response for analytics and track recommendations.

**Request Body**:
```json
{
  "codingExperience": "none",
  "goal": "side-project",
  "recommendedTrackId": "ai-beginner"
}
```

**Parameters**:
- `codingExperience` (string, required): User coding experience level
  - Valid values: `"none"`, `"basic"`, `"intermediate"`, `"advanced"`
- `goal` (string, required): User goal
  - Valid values: `"side-project"`, `"career-change"`, `"upskill"`, `"hobby"`, `"freelance"`
- `recommendedTrackId` (string, required): Recommended track slug
  - Valid values: `"ai-beginner"`, `"ai-developer"`, `"spring-backend"`

**Response Codes**:
- `200`: Success - Quiz response saved
- `400`: Bad Request - Invalid input (missing fields or invalid enum values)
- `500`: Internal Server Error - Database error or server issue

**Success Response (200)**:
```json
{
  "success": true,
  "message": "Quiz response saved successfully",
  "data": {
    "codingExperience": "none",
    "goal": "side-project",
    "recommendedTrackId": "ai-beginner"
  }
}
```

**Error Response (400)**:
```json
{
  "error": "Invalid coding experience value"
}
```

**Example Usage**:
```typescript
const response = await fetch('/api/quiz', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    codingExperience: 'none',
    goal: 'side-project',
    recommendedTrackId: 'ai-beginner'
  })
})

if (response.ok) {
  const data = await response.json()
  console.log(data.message) // "Quiz response saved successfully"
}
```

---

## Supabase MCP Integration

These API routes use **Supabase MCP** (Model Context Protocol) for database access instead of the direct Supabase JavaScript client.

### Why MCP?

- **Better Claude Code Integration**: Native support in Claude Code
- **No API Keys in Code**: Authentication managed by Claude Code
- **Simplified Setup**: No need for environment variable management
- **Type Safety**: Automatic type inference from database schema

### Setup Requirements

To connect Supabase MCP in Claude Code:

1. **Create Supabase Project** (if not exists):
   ```bash
   # Using Supabase CLI
   supabase projects create portfolio-web --region us-west-1
   ```

2. **Run Migration**:
   ```bash
   # Apply database schema
   supabase db push supabase/migrations/001_waitlist_schema.sql
   ```

3. **Get Project ID**:
   ```bash
   supabase projects list
   # Copy the project_id (UUID format)
   ```

4. **Configure Environment Variables**:
   ```bash
   # Add to .env.local
   SUPABASE_PROJECT_ID=your-project-id-here
   NEXT_PUBLIC_APP_URL=http://localhost:3000
   ```

5. **Authenticate MCP in Claude Code**:
   - Claude Code will prompt for Supabase authentication
   - Follow the OAuth flow to grant access
   - MCP tools will become available after authentication

### MCP Tools Used

- `mcp__supabase__execute_sql`: Execute raw SQL queries
  - Used for INSERT operations with parameterized queries
  - Automatic SQL injection protection
  - Returns PostgreSQL error codes for constraint violations

### Implementation Notes

**Current Status**: Placeholder implementation
- Routes are functional but use console.log instead of database
- Validation logic is complete and production-ready
- MCP integration requires Supabase project connection

**Production Implementation**:
```typescript
// Replace TODO section in route.ts files with:
const result = await mcp__supabase__execute_sql({
  project_id: process.env.SUPABASE_PROJECT_ID!,
  query: `
    INSERT INTO course_waitlist (course_id, email)
    VALUES ($1, $2)
    RETURNING id, created_at
  `,
  params: [courseId, email]
})
```

---

## Database Schema

See `supabase/migrations/001_waitlist_schema.sql` for the complete schema.

**Tables**:

1. **course_waitlist**
   - `id` (UUID): Primary key
   - `course_id` (TEXT): Course slug identifier
   - `email` (TEXT): User email address
   - `created_at` (TIMESTAMPTZ): Timestamp of signup
   - **Constraint**: UNIQUE(course_id, email) - Prevents duplicates

2. **quiz_responses**
   - `id` (UUID): Primary key
   - `coding_experience` (TEXT): User coding level
   - `goal` (TEXT): User goal
   - `recommended_track_id` (TEXT): Recommended track
   - `created_at` (TIMESTAMPTZ): Timestamp of response

**Security**:
- Row Level Security (RLS) enabled on both tables
- Public INSERT only (no SELECT, UPDATE, DELETE from client)
- Email validation enforced in API layer
- Duplicate prevention via UNIQUE constraint

**Performance**:
- Indexes on `course_id` and `created_at` for fast queries
- UUID v4 for primary keys (better distribution)

---

## Testing

### Local Testing (Development)

Without Supabase connection:
```bash
curl -X POST http://localhost:3000/api/waitlist \
  -H "Content-Type: application/json" \
  -d '{"courseId":"git-core","email":"test@example.com"}'
```

Expected: Success response with console.log output

### Production Testing

With Supabase MCP connected:
```bash
curl -X POST https://your-domain.com/api/waitlist \
  -H "Content-Type: application/json" \
  -d '{"courseId":"git-core","email":"test@example.com"}'
```

Expected: Data inserted into Supabase and success response

### Error Testing

Test validation:
```bash
# Missing email
curl -X POST http://localhost:3000/api/waitlist \
  -H "Content-Type: application/json" \
  -d '{"courseId":"git-core"}'

# Invalid email format
curl -X POST http://localhost:3000/api/waitlist \
  -H "Content-Type: application/json" \
  -d '{"courseId":"git-core","email":"invalid-email"}'

# Duplicate email (run twice)
curl -X POST http://localhost:3000/api/waitlist \
  -H "Content-Type: application/json" \
  -d '{"courseId":"git-core","email":"duplicate@example.com"}'
```

---

## Security Considerations

1. **Email Validation**: Regex-based validation before database insertion
2. **SQL Injection Protection**: Parameterized queries with MCP
3. **Rate Limiting**: Consider adding rate limiting for production
4. **CORS**: Configure CORS headers if API is called from external domains
5. **Input Sanitization**: All inputs are trimmed and lowercased
6. **Error Handling**: Generic error messages to prevent information disclosure

---

## Future Enhancements

- [ ] Add rate limiting (e.g., 10 requests per minute per IP)
- [ ] Add email verification flow for waitlist
- [ ] Add unsubscribe functionality
- [ ] Add admin API for viewing waitlist data
- [ ] Add analytics dashboard for quiz responses
- [ ] Add webhook notifications for new signups
- [ ] Add CAPTCHA for spam prevention

---

## References

- [Next.js Route Handlers](https://nextjs.org/docs/app/building-your-application/routing/route-handlers)
- [Supabase MCP Documentation](https://supabase.com/docs/guides/mcp)
- [PostgreSQL Error Codes](https://www.postgresql.org/docs/current/errcodes-appendix.html)
