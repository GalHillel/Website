"use client";

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { ReactNode } from 'react';

interface GlassCardProps {
    children: ReactNode;
    className?: string;
    hoverEffect?: boolean;
}

export default function GlassCard({ children, className, hoverEffect = true }: GlassCardProps) {
    return (
        <motion.div
            whileHover={hoverEffect ? { y: -4, transition: { duration: 0.3, ease: "easeOut" } } : undefined}
            className={cn(
                "relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] backdrop-blur-xl",
                hoverEffect && "hover:bg-white/[0.05] hover:border-white/20 transition-all duration-300",
                className
            )}
        >
            {}
            <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-40" />

            <div className="relative z-10 h-full">
                {children}
            </div>
        </motion.div>
    );
}
