import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

export const dynamic = 'force-dynamic';

const prisma = new PrismaClient();

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const limitParam = searchParams.get('limit');
    const limit = limitParam ? parseInt(limitParam) : 10;

    // Get trending prompts based on recent usage and rating
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

    const trendingPrompts = await prisma.prompt.findMany({
      where: {
        isActive: true,
        OR: [
          { createdAt: { gte: sevenDaysAgo } }, // Recently created
          { updatedAt: { gte: sevenDaysAgo } }, // Recently updated
        ],
      },
      include: {
        platform: true,
      },
      orderBy: [
        { usageCount: 'desc' },
        { rating: 'desc' },
        { createdAt: 'desc' },
      ],
      take: Math.min(limit, 30), // Max 30 trending prompts
    });

    const formattedPrompts = trendingPrompts.map(prompt => ({
      ...prompt,
      createdAt: prompt.createdAt.toISOString(),
      updatedAt: prompt.updatedAt.toISOString(),
    }));

    return NextResponse.json({
      prompts: formattedPrompts,
      count: formattedPrompts.length,
      period: '7 days',
    });
  } catch (error) {
    console.error('Error fetching trending prompts:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}