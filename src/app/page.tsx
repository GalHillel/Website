import { contentService } from '@/services/contentService';
import AboutSection from '@/components/sections/AboutSection';
import SkillsSection from '@/components/sections/SkillsSection';
import ProjectsSection from '@/components/sections/ProjectsSection';
import ContactSection from '@/components/sections/ContactSection';

export default async function HomePage() {
  const content = await contentService.getAllContent();

  if (!content.user || !content.about) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white/50">
        <div className="animate-pulse">Loading Portfolio...</div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-0 w-full overflow-hidden">

      {/* 1. HERO & ABOUT SECTION (Combined) */}
      <div className="relative z-10">
        <AboutSection
          user={content.user}
          about={content.about}
          uiContent={content.ui.about}
          sectionTitle={content.sectionTitles?.about}
        />
      </div>

      {/* 2. SKILLS SECTION */}
      <div className="relative z-10">
        <SkillsSection
          skillsData={content.skills}
          uiContent={content.ui.skills}
          sectionTitle={content.sectionTitles?.skills}
        />
      </div>

      {/* 3. PROJECTS SECTION */}
      <div className="relative z-10">
        <ProjectsSection
          projects={content.projects}
          uiContent={content.ui.projects}
          sectionTitle={content.sectionTitles?.projects}
        />
      </div>

      {/* 4. CONTACT SECTION */}
      <section id="contact" className="relative z-10 border-t border-white/5">
        <ContactSection
          user={content.user}
          resumeUrl={content.resumeUrl}
          uiContent={content.ui.contact}
          sectionTitle={content.sectionTitles?.contact}
        />
      </section>

    </div>
  );
}
