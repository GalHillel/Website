"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { useState, useEffect } from 'react';

interface HeaderProps {
  navLinks?: { href: string; label: string }[];
}

const Header = ({ navLinks }: HeaderProps) => {
  const defaultNavLinks = [
    { href: '#about', label: 'About', id: 'about' },
    { href: '#skills', label: 'Skills', id: 'skills' },
    { href: '#projects', label: 'Projects', id: 'projects' },
    { href: '#contact', label: 'Contact', id: 'contact' },
  ];

  const links = defaultNavLinks;
  const pathname = usePathname();
  const [activeHash, setActiveHash] = useState<string>('about');
  const [scrolled, setScrolled] = useState(false);

  const isAdmin = pathname?.startsWith('/admin') || pathname?.startsWith('/auth');

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      const y = element.getBoundingClientRect().top + window.pageYOffset - 100;
      window.scrollTo({ top: y, behavior: 'smooth' });
      setActiveHash(id);
    }
  };

  useEffect(() => {
    if (isAdmin) return;

    const handleScroll = () => {
      setScrolled(window.scrollY > 50);

      const sections = ['about', 'skills', 'projects', 'contact'];
      const scrollPosition = window.scrollY + 150;

      for (const sectionId of sections) {
        const element = document.getElementById(sectionId);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveHash(sectionId);
          }
        }
      }

      if (window.scrollY < 100) {
        setActiveHash('about');
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isAdmin]);


  if (isAdmin) {
    return null;
  }

  return (
    <>
      {}
      <div className={cn(
        "hidden md:block fixed top-4 left-1/2 -translate-x-1/2 z-50 w-auto max-w-[600px] transition-all duration-300",
        scrolled ? "top-4" : "top-6"
      )}>
        <motion.header
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 260, damping: 20 }}
          className="flex items-center justify-between md:justify-center gap-1 p-1.5 rounded-full border border-white/5 bg-black/60 backdrop-blur-2xl shadow-xl shadow-black/20 ring-1 ring-white/5"
        >
          <nav className="flex items-center gap-1 p-1 w-full md:w-auto justify-between md:justify-start overflow-x-auto no-scrollbar mask-grad">
            {links.map((link) => {
              const isActive = activeHash === link.id;

              return (
                <a
                  key={link.id}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.id)}
                  className={cn(
                    "relative px-4 md:px-6 py-2 text-xs md:text-sm font-medium transition-all duration-300 rounded-full cursor-pointer whitespace-nowrap tracking-wide",
                    isActive ? "text-white" : "text-white/50 hover:text-white"
                  )}
                >
                  {isActive && (
                    <motion.div
                      layoutId="active-pill"
                      className="absolute inset-0 bg-white/10 rounded-full border border-white/5 shadow-inner"
                      transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                  <span className="relative z-10">{link.label}</span>
                </a>
              );
            })}
          </nav>

          {}
          <Link
            href="/admin"
            className="ml-2 w-8 h-8 flex-shrink-0 flex items-center justify-center rounded-full text-white/20 hover:text-white hover:bg-white/10 transition-colors"
            title="Admin Dashboard"
            aria-label="Admin Dashboard"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="18" x="3" y="3" rx="2" ry="2" /><line x1="12" x2="12" y1="3" y2="21" /><path d="M3 14h18" /></svg>
          </Link>
        </motion.header>
      </div>
    </>
  );
};

export default Header;
