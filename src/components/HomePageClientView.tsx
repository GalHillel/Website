'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import SpotlightCard from '@/components/SpotlightCard';
import TypewriterTagline from '@/components/TypewriterTagline';
import { HeroContent, SiteUI } from '@/data/SiteContent';
import { ArrowRight } from 'lucide-react';

interface HomePageClientViewProps {
  heroContent: HeroContent;
  uiContent: SiteUI['home'];
}

export default function HomePageClientView({ heroContent, uiContent }: HomePageClientViewProps) {
  return (
    <div className="w-full max-w-6xl mx-auto px-4 overflow-hidden relative">

      {/* Background Floating Elements (Abstract Glass Orbs) - Hidden on mobile */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden hidden md:block">
        <motion.div
          animate={{
            y: [0, -30, 0],
            rotate: [0, 10, 0],
            scale: [1, 1.1, 1]
          }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[-10%] left-[5%] w-[500px] h-[500px] bg-purple-500/10 rounded-full blur-[120px]"
        />
        <motion.div
          animate={{
            y: [0, 40, 0],
            rotate: [0, -15, 0],
            scale: [1, 1.2, 1]
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute bottom-[-10%] right-[5%] w-[600px] h-[600px] bg-blue-500/10 rounded-full blur-[120px]"
        />
        <motion.div
          animate={{
            x: [0, 50, 0],
            opacity: [0.2, 0.4, 0.2]
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] bg-white/5 rounded-full blur-[150px]"
        />
      </div>

      {/* Static Mobile Background - Simple Gradient */}


      {/* Main Content */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="relative z-10 w-full max-w-6xl"
      >
        <SpotlightCard className="p-8 md:p-24 flex flex-col items-center text-center bg-white/5 backdrop-blur-xl border border-white/10 shadow-xl rounded-[3rem]">

          {/* Massive Typographic Hero */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="text-7xl md:text-9xl font-black tracking-tighter mb-10"
          >
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-300 via-white to-purple-400 drop-shadow-[0_0_30px_rgba(255,255,255,0.2)]">
              Gal Hillel
            </span>
          </motion.h1>

          {/* Dynamic Tagline */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mb-12"
          >
            <div className="inline-flex items-center justify-center px-10 py-6 rounded-full bg-white/5 border border-white/10 backdrop-blur-md">
              <TypewriterTagline text={heroContent.tagline} taglines={heroContent.taglines} />
            </div>
          </motion.div>

          {/* Intro Text */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="text-xl md:text-2xl text-slate-300 max-w-3xl mx-auto mb-16 leading-relaxed font-light tracking-wide"
          >
            {heroContent.intro || "I build modern, scalable, and user-friendly web applications. Explore my work and skills."}
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-8 w-full sm:w-auto"
          >
            <Link
              href="/projects"
              className="glass-button group w-full sm:w-auto px-10 py-5 rounded-full bg-[#E0E0E0] text-black font-bold text-xl shadow-[0_0_30px_-5px_rgba(168,85,247,0.5)] hover:bg-white hover:shadow-[0_0_50px_-5px_rgba(168,85,247,0.7)] hover:scale-105 transition-all duration-300 flex items-center justify-center gap-3"
            >
              <span className="relative z-10">{uiContent?.buttonProjects || "View Projects"}</span>
              <ArrowRight className="w-6 h-6 relative z-10 group-hover:translate-x-1 transition-transform" />
            </Link>

            <Link
              href="/contact"
              className="w-full sm:w-auto px-10 py-5 rounded-full border-[1.5px] border-white/40 bg-white/10 backdrop-blur-sm hover:bg-white/20 hover:scale-105 transition-all duration-300 text-white font-medium text-xl flex items-center justify-center shadow-lg hover:shadow-xl"
            >
              {uiContent?.buttonContact || "Get in Touch"}
            </Link>
          </motion.div>

        </SpotlightCard>
      </motion.div>
    </div>
  );
}
