"use client";

import ProjectCard from '@/components/ProjectCard';
import ScrollReveal from '@/components/ScrollReveal';
import { SectionTitle } from '@/components/ui/SectionTitle';
import { motion } from 'framer-motion';
import { useState, useMemo } from 'react';
import { Project, SiteUI } from '@/data/SiteContent';

interface ProjectsPageClientViewProps {
  projects: Project[];
  uiContent: SiteUI['projects'];
  sectionTitle?: string;
}

export default function ProjectsSection({ projects, uiContent, sectionTitle }: ProjectsPageClientViewProps) {
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

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

  const filteredProjects = useMemo(() => {
    if (selectedTags.length === 0) {
      return projects;
    }
    return projects.filter(project =>
      project.tags.some(tag => selectedTags.includes(tag))
    );
  }, [projects, selectedTags]);

  return (
    <section id="projects" className="container mx-auto px-4 py-24 md:py-32">
      <ScrollReveal width="100%">
        <SectionTitle
          title={sectionTitle || uiContent?.title || "FEATURED PROJECTS"}
          subtitle="A selection of my recent work."
        />
      </ScrollReveal>


      {
        allTags.length > 0 && (
          <ScrollReveal delay={0.2} width="100%" className="mb-8 md:mb-12 text-center">
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
          </ScrollReveal>
        )
      }

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10 max-w-7xl mx-auto">
        {filteredProjects.length > 0 ? (
          filteredProjects.map((project, index: number) => (
            <ScrollReveal key={project.id} delay={index * 0.1} width="100%" className="h-full">
              <ProjectCard
                title={project.title}
                description={project.description}
                imageUrl={project.imageUrl}
                tags={project.tags}
                githubLink={project.githubLink}
                demoLink={project.demoLink}
                imagePosition={project.imagePosition}
              />
            </ScrollReveal>
          ))
        ) : (
          <div className="col-span-full text-center py-20">
            <p className="text-white/60 text-lg">
              {uiContent?.noResults || "No projects match the selected filters."}
            </p>
          </div>
        )}
      </div>
    </section >
  );
}
