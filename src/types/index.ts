export interface Prompt {
  id: string;
  title: string;
  content: string;
  category: string;
  subcategory?: string;
  platform: Platform;
  qualityScore: number;
  difficulty: Difficulty;
  duration?: number;
  aspectRatio?: string;
  tags: string[];
  source: string;
  isJson: boolean;
  jsonData?: Record<string, any>;
  rating: number;
  usageCount: number;
  isFeatured: boolean;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
  tagIds: string[];
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
  promptCount: number;
  icon?: string;
  color?: string;
  parentId?: string;
  sortOrder: number;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface Platform {
  id: string;
  name: string;
  slug: string;
  description?: string;
  website?: string;
  maxDuration?: number;
  supportedFormats?: string[];
  apiAvailable: boolean;
  promptCount: number;
  logoUrl?: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface Tag {
  id: string;
  name: string;
  slug: string;
  color?: string;
  promptCount: number;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface Collection {
  id: string;
  title: string;
  slug: string;
  description: string;
  promptIds: string[];
  creatorName: string;
  creatorEmail: string;
  isPublic: boolean;
  isFeatured: boolean;
  views: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface UsageAnalytics {
  id: string;
  promptId: string;
  platformUsed?: string;
  searchQuery?: string;
  filtersApplied?: Record<string, any>;
  ipAddress: string;
  userAgent: string;
  createdAt: Date;
}

export enum Difficulty {
  BEGINNER = 'BEGINNER',
  INTERMEDIATE = 'INTERMEDIATE',
  ADVANCED = 'ADVANCED',
  EXPERT = 'EXPERT',
}

export const PLATFORMS = [
  'RUNWAY',
  'PIKA_LABS',
  'SORA',
  'LEONARDO_AI',
  'PIXVERSE',
  'HEYGEN',
  'STABLE_DIFFUSION',
  'KAEIBER',
  'MOONVALLEY',
  'REELCRAFT',
  'GENMO',
  'POLLO_AI',
  'LUMEN5',
  'INVIDEO',
  'SYNTHESIA',
] as const;

export interface SearchFilters {
  query?: string;
  category?: string;
  platform?: string;
  difficulty?: Difficulty;
  minQuality?: number;
  maxQuality?: number;
  minDuration?: number;
  maxDuration?: number;
  aspectRatio?: string;
  tags?: string[];
  isFeatured?: boolean;
  sortBy?: 'relevance' | 'rating' | 'createdAt' | 'usageCount';
  sortOrder?: 'asc' | 'desc';
  limit?: number;
  offset?: number;
}

export interface PromptStats {
  totalPrompts: number;
  totalCategories: number;
  totalPlatforms: number;
  totalTags: number;
  featuredPrompts: number;
  averageRating: number;
  mostUsedPlatform: string;
  topCategories: Array<{
    category: string;
    count: number;
  }>;
  trendingTags: Array<{
    tag: string;
    count: number;
  }>;
}

export interface CollectionCreateData {
  title: string;
  description: string;
  promptIds: string[];
  creatorName: string;
  creatorEmail: string;
  isPublic?: boolean;
}

export interface PromptUpdateData {
  title?: string;
  content?: string;
  category?: string;
  subcategory?: string;
  platform?: string;
  qualityScore?: number;
  difficulty?: Difficulty;
  duration?: number;
  aspectRatio?: string;
  tags?: string[];
  rating?: number;
  isFeatured?: boolean;
  isActive?: boolean;
}

export interface PlatformSpecs {
  maxDuration: number;
  supportedFormats: string[];
  hasApi: boolean;
  recommendedQuality: string[];
  bestPractices: string[];
}