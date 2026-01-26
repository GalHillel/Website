import SkillsPageClientView from '@/components/SkillsPageClientView';
import { contentService } from '@/services/contentService';

export const revalidate = 60;

export default async function SkillsPage() {
  const content = await contentService.getAllContent();

  return <SkillsPageClientView skillsData={content.skills} uiContent={content.ui.skills} />;
}
