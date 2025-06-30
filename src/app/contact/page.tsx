// @/app/contact/page.tsx
"use client";

import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import Link from 'next/link';
import siteContent from '@/entities/SiteContent.json';
import AnimatedSection from '@/components/AnimatedSection';
import { motion } from 'framer-motion';

const LinkedInIcon = () => <span className="text-2xl">🔗</span>;
const GitHubIcon = () => <span className="text-2xl">💻</span>;
const EmailIcon = () => <span className="text-2xl">✉️</span>;

export default function ContactPage() {
  // 🔧 Hook order must not change
  const { t } = useTranslation();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  // 🔒 Ensure siteContent is valid
  const user = siteContent?.user || {};
  const resumeUrl = siteContent?.resumeUrl || '';

  const EMAILJS_SERVICE_ID = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || 'YOUR_SERVICE_ID';
  const EMAILJS_TEMPLATE_ID = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || 'YOUR_TEMPLATE_ID';
  const EMAILJS_USER_ID = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || 'YOUR_PUBLIC_KEY';

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    if (
      EMAILJS_SERVICE_ID === 'YOUR_SERVICE_ID' ||
      EMAILJS_TEMPLATE_ID === 'YOUR_TEMPLATE_ID' ||
      EMAILJS_USER_ID === 'YOUR_PUBLIC_KEY'
    ) {
      alert(t('EmailJS is not configured. Please set up your EmailJS credentials.'));
      setIsSubmitting(false);
      setSubmitStatus('error');
      return;
    }

    import('emailjs-com')
      .then((emailjs) => {
        emailjs.sendForm(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, event.currentTarget, EMAILJS_USER_ID)
          .then(() => {
            setSubmitStatus('success');
            (event.target as HTMLFormElement).reset();
          })
          .catch((error) => {
            console.error('EmailJS error:', error.text);
            setSubmitStatus('error');
          })
          .finally(() => {
            setIsSubmitting(false);
            setTimeout(() => setSubmitStatus('idle'), 5000);
          });
      })
      .catch((err) => {
        console.error('EmailJS not found:', err);
        alert(t('Error sending message. EmailJS library might be missing.'));
        setIsSubmitting(false);
        setSubmitStatus('error');
      });
  };

  return (
    <AnimatedSection className="container mx-auto px-4 py-8 md:py-16">
      <h1 className="text-3xl md:text-4xl font-bold text-center mb-10 md:mb-16 text-gray-900 dark:text-white">
        {t('Get in Touch')}
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-start">
        <AnimatedSection delay={0.2} className="bg-white dark:bg-slate-800 p-6 sm:p-8 rounded-lg shadow-xl">
          <h2 className="text-2xl font-semibold mb-6 text-slate-800 dark:text-slate-100">
            {t('Send Me a Message')}
          </h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name */}
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                {t('Your Name')}
              </label>
              <input
                type="text"
                name="name"
                id="name"
                required
                placeholder={t('Enter your name')}
                className="w-full px-3 py-2 bg-white dark:bg-slate-700 border rounded-md shadow-sm text-sm text-slate-900 dark:text-slate-50 transition-colors"
              />
            </div>
            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                {t('Your Email')}
              </label>
              <input
                type="email"
                name="email"
                id="email"
                required
                placeholder={t('Enter your email address')}
                className="w-full px-3 py-2 bg-white dark:bg-slate-700 border rounded-md shadow-sm text-sm text-slate-900 dark:text-slate-50 transition-colors"
              />
            </div>
            {/* Message */}
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                {t('Your Message')}
              </label>
              <textarea
                name="message"
                id="message"
                rows={4}
                required
                placeholder={t('Write your message here...')}
                className="w-full px-3 py-2 bg-white dark:bg-slate-700 border rounded-md shadow-sm text-sm text-slate-900 dark:text-slate-50 transition-colors"
              ></textarea>
            </div>
            {/* Submit Button */}
            <div>
              <motion.button
                type="submit"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md transition"
              >
                {isSubmitting ? t('Sending...') : t('Send Message')}
              </motion.button>
            </div>
            {/* Status messages */}
            {submitStatus === 'success' && (
              <p className="mt-4 text-sm text-green-600 dark:text-green-400">
                {t('Message sent successfully! Thank you.')}
              </p>
            )}
            {submitStatus === 'error' && (
              <p className="mt-4 text-sm text-red-600 dark:text-red-400">
                {t('Failed to send message. Please try again later or contact me directly via email.')}
              </p>
            )}
          </form>
        </AnimatedSection>

        <AnimatedSection delay={0.4} className="space-y-6 text-slate-700 dark:text-slate-300">
          <h2 className="text-2xl font-semibold mb-6 text-slate-800 dark:text-slate-100">
            {t('Contact Information')}
          </h2>
          <p>{t('Feel free to reach out through any of these platforms.')}</p>

          <div className="space-y-4">
            {user.linkedin && (
              <motion.a href={user.linkedin} target="_blank" rel="noopener noreferrer" className="flex items-center p-3 bg-slate-50 dark:bg-slate-700/80 rounded-lg hover:shadow-md" whileHover={{ y: -2 }}>
                <LinkedInIcon />
                <span className="ml-3 font-medium text-blue-600 dark:text-blue-400">{t('LinkedIn Profile')}</span>
              </motion.a>
            )}
            {user.github && (
              <motion.a href={user.github} target="_blank" rel="noopener noreferrer" className="flex items-center p-3 bg-slate-50 dark:bg-slate-700/80 rounded-lg hover:shadow-md" whileHover={{ y: -2 }}>
                <GitHubIcon />
                <span className="ml-3 font-medium text-slate-800 dark:text-slate-200">{t('GitHub Profile')}</span>
              </motion.a>
            )}
            {user.email && (
              <motion.a href={`mailto:${user.email}`} className="flex items-center p-3 bg-slate-50 dark:bg-slate-700/80 rounded-lg hover:shadow-md" whileHover={{ y: -2 }}>
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
