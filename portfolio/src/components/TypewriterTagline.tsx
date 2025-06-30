// @/components/TypewriterTagline.tsx
"use client";

import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';

const phrases = [
  "Software Developer", // Key for translation
  "Problem Solver",     // Key for translation
  "Tech Enthusiast",    // Key for translation
  "Creative Thinker"    // Key for translation
];

const TypewriterTagline = () => {
  const { t } = useTranslation();
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);

  const period = 1500; // Time to stay on full phrase
  const typingSpeed = 100; // Speed of typing
  const deletingSpeed = 50; // Speed of deleting

  useEffect(() => {
    const handleTyping = () => {
      const i = loopNum % phrases.length;
      const fullText = t(phrases[i]); // Get translated phrase

      setCurrentText(
        isDeleting
          ? fullText.substring(0, currentText.length - 1)
          : fullText.substring(0, currentText.length + 1)
      );

      if (!isDeleting && currentText === fullText) {
        setTimeout(() => setIsDeleting(true), period);
      } else if (isDeleting && currentText === '') {
        setIsDeleting(false);
        setLoopNum(loopNum + 1);
        setPhraseIndex((prevIndex) => (prevIndex + 1) % phrases.length); // Not strictly needed if using loopNum for phrase selection
      }
    };

    const typingTimeout = setTimeout(handleTyping, isDeleting ? deletingSpeed : typingSpeed);
    return () => clearTimeout(typingTimeout);
  }, [currentText, isDeleting, loopNum, t, phrases]);


  return (
    <div className="h-10 md:h-12 flex items-center justify-center overflow-hidden my-3 md:my-4"> {/* Adjusted height and margin */}
      <span className="text-xl md:text-2xl lg:text-3xl font-semibold text-blue-600 dark:text-blue-400">
        {currentText}
        <motion.span
          className="inline-block h-6 md:h-8 w-1 bg-blue-600 dark:bg-blue-400 ml-1" // Blinking cursor
          animate={{ opacity: [0, 1, 0] }}
          transition={{ duration: 0.8, repeat: Infinity, ease: "easeInOut" }}
        />
      </span>
    </div>
  );
};

export default TypewriterTagline;
