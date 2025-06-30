// @/app/skills/page.tsx
"use client";

import { useTranslation } from 'react-i18next';
import siteContent from '@/entities/SiteContent.json';
import AnimatedSection from '@/components/AnimatedSection';
import { motion } from 'framer-motion';

interface SkillItem {
  name: string;
  proficiency: number;
}

interface SkillCategory {
  category: string; // Was bilingual { en: string; he: string; };
  items: SkillItem[];
}

const SkillBar: React.FC<{ name: string; proficiency: number }> = ({ name, proficiency }) => {
  const { t } = useTranslation();
  return (
    <motion.div
      className="mb-4"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex justify-between mb-1">
        <span className="text-base font-medium text-gray-700 dark:text-gray-300">{t(name) || name}</span>
        <span className="text-sm font-medium text-blue-700 dark:text-blue-400">{proficiency}%</span>
      </div>
      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
        <motion.div
          className="bg-gradient-to-r from-blue-500 to-purple-600 dark:from-blue-400 dark:to-purple-500 h-3 rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${proficiency}%` }}
          transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
          role="progressbar"
          aria-valuenow={proficiency}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label={t('Skill Proficiency: {{name}} {{proficiency}}%', { name: t(name) || name, proficiency: proficiency }) || `${name} ${proficiency}%`}
        />
      </div>
    </motion.div>
  );
};


export default function SkillsPage() {
  const { t } = useTranslation(); // i18n instance no longer needed for category name selection

  const skillsData: SkillCategory[] = siteContent.skills as unknown as SkillCategory[]; // Assert type after JSON change

  return (
    <AnimatedSection className="container mx-auto px-4 py-8 md:py-16">
      <h1 className="text-3xl md:text-4xl font-bold text-center mb-10 md:mb-16 text-gray-900 dark:text-white">
        {t('My Skills')}
      </h1>

      <div className="space-y-12">
        {skillsData.map((categoryGroup, index) => {
          const categoryName = categoryGroup.category; // Now directly the English string
          return (
            <AnimatedSection
              key={categoryName + index}
              delay={0.2 + index * 0.1} // Stagger category appearance
              className="p-6 md:p-8 bg-white dark:bg-slate-800 rounded-xl shadow-xl transition-colors duration-300" // Updated dark bg
            >
              <h2 className="text-2xl md:text-3xl font-semibold mb-8 text-slate-800 dark:text-slate-100 border-b-2 border-blue-500 dark:border-blue-400 pb-3"> {/* Adjusted text colors */}
                {categoryName}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-6">
                {categoryGroup.items.map((skill) => (
                  // Individual skill bars will animate themselves due to their own motion.div
                  <SkillBar key={skill.name} name={skill.name} proficiency={skill.proficiency} />
                ))}
              </div>
            </AnimatedSection>
          );
        })}
      </div>
    </AnimatedSection>
  );
}
