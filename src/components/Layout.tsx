// @/components/Layout.tsx
import React from 'react';
import Header from './Header';
import Footer from './Footer';
import ScrollToTopButton from './ScrollToTopButton';
import { SiteContent, UserContent, SiteUI } from '@/data/SiteContent';
import MobileBottomNav from './MobileBottomNav';

interface LayoutProps {
  children: React.ReactNode;
  user?: UserContent | null;
  ui?: SiteUI;
}

const Layout: React.FC<LayoutProps> = ({ children, user, ui }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header navLinks={ui?.navLinks} />
      {/* Added top padding to account for floating header on desktop, reduced on mobile */}
      <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-40 md:py-32">
        {children}
      </main>
      <Footer user={user || null} ui={ui?.footer} />
      <ScrollToTopButton />
      <MobileBottomNav />
    </div>
  );
};

export default Layout;
