import siteContent from '@/entities/SiteContent.json';

// --- Types ---

export interface UserContent {
    name: string;
    email: string;
    github: string;
    linkedin: string;
    profileImage: string;
    tagline?: string;
    taglines?: string[];
    intro?: string;
    imagePosition?: 'top' | 'center' | 'bottom';
    location?: string;
}

export interface AboutContent {
    bio: string;
    education: string;
    csMathBackground: string;
    experience?: string;
}

export interface Project {
    id: string;
    title: string;
    description: string;
    imageUrl?: string | null;
    tags: string[];
    githubLink?: string;
    demoLink?: string;
    imagePosition?: 'top' | 'center' | 'bottom';
}

export interface SkillItem {
    id?: string;
    name: string;
    proficiency: number;
}

export interface SkillCategory {
    category: string;
    items: SkillItem[];
}

export interface FullSiteContent {
    user: UserContent | null;
    about: AboutContent | null;
    projects: Project[];
    skills: SkillCategory[];
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
            skills: siteContent.skills as unknown as SkillCategory[]
        };
    }
};

