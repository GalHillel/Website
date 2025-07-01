// @/components/Header.tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { motion, AnimatePresence } from "framer-motion";

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
  const { theme, setTheme, resolvedTheme } = useTheme();
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    setMounted(true);
    document.documentElement.lang = "en";
    document.documentElement.dir = "ltr";
  }, []);

  const toggleTheme = () => {
    if (!mounted) return;
    setTheme(resolvedTheme === "dark" ? "light" : "dark");
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/projects", label: "Projects" },
    { href: "/skills", label: "Skills" },
    { href: "/contact", label: "Contact" },
  ];

  if (!mounted) {
    return (
      <header className="bg-slate-100 dark:bg-slate-900 shadow-md">
        <nav className="container mx-auto px-4 sm:px-6 py-4 flex justify-between items-center h-[68px] animate-pulse">
          <div className="h-8 w-40 rounded bg-gradient-to-r from-slate-200 via-slate-300 to-slate-200 dark:from-slate-700 dark:via-slate-600 dark:to-slate-700 bg-[length:200%_100%] animate-[shimmer_1.5s_infinite_linear]"></div>
          <div className="flex space-x-3">
            {[...Array(2)].map((_, i) => (
              <div
                key={i}
                className="w-8 h-8 rounded-full bg-gradient-to-r from-slate-200 via-slate-300 to-slate-200 dark:from-slate-700 dark:via-slate-600 dark:to-slate-700 bg-[length:200%_100%] animate-[shimmer_1.5s_infinite_linear]"
              />
            ))}
            <div className="w-6 h-6 rounded-md bg-gradient-to-r from-slate-200 via-slate-300 to-slate-200 dark:from-slate-700 dark:via-slate-600 dark:to-slate-700 bg-[length:200%_100%] animate-[shimmer_1.5s_infinite_linear] md:hidden" />
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
          className="text-2xl font-extrabold hover:text-blue-600 dark:hover:text-blue-400 transition-colors rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-slate-900"
          onClick={() => setIsMobileMenuOpen(false)}
          aria-label="Go to homepage"
        >
          Gal Hillel
        </Link>

        <div className="hidden md:flex space-x-8 items-center">
          {navLinks.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className={`relative text-base font-medium transition-colors px-2 py-1 border-b-2 ${
                pathname === href
                  ? "text-blue-600 dark:text-blue-400 border-blue-600 dark:border-blue-400"
                  : "text-slate-800 dark:text-slate-200 border-transparent hover:text-blue-600 dark:hover:text-blue-400 hover:border-blue-500 dark:hover:border-blue-400"
              } focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-slate-900 rounded-sm`}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {label}
            </Link>
          ))}
          <button
            onClick={toggleTheme}
            aria-label="Toggle theme"
            className="p-2 rounded-full hover:bg-slate-300 dark:hover:bg-slate-700 transition-colors text-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-slate-900"
            title="Toggle light/dark theme"
          >
            {resolvedTheme === "dark" ? "☀️" : "🌙"}
          </button>
        </div>

        <div className="md:hidden flex items-center space-x-3">
          <button
            onClick={toggleTheme}
            aria-label="Toggle theme"
            className="p-2 rounded-full hover:bg-slate-300 dark:hover:bg-slate-700 transition-colors text-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-slate-900"
            title="Toggle light/dark theme"
          >
            {resolvedTheme === "dark" ? "☀️" : "🌙"}
          </button>
          <button
            onClick={toggleMobileMenu}
            aria-label="Toggle navigation menu"
            className="p-2 rounded-md hover:bg-slate-300 dark:hover:bg-slate-700 transition-colors z-30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-slate-900"
            title="Toggle navigation menu"
          >
            <HamburgerIcon open={isMobileMenuOpen} />
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="md:hidden absolute top-[68px] left-0 right-0 bg-slate-50 dark:bg-slate-900 shadow-lg pb-6 z-20 border-t border-slate-300 dark:border-slate-700"
          >
            <div className="container mx-auto px-4 sm:px-6 flex flex-col items-start space-y-3 pt-5">
              {navLinks.map(({ href, label }) => (
                <Link
                  key={href}
                  href={href}
                  onClick={toggleMobileMenu}
                  className={`w-full px-4 py-3 text-lg font-semibold rounded-md transition-colors ${
                    pathname === href
                      ? "bg-blue-100 dark:bg-blue-800/50 text-blue-700 dark:text-blue-300"
                      : "text-slate-900 dark:text-slate-100 hover:bg-slate-200 dark:hover:bg-slate-700"
                  } focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-slate-900`}
                >
                  {label}
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
