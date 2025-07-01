// @/components/admin/AdminDashboardClient.tsx
"use client";

import { useEffect, useState } from "react";
// Removed: import siteContentData from "@/entities/SiteContent.json";

// Simplified types for English-only content
interface UserContent {
  name: string;
  email: string;
  github: string;
  linkedin: string;
  profileImage: string;
}
interface AboutContent {
  bio: string;
  education: string;
  csMathBackground: string;
}
interface HeroContent {
  tagline: string;
  intro: string;
}
interface Project {
  id: string;
  title: string;
  description: string;
  imageUrl?: string | null;
  tags: string[];
  githubLink?: string;
  demoLink?: string;
}
interface SkillItem {
  name: string;
  proficiency: number;
}
interface SkillCategory {
  category: string;
  items: SkillItem[];
}
interface SiteMetadata {
  title: string;
  description: string;
}
interface SiteContentAdmin {
  user: UserContent;
  hero: HeroContent;
  about: AboutContent;
  projects: Project[];
  skills: SkillCategory[];
  resumeUrl: string;
  metadata: SiteMetadata;
}

const AdminDashboardClient = () => {
  // initialContent is now fetched from API
  const [content, setContent] = useState<SiteContentAdmin | null>(null);
  const [isContentLoading, setIsContentLoading] = useState(true);
  const [fetchError, setFetchError] = useState<string | null>(null);
  const [saveStatus, setSaveStatus] = useState<
    "idle" | "saving" | "success" | "error"
  >("idle");
  const [saveError, setSaveError] = useState<string | null>(null);


  useEffect(() => {
    const fetchContent = async () => {
      setIsContentLoading(true);
      setFetchError(null);
      try {
        const response = await fetch("/api/admin/content");
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || `Failed to fetch content: ${response.statusText}`);
        }
        const data: SiteContentAdmin = await response.json();
        setContent(data);
      } catch (error) {
        console.error("Error loading content from API:", error);
        if (error instanceof Error) {
          setFetchError(error.message);
        } else {
          setFetchError("An unknown error occurred while fetching content.");
        }
        // Optionally, load fallback or provide a way to retry
      } finally {
        setIsContentLoading(false);
      }
    };

    fetchContent();
  }, []);

  const handleNestedInputChange = (path: string, value: string | number) => {
    setContent((prevContent) => {
      if (!prevContent) return prevContent;
      const keys = path.split(".");
      const newState: SiteContentAdmin = JSON.parse(JSON.stringify(prevContent));
      let currentLevel: any = newState;

      keys.forEach((key, index) => {
        if (index === keys.length - 1) {
          if (key === "tags") {
            currentLevel[key] = (value as string)
              .split(",")
              .map((tag: string) => tag.trim());
          } else if (key === "proficiency" && typeof currentLevel[key] !== "undefined") {
            currentLevel[key] = Number(value);
          } else {
            currentLevel[key] = value;
          }
        } else {
          const nextKeyIsArrayIndex = /^\d+$/.test(keys[index + 1]);
          if (Array.isArray(currentLevel[key]) && nextKeyIsArrayIndex) {
            currentLevel = currentLevel[key][Number(keys[index + 1])];
            keys.splice(index + 1, 1); // Consume the array index key
          } else if (typeof currentLevel[key] === 'object' && currentLevel[key] !== null) {
            currentLevel = currentLevel[key];
          } else {
            // This case should ideally not be hit if paths are correct
            console.warn(`Path issue at ${key} in ${path}`);
          }
        }
      });
      return newState;
    });
  };

  const handleSave = async () => {
    if (!content) return;
    setSaveStatus("saving");
    setSaveError(null);
    try {
      const response = await fetch("/api/admin/content", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(content),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || `Failed to save content: ${response.statusText}`);
      }

      // const result = await response.json(); // Contains { message: "..." }
      setSaveStatus("success");
      setTimeout(() => setSaveStatus("idle"), 3000);
    } catch (error) {
      console.error("Error saving content via API:", error);
      if (error instanceof Error) {
        setSaveError(error.message);
      } else {
        setSaveError("An unknown error occurred while saving content.");
      }
      setSaveStatus("error");
      setTimeout(() => setSaveStatus("idle"), 5000); // Keep error message visible longer
    }
  };

  // Project handlers
  const handleAddProject = () => {
    setContent((prevContent) => {
      if (!prevContent) return prevContent;
      const newProject: Project = {
        id: `proj-${Date.now()}`,
        title: "New Project",
        description: "",
        tags: [],
        imageUrl: null,
        githubLink: "",
        demoLink: "",
      };
      return {
        ...prevContent,
        projects: [...prevContent.projects, newProject],
      };
    });
  };

  const handleDeleteProject = (projectIndex: number) => {
    setContent((prevContent) => {
      if (!prevContent) return prevContent;
      const updatedProjects = prevContent.projects.filter(
        (_, index) => index !== projectIndex
      );
      return { ...prevContent, projects: updatedProjects };
    });
  };

  // Skill Category handlers
  const handleAddSkillCategory = () => {
    setContent((prevContent) => {
      if (!prevContent) return prevContent;
      const newCategory: SkillCategory = {
        category: "New Category",
        items: [],
      };
      return {
        ...prevContent,
        skills: [...prevContent.skills, newCategory],
      };
    });
  };

  const handleDeleteSkillCategory = (categoryIndex: number) => {
    setContent((prevContent) => {
      if (!prevContent) return prevContent;
      const updatedSkills = prevContent.skills.filter(
        (_, index) => index !== categoryIndex
      );
      return { ...prevContent, skills: updatedSkills };
    });
  };

  // Skill Item handlers
  const handleAddSkill = (categoryIndex: number) => {
    setContent((prevContent) => {
      if (!prevContent) return prevContent;
      const newSkill: SkillItem = { name: "New Skill", proficiency: 0 };
      const updatedSkills = prevContent.skills.map((cat, index) => {
        if (index === categoryIndex) {
          return { ...cat, items: [...cat.items, newSkill] };
        }
        return cat;
      });
      return { ...prevContent, skills: updatedSkills };
    });
  };

  const handleDeleteSkill = (categoryIndex: number, skillIndex: number) => {
    setContent((prevContent) => {
      if (!prevContent) return prevContent;
      const updatedSkills = prevContent.skills.map((cat, cIndex) => {
        if (cIndex === categoryIndex) {
          return {
            ...cat,
            items: cat.items.filter((_, sIndex) => sIndex !== skillIndex),
          };
        }
        return cat;
      });
      return { ...prevContent, skills: updatedSkills };
    });
  };


  if (isContentLoading) {
    return <p className="text-center py-10">Loading content editor...</p>;
  }

  if (fetchError) {
    return (
      <div className="text-center py-10">
        <p className="text-red-500 dark:text-red-400 text-xl">
          Error loading content: {fetchError}
        </p>
        <p className="mt-2 text-slate-600 dark:text-slate-300">
          Please try refreshing the page or contact support if the issue persists.
        </p>
      </div>
    );
  }

  if (!content) {
    // This case should ideally be covered by fetchError if API fails,
    // but as a fallback if content is null without a specific fetchError.
    return <p className="text-center py-10">No content available. Please try again later.</p>;
  }

  const buttonClass = "px-4 py-2 text-sm font-medium rounded-md transition-colors";
  const primaryButtonClass = `${buttonClass} bg-blue-500 hover:bg-blue-600 text-white`;
  const dangerButtonClass = `${buttonClass} bg-red-500 hover:bg-red-600 text-white`;
  const secondaryButtonClass = `${buttonClass} bg-slate-200 hover:bg-slate-300 dark:bg-slate-600 dark:hover:bg-slate-500 text-slate-700 dark:text-slate-200`;
  const inputAdminClass = "mt-1 block w-full px-3 py-2 bg-slate-50 dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm text-slate-900 dark:text-slate-50 transition-colors duration-300";


  return (
    <div className="space-y-8">
      <div className="p-4 bg-yellow-100 dark:bg-yellow-800/30 border-l-4 border-yellow-500 dark:border-yellow-400 rounded-md">
        <p className="text-sm text-yellow-700 dark:text-yellow-200">
          <strong>Note:</strong> Changes made here are saved locally in your
          browser (using localStorage) and will not affect the live website data
          or other users. This is for demonstration purposes only.
        </p>
      </div>

      {/* User Info Section */}
      <section className="p-6 bg-white dark:bg-slate-800 rounded-lg shadow-xl transition-colors duration-300">
        <h2 className="text-xl font-semibold mb-4 text-slate-800 dark:text-slate-100">
          User Information
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label
              htmlFor="userName"
              className="block text-sm font-medium text-slate-700 dark:text-slate-300"
            >
              Name
            </label>
            <input
              type="text"
              id="userName"
              value={content.user.name}
              onChange={(e) =>
                handleNestedInputChange("user.name", e.target.value)
              }
              className={inputAdminClass}
            />
          </div>
          <div>
            <label
              htmlFor="userEmail"
              className="block text-sm font-medium text-slate-700 dark:text-slate-300"
            >
              Email
            </label>
            <input
              type="email"
              id="userEmail"
              value={content.user.email}
              onChange={(e) =>
                handleNestedInputChange("user.email", e.target.value)
              }
              className={inputAdminClass}
            />
          </div>
          <div>
            <label
              htmlFor="userGithub"
              className="block text-sm font-medium text-slate-700 dark:text-slate-300"
            >
              GitHub Profile URL
            </label>
            <input
              type="url"
              id="userGithub"
              value={content.user.github}
              onChange={(e) =>
                handleNestedInputChange("user.github", e.target.value)
              }
              className={inputAdminClass}
            />
          </div>
          <div>
            <label
              htmlFor="userLinkedin"
              className="block text-sm font-medium text-slate-700 dark:text-slate-300"
            >
              LinkedIn Profile URL
            </label>
            <input
              type="url"
              id="userLinkedin"
              value={content.user.linkedin}
              onChange={(e) =>
                handleNestedInputChange("user.linkedin", e.target.value)
              }
              className={inputAdminClass}
            />
          </div>
          <div>
            <label
              htmlFor="userProfileImage"
              className="block text-sm font-medium text-slate-700 dark:text-slate-300"
            >
              Profile Image Path
            </label>
            <input
              type="text"
              id="userProfileImage"
              value={content.user.profileImage}
              onChange={(e) =>
                handleNestedInputChange("user.profileImage", e.target.value)
              }
              className={inputAdminClass}
            />
          </div>
        </div>
      </section>

      {/* About Me Section */}
      <section className="p-6 bg-white dark:bg-slate-800 rounded-lg shadow-xl transition-colors duration-300">
        <h2 className="text-xl font-semibold mb-4 text-slate-800 dark:text-slate-100">
          About Me Section
        </h2>
        <div className="mb-4">
          <label
            htmlFor="aboutBio"
            className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1"
          >
            Biography
          </label>
          <textarea
            id="aboutBio"
            value={content.about.bio}
            onChange={(e) =>
              handleNestedInputChange("about.bio", e.target.value)
            }
            rows={5}
            className={inputAdminClass}
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="aboutEducation"
            className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1"
          >
            Education
          </label>
          <textarea
            id="aboutEducation"
            value={content.about.education}
            onChange={(e) =>
              handleNestedInputChange("about.education", e.target.value)
            }
            rows={3}
            className={inputAdminClass}
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="aboutCsMath"
            className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1"
          >
            CS & Math Background
          </label>
          <textarea
            id="aboutCsMath"
            value={content.about.csMathBackground}
            onChange={(e) =>
              handleNestedInputChange("about.csMathBackground", e.target.value)
            }
            rows={4}
            className={inputAdminClass}
          />
        </div>
      </section>

      {/* Hero Section Teasers */}
      <section className="p-6 bg-white dark:bg-slate-800 rounded-lg shadow-xl transition-colors duration-300">
        <h2 className="text-xl font-semibold mb-4 text-slate-800 dark:text-slate-100">
          Hero Section Content
        </h2>
        <div className="mb-4">
          <label
            htmlFor="heroTagline"
            className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1"
          >
            Tagline
          </label>
          <input
            type="text"
            id="heroTagline"
            value={content.hero.tagline}
            onChange={(e) =>
              handleNestedInputChange("hero.tagline", e.target.value)
            }
            className={inputAdminClass}
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="heroIntro"
            className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1"
          >
            Intro Text
          </label>
          <textarea
            id="heroIntro"
            value={content.hero.intro}
            onChange={(e) =>
              handleNestedInputChange("hero.intro", e.target.value)
            }
            rows={3}
            className={inputAdminClass}
          />
        </div>
      </section>

      {/* Site Metadata Section */}
      <section className="p-6 bg-white dark:bg-slate-800 rounded-lg shadow-xl transition-colors duration-300">
        <h2 className="text-xl font-semibold mb-4 text-slate-800 dark:text-slate-100">
          Site Metadata
        </h2>
        <div className="mb-4">
          <label
            htmlFor="metaTitle"
            className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1"
          >
            Site Title
          </label>
          <input
            type="text"
            id="metaTitle"
            value={content.metadata.title}
            onChange={(e) =>
              handleNestedInputChange("metadata.title", e.target.value)
            }
            className={inputAdminClass}
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="metaDescription"
            className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1"
          >
            Site Description
          </label>
          <textarea
            id="metaDescription"
            value={content.metadata.description}
            onChange={(e) =>
              handleNestedInputChange("metadata.description", e.target.value)
            }
            rows={3}
            className={inputAdminClass}
          />
        </div>
      </section>

      {/* Projects Section */}
      <section className="p-6 bg-white dark:bg-slate-800 rounded-lg shadow-xl transition-colors duration-300">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-slate-800 dark:text-slate-100">
            Manage Projects
          </h2>
          <button onClick={handleAddProject} className={primaryButtonClass}>
            Add Project
          </button>
        </div>
        {content.projects.map((project, projectIndex) => (
          <div
            key={project.id} // Ensure unique key: using new Date().getTime() for new, or existing id
            className="mb-6 p-4 border border-slate-200 dark:border-slate-700 rounded-md"
          >
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-lg font-medium text-slate-700 dark:text-slate-300">
                Project {projectIndex + 1}: {project.title || "New Project"}
              </h3>
              <button
                onClick={() => handleDeleteProject(projectIndex)}
                className={dangerButtonClass}
              >
                Delete Project
              </button>
            </div>
            {/* Title */}
            <div className="mb-2">
              <label
                htmlFor={`projectTitle-${project.id}`}
                className="block text-sm font-medium text-slate-700 dark:text-slate-300"
              >
                Title
              </label>
              <input
                type="text"
                id={`projectTitle-${project.id}`}
                value={project.title}
                onChange={(e) =>
                  handleNestedInputChange(
                    `projects.${projectIndex}.title`,
                    e.target.value
                  )
                }
                className={inputAdminClass}
              />
            </div>
            {/* Description */}
            <div className="mb-2">
              <label
                htmlFor={`projectDesc-${project.id}`}
                className="block text-sm font-medium text-slate-700 dark:text-slate-300"
              >
                Description
              </label>
              <textarea
                id={`projectDesc-${project.id}`}
                value={project.description}
                onChange={(e) =>
                  handleNestedInputChange(
                    `projects.${projectIndex}.description`,
                    e.target.value
                  )
                }
                rows={3}
                className={inputAdminClass}
              />
            </div>
            {/* Image URL */}
            <div className="mb-2">
              <label
                htmlFor={`projectImg-${project.id}`}
                className="block text-sm font-medium text-slate-700 dark:text-slate-300"
              >
                Image URL
              </label>
              <input
                type="text"
                id={`projectImg-${project.id}`}
                value={project.imageUrl || ""}
                onChange={(e) =>
                  handleNestedInputChange(
                    `projects.${projectIndex}.imageUrl`,
                    e.target.value
                  )
                }
                className={inputAdminClass}
              />
            </div>
            {/* Tags (comma-separated string for simplicity in this UI) */}
            <div className="mb-2">
              <label
                htmlFor={`projectTags-${project.id}`}
                className="block text-sm font-medium text-slate-700 dark:text-slate-300"
              >
                Tags (comma-separated)
              </label>
              <input
                type="text"
                id={`projectTags-${project.id}`}
                value={project.tags.join(", ")}
                onChange={(e) =>
                  handleNestedInputChange(
                    `projects.${projectIndex}.tags`,
                    e.target.value
                  )
                }
                className={inputAdminClass}
              />
            </div>
            {/* GitHub Link */}
            <div className="mb-2">
              <label
                htmlFor={`projectGithub-${project.id}`}
                className="block text-sm font-medium text-slate-700 dark:text-slate-300"
              >
                GitHub Link
              </label>
              <input
                type="url"
                id={`projectGithub-${project.id}`}
                value={project.githubLink || ""}
                onChange={(e) =>
                  handleNestedInputChange(
                    `projects.${projectIndex}.githubLink`,
                    e.target.value
                  )
                }
                className={inputAdminClass}
              />
            </div>
            {/* Demo Link */}
            <div className="mb-2">
              <label
                htmlFor={`projectDemo-${project.id}`}
                className="block text-sm font-medium text-slate-700 dark:text-slate-300"
              >
                Demo Link
              </label>
              <input
                type="url"
                id={`projectDemo-${project.id}`}
                value={project.demoLink || ""}
                onChange={(e) =>
                  handleNestedInputChange(
                    `projects.${projectIndex}.demoLink`,
                    e.target.value
                  )
                }
                className={inputAdminClass}
              />
            </div>
          </div>
        ))}
      </section>

      {/* Skills Section */}
      <section className="p-6 bg-white dark:bg-slate-800 rounded-lg shadow-xl transition-colors duration-300">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-slate-800 dark:text-slate-100">
            Manage Skills
          </h2>
          <button
            onClick={handleAddSkillCategory}
            className={primaryButtonClass}
          >
            Add Skill Category
          </button>
        </div>
        {content.skills.map((skillCategory, categoryIndex) => (
          <div
            key={`skillcat-${categoryIndex}-${skillCategory.category}`} // More robust key
            className="mb-6 p-4 border border-slate-200 dark:border-slate-700 rounded-md"
          >
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-lg font-medium text-slate-700 dark:text-slate-300">
                Category: {skillCategory.category || "New Category"}
              </h3>
              <button
                onClick={() => handleDeleteSkillCategory(categoryIndex)}
                className={dangerButtonClass}
              >
                Delete Category
              </button>
            </div>
            {/* Category Name */}
            <div className="mb-2">
              <label
                htmlFor={`skillCategoryName-${categoryIndex}`}
                className="block text-sm font-medium text-slate-700 dark:text-slate-300"
              >
                Category Name
              </label>
              <input
                type="text"
                id={`skillCategoryName-${categoryIndex}`}
                value={skillCategory.category}
                onChange={(e) =>
                  handleNestedInputChange(
                    `skills.${categoryIndex}.category`,
                    e.target.value
                  )
                }
                className={inputAdminClass}
              />
            </div>
            {/* Skills within Category */}
            <div className="flex justify-between items-center mt-4 mb-2">
              <h4 className="text-md font-medium text-slate-600 dark:text-slate-400">
                Skills in this category:
              </h4>
              <button
                onClick={() => handleAddSkill(categoryIndex)}
                className={secondaryButtonClass}
              >
                Add Skill
              </button>
            </div>
            {skillCategory.items.map((skillItem, itemIndex) => (
              <div
                key={`skillitem-${categoryIndex}-${itemIndex}-${skillItem.name}`} // More robust key
                className="grid grid-cols-10 gap-2 mb-2 items-center"
              >
                <div className="col-span-4">
                  <label
                    htmlFor={`skillName-${categoryIndex}-${itemIndex}`}
                    className="block text-xs font-medium text-slate-700 dark:text-slate-300"
                  >
                    Skill Name
                  </label>
                  <input
                    type="text"
                    id={`skillName-${categoryIndex}-${itemIndex}`}
                    value={skillItem.name}
                    onChange={(e) =>
                      handleNestedInputChange(
                        `skills.${categoryIndex}.items.${itemIndex}.name`,
                        e.target.value
                      )
                    }
                    className={`${inputAdminClass} text-sm`}
                  />
                </div>
                <div className="col-span-3">
                  <label
                    htmlFor={`skillProficiency-${categoryIndex}-${itemIndex}`}
                    className="block text-xs font-medium text-slate-700 dark:text-slate-300"
                  >
                    Proficiency (%)
                  </label>
                  <input
                    type="number"
                    id={`skillProficiency-${categoryIndex}-${itemIndex}`}
                    value={skillItem.proficiency}
                    min="0"
                    max="100"
                    onChange={(e) =>
                      handleNestedInputChange(
                        `skills.${categoryIndex}.items.${itemIndex}.proficiency`,
                        Number(e.target.value)
                      )
                    }
                    className={`${inputAdminClass} text-sm`}
                  />
                </div>
                <div className="col-span-3 flex items-end">
                  <button
                    onClick={() => handleDeleteSkill(categoryIndex, itemIndex)}
                    className={`${dangerButtonClass} text-xs py-1 px-2 h-full`} // Adjusted for size
                  >
                    Delete Skill
                  </button>
                </div>
              </div>
            ))}
          </div>
        ))}
      </section>

      <div className="mt-8 flex justify-end">
        <button
          onClick={handleSave}
          disabled={saveStatus === "saving"}
          className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-md shadow-md disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {saveStatus === "saving" && "Saving..."}
          {saveStatus === "success" && "Saved Successfully!"}
          {saveStatus === "error" && "Save Error!"}
          {saveStatus === "idle" && "Save Local Changes"}
        </button>
      </div>
      {saveStatus === "error" && saveError && (
        <p className="text-sm text-red-500 dark:text-red-400 mt-2 text-right">
          Save Error: {saveError}
        </p>
      )}
      {saveStatus === "error" && !saveError && (
         <p className="text-sm text-red-500 dark:text-red-400 mt-2 text-right">
          Failed to save changes. Please try again.
        </p>
      )}
    </div>
  );
};

export default AdminDashboardClient;
