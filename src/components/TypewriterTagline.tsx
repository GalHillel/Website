// @/components/TypewriterTagline.tsx
"use client";

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface TypewriterTaglineProps {
  text?: string;
  taglines?: string[];
}

const TypewriterTagline = ({ text, taglines }: TypewriterTaglineProps) => {
  const [loopNum, setLoopNum] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  // Parse phrases from text prop or use defaults
  const phrases = taglines && taglines.length > 0
    ? taglines
    : text
      ? text.split('|').map(s => s.trim()).filter(s => s.length > 0)
      : [
        "Software Developer",
        "Problem Solver",
        "Tech Enthusiast",
        "Creative Thinker"
      ];

  const period = 1500; // ms to pause at full word
  const typingSpeed = 100;
  const deletingSpeed = 50;

  useEffect(() => {
    if (phrases.length === 0) return;

    const i = loopNum % phrases.length;
    const fullText = phrases[i];

    const updateText = () => {
      const updatedText = isDeleting
        ? fullText.substring(0, currentText.length - 1)
        : fullText.substring(0, currentText.length + 1);
      setCurrentText(updatedText);

      if (!isDeleting && updatedText === fullText) {
        setTimeout(() => setIsDeleting(true), period);
      } else if (isDeleting && updatedText === '') {
        setIsDeleting(false);
        setLoopNum(prev => prev + 1);
      }
    };

    const timeout = setTimeout(updateText, isDeleting ? deletingSpeed : typingSpeed);
    return () => clearTimeout(timeout);
  }, [currentText, isDeleting, loopNum, phrases]);

  return (
    <div className="h-10 md:h-12 flex items-center justify-center overflow-hidden my-3 md:my-4">
      <span className="text-xl md:text-2xl lg:text-3xl font-semibold text-blue-600 dark:text-blue-400">
        {currentText}
        <motion.span
          className="inline-block h-6 md:h-8 w-1 bg-blue-600 dark:bg-blue-400 ml-1"
          animate={{ opacity: [0, 1, 0] }}
          transition={{ duration: 1.0, repeat: Infinity, ease: "linear" }} // Smoother/slower pulse
        />
      </span>
    </div>
  );
};

export default TypewriterTagline;
