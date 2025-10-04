import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const includeCount = searchParams.get('includeCount') === 'true';

    const categories = await prisma.category.findMany({
      where: {
        isActive: true,
      },
      orderBy: [
        { sortOrder: 'asc' },
        { name: 'asc' },
      ],
      take: includeCount ? undefined : 50, // Limit if not including counts for performance
    });

    let formattedCategories = categories.map(category => ({
      ...category,
      createdAt: category.createdAt.toISOString(),
      updatedAt: category.updatedAt.toISOString(),
    }));

    // If includeCount is true, we need to count prompts for each category
    if (includeCount) {
      // Get prompt counts for each category
      const categoryCounts = await prisma.prompt.groupBy({
        by: ['category'],
        where: {
          isActive: true,
        },
        _count: {
          id: true,
        },
      });

      const countMap = new Map(
        categoryCounts.map(item => [item.category, item._count.id])
      );

      formattedCategories = formattedCategories.map(category => ({
        ...category,
        promptCount: countMap.get(category.name) || 0,
      }));
    }

    return NextResponse.json({
      categories: formattedCategories,
      count: formattedCategories.length,
    });
  } catch (error) {
    console.error('Error fetching categories:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}