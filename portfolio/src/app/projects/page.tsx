// @/app/projects/page.tsx
"use client";

import { useTranslation } from 'react-i18next';
import ProjectCard from '@/components/ProjectCard';
import siteContent from '@/entities/SiteContent.json';
import AnimatedSection from '@/components/AnimatedSection';
import { motion } from 'framer-motion';
import { useState, useMemo } from 'react';

interface ProjectData {
  id: string;
  title: { en: string; he: string };
  description: { en: string; he: string };
  imageUrl?: string | null;
  tags: string[];
  githubLink?: string;
  demoLink?: string;
}

export default function ProjectsPage() {
  const { t } = useTranslation();
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const projects: ProjectData[] = siteContent.projects as ProjectData[];

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

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1, // Stagger animation for each card
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <AnimatedSection className="container mx-auto px-4 py-8 md:py-16">
      <h1 className="text-3xl md:text-4xl font-bold text-center mb-10 md:mb-16 text-gray-900 dark:text-white">
        {t('My Projects')}
      </h1>

      {allTags.length > 0 && (
        <AnimatedSection delay={0.2} className="mb-8 md:mb-12 text-center">
          <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-200">{t('Filter by Technology')}</h2>
          <div className="flex flex-wrap justify-center gap-2">
            {allTags.map(tag => (
              <motion.button
                key={tag}
                onClick={() => toggleTag(tag)}
                aria-pressed={selectedTags.includes(tag)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors
                  ${selectedTags.includes(tag)
                    ? 'bg-blue-600 text-white ring-2 ring-blue-400 dark:ring-blue-600'
                    : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600'}`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {t(tag) || tag}
              </motion.button>
            ))}
          </div>
          {selectedTags.length > 0 && (
            <button
              onClick={() => setSelectedTags([])}
              className="mt-6 text-sm text-blue-600 dark:text-blue-400 hover:underline"
            >
              {t('Clear Filters')}
            </button>
          )}
        </AnimatedSection>
      )}

      {filteredProjects.length > 0 ? (
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {filteredProjects.map((project) => (
            <motion.div key={project.id} variants={cardVariants}>
              <ProjectCard
                title={project.title}
                description={project.description}
                imageUrl={project.imageUrl}
                tags={project.tags}
                githubLink={project.githubLink}
                demoLink={project.demoLink}
              />
            </motion.div>
          ))}
        </motion.div>
      ) : (
        <p className="text-center text-gray-600 dark:text-gray-400 text-lg mt-8">
          {selectedTags.length > 0
            ? t('No projects match the selected filters.')
            : t('No projects available at the moment. Please check back later!')}
        </p>
      )}
    </AnimatedSection>
  );
}
