# 🎬 MovieFlix - Free Movie Streaming Platform

A modern, full-stack movie streaming platform built with Next.js, featuring user authentication, movie discovery, and seamless video playback.

## ✨ Features

- 🎥 **Movie Discovery**: Browse trending, popular, and top-rated movies
- 🔍 **Advanced Search**: Find movies by title, genre, or year
- 👤 **User Authentication**: Secure login with Google OAuth and email/password
- 📱 **Responsive Design**: Works perfectly on desktop, tablet, and mobile
- 🎬 **Video Player**: Custom video player with progress tracking
- ❤️ **Watchlist**: Save movies to watch later
- 📊 **Viewing History**: Track your watching progress
- 📧 **Email Integration**: Welcome emails and notifications
- 📈 **Analytics**: Google Analytics integration
- 🎨 **Modern UI**: Beautiful, Netflix-inspired interface

## 🚀 Live Demo

**Demo Site**: [https://movieflix-demo.vercel.app](https://movieflix-demo.vercel.app)

**Demo Credentials**:
- Email: demo@movieflix.com
- Password: demo123

## 🛠️ Tech Stack

- **Frontend**: Next.js 14, React, TypeScript, Tailwind CSS
- **Backend**: Next.js API Routes, Prisma ORM
- **Database**: PostgreSQL (Neon)
- **Authentication**: NextAuth.js with Google OAuth
- **APIs**: TMDB (movies), YouTube (trailers), Resend (email)
- **Deployment**: Vercel
- **Analytics**: Google Analytics

## 📦 Quick Deploy

### Deploy to Vercel (1-Click)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/yourusername/movieflix)

### Manual Deployment

1. **Clone the repository**
   \`\`\`bash
   git clone https://github.com/yourusername/movieflix.git
   cd movieflix
   \`\`\`

2. **Install dependencies**
   \`\`\`bash
   npm install
   \`\`\`

3. **Set up database** (Neon PostgreSQL)
   - Create account at [neon.tech](https://neon.tech)
   - Create new project
   - Copy connection string

4. **Configure environment variables**
   \`\`\`bash
   cp .env.example .env.local
   # Edit .env.local with your database URL
   \`\`\`

5. **Initialize database**
   \`\`\`bash
   npx prisma generate
   npx prisma db push
   npm run db:seed
   \`\`\`

6. **Start development server**
   \`\`\`bash
   npm run dev
   \`\`\`

## 🔧 Environment Variables

\`\`\`env
# Database (Required)
DATABASE_URL="postgresql://..."
DIRECT_URL="postgresql://..."

# Authentication (Required)
NEXTAUTH_SECRET="your-secret-key"
NEXTAUTH_URL="http://localhost:3000"

# APIs (Pre-configured)
TMDB_API_KEY="185833d5dc5d28de765f055a94978c78"
YOUTUBE_API_KEY="AIzaSyDSTJFyWN4UIQgzvFk3icW1busWryYaBcQ"
GOOGLE_CLIENT_ID="140679285352-e6a9dgff1t93kdcbja04dg73njs1g19v.apps.googleusercontent.com"
GOOGLE_CLIENT_SECRET="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"
RESEND_API_KEY="re_SCt4resq_9FNEo44kqvH92CWs5eegBtvB"
NEXT_PUBLIC_GA_MEASUREMENT_ID="G-C8PZ8V723E"
\`\`\`

## 📱 Screenshots

### Homepage
![Homepage](https://via.placeholder.com/800x400/000000/FFFFFF?text=MovieFlix+Homepage)

### Movie Details
![Movie Details](https://via.placeholder.com/800x400/000000/FFFFFF?text=Movie+Details+Page)

### Dashboard
![Dashboard](https://via.placeholder.com/800x400/000000/FFFFFF?text=User+Dashboard)

## 🎯 Project Structure

\`\`\`
movieflix/
├── app/                    # Next.js app directory
│   ├── (dashboard)/       # Protected dashboard routes
│   ├── api/              # API routes
│   └── auth/             # Authentication pages
├── components/           # Reusable components
├── lib/                 # Utility libraries
├── prisma/              # Database schema
└── scripts/             # Database scripts
\`\`\`

## 🔐 Security Features

- ✅ Secure authentication with NextAuth.js
- ✅ Password hashing with bcrypt
- ✅ CSRF protection
- ✅ SQL injection prevention with Prisma
- ✅ XSS protection with React
- ✅ Security headers configured

## 📊 Performance

- ✅ Server-side rendering (SSR)
- ✅ Image optimization
- ✅ Code splitting
- ✅ Lazy loading
- ✅ CDN delivery via Vercel

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (\`git checkout -b feature/amazing-feature\`)
3. Commit your changes (\`git commit -m 'Add amazing feature'\`)
4. Push to the branch (\`git push origin feature/amazing-feature\`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [TMDB](https://www.themoviedb.org/) for movie data
- [Vercel](https://vercel.com/) for hosting
- [Neon](https://neon.tech/) for database
- [shadcn/ui](https://ui.shadcn.com/) for UI components

## 📞 Support

- 📧 Email: support@movieflix.com
- 🐛 Issues: [GitHub Issues](https://github.com/yourusername/movieflix/issues)
- 💬 Discussions: [GitHub Discussions](https://github.com/yourusername/movieflix/discussions)

---

Made with ❤️ by [Your Name](https://github.com/yourusername)
\`\`\`

Now let's create a final production checklist:
