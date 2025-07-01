// @/app/page.tsx
// This is now a Server Component by default (removed "use client")

import fs from 'fs/promises'; // Use promise-based fs for async/await
import path from 'path';
import HomePageClientView from '@/components/HomePageClientView';
import { SiteContent, HeroContent } from '@/entities/SiteContent'; // Import types

// Helper function to read and parse JSON data
// This function will run on the server.
async function getSiteContent(): Promise<SiteContent | null> {
  const filePath = path.join(process.cwd(), 'src', 'entities', 'SiteContent.json');
  try {
    const fileContent = await fs.readFile(filePath, 'utf-8');
    const jsonData: SiteContent = JSON.parse(fileContent);
    return jsonData;
  } catch (error) {
    console.error('Failed to load site content for Home page:', error);
    // In a real app, you might want to throw the error or return a specific error object
    // For now, returning null or a default structure might be an option,
    // or handle this in the component that uses this data.
    return null;
  }
}

export default async function HomePage() {
  const siteContent = await getSiteContent();

  if (!siteContent) {
    // Render some fallback UI or an error message
    return (
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-12rem)] text-center px-4">
        <p className="text-xl text-red-500">Failed to load page content. Please try again later.</p>
      </div>
    );
  }

  // Pass only the necessary data to the client component
  const heroContent: HeroContent = siteContent.hero;
  // You could also pass siteContent.user.name if needed by HomePageClientView, for example.

  return <HomePageClientView heroContent={heroContent} />;
}
