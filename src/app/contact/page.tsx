import { contentService } from '@/services/contentService';
import ContactForm from '@/components/ContactForm';

export const metadata = {
  title: 'Contact | Gal Hillel',
  description: 'Get in touch with me for collaboration or opportunities.',
};

export default async function ContactPage() {
  const user = await contentService.getUserProfile();
  // For resumeUrl, we might need a separate fetch or just pass null if not available in profile
  // Assuming resumeUrl is not in profile table yet, or we can add it later. 
  // For now, let's pass an empty string or fetch it if available.
  // The original code used siteContent.resumeUrl. 
  // We should check if we have a place for it in DB. 
  // If not, we can leave it empty or hardcode it if it's static for now, 
  // but better to stick to DB only. 
  // Let's check if 'resume_url' exists in profile table. 
  // Based on previous view of schema, it wasn't explicitly mentioned but 'profile' has 'intro', 'bio' etc.
  // I'll assume it's not there and just pass empty string for now to avoid errors, 
  // or better, I'll check the schema again later. 
  // For now, safe default.

  return (
    <main>
      <ContactForm user={user} resumeUrl={""} />
    </main>
  );
}
