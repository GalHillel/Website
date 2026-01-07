'use client';

import React, { MouseEvent } from 'react';
import { motion, useMotionTemplate, useMotionValue } from "framer-motion";
import { cn } from '@/lib/utils';

interface SpotlightCardProps extends React.HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode;
    className?: string;
    spotlightColor?: string;
}

export default function SpotlightCard({
    children,
    className,
    spotlightColor = 'rgba(255, 255, 255, 0.15)',
    ...props
}: SpotlightCardProps) {
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    function handleMouseMove({ currentTarget, clientX, clientY }: MouseEvent) {
        let { left, top } = currentTarget.getBoundingClientRect();
        mouseX.set(clientX - left);
        mouseY.set(clientY - top);
    }

    return (
        <div
            className={cn(
                "group relative rounded-2xl border border-white/10 bg-black/20 overflow-hidden",
                className
            )}
            onMouseMove={handleMouseMove}
            {...props}
        >
            <motion.div
                className="pointer-events-none absolute -inset-px opacity-0 transition duration-300 group-hover:opacity-100 hidden md:block"
                style={{
                    background: useMotionTemplate`
                        radial-gradient(
                        650px circle at ${mouseX}px ${mouseY}px,
                        ${spotlightColor},
                        transparent 80%
                        )
                    `,
                }}
            />

            {/* Content */}
            <div className="relative h-full">
                {children}
            </div>
        </div>
    );
}
