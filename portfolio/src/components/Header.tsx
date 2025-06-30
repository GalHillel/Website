// @/components/Header.tsx
"use client";

import Link from 'next/link';
import { useTranslation } from 'react-i18next';
import { useEffect, useState } from 'react';
import { useTheme } from 'next-themes';
import { motion, AnimatePresence } from 'framer-motion';

// Simple Hamburger Icon
const HamburgerIcon = ({ open }: { open: boolean }) => (
  <div className="w-6 h-6 flex flex-col justify-around items-center">
    <motion.span
      className="block h-0.5 w-6 bg-current"
      animate={open ? { rotate: 45, y: 5.5 } : { rotate: 0, y: 0 }}
    />
    <motion.span
      className="block h-0.5 w-6 bg-current"
      animate={open ? { opacity: 0 } : { opacity: 1 }}
    />
    <motion.span
      className="block h-0.5 w-6 bg-current"
      animate={open ? { rotate: -45, y: -5.5 } : { rotate: 0, y: 0 }}
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
    // Language is now fixed to 'en', dir to 'ltr'
    document.documentElement.lang = 'en';
    document.documentElement.dir = 'ltr';
  }, []); // No longer depends on i18n.language

  // const changeLanguage = () => { // Removed
  //   if (!i18n.isInitialized) return;
  //   const newLang = i18n.language === 'en' ? 'he' : 'en';
  //   i18n.changeLanguage(newLang);
  //   setIsMobileMenuOpen(false);
  // };

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

  // Placeholder to prevent errors if hooks aren't ready or component not mounted
  // This ensures all hooks are called unconditionally at the top.
  if (!mounted || !i18n.isInitialized) {
    return (
      // Use consistent theming for placeholder
      <header className="bg-slate-100 dark:bg-slate-900 shadow-md text-slate-700 dark:text-slate-200">
        <nav className="container mx-auto px-4 sm:px-6 py-3 flex justify-between items-center h-[60px]">
           <div className="text-xl font-semibold animate-pulse">Gal Hillel</div>
           <div className="flex space-x-2">
             <div className="w-8 h-8 bg-slate-300 dark:bg-slate-700 rounded-md animate-pulse"></div>
             <div className="w-8 h-8 bg-slate-300 dark:bg-slate-700 rounded-md animate-pulse"></div>
             <div className="w-6 h-6 bg-slate-300 dark:bg-slate-700 rounded-md animate-pulse md:hidden"></div> {/* Hamburger placeholder */}
           </div>
        </nav>
      </header>
    );
  }

  return (
    <header className="sticky top-0 z-50 bg-slate-50/80 dark:bg-slate-950/80 backdrop-blur-lg shadow-sm text-slate-700 dark:text-slate-200 transition-colors duration-300">
      <nav className="container mx-auto px-4 sm:px-6 py-3.5 flex justify-between items-center h-[64px]"> {/* Slightly taller header, adjusted padding */}
        <Link href="/" className="text-2xl font-bold text-slate-900 dark:text-slate-50 hover:text-blue-600 dark:hover:text-blue-400 transition-colors" onClick={() => setIsMobileMenuOpen(false)}>
          {t('Gal Hillel')} {/* Consider a distinct logo style if desired */}
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex space-x-7 items-center"> {/* Increased spacing */}
          {navLinks.map(link => (
            <Link key={link.href} href={link.href} className="text-base hover:text-blue-600 dark:hover:text-blue-400 transition-colors pb-1 border-b-2 border-transparent hover:border-blue-500 dark:hover:border-blue-400">
              {t(link.labelKey)}
            </Link>
          ))}
          <button
            onClick={toggleTheme}
            aria-label={t('Toggle theme')}
            className="p-2 rounded-full hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors text-lg" // Rounded full, larger icon if emoji
          >
            {resolvedTheme === 'dark' ? '☀️' : '🌙'}
          </button>
        </div>

        {/* Mobile Controls: Theme Toggle + Menu Button */}
        <div className="md:hidden flex items-center space-x-3">
          <button
            onClick={toggleTheme}
            aria-label={t('Toggle theme')}
            className="p-2 rounded-full hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors text-lg"
          >
            {resolvedTheme === 'dark' ? '☀️' : '🌙'}
          </button>
          <button
            onClick={toggleMobileMenu}
            aria-label={t('Toggle navigation menu')}
            className="p-2 rounded-md hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors z-20"
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
            animate={{ opacity: 1, height: 'auto' }} // Animate height for slide down
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="md:hidden absolute top-[63px] left-0 right-0 bg-slate-100 dark:bg-slate-900 shadow-xl pb-6 z-10 border-t border-slate-200 dark:border-slate-800"
            // Removed fixed positioning to allow content to push down if header is part of scroll
          >
            <div className="container mx-auto px-4 sm:px-6 flex flex-col items-start space-y-1 pt-4"> {/* Align items start */}
              {navLinks.map(link => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={toggleMobileMenu}
                  className="py-3 px-3 text-lg hover:bg-slate-200 dark:hover:bg-slate-800 hover:text-blue-600 dark:hover:text-blue-400 transition-colors w-full text-left rounded-md" // Full width, text-left
                >
                  {t(link.labelKey)}
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

// New translation key: "Toggle navigation menu"
