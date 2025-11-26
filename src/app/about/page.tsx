import AboutPageClientView from '@/components/AboutPageClientView';
import { contentService } from '@/services/contentService';

export const revalidate = 60;

export default async function AboutPage() {
  const [user, about] = await Promise.all([
    contentService.getUserProfile(),
    contentService.getAboutContent(),
  ]);

  if (!user || !about) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white/60">
        Content not found.
      </div>
    );
  }

  return <AboutPageClientView user={user} about={about} />;
}
