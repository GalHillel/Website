// @/components/AnimatedSection.tsx
"use client";

import { motion, useAnimation, Variants } from 'framer-motion';
import { useInView } from 'react-intersection-observer'; // If not installed, need to: npm install react-intersection-observer
import { useEffect } from 'react';

interface AnimatedSectionProps {
  children: React.ReactNode;
  className?: string;
  variants?: Variants;
  delay?: number;
  once?: boolean; // Whether the animation should only run once
  threshold?: number; // Intersection observer threshold
}

const defaultVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const AnimatedSection: React.FC<AnimatedSectionProps> = ({
  children,
  className,
  variants = defaultVariants,
  delay = 0,
  once = true,
  threshold = 0.1,
}) => {
  const controls = useAnimation();
  const [ref, inView] = useInView({ triggerOnce: once, threshold: threshold });

  useEffect(() => {
    if (inView) {
      controls.start('visible');
    } else if (!once) { // If not triggerOnce, allow animation to reverse if element scrolls out of view
      controls.start('hidden');
    }
  }, [controls, inView, once]);

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={variants}
      className={className}
      transition={{ delay: delay, ...variants.visible?.transition }} // Spread existing transition props
    >
      {children}
    </motion.div>
  );
};

export default AnimatedSection;
