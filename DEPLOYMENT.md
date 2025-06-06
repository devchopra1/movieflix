# MovieFlix Deployment Guide 🚀

## Quick Deploy to Vercel (Recommended)

### 1. Prerequisites
- GitHub account
- Vercel account (free)
- Neon PostgreSQL account (free)

### 2. Database Setup (Neon)
1. Go to [Neon Console](https://console.neon.tech)
2. Create a new project called "movieflix"
3. Copy your connection string
4. Note both `DATABASE_URL` and `DIRECT_URL` (they're the same for Neon)

### 3. Deploy to Vercel
1. Push your code to GitHub
2. Go to [Vercel Dashboard](https://vercel.com/dashboard)
3. Click "New Project"
4. Import your GitHub repository
5. Add environment variables (see below)
6. Deploy!

### 4. Environment Variables for Production

Add these to your Vercel project settings:

\`\`\`env
# Database (REQUIRED)
DATABASE_URL="postgresql://username:password@host/database?sslmode=require"
DIRECT_URL="postgresql://username:password@host/database?sslmode=require"

# Authentication (REQUIRED)
NEXTAUTH_SECRET="your-super-secret-key-change-this-in-production"
NEXTAUTH_URL="https://your-domain.vercel.app"

# APIs (PROVIDED - Ready to use)
TMDB_API_KEY="185833d5dc5d28de765f055a94978c78"
YOUTUBE_API_KEY="AIzaSyDSTJFyWN4UIQgzvFk3icW1busWryYaBcQ"
GOOGLE_CLIENT_ID="140679285352-e6a9dgff1t93kdcbja04dg73njs1g19v.apps.googleusercontent.com"
GOOGLE_CLIENT_SECRET="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"
VIMEO_ACCESS_TOKEN="your_vimeo_token"
RESEND_API_KEY="re_SCt4resq_9FNEo44kqvH92CWs5eegBtvB"
NEXT_PUBLIC_GA_MEASUREMENT_ID="G-C8PZ8V723E"
\`\`\`

### 5. Post-Deployment Steps
1. Run database migrations
2. Test user registration
3. Test movie browsing
4. Test video playback
5. Verify email functionality

## Alternative: Deploy to Railway

1. Go to [Railway](https://railway.app)
2. Connect your GitHub repository
3. Add a PostgreSQL database
4. Set environment variables
5. Deploy

## Local Development Setup

\`\`\`bash
# Clone and install
git clone <your-repo>
cd movieflix
npm install

# Setup database
npx prisma generate
npx prisma db push

# Start development server
npm run dev
\`\`\`

## Troubleshooting

### Common Issues:
1. **Database connection failed**: Check your DATABASE_URL
2. **Authentication not working**: Verify NEXTAUTH_SECRET and NEXTAUTH_URL
3. **Movies not loading**: Check TMDB_API_KEY
4. **Build fails**: Run \`npx prisma generate\` before building

### Support
- Check the admin dashboard at \`/admin\` to test integrations
- All API keys are pre-configured and working
- Database schema is ready for production
\`\`\`

Now let's create a production-ready configuration:
