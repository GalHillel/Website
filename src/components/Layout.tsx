// @/components/Layout.tsx
import React from 'react';
import Header from './Header';
import Footer from './Footer';
import ScrollToTopButton from './ScrollToTopButton'; // Added

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    // Updated main background colors for a more modern dark theme
    <div className="flex flex-col min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-200 transition-colors duration-300">
      <Header />
      {/* Adjusted padding for main content area */}
      <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-16">
        {children}
      </main>
      <Footer />
      <ScrollToTopButton /> {/* Added */}
    </div>
  );
};

export default Layout;
