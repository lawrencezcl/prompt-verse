import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

export const dynamic = 'force-dynamic';

const prisma = new PrismaClient();

export async function GET() {
  try {
    // Get basic counts
    const [
      totalPrompts,
      totalCategories,
      totalPlatforms,
      featuredPrompts,
    ] = await Promise.all([
      prisma.prompt.count({ where: { isActive: true } }),
      prisma.category.count({ where: { isActive: true } }),
      prisma.platform.count({ where: { isActive: true } }),
      prisma.prompt.count({ where: { isActive: true, isFeatured: true } }),
    ]);

    // Get average rating
    const ratingResult = await prisma.prompt.aggregate({
      where: { isActive: true },
      _avg: { rating: true },
    });

    // Get most used platform
    const platformUsage = await prisma.prompt.groupBy({
      by: ['platformId'],
      where: { isActive: true },
      _count: { id: true },
      orderBy: { _count: { id: 'desc' } },
      take: 1,
    });

    const mostUsedPlatform = platformUsage[0]
      ? await prisma.platform.findUnique({
          where: { id: platformUsage[0].platformId },
        })
      : null;

    // Get top categories
    const topCategories = await prisma.prompt.groupBy({
      by: ['category'],
      where: { isActive: true },
      _count: { id: true },
      orderBy: { _count: { id: 'desc' } },
      take: 5,
    });

    // Get trending tags by analyzing prompt tags
    const allPrompts = await prisma.prompt.findMany({
      where: { isActive: true },
      select: { tags: true },
    });

    const tagCounts = new Map<string, number>();
    allPrompts.forEach(prompt => {
      prompt.tags.forEach(tag => {
        tagCounts.set(tag, (tagCounts.get(tag) || 0) + 1);
      });
    });

    const trendingTags = Array.from(tagCounts.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, 10)
      .map(([tag, count]) => ({ tag, count }));

    // Get usage analytics for the last 30 days
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    const recentAnalytics = await prisma.usageAnalytics.findMany({
      where: {
        createdAt: { gte: thirtyDaysAgo },
      },
    });

    const usageAnalytics = {
      totalSearches: recentAnalytics.length,
      uniqueUsers: new Set(recentAnalytics.map(a => a.ipAddress)).size,
      averagePromptsPerSearch: recentAnalytics.length > 0
        ? recentAnalytics.reduce((sum, a) => sum + (a.searchQuery ? 1 : 0), 0) / recentAnalytics.length
        : 0,
    };

    const stats = {
      totalPrompts,
      totalCategories,
      totalPlatforms,
      featuredPrompts,
      averageRating: ratingResult._avg.rating || 0,
      mostUsedPlatform: mostUsedPlatform?.id || null,
      topCategories: topCategories.map(item => ({
        category: item.category,
        count: item._count.id,
      })),
      trendingTags,
      usageAnalytics,
      updatedAt: new Date().toISOString(),
    };

    return NextResponse.json(stats);
  } catch (error) {
    console.error('Error fetching stats:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}