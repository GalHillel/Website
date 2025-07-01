// @/entities/SiteContent.ts

export interface UserContent {
  name: string;
  email: string;
  github: string;
  linkedin: string;
  profileImage: string;
}

export interface AboutContent {
  bio: string;
  education: string;
  csMathBackground: string;
}

export interface HeroContent {
  tagline: string;
  intro: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  imageUrl?: string | null;
  tags: string[];
  githubLink?: string;
  demoLink?: string;
}

export interface SkillItem {
  name: string;
  proficiency: number;
}

export interface SkillCategory {
  category: string;
  items: SkillItem[];
}

export interface SiteMetadata {
  title: string;
  description: string;
}

export interface SiteContent { // Renamed from SiteContentAdmin for general use
  user: UserContent;
  hero: HeroContent;
  about: AboutContent;
  projects: Project[];
  skills: SkillCategory[];
  resumeUrl: string;
  metadata: SiteMetadata;
}
