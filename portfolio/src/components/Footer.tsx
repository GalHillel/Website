// @/components/Footer.tsx
"use client"; // Required for hooks

import Link from 'next/link';
import { useTranslation } from 'react-i18next';

const Footer = () => {
  const { t } = useTranslation();
  const { user } = siteContent; // Get user data for links
  const currentYear = new Date().getFullYear();

  // Social Links Data - can be expanded
  const socialLinks = [
    { name: 'GitHub', href: user.github, icon: 'GH' }, // Simple text icon
    { name: 'LinkedIn', href: user.linkedin, icon: 'LI' }, // Simple text icon
    { name: 'Email', href: `mailto:${user.email}`, icon: '✉️' }
  ];

  return (
    <footer className="bg-slate-100 dark:bg-slate-950 text-slate-500 dark:text-slate-400 border-t border-slate-200 dark:border-slate-800 transition-colors duration-300">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-sm text-center md:text-left">
            {t('copyRight', { year: currentYear })}
          </p>

          <div className="flex space-x-5 items-center">
            {socialLinks.map(link => (
              <a
                key={link.name}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={t(link.name)}
                className="text-slate-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors text-xl" // Increased icon size
              >
                {/* If actual icons were used, they'd go here. For now, text or emoji. */}
                {link.name === 'Email' ? link.icon : t(link.name)}
              </a>
            ))}
            {/* Optional: Theme toggle in footer if desired, though it's in header */}
            {/* <button onClick={() => console.log('Theme toggle in footer')} className="p-2 rounded-full hover:bg-slate-200 dark:hover:bg-slate-800"> T </button> */}
          </div>
        </div>
        {/* Optional: Add a small "Made with..." or "Hosted on..." line if desired */}
        {/* <p className="text-xs text-center mt-6">
          Powered by Next.js & Tailwind CSS
        </p> */}
      </div>
    </footer>
  );
};

export default Footer;
