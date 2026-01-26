import { contentService } from '@/services/contentService';
import ContactForm from '@/components/ContactForm';

export const metadata = {
  title: 'Contact | Gal Hillel',
  description: 'Get in touch with me for collaboration or opportunities.',
};

export default async function ContactPage() {
  const content = await contentService.getAllContent();

  return (
    <main>
      <ContactForm user={content.user} resumeUrl={""} uiContent={content.ui.contact} />
    </main>
  );
}
