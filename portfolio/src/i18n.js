// @/i18n.js
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

const bioTextKey = "A results-driven software developer with a strong foundation in Computer Science, Mathematics, and Software Engineering. Experienced in building scalable backend systems, intuitive frontends, and machine learning tools. Passionate about elegant architecture, real-world impact, and clean code.";
const educationPlaceholderKey = "B.Sc. Computer Science & Mathematics - [University Name] (Year)";
const csMathPlaceholderKey = "Deep understanding of algorithms, data structures, discrete mathematics, linear algebra, and calculus. Applied this knowledge in various academic and personal projects, focusing on efficient solutions and analytical problem-solving.";

const techTags = {
  "React": "React", "Node.js": "Node.js", "TypeScript": "TypeScript", "React Native": "React Native",
  "Firebase": "Firebase", "JavaScript": "JavaScript", "Python": "Python", "D3.js": "D3.js", "Flask": "Flask",
  "Next.js": "Next.js", "Stripe": "Stripe", "Tailwind CSS": "Tailwind CSS", "TensorFlow": "TensorFlow",
  "Docker": "Docker", "Vue.js": "Vue.js", "WebSockets": "WebSockets", "Go": "Go",
};

const skillCategories = {
  "Frontend Development": "Frontend Development",
  "Backend Development": "Backend Development",
  "Databases & Storage": "Databases & Storage",
  "DevOps & Tools": "DevOps & Tools",
  "Machine Learning": "Machine Learning",
  "Other Skills": "Other Skills",
};

const individualSkills = {
  "HTML5": "HTML5", "CSS3 & SCSS": "CSS3 & SCSS", "JavaScript (ES6+)": "JavaScript (ES6+)",
  "Express.js": "Express.js", "RESTful APIs": "RESTful APIs", "GraphQL": "GraphQL",
  "PostgreSQL": "PostgreSQL", "MongoDB": "MongoDB", "SQL": "SQL",
  "Git & GitHub": "Git & GitHub", "CI/CD (GitHub Actions)": "CI/CD (GitHub Actions)",
  "Vercel": "Vercel", "Netlify": "Netlify", "Scikit-learn": "Scikit-learn",
  "Pandas & NumPy": "Pandas & NumPy", "TensorFlow (Basic)": "TensorFlow (Basic)",
  "Agile Methodologies": "Agile Methodologies", "Problem Solving": "Problem Solving",
  "UI/UX Design Principles": "UI/UX Design Principles",
};

