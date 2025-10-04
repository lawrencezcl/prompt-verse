import { Inter } from 'next/font/google';
import { ThemeProvider } from 'next-themes';
import { Toaster } from '@/components/ui/toaster';
import { Analytics } from '@vercel/analytics/react';
import { cn } from '@/lib/utils';
import './globals.css';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

export const metadata = {
  metadataBase: new URL('https://prompt-verse.vercel.app'),
  title: {
    default: 'PromptVerse - Ultimate AI Video Generation Prompts Collection',
    template: '%s | PromptVerse'
  },
  description: 'Discover 15,000+ professionally curated AI video generation prompts. Search, filter, and use the best prompts for Runway, Pika Labs, Sora, and more.',
  keywords: ['AI video prompts', 'text to video', 'AI video generation', 'Runway prompts', 'Pika Labs prompts', 'Sora prompts'],
  authors: [{ name: 'PromptVerse Team' }],
  creator: 'prompt-verse',
  publisher: 'PromptVerse',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://prompt-verse.vercel.app',
    title: 'PromptVerse - Ultimate AI Video Generation Prompts Collection',
    description: 'Discover 15,000+ professionally curated AI video generation prompts. Search, filter, and use the best prompts for Runway, Pika Labs, Sora, and more.',
    siteName: 'PromptVerse',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'PromptVerse - AI Video Generation Prompts',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'PromptVerse - Ultimate AI Video Generation Prompts Collection',
    description: 'Discover 15,000+ professionally curated AI video generation prompts. Search, filter, and use the best prompts for Runway, Pika Labs, Sora, and more.',
    images: ['/og-image.jpg'],
  },
  verification: {
    google: 'your-google-verification-code',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          'min-h-screen bg-background font-sans antialiased',
          inter.variable
        )}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="relative flex min-h-screen flex-col">
            <main className="flex-1">
              {children}
            </main>
          </div>
          <Toaster />
          <Analytics />
        </ThemeProvider>
      </body>
    </html>
  );
}