// @/app/about/page.tsx
// This is now a Server Component

import fs from 'fs/promises';
import path from 'path';
import AboutPageClientView from '@/components/AboutPageClientView';
import { SiteContent, UserContent, AboutContent } from '@/entities/SiteContent'; // Import types

async function getSiteContent(): Promise<SiteContent | null> {
  const filePath = path.join(process.cwd(), 'src', 'entities', 'SiteContent.json');
  try {
    const fileContent = await fs.readFile(filePath, 'utf-8');
    const jsonData: SiteContent = JSON.parse(fileContent);
    return jsonData;
  } catch (error) {
    console.error('Failed to load site content for About page:', error);
    return null;
  }
}

export default async function AboutPage() {
  const siteContent = await getSiteContent();

  if (!siteContent) {
    return (
      <div className="container mx-auto px-4 py-8 md:py-16 text-center">
        <p className="text-xl text-red-500">Failed to load page content. Please try again later.</p>
      </div>
    );
  }

  const userContent: UserContent = siteContent.user;
  const aboutContent: AboutContent = siteContent.about;

  return <AboutPageClientView user={userContent} about={aboutContent} />;
}
