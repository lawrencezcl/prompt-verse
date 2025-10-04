# 🎬 PromptVerse - Ultimate AI Video Generation Prompts Collection

A modern, beautiful React website for collecting, searching, and displaying the best AI video generation prompts. Features 15,100+ professionally curated prompts optimized for platforms like Runway, Pika Labs, Sora, Leonardo.ai, and more.

## 🚀 Features

- **📚 Massive Collection**: 15,100+ professionally curated prompts
- **🔍 Advanced Search**: Filter by category, platform, quality, and style
- **📱 Responsive Design**: Beautiful modern React interface
- **⭐ Rating System**: Community-driven prompt quality ratings
- **🏷️ Tag Management**: Comprehensive tagging system
- **🔄 Auto Collection**: Automated prompt gathering every 4 hours
- **📊 Analytics**: Usage statistics and trending prompts
- **🎯 Platform Optimization**: Tailored for major AI video platforms

## 🛠️ Technology Stack

- **Frontend**: React 18 + TypeScript + Tailwind CSS
- **Backend**: Next.js 14 API Routes
- **Database**: PostgreSQL (Neon)
- **Deployment**: Vercel
- **Styling**: Tailwind CSS + DaisyUI Components
- **Database ORM**: Prisma
- **Search**: Full-text search with PostgreSQL
- **Cron Jobs**: Vercel Cron Jobs

## 📊 Database Schema

### Core Tables

#### `pt_prompts` - Main prompts table
- `id` - Primary key (UUID)
- `title` - Prompt title (string)
- `content` - Full prompt text (text)
- `category` - Main category (string)
- `subcategory` - Subcategory (string)
- `platform` - Optimized platform (enum)
- `quality_score` - Quality rating (decimal)
- `difficulty` - Complexity level (enum)
- `duration` - Video duration (integer)
- `aspect_ratio` - Aspect ratio (string)
- `tags` - JSON array of tags
- `source` - Source repository/file (string)
- `is_json` - Whether prompt is JSON format (boolean)
- `json_data` - JSON specifications if applicable (jsonb)
- `rating` - Community rating (decimal)
- `usage_count` - Usage counter (integer)
- `is_featured` - Featured prompt flag (boolean)
- `is_active` - Active status (boolean)
- `created_at` - Creation timestamp
- `updated_at` - Last update timestamp

#### `pt_categories` - Categories
- `id` - Primary key (UUID)
- `name` - Category name (string)
- `slug` - URL-friendly slug (string)
- `description` - Category description (text)
- `prompt_count` - Number of prompts (integer)
- `icon` - Icon name (string)
- `color` - Theme color (string)
- `parent_id` - Parent category ID (UUID, nullable)
- `sort_order` - Display order (integer)
- `is_active` - Active status (boolean)

#### `pt_platforms` - AI platforms
- `id` - Primary key (UUID)
- `name` - Platform name (string)
- `slug` - URL-friendly slug (string)
- `description` - Platform description (text)
- `website` - Platform URL (string)
- `max_duration` - Maximum video duration (integer)
- `supported_formats` - Supported aspect ratios (jsonb)
- `api_available` - API access available (boolean)
- `prompt_count` - Number of prompts (integer)
- `logo_url` - Platform logo URL (string)
- `is_active` - Active status (boolean)

#### `pt_tags` - Tags
- `id` - Primary key (UUID)
- `name` - Tag name (string)
- `slug` - URL-friendly slug (string)
- `color` - Tag color (string)
- `prompt_count` - Usage count (integer)
- `is_active` - Active status (boolean)

#### `pt_collections` - Prompt collections
- `id` - Primary key (UUID)
- `title` - Collection title (string)
- `slug` - URL-friendly slug (string)
- `description` - Collection description (text)
- `prompt_ids` - Array of prompt IDs (jsonb)
- `creator_name` - Creator name (string)
- `creator_email` - Creator email (string)
- `is_public` - Public visibility (boolean)
- `is_featured` - Featured collection (boolean)
- `views` - View count (integer)
- `created_at` - Creation timestamp

#### `pt_usage_analytics` - Usage tracking
- `id` - Primary key (UUID)
- `prompt_id` - Related prompt (UUID)
- `platform_used` - Platform used (string)
- `search_query` - Search terms (string)
- `filters_applied` - Filters used (jsonb)
- `ip_address` - User IP (string)
- `user_agent` - Browser info (string)
- `created_at` - Access timestamp

## 🎨 UI/UX Design

### Color Scheme
- **Primary**: Indigo-600
- **Secondary**: Purple-600
- **Accent**: Pink-500
- **Background**: Gray-50
- **Text**: Gray-900
- **Cards**: White
- **Hover**: Gray-100

