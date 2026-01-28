"use client";

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface TypewriterTaglineProps {
  text?: string;
  taglines?: string[];
  className?: string;
}

const TypewriterTagline = ({ text, taglines, className }: TypewriterTaglineProps) => {
  const [loopNum, setLoopNum] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  const phrases = taglines && taglines.length > 0
    ? taglines
    : text
      ? text.split('|').map(s => s.trim()).filter(s => s.length > 0)
      : [
        "Software Developer",
        "Problem Solver",
        "Classic Tech",
        "Creative Thinker"
      ];

  const period = 2000;
  const typingSpeed = 80;
  const deletingSpeed = 40;

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
    <div className={cn("flex items-center", className)}>
      <span className="text-xl md:text-2xl font-medium text-blue-400 tracking-wide">
        {currentText}
        <motion.span
          className="inline-block h-[1em] w-[2px] bg-blue-400 ml-1 align-middle"
          animate={{ opacity: [0, 1, 0] }}
          transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
        />
      </span>
    </div>
  );
};

export default TypewriterTagline;
