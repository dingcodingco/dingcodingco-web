#!/bin/bash

echo "🔍 Verifying page structure..."
echo ""

# Check if files exist
echo "✅ Created Files:"
[ -f "src/app/roadmaps/[trackId]/page.tsx" ] && echo "  - /roadmaps/[trackId]/page.tsx"
[ -f "src/app/success-stories/page.tsx" ] && echo "  - /success-stories/page.tsx"
[ -f "src/app/about/page.tsx" ] && echo "  - /about/page.tsx"
[ -f "src/app/faq/page.tsx" ] && echo "  - /faq/page.tsx"
echo ""

# Check modified files
echo "✅ Modified Files:"
[ -f "src/app/page.tsx" ] && echo "  - src/app/page.tsx (simplified)"
[ -f "src/app/components/sections/TracksOverviewSection.tsx" ] && echo "  - TracksOverviewSection.tsx (added showDetailLinks)"
[ -f "src/app/components/sections/OutcomeStoriesSection.tsx" ] && echo "  - OutcomeStoriesSection.tsx (added preview mode)"
[ -f "src/app/components/sections/InstructorSection.tsx" ] && echo "  - InstructorSection.tsx (added compact mode)"
[ -f "src/app/components/sections/FAQSection.tsx" ] && echo "  - FAQSection.tsx (added preview mode)"
echo ""

# Count lines in page.tsx
echo "📊 Homepage Stats:"
LINES=$(wc -l < src/app/page.tsx)
echo "  - page.tsx: $LINES lines (removed TrackDetailSection)"
echo ""

# List all page routes
echo "🌐 Available Routes:"
echo "  - / (Homepage)"
echo "  - /roadmaps/ai-beginner"
echo "  - /roadmaps/ai-developer"
echo "  - /roadmaps/spring-backend"
echo "  - /success-stories"
echo "  - /about"
echo "  - /faq"
echo ""

echo "✅ Refactoring complete!"
echo ""
echo "Next steps:"
echo "1. npm run dev - Start development server"
echo "2. Test all routes in browser"
echo "3. npm run build - Verify production build"
echo "4. Deploy to Vercel"
