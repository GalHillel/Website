// @/components/admin/AdminDashboardClient.tsx
"use client";

import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import siteContentData from '@/entities/SiteContent.json'; // Import the raw data

// Define types for the content structure for better type safety (can be expanded)
interface BilingualText {
  en: string;
  he: string;
}
interface UserContent {
  name: string;
  email: string;
  github: string;
  linkedin: string;
  profileImage: string;
}
interface AboutContent {
  bio: BilingualText;
  education: BilingualText;
  csMathBackground: BilingualText;
}
// ... other types for projects, skills, etc.

interface SiteContent {
  user: UserContent;
  about: AboutContent;
  // ... other parts of the site content
}

const AdminDashboardClient = () => {
  const { t } = useTranslation();
  const [content, setContent] = useState<SiteContent>(siteContentData as SiteContent);
  const [isLoading, setIsLoading] = useState(false); // For future API calls

  // In a real app, you'd fetch this data, and have methods to save it.
  // For now, we're just reading the imported JSON.
  // const loadContent = async () => {
  //   setIsLoading(true);
  //   // Simulate API call or file read if it were dynamic
  //   // const response = await fetch('/api/content'); // Example API endpoint
  //   // const data = await response.json();
  //   // setContent(data);
  //   // setIsLoading(false);
  // };

  // useEffect(() => {
  //   // loadContent(); // If fetching dynamically
  // }, []);

  const handleInputChange = (section: keyof SiteContent, field: string, subField: keyof BilingualText | null, value: string) => {
    setContent(prevContent => {
      const updatedSection = { ...prevContent[section] };
      if (typeof updatedSection[field] === 'object' && subField) {
        (updatedSection[field] as BilingualText)[subField] = value;
      } else {
        updatedSection[field] = value;
      }
      return { ...prevContent, [section]: updatedSection };
    });
  };

  const handleUserInputChange = (field: keyof UserContent, value: string) => {
    setContent(prevContent => ({
      ...prevContent,
      user: {
        ...prevContent.user,
        [field]: value
      }
    }));
  };


  const handleSave = async () => {
    setIsLoading(true);
    alert(t("Save functionality is not implemented in this phase. Data is in SiteContent.json."));
    // In a real app:
    // try {
    //   const response = await fetch('/api/content', { // Example API endpoint
    //     method: 'POST',
    //     headers: { 'Content-Type': 'application/json' },
    //     body: JSON.stringify(content),
    //   });
    //   if (!response.ok) throw new Error('Failed to save content');
    //   alert(t('Content saved successfully!'));
    // } catch (error) {
    //   console.error("Save error:", error);
    //   alert(t('Error saving content.'));
    // }
    setIsLoading(false);
  };

  if (isLoading && !content) { // Added !content for initial load state
    return <p>{t('Loading content editor...')}</p>;
  }

  return (
    <div className="space-y-8">
      {/* User Info Section */}
      <section className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-100">{t('User Information')}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="userName" className="block text-sm font-medium text-gray-700 dark:text-gray-300">{t('Name')}</label>
            <input type="text" id="userName" value={content.user.name} onChange={(e) => handleUserInputChange('name', e.target.value)}
                   className="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm text-gray-900 dark:text-white" />
          </div>
          <div>
            <label htmlFor="userEmail" className="block text-sm font-medium text-gray-700 dark:text-gray-300">{t('Email')}</label>
            <input type="email" id="userEmail" value={content.user.email} onChange={(e) => handleUserInputChange('email', e.target.value)}
                   className="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm text-gray-900 dark:text-white" />
          </div>
          <div>
            <label htmlFor="userGithub" className="block text-sm font-medium text-gray-700 dark:text-gray-300">{t('GitHub Profile URL')}</label>
            <input type="url" id="userGithub" value={content.user.github} onChange={(e) => handleUserInputChange('github', e.target.value)}
                   className="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm text-gray-900 dark:text-white" />
          </div>
          <div>
            <label htmlFor="userLinkedin" className="block text-sm font-medium text-gray-700 dark:text-gray-300">{t('LinkedIn Profile URL')}</label>
            <input type="url" id="userLinkedin" value={content.user.linkedin} onChange={(e) => handleUserInputChange('linkedin', e.target.value)}
                   className="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm text-gray-900 dark:text-white" />
          </div>
          <div>
            <label htmlFor="userProfileImage" className="block text-sm font-medium text-gray-700 dark:text-gray-300">{t('Profile Image Path')}</label>
            <input type="text" id="userProfileImage" value={content.user.profileImage} onChange={(e) => handleUserInputChange('profileImage', e.target.value)}
                   className="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm text-gray-900 dark:text-white" />
            {/* Image upload UI will be more complex */}
          </div>
        </div>
      </section>

      {/* About Me Section */}
      <section className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-100">{t('About Me Section')}</h2>
        {/* Bio */}
        <div className="mb-4">
          <h3 className="text-lg font-medium text-gray-700 dark:text-gray-300 mb-1">{t('Biography')} (EN)</h3>
          <textarea value={content.about.bio.en} onChange={(e) => handleInputChange('about', 'bio', 'en', e.target.value)} rows={5}
                    className="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm text-gray-900 dark:text-white" />
        </div>
        <div className="mb-4">
          <h3 className="text-lg font-medium text-gray-700 dark:text-gray-300 mb-1">{t('Biography')} (HE)</h3>
          <textarea value={content.about.bio.he} onChange={(e) => handleInputChange('about', 'bio', 'he', e.target.value)} rows={5} dir="rtl"
                    className="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm text-gray-900 dark:text-white" />
        </div>
        {/* Education */}
        <div className="mb-4">
          <h3 className="text-lg font-medium text-gray-700 dark:text-gray-300 mb-1">{t('Education')} (EN)</h3>
          <textarea value={content.about.education.en} onChange={(e) => handleInputChange('about', 'education', 'en', e.target.value)} rows={3}
                    className="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm text-gray-900 dark:text-white" />
        </div>
        <div className="mb-4">
          <h3 className="text-lg font-medium text-gray-700 dark:text-gray-300 mb-1">{t('Education')} (HE)</h3>
          <textarea value={content.about.education.he} onChange={(e) => handleInputChange('about', 'education', 'he', e.target.value)} rows={3} dir="rtl"
                    className="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm text-gray-900 dark:text-white" />
        </div>
        {/* CS & Math Background */}
        <div className="mb-4">
          <h3 className="text-lg font-medium text-gray-700 dark:text-gray-300 mb-1">{t('CS & Math Background')} (EN)</h3>
          <textarea value={content.about.csMathBackground.en} onChange={(e) => handleInputChange('about', 'csMathBackground', 'en', e.target.value)} rows={4}
                    className="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm text-gray-900 dark:text-white" />
        </div>
        <div className="mb-4">
          <h3 className="text-lg font-medium text-gray-700 dark:text-gray-300 mb-1">{t('CS & Math Background')} (HE)</h3>
          <textarea value={content.about.csMathBackground.he} onChange={(e) => handleInputChange('about', 'csMathBackground', 'he', e.target.value)} rows={4} dir="rtl"
                    className="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm text-gray-900 dark:text-white" />
        </div>
      </section>

      {/* Placeholder for other sections: Projects, Skills, Hero, Metadata etc. */}
      {/* These will be more complex due to arrays of objects, image uploads etc. */}

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

// New/updated translation keys for Admin:
// "Loading content editor..."
// "User Information"
// "Name", "Email", "GitHub Profile URL", "LinkedIn Profile URL", "Profile Image Path" (labels for user fields)
// "About Me Section" (title for this part of the form)
// "Biography", "Education", "CS & Math Background" (already exist, used as sub-headers)
// "Saving...", "Save Changes (Not Implemented)"
// "Save functionality is not implemented in this phase. Data is in SiteContent.json." (alert)
// "Content saved successfully!", "Error saving content." (for future actual save)
// "(EN)", "(HE)" will be appended to labels by convention, not separate keys.
// The "Edit About Me", "Manage Projects" etc. from AdminPage.tsx are for the navigation/overview, not this specific form.
