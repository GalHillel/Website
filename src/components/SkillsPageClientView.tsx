// @/components/SkillsPageClientView.tsx
"use client";

import AnimatedSection from '@/components/AnimatedSection';
import { motion } from 'framer-motion';
import SpotlightCard from '@/components/SpotlightCard';
import { SkillCategory as SkillCategoryType, SkillItem as SkillItemType, SiteUI } from '@/data/SiteContent';

interface SkillBarProps {
  name: string;
  proficiency: number;
}

const SkillBar: React.FC<SkillBarProps> = ({ name, proficiency }) => {
  return (
    <motion.div
      className="mb-6 group"
      initial={{ opacity: 0, x: -10 }} // Reduced motion
      whileInView={{ opacity: 1, x: 0 }} // Use whileInView for lazy animation
      viewport={{ once: true, margin: "-50px" }} // Trigger once
      transition={{ duration: 0.4 }} // Faster default
    >
      <div className="flex justify-between mb-2">
        <span className="text-base font-bold text-white group-hover:text-cyan-100 transition-colors">{name}</span>
        <span className="text-sm font-medium text-blue-300 group-hover:text-blue-200 transition-colors mr-2">{proficiency}%</span>
      </div>
      <div className="w-full bg-black/20 rounded-full h-3 backdrop-blur-sm border border-white/5 overflow-hidden relative">
        {/* Glowing Beam */}
        <motion.div
          className="absolute top-0 left-0 h-full bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 rounded-full"
          initial={{ width: 0 }}
          whileInView={{ width: `${proficiency}%` }}
          viewport={{ once: true }}
          transition={{ duration: 1.0, ease: "easeOut", delay: 0.1 }} // Slightly faster
        >
          {/* Inner Glow/Shine */}
          <div className="absolute inset-0 bg-white/30 blur-[2px]" />

          {/* Leading Edge Glow - Hidden on mobile via CSS if needed, or kept subtle */}
          <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-full bg-white blur-[4px]" />
        </motion.div>

        {/* Outer Glow (Simulated with shadow on container, but since overflow hidden, we do it differently or rely on the inner beam brightness) */}
      </div>
    </motion.div>
  );
};

interface SkillsPageClientViewProps {
  skillsData: SkillCategoryType[];
  uiContent: SiteUI['skills'];
}

export default function SkillsPageClientView({ skillsData, uiContent }: SkillsPageClientViewProps) {
  return (
    <div className="container mx-auto px-4 py-8 md:py-16">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="page-title-glow"
      >
        {uiContent?.title || "Technical Arsenal"}
      </motion.h1>

      <div className="space-y-10 max-w-6xl mx-auto">
        {skillsData.map((categoryGroup, index) => {
          const categoryName = categoryGroup.category;
          return (
            <AnimatedSection
              key={categoryName + index}
              delay={0.2 + index * 0.1}
            >
              <SpotlightCard className="p-8 md:p-10 relative overflow-hidden backdrop-blur-xl bg-white/5 border border-white/10 shadow-xl">
                {/* Decorative background blob */}
                <div className="absolute -top-20 -right-20 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl pointer-events-none hidden md:block" />

                <h2 className="text-2xl md:text-3xl font-bold mb-10 text-white flex items-center relative z-10">
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-200 to-purple-200">
                    {categoryName}
                  </span>
                  <div className="h-px flex-grow bg-gradient-to-r from-white/20 to-transparent ml-6" />
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-16 gap-y-8 relative z-10">
                  {categoryGroup.items.map((skill: SkillItemType, skillIndex) => (
                    <SkillBar key={`${skill.name}-${skillIndex}`} name={skill.name} proficiency={skill.proficiency} />
                  ))}
                </div>
              </SpotlightCard>
            </AnimatedSection>
          );
        })}
      </div>
    </div>
  );
}
