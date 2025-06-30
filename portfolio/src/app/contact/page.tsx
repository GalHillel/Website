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
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  // Placeholders for EmailJS credentials - User needs to replace these
  const EMAILJS_SERVICE_ID = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || 'YOUR_SERVICE_ID';
  const EMAILJS_TEMPLATE_ID = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || 'YOUR_TEMPLATE_ID';
  const EMAILJS_USER_ID = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || 'YOUR_PUBLIC_KEY'; // Often called PublicKey or UserID

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    // Check if placeholder IDs are still being used
    if (EMAILJS_SERVICE_ID === 'YOUR_SERVICE_ID' || EMAILJS_TEMPLATE_ID === 'YOUR_TEMPLATE_ID' || EMAILJS_USER_ID === 'YOUR_PUBLIC_KEY') {
      alert(t('EmailJS is not configured. Please set up your EmailJS credentials.'));
      setIsSubmitting(false);
      setSubmitStatus('error'); // Or a specific 'not_configured' status
      return;
    }

    // Dynamically import emailjs to avoid issues if the package isn't installed (for dev purposes)
    // In a real scenario, you'd import it directly at the top.
    import('emailjs-com').then(emailjs => {
      emailjs.sendForm(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, event.currentTarget, EMAILJS_USER_ID)
        .then((result) => {
            console.log('EmailJS success:', result.text);
            setSubmitStatus('success');
            (event.target as HTMLFormElement).reset(); // Reset form on success
        }, (error) => {
            console.error('EmailJS error:', error.text);
            setSubmitStatus('error');
        })
        .finally(() => {
            setIsSubmitting(false);
            setTimeout(() => setSubmitStatus('idle'), 5000); // Reset status message after 5s
        });
    }).catch(err => {
        console.error("Failed to load emailjs-com. Is it installed?", err);
        alert(t("Error sending message. EmailJS library might be missing."));
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
        <AnimatedSection delay={0.2} className="bg-white dark:bg-slate-800 p-6 sm:p-8 rounded-lg shadow-xl transition-colors duration-300"> {/* Updated dark bg */}
          <h2 className="text-2xl font-semibold mb-6 text-slate-800 dark:text-slate-100">{t('Send Me a Message')}</h2> {/* Adjusted text color */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1"> {/* Adjusted text color */}
                {t('Your Name')}
              </label>
              <input
                type="text"
                name="name"
                id="name"
                required
                className="mt-1 block w-full px-3 py-2 bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm text-slate-900 dark:text-slate-50 placeholder-slate-400 dark:placeholder-slate-500 transition-colors duration-300" // Adjusted colors
                placeholder={t('Enter your name')}
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1"> {/* Adjusted text color */}
                {t('Your Email')}
              </label>
              <input
                type="email"
                name="email"
                id="email"
                required
                className="mt-1 block w-full px-3 py-2 bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm text-slate-900 dark:text-slate-50 placeholder-slate-400 dark:placeholder-slate-500 transition-colors duration-300" // Adjusted colors
                placeholder={t('Enter your email address')}
              />
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1"> {/* Adjusted text color */}
                {t('Your Message')}
              </label>
              <textarea
                name="message"
                id="message"
                required
                rows={4}
                className="mt-1 block w-full px-3 py-2 bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm text-slate-900 dark:text-slate-50 placeholder-slate-400 dark:placeholder-slate-500 transition-colors duration-300" // Adjusted colors
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
                {isSubmitting ? t('Sending...') : t('Send Message')}
              </motion.button>
            </div>
            {submitStatus === 'success' && (
              <p className="mt-4 text-sm text-green-600 dark:text-green-400">{t('Message sent successfully! Thank you.')}</p>
            )}
            {submitStatus === 'error' && (
              <p className="mt-4 text-sm text-red-600 dark:text-red-400">{t('Failed to send message. Please try again later or contact me directly via email.')}</p>
            )}
          </form>
        </AnimatedSection>

        <AnimatedSection delay={0.4} className="space-y-6 text-slate-700 dark:text-slate-300"> {/* Adjusted text color */}
          <h2 className="text-2xl font-semibold mb-6 text-slate-800 dark:text-slate-100">{t('Contact Information')}</h2> {/* Adjusted text color */}
          <p className="leading-relaxed">
            {t('Feel free to reach out through any of these platforms. I look forward to hearing from you!')}
          </p>
          <div className="space-y-4">
            {user.linkedin && (
              <motion.a
                href={user.linkedin} target="_blank" rel="noopener noreferrer"
                className="flex items-center p-3 bg-slate-50 dark:bg-slate-700/80 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-colors shadow-sm hover:shadow-md" // Adjusted colors
                whileHover={{ y: -2 }}
              >
                <LinkedInIcon />
                <span className="ml-3 font-medium text-blue-600 dark:text-blue-400">{t('LinkedIn Profile')}</span>
              </motion.a>
            )}
            {user.github && (
              <motion.a
                href={user.github} target="_blank" rel="noopener noreferrer"
                className="flex items-center p-3 bg-slate-50 dark:bg-slate-700/80 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-colors shadow-sm hover:shadow-md" // Adjusted colors
                whileHover={{ y: -2 }}
              >
                <GitHubIcon />
                <span className="ml-3 font-medium text-slate-800 dark:text-slate-200">{t('GitHub Profile')}</span>
              </motion.a>
            )}
            {user.email && (
              <motion.a
                href={`mailto:${user.email}`}
                className="flex items-center p-3 bg-slate-50 dark:bg-slate-700/80 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-colors shadow-sm hover:shadow-md" // Adjusted colors
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
