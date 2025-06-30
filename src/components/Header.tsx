// @/components/Header.tsx
"use client";

import Link from 'next/link';
import { useTranslation } from 'react-i18next';
import { useEffect, useState } from 'react';
import { useTheme } from 'next-themes';
import { motion, AnimatePresence } from 'framer-motion';

const HamburgerIcon = ({ open }: { open: boolean }) => (
  <div className="w-6 h-6 flex flex-col justify-around items-center cursor-pointer">
    <motion.span
      className="block h-0.5 w-6 bg-gray-900 dark:bg-gray-100 origin-center"
      animate={open ? { rotate: 45, y: 5.5 } : { rotate: 0, y: 0 }}
      transition={{ duration: 0.3 }}
    />
    <motion.span
      className="block h-0.5 w-6 bg-gray-900 dark:bg-gray-100"
      animate={open ? { opacity: 0 } : { opacity: 1 }}
      transition={{ duration: 0.3 }}
    />
    <motion.span
      className="block h-0.5 w-6 bg-gray-900 dark:bg-gray-100 origin-center"
      animate={open ? { rotate: -45, y: -5.5 } : { rotate: 0, y: 0 }}
      transition={{ duration: 0.3 }}
    />
  </div>
);

const Header = () => {
  const { t, i18n } = useTranslation();
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    setMounted(true);
    document.documentElement.lang = 'en';
    document.documentElement.dir = 'ltr';
  }, []);

  const toggleTheme = () => {
    if (!mounted) return;
    setTheme(resolvedTheme === 'dark' ? 'light' : 'dark');
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const navLinks = [
    { href: "/", labelKey: "Home" },
    { href: "/about", labelKey: "About" },
    { href: "/projects", labelKey: "Projects" },
    { href: "/skills", labelKey: "Skills" },
    { href: "/contact", labelKey: "Contact" },
  ];

  if (!mounted || !i18n.isInitialized) {
    // Placeholder while loading translation or theme
    return (
      <header className="bg-slate-100 dark:bg-slate-900 shadow-md text-slate-700 dark:text-slate-200">
        <nav className="container mx-auto px-4 sm:px-6 py-3 flex justify-between items-center h-[60px]">
          <div className="text-xl font-semibold animate-pulse">Gal Hillel</div>
          <div className="flex space-x-2">
            <div className="w-8 h-8 bg-slate-300 dark:bg-slate-700 rounded-md animate-pulse"></div>
            <div className="w-8 h-8 bg-slate-300 dark:bg-slate-700 rounded-md animate-pulse"></div>
            <div className="w-6 h-6 bg-slate-300 dark:bg-slate-700 rounded-md animate-pulse md:hidden"></div>
          </div>
        </nav>
      </header>
    );
  }

  return (
    <header className="sticky top-0 z-50 bg-slate-50/90 dark:bg-slate-900/90 backdrop-blur-md shadow-md text-slate-900 dark:text-slate-100 transition-colors duration-300 border-b border-slate-200 dark:border-slate-700">
      <nav className="container mx-auto px-4 sm:px-6 py-4 flex justify-between items-center h-[68px]">
        <Link
          href="/"
          className="text-2xl font-extrabold hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
          onClick={() => setIsMobileMenuOpen(false)}
          aria-label={t('Go to homepage')}
        >
          Gal Hillel
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-8 items-center">
          {navLinks.map(({ href, labelKey }) => (
            <Link
              key={href}
              href={href}
              className="relative text-base font-medium text-slate-800 dark:text-slate-200 hover:text-blue-600 dark:hover:text-blue-400 transition-colors px-2 py-1 border-b-2 border-transparent hover:border-blue-500 dark:hover:border-blue-400"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {t(labelKey)}
            </Link>
          ))}
          <button
            onClick={toggleTheme}
            aria-label={t('Toggle theme')}
            className="p-2 rounded-full hover:bg-slate-300 dark:hover:bg-slate-700 transition-colors text-xl"
            title={t('Toggle light/dark theme')}
          >
            {resolvedTheme === 'dark' ? '☀️' : '🌙'}
          </button>
        </div>

        {/* Mobile Menu & Theme Toggle */}
        <div className="md:hidden flex items-center space-x-3">
          <button
            onClick={toggleTheme}
            aria-label={t('Toggle theme')}
            className="p-2 rounded-full hover:bg-slate-300 dark:hover:bg-slate-700 transition-colors text-xl"
            title={t('Toggle light/dark theme')}
          >
            {resolvedTheme === 'dark' ? '☀️' : '🌙'}
          </button>
          <button
            onClick={toggleMobileMenu}
            aria-label={t('Toggle navigation menu')}
            className="p-2 rounded-md hover:bg-slate-300 dark:hover:bg-slate-700 transition-colors z-30"
            title={t('Toggle navigation menu')}
          >
            <HamburgerIcon open={isMobileMenuOpen} />
          </button>
        </div>
      </nav>

      {/* Mobile Menu Panel */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="md:hidden absolute top-[68px] left-0 right-0 bg-slate-50 dark:bg-slate-900 shadow-lg pb-6 z-20 border-t border-slate-300 dark:border-slate-700"
          >
            <div className="container mx-auto px-4 sm:px-6 flex flex-col items-start space-y-3 pt-5">
              {navLinks.map(({ href, labelKey }) => (
                <Link
                  key={href}
                  href={href}
                  onClick={toggleMobileMenu}
                  className="w-full px-4 py-3 text-lg font-semibold text-slate-900 dark:text-slate-100 rounded-md hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
                >
                  {t(labelKey)}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