### Components
- **Modern Cards**: Glass morphism effects
- **Smooth Animations**: Micro-interactions
- **Search Interface**: Advanced filtering
- **Rating System**: Star ratings
- **Tag Cloud**: Interactive tags
- **Dark Mode**: Toggle support

## 🚀 Deployment

### Environment Variables
```env
# Database
DATABASE_URL="postgresql://neondb_owner:npg_iSKs3vCN0bBw@ep-still-boat-a1kh6owg-pooler.ap-southeast-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require"

# Next.js
NEXTAUTH_SECRET="your-secret-key"
NEXTAUTH_URL="http://localhost:3000"

# APIs
OPENAI_API_KEY="your-openai-key"
GOOGLE_ANALYTICS_ID="your-ga-id"

# Cron Job Security
CRON_SECRET="your-cron-secret"
```

### Vercel Cron Jobs
```json
{
  "collect-prompts": {
    "schedule": "0 */4 * * *",
    "description": "Collect new best prompts every 4 hours"
  },
  "cleanup-analytics": {
    "schedule": "0 0 * * *",
    "description": "Clean up analytics data daily"
  },
  "update-trends": {
    "schedule": "0 */6 * * *",
    "description": "Update trending prompts every 6 hours"
  }
}
```

## 📁 Project Structure

```
prompt-verse/
├── README.md
├── package.json
├── next.config.js
├── tailwind.config.js
├── prisma/
│   ├── schema.prisma
│   └── migrations/
├── src/
│   ├── app/
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   ├── search/
│   │   ├── prompt/[id]/
│   │   ├── categories/
│   │   ├── platforms/
│   │   ├── collections/
│   │   └── api/
│   │       ├── prompts/
│   │       ├── categories/
│   │       ├── analytics/
│   │       └── cron/
│   ├── components/
│   │   ├── ui/
│   │   ├── layout/
│   │   ├── search/
│   │   ├── prompts/
│   │   └── collections/
│   ├── lib/
│   │   ├── db.ts
│   │   ├── utils.ts
│   │   ├── prompts.ts
│   │   └── analytics.ts
│   ├── hooks/
│   ├── types/
│   └── data/
├── public/
└── vercel.json
```

## 🎯 Getting Started

1. **Clone the repository**
2. **Install dependencies**
3. **Set up environment variables**
4. **Run database migrations**
5. **Start development server**
6. **Deploy to Vercel**

## 📈 Performance Features

- **Database Optimization**: Full-text search with indexes
- **Caching**: Redis for frequently accessed data
- **Image Optimization**: Next.js Image component
- **Lazy Loading**: Component-level lazy loading
- **Code Splitting**: Route-based code splitting
- **CDN**: Vercel Edge Network

## 🔍 Search Capabilities

- **Full-text search** on prompt content
- **Filter by**: Category, platform, quality, duration
- **Sort by**: Relevance, rating, date, popularity
- **Tag-based filtering**
- **Platform optimization** filters
- **Advanced operators**: AND, OR, NOT

## 📊 Analytics Features

- **Usage tracking**: Most searched prompts
- **Trending analysis**: Popular categories
- **Platform statistics**: Most used platforms
- **Quality metrics**: Highest rated prompts
- **User behavior**: Search patterns
- **Collection insights**: Most popular collections

## 🛡️ Security Features

- **Rate limiting**: Prevent abuse
- **Input validation**: Sanitize all inputs
- **SQL injection protection**: Parameterized queries
- **CORS protection**: Secure API endpoints
- **Authentication**: User account management
- **Data encryption**: Secure sensitive data

## 🚀 Auto Collection System

The automated collection system:
- **Scrapes GitHub repositories** for new prompts
- **Analyzes AI platform APIs** for trending content
- **Validates prompt quality** using AI models
- **Detects duplicates** and variations
- **Categorizes automatically** based on content
- **Updates every 4 hours** with fresh content

## 📚 Documentation

- **API Documentation**: Complete API reference
- **Component Library**: Reusable UI components
- **Design System**: Style guide and principles
- **Database Schema**: Complete ERD documentation
- **Deployment Guide**: Step-by-step deployment

## 🎨 Design Inspiration

- **Modern UI**: Following Material Design principles
- **Dark Mode**: Elegant dark theme support
- **Micro-interactions**: Smooth animations and transitions
- **Glass Morphism**: Modern card designs
- **Gradient Backgrounds**: Beautiful visual effects

---

**Built with ❤️ for the AI video generation community**