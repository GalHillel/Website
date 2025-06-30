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
      // "EN/HE": "HE", // Removed
      "Mode": "Mode", "Loading...": "Loading...",
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
      // AdminDashboardClient specific
      "Loading content editor...": "Loading content editor...",
      "User Information": "User Information",
      "Profile Image Path": "Profile Image Path",
      "About Me Section": "About Me Section",
      "Saving...": "Saving...",
      "Save Changes (Not Implemented)": "Save Changes (Not Implemented)", // Kept for reference, new key below
      "Save Local Changes": "Save Local Changes", // New button text
      "Saved Successfully!": "Saved Successfully!",
      "Save Error!": "Save Error!",
      "Failed to save changes to local storage.": "Failed to save changes to local storage.",
      "Note": "Note",
      "Changes made here are saved locally in your browser (using localStorage) and will not affect the live website data or other users. This is for demonstration purposes only.": "Changes made here are saved locally in your browser (using localStorage) and will not affect the live website data or other users. This is for demonstration purposes only.",
      "Save functionality is not implemented in this phase. Data is in SiteContent.json.": "Save functionality is not implemented in this phase. Data is in SiteContent.json.", // Alert text, might be removed
      "Content saved successfully!": "Content saved successfully!", // Old alert text, might be removed
      "Error saving content.": "Error saving content.", // Old alert text, might be removed
      "Toggle navigation menu": "Toggle navigation menu",
      // Admin - Skills Management
      "Category Name": "Category Name",
      "Skills in this category:": "Skills in this category:",
      "Skill Name": "Skill Name",
      "Proficiency (%)": "Proficiency (%)",
      "Adding or deleting skills/categories requires more advanced state management and will be implemented later.": "Adding or deleting skills/categories requires more advanced state management and will be implemented later.",
      "Adding or deleting projects requires more advanced state management and will be implemented later.": "Adding or deleting projects requires more advanced state management and will be implemented later.",
      "Project": "Project",
      // Contact Form EmailJS
      "Sending...": "Sending...",
      "Message sent successfully! Thank you.": "Message sent successfully! Thank you.",
      "Failed to send message. Please try again later or contact me directly via email.": "Failed to send message. Please try again later or contact me directly via email.",
      "EmailJS is not configured. Please set up your EmailJS credentials.": "EmailJS is not configured. Please set up your EmailJS credentials.",
      "Error sending message. EmailJS library might be missing.": "Error sending message. EmailJS library might be missing.",
      // Typewriter Tagline
      "Software Developer": "Software Developer",
      "Problem Solver": "Problem Solver",
      "Tech Enthusiast": "Tech Enthusiast",
      "Creative Thinker": "Creative Thinker"
    }
  }
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en', // Only English is now the fallback
    supportedLngs: ['en'], // Explicitly support only English
    interpolation: {
      escapeValue: false
    },
    detection: {
      order: ['localStorage', 'navigator', 'htmlTag'], // Keep detection for potential future re-addition or user preference storage
      caches: ['localStorage'],
      lookupLocalStorage: 'i18nextLng',
      lookupQuerystring: 'lng',
    }
  });

export default i18n;
