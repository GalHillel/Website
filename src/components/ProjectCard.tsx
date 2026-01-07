// @/components/ProjectCard.tsx
"use client";

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import SpotlightCard from '@/components/SpotlightCard';

interface ProjectCardProps {
  title: string;
  description: string;
  imageUrl?: string | null;
  tags: string[];
  githubLink?: string;
  demoLink?: string;
  imagePosition?: 'top' | 'center' | 'bottom';
}

const ProjectCard: React.FC<ProjectCardProps> = ({
  title,
  description,
  imageUrl,
  tags,
  githubLink,
  demoLink,
  imagePosition,
}) => {
  return (
    <motion.div
      whileHover={{ y: -10, scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className="h-full"
    >
      <SpotlightCard className={cn(
        "h-full flex flex-col overflow-hidden group relative transition-all duration-500 backdrop-blur-xl bg-white/5 border border-white/10 shadow-xl",
        "hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.3)]",
        "hover:border-white/30"
      )}>
        {/* Glow Effect on Hover */}
        <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/0 to-white/0 group-hover:to-white/5 transition-all duration-500 pointer-events-none" />

        {imageUrl ? (
          <div className="relative w-full h-48 sm:h-56 overflow-hidden rounded-t-2xl">
            <Image
              src={imageUrl}
              alt={title || 'Project image'}
              fill
              className={cn("transition-transform duration-700 ease-out group-hover:scale-110 object-cover",
                imagePosition === 'top' ? 'object-top' :
                  imagePosition === 'bottom' ? 'object-bottom' : 'object-center'
              )}
            />
            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors duration-500" />
          </div>
        ) : (
          <div className="w-full h-48 sm:h-56 bg-white/5 flex items-center justify-center border-b border-white/5">
            <span className="text-white/40 font-medium">No Image Available</span>
          </div>
        )}

        <div className="p-6 flex-grow flex flex-col justify-between relative z-10">
          <div>
            <h3 className="text-xl sm:text-2xl font-bold mb-2 text-white group-hover:text-blue-300 transition-colors duration-300">{title}</h3>
            <p className="text-white/70 text-sm mb-5 min-h-[60px] line-clamp-3 leading-relaxed">
              {description}
            </p>
            <div className="mb-4 flex flex-wrap gap-2 pb-2">
              {tags.map((tag) => (
                <span
                  key={tag}
                  className="inline-block bg-white/5 text-white/80 rounded-full px-3 py-1 text-xs font-medium border border-white/10 group-hover:border-white/20 transition-colors"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <div className="flex flex-wrap gap-3 mt-auto pt-4 border-t border-white/10">
            {githubLink && (
              <Link
                href={githubLink}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 rounded-lg text-xs font-bold border border-white/20 bg-white/5 hover:bg-white/10 text-white transition-all hover:scale-105"
              >
                GitHub
              </Link>
            )}
            {demoLink && (
              <Link
                href={demoLink}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 rounded-lg text-xs font-bold border border-white/20 bg-white/10 hover:bg-white/20 text-blue-200 hover:text-white transition-all hover:scale-105"
              >
                Live Demo
              </Link>
            )}
          </div>
        </div>
      </SpotlightCard>
    </motion.div>
  );
};

export default ProjectCard;
