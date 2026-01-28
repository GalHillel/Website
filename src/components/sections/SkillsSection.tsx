"use client";

import ScrollReveal from '@/components/ScrollReveal';
import { motion } from 'framer-motion';
import SpotlightCard from '@/components/SpotlightCard';
import { SectionTitle } from '@/components/ui/SectionTitle';
import { SkillCategory as SkillCategoryType, SkillItem as SkillItemType, SiteUI } from '@/data/SiteContent';

interface SkillBarProps {
  name: string;
  proficiency: number;
}

const SkillBar: React.FC<SkillBarProps> = ({ name, proficiency }) => {
  return (
    <div className="mb-6 group">
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
          transition={{ duration: 1.0, ease: "easeOut", delay: 0.1 }}
        >
          {/* Inner Glow/Shine */}
          <div className="absolute inset-0 bg-white/30 blur-[2px]" />

          {/* Leading Edge Glow */}
          <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-full bg-white blur-[4px]" />
        </motion.div>
      </div>
    </div>
  );
};

interface SkillsPageClientViewProps {
  skillsData: SkillCategoryType[];
  uiContent: SiteUI['skills'];
  sectionTitle?: string;
}

export default function SkillsSection({ skillsData, uiContent, sectionTitle }: SkillsPageClientViewProps) {
  return (
    <section id="skills" className="container mx-auto px-4 py-24 md:py-32">
      <ScrollReveal width="100%">
        <SectionTitle
          title={sectionTitle || uiContent?.title || "TECHNICAL SKILLS"}
          subtitle="The technologies and tools I use."
        />
      </ScrollReveal>


      <div className="space-y-10 max-w-6xl mx-auto">
        {skillsData.map((categoryGroup, index) => {
          const categoryName = categoryGroup.category;
          return (
            <ScrollReveal
              key={categoryName + index}
              delay={0.2 + index * 0.1}
              width="100%"
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
                  {categoryGroup.items.map((skill: SkillItemType, skillIndex: number) => (
                    <SkillBar key={`${skill.name}-${skillIndex}`} name={skill.name} proficiency={skill.proficiency} />
                  ))}
                </div>
              </SpotlightCard>
            </ScrollReveal>
          );
        })}
      </div>
    </section >
  );
}
