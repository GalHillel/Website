// @/components/Layout.tsx
import React from 'react';
import Header from './Header';
import Footer from './Footer';
import ScrollToTopButton from './ScrollToTopButton';
import { UserContent } from '@/entities/SiteContent';

interface LayoutProps {
  children: React.ReactNode;
  user?: UserContent | null;
}

const Layout: React.FC<LayoutProps> = ({ children, user }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      {/* Added top padding to account for floating header */}
      <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
        {children}
      </main>
      <Footer user={user || null} />
      <ScrollToTopButton />
    </div>
  );
};

export default Layout;
