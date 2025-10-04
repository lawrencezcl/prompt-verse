import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { z } from 'zod';

const prisma = new PrismaClient();

// Query schema for validation
const querySchema = z.object({
  query: z.string().optional(),
  category: z.string().optional(),
  platform: z.enum(['RUNWAY', 'PIKA_LABS', 'SORA', 'LEONARDO_AI', 'PIXVERSE', 'HEYGEN', 'STABLE_DIFFUSION', 'KAEIBER', 'MOONVALLEY', 'REELCRAFT', 'GENMO', 'POLLO_AI', 'LUMEN5', 'INVIDEO', 'SYNTHESIA']).optional(),
  difficulty: z.enum(['BEGINNER', 'INTERMEDIATE', 'ADVANCED', 'EXPERT']).optional(),
  minQuality: z.number().min(0).max(10).optional(),
  maxQuality: z.number().min(0).max(10).optional(),
  minDuration: z.number().min(1).optional(),
  maxDuration: z.number().min(1).optional(),
  tags: z.string().optional().transform(val => val ? val.split(',') : undefined),
  isFeatured: z.string().optional().transform(val => val === 'true'),
  sortBy: z.enum(['relevance', 'rating', 'createdAt', 'usageCount']).default('relevance'),
  sortOrder: z.enum(['asc', 'desc']).default('desc'),
  limit: z.string().optional().transform(val => val ? parseInt(val) : 20),
  offset: z.string().optional().transform(val => val ? parseInt(val) : 0),
});

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const queryParams = Object.fromEntries(searchParams.entries());

    // Validate and parse query parameters
    const validatedQuery = querySchema.parse(queryParams);

    // Build the where clause
    const where: any = {
      isActive: true,
    };

    if (validatedQuery.query) {
      where.OR = [
        { title: { contains: validatedQuery.query, mode: 'insensitive' } },
        { content: { contains: validatedQuery.query, mode: 'insensitive' } },
        { tags: { hasSome: [validatedQuery.query] } },
      ];
    }

    if (validatedQuery.category) {
      where.category = validatedQuery.category;
    }

    if (validatedQuery.platform) {
      where.platformId = validatedQuery.platform;
    }

    if (validatedQuery.difficulty) {
      where.difficulty = validatedQuery.difficulty;
    }

    if (validatedQuery.minQuality !== undefined) {
      where.qualityScore = { gte: validatedQuery.minQuality };
    }

    if (validatedQuery.maxQuality !== undefined) {
      where.qualityScore = { ...where.qualityScore, lte: validatedQuery.maxQuality };
    }

    if (validatedQuery.minDuration !== undefined) {
      where.duration = { gte: validatedQuery.minDuration };
    }

    if (validatedQuery.maxDuration !== undefined) {
      where.duration = { ...where.duration, lte: validatedQuery.maxDuration };
    }

    if (validatedQuery.tags && validatedQuery.tags.length > 0) {
      where.tags = { hasSome: validatedQuery.tags };
    }

    if (validatedQuery.isFeatured !== undefined) {
      where.isFeatured = validatedQuery.isFeatured;
    }

    // Build the order clause
    let orderBy: any = {};
    switch (validatedQuery.sortBy) {
      case 'rating':
        orderBy = { rating: validatedQuery.sortOrder };
        break;
      case 'createdAt':
        orderBy = { createdAt: validatedQuery.sortOrder };
        break;
      case 'usageCount':
        orderBy = { usageCount: validatedQuery.sortOrder };
        break;
      case 'relevance':
      default:
        // For relevance, we'll sort by a combination of rating and usage
        orderBy = [
          { isFeatured: 'desc' },
          { rating: 'desc' },
          { usageCount: 'desc' },
        ];
        break;
    }

    // Execute the query
    const [prompts, total] = await Promise.all([
      prisma.prompt.findMany({
        where,
        orderBy,
        include: {
          platform: true,
        },
        skip: validatedQuery.offset,
        take: Math.min(validatedQuery.limit || 20, 100), // Max 100 per request
      }),
      prisma.prompt.count({ where }),
    ]);

    // Format the response
    const formattedPrompts = prompts.map(prompt => ({
      ...prompt,
      createdAt: prompt.createdAt.toISOString(),
      updatedAt: prompt.updatedAt.toISOString(),
    }));

    return NextResponse.json({
      prompts: formattedPrompts,
      pagination: {
        total,
        limit: validatedQuery.limit,
        offset: validatedQuery.offset,
        hasMore: validatedQuery.offset + prompts.length < total,
      },
      filters: validatedQuery,
    });
  } catch (error) {
    console.error('Error fetching prompts:', error);

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Invalid query parameters', details: error.errors },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const promptSchema = z.object({
      title: z.string().min(1, 'Title is required').max(200),
      content: z.string().min(1, 'Content is required').max(2000),
      category: z.string().min(1, 'Category is required'),
      subcategory: z.string().optional(),
      platformId: z.string().min(1, 'Platform is required'),
      qualityScore: z.number().min(0).max(10).default(5),
      difficulty: z.enum(['BEGINNER', 'INTERMEDIATE', 'ADVANCED', 'EXPERT']).default('BEGINNER'),
      duration: z.number().min(1).max(600).optional(),
      aspectRatio: z.string().optional(),
      tags: z.array(z.string()).default([]),
      source: z.string().default('user_submission'),
      isJson: z.boolean().default(false),
      jsonData: z.any().optional(),
      isFeatured: z.boolean().default(false),
    });

    const validatedData = promptSchema.parse(body);

    // Verify platform exists
    const platform = await prisma.platform.findUnique({
      where: { id: validatedData.platformId, isActive: true },
    });

    if (!platform) {
      return NextResponse.json(
        { error: 'Invalid platform or platform not active' },
        { status: 400 }
      );
    }

    // Create the prompt
    const prompt = await prisma.prompt.create({
      data: validatedData,
      include: {
        platform: true,
      },
    });

    // Update platform prompt count
    await prisma.platform.update({
      where: { id: validatedData.platformId },
      data: {
        promptCount: {
          increment: 1,
        },
      },
    });

    return NextResponse.json({
      prompt: {
        ...prompt,
        createdAt: prompt.createdAt.toISOString(),
        updatedAt: prompt.updatedAt.toISOString(),
      },
      message: 'Prompt created successfully',
    });
  } catch (error) {
    console.error('Error creating prompt:', error);

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Invalid request body', details: error.errors },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}