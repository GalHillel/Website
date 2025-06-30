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
    document.documentElement.lang = i18n.language;
    document.documentElement.dir = i18n.language === 'he' ? 'rtl' : 'ltr';
  }, [i18n.language]);

  const changeLanguage = () => {
    const newLang = i18n.language === 'en' ? 'he' : 'en';
    i18n.changeLanguage(newLang);
    setIsMobileMenuOpen(false); // Close menu on language change
  };

  const toggleTheme = () => {
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

  if (!mounted) {
    // To prevent hydration mismatch and show a basic layout structure
    return (
      <header className="bg-gray-100 dark:bg-gray-900 shadow-md text-gray-700 dark:text-gray-200">
        <nav className="container mx-auto px-6 py-3 flex justify-between items-center h-[60px]"> {/* Fixed height */}
           <div className="text-xl font-semibold">Gal Hillel</div>
           <div className="w-6 h-6 bg-gray-300 dark:bg-gray-700 rounded"></div> {/* Placeholder for menu button */}
        </nav>
      </header>
    );
  }

  return (
    <header className="sticky top-0 z-50 bg-gray-100/80 dark:bg-gray-900/80 backdrop-blur-md shadow-md text-gray-700 dark:text-gray-200">
      <nav className="container mx-auto px-4 sm:px-6 py-3 flex justify-between items-center h-[60px]">
        <Link href="/" className="text-xl font-semibold hover:text-blue-500 dark:hover:text-blue-400 transition-colors" onClick={() => setIsMobileMenuOpen(false)}>
          {t('Gal Hillel')}
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex space-x-6 items-center">
          {navLinks.map(link => (
            <Link key={link.href} href={link.href} className="hover:text-blue-500 dark:hover:text-blue-400 transition-colors">
              {t(link.labelKey)}
            </Link>
          ))}
          <button
            onClick={changeLanguage}
            aria-label={t('Change language')}
            className="p-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
          >
            {t('EN/HE')}
          </button>
          <button
            onClick={toggleTheme}
            aria-label={t('Toggle theme')}
            className="p-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
          >
            {resolvedTheme === 'dark' ? '☀️' : '🌙'}
          </button>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center space-x-2">
           <button
            onClick={changeLanguage}
            aria-label={t('Change language')}
            className="p-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
          >
            {t('EN/HE')}
          </button>
          <button
            onClick={toggleTheme}
            aria-label={t('Toggle theme')}
            className="p-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
          >
            {resolvedTheme === 'dark' ? '☀️' : '🌙'}
          </button>
          <button
            onClick={toggleMobileMenu}
            aria-label={t('Toggle navigation menu')}
            className="p-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors z-20" // z-20 to be above menu
          >
            <HamburgerIcon open={isMobileMenuOpen} />
          </button>
        </div>
      </nav>

      {/* Mobile Menu Panel */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="md:hidden absolute top-[60px] left-0 right-0 bg-gray-100 dark:bg-gray-900 shadow-lg pb-4 z-10"
            style={{
              // Full viewport width for the menu background
              width: '100vw',
              // Position relative to viewport for full width
              position: 'fixed',
              // Correct left/right for fixed positioning
              left: 0,
              right: 0,
            }}
          >
            <div className="container mx-auto px-4 sm:px-6 flex flex-col items-center space-y-4 pt-4">
              {navLinks.map(link => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="py-2 text-lg hover:text-blue-500 dark:hover:text-blue-400 transition-colors w-full text-center"
                  onClick={toggleMobileMenu} // Close menu on link click
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
