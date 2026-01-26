import siteContent from '@/data/SiteContent.json';
import { UserContent, AboutContent, Project, SkillCategory, SkillItem, SiteUI } from '@/data/SiteContent';

// --- Types ---

export type { UserContent, AboutContent, Project, SkillCategory, SkillItem, SiteUI };

export interface FullSiteContent {
    user: UserContent | null;
    about: AboutContent | null;
    projects: Project[];
    skills: SkillCategory[];
    ui: SiteUI;
}

// --- Service Functions ---

export const contentService = {
    /**
     * Fetches user profile and hero information.
     */
    getUserProfile: async (): Promise<UserContent | null> => {
        return siteContent.user as unknown as UserContent;
    },

    /**
     * Fetches about section information.
     */
    getAboutContent: async (): Promise<AboutContent | null> => {
        return siteContent.about as unknown as AboutContent;
    },

    /**
     * Fetches all projects.
     */
    getProjects: async (): Promise<Project[]> => {
        return siteContent.projects as unknown as Project[];
    },

    /**
     * Fetches all skills grouped by category.
     */
    getSkills: async (): Promise<SkillCategory[]> => {
        return siteContent.skills as unknown as SkillCategory[];
    },

    /**
     * Fetches all content for the Admin Dashboard.
     */
    getAllContent: async (): Promise<FullSiteContent> => {
        return {
            user: siteContent.user as unknown as UserContent,
            about: siteContent.about as unknown as AboutContent,
            projects: siteContent.projects as unknown as Project[],
            skills: siteContent.skills as unknown as SkillCategory[],
            ui: siteContent.ui as unknown as SiteUI
        };
    }
};

