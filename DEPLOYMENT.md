# Deployment Guide - PromptVerse

This guide will help you deploy the PromptVerse AI video prompts collection website to Vercel with PostgreSQL database and automated prompt collection.

## 🚀 Quick Start

### 1. Clone and Install

```bash
git clone <your-repository-url>
cd prompt-verse
npm install
```

### 2. Environment Setup

Copy the environment template:

```bash
cp .env.example .env.local
```

Update `.env.local` with your values:

```env
# Database URL (provided)
DATABASE_URL="postgresql://neondb_owner:npg_iSKs3vCN0bBw@ep-still-boat-a1kh6owg-pooler.ap-southeast-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require"

# Next.js Configuration
NEXTAUTH_URL="https://your-domain.vercel.app"
NEXTAUTH_SECRET="your-secret-key-here" # Generate with: openssl rand -base64 32

# Cron Job Secret (for security)
CRON_SECRET="your-cron-secret-key-here" # Generate with: openssl rand -base64 32

# Optional: GitHub API for collecting prompts
GITHUB_TOKEN="your-github-token-here"

# Optional: External APIs
OPENAI_API_KEY="your-openai-key-here"
TAVILY_API_KEY="your-tavily-key-here"
```

### 3. Database Setup

Run the database setup script:

```bash
chmod +x scripts/setup-database.js
npm run setup:db
```

Or manually:

```bash
npx prisma generate
npx prisma db push
npm run db:seed
```

### 4. Test Locally

```bash
npm run dev
```

Visit `http://localhost:3000` to verify everything works.

## 🌐 Vercel Deployment

### 1. Connect to Vercel

```bash
npx vercel
```

Follow the prompts to connect your repository.

### 2. Environment Variables on Vercel

Add your environment variables in Vercel Dashboard:

1. Go to your Vercel project dashboard
2. Navigate to **Settings** → **Environment Variables**
3. Add all variables from your `.env.local`

### 3. Deploy Configuration

The `vercel.json` file is already configured with:

- Build command and output directory
- Cron job for prompt collection (every 4 hours)
- Function timeouts for long-running operations
- Environment variables for build time

### 4. Deploy

```bash
vercel --prod
```

## 📊 Database Schema

The application uses PostgreSQL with the following main tables (all prefixed with `pt_`):

- **pt_platforms** - AI video platforms (Runway, Pika Labs, Sora, etc.)
- **pt_categories** - Prompt categories (Cinematic, Nature, Technology, etc.)
- **pt_tags** - Prompt tags for organization
- **pt_prompts** - Main prompts table with 15,100+ seeded prompts
- **pt_collections** - User-created prompt collections
- **pt_usage_analytics** - Usage tracking and analytics

## ⏰ Cron Jobs

### Automated Prompt Collection

The application automatically collects new prompts every 4 hours:

- **Endpoint**: `/api/cron/collect-prompts`
- **Schedule**: `0 */4 * * *` (every 4 hours)
- **Function**: Generates 10-50 new prompts based on trending patterns
- **Security**: Protected by `CRON_SECRET` environment variable

### Additional Cron Jobs

- **Trending Updates**: Every 6 hours - Update trending prompts and analytics
- **Analytics Cleanup**: Daily - Clean old analytics data
- **Data Validation**: Weekly - Validate data integrity

## 🔧 Configuration Files

### `vercel.json`

```json
{
  "buildCommand": "npm run build",
  "outputDirectory": ".next",
  "installCommand": "npm install",
  "framework": "nextjs",
  "regions": ["sin1"],
  "functions": {
    "api/cron/collect-prompts/route.ts": {
      "maxDuration": 300
    }
  },
  "crons": [
    {
      "path": "api/cron/collect-prompts",
      "schedule": "0 */4 * * *"
    }
  ]
}
```

### `next.config.js`

- Optimized for image handling
- CORS headers for API routes
- Environment variable configuration

### `tailwind.config.js`

- Custom color palette with primary/secondary/accent colors
- Animation keyframes
- Responsive breakpoints

## 📈 Performance Optimization

### Database Indexes

The database includes optimized indexes for:

- Full-text search on prompt titles and content
- Category and platform filtering
- Tag-based queries
- Rating and usage count sorting

### API Caching

- Next.js built-in caching for API routes
- Database query optimization
- Response compression

### Frontend Optimization

- Lazy loading with Suspense boundaries
- Image optimization with Next.js Image component
- Component code splitting
- Framer Motion for smooth animations

## 🔒 Security Features

### Authentication

- NextAuth.js for user authentication (ready to implement)
- JWT token handling
- Session management

### API Security

- CORS configuration
- Rate limiting (ready to implement)
- Input validation with Zod schemas
- SQL injection prevention with Prisma ORM

### Cron Job Security

- Bearer token authentication
- Request origin validation
- Error handling and logging

## 🐛 Troubleshooting

### Common Issues

1. **Database Connection**
   ```
   Error: P1001: Can't reach database server
   ```
   - Check DATABASE_URL format
   - Verify Neon database is active
   - Ensure SSL mode is enabled

2. **Build Errors**
   ```
   Error: Module not found: Can't resolve 'prisma'
   ```
   - Run `npx prisma generate`
   - Check `@prisma/client` dependency

3. **Cron Job Failures**
   ```
   Error: 401 Unauthorized
   ```
   - Verify CRON_SECRET environment variable
   - Check Vercel cron configuration

### Debug Mode

Enable debug logging:

```bash
DEBUG=* npm run dev
```

### Database Studio

View and edit database:

```bash
npx prisma studio
```

## 📊 Monitoring

### Vercel Analytics

- Automatic performance monitoring
- Web vitals tracking
- Error logging

### Database Monitoring

- Neon dashboard for database performance
- Query performance analysis
- Connection pool monitoring

### Custom Analytics

The application tracks:

- Prompt usage statistics
- Search queries and filters
- Platform popularity
- User engagement metrics

## 🔄 Updates and Maintenance

### Adding New Prompts

1. **Automatic**: Cron job collects new prompts every 4 hours
2. **Manual**: Use the API endpoint `POST /api/prompts`
3. **Bulk**: Import JSON files via seed script

### Schema Updates

```bash
npx prisma migrate dev --name migration-name
npx prisma generate
```

### Backup Strategy

- Neon provides automated backups
- Export data regularly: `npx prisma db seed`
- Version control schema changes

## 🎯 Next Steps

1. **User Authentication**: Implement NextAuth.js with GitHub/Google OAuth
2. **User Collections**: Allow users to create and share prompt collections
3. **Prompt Ratings**: Add user rating and review system
4. **Advanced Search**: Implement AI-powered semantic search
5. **API Rate Limiting**: Add rate limiting for public APIs
6. **Mobile App**: Create React Native mobile application

## 📞 Support

For issues and support:

1. Check the [Vercel deployment logs](https://vercel.com/docs/observability/overview)
2. Review [Neon database documentation](https://neon.tech/docs)
3. Check [Next.js deployment guide](https://nextjs.org/docs/deployment)

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.