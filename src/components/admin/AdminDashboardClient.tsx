'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { FullSiteContent, Project, SkillCategory, SkillItem } from '@/services/contentService';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus, Trash2, Save, LogOut, CheckCircle2, XCircle, User, Briefcase, Code2, LayoutGrid, Upload, Image as ImageIcon, Settings } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import Image from 'next/image';

interface AdminDashboardClientProps {
  initialContent: FullSiteContent;
}

export default function AdminDashboardClient({ initialContent }: AdminDashboardClientProps) {
  const [content, setContent] = useState<FullSiteContent>(initialContent);
  const [isSaving, setIsSaving] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);
  const [alert, setAlert] = useState<{ type: 'success' | 'error', message: string } | null>(null);
  const router = useRouter();

  // Track changes to show floating save bar
  useEffect(() => {
    // Simple check: if content changes from initial, show save bar. 
    // For now, we'll just set hasChanges to true on any edit.
  }, [content]);

  const handleSave = async () => {
    setIsSaving(true);
    setAlert(null);
    try {
      const res = await fetch('/api/admin/content', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(content),
      });

      if (!res.ok) throw new Error('Failed to save');

      setAlert({ type: 'success', message: 'Settings saved successfully' });
      setHasChanges(false);
      router.refresh();

      // Clear alert after 3 seconds
      setTimeout(() => setAlert(null), 3000);
    } catch (error) {
      setAlert({ type: 'error', message: 'Failed to save settings' });
    } finally {
      setIsSaving(false);
    }
  };

  const handleLogout = () => {
    document.cookie = 'admin_access=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    router.push('/');
    router.refresh();
  };

  const handleFileUpload = async (file: File): Promise<string | null> => {
    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await fetch('/api/admin/upload', {
        method: 'POST',
        body: formData,
      });

      if (!res.ok) throw new Error('Upload failed');

      const data = await res.json();
      return data.url;
    } catch (error) {
      console.error('Upload error:', error);
      setAlert({ type: 'error', message: 'Failed to upload image' });
      return null;
    }
  };

  // --- State Updaters ---

  const updateProfile = (field: string, value: any) => {
    if (!content.user) return;
    setContent({ ...content, user: { ...content.user, [field]: value } });
    setHasChanges(true);
  };

  const updateAbout = (field: string, value: string) => {
    if (!content.about) return;
    setContent({ ...content, about: { ...content.about, [field]: value } });
    setHasChanges(true);
  };

  const addProject = () => {
    const newProject: Project = {
      id: Date.now().toString(),
      title: 'New Project',
      description: '',
      tags: [],
      imageUrl: '',
      githubLink: '',
      demoLink: ''
    };
    setContent({ ...content, projects: [newProject, ...content.projects] });
    setHasChanges(true);
  };

  const updateProject = (id: string, field: keyof Project, value: any) => {
    const updatedProjects = content.projects.map(p =>
      p.id === id ? { ...p, [field]: value } : p
    );
    setContent({ ...content, projects: updatedProjects });
    setHasChanges(true);
  };

  const deleteProject = (id: string) => {
    if (!confirm('Are you sure?')) return;
    setContent({ ...content, projects: content.projects.filter(p => p.id !== id) });
    setHasChanges(true);
  };

  const addCategory = () => {
    const newCategory: SkillCategory = {
      category: 'New Category',
      items: []
    };
    setContent({ ...content, skills: [...content.skills, newCategory] });
    setHasChanges(true);
  };

  const updateCategoryName = (index: number, name: string) => {
    const newSkills = [...content.skills];
    newSkills[index].category = name;
    setContent({ ...content, skills: newSkills });
    setHasChanges(true);
  };

  const deleteCategory = (index: number) => {
    if (!confirm('Delete this entire category?')) return;
    const newSkills = [...content.skills];
    newSkills.splice(index, 1);
    setContent({ ...content, skills: newSkills });
    setHasChanges(true);
  };

  const updateSkillItem = (catIndex: number, skillIndex: number, field: keyof SkillItem, value: any) => {
    const newSkills = [...content.skills];
    newSkills[catIndex].items[skillIndex] = { ...newSkills[catIndex].items[skillIndex], [field]: value };
    setContent({ ...content, skills: newSkills });
    setHasChanges(true);
  };

  const addSkillItem = (catIndex: number) => {
    const newSkills = [...content.skills];
    newSkills[catIndex].items.push({ name: 'New Skill', proficiency: 50 });
    setContent({ ...content, skills: newSkills });
    setHasChanges(true);
  };

  const deleteSkillItem = (catIndex: number, skillIndex: number) => {
    if (!confirm('Are you sure?')) return;
    const newSkills = [...content.skills];
    newSkills[catIndex].items.splice(skillIndex, 1);
    setContent({ ...content, skills: newSkills });
    setHasChanges(true);
  };

  const updateUI = (section: string, key: string, value: any) => {
    if (!content.ui) return;
    const newUI = { ...content.ui };
    // @ts-ignore
    if (!newUI[section]) newUI[section] = {};
    // @ts-ignore
    newUI[section][key] = value;
    setContent({ ...content, ui: newUI });
    setHasChanges(true);
  };

  const updateNavLink = (index: number, field: 'href' | 'label', value: string) => {
    if (!content.ui) return;
    const newNavLinks = [...content.ui.navLinks];
    newNavLinks[index] = { ...newNavLinks[index], [field]: value };
    setContent({ ...content, ui: { ...content.ui, navLinks: newNavLinks } });
    setHasChanges(true);
  };


  return (
    <div className="relative min-h-screen pb-24">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-4xl font-bold tracking-tight mb-2">System Settings</h1>
          <p className="text-muted-foreground">Manage your portfolio content and configuration.</p>
        </div>
        <button
          onClick={handleLogout}
          className="glass-button text-sm px-4 py-2 h-auto"
        >
          <LogOut className="w-4 h-4 mr-2" />
          Logout
        </button>
      </div>

      <Tabs defaultValue="profile" className="space-y-8">
        <TabsList className="bg-white/5 p-1 rounded-full border border-white/10 backdrop-blur-md inline-flex">
          <TabsTrigger value="profile" className="rounded-full px-6 data-[state=active]:bg-white/10 data-[state=active]:text-foreground">
            <User className="w-4 h-4 mr-2" /> Profile
          </TabsTrigger>
          <TabsTrigger value="projects" className="rounded-full px-6 data-[state=active]:bg-white/10 data-[state=active]:text-foreground">
            <Briefcase className="w-4 h-4 mr-2" /> Projects
          </TabsTrigger>
          <TabsTrigger value="skills" className="rounded-full px-6 data-[state=active]:bg-white/10 data-[state=active]:text-foreground">
            <Code2 className="w-4 h-4 mr-2" /> Skills
          </TabsTrigger>
          <TabsTrigger value="config" className="rounded-full px-6 data-[state=active]:bg-white/10 data-[state=active]:text-foreground">
            <Settings className="w-4 h-4 mr-2" /> Configuration
          </TabsTrigger>
        </TabsList>

        {/* Profile Tab */}
        <TabsContent value="profile" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* User Info Panel */}
            <div className="glass-panel p-8 space-y-6">
              <h3 className="text-xl font-semibold flex items-center gap-2">
                <User className="w-5 h-5 text-blue-400" /> Identity
              </h3>
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-xs uppercase tracking-widest text-muted-foreground font-semibold">Full Name</label>
                  <input
                    className="glass-input"
                    value={content.user?.name || ''}
                    onChange={(e) => updateProfile('name', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs uppercase tracking-widest text-muted-foreground font-semibold">Location</label>
                  <input
                    className="glass-input"
                    value={content.user?.location || ''}
                    onChange={(e) => updateProfile('location', e.target.value)}
                    placeholder="e.g. Tel Aviv, Israel"
                  />
                </div>
                <div className="space-y-3">
                  <label className="text-xs uppercase tracking-widest text-muted-foreground font-semibold">Taglines (Typewriter Effect)</label>
                  <div className="space-y-2">
                    {(content.user?.taglines || []).map((tagline, index) => (
                      <div key={index} className="flex gap-2">
                        <input
                          className="glass-input"
                          value={tagline}
                          onChange={(e) => {
                            const newTaglines = [...(content.user?.taglines || [])];
                            newTaglines[index] = e.target.value;
                            updateProfile('taglines', newTaglines);
                          }}
                          placeholder={`Phrase ${index + 1}`}
                        />
                        <button
                          onClick={() => {
                            const newTaglines = [...(content.user?.taglines || [])];
                            newTaglines.splice(index, 1);
                            updateProfile('taglines', newTaglines);
                          }}
                          className="glass-button text-red-400 hover:bg-red-500/10 px-3"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                    <button
                      onClick={() => {
                        const newTaglines = [...(content.user?.taglines || [])];
                        newTaglines.push('');
                        updateProfile('taglines', newTaglines);
                      }}
                      className="glass-button text-xs px-3 py-2 w-full flex items-center justify-center gap-2 text-blue-300 hover:text-blue-200"
                    >
                      <Plus className="w-3 h-3" /> Add Tagline
                    </button>
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-xs uppercase tracking-widest text-muted-foreground font-semibold">Intro</label>
                  <textarea
                    className="glass-input min-h-[100px] resize-none"
                    value={content.user?.intro || ''}
                    onChange={(e) => updateProfile('intro', e.target.value)}
                  />
                </div>
                {/* Profile Image Upload */}
                <div className="space-y-2">
                  <label className="text-xs uppercase tracking-widest text-muted-foreground font-semibold">Profile Image</label>
                  <div className="flex items-center gap-4">
                    <div className="relative w-16 h-16 rounded-full overflow-hidden border border-white/10 bg-white/5">
                      {content.user?.profileImage ? (
                        <Image
                          src={content.user.profileImage}
                          alt="Profile"
                          fill
                          className={`object-cover ${cn(
                            content.user.imagePosition === 'top' ? 'object-top' :
                              content.user.imagePosition === 'bottom' ? 'object-bottom' : 'object-center'
                          )}`}
                        />
                      ) : (
                        <User className="w-8 h-8 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white/20" />
                      )}
                    </div>
                    <div className="flex-1 space-y-2">
                      <div className="flex gap-2">
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          id="profile-image-upload"
                          onChange={async (e) => {
                            const file = e.target.files?.[0];
                            if (file) {
                              const url = await handleFileUpload(file);
                              if (url) updateProfile('profileImage', url);
                            }
                          }}
                        />
                        <label
                          htmlFor="profile-image-upload"
                          className="glass-button text-sm px-4 py-2 cursor-pointer flex items-center justify-center gap-2 w-fit"
                        >
                          <Upload className="w-4 h-4" />
                          Upload New Photo
                        </label>
                        <select
                          className="glass-input w-auto py-1 px-3 text-sm"
                          value={content.user?.imagePosition || 'center'}
                          onChange={(e) => updateProfile('imagePosition', e.target.value)}
                        >
                          <option value="center">Center</option>
                          <option value="top">Top</option>
                          <option value="bottom">Bottom</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Social Links Panel */}
            <div className="glass-panel p-8 space-y-6">
              <h3 className="text-xl font-semibold flex items-center gap-2">
                <LayoutGrid className="w-5 h-5 text-purple-400" /> Connections
              </h3>
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-xs uppercase tracking-widest text-muted-foreground font-semibold">GitHub URL</label>
                  <input
                    className="glass-input"
                    value={content.user?.github || ''}
                    onChange={(e) => updateProfile('github', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs uppercase tracking-widest text-muted-foreground font-semibold">LinkedIn URL</label>
                  <input
                    className="glass-input"
                    value={content.user?.linkedin || ''}
                    onChange={(e) => updateProfile('linkedin', e.target.value)}
                  />
                </div>
              </div>
            </div>

            {/* About & Bio Panel - Full Width */}
            <div className="glass-panel p-8 space-y-6 md:col-span-2">
              <h3 className="text-xl font-semibold flex items-center gap-2">
                <Briefcase className="w-5 h-5 text-green-400" /> Biography
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2 md:col-span-2">
                  <label className="text-xs uppercase tracking-widest text-muted-foreground font-semibold">Full Bio</label>
                  <textarea
                    className="glass-input min-h-[150px]"
                    value={content.about?.bio || ''}
                    onChange={(e) => updateAbout('bio', e.target.value)}
                  />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <label className="text-xs uppercase tracking-widest text-muted-foreground font-semibold">Experience</label>
                  <textarea
                    className="glass-input min-h-[100px]"
                    value={content.about?.experience || ''}
                    onChange={(e) => updateAbout('experience', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs uppercase tracking-widest text-muted-foreground font-semibold">Education</label>
                  <input
                    className="glass-input"
                    value={content.about?.education || ''}
                    onChange={(e) => updateAbout('education', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs uppercase tracking-widest text-muted-foreground font-semibold">CS & Math Background</label>
                  <textarea
                    className="glass-input min-h-[80px]"
                    value={content.about?.csMathBackground || ''}
                    onChange={(e) => updateAbout('csMathBackground', e.target.value)}
                  />
                </div>
              </div>
            </div>
          </div>
        </TabsContent>

        {/* Projects Tab */}
        <TabsContent value="projects" className="space-y-6">
          <div className="flex justify-end">
            <button onClick={addProject} className="glass-button text-sm px-4 py-2 h-auto">
              <Plus className="w-4 h-4 mr-2" /> Add Project
            </button>
          </div>
          <div className="grid grid-cols-1 gap-6">
            {content.projects.map((project) => (
              <div key={project.id} className="glass-panel p-6 relative group">
                <button
                  onClick={() => deleteProject(project.id)}
                  className="absolute top-4 right-4 p-2 rounded-full bg-red-500/10 text-red-500 hover:bg-red-500/20 transition-colors opacity-0 group-hover:opacity-100 z-10"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <label className="text-xs uppercase tracking-widest text-muted-foreground font-semibold">Title</label>
                      <input
                        className="glass-input font-bold text-lg"
                        value={project.title}
                        onChange={(e) => updateProject(project.id, 'title', e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs uppercase tracking-widest text-muted-foreground font-semibold">Description</label>
                      <textarea
                        className="glass-input min-h-[100px]"
                        value={project.description}
                        onChange={(e) => updateProject(project.id, 'description', e.target.value)}
                      />
                    </div>

                    {/* Project Image Upload */}
                    <div className="space-y-2">
                      <label className="text-xs uppercase tracking-widest text-muted-foreground font-semibold">Project Image</label>
                      <div className="flex items-start gap-4">
                        <div className="relative w-24 h-16 rounded-lg overflow-hidden border border-white/10 bg-white/5 shrink-0">
                          {project.imageUrl ? (
                            <Image
                              src={project.imageUrl}
                              alt={project.title}
                              fill
                              className={`object-cover ${cn(
                                project.imagePosition === 'top' ? 'object-top' :
                                  project.imagePosition === 'bottom' ? 'object-bottom' : 'object-center'
                              )}`}
                            />
                          ) : (
                            <ImageIcon className="w-8 h-8 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white/20" />
                          )}
                        </div>
                        <div className="flex-1 space-y-2">
                          <div className="flex gap-2">
                            <input
                              type="file"
                              accept="image/*"
                              className="hidden"
                              id={`file-${project.id}`}
                              onChange={async (e) => {
                                const file = e.target.files?.[0];
                                if (file) {
                                  const url = await handleFileUpload(file);
                                  if (url) updateProject(project.id, 'imageUrl', url);
                                }
                              }}
                            />
                            <label
                              htmlFor={`file-${project.id}`}
                              className="glass-button text-xs px-3 py-2 cursor-pointer flex items-center justify-center gap-2 w-fit"
                            >
                              <Upload className="w-3 h-3" />
                              {project.imageUrl ? 'Change' : 'Upload'}
                            </label>
                            <select
                              className="glass-input w-auto py-1 px-2 text-xs h-auto"
                              value={project.imagePosition || 'center'}
                              onChange={(e) => updateProject(project.id, 'imagePosition', e.target.value)}
                            >
                              <option value="center">Center</option>
                              <option value="top">Top</option>
                              <option value="bottom">Bottom</option>
                            </select>
                          </div>
                          <input
                            className="glass-input text-xs py-1 px-2 h-8"
                            placeholder="Or paste URL..."
                            value={project.imageUrl || ''}
                            onChange={(e) => updateProject(project.id, 'imageUrl', e.target.value)}
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="space-y-2">
                      <label className="text-xs uppercase tracking-widest text-muted-foreground font-semibold">Tags (comma separated)</label>
                      <input
                        className="glass-input"
                        value={project.tags.join(', ')}
                        onChange={(e) => updateProject(project.id, 'tags', e.target.value.split(',').map(s => s.trim()))}
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-xs uppercase tracking-widest text-muted-foreground font-semibold">GitHub Link</label>
                        <input
                          className="glass-input"
                          value={project.githubLink || ''}
                          onChange={(e) => updateProject(project.id, 'githubLink', e.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs uppercase tracking-widest text-muted-foreground font-semibold">Demo Link</label>
                        <input
                          className="glass-input"
                          value={project.demoLink || ''}
                          onChange={(e) => updateProject(project.id, 'demoLink', e.target.value)}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </TabsContent>

        {/* Skills Tab */}
        <TabsContent value="skills" className="space-y-6">
          <div className="flex justify-end">
            <button onClick={addCategory} className="glass-button text-sm px-4 py-2 h-auto">
              <Plus className="w-4 h-4 mr-2" /> Add Category
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {content.skills.map((category, catIndex) => (
              <div key={catIndex} className="glass-panel p-6 space-y-4 relative group">
                <button
                  onClick={() => deleteCategory(catIndex)}
                  className="absolute top-4 right-4 p-2 rounded-full bg-red-500/10 text-red-500 hover:bg-red-500/20 transition-colors opacity-0 group-hover:opacity-100 z-10"
                  title="Delete Category"
                >
                  <Trash2 className="w-4 h-4" />
                </button>

                <div className="border-b border-white/10 pb-4 pr-10">
                  <label className="text-xs uppercase tracking-widest text-muted-foreground font-semibold block mb-2">Category Name</label>
                  <input
                    className="glass-input font-bold text-lg bg-transparent border-transparent px-0 py-0 focus:bg-white/5 focus:px-3 focus:py-2"
                    value={category.category}
                    onChange={(e) => updateCategoryName(catIndex, e.target.value)}
                  />
                </div>

                <div className="space-y-3">
                  {category.items.map((skill, skillIndex) => (
                    <div key={skillIndex} className="flex items-center gap-3 group/item">
                      <input
                        className="glass-input py-2"
                        value={skill.name}
                        onChange={(e) => updateSkillItem(catIndex, skillIndex, 'name', e.target.value)}
                        placeholder="Skill Name"
                      />
                      <input
                        type="number"
                        className="glass-input py-2 w-20 text-center"
                        value={skill.proficiency}
                        onChange={(e) => updateSkillItem(catIndex, skillIndex, 'proficiency', parseInt(e.target.value))}
                        min="0" max="100"
                      />
                      <button
                        onClick={() => deleteSkillItem(catIndex, skillIndex)}
                        className="p-2 text-red-400 hover:bg-red-500/10 rounded-full transition-colors opacity-0 group-hover/item:opacity-100"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}

                  <button
                    onClick={() => addSkillItem(catIndex)}
                    className="w-full py-2 mt-2 rounded-xl border border-dashed border-white/20 text-white/40 hover:text-white hover:border-white/40 hover:bg-white/5 transition-all text-sm flex items-center justify-center gap-2"
                  >
                    <Plus className="w-4 h-4" /> Add Skill
                  </button>
                </div>
              </div>
            ))}
          </div>
        </TabsContent>

        {/* Configuration Tab */}
        <TabsContent value="config" className="space-y-8">
          {content.ui && (
            <>
              {/* Navigation */}
              <div className="glass-panel p-8 space-y-6">
                <h3 className="text-xl font-semibold flex items-center gap-2">
                  <LayoutGrid className="w-5 h-5 text-yellow-400" /> Navigation
                </h3>
                <div className="space-y-4">
                  {content.ui.navLinks.map((link, index) => (
                    <div key={index} className="grid grid-cols-2 gap-4">
                      <input
                        className="glass-input"
                        value={link.label}
                        onChange={(e) => updateNavLink(index, 'label', e.target.value)}
                        placeholder="Label"
                      />
                      <input
                        className="glass-input font-mono text-sm"
                        value={link.href}
                        onChange={(e) => updateNavLink(index, 'href', e.target.value)}
                        placeholder="Path"
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Pages Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                {/* Home Page Config */}
                <div className="glass-panel p-6 space-y-4">
                  <h3 className="text-lg font-semibold text-white/90 border-b border-white/10 pb-2">Home Page</h3>
                  <div className="space-y-3">
                    <div>
                      <label className="text-xs uppercase tracking-widest text-muted-foreground font-semibold">Project Button</label>
                      <input className="glass-input" value={content.ui.home.buttonProjects} onChange={(e) => updateUI('home', 'buttonProjects', e.target.value)} />
                    </div>
                    <div>
                      <label className="text-xs uppercase tracking-widest text-muted-foreground font-semibold">Contact Button</label>
                      <input className="glass-input" value={content.ui.home.buttonContact} onChange={(e) => updateUI('home', 'buttonContact', e.target.value)} />
                    </div>
                  </div>
                </div>

                {/* About Page Config */}
                <div className="glass-panel p-6 space-y-4">
                  <h3 className="text-lg font-semibold text-white/90 border-b border-white/10 pb-2">About Page</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs uppercase tracking-widest text-muted-foreground font-semibold">Bio Title</label>
                      <input className="glass-input" value={content.ui.about.sectionBio} onChange={(e) => updateUI('about', 'sectionBio', e.target.value)} />
                    </div>
                    <div>
                      <label className="text-xs uppercase tracking-widest text-muted-foreground font-semibold">Exp. Title</label>
                      <input className="glass-input" value={content.ui.about.sectionExperience} onChange={(e) => updateUI('about', 'sectionExperience', e.target.value)} />
                    </div>
                    <div>
                      <label className="text-xs uppercase tracking-widest text-muted-foreground font-semibold">Edu. Title</label>
                      <input className="glass-input" value={content.ui.about.sectionEducation} onChange={(e) => updateUI('about', 'sectionEducation', e.target.value)} />
                    </div>
                    <div>
                      <label className="text-xs uppercase tracking-widest text-muted-foreground font-semibold">CS Title</label>
                      <input className="glass-input" value={content.ui.about.sectionCS} onChange={(e) => updateUI('about', 'sectionCS', e.target.value)} />
                    </div>
                  </div>
                  <div className="pt-2 border-t border-white/10">
                    <label className="text-xs text-muted-foreground mb-2 block">Value Labels</label>
                    <div className="grid grid-cols-3 gap-2">
                      <input className="glass-input text-xs" value={content.ui.about.locationLabel} onChange={(e) => updateUI('about', 'locationLabel', e.target.value)} />
                      <input className="glass-input text-xs" value={content.ui.about.experienceLabel} onChange={(e) => updateUI('about', 'experienceLabel', e.target.value)} />
                      <input className="glass-input text-xs" value={content.ui.about.emailLabel} onChange={(e) => updateUI('about', 'emailLabel', e.target.value)} />
                    </div>
                  </div>
                </div>

                {/* Projects Page Config */}
                <div className="glass-panel p-6 space-y-4">
                  <h3 className="text-lg font-semibold text-white/90 border-b border-white/10 pb-2">Projects Page</h3>
                  <div className="space-y-3">
                    <div>
                      <label className="text-xs uppercase tracking-widest text-muted-foreground font-semibold">Page Title</label>
                      <input className="glass-input" value={content.ui.projects.title} onChange={(e) => updateUI('projects', 'title', e.target.value)} />
                    </div>
                    <div>
                      <label className="text-xs uppercase tracking-widest text-muted-foreground font-semibold">Filter Heading</label>
                      <input className="glass-input" value={content.ui.projects.filterTitle} onChange={(e) => updateUI('projects', 'filterTitle', e.target.value)} />
                    </div>
                    <div>
                      <label className="text-xs uppercase tracking-widest text-muted-foreground font-semibold">No Results Msg</label>
                      <input className="glass-input" value={content.ui.projects.noResults} onChange={(e) => updateUI('projects', 'noResults', e.target.value)} />
                    </div>
                  </div>
                </div>

                {/* Skills Page Config */}
                <div className="glass-panel p-6 space-y-4">
                  <h3 className="text-lg font-semibold text-white/90 border-b border-white/10 pb-2">Skills Page</h3>
                  <div>
                    <label className="text-xs uppercase tracking-widest text-muted-foreground font-semibold">Page Title</label>
                    <input className="glass-input" value={content.ui.skills.title} onChange={(e) => updateUI('skills', 'title', e.target.value)} />
                  </div>
                </div>

                {/* Contact Page Config */}
                <div className="glass-panel p-6 space-y-4 md:col-span-2">
                  <h3 className="text-lg font-semibold text-white/90 border-b border-white/10 pb-2">Contact Page</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-3">
                      <div>
                        <label className="text-xs uppercase tracking-widest text-muted-foreground font-semibold">Page Title</label>
                        <input className="glass-input" value={content.ui.contact.title} onChange={(e) => updateUI('contact', 'title', e.target.value)} />
                      </div>
                      <div>
                        <label className="text-xs uppercase tracking-widest text-muted-foreground font-semibold">Form Title</label>
                        <input className="glass-input" value={content.ui.contact.formTitle} onChange={(e) => updateUI('contact', 'formTitle', e.target.value)} />
                      </div>
                      <div>
                        <label className="text-xs uppercase tracking-widest text-muted-foreground font-semibold">Info Title</label>
                        <input className="glass-input" value={content.ui.contact.infoTitle} onChange={(e) => updateUI('contact', 'infoTitle', e.target.value)} />
                      </div>
                      <div>
                        <label className="text-xs uppercase tracking-widest text-muted-foreground font-semibold">Info Text</label>
                        <textarea className="glass-input min-h-[60px]" value={content.ui.contact.infoText} onChange={(e) => updateUI('contact', 'infoText', e.target.value)} />
                      </div>
                    </div>
                    <div className="space-y-3">
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="text-xs uppercase tracking-widest text-muted-foreground font-semibold">Name Label</label>
                          <input className="glass-input" value={content.ui.contact.nameLabel} onChange={(e) => updateUI('contact', 'nameLabel', e.target.value)} />
                        </div>
                        <div>
                          <label className="text-xs uppercase tracking-widest text-muted-foreground font-semibold">Email Label</label>
                          <input className="glass-input" value={content.ui.contact.emailLabel} onChange={(e) => updateUI('contact', 'emailLabel', e.target.value)} />
                        </div>
                      </div>
                      <div>
                        <label className="text-xs uppercase tracking-widest text-muted-foreground font-semibold">Message Label</label>
                        <input className="glass-input" value={content.ui.contact.messageLabel} onChange={(e) => updateUI('contact', 'messageLabel', e.target.value)} />
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="text-xs uppercase tracking-widest text-muted-foreground font-semibold">LinkedIn Label</label>
                          <input className="glass-input" value={content.ui.contact.linkedinText} onChange={(e) => updateUI('contact', 'linkedinText', e.target.value)} />
                        </div>
                        <div>
                          <label className="text-xs uppercase tracking-widest text-muted-foreground font-semibold">GitHub Label</label>
                          <input className="glass-input" value={content.ui.contact.githubText} onChange={(e) => updateUI('contact', 'githubText', e.target.value)} />
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="text-xs uppercase tracking-widest text-muted-foreground font-semibold">Email Link</label>
                          <input className="glass-input" value={content.ui.contact.emailText} onChange={(e) => updateUI('contact', 'emailText', e.target.value)} />
                        </div>
                        <div>
                          <label className="text-xs uppercase tracking-widest text-muted-foreground font-semibold">Submit Button</label>
                          <input className="glass-input" value={content.ui.contact.submitButton} onChange={(e) => updateUI('contact', 'submitButton', e.target.value)} />
                        </div>
                      </div>
                      <div className="space-y-2 pt-2 border-t border-white/10">
                        <label className="text-xs uppercase tracking-widest text-muted-foreground font-semibold">Resume Prompt</label>
                        <input className="glass-input" value={content.ui.contact.resumePrompt} onChange={(e) => updateUI('contact', 'resumePrompt', e.target.value)} />
                        <label className="text-xs uppercase tracking-widest text-muted-foreground font-semibold mt-2">Download Button</label>
                        <input className="glass-input" value={content.ui.contact.downloadResume} onChange={(e) => updateUI('contact', 'downloadResume', e.target.value)} />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Footer Config */}
                <div className="glass-panel p-6 space-y-4">
                  <h3 className="text-lg font-semibold text-white/90 border-b border-white/10 pb-2">Footer</h3>
                  <div>
                    <label className="text-xs uppercase tracking-widest text-muted-foreground font-semibold">Rights Text</label>
                    <input className="glass-input" value={content.ui.footer.rightsText} onChange={(e) => updateUI('footer', 'rightsText', e.target.value)} />
                  </div>
                </div>

              </div>
            </>
          )}
        </TabsContent>
      </Tabs>

      {/* Floating Save Bar */}
      <AnimatePresence>
        {hasChanges && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50"
          >
            <div className="glass-panel px-6 py-3 flex items-center gap-4 bg-black/80 backdrop-blur-2xl border-white/20">
              <span className="text-sm font-medium text-white">Unsaved changes</span>
              <div className="h-4 w-px bg-white/20" />
              <button
                onClick={() => {
                  setContent(initialContent);
                  setHasChanges(false);
                }}
                className="text-sm text-white/60 hover:text-white transition-colors"
              >
                Reset
              </button>
              <button
                onClick={handleSave}
                disabled={isSaving}
                className="bg-white text-black px-4 py-1.5 rounded-full text-sm font-bold hover:scale-105 active:scale-95 transition-all"
              >
                {isSaving ? 'Saving...' : 'Save Changes'}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Toast Notification */}
      <AnimatePresence>
        {alert && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className={cn(
              "fixed bottom-8 right-8 z-50 px-6 py-4 rounded-2xl backdrop-blur-xl border shadow-2xl flex items-center gap-3",
              alert.type === 'success'
                ? "bg-green-500/20 border-green-500/30 text-green-200"
                : "bg-red-500/20 border-red-500/30 text-red-200"
            )}
          >
            {alert.type === 'success' ? <CheckCircle2 className="w-5 h-5" /> : <XCircle className="w-5 h-5" />}
            <span className="font-medium">{alert.message}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div >
  );
}
