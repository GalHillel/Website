import SkillsPageClientView from '@/components/SkillsPageClientView';
import { contentService } from '@/services/contentService';

export const revalidate = 60;

export default async function SkillsPage() {
  const skillsData = await contentService.getSkills();

  return <SkillsPageClientView skillsData={skillsData} />;
}
