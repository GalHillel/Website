// @/components/SkillsPageClientView.tsx
"use client";

import AnimatedSection from '@/components/AnimatedSection';
import { motion } from 'framer-motion';
import SpotlightCard from '@/components/SpotlightCard';
import { SkillCategory as SkillCategoryType, SkillItem as SkillItemType } from '@/entities/SiteContent';

interface SkillBarProps {
  name: string;
  proficiency: number;
}

const SkillBar: React.FC<SkillBarProps> = ({ name, proficiency }) => {
  return (
    <motion.div
      className="mb-6 group"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex justify-between mb-2">
        <span className="text-base font-medium text-white/90 group-hover:text-white transition-colors">{name}</span>
        <span className="text-sm font-bold text-blue-300 group-hover:text-blue-200 transition-colors">{proficiency}%</span>
      </div>
      <div className="w-full bg-black/20 rounded-full h-3 backdrop-blur-sm border border-white/5 overflow-hidden relative">
        {/* Glowing Beam */}
        <motion.div
          className="absolute top-0 left-0 h-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${proficiency}%` }}
          transition={{ duration: 1.5, ease: "easeOut", delay: 0.2 }}
        >
          {/* Inner Glow/Shine */}
          <div className="absolute inset-0 bg-white/30 blur-[2px]" />

          {/* Leading Edge Glow */}
          <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-full bg-white blur-[4px]" />
        </motion.div>

        {/* Outer Glow (Simulated with shadow on container, but since overflow hidden, we do it differently or rely on the inner beam brightness) */}
      </div>
    </motion.div>
  );
};

interface SkillsPageClientViewProps {
  skillsData: SkillCategoryType[];
}

export default function SkillsPageClientView({ skillsData }: SkillsPageClientViewProps) {
  return (
    <div className="container mx-auto px-4 py-8 md:py-16 pt-24">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="page-title-glow"
      >
        Technical Arsenal
      </motion.h1>

      <div className="space-y-10 max-w-6xl mx-auto">
        {skillsData.map((categoryGroup, index) => {
          const categoryName = categoryGroup.category;
          return (
            <AnimatedSection
              key={categoryName + index}
              delay={0.2 + index * 0.1}
            >
              <SpotlightCard className="p-8 md:p-10 relative overflow-hidden backdrop-blur-xl bg-black/40">
                {/* Decorative background blob */}
                <div className="absolute -top-20 -right-20 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

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
