# Deployment Guide

Complete deployment guide for portfolio-web learning platform on Vercel.

## Overview

**Architecture**: Static-first Next.js 15 application with minimal Supabase usage
**Platform**: Vercel (recommended)
**Build Time**: ~1-2 minutes
**Deployment Strategy**: Git-based continuous deployment

---

## Prerequisites

- [x] Node.js 18+ installed
- [x] npm or yarn package manager
- [x] Git repository initialized (done)
- [ ] GitHub/GitLab/Bitbucket account (for automatic deployments)
- [ ] Vercel account (free tier works)
- [ ] Supabase project (optional, for waitlist/quiz features)

---

## Deployment Options

### Option 1: Vercel Dashboard (Recommended for First Deployment)

**Pros**: Simple, visual interface, automatic configuration
**Cons**: Requires GitHub/GitLab connection

#### Steps:

1. **Push to GitHub**
   ```bash
   # Create a new repository on GitHub
   # Then push your code:
   git remote add origin https://github.com/YOUR_USERNAME/portfolio-web.git
   git branch -M main
   git push -u origin main
   ```

2. **Import to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your GitHub repository
   - Vercel will auto-detect Next.js configuration

3. **Configure Environment Variables**
   - Click "Environment Variables" section
   - Add the following:
     ```
     SUPABASE_PROJECT_ID=your_actual_project_id
     ```
   - Leave blank initially if Supabase is not set up yet
   - API routes will work in read-only mode without errors

4. **Deploy**
   - Click "Deploy"
   - Wait 1-2 minutes for build completion
   - Your site will be live at `https://your-project.vercel.app`

---

### Option 2: Vercel CLI (For Advanced Users)

**Pros**: Command-line control, faster iterations
**Cons**: Requires CLI setup

#### Steps:

1. **Install Vercel CLI**
   ```bash
   npm i -g vercel
   ```

2. **Login to Vercel**
   ```bash
   vercel login
   ```

3. **Link Project**
   ```bash
   vercel link
   ```
   - Select your team (or personal account)
   - Create new project or link existing

4. **Add Environment Variables**
   ```bash
   vercel env add SUPABASE_PROJECT_ID
   ```
   - Enter your Supabase project ID when prompted
   - Select "Production" environment

5. **Deploy to Production**
   ```bash
   vercel --prod
   ```
   - Wait for build completion
   - Your site will be live at the provided URL

---

## Environment Variables

### Required Variables

| Variable | Description | Required | Default |
|----------|-------------|----------|---------|
| `SUPABASE_PROJECT_ID` | Supabase project identifier | No* | - |

*Note: APIs will return placeholder responses without Supabase. Core site functionality (tracks, courses, quiz logic) works without any environment variables.

### How to Get Supabase Project ID

