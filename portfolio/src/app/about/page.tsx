// @/app/about/page.tsx
"use client";

import Image from 'next/image';
import { useTranslation } from 'react-i18next';
import siteContent from '@/entities/SiteContent.json';
import AnimatedSection from '@/components/AnimatedSection';

export default function AboutPage() {
  const { t, i18n } = useTranslation();
  const currentLang = i18n.language as keyof typeof siteContent.about.bio;

  const { user, about } = siteContent;

  const bioText = about.bio[currentLang] || about.bio.en;
  const educationText = about.education[currentLang] || about.education.en;
  const csMathText = about.csMathBackground[currentLang] || about.csMathBackground.en;
  const profileImageUrl = user.profileImage || "/placeholder-profile.jpg";

  return (
    <AnimatedSection className="container mx-auto px-4 py-8 md:py-16">
      <h1 className="text-3xl md:text-4xl font-bold text-center mb-10 md:mb-16 text-gray-900 dark:text-white">
        {t('About Me')}
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 items-start">
        {/* Profile Photo Section */}
        <AnimatedSection delay={0.2} className="md:col-span-1 flex flex-col items-center">
          <div className="w-48 h-48 md:w-64 md:h-64 relative rounded-full overflow-hidden shadow-lg mb-4 bg-gray-200 dark:bg-gray-700">
            <Image
              src={profileImageUrl}
              alt={t('Profile Photo Alt', { name: user.name }) || `${user.name} - Profile Photo`}
              layout="fill"
              objectFit="cover"
              className="rounded-full"
            />
          </div>
          <h2 className="text-2xl font-semibold text-center text-gray-800 dark:text-gray-200">{t(user.name)}</h2>
        </AnimatedSection>

        {/* Bio and Details Section */}
        <AnimatedSection delay={0.4} className="md:col-span-2 space-y-8">
          <section>
            <h3 className="text-xl md:text-2xl font-semibold mb-3 text-gray-800 dark:text-gray-200">{t('Biography')}</h3>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-justify">
              {bioText}
            </p>
          </section>

          <section>
            <h3 className="text-xl md:text-2xl font-semibold mb-3 text-gray-800 dark:text-gray-200">{t('Education')}</h3>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              {educationText}
            </p>
          </section>

          <section>
            <h3 className="text-xl md:text-2xl font-semibold mb-3 text-gray-800 dark:text-gray-200">{t('CS & Math Background')}</h3>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              {csMathText}
            </p>
          </section>
        </AnimatedSection>
      </div>
    </AnimatedSection>
  );
}
