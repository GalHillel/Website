// @/components/admin/AdminDashboardClient.tsx
"use client";

import { useEffect, useState } from 'react';
// import { useTranslation } from 'react-i18next'; // Removed
import siteContentData from '@/entities/SiteContent.json';

// Simplified types for English-only content
interface UserContent {
  name: string;
  email: string;
  github: string;
  linkedin: string;
  profileImage: string;
}
interface AboutContent {
  bio: string;
  education: string;
  csMathBackground: string;
}
interface HeroContent {
  tagline: string;
  intro: string;
}
interface Project {
  id: string;
  title: string;
  description: string;
  imageUrl?: string | null;
  tags: string[];
  githubLink?: string;
  demoLink?: string;
}
interface SkillItem {
  name: string;
  proficiency: number;
}
interface SkillCategory {
  category: string;
  items: SkillItem[];
}
interface SiteMetadata {
  title: string;
  description: string;
}
interface SiteContentAdmin {
  user: UserContent;
  hero: HeroContent;
  about: AboutContent;
  projects: Project[];
  skills: SkillCategory[];
  resumeUrl: string;
  metadata: SiteMetadata;
}

const AdminDashboardClient = () => {
  // const { t } = useTranslation(); // Removed
  // Ensure initial data conforms to SiteContentAdmin (important after JSON structure change)
  const initialContent: SiteContentAdmin = {
    user: siteContentData.user,
    hero: siteContentData.hero,
    about: siteContentData.about,
    projects: siteContentData.projects as Project[], // Type assertion might be needed if structure differs
    skills: siteContentData.skills as SkillCategory[], // Type assertion
    resumeUrl: siteContentData.resumeUrl,
    metadata: siteContentData.metadata,
  };
  const [content, setContent] = useState<SiteContentAdmin | null>(null); // Initialize as null
  const [isContentLoading, setIsContentLoading] = useState(true); // Renamed from isLoading
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'success' | 'error'>('idle');

  const localStorageKey = "adminSiteContent";

  // Load content on mount
  useEffect(() => {
    try {
      const storedContent = localStorage.getItem(localStorageKey);
      if (storedContent) {
        setContent(JSON.parse(storedContent));
      } else {
        setContent(initialContent);
      }
    } catch (error) {
      console.error("Error loading content from localStorage:", error);
      setContent(initialContent);
    }
    setIsContentLoading(false); // Use renamed state setter
  }, []);

  // Generic input handler for nested properties (e.g., content.user.name)
  const handleNestedInputChange = (path: string, value: string) => {
    setContent(prevContent => {
      if (!prevContent) return prevContent; // Guard if prevContent is null
      const keys = path.split('.');
      // Deep clone to avoid mutating state directly
      const newState: SiteContentAdmin = JSON.parse(JSON.stringify(prevContent));
      let currentLevel: any = newState;

      keys.forEach((key, index) => {
        if (index === keys.length - 1) {
          // Special handling for array fields (e.g., tags)
          if (key === "tags") {
            currentLevel[key] = value.split(',').map((tag: string) => tag.trim());
          } else if (
            key === "proficiency" &&
            typeof currentLevel[key] !== "undefined"
          ) {
            currentLevel[key] = Number(value);
          } else {
            currentLevel[key] = value;
          }
        } else {
          if (Array.isArray(currentLevel[key])) {
            // If the next key is an array index
            const nextKey = keys[index + 1];
            currentLevel[key] = [...currentLevel[key]];
            currentLevel = currentLevel[key][Number(nextKey)];
            // Skip the index key in the next iteration
            keys[index + 1] = undefined as any;
          } else {
            currentLevel[key] = { ...currentLevel[key] };
            currentLevel = currentLevel[key];
          }
        }
      });
      return newState;
    });
  };

  const handleSave = async () => {
    if (!content) return;
    setSaveStatus('saving');
    // setIsLoading(true); // No longer using component-wide isLoading for save operation
    try {
      localStorage.setItem(localStorageKey, JSON.stringify(content));
      // Simulate network delay for better UX on save
      await new Promise(resolve => setTimeout(resolve, 700));
      setSaveStatus('success');
      setTimeout(() => setSaveStatus('idle'), 3000); // Reset status after 3s
    } catch (error) {
      console.error("Error saving content to localStorage:", error);
      setSaveStatus('error');
      setTimeout(() => setSaveStatus('idle'), 5000); // Reset status after 5s
    }
    // setIsLoading(false); // No longer using component-wide isLoading for save operation
  };

  if (isContentLoading || !content) { // Use renamed state and updated loading check
    return <p className="text-center py-10">Loading content editor...</p>; // Replaced t()
  }

  return (
    <div className="space-y-8">
      <div className="p-4 bg-yellow-100 dark:bg-yellow-800/30 border-l-4 border-yellow-500 dark:border-yellow-400 rounded-md">
        <p className="text-sm text-yellow-700 dark:text-yellow-200">
          <strong>Note:</strong> Changes made here are saved locally in your browser (using localStorage) and will not affect the live website data or other users. This is for demonstration purposes only. {/* Replaced t() */}
        </p>
      </div>

      {/* User Info Section */}
      <section className="p-6 bg-white dark:bg-slate-800 rounded-lg shadow-xl transition-colors duration-300">
        <h2 className="text-xl font-semibold mb-4 text-slate-800 dark:text-slate-100">User Information</h2> {/* Replaced t() */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="userName" className="block text-sm font-medium text-slate-700 dark:text-slate-300">Name</label> {/* Replaced t() */}
            <input type="text" id="userName" value={content.user.name} onChange={(e) => handleNestedInputChange('user.name', e.target.value)}
                   className="mt-1 block w-full px-3 py-2 bg-slate-50 dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm text-slate-900 dark:text-slate-50 transition-colors duration-300" />
          </div>
          <div>
            <label htmlFor="userEmail" className="block text-sm font-medium text-slate-700 dark:text-slate-300">Email</label> {/* Replaced t() */}
            <input type="email" id="userEmail" value={content.user.email} onChange={(e) => handleNestedInputChange('user.email', e.target.value)}
                   className="mt-1 block w-full px-3 py-2 bg-slate-50 dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm text-slate-900 dark:text-slate-50 transition-colors duration-300" />
          </div>
          <div>
            <label htmlFor="userGithub" className="block text-sm font-medium text-slate-700 dark:text-slate-300">GitHub Profile URL</label> {/* Replaced t() */}
            <input type="url" id="userGithub" value={content.user.github} onChange={(e) => handleNestedInputChange('user.github', e.target.value)}
                   className="mt-1 block w-full px-3 py-2 bg-slate-50 dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm text-slate-900 dark:text-slate-50 transition-colors duration-300" />
          </div>
          <div>
            <label htmlFor="userLinkedin" className="block text-sm font-medium text-slate-700 dark:text-slate-300">LinkedIn Profile URL</label> {/* Replaced t() */}
            <input type="url" id="userLinkedin" value={content.user.linkedin} onChange={(e) => handleNestedInputChange('user.linkedin', e.target.value)}
                   className="mt-1 block w-full px-3 py-2 bg-slate-50 dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm text-slate-900 dark:text-slate-50 transition-colors duration-300" />
          </div>
          <div>
            <label htmlFor="userProfileImage" className="block text-sm font-medium text-slate-700 dark:text-slate-300">Profile Image Path</label> {/* Replaced t() */}
            <input type="text" id="userProfileImage" value={content.user.profileImage} onChange={(e) => handleNestedInputChange('user.profileImage', e.target.value)}
                   className="mt-1 block w-full px-3 py-2 bg-slate-50 dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm text-slate-900 dark:text-slate-50 transition-colors duration-300" />
          </div>
        </div>
      </section>

      {/* About Me Section */}
      <section className="p-6 bg-white dark:bg-slate-800 rounded-lg shadow-xl transition-colors duration-300">
        <h2 className="text-xl font-semibold mb-4 text-slate-800 dark:text-slate-100">About Me Section</h2> {/* Replaced t() */}
        <div className="mb-4">
          <label htmlFor="aboutBio" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Biography</label> {/* Replaced t() */}
          <textarea id="aboutBio" value={content.about.bio} onChange={(e) => handleNestedInputChange('about.bio', e.target.value)} rows={5}
                    className="mt-1 block w-full px-3 py-2 bg-slate-50 dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm text-slate-900 dark:text-slate-50 transition-colors duration-300" />
        </div>
        <div className="mb-4">
          <label htmlFor="aboutEducation" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Education</label> {/* Replaced t() */}
          <textarea id="aboutEducation" value={content.about.education} onChange={(e) => handleNestedInputChange('about.education', e.target.value)} rows={3}
                    className="mt-1 block w-full px-3 py-2 bg-slate-50 dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm text-slate-900 dark:text-slate-50 transition-colors duration-300" />
        </div>
        <div className="mb-4">
          <label htmlFor="aboutCsMath" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">CS & Math Background</label> {/* Replaced t() */}
          <textarea id="aboutCsMath" value={content.about.csMathBackground} onChange={(e) => handleNestedInputChange('about.csMathBackground', e.target.value)} rows={4}
                    className="mt-1 block w-full px-3 py-2 bg-slate-50 dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm text-slate-900 dark:text-slate-50 transition-colors duration-300" />
        </div>
      </section>

      {/* Hero Section Teasers */}
      <section className="p-6 bg-white dark:bg-slate-800 rounded-lg shadow-xl transition-colors duration-300">
        <h2 className="text-xl font-semibold mb-4 text-slate-800 dark:text-slate-100">Hero Section Content</h2> {/* Replaced t() */}
        <div className="mb-4">
          <label htmlFor="heroTagline" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Tagline</label> {/* Replaced t() */}
          <input type="text" id="heroTagline" value={content.hero.tagline} onChange={(e) => handleNestedInputChange('hero.tagline', e.target.value)}
                 className="mt-1 block w-full px-3 py-2 bg-slate-50 dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm text-slate-900 dark:text-slate-50 transition-colors duration-300" />
        </div>
        <div className="mb-4">
          <label htmlFor="heroIntro" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Intro Text</label> {/* Replaced t() */}
          <textarea id="heroIntro" value={content.hero.intro} onChange={(e) => handleNestedInputChange('hero.intro', e.target.value)} rows={3}
                    className="mt-1 block w-full px-3 py-2 bg-slate-50 dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm text-slate-900 dark:text-slate-50 transition-colors duration-300" />
        </div>
      </section>

      {/* Site Metadata Section */}
      <section className="p-6 bg-white dark:bg-slate-800 rounded-lg shadow-xl transition-colors duration-300">
        <h2 className="text-xl font-semibold mb-4 text-slate-800 dark:text-slate-100">Site Metadata</h2> {/* Replaced t() */}
        <div className="mb-4">
          <label htmlFor="metaTitle" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Site Title</label> {/* Replaced t() */}
          <input type="text" id="metaTitle" value={content.metadata.title} onChange={(e) => handleNestedInputChange('metadata.title', e.target.value)}
                 className="mt-1 block w-full px-3 py-2 bg-slate-50 dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm text-slate-900 dark:text-slate-50 transition-colors duration-300" />
        </div>
        <div className="mb-4">
          <label htmlFor="metaDescription" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Site Description</label> {/* Replaced t() */}
          <textarea id="metaDescription" value={content.metadata.description} onChange={(e) => handleNestedInputChange('metadata.description', e.target.value)} rows={3}
                    className="mt-1 block w-full px-3 py-2 bg-slate-50 dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm text-slate-900 dark:text-slate-50 transition-colors duration-300" />
        </div>
      </section>

      {/* Projects Section */}
      <section className="p-6 bg-white dark:bg-slate-800 rounded-lg shadow-xl transition-colors duration-300">
        <h2 className="text-xl font-semibold mb-4 text-slate-800 dark:text-slate-100">Manage Projects</h2> {/* Replaced t() */}
        {content.projects.map((project, projectIndex) => (
          <div key={project.id} className="mb-6 p-4 border border-slate-200 dark:border-slate-700 rounded-md">
            <h3 className="text-lg font-medium text-slate-700 dark:text-slate-300 mb-2">Project {projectIndex + 1}: {project.title}</h3> {/* Replaced t() */}
            {/* Title */}
            <div className="mb-2">
              <label htmlFor={`projectTitle-${project.id}`} className="block text-sm font-medium text-slate-700 dark:text-slate-300">Title</label> {/* Replaced t() */}
              <input type="text" id={`projectTitle-${project.id}`} value={project.title}
                     onChange={(e) => handleNestedInputChange(`projects.${projectIndex}.title`, e.target.value)}
                     className="mt-1 block w-full input-admin" />
            </div>
            {/* Description */}
            <div className="mb-2">
              <label htmlFor={`projectDesc-${project.id}`} className="block text-sm font-medium text-slate-700 dark:text-slate-300">Description</label> {/* Replaced t() */}
              <textarea id={`projectDesc-${project.id}`} value={project.description}
                        onChange={(e) => handleNestedInputChange(`projects.${projectIndex}.description`, e.target.value)} rows={3}
                        className="mt-1 block w-full input-admin" />
            </div>
            {/* Image URL */}
            <div className="mb-2">
              <label htmlFor={`projectImg-${project.id}`} className="block text-sm font-medium text-slate-700 dark:text-slate-300">Image URL</label> {/* Replaced t() */}
              <input type="text" id={`projectImg-${project.id}`} value={project.imageUrl || ''}
                     onChange={(e) => handleNestedInputChange(`projects.${projectIndex}.imageUrl`, e.target.value)}
                     className="mt-1 block w-full input-admin" />
            </div>
            {/* Tags (comma-separated string for simplicity in this UI) */}
            <div className="mb-2">
              <label htmlFor={`projectTags-${project.id}`} className="block text-sm font-medium text-slate-700 dark:text-slate-300">Tags (comma-separated)</label> {/* Replaced t() */}
              <input type="text" id={`projectTags-${project.id}`} value={project.tags.join(', ')}
                     onChange={(e) => handleNestedInputChange(`projects.${projectIndex}.tags`, e.target.value)}
                     className="mt-1 block w-full input-admin" />
            </div>
            {/* GitHub Link */}
            <div className="mb-2">
              <label htmlFor={`projectGithub-${project.id}`} className="block text-sm font-medium text-slate-700 dark:text-slate-300">GitHub Link</label> {/* Replaced t() */}
              <input type="url" id={`projectGithub-${project.id}`} value={project.githubLink || ''}
                     onChange={(e) => handleNestedInputChange(`projects.${projectIndex}.githubLink`, e.target.value)}
                     className="mt-1 block w-full input-admin" />
            </div>
            {/* Demo Link */}
            <div className="mb-2">
              <label htmlFor={`projectDemo-${project.id}`} className="block text-sm font-medium text-slate-700 dark:text-slate-300">Demo Link</label> {/* Replaced t() */}
              <input type="url" id={`projectDemo-${project.id}`} value={project.demoLink || ''}
                     onChange={(e) => handleNestedInputChange(`projects.${projectIndex}.demoLink`, e.target.value)}
                     className="mt-1 block w-full input-admin" />
            </div>
          </div>
        ))}
        {/* Add Project button - functionality deferred */}
        <p className="text-sm text-slate-500 dark:text-slate-400 italic mt-4">Adding or deleting projects requires more advanced state management and will be implemented later.</p> {/* Replaced t() */}
      </section>

      {/* Skills Section */}
      <section className="p-6 bg-white dark:bg-slate-800 rounded-lg shadow-xl transition-colors duration-300">
        <h2 className="text-xl font-semibold mb-4 text-slate-800 dark:text-slate-100">Manage Skills</h2> {/* Replaced t() */}
        {content.skills.map((skillCategory, categoryIndex) => (
          <div key={`skillcat-${categoryIndex}`} className="mb-6 p-4 border border-slate-200 dark:border-slate-700 rounded-md">
            {/* Category Name */}
            <div className="mb-2">
              <label htmlFor={`skillCategoryName-${categoryIndex}`} className="block text-sm font-medium text-slate-700 dark:text-slate-300">Category Name</label> {/* Replaced t() */}
              <input type="text" id={`skillCategoryName-${categoryIndex}`} value={skillCategory.category}
                     onChange={(e) => handleNestedInputChange(`skills.${categoryIndex}.category`, e.target.value)}
                     className="mt-1 block w-full input-admin" />
            </div>
            {/* Skills within Category */}
            <h4 className="text-md font-medium text-slate-600 dark:text-slate-400 mt-3 mb-2">Skills in this category:</h4> {/* Replaced t() */}
            {skillCategory.items.map((skillItem, itemIndex) => (
              <div key={`skillitem-${categoryIndex}-${itemIndex}`} className="grid grid-cols-2 gap-4 mb-2 items-center">
                <div>
                  <label htmlFor={`skillName-${categoryIndex}-${itemIndex}`} className="block text-xs font-medium text-slate-700 dark:text-slate-300">Skill Name</label> {/* Replaced t() */}
                  <input type="text" id={`skillName-${categoryIndex}-${itemIndex}`} value={skillItem.name}
                         onChange={(e) => handleNestedInputChange(`skills.${categoryIndex}.items.${itemIndex}.name`, e.target.value)}
                         className="mt-1 block w-full input-admin text-sm" />
                </div>
                <div>
                  <label htmlFor={`skillProficiency-${categoryIndex}-${itemIndex}`} className="block text-xs font-medium text-slate-700 dark:text-slate-300">Proficiency (%)</label> {/* Replaced t() */}
                  <input type="number" id={`skillProficiency-${categoryIndex}-${itemIndex}`} value={skillItem.proficiency}
                         min="0" max="100"
                         onChange={(e) => handleNestedInputChange(`skills.${categoryIndex}.items.${itemIndex}.proficiency`, e.target.value)}
                         className="mt-1 block w-full input-admin text-sm" />
                </div>
              </div>
            ))}
            {/* Add Skill Item button - functionality deferred */}
          </div>
        ))}
        {/* Add Skill Category button - functionality deferred */}
        <p className="text-sm text-slate-500 dark:text-slate-400 italic mt-4">Adding or deleting skills/categories requires more advanced state management and will be implemented later.</p> {/* Replaced t() */}
      </section>

      <div className="mt-8 flex justify-end">
        <button
          onClick={handleSave}
          disabled={saveStatus === 'saving'} // Button is disabled only when 'saving'
          className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-md shadow-md disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {saveStatus === 'saving' && 'Saving...'} {/* Replaced t() */}
          {saveStatus === 'success' && 'Saved Successfully!'} {/* Replaced t() */}
          {saveStatus === 'error' && 'Save Error!'} {/* Replaced t() */}
          {saveStatus === 'idle' && 'Save Local Changes'} {/* Replaced t() */}
        </button>
      </div>
      {saveStatus === 'error' && (
        <p className="text-sm text-red-500 dark:text-red-400 mt-2 text-right">Failed to save changes to local storage.</p> {/* Replaced t() */}
      )}
    </div>
  );
};

export default AdminDashboardClient;

// New/updated translation keys:
// "Hero Section Content", "Tagline", "Intro Text" (for hero form)
// "Site Metadata", "Site Title", "Site Description" (for metadata form)
// "Profile Image Path" (already added to i18n.js)
// "Management for Projects and Skills will be implemented in a future phase."
// Other keys for labels and section titles should already exist or be covered by general terms.
// Note: Removed (EN) / (HE) from labels as content is now English-only.
// The `handleNestedInputChange` is a generic way to update nested state.
// Type assertions for projects and skills in initialContent are temporary safety for differing structures during refactor.
// In a full system, data fetching and validation would be more robust.
