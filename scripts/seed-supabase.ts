import { createClient } from '@supabase/supabase-js';
import * as fs from 'fs';
import * as path from 'path';
import * as dotenv from 'dotenv';

// Load env vars from .env.local
dotenv.config({ path: path.resolve(__dirname, '../.env.local') });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY; // Or SERVICE_ROLE_KEY if RLS blocks anon

if (!supabaseUrl || !supabaseKey) {
    console.error('Missing Supabase environment variables in .env.local');
    process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function seed() {
    const contentPath = path.join(__dirname, '../src/entities/SiteContent.json');
    const content = JSON.parse(fs.readFileSync(contentPath, 'utf-8'));

    console.log('Seeding data...');

    // 1. Profile
    const { user, hero, about, resumeUrl, metadata } = content;
    const profileData = {
        name: user.name,
        email: user.email,
        github: user.github,
        linkedin: user.linkedin,
        profile_image: user.profileImage,
        tagline: hero.tagline,
        intro: hero.intro,
        bio: about.bio,
        education: about.education,
        cs_math_background: about.csMathBackground,
        resume_url: resumeUrl
    };

    const { error: profileError } = await supabase.from('profile').upsert(profileData, { onConflict: 'email' });
    if (profileError) console.error('Error seeding profile:', profileError);
    else console.log('Profile seeded.');

    // 2. Projects
    if (content.projects && content.projects.length > 0) {
        const projectsData = content.projects.map((p: any) => ({
            title: p.title,
            description: p.description,
            image_url: p.imageUrl,
            tags: p.tags,
            github_link: p.githubLink,
            demo_link: p.demoLink
        }));

        // Clear existing projects to avoid duplicates if running multiple times (optional)
        // await supabase.from('projects').delete().neq('id', '00000000-0000-0000-0000-000000000000');

        const { error: projectsError } = await supabase.from('projects').insert(projectsData);
        if (projectsError) console.error('Error seeding projects:', projectsError);
        else console.log(`Seeded ${projectsData.length} projects.`);
    }

    // 3. Skills
    if (content.skills && content.skills.length > 0) {
        const skillsData: any[] = [];
        content.skills.forEach((cat: any) => {
            cat.items.forEach((item: any) => {
                skillsData.push({
                    category: cat.category,
                    name: item.name,
                    proficiency: item.proficiency
                });
            });
        });

        const { error: skillsError } = await supabase.from('skills').insert(skillsData);
        if (skillsError) console.error('Error seeding skills:', skillsError);
        else console.log(`Seeded ${skillsData.length} skills.`);
    }

    console.log('Seeding complete.');
}

seed();
