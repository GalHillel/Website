// @/components/ProjectsPageClientView.tsx
"use client";

import ProjectCard from '@/components/ProjectCard';
import AnimatedSection from '@/components/AnimatedSection';
import { motion } from 'framer-motion';
import { useState, useMemo, useEffect } from 'react';
import { Project, SiteUI } from '@/data/SiteContent';

interface ProjectsPageClientViewProps {
  projects: Project[];
  uiContent: SiteUI['projects'];
}

export default function ProjectsPageClientView({ projects, uiContent }: ProjectsPageClientViewProps) {
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  // Derive all unique tags from the immutable projects prop
  const allTags = useMemo(() => {
    const tagsSet = new Set<string>();
    projects.forEach(project => {
      project.tags.forEach(tag => tagsSet.add(tag));
    });
    return Array.from(tagsSet).sort();
  }, [projects]);

  const toggleTag = (tag: string) => {
    setSelectedTags(prev =>
      prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
    );
  };

  // Derive filtered projects on the fly - never store in state
  const filteredProjects = useMemo(() => {
    if (selectedTags.length === 0) {
      return projects;
    }
    return projects.filter(project =>
      project.tags.some(tag => selectedTags.includes(tag))
    );
  }, [projects, selectedTags]);

  return (
    <div className="container mx-auto px-4 py-8 md:py-16">
      <h1 className="page-title-glow">
        {uiContent?.title || "My Projects"}
      </h1>

      {allTags.length > 0 && (
        <AnimatedSection delay={0.2} className="mb-8 md:mb-12 text-center">
          <h2 className="text-xl font-semibold mb-6 text-white/80">{uiContent?.filterTitle || "Filter by Technology"}</h2>
          <div className="flex flex-wrap justify-center gap-2 max-w-2xl mx-auto">
            {allTags.map(tag => (
              <motion.button
                key={tag}
                onClick={() => toggleTag(tag)}
                aria-pressed={selectedTags.includes(tag)}
                className={`px-4 py-1.5 rounded-full text-xs md:text-sm font-medium transition-all backdrop-blur-md border
                  ${selectedTags.includes(tag)
                    ? 'bg-white text-black border-white shadow-[0_0_15px_rgba(255,255,255,0.3)]'
                    : 'bg-white/10 text-white border-white/10 hover:bg-white/20 hover:border-white/30'}`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {tag}
              </motion.button>
            ))}
          </div>
          {selectedTags.length > 0 && (
            <button
              onClick={() => setSelectedTags([])}
              className="mt-6 text-sm text-blue-300 hover:text-blue-200 hover:underline transition-colors"
            >
              {uiContent?.clearFilters || "Clear Filters"}
            </button>
          )}
        </AnimatedSection>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 max-w-7xl mx-auto">
        {filteredProjects.length > 0 ? (
          filteredProjects.map((project) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
              className="h-full"
            >
              <ProjectCard
                title={project.title}
                description={project.description}
                imageUrl={project.imageUrl}
                tags={project.tags}
                githubLink={project.githubLink}
                demoLink={project.demoLink}
                imagePosition={project.imagePosition}
              />
            </motion.div>
          ))
        ) : (
          <div className="col-span-full text-center py-20">
            <p className="text-white/60 text-lg">
              {uiContent?.noResults || "No projects match the selected filters."}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
