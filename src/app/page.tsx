import HomePageClientView from '@/components/HomePageClientView';
import { contentService } from '@/services/contentService';

export const revalidate = 60; // Revalidate every 60 seconds

export default async function HomePage() {
  const userProfile = await contentService.getUserProfile();

  const heroContent = {
    tagline: userProfile?.tagline || "Software Developer",
    taglines: userProfile?.taglines || ["Software Developer"],
    intro: userProfile?.intro || "Building digital experiences.",
    profileImage: userProfile?.profileImage,
  };

  return <HomePageClientView heroContent={heroContent} />;
}
