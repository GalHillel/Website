'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils'; // Assuming you have a utils file, if not I'll create it or inline it.
// I will create the utils file in the next step if it doesn't exist.

interface GlassCardProps {
    children: React.ReactNode;
    className?: string;
    hoverEffect?: boolean;
}

export const GlassCard = ({ children, className, hoverEffect = true }: GlassCardProps) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            whileHover={hoverEffect ? { scale: 1.02, translateY: -5 } : {}}
            className={cn(
                "relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl shadow-lg transition-all duration-300",
                "hover:border-white/20 hover:shadow-xl hover:shadow-purple-500/10",
                className
            )}
        >
            {/* Spotlight effect gradient */}
            <div className="pointer-events-none absolute -inset-px opacity-0 transition duration-300 group-hover:opacity-100"
                style={{
                    background: `radial-gradient(600px circle at var(--mouse-x, 0) var(--mouse-y, 0), rgba(255,255,255,0.06), transparent 40%)`
                }}
            />

            <div className="relative z-10">
                {children}
            </div>
        </motion.div>
    );
};
