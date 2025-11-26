import ProjectsPageClientView from '@/components/ProjectsPageClientView';
import { contentService } from '@/services/contentService';

export const revalidate = 60;

export default async function ProjectsPage() {
  const projects = await contentService.getProjects();

  return <ProjectsPageClientView projects={projects} />;
}
