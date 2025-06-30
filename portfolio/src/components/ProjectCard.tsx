// @/components/ProjectCard.tsx
"use client";

import Image from 'next/image';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion'; // Ensure motion is imported

interface ProjectCardProps {
  title: string;
  description: string; // Changed from BilingualText
  imageUrl?: string | null;
  tags: string[];
  githubLink?: string;
  demoLink?: string;
}

const ProjectCard: React.FC<ProjectCardProps> = ({
  title, // Now a string
  description, // Now a string
  imageUrl,
  tags,
  githubLink,
  demoLink,
}) => {
  const { t } = useTranslation(); // i18n instance no longer needed for content selection

  // title and description are now directly the English strings
  const displayTitle = title;
  const displayDescription = description;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={{ scale: 1.03, boxShadow: "0px 10px 20px rgba(0,0,0,0.1)", transition: { duration: 0.2 } }}
      className="bg-white dark:bg-slate-800 rounded-lg shadow-xl overflow-hidden flex flex-col h-full transition-colors duration-300" // Base shadow is shadow-xl
    >
      {imageUrl ? (
        <div className="relative w-full h-48 sm:h-56">
          <Image src={imageUrl} alt={displayTitle} layout="fill" objectFit="cover" />
        </div>
      ) : (
        <div className="w-full h-48 sm:h-56 bg-slate-200 dark:bg-slate-700 flex items-center justify-center transition-colors duration-300"> {/* Updated placeholder bg */}
          <span className="text-slate-500 dark:text-slate-400">{t('No Image')}</span>
        </div>
      )}
      <div className="p-6 flex-grow flex flex-col justify-between">
        <div>
          <h3 className="text-xl sm:text-2xl font-semibold mb-2 text-gray-900 dark:text-white">{displayTitle}</h3>
          <p className="text-gray-700 dark:text-gray-300 text-sm mb-4 min-h-[60px] overflow-y-auto"> {/* Min height for description consistency */}
            {displayDescription}
          </p>
          <div className="mb-4">
            {tags.map((tag) => (
              <span
                key={tag}
                className="inline-block bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded-full px-3 py-1 text-xs font-semibold mr-2 mb-2"
              >
                {t(tag) || tag} {/* Tags are still translated using t() as they are simple strings */}
              </span>
            ))}
          </div>
        </div>
        <div className="flex flex-wrap gap-2 mt-auto pt-4 border-t border-gray-200 dark:border-gray-700"> {/* Added top border for separation */}
          {githubLink && (
            <Link href={githubLink} target="_blank" rel="noopener noreferrer" className="text-sm bg-gray-700 hover:bg-gray-600 dark:bg-gray-600 dark:hover:bg-gray-500 text-white py-2 px-4 rounded-md transition-colors duration-300">
              {t('GitHub Repo')}
            </Link>
          )}
          {demoLink && (
            <Link href={demoLink} target="_blank" rel="noopener noreferrer" className="text-sm bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md transition-colors duration-300">
              {t('Live Demo')}
            </Link>
          )}
        </div>
      </div>
    </div>
    // </motion.div>
  );
};

export default ProjectCard;
