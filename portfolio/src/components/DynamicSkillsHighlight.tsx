// @/components/DynamicSkillsHighlight.tsx
"use client";

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import siteContent from '@/entities/SiteContent.json';

// Extract a few key skills for highlighting, can be customized or fetched
const highlightedSkills = [
  siteContent.skills[0]?.items[0]?.name || "React", // Example: React
  siteContent.skills[1]?.items[0]?.name || "Node.js", // Example: Node.js
  siteContent.skills[0]?.items[1]?.name || "TypeScript", // Example: TypeScript
  siteContent.skills[1]?.items[2]?.name || "Python", // Example: Python
  siteContent.skills[0]?.items[2]?.name || "Next.js", // Example: Next.js
].filter(Boolean); // Filter out any undefined if skills array is short

const DynamicSkillsHighlight = () => {
  const { t } = useTranslation();
  const [currentSkillIndex, setCurrentSkillIndex] = useState(0);

  useEffect(() => {
    if (highlightedSkills.length === 0) return;
    const intervalId = setInterval(() => {
      setCurrentSkillIndex((prevIndex) => (prevIndex + 1) % highlightedSkills.length);
    }, 2500); // Change skill every 2.5 seconds

    return () => clearInterval(intervalId);
  }, []);

  if (highlightedSkills.length === 0) {
    return null; // Don't render if no skills to highlight
  }

  return (
    <div className="h-12 md:h-16 flex items-center justify-center overflow-hidden my-4 md:my-6"> {/* Vertical height for text */}
      <AnimatePresence mode="wait">
        <motion.span
          key={currentSkillIndex}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -20, opacity: 0 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="text-xl md:text-2xl lg:text-3xl font-semibold text-blue-600 dark:text-blue-400"
        >
          {t(highlightedSkills[currentSkillIndex])}
        </motion.span>
      </AnimatePresence>
    </div>
  );
};

export default DynamicSkillsHighlight;