const resources = {
  en: {
    translation: {
      // Header
      "Gal Hillel": "Gal Hillel", "Home": "Home", "About": "About", "Projects": "Projects", "Skills": "Skills", "Contact": "Contact",
      // Footer
      "GitHub": "GitHub", "LinkedIn": "LinkedIn", "Email": "Email", "copyRight": "© {{year}} Gal Hillel. All rights reserved.",
      // General
      "EN/HE": "HE", "Mode": "Mode", "Loading...": "Loading...",
      // HomePage
      "Software Developer | Problem Solver | Tech Enthusiast": "Software Developer | Problem Solver | Tech Enthusiast",
      "I build modern, scalable, and user-friendly web applications. Explore my work and skills.": "I build modern, scalable, and user-friendly web applications. Explore my work and skills.",
      "View Projects": "View Projects", "Get in Touch": "Get in Touch", "Scroll to explore or go to About page": "Scroll to explore or go to About page",
      // AboutPage
      "About Me": "About Me", "Profile Photo": "Profile Photo", "Profile Photo Alt": "Gal Hillel - Profile Photo", "Biography": "Biography",
      [bioTextKey]: bioTextKey, "Education": "Education", [educationPlaceholderKey]: educationPlaceholderKey,
      "CS & Math Background": "CS & Math Background", [csMathPlaceholderKey]: csMathPlaceholderKey,
      // ProjectsPage & ProjectCard
      "My Projects": "My Projects", "Filter by Technology": "Filter by Technology", "Clear Filters": "Clear Filters",
      "No projects match the selected filters.": "No projects match the selected filters.",
      "No projects available at the moment. Please check back later!": "No projects available at the moment. Please check back later!",
      "No Image": "No Image Available", "GitHub Repo": "GitHub Repo", "Live Demo": "Live Demo",
      ...techTags,
      // SkillsPage
      "My Skills": "My Skills",
      ...skillCategories,
      ...individualSkills,
      "Skill Proficiency: {{name}} {{proficiency}}%": "Skill Proficiency: {{name}} {{proficiency}}%",
      // ContactPage
      "Send Me a Message": "Send Me a Message",
      "Your Name": "Your Name", "Enter your name": "Enter your name",
      "Your Email": "Your Email", "Enter your email address": "Enter your email address",
      "Your Message": "Your Message", "Write your message here...": "Write your message here...",
      "Send Message": "Send Message", "Contact Information": "Contact Information",
      "Feel free to reach out through any of these platforms. I look forward to hearing from you!": "Feel free to reach out through any of these platforms. I look forward to hearing from you!",
      "LinkedIn Profile": "LinkedIn Profile", "GitHub Profile": "GitHub Profile", "Send an Email": "Send an Email",
      "Form submission is not implemented yet.": "Form submission is not implemented yet.",
      "ResumeDownloadPrompt": "You can also download my resume:", "Download Resume": "Download Resume",
      // AdminPage
      "Admin Login": "Admin Login", "Password": "Password", "Login": "Login", "Incorrect Password": "Incorrect Password",
      "Admin Dashboard": "Admin Dashboard",
      "Welcome to the Admin Panel. Content editing features will be implemented here.": "Welcome to the Admin Panel. Content editing features will be implemented here.",
      "Edit About Me": "Edit About Me", "Update your biography, photo, etc.": "Update your biography, photo, etc.",
      "Manage Projects": "Manage Projects", "Add, edit, or remove projects.": "Add, edit, or remove projects.",
      "Manage Skills": "Manage Skills", "Update skill categories and proficiency.": "Update skill categories and proficiency.",
      "Update Contact Info": "Update Contact Info", "Change email, social links.": "Change email, social links.",
      "Upload Resume": "Upload Resume", "Replace the downloadable resume PDF.": "Replace the downloadable resume PDF.",
      "Site Settings": "Site Settings", "Edit hero text, metadata, etc.": "Edit hero text, metadata, etc.",
      // AdminDashboardClient specific (some might overlap with AdminPage overview if not careful)
      "Loading content editor...": "Loading content editor...",
      "User Information": "User Information",
      // Name, Email, GitHub Profile URL, LinkedIn Profile URL, Profile Image Path already have general keys like "Name", "Email", "GitHub", "LinkedIn"
      // We can reuse them if the context is clear, or make them more specific if needed for admin forms.
      // For now, let's assume general keys like "Name", "Email" are sufficient.
      // "Profile Image Path" is specific enough.
      "About Me Section": "About Me Section", // Title for this part of the form in admin
      // Biography, Education, CS & Math Background are existing general keys
      "Saving...": "Saving...",
      "Save Changes (Not Implemented)": "Save Changes (Not Implemented)", // Button text for save
      "Save functionality is not implemented in this phase. Data is in SiteContent.json.": "Save functionality is not implemented in this phase. Data is in SiteContent.json.",
      "Content saved successfully!": "Content saved successfully!",
      "Error saving content.": "Error saving content.",
      "Toggle navigation menu": "Toggle navigation menu",
    }
  },
  he: {
    translation: {
      // Header
      "Gal Hillel": "Gal Hillel", "Home": "בית", "About": "אודות", "Projects": "פרויקטים", "Skills": "כישורים", "Contact": "צור קשר",
      // Footer
      "GitHub": "גיטהאב", "LinkedIn": "לינקדאין", "Email": "אימייל", "copyRight": "© {{year}} גל הילל. כל הזכויות שמורות.",
      // General
      "EN/HE": "EN", "Mode": "מצב", "Loading...": "טוען...",
      // HomePage
      "Software Developer | Problem Solver | Tech Enthusiast": "מפתח תוכנה | פותר בעיות | חובב טכנולוגיה",
      "I build modern, scalable, and user-friendly web applications. Explore my work and skills.": "אני בונה אפליקציות ווב מודרניות, סקיילביליות וידידותיות למשתמש. גלה את העבודות והכישורים שלי.",
      "View Projects": "צפה בפרויקטים", "Get in Touch": "צור קשר", "Scroll to explore or go to About page": "גלול לגילוי או עבור לדף אודות",
      // AboutPage
      "About Me": "אודותיי", "Profile Photo": "תמונת פרופיל", "Profile Photo Alt": "גל הילל - תמונת פרופיל", "Biography": "ביוגרפיה",
      [bioTextKey]: "מפתח תוכנה מונחה תוצאות עם בסיס חזק במדעי המחשב, מתמטיקה והנדסת תוכנה. מנוסה בבניית מערכות backend סקיילביליות, פיתוח frontend אינטואיטיבי, וכלי למידת מכונה. נלהב מארכיטקטורה אלגנטית, השפעה בעולם האמיתי וקוד נקי.",
      "Education": "השכלה", [educationPlaceholderKey]: "תואר ראשון במדעי המחשב ומתמטיקה - [שם האוניברסיטה] (שנה)",
      "CS & Math Background": "רקע במדעי המחשב ומתמטיקה", [csMathPlaceholderKey]: "הבנה מעמיקה של אלגוריתמים, מבני נתונים, מתמטיקה בדידה, אלגברה לינארית וחשבון אינפיניטסימלי. יישמתי ידע זה במגוון פרויקטים אקדמיים ואישיים, תוך התמקדות בפתרונות יעילים ופתרון בעיות אנליטי.",
      // ProjectsPage & ProjectCard
      "My Projects": "הפרויקטים שלי", "Filter by Technology": "סנן לפי טכנולוגיה", "Clear Filters": "נקה סינון",
      "No projects match the selected filters.": "אין פרויקטים התואמים לסינון שנבחר.",
      "No Image": "אין תמונה זמינה", "GitHub Repo": "מאגר גיטהאב", "Live Demo": "הדגמה חיה",
      "React": "ריאקט", "Node.js": "Node.js", "TypeScript": "טייפסקריפט", "JavaScript": "ג'אווהסקריפט", "Python": "פייתון",
      "React Native": "ריאקט נייטיב", "Firebase": "פיירבייס", "Next.js": "נקסט.ג'ייאס",
      ...Object.fromEntries(Object.entries(techTags).map(([key, value]) => [key, techTags[key] || value])),
      // SkillsPage
      "My Skills": "הכישורים שלי",
      "Frontend Development": "פיתוח Frontend", "Backend Development": "פיתוח Backend", "Databases & Storage": "מסדי נתונים ואחסון",
      "DevOps & Tools": "DevOps וכלים", "Machine Learning": "למידת מכונה", "Other Skills": "כישורים נוספים",
      "HTML5": "HTML5", "CSS3 & SCSS": "CSS3 ו-SCSS", "JavaScript (ES6+)": "JavaScript (ES6+)", "Express.js": "Express.js",
      "RESTful APIs": "RESTful APIs", "GraphQL": "GraphQL", "PostgreSQL": "PostgreSQL", "MongoDB": "MongoDB", "SQL": "SQL",
      "Git & GitHub": "Git ו-GitHub", "CI/CD (GitHub Actions)": "CI/CD (GitHub Actions)", "Vercel": "Vercel", "Netlify": "Netlify",
      "Scikit-learn": "Scikit-learn", "Pandas & NumPy": "Pandas ו-NumPy", "TensorFlow (Basic)": "TensorFlow (בסיסי)",
      "Agile Methodologies": "מתודולוגיות Agile", "Problem Solving": "פתרון בעיות", "UI/UX Design Principles": "עקרונות עיצוב UI/UX",
      ...Object.fromEntries(Object.entries(individualSkills).map(([key, value]) => [key, individualSkills[key] || value])),
      // ContactPage
      "Send Me a Message": "שלח לי הודעה",
      "Your Name": "השם שלך", "Enter your name": "הזן את שמך",
      "Your Email": "האימייל שלך", "Enter your email address": "הזן את כתובת האימייל שלך",
      "Your Message": "ההודעה שלך", "Write your message here...": "כתוב את הודעתך כאן...",
      "Send Message": "שלח הודעה", "Contact Information": "פרטי התקשרות",
      "Feel free to reach out through any of these platforms. I look forward to hearing from you!": "אל תהסס ליצור קשר דרך כל אחת מהפלטפורמות הללו. אני מצפה לשמוע ממך!",
      "LinkedIn Profile": "פרופיל לינקדאין", "GitHub Profile": "פרופיל גיטהאב", "Send an Email": "שלח אימייל",
      "Form submission is not implemented yet.": "שליחת הטופס עדיין לא מיושמת.",
      "ResumeDownloadPrompt": "ניתן גם להוריד את קורות החיים שלי:", "Download Resume": "הורד קורות חיים",
      // AdminPage
      "Admin Login": "כניסת מנהל", "Password": "סיסמה", "Login": "התחבר", "Incorrect Password": "סיסמה שגויה",
      "Admin Dashboard": "לוח בקרה למנהל",
      "Welcome to the Admin Panel. Content editing features will be implemented here.": "ברוך הבא ללוח הבקרה. אפשרויות עריכת תוכן יתווספו כאן.",
      "Edit About Me": "ערוך אודות", "Update your biography, photo, etc.": "עדכן ביוגרפיה, תמונה וכו'.",
      "Manage Projects": "נהל פרויקטים", "Add, edit, or remove projects.": "הוסף, ערוך או הסר פרויקטים.",
      "Manage Skills": "נהל כישורים", "Update skill categories and proficiency.": "עדכן קטגוריות כישורים ואחוזי שליטה.",
      "Update Contact Info": "עדכן פרטי התקשרות", "Change email, social links.": "שנה אימייל, קישורים חברתיים.",
      "Upload Resume": "העלה קורות חיים", "Replace the downloadable resume PDF.": "החלף את קובץ ה-PDF של קורות החיים.",
      "Site Settings": "הגדרות אתר", "Edit hero text, metadata, etc.": "ערוך טקסט הירו, מטא-דאטה וכו'.",
    }
  }
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false
    },
    detection: {
      order: ['localStorage', 'navigator', 'htmlTag'],
      caches: ['localStorage'],
    }
  });

export default i18n;
