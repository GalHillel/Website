// @/app/projects/page.tsx
// This is now a Server Component

import fs from 'fs/promises';
import path from 'path';
import ProjectsPageClientView from '@/components/ProjectsPageClientView';
import { SiteContent, Project } from '@/entities/SiteContent'; // Import types

async function getSiteContent(): Promise<SiteContent | null> {
  const filePath = path.join(process.cwd(), 'src', 'entities', 'SiteContent.json');
  try {
    const fileContent = await fs.readFile(filePath, 'utf-8');
    const jsonData: SiteContent = JSON.parse(fileContent);
    return jsonData;
  } catch (error) {
    console.error('Failed to load site content for Projects page:', error);
    return null;
  }
}

export default async function ProjectsPage() {
  const siteContent = await getSiteContent();

  if (!siteContent || !siteContent.projects) {
    return (
      <div className="container mx-auto px-4 py-8 md:py-16 text-center">
        <p className="text-xl text-red-500">Failed to load projects. Please try again later.</p>
      </div>
    );
  }

  const projects: Project[] = siteContent.projects;

  return <ProjectsPageClientView projects={projects} />;
}
