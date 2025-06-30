// @/app/admin/page.tsx
"use client";

import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import AdminDashboardClient from '@/components/admin/AdminDashboardClient'; // Import the new component

// This would ideally be a more secure server-side check
const ADMIN_PASSWORD = process.env.NEXT_PUBLIC_ADMIN_PASSWORD || "admin123";

export default function AdminPage() {
  // const { t } = useTranslation(); // Removed duplicate
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Keep one
  const { t, i18n } = useTranslation(); // Keep this one as it includes i18n instance
  // const [isAuthenticated, setIsAuthenticated] = useState(false); // Removed duplicate state
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const sessionAuth = sessionStorage.getItem('adminAuthenticated');
    if (sessionAuth === 'true') {
      setIsAuthenticated(true);
    }
    // setIsLoading(false); // Defer this until i18n is also ready or checked
  }, []);

  // New useEffect to handle combined loading state based on mount and i18n readiness
  useEffect(() => {
    if (i18n.isInitialized) {
      setIsLoading(false);
    }
  }, [i18n.isInitialized]);

  const handlePasswordSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const password = (event.currentTarget.elements.namedItem('password') as HTMLInputElement).value;
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      sessionStorage.setItem('adminAuthenticated', 'true');
    } else {
      alert(t('Incorrect Password'));
    }
  };

  if (isLoading || !i18n.isInitialized) { // Combined check
    return <div className="flex justify-center items-center min-h-screen"><p>{t('Loading...')}</p></div>;
  }

  if (!isAuthenticated) {
    return (
      <div className="flex flex-col justify-center items-center min-h-screen bg-gray-100 dark:bg-gray-900 p-4">
        <div className="w-full max-w-xs p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md">
          <h1 className="text-2xl font-bold text-center mb-6 text-gray-900 dark:text-white">{t('Admin Login')}</h1>
          <form onSubmit={handlePasswordSubmit} className="space-y-4">
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                {t('Password')}
              </label>
              <input
                type="password"
                name="password"
                id="password"
                required
                className="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm text-gray-900 dark:text-white"
              />
            </div>
            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              {t('Login')}
            </button>
          </form>
        </div>
      </div>
    );
  }

  // Authenticated: Render the AdminDashboardClient
  return (
    <div className="container mx-auto px-4 py-8 md:py-16">
      <h1 className="text-3xl md:text-4xl font-bold text-center mb-10 md:mb-16 text-gray-900 dark:text-white">
        {t('Admin Dashboard')}
      </h1>
      <AdminDashboardClient />
    </div>
  );
}

// Translation keys used here are for the login part.
// AdminDashboardClient will manage its own text and potentially use its own t() scope or passed t().
