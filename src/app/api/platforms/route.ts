import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const includeCount = searchParams.get('includeCount') === 'true';

    const platforms = await prisma.platform.findMany({
      where: {
        isActive: true,
      },
      orderBy: [
        { promptCount: 'desc' },
        { name: 'asc' },
      ],
    });

    const formattedPlatforms = platforms.map(platform => ({
      ...platform,
      createdAt: platform.createdAt.toISOString(),
      updatedAt: platform.updatedAt.toISOString(),
    }));

    return NextResponse.json({
      platforms: formattedPlatforms,
      count: formattedPlatforms.length,
    });
  } catch (error) {
    console.error('Error fetching platforms:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}