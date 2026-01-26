import AboutPageClientView from '@/components/AboutPageClientView';
import { contentService } from '@/services/contentService';

export const revalidate = 60;

export default async function AboutPage() {
  const content = await contentService.getAllContent();
  const { user, about, ui } = content;

  if (!user || !about) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white/60">
        Content not found.
      </div>
    );
  }

  return <AboutPageClientView user={user} about={about} uiContent={ui.about} />;
}
