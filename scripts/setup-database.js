#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🚀 Setting up database for PromptVerse...');

try {
  // Install dependencies if needed
  console.log('📦 Checking dependencies...');
  try {
    execSync('npx prisma --version', { stdio: 'inherit' });
  } catch (error) {
    console.log('📦 Installing Prisma...');
    execSync('npm install prisma @prisma/client zod', { stdio: 'inherit' });
  }

  // Generate Prisma client
  console.log('🔧 Generating Prisma client...');
  execSync('npx prisma generate', { stdio: 'inherit' });

  // Push schema to database
  console.log('🗄️ Pushing database schema...');
  execSync('npx prisma db push', { stdio: 'inherit' });

  // Run seed script
  console.log('🌱 Seeding database...');
  execSync('npx tsx prisma/seed.ts', { stdio: 'inherit' });

  console.log('✅ Database setup completed successfully!');
  console.log('');
  console.log('📋 Next steps:');
  console.log('1. Set up your environment variables in .env.local');
  console.log('2. Run `npm run dev` to start the development server');
  console.log('3. Visit http://localhost:3000 to see the application');

} catch (error) {
  console.error('❌ Error during database setup:', error.message);
  process.exit(1);
}