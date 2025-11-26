// @/entities/SiteContent.ts

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

export interface HeroContent {
  tagline: string;
  taglines?: string[];
  intro: string;
  profileImage?: string;
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

export interface SiteMetadata {
  title: string;
  description: string;
}

export interface SiteContent {
  user: UserContent | null;
  hero: HeroContent | null;
  about: AboutContent | null;
  projects: Project[];
  skills: SkillCategory[];
  resumeUrl: string;
  metadata: SiteMetadata;
}
