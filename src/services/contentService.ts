import siteContent from '@/data/SiteContent.json';
import { UserContent, AboutContent, Project, SkillCategory, SkillItem, SiteUI, SectionTitles, SiteMetadata, ExperienceItem, EducationItem } from '@/data/SiteContent';

export type { UserContent, AboutContent, Project, SkillCategory, SkillItem, SiteUI, SectionTitles, SiteMetadata, ExperienceItem, EducationItem };

export interface FullSiteContent {
    user: UserContent | null;
    about: AboutContent | null;
    projects: Project[];
    skills: SkillCategory[];
    sectionTitles: SectionTitles;
    resumeUrl?: string;
    metadata: SiteMetadata;
    ui: SiteUI;
}

export const contentService = {

    getUserProfile: async (): Promise<UserContent | null> => {
        return siteContent.user as unknown as UserContent;
    },

    getAboutContent: async (): Promise<AboutContent | null> => {
        return siteContent.about as unknown as AboutContent;
    },

    getProjects: async (): Promise<Project[]> => {
        return siteContent.projects as unknown as Project[];
    },

    getSkills: async (): Promise<SkillCategory[]> => {
        return siteContent.skills as unknown as SkillCategory[];
    },

    getAllContent: async (): Promise<FullSiteContent> => {
        return {
            user: siteContent.user as unknown as UserContent,
            about: siteContent.about as unknown as AboutContent,
            projects: siteContent.projects as unknown as Project[],
            skills: siteContent.skills as unknown as SkillCategory[],
            sectionTitles: (siteContent as any).sectionTitles as SectionTitles,
            resumeUrl: (siteContent as any).resumeUrl || "",
            metadata: (siteContent as any).metadata as SiteMetadata,
            ui: siteContent.ui as unknown as SiteUI
        };
    }
};
