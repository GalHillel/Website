// @/components/HomePageClientView.tsx
"use client";

import Link from 'next/link';
import AnimatedSection from '@/components/AnimatedSection';
import TypewriterTagline from '@/components/TypewriterTagline';
import { HeroContent } from '@/entities/SiteContent'; // Assuming SiteContent types can be imported

interface HomePageClientViewProps {
  heroContent: HeroContent;
  // Add other parts of siteContent if needed by this view
}

export default function HomePageClientView({ heroContent }: HomePageClientViewProps) {
  const heroIntro = heroContent.intro;

  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-12rem)] text-center px-4 relative">
      {/* Hero Section */}
      <AnimatedSection delay={0.1} className="py-12 md:py-20">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4 text-slate-800 dark:text-slate-100">
          Gal Hillel
        </h1>
        <TypewriterTagline />
      </AnimatedSection>

      {/* Short Intro Section */}
      <AnimatedSection delay={0.3} className="mb-12 md:mb-20 max-w-2xl">
        <p className="text-md sm:text-lg md:text-xl text-slate-600 dark:text-slate-400">
          {heroIntro}
        </p>
      </AnimatedSection>

      {/* CTA Buttons Section */}
      <AnimatedSection delay={0.5} className="mb-16 md:mb-20">
        <div className="space-y-4 sm:space-y-0 sm:space-x-4 flex flex-col sm:flex-row items-center">
          <Link href="/projects" className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-lg transition-colors duration-300 text-lg">
            View Projects
          </Link>
          <Link href="/contact" className="w-full sm:w-auto bg-transparent hover:bg-gray-200 dark:hover:bg-gray-700 text-blue-600 dark:text-blue-400 dark:hover:text-blue-300 font-semibold py-3 px-8 rounded-lg border-2 border-blue-600 dark:border-blue-400 transition-colors duration-300 text-lg">
            Get in Touch
          </Link>
        </div>
      </AnimatedSection>

      {/* Smooth scroll hint / Scroll to explore */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <Link href="/about" aria-label="Scroll to explore or go to About page">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-gray-500 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-400 transition-colors">
            <path strokeLinecap="round" strokeLinejoin="round" d="m9 12.75 3 3m0 0 3-3m-3 3v-7.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
          </svg>
        </Link>
      </div>
    </div>
  );
}
