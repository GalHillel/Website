// @/components/Footer.tsx
"use client"; // Required for hooks

import Link from 'next/link';
import { useTranslation } from 'react-i18next';

const Footer = () => {
  const { t } = useTranslation();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-100 dark:bg-slate-900 text-slate-600 dark:text-slate-400 py-8 text-center transition-colors duration-300">
      <div className="container mx-auto px-6">
        <div className="mb-4">
          <Link href="https://github.com/GalHillel" target="_blank" rel="noopener noreferrer" className="hover:text-blue-500 dark:hover:text-blue-400 mx-2">
            {t('GitHub')}
          </Link>
          <Link href="https://linkedin.com/in/galhillel1" target="_blank" rel="noopener noreferrer" className="hover:text-blue-500 dark:hover:text-blue-400 mx-2">
            {t('LinkedIn')}
          </Link>
          <a href="mailto:galh2011@icloud.com" className="hover:text-blue-500 dark:hover:text-blue-400 mx-2">
            {t('Email')}
          </a>
        </div>
        <p>{t('copyRight', { year: currentYear })}</p>
      </div>
    </footer>
  );
};

export default Footer;
