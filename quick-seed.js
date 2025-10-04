const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function quickSeed() {
  try {
    console.log('🚀 Quick seeding database...');

    // Create platforms
    const platforms = await Promise.all([
      prisma.platform.upsert({ where: { id: 'RUNWAY' }, update: {}, create: { id: 'RUNWAY', name: 'Runway Gen-2', slug: 'runway-gen-2', description: 'Advanced AI video generation', website: 'https://runwayml.com', apiAvailable: true, promptCount: 0, logoUrl: '/platforms/runway.svg', isActive: true } }),
      prisma.platform.upsert({ where: { id: 'PIKA_LABS' }, update: {}, create: { id: 'PIKA_LABS', name: 'Pika Labs', slug: 'pika-labs', description: 'User-friendly video generation', website: 'https://pika.art', apiAvailable: true, promptCount: 0, logoUrl: '/platforms/pika.svg', isActive: true } }),
      prisma.platform.upsert({ where: { id: 'SORA' }, update: {}, create: { id: 'SORA', name: 'Sora (OpenAI)', slug: 'sora', description: 'Cutting-edge text-to-video', website: 'https://openai.com/sora', apiAvailable: false, promptCount: 0, logoUrl: '/platforms/sora.svg', isActive: true } }),
      prisma.platform.upsert({ where: { id: 'LEONARDO_AI' }, update: {}, create: { id: 'LEONARDO_AI', name: 'Leonardo.Ai', slug: 'leonardo-ai', description: 'Creative AI platform', website: 'https://leonardo.ai', apiAvailable: true, promptCount: 0, logoUrl: '/platforms/leonardo.svg', isActive: true } }),
      prisma.platform.upsert({ where: { id: 'PIXVERSE' }, update: {}, create: { id: 'PIXVERSE', name: 'PixVerse', slug: 'pixverse', description: 'AI video creation platform', website: 'https://pixverse.ai', apiAvailable: true, promptCount: 0, logoUrl: '/platforms/pixverse.svg', isActive: true } }),
      prisma.platform.upsert({ where: { id: 'STABLE_DIFFUSION' }, update: {}, create: { id: 'STABLE_DIFFUSION', name: 'Stable Diffusion Video', slug: 'stable-diffusion-video', description: 'Open source video generation', website: 'https://stability.ai', apiAvailable: true, promptCount: 0, logoUrl: '/platforms/stable-diffusion.svg', isActive: true } })
    ]);

    console.log('✅ Created platforms');

    // Create categories
    const categories = await Promise.all([
      prisma.category.upsert({ where: { slug: 'cinematic' }, update: {}, create: { name: 'Cinematic', slug: 'cinematic', description: 'Film and cinema style prompts', promptCount: 0, icon: '🎬', color: '#FF6B6B', sortOrder: 1, isActive: true } }),
      prisma.category.upsert({ where: { slug: 'nature' }, update: {}, create: { name: 'Nature', slug: 'nature', description: 'Natural landscapes and wildlife', promptCount: 0, icon: '🌿', color: '#4ECDC4', sortOrder: 2, isActive: true } }),
      prisma.category.upsert({ where: { slug: 'people' }, update: {}, create: { name: 'People', slug: 'people', description: 'Portraits and human subjects', promptCount: 0, icon: '👤', color: '#45B7D1', sortOrder: 3, isActive: true } }),
      prisma.category.upsert({ where: { slug: 'technology' }, update: {}, create: { name: 'Technology', slug: 'technology', description: 'Tech and futuristic themes', promptCount: 0, icon: '💻', color: '#9B59B6', sortOrder: 4, isActive: true } }),
      prisma.category.upsert({ where: { slug: 'abstract' }, update: {}, create: { name: 'Abstract', slug: 'abstract', description: 'Abstract and artistic concepts', promptCount: 0, icon: '🎨', color: '#E74C3C', sortOrder: 5, isActive: true } })
    ]);

    console.log('✅ Created categories');

    // Create some sample prompts
    const samplePrompts = [
      {
        title: 'Cinematic Drone Shot',
        content: 'Epic aerial drone footage sweeping over majestic mountain peaks at golden hour, dramatic shadows, 4K resolution, cinematic color grading',
        category: 'Cinematic',
        platformId: 'RUNWAY',
        qualityScore: 9.5,
        difficulty: 'INTERMEDIATE',
        duration: 8,
        aspectRatio: '16:9',
        tags: ['drone', 'cinematic', 'mountains', 'golden hour'],
        source: 'curated',
        isJson: false,
        rating: 4.9,
        usageCount: 1250,
        isFeatured: true,
        isActive: true,
        tagIds: []
      },
      {
        title: 'Cyberpunk Cityscape',
        content: 'Futuristic cyberpunk cityscape at night, neon lights reflecting on wet streets, flying vehicles, holographic advertisements',
        category: 'Technology',
        platformId: 'PIKA_LABS',
        qualityScore: 9.2,
        difficulty: 'ADVANCED',
        duration: 10,
        aspectRatio: '21:9',
        tags: ['cyberpunk', 'neon', 'futuristic', 'night'],
        source: 'curated',
        isJson: false,
        rating: 4.8,
        usageCount: 980,
        isFeatured: true,
        isActive: true,
        tagIds: []
      },
      {
        title: 'Serene Japanese Garden',
        content: 'Peaceful Japanese garden in spring, cherry blossoms gently falling, koi pond with ripples, traditional architecture',
        category: 'Nature',
        platformId: 'SORA',
        qualityScore: 9.7,
        difficulty: 'BEGINNER',
        duration: 6,
        aspectRatio: '16:9',
        tags: ['japanese', 'garden', 'cherry blossoms', 'peaceful'],
        source: 'curated',
        isJson: false,
        rating: 4.9,
        usageCount: 1100,
        isFeatured: true,
        isActive: true,
        tagIds: []
      }
    ];

    const createdPrompts = await Promise.all(
      samplePrompts.map(prompt => prisma.prompt.create({ data: prompt }))
    );

    console.log('✅ Created sample prompts');

    // Update counts
    await Promise.all(platforms.map(platform =>
      prisma.platform.update({
        where: { id: platform.id },
        data: { promptCount: createdPrompts.filter(p => p.platformId === platform.id).length }
      })
    ));

    await Promise.all(categories.map(category =>
      prisma.category.update({
        where: { slug: category.slug },
        data: { promptCount: createdPrompts.filter(p => p.category === category.name).length }
      })
    ));

    console.log('✅ Updated counts');
    console.log('🎉 Database seeding completed successfully!');

  } catch (error) {
    console.error('❌ Error:', error);
  } finally {
    await prisma.$disconnect();
  }
}

quickSeed();