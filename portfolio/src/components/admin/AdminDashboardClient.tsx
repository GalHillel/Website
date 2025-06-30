// @/components/admin/AdminDashboardClient.tsx
"use client";

import { useState } from 'react';
import { useTranslation } from 'react-i18next';
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
  const { t } = useTranslation();
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
  const [content, setContent] = useState<SiteContentAdmin>(initialContent);
  const [isLoading, setIsLoading] = useState(false);

  // Generic input handler for nested properties (e.g., content.user.name)
  const handleNestedInputChange = (path: string, value: string) => {
    setContent(prevContent => {
      const keys = path.split('.');
      const newState = { ...prevContent };
      let currentLevel: any = newState;

      keys.forEach((key, index) => {
        if (index === keys.length - 1) {
          currentLevel[key] = value;
        } else {
          currentLevel[key] = { ...currentLevel[key] };
          currentLevel = currentLevel[key];
        }
      });
      return newState;
    });
  };

  const handleSave = async () => {
    setIsLoading(true);
    alert(t("Save functionality is not implemented in this phase. Data is in SiteContent.json."));
    console.log("Current content state to be saved:", content); // Log current state
    setIsLoading(false);
  };

  if (!content) {
    return <p>{t('Loading content editor...')}</p>;
  }

  return (
    <div className="space-y-8">
      {/* User Info Section */}
      <section className="p-6 bg-white dark:bg-slate-800 rounded-lg shadow-xl transition-colors duration-300">
        <h2 className="text-xl font-semibold mb-4 text-slate-800 dark:text-slate-100">{t('User Information')}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="userName" className="block text-sm font-medium text-slate-700 dark:text-slate-300">{t('Name')}</label>
            <input type="text" id="userName" value={content.user.name} onChange={(e) => handleNestedInputChange('user.name', e.target.value)}
                   className="mt-1 block w-full px-3 py-2 bg-slate-50 dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm text-slate-900 dark:text-slate-50 transition-colors duration-300" />
          </div>
          <div>
            <label htmlFor="userEmail" className="block text-sm font-medium text-slate-700 dark:text-slate-300">{t('Email')}</label>
            <input type="email" id="userEmail" value={content.user.email} onChange={(e) => handleNestedInputChange('user.email', e.target.value)}
                   className="mt-1 block w-full px-3 py-2 bg-slate-50 dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm text-slate-900 dark:text-slate-50 transition-colors duration-300" />
          </div>
          <div>
            <label htmlFor="userGithub" className="block text-sm font-medium text-slate-700 dark:text-slate-300">{t('GitHub Profile URL')}</label>
            <input type="url" id="userGithub" value={content.user.github} onChange={(e) => handleNestedInputChange('user.github', e.target.value)}
                   className="mt-1 block w-full px-3 py-2 bg-slate-50 dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm text-slate-900 dark:text-slate-50 transition-colors duration-300" />
          </div>
          <div>
            <label htmlFor="userLinkedin" className="block text-sm font-medium text-slate-700 dark:text-slate-300">{t('LinkedIn Profile URL')}</label>
            <input type="url" id="userLinkedin" value={content.user.linkedin} onChange={(e) => handleNestedInputChange('user.linkedin', e.target.value)}
                   className="mt-1 block w-full px-3 py-2 bg-slate-50 dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm text-slate-900 dark:text-slate-50 transition-colors duration-300" />
          </div>
          <div>
            <label htmlFor="userProfileImage" className="block text-sm font-medium text-slate-700 dark:text-slate-300">{t('Profile Image Path')}</label>
            <input type="text" id="userProfileImage" value={content.user.profileImage} onChange={(e) => handleNestedInputChange('user.profileImage', e.target.value)}
                   className="mt-1 block w-full px-3 py-2 bg-slate-50 dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm text-slate-900 dark:text-slate-50 transition-colors duration-300" />
          </div>
        </div>
      </section>

      {/* About Me Section */}
      <section className="p-6 bg-white dark:bg-slate-800 rounded-lg shadow-xl transition-colors duration-300">
        <h2 className="text-xl font-semibold mb-4 text-slate-800 dark:text-slate-100">{t('About Me Section')}</h2>
        <div className="mb-4">
          <label htmlFor="aboutBio" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">{t('Biography')}</label>
          <textarea id="aboutBio" value={content.about.bio} onChange={(e) => handleNestedInputChange('about.bio', e.target.value)} rows={5}
                    className="mt-1 block w-full px-3 py-2 bg-slate-50 dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm text-slate-900 dark:text-slate-50 transition-colors duration-300" />
        </div>
        <div className="mb-4">
          <label htmlFor="aboutEducation" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">{t('Education')}</label>
          <textarea id="aboutEducation" value={content.about.education} onChange={(e) => handleNestedInputChange('about.education', e.target.value)} rows={3}
                    className="mt-1 block w-full px-3 py-2 bg-slate-50 dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm text-slate-900 dark:text-slate-50 transition-colors duration-300" />
        </div>
        <div className="mb-4">
          <label htmlFor="aboutCsMath" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">{t('CS & Math Background')}</label>
          <textarea id="aboutCsMath" value={content.about.csMathBackground} onChange={(e) => handleNestedInputChange('about.csMathBackground', e.target.value)} rows={4}
                    className="mt-1 block w-full px-3 py-2 bg-slate-50 dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm text-slate-900 dark:text-slate-50 transition-colors duration-300" />
        </div>
      </section>

      {/* Hero Section Teasers */}
      <section className="p-6 bg-white dark:bg-slate-800 rounded-lg shadow-xl transition-colors duration-300">
        <h2 className="text-xl font-semibold mb-4 text-slate-800 dark:text-slate-100">{t('Hero Section Content')}</h2>
        <div className="mb-4">
          <label htmlFor="heroTagline" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">{t('Tagline')}</label>
          <input type="text" id="heroTagline" value={content.hero.tagline} onChange={(e) => handleNestedInputChange('hero.tagline', e.target.value)}
                 className="mt-1 block w-full px-3 py-2 bg-slate-50 dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm text-slate-900 dark:text-slate-50 transition-colors duration-300" />
        </div>
        <div className="mb-4">
          <label htmlFor="heroIntro" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">{t('Intro Text')}</label>
          <textarea id="heroIntro" value={content.hero.intro} onChange={(e) => handleNestedInputChange('hero.intro', e.target.value)} rows={3}
                    className="mt-1 block w-full px-3 py-2 bg-slate-50 dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm text-slate-900 dark:text-slate-50 transition-colors duration-300" />
        </div>
      </section>

      {/* Site Metadata Section */}
      <section className="p-6 bg-white dark:bg-slate-800 rounded-lg shadow-xl transition-colors duration-300">
        <h2 className="text-xl font-semibold mb-4 text-slate-800 dark:text-slate-100">{t('Site Metadata')}</h2>
        <div className="mb-4">
          <label htmlFor="metaTitle" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">{t('Site Title')}</label>
          <input type="text" id="metaTitle" value={content.metadata.title} onChange={(e) => handleNestedInputChange('metadata.title', e.target.value)}
                 className="mt-1 block w-full px-3 py-2 bg-slate-50 dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm text-slate-900 dark:text-slate-50 transition-colors duration-300" />
        </div>
        <div className="mb-4">
          <label htmlFor="metaDescription" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">{t('Site Description')}</label>
          <textarea id="metaDescription" value={content.metadata.description} onChange={(e) => handleNestedInputChange('metadata.description', e.target.value)} rows={3}
                    className="mt-1 block w-full px-3 py-2 bg-slate-50 dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm text-slate-900 dark:text-slate-50 transition-colors duration-300" />
        </div>
      </section>

      {/* Placeholder for Projects and Skills management - these are more complex */}
      <p className="text-center text-gray-500 dark:text-gray-400 italic">
        {t('Management for Projects and Skills will be implemented in a future phase.')}
      </p>


      <div className="mt-8 flex justify-end">
        <button
          onClick={handleSave}
          disabled={isLoading}
          className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-md shadow-md disabled:opacity-50 transition-colors"
        >
          {isLoading ? t('Saving...') : t('Save Changes (Not Implemented)')}
        </button>
      </div>
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
