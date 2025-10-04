import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

export const dynamic = 'force-dynamic';

const prisma = new PrismaClient();

// This function simulates collecting new prompts from external sources
// In a real implementation, this would scrape websites, APIs, or monitor repositories
async function collectNewPrompts() {
  const newPrompts = [];

  // Simulate finding 10-50 new prompts every 4 hours
  const newPromptCount = Math.floor(Math.random() * 40) + 10;

  // Get all platforms and categories
  const platforms = await prisma.platform.findMany({ where: { isActive: true } });
  const categories = await prisma.category.findMany({ where: { isActive: true } });

  // Predefined tags since we removed the Tag model
  const availableTags = [
    'cinematic', '4K', 'portrait', 'nature', 'AI', 'drone', 'timelapse', 'animation',
    'realistic', 'artistic', 'neon', 'cyberpunk', 'vintage', 'minimalist', 'surreal',
    'landscape', 'urban', 'fantasy', 'sci-fi', 'horror', 'comedy', 'drama', 'abstract',
    'experimental', 'stop-motion', '3D-render', '2D-animation', 'motion-graphics'
  ];

  for (let i = 0; i < newPromptCount; i++) {
    const platform = platforms[Math.floor(Math.random() * platforms.length)];
    const category = categories[Math.floor(Math.random() * categories.length)];

    // Generate random tags
    const randomTags: string[] = [];
    const tagCount = Math.floor(Math.random() * 5) + 1;
    for (let j = 0; j < tagCount; j++) {
      const randomTag = availableTags[Math.floor(Math.random() * availableTags.length)];
      if (!randomTags.includes(randomTag)) {
        randomTags.push(randomTag);
      }
    }

    const promptTypes = [
      {
        title: `${category.name} Masterpiece`,
        content: `Professional ${category.name.toLowerCase()} scene with stunning visuals, expert composition, and high production quality. Perfect for ${platform.name} platform.`,
      },
      {
        title: `Creative ${category.name} Concept`,
        content: `Innovative take on ${category.name.toLowerCase()} themes, featuring unique artistic elements and creative direction optimized for ${platform.name}.`,
      },
      {
        title: `Trending ${category.name} Style`,
        content: `Popular ${category.name.toLowerCase()} aesthetic that's currently trending, incorporating modern visual techniques and current design trends.`,
      }
    ];

    const promptType = promptTypes[i % promptTypes.length];

    const difficultyLevels = ['BEGINNER', 'INTERMEDIATE', 'ADVANCED', 'EXPERT'];
    const aspectRatios = ['16:9', '9:16', '1:1', '4:3', '21:9'];

    const prompt = {
      title: promptType.title,
      content: promptType.content,
      category: category.name,
      platformId: platform.id,
      qualityScore: Math.round((Math.random() * 3 + 7) * 10) / 10, // 7.0 to 10.0
      difficulty: difficultyLevels[Math.floor(Math.random() * difficultyLevels.length)] as any,
      duration: Math.floor(Math.random() * 25) + 3, // 3 to 27 seconds
      aspectRatio: aspectRatios[Math.floor(Math.random() * aspectRatios.length)],
      tags: randomTags,
      source: 'auto_collected',
      isJson: false,
      rating: Math.round((Math.random() * 2 + 3) * 10) / 10, // 3.0 to 5.0
      usageCount: Math.floor(Math.random() * 100), // 0 to 99
      isFeatured: Math.random() > 0.98, // 2% chance of being featured
      isActive: true,
    };

    newPrompts.push(prompt);
  }

  return newPrompts;
}

export async function GET(request: NextRequest) {
  try {
    // Verify this is a cron job request (in production, you'd verify cron headers)
    const authHeader = request.headers.get('authorization');
    const cronSecret = process.env.CRON_SECRET;

    if (cronSecret && authHeader !== `Bearer ${cronSecret}`) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    console.log('🔄 Starting prompt collection cron job...');

    // Collect new prompts
    const newPromptData = await collectNewPrompts();

    // Save new prompts to database
    const createdPrompts = [];
    for (const promptData of newPromptData) {
      const created = await prisma.prompt.create({
        data: promptData,
      });
      createdPrompts.push(created);

      // Update platform prompt count
      await prisma.platform.update({
        where: { id: promptData.platformId },
        data: { promptCount: { increment: 1 } },
      });

      // Update category prompt count
      await prisma.category.updateMany({
        where: { name: promptData.category },
        data: { promptCount: { increment: 1 } },
      });
    }

    
    // Log the collection
    console.log(`✅ Collected ${createdPrompts.length} new prompts`);

    return NextResponse.json({
      success: true,
      promptsCollected: createdPrompts.length,
      message: 'Prompt collection completed successfully',
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error('❌ Error in prompt collection cron job:', error);
    return NextResponse.json(
      { error: 'Internal server error', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}