# 🗄️ Database Setup Guide - Neon PostgreSQL

## Step 1: Create Neon Account & Database

### 1.1 Sign Up for Neon (Free)
1. Go to [https://console.neon.tech](https://console.neon.tech)
2. Click "Sign Up" 
3. Use GitHub, Google, or email to create account
4. Verify your email if needed

### 1.2 Create Your Database Project
1. Click "Create Project" or "New Project"
2. **Project Name**: `movieflix-production`
3. **Database Name**: `movieflix` (default is fine)
4. **Region**: Choose closest to your users
5. Click "Create Project"

### 1.3 Get Your Connection String
1. After project creation, you'll see the connection details
2. Copy the **Connection String** (starts with `postgresql://`)
3. It looks like: `postgresql://username:password@host/database?sslmode=require`

## Step 2: Configure Environment Variables

### 2.1 For Local Development
Create `.env.local` file in your project root:

\`\`\`env
# Database Connection
DATABASE_URL="postgresql://your-username:your-password@your-host/your-database?sslmode=require"
DIRECT_URL="postgresql://your-username:your-password@your-host/your-database?sslmode=require"

# Authentication
NEXTAUTH_SECRET="movieflix-super-secret-key-2024"
NEXTAUTH_URL="http://localhost:3000"

# APIs (Already provided - ready to use)
TMDB_API_KEY="185833d5dc5d28de765f055a94978c78"
YOUTUBE_API_KEY="AIzaSyDSTJFyWN4UIQgzvFk3icW1busWryYaBcQ"
GOOGLE_CLIENT_ID="140679285352-e6a9dgff1t93kdcbja04dg73njs1g19v.apps.googleusercontent.com"
GOOGLE_CLIENT_SECRET="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"
VIMEO_ACCESS_TOKEN=""
RESEND_API_KEY="re_SCt4resq_9FNEo44kqvH92CWs5eegBtvB"
NEXT_PUBLIC_GA_MEASUREMENT_ID="G-C8PZ8V723E"
\`\`\`

### 2.2 For Vercel Deployment
Add these environment variables in Vercel dashboard:
1. Go to your Vercel project
2. Settings → Environment Variables
3. Add each variable from above

## Step 3: Initialize Database

### 3.1 Install Dependencies
\`\`\`bash
npm install
\`\`\`

### 3.2 Generate Prisma Client
\`\`\`bash
npx prisma generate
\`\`\`

### 3.3 Push Database Schema
\`\`\`bash
npx prisma db push
\`\`\`

### 3.4 Seed Database (Optional)
\`\`\`bash
npm run db:seed
\`\`\`

## Step 4: Test Connection

### 4.1 Run the Test Script
\`\`\`bash
npm run dev
\`\`\`

Then visit: `http://localhost:3000/api/health`

### 4.2 Check Database in Prisma Studio
\`\`\`bash
npx prisma studio
\`\`\`

## Troubleshooting

### Common Issues:

**1. Connection Refused**
- Check if your connection string is correct
- Ensure you're using the correct database name
- Verify SSL mode is included: `?sslmode=require`

**2. Authentication Failed**
- Double-check username and password in connection string
- Make sure you copied the full string from Neon

**3. Database Not Found**
- Verify database name in connection string
- Check if project was created successfully in Neon

**4. SSL/TLS Issues**
- Always include `?sslmode=require` in your connection string
- Neon requires SSL connections

### Getting Help:
- Check Neon status: [https://status.neon.tech](https://status.neon.tech)
- Neon docs: [https://neon.tech/docs](https://neon.tech/docs)
- Test connection: Visit `/api/deploy-check` in your app
\`\`\`

Now let me create a database connection test script:
