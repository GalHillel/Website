// src/components/DynamicSkillsHighlight.tsx
'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// ✅ Use a safe, hardcoded list since i18n is removed
const highlightedSkills = [
  "React",
  "Node.js",
  "TypeScript",
  "Python",
  "Next.js"
];

const DynamicSkillsHighlight = () => {
  const [currentSkillIndex, setCurrentSkillIndex] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentSkillIndex((prevIndex) => (prevIndex + 1) % highlightedSkills.length);
    }, 2500);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="h-12 md:h-16 flex items-center justify-center overflow-hidden my-4 md:my-6">
      <AnimatePresence mode="wait">
        <motion.span
          key={currentSkillIndex}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -20, opacity: 0 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="text-xl md:text-2xl lg:text-3xl font-semibold text-blue-600 dark:text-blue-400"
        >
          {highlightedSkills[currentSkillIndex]}
        </motion.span>
      </AnimatePresence>
    </div>
  );
};

export default DynamicSkillsHighlight;
