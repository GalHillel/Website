import AboutPageClientView from '@/components/AboutPageClientView';
import { contentService } from '@/services/contentService';

export const revalidate = 60;

export default async function AboutPage() {
  const [user, about] = await Promise.all([
    contentService.getUserProfile(),
    contentService.getAboutContent(),
  ]);

  return <AboutPageClientView user={user} about={about} />;
}
