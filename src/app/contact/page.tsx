// @/app/contact/page.tsx
"use client";

import { useState } from 'react';
// import { useTranslation } from 'react-i18next'; // Removed
import Link from 'next/link';
import siteContent from '@/entities/SiteContent.json';
import AnimatedSection from '@/components/AnimatedSection';
import { motion } from 'framer-motion';

// SVG Icons
const LinkedInIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="text-blue-600 dark:text-blue-400 group-hover:text-blue-700 dark:group-hover:text-blue-500 transition-colors">
    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
  </svg>
);

const GitHubIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="text-slate-700 dark:text-slate-300 group-hover:text-slate-800 dark:group-hover:text-slate-200 transition-colors">
    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
  </svg>
);

const EmailIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="text-red-500 dark:text-red-400 group-hover:text-red-600 dark:group-hover:text-red-500 transition-colors">
    <path d="M0 3v18h24v-18h-24zm21.518 2l-9.518 7.713-9.518-7.713h19.036zm-19.518 14v-11.817l10 8.104 10-8.104v11.817h-20z"/>
  </svg>
);

export default function ContactPage() {
  // const { t } = useTranslation(); // Removed
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
      alert('EmailJS is not configured. Please set up your EmailJS credentials.'); // Replaced t()
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
        alert('Error sending message. EmailJS library might be missing.'); // Replaced t()
        setIsSubmitting(false);
        setSubmitStatus('error');
      });
  };

  return (
    <AnimatedSection className="container mx-auto px-4 py-8 md:py-16">
      <h1 className="text-3xl md:text-4xl font-bold text-center mb-10 md:mb-16 text-gray-900 dark:text-white">
        Get in Touch {/* Replaced t() */}
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-start">
        <AnimatedSection delay={0.2} className="bg-white dark:bg-slate-800 p-6 sm:p-8 rounded-lg shadow-xl">
          <h2 className="text-2xl font-semibold mb-6 text-slate-800 dark:text-slate-100">
            Send Me a Message {/* Replaced t() */}
          </h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name */}
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                Your Name {/* Replaced t() */}
              </label>
              <input
                type="text"
                name="name"
                id="name"
                required
                placeholder="Enter your name" // Replaced t()
                className="w-full px-3 py-2 bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-md shadow-sm text-sm text-slate-900 dark:text-slate-50 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                Your Email {/* Replaced t() */}
              </label>
              <input
                type="email"
                name="email"
                id="email"
                required
                placeholder="Enter your email address" // Replaced t()
                className="w-full px-3 py-2 bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-md shadow-sm text-sm text-slate-900 dark:text-slate-50 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            {/* Message */}
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                Your Message {/* Replaced t() */}
              </label>
              <textarea
                name="message"
                id="message"
                rows={4}
                required
                placeholder="Write your message here..." // Replaced t()
                className="w-full px-3 py-2 bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-md shadow-sm text-sm text-slate-900 dark:text-slate-50 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              ></textarea>
            </div>
            {/* Submit Button */}
            <div>
              <motion.button
                type="submit"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-slate-800"
              >
                {isSubmitting ? 'Sending...' : 'Send Message'} {/* Replaced t() */}
              </motion.button>
            </div>
            {/* Status messages */}
            {submitStatus === 'success' && (
              <p className="mt-4 text-sm text-green-600 dark:text-green-400">
                Message sent successfully! Thank you. {/* Replaced t() */}
              </p>
            )}
            {submitStatus === 'error' && (
              <p className="mt-4 text-sm text-red-600 dark:text-red-400">
                Failed to send message. Please try again later or contact me directly via email. {/* Replaced t() */}
              </p>
            )}
          </form>
        </AnimatedSection>

        <AnimatedSection delay={0.4} className="space-y-6 text-slate-700 dark:text-slate-300">
          <h2 className="text-2xl font-semibold mb-6 text-slate-800 dark:text-slate-100">
            Contact Information {/* Replaced t() */}
          </h2>
          <p>Feel free to reach out through any of these platforms. I look forward to hearing from you!</p> {/* Replaced t() */}

          <div className="space-y-4">
            {user.linkedin && (
              <motion.a
                href={user.linkedin} target="_blank" rel="noopener noreferrer"
                className="group flex items-center p-3 bg-slate-100 dark:bg-slate-700/70 rounded-lg hover:shadow-lg hover:bg-slate-200 dark:hover:bg-slate-700 transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-slate-800"
                whileHover={{ y: -3, transition: { duration: 0.2 } }}
              >
                <LinkedInIcon />
                <span className="ml-3 font-medium text-blue-600 dark:text-blue-400 group-hover:text-blue-700 dark:group-hover:text-blue-500 transition-colors">LinkedIn Profile</span> {/* Replaced t() */}
              </motion.a>
            )}
            {user.github && (
              <motion.a
                href={user.github} target="_blank" rel="noopener noreferrer"
                className="group flex items-center p-3 bg-slate-100 dark:bg-slate-700/70 rounded-lg hover:shadow-lg hover:bg-slate-200 dark:hover:bg-slate-700 transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-slate-800"
                whileHover={{ y: -3, transition: { duration: 0.2 } }}
              >
                <GitHubIcon />
                <span className="ml-3 font-medium text-slate-800 dark:text-slate-200 group-hover:text-slate-900 dark:group-hover:text-slate-100 transition-colors">GitHub Profile</span> {/* Replaced t() */}
              </motion.a>
            )}
            {user.email && (
              <motion.a
                href={`mailto:${user.email}`}
                className="group flex items-center p-3 bg-slate-100 dark:bg-slate-700/70 rounded-lg hover:shadow-lg hover:bg-slate-200 dark:hover:bg-slate-700 transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-slate-800"
                whileHover={{ y: -3, transition: { duration: 0.2 } }}
              >
                <EmailIcon />
                <span className="ml-3 font-medium text-red-500 dark:text-red-400 group-hover:text-red-600 dark:group-hover:text-red-500 transition-colors">Send an Email</span> {/* Replaced t() */}
              </motion.a>
            )}
          </div>

          {resumeUrl && (
            <p className="mt-6 text-sm">
              You can also download my resume: {/* Replaced t() */}
              <Link
                href={resumeUrl} target="_blank" download
                className="text-blue-600 dark:text-blue-400 hover:underline font-semibold ml-1 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-blue-500 rounded-sm"
              >
                Download Resume {/* Replaced t() */}
              </Link>
            </p>
          )}
        </AnimatedSection>
      </div>
    </AnimatedSection>
  );
}
