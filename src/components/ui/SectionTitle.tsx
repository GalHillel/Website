import React from 'react';
import { cn } from '@/lib/utils';

interface SectionTitleProps {
    title: string;
    subtitle?: string;
    className?: string;
}

export const SectionTitle = ({ title, subtitle, className }: SectionTitleProps) => (
    <div className={cn("mb-16 md:mb-24 relative pl-6", className)}>
        {/* Decorative Vertical Line */}
        <div className="absolute left-0 top-1 h-12 w-1 bg-gradient-to-b from-blue-500 to-purple-600 rounded-full" />

        <h2 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-slate-400 tracking-tighter uppercase">
            {title}
        </h2>
        {subtitle && (
            <p className="text-slate-400 mt-3 text-lg font-light max-w-lg leading-relaxed tracking-wide">
                {subtitle}
            </p>
        )}
    </div>
);
