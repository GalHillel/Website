// @/components/I18nProviderClientComponent.tsx
"use client"; // This must be a client component

import React, { useEffect } from 'react';
import { I18nextProvider, useTranslation } from 'react-i18next';
import i18n from '@/i18n'; // Your i18n configuration

interface I18nProviderClientComponentProps {
  children: React.ReactNode;
  locale: string; // Locale passed from the server component (layout)
}

const I18nInitializer: React.FC<{ locale: string }> = ({ locale }) => {
  const { i18n: i18nInstance } = useTranslation();

  useEffect(() => {
    if (i18nInstance.language !== locale) {
      i18nInstance.changeLanguage(locale);
    }
  }, [locale, i18nInstance]);

  // This component doesn't render anything itself, it just initializes i18n
  return null;
};

const I18nProviderClientComponent: React.FC<I18nProviderClientComponentProps> = ({ children, locale }) => {
  return (
    <I18nextProvider i18n={i18n}>
      <I18nInitializer locale={locale} />
      {children}
    </I18nextProvider>
  );
};

export default I18nProviderClientComponent;
