import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const limitParam = searchParams.get('limit');
    const limit = limitParam ? parseInt(limitParam) : 12;

    const featuredPrompts = await prisma.prompt.findMany({
      where: {
        isFeatured: true,
        isActive: true,
      },
      include: {
        platform: true,
      },
      orderBy: [
        { rating: 'desc' },
        { usageCount: 'desc' },
        { createdAt: 'desc' },
      ],
      take: Math.min(limit, 50), // Max 50 featured prompts
    });

    const formattedPrompts = featuredPrompts.map(prompt => ({
      ...prompt,
      createdAt: prompt.createdAt.toISOString(),
      updatedAt: prompt.updatedAt.toISOString(),
    }));

    return NextResponse.json({
      prompts: formattedPrompts,
      count: formattedPrompts.length,
    });
  } catch (error) {
    console.error('Error fetching featured prompts:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}