import { PrismaClient } from '@prisma/client';
import { Prompt, Platform, Difficulty } from '../src/types';

const prisma = new PrismaClient();

// Initial platform data
const platforms: Omit<Platform, 'id' | 'createdAt' | 'updatedAt'>[] = [
  {
    name: 'Runway Gen-2',
    slug: 'runway-gen-2',
    description: 'Advanced AI video generation with cinematic quality and motion control',
    website: 'https://runwayml.com',
    maxDuration: 30,
    supportedFormats: ['mp4', 'gif'],
    apiAvailable: true,
    promptCount: 0,
    logoUrl: '/platforms/runway.svg',
    isActive: true,
  },
  {
    name: 'Pika Labs',
    slug: 'pika-labs',
    description: 'User-friendly video generation with artistic styles and animations',
    website: 'https://pika.art',
    maxDuration: 12,
    supportedFormats: ['mp4', 'gif'],
    apiAvailable: true,
    promptCount: 0,
    logoUrl: '/platforms/pika.svg',
    isActive: true,
  },
  {
    name: 'Sora',
    slug: 'sora',
    description: 'Cutting-edge text-to-video with unprecedented quality and coherence',
    website: 'https://openai.com/sora',
    maxDuration: 60,
    supportedFormats: ['mp4'],
    apiAvailable: false,
    promptCount: 0,
    logoUrl: '/platforms/sora.svg',
    isActive: true,
  },
  {
    name: 'Leonardo.Ai',
    slug: 'leonardo-ai',
    description: 'Creative AI platform with video generation and artistic control',
    website: 'https://leonardo.ai',
    maxDuration: 8,
    supportedFormats: ['mp4', 'gif'],
    apiAvailable: true,
    promptCount: 0,
    logoUrl: '/platforms/leonardo.svg',
    isActive: true,
  },
  {
    name: 'PixVerse AI',
    slug: 'pixverse',
    description: 'Professional video generation with advanced prompt engineering',
    website: 'https://pixverse.ai',
    maxDuration: 10,
    supportedFormats: ['mp4'],
    apiAvailable: true,
    promptCount: 0,
    logoUrl: '/platforms/pixverse.svg',
    isActive: true,
  },
  {
    name: 'HeyGen',
    slug: 'heygen',
    description: 'AI video generation focusing on avatar and talking head content',
    website: 'https://heygen.com',
    maxDuration: 300,
    supportedFormats: ['mp4'],
    apiAvailable: true,
    promptCount: 0,
    logoUrl: '/platforms/heygen.svg',
    isActive: true,
  },
];

// Initial categories
const categories = [
  { name: 'Cinematic', slug: 'cinematic', description: 'Professional film-style prompts with dramatic lighting', sortOrder: 1, icon: '🎬', color: '#8B5CF6' },
  { name: 'Nature', slug: 'nature', description: 'Landscapes, wildlife, and natural phenomena', sortOrder: 2, icon: '🌿', color: '#10B981' },
  { name: 'Portraits', slug: 'portraits', description: 'Character studies and people-focused prompts', sortOrder: 3, icon: '👤', color: '#3B82F6' },
  { name: 'Abstract', slug: 'abstract', description: 'Non-representational and experimental visuals', sortOrder: 4, icon: '🎨', color: '#F59E0B' },
  { name: 'Technology', slug: 'technology', description: 'AI, robotics, and futuristic concepts', sortOrder: 5, icon: '💻', color: '#6B7280' },
  { name: 'Music', slug: 'music', description: 'Music visualizations and performance prompts', sortOrder: 6, icon: '🎵', color: '#8B5CF6' },
  { name: 'Fantasy', slug: 'fantasy', description: 'Magical and mythical themes', sortOrder: 7, icon: '🦄', color: '#EC4899' },
  { name: 'Emotions', slug: 'emotions', description: 'Feeling and expression-focused prompts', sortOrder: 8, icon: '❤️', color: '#EF4444' },
  { name: 'AI Art', slug: 'ai-art', description: 'AI-specific and generative art prompts', sortOrder: 9, icon: '🤖', color: '#06B6D4' },
  { name: 'Action', slug: 'action', description: 'Dynamic movement and high-energy scenes', sortOrder: 10, icon: '⚡', color: '#F59E0B' },
  { name: 'Photography', slug: 'photography', description: 'Traditional and modern photography styles', sortOrder: 11, icon: '📷', color: '#14B8A6' },
  { name: 'Architecture', slug: 'architecture', description: 'Buildings, spaces, and structural design', sortOrder: 12, icon: '🏛️', color: '#6B7280' },
];

// Sample prompts based on our markdown files
interface SamplePrompt {
  title: string;
  content: string;
  category: string;
  subcategory?: string;
  platform: string;
  qualityScore: number;
  difficulty: string;
  duration?: number;
  aspectRatio?: string;
  tags: string[];
  source: string;
  isJson: boolean;
  jsonData?: any;
  rating: number;
  usageCount: number;
  isFeatured: boolean;
  isActive: boolean;
}

const samplePrompts: SamplePrompt[] = [
  {
    title: 'Cinematic Drone Shot',
    content: 'Epic aerial drone footage sweeping over majestic mountain peaks at golden hour, dramatic shadows, 4K resolution, cinematic color grading, smooth camera movement',
    category: 'Cinematic',
    platform: 'RUNWAY' as any,
    qualityScore: 9.5,
    difficulty: 'INTERMEDIATE' as any,
    duration: 8,
    aspectRatio: '16:9',
    tags: ['drone', 'cinematic', 'mountains', 'golden hour', '4K'],
    source: 'curated',
    isJson: false,
    rating: 4.9,
    usageCount: 1250,
    isFeatured: true,
    isActive: true,
  },
  {
    title: 'Cyberpunk Cityscape',
    content: 'Futuristic cyberpunk cityscape at night, neon lights reflecting on wet streets, flying vehicles, holographic advertisements, Blade Runner aesthetic, atmospheric fog',
    category: 'Technology',
    platform: 'PIKA_LABS' as any,
    qualityScore: 9.2,
    difficulty: 'ADVANCED' as any,
    duration: 10,
    aspectRatio: '21:9',
    tags: ['cyberpunk', 'neon', 'futuristic', 'night', 'sci-fi'],
    source: 'curated',
    isJson: false,
    rating: 4.8,
    usageCount: 980,
    isFeatured: true,
    isActive: true,
  },
  {
    title: 'Serene Japanese Garden',
    content: 'Peaceful Japanese garden in spring, cherry blossoms gently falling, koi pond with ripples, traditional architecture, soft natural lighting, zen atmosphere',
    category: 'Nature',
    platform: 'SORA' as any,
    qualityScore: 9.7,
    difficulty: 'BEGINNER' as any,
    duration: 6,
    aspectRatio: '16:9',
    tags: ['japanese', 'garden', 'cherry blossoms', 'peaceful', 'zen'],
    source: 'curated',
    isJson: false,
    rating: 4.9,
    usageCount: 1100,
    isFeatured: true,
    isActive: true,
  },
  // Add more sample prompts based on our extensive collection
  {
    title: 'AI Robot Portrait',
    content: 'Close-up portrait of an advanced AI robot with expressive blue eyes, metallic details, soft studio lighting, shallow depth of field, photorealistic rendering',
    category: 'Technology',
    platform: 'LEONARDO_AI' as any,
    qualityScore: 8.9,
    difficulty: 'INTERMEDIATE' as any,
    duration: 5,
    aspectRatio: '9:16',
    tags: ['AI', 'robot', 'portrait', 'future', 'realistic'],
    source: 'trending',
    isJson: false,
    rating: 4.7,
    usageCount: 2500,
    isFeatured: false,
    isActive: true,
  },
  {
    title: 'Ocean Underwater Scene',
    content: 'Underwater ocean scene with sea turtles swimming through coral reefs, sunbeams penetrating water, marine life, National Geographic documentary style, vibrant colors',
    category: 'Nature',
    platform: 'RUNWAY' as any,
    qualityScore: 9.1,
    difficulty: 'ADVANCED' as any,
    duration: 12,
    aspectRatio: '16:9',
    tags: ['underwater', 'ocean', 'coral', 'turtles', 'documentary'],
    source: 'trending',
    isJson: false,
    rating: 4.8,
    usageCount: 2100,
    isFeatured: false,
    isActive: true,
  },
];

async function main() {
  console.log('🌱 Starting database seeding...');

  // Clear existing data
  await prisma.usageAnalytics.deleteMany();
  await prisma.prompt.deleteMany();
  await prisma.category.deleteMany();
  await prisma.platform.deleteMany();
  console.log('🧹 Cleared existing data');

  // Seed platforms
  const createdPlatforms = [];
  for (const platform of platforms) {
    const created = await prisma.platform.create({
      data: platform,
    });
    createdPlatforms.push(created);
  }
  console.log(`✅ Created ${createdPlatforms.length} platforms`);

  // Seed categories
  const createdCategories = [];
  for (const category of categories) {
    const created = await prisma.category.create({
      data: category,
    });
    createdCategories.push(created);
  }
  console.log(`✅ Created ${createdCategories.length} categories`);

  // Seed prompts
  const createdPrompts = [];
  for (const prompt of samplePrompts) {
    // Find the platform ID
    const platform = createdPlatforms.find(p => p.name === prompt.platform);
    if (!platform) {
      console.warn(`Platform not found for prompt: ${prompt.title}`);
      continue;
    }

    const { platform: platformName, difficulty, ...promptData } = prompt;
    const created = await prisma.prompt.create({
      data: {
        ...promptData,
        difficulty: difficulty as any, // Cast to Difficulty enum
        platformId: platform.id,
      },
    });
    createdPrompts.push(created);

    // Update platform prompt count
    await prisma.platform.update({
      where: { id: platform.id },
      data: { promptCount: { increment: 1 } },
    });

    // Update category prompt count
    await prisma.category.updateMany({
      where: { name: prompt.category },
      data: { promptCount: { increment: 1 } },
    });
  }
  console.log(`✅ Created ${createdPrompts.length} sample prompts`);

  // Generate additional prompts to reach 15,100+
  console.log('🔄 Generating additional prompts...');
  const additionalPromptsCount = 15100 - samplePrompts.length;

  const promptTemplates = [
    {
      title: '{style} {subject}',
      content: '{description} with {style} aesthetics, {details}, {lighting}, {quality}',
      categories: ['Cinematic', 'Nature', 'Technology', 'Abstract'],
      styles: ['cinematic', 'artistic', 'realistic', 'surreal', 'minimalist'],
      subjects: ['landscape', 'portrait', 'cityscape', 'abstract composition', 'nature scene']
    },
    {
      title: '{time} {location}',
      content: 'Beautiful {location} during {time}, {atmosphere}, {details}, {lighting conditions}, {visual style}',
      categories: ['Nature', 'Photography', 'Cinematic'],
      times: ['golden hour', 'blue hour', 'midday', 'sunset', 'sunrise', 'night'],
      locations: ['mountain range', 'beach', 'forest', 'city street', 'desert', 'lake']
    },
    {
      title: '{mood} {concept}',
      content: '{mood} interpretation of {concept}, {visual elements}, {color palette}, {composition style}, {technical details}',
      categories: ['Abstract', 'Fantasy', 'AI Art'],
      moods: ['dreamy', 'dramatic', 'peaceful', 'energetic', 'mysterious'],
      concepts: ['time', 'space', 'emotion', 'technology', 'nature', 'humanity']
    }
  ];

  for (let i = 0; i < additionalPromptsCount; i++) {
    const template = promptTemplates[i % promptTemplates.length];
    const category = template.categories[i % template.categories.length];
    const platform = createdPlatforms[i % createdPlatforms.length];
    const style = template.styles ? template.styles[i % template.styles.length] : '';
    const subject = template.subjects ? template.subjects[i % template.subjects.length] : '';
    const time = template.times ? template.times[i % template.times.length] : '';
    const location = template.locations ? template.locations[i % template.locations.length] : '';
    const mood = template.moods ? template.moods[i % template.moods.length] : '';
    const concept = template.concepts ? template.concepts[i % template.concepts.length] : '';

    const title = template.title
      .replace('{style}', style)
      .replace('{subject}', subject)
      .replace('{time}', time)
      .replace('{location}', location)
      .replace('{mood}', mood)
      .replace('{concept}', concept);

    const content = template.content
      .replace('{style}', style)
      .replace('{subject}', subject)
      .replace('{time}', time)
      .replace('{location}', location)
      .replace('{mood}', mood)
      .replace('{concept}', concept)
      .replace('{description}', 'Stunning visual scene')
      .replace('{details}', 'rich details and textures')
      .replace('{lighting}', 'professional lighting')
      .replace('{quality}', 'high quality rendering')
      .replace('{atmosphere}', 'captivating atmosphere')
      .replace('{lighting conditions}', 'optimal lighting')
      .replace('{visual style}', 'artistic vision')
      .replace('{visual elements}', 'compelling visual elements')
      .replace('{color palette}', 'harmonious color palette')
      .replace('{composition style}', 'balanced composition')
      .replace('{technical details}', 'professional technical execution');

    const difficultyLevels = ['BEGINNER', 'INTERMEDIATE', 'ADVANCED', 'EXPERT'] as const;
    const aspectRatios = ['16:9', '9:16', '1:1', '4:3', '21:9'];

    // Generate random tags
    const availableTags = [
      'cinematic', '4K', 'portrait', 'nature', 'AI', 'drone', 'timelapse', 'animation',
      'realistic', 'artistic', 'neon', 'cyberpunk', 'vintage', 'minimalist', 'surreal',
      'landscape', 'urban', 'fantasy', 'sci-fi', 'horror', 'comedy', 'drama', 'abstract',
      'experimental', 'stop-motion', '3D-render', '2D-animation', 'motion-graphics'
    ];
    const randomTags: string[] = [];
    const tagCount = Math.floor(Math.random() * 4) + 2;
    for (let j = 0; j < tagCount; j++) {
      const randomTag = availableTags[Math.floor(Math.random() * availableTags.length)];
      if (!randomTags.includes(randomTag)) {
        randomTags.push(randomTag);
      }
    }

    const created = await prisma.prompt.create({
      data: {
        title: title.trim(),
        content: content.trim(),
        category,
        platformId: platform.id,
        qualityScore: Math.round((Math.random() * 3 + 7) * 10) / 10, // 7.0 to 10.0
        difficulty: difficultyLevels[Math.floor(Math.random() * difficultyLevels.length)],
        duration: Math.floor(Math.random() * 25) + 3, // 3 to 27 seconds
        aspectRatio: aspectRatios[Math.floor(Math.random() * aspectRatios.length)],
        tags: randomTags,
        source: 'generated',
        isJson: false,
        rating: Math.round((Math.random() * 2 + 3) * 10) / 10, // 3.0 to 5.0
        usageCount: Math.floor(Math.random() * 5000) + 10, // 10 to 5009
        isFeatured: Math.random() > 0.95, // 5% chance of being featured
        isActive: true,
      },
    });

    createdPrompts.push(created);

    // Update platform and category counts
    await prisma.platform.update({
      where: { id: platform.id },
      data: { promptCount: { increment: 1 } },
    });

    await prisma.category.updateMany({
      where: { name: category },
      data: { promptCount: { increment: 1 } },
    });

    if (i % 1000 === 0 && i > 0) {
      console.log(`📝 Generated ${i} additional prompts...`);
    }
  }

  console.log(`✅ Created ${additionalPromptsCount} additional prompts`);
  console.log(`🎯 Total prompts created: ${createdPrompts.length}`);
  console.log('🎉 Database seeding completed successfully!');
  console.log(`📊 Summary:`);
  console.log(`   - Platforms: ${createdPlatforms.length}`);
  console.log(`   - Categories: ${createdCategories.length}`);
  console.log(`   - Prompts: ${createdPrompts.length}`);
}

main()
  .catch((e) => {
    console.error('❌ Error during seeding:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });