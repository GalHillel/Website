'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/projects', label: 'Projects' },
  { href: '/skills', label: 'Skills' },
  { href: '/contact', label: 'Contact' },
];

const Header = () => {
  const pathname = usePathname();

  if (pathname.startsWith('/admin') || pathname.startsWith('/auth')) {
    return null;
  }

  return (
    <>
      {/* Desktop Floating Pill Header */}
      <div className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-full max-w-fit px-4 hidden md:block">
        <motion.header
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 260, damping: 20 }}
          className="flex items-center gap-1 p-1.5 rounded-full border border-white/20 bg-white/10 dark:bg-black/20 backdrop-blur-xl shadow-lg shadow-black/5"
        >
          <nav className="flex items-center gap-1">
            {navLinks.map(({ href, label }) => {
              const isActive = pathname === href;
              return (
                <Link
                  key={href}
                  href={href}
                  className={cn(
                    "relative px-5 py-2 text-sm font-medium transition-colors rounded-full",
                    isActive ? "text-white dark:text-white" : "text-gray-600 dark:text-white/60 hover:text-black dark:hover:text-white"
                  )}
                >
                  {isActive && (
                    <motion.div
                      layoutId="active-pill"
                      className="absolute inset-0 bg-black/5 dark:bg-white/10 rounded-full border border-black/5 dark:border-white/5"
                      transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                  <span className="relative z-10">{label}</span>
                </Link>
              );
            })}
          </nav>

          {/* Admin Link */}
          <Link
            href="/admin"
            className="ml-2 w-9 h-9 flex items-center justify-center rounded-full text-gray-500 dark:text-white/40 hover:text-black dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
            title="Admin"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="18" x="3" y="3" rx="2" ry="2" /><line x1="12" x2="12" y1="3" y2="21" /><path d="M3 14h18" /></svg>
          </Link>
        </motion.header>
      </div>
    </>
  );
};

export default Header;
