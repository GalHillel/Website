// @/app/contact/page.tsx
"use client";

import { useTranslation } from 'react-i18next';
import Link from 'next/link';
import siteContent from '@/entities/SiteContent.json';
import AnimatedSection from '@/components/AnimatedSection';
import { motion } from 'framer-motion';


const LinkedInIcon = () => <span className="text-2xl">🔗</span>;
const GitHubIcon = () => <span className="text-2xl">💻</span>;
const EmailIcon = () => <span className="text-2xl">✉️</span>;

export default function ContactPage() {
  const { t } = useTranslation();
  const { user, resumeUrl } = siteContent;

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const data = Object.fromEntries(formData.entries());
    console.log("Form data:", data);
    alert(t("Form submission is not implemented yet."));
  };

  return (
    <AnimatedSection className="container mx-auto px-4 py-8 md:py-16">
      <h1 className="text-3xl md:text-4xl font-bold text-center mb-10 md:mb-16 text-gray-900 dark:text-white">
        {t('Get in Touch')}
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-start">
        <AnimatedSection delay={0.2} className="bg-white dark:bg-gray-800 p-6 sm:p-8 rounded-lg shadow-xl"> {/* Enhanced shadow */}
          <h2 className="text-2xl font-semibold mb-6 text-gray-800 dark:text-gray-100">{t('Send Me a Message')}</h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                {t('Your Name')}
              </label>
              <input
                type="text"
                name="name"
                id="name"
                required
                className="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500"
                placeholder={t('Enter your name')}
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                {t('Your Email')}
              </label>
              <input
                type="email"
                name="email"
                id="email"
                required
                className="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500"
                placeholder={t('Enter your email address')}
              />
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                {t('Your Message')}
              </label>
              <textarea
                name="message"
                id="message"
                required
                rows={4}
                className="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500"
                placeholder={t('Write your message here...')}
              ></textarea>
            </div>
            <div>
              <motion.button
                type="submit"
                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
              >
                {t('Send Message')}
              </motion.button>
            </div>
          </form>
        </AnimatedSection>

        <AnimatedSection delay={0.4} className="space-y-6 text-gray-700 dark:text-gray-300">
          <h2 className="text-2xl font-semibold mb-6 text-gray-800 dark:text-gray-100">{t('Contact Information')}</h2>
          <p className="leading-relaxed">
            {t('Feel free to reach out through any of these platforms. I look forward to hearing from you!')}
          </p>
          <div className="space-y-4">
            {user.linkedin && (
              <motion.a
                href={user.linkedin} target="_blank" rel="noopener noreferrer"
                className="flex items-center p-3 bg-gray-50 dark:bg-gray-700/60 hover:bg-gray-100 dark:hover:bg-gray-600/60 rounded-lg transition-colors shadow-sm hover:shadow-md"
                whileHover={{ y: -2 }}
              >
                <LinkedInIcon />
                <span className="ml-3 font-medium text-blue-600 dark:text-blue-400">{t('LinkedIn Profile')}</span>
              </motion.a>
            )}
            {user.github && (
              <motion.a
                href={user.github} target="_blank" rel="noopener noreferrer"
                className="flex items-center p-3 bg-gray-50 dark:bg-gray-700/60 hover:bg-gray-100 dark:hover:bg-gray-600/60 rounded-lg transition-colors shadow-sm hover:shadow-md"
                whileHover={{ y: -2 }}
              >
                <GitHubIcon />
                <span className="ml-3 font-medium text-gray-800 dark:text-gray-200">{t('GitHub Profile')}</span>
              </motion.a>
            )}
            {user.email && (
              <motion.a
                href={`mailto:${user.email}`}
                className="flex items-center p-3 bg-gray-50 dark:bg-gray-700/60 hover:bg-gray-100 dark:hover:bg-gray-600/60 rounded-lg transition-colors shadow-sm hover:shadow-md"
                whileHover={{ y: -2 }}
              >
                <EmailIcon />
                <span className="ml-3 font-medium text-red-600 dark:text-red-400">{t('Send an Email')}</span>
              </motion.a>
            )}
          </div>
          {resumeUrl && (
            <p className="mt-6 text-sm">
              {t('ResumeDownloadPrompt')}
                <Link href={resumeUrl} target="_blank" download className="text-blue-600 dark:text-blue-400 hover:underline font-semibold ml-1">
                  {t('Download Resume')}
              </Link>
            </p>
          )}
        </AnimatedSection>
      </div>
    </AnimatedSection>
  );
}