1. Go to [supabase.com/dashboard](https://supabase.com/dashboard)
2. Select your project
3. Go to Settings → General
4. Copy "Reference ID" (format: `abcdefghijklmnop`)

### Adding Environment Variables in Vercel

**Via Dashboard**:
1. Go to your project settings
2. Click "Environment Variables" tab
3. Add variable name and value
4. Select environments (Production, Preview, Development)
5. Click "Save"

**Via CLI**:
```bash
vercel env add SUPABASE_PROJECT_ID production
```

---

## Build Configuration

### Automatic Configuration (Vercel Auto-Detects)

```json
{
  "buildCommand": "npm run build",
  "outputDirectory": ".next",
  "installCommand": "npm install",
  "framework": "nextjs"
}
```

### Custom Build Settings (Optional)

If you need to customize build settings in Vercel dashboard:

- **Build Command**: `npm run build`
- **Output Directory**: `.next`
- **Install Command**: `npm install`
- **Node Version**: 18.x or higher (auto-detected from package.json)

---

## Deployment Verification

### Immediate Checks (After Deployment)

1. **Homepage loads correctly**
   - Visit `https://your-domain.vercel.app`
   - Hero section displays
   - Navigation works

2. **Static pages render**
   - `/roadmaps` shows 3 track cards
   - `/roadmaps/ai-beginner` displays course list
   - `/roadmaps/quiz` renders quiz UI

3. **Dynamic routes work**
   - `/courses/python-core` loads course details
   - All 11 course pages accessible
   - No 404 errors

4. **API endpoints respond**
   - POST to `/api/waitlist` returns 200 or appropriate error
   - POST to `/api/quiz` returns 200 or appropriate error
   - Even without Supabase, endpoints should not crash

### Performance Checks

Run Lighthouse audit on production URL:
```bash
npx lighthouse https://your-domain.vercel.app --view
```

**Target Scores**:
- Performance: > 90
- Accessibility: > 90
- Best Practices: > 90
- SEO: > 90

### Console Error Check

1. Open browser DevTools (F12)
2. Navigate to Console tab
3. Browse all pages
4. Should see 0 errors (warnings are OK)

---

## Continuous Deployment (CI/CD)

### Automatic Deployments

Once connected to GitHub, Vercel automatically:

1. **Production Deployments**
   - Triggered by pushes to `main` branch
   - Live URL: `https://your-domain.vercel.app`

2. **Preview Deployments**
   - Triggered by pushes to any other branch
   - Unique URL for each branch: `https://your-branch.vercel.app`

3. **Pull Request Previews**
   - Triggered by opening a PR
   - Comment with preview URL added to PR automatically

### Manual Deployments

Force a redeployment without code changes:
```bash
vercel --prod --force
```

---

## Rollback Procedures

### Via Vercel Dashboard

1. Go to your project
2. Click "Deployments" tab
3. Find the last working deployment
4. Click three dots (⋯) → "Promote to Production"
5. Deployment rolls back immediately

### Via Vercel CLI

```bash
# List recent deployments
vercel ls

# Rollback to specific deployment
vercel promote <deployment-url>
```

### Emergency Rollback (< 30 seconds)

1. Go to Vercel dashboard
2. Click "Promote to Production" on previous deployment
3. Instant rollback, no rebuild required

---

## Troubleshooting

### Build Failures

**Issue**: "npm ERR! missing script: build"
- **Solution**: Verify `package.json` has `"build": "next build"` script

**Issue**: TypeScript errors during build
- **Solution**: Run `npm run build` locally first to catch errors

**Issue**: Out of memory during build
- **Solution**: Add `NODE_OPTIONS=--max-old-space-size=4096` to build command

### Environment Variable Issues

**Issue**: API routes return 500 errors
- **Solution**: Check `SUPABASE_PROJECT_ID` is set correctly
- **Alternative**: Remove Supabase calls temporarily (APIs have fallback responses)

**Issue**: Environment variables not updating
- **Solution**: Redeploy after changing env vars (changes require rebuild)

### Runtime Errors

**Issue**: Pages load but show 404 for some routes
- **Solution**: Check `generateStaticParams` in dynamic routes
- **Solution**: Verify data files (`tracks.ts`, `courses.ts`) are committed

**Issue**: Supabase connection errors
- **Solution**: Verify Supabase project is active (not paused)
- **Solution**: Check RLS policies allow public INSERT (waitlist/quiz tables)

### Performance Issues

**Issue**: Slow page loads
- **Solution**: Check bundle size with `npm run build`
- **Solution**: Verify no large dependencies added
- **Solution**: Use `next/image` for images

**Issue**: High Time to First Byte (TTFB)
- **Solution**: Check API routes for slow queries
- **Solution**: Verify static generation working (check build output)

---

## Post-Deployment Setup

### Custom Domain (Optional)

1. Go to Vercel project settings
2. Click "Domains" tab
3. Add your custom domain
4. Follow DNS configuration instructions
5. SSL certificate provisioned automatically

### Supabase Setup (If Not Done)

1. **Create Supabase project**
   - Go to [supabase.com](https://supabase.com)
   - Create new project
   - Copy project ID

2. **Run migrations**
   - See `supabase/migrations/001_waitlist_schema.sql`
   - Run via Supabase dashboard SQL editor
   - Or use Supabase CLI: `supabase db push`

3. **Update environment variables**
   - Add `SUPABASE_PROJECT_ID` to Vercel
   - Redeploy: `vercel --prod`

4. **Test APIs**
   ```bash
   # Test waitlist
   curl -X POST https://your-domain.vercel.app/api/waitlist \
     -H "Content-Type: application/json" \
     -d '{"courseId":"python-core","email":"test@example.com"}'

   # Test quiz
   curl -X POST https://your-domain.vercel.app/api/quiz \
     -H "Content-Type: application/json" \
     -d '{"responses":[{"question":"Q1","answer":"A"}],"recommendedTrack":"ai-beginner"}'
   ```

### Analytics Setup (Optional)

Vercel provides built-in analytics:
1. Go to project settings
2. Enable "Web Analytics"
3. View traffic data in Analytics tab

---

## Monitoring & Alerts

### Vercel Monitoring

**Built-in Features**:
- Deployment status notifications (email/Slack)
- Error tracking and logging
- Performance metrics dashboard

**Setup Notifications**:
1. Go to project settings
2. Click "Notifications" tab
3. Enable deployment success/failure emails
4. Add Slack/Discord webhook (optional)

### Health Checks

Create a simple health check endpoint:
```typescript
// src/app/api/health/route.ts
export async function GET() {
  return Response.json({
    status: 'ok',
    timestamp: new Date().toISOString()
  });
}
```

Monitor with:
```bash
curl https://your-domain.vercel.app/api/health
```

---

## Cost Estimation

### Vercel Pricing (Free Tier)

**Included**:
- Unlimited deployments
- 100 GB bandwidth/month
- Serverless function executions: 100 hours/month
- Automatic SSL certificates
- Preview deployments

**Limitations**:
- 1 commercial project (use Hobby for personal)
- Max 10 MB serverless function size

**Pro Tier** ($20/month):
- 1 TB bandwidth
- 1000 hours serverless functions
- Advanced analytics
- Password protection

### Supabase Pricing (Free Tier)

**Included**:
- 500 MB database
- 1 GB file storage
- 50 MB bandwidth/day
- 2 million row reads/month

**Sufficient for**:
- ~10,000 waitlist entries
- ~5,000 quiz responses
- Excellent for MVP and small-scale launch

---

## Checklist

Use this checklist for each deployment:

### Pre-Deployment
- [ ] Run `npm run build` locally (0 errors)
- [ ] Run `npm run lint` (0 errors)
- [ ] Test all routes locally (`npm run dev`)
- [ ] Verify .env.local is NOT committed
- [ ] Review `git diff` before commit

### Deployment
- [ ] Push to main branch (or deploy via CLI)
- [ ] Monitor build logs for errors
- [ ] Build completes successfully (~1-2 min)
- [ ] Deployment URL provided

### Post-Deployment
- [ ] Visit production URL
- [ ] Check homepage loads
- [ ] Navigate to /roadmaps
- [ ] Test dynamic routes (/courses/python-core)
- [ ] Test quiz flow
- [ ] Submit waitlist form (if Supabase configured)
- [ ] Check browser console (0 errors)
- [ ] Run Lighthouse audit (>90 scores)

---

## Support Resources

- **Vercel Documentation**: [vercel.com/docs](https://vercel.com/docs)
- **Next.js Deployment**: [nextjs.org/docs/deployment](https://nextjs.org/docs/deployment)
- **Vercel CLI Reference**: [vercel.com/docs/cli](https://vercel.com/docs/cli)
- **Supabase Docs**: [supabase.com/docs](https://supabase.com/docs)

---

## Contact & Emergency

For critical deployment issues:
1. Check Vercel status page: [vercel-status.com](https://www.vercel-status.com)
2. Review deployment logs in Vercel dashboard
3. Rollback to last working deployment
4. Consult Vercel support (Pro tier) or community Discord

---

*Last Updated: 2026-02-10*
*Version: 1.0.0*
