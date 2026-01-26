import ProjectsPageClientView from '@/components/ProjectsPageClientView';
import { contentService } from '@/services/contentService';

export const revalidate = 60;

export default async function ProjectsPage() {
  const content = await contentService.getAllContent();

  return <ProjectsPageClientView projects={content.projects} uiContent={content.ui.projects} />;
}
