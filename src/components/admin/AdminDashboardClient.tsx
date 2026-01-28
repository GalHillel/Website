'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
  FullSiteContent,
  ExperienceItem,
  EducationItem,
  Project,
  SkillCategory,
  SectionTitles
} from '@/services/contentService';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Save, LogOut, CheckCircle2, AlertCircle,
  User, Briefcase, GraduationCap, FolderGit2,
  Wrench, Settings, ExternalLink, Github, ChevronRight,
  MapPin, Globe, Mail, Trash2, X
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import DynamicListEditor from './DynamicListEditor';


interface InputGroupProps {
  label: string;
  value: string | undefined;
  onChange: (value: string) => void;
  placeholder?: string;
  type?: "text" | "textarea" | "number" | "password";
  className?: string;
}

const InputGroup = ({ label, value, onChange, placeholder, type = "text", className }: InputGroupProps) => (
  <div className={cn("space-y-1.5", className)}>
    <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">{label}</label>
    {type === "textarea" ? (
      <textarea className="w-full bg-[#0F1117] border border-white/10 rounded-lg px-4 py-2.5 text-gray-200 focus:border-blue-500/50 outline-none text-sm min-h-[100px]"
        value={value || ''} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} />
    ) : (
      <input className="w-full bg-[#0F1117] border border-white/10 rounded-lg px-4 py-2.5 text-gray-200 focus:border-blue-500/50 outline-none text-sm"
        value={value || ''} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} type={type} />
    )}
  </div>
);

interface ExperienceEditFormProps {
  item?: ExperienceItem | null;
  onSave: (item: ExperienceItem) => void;
  onCancel: () => void;
}

const ExperienceEditForm = ({ item, onSave, onCancel }: ExperienceEditFormProps) => {
  const [formData, setFormData] = useState<ExperienceItem>(item || {} as any);
  const handleChange = (f: keyof ExperienceItem, v: string) => setFormData({ ...formData, [f]: v });

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <InputGroup label="Role" value={formData.role} onChange={(v: string) => handleChange('role', v)} />
        <InputGroup label="Company" value={formData.company} onChange={(v: string) => handleChange('company', v)} />
      </div>
      <InputGroup label="Period (e.g. 2023 - Present)" value={formData.period} onChange={(v: string) => handleChange('period', v)} />
      <InputGroup label="Description" value={formData.description} onChange={(v: string) => handleChange('description', v)} type="textarea" />
      <div className="flex gap-3 pt-2">
        <button onClick={() => onSave(formData)} className="px-4 py-2 bg-indigo-600 text-white text-xs font-bold rounded-md hover:bg-indigo-500">Save Entry</button>
        <button onClick={onCancel} className="px-4 py-2 bg-transparent border border-white/10 text-white text-xs font-bold rounded-md hover:bg-white/5">Cancel</button>
      </div>
    </div>
  );
};

interface EducationEditFormProps {
  item?: EducationItem | null;
  onSave: (item: EducationItem) => void;
  onCancel: () => void;
}

const EducationEditForm = ({ item, onSave, onCancel }: EducationEditFormProps) => {
  const [formData, setFormData] = useState<EducationItem>(item || {} as any);
  const handleChange = (f: keyof EducationItem, v: string) => setFormData({ ...formData, [f]: v });

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <InputGroup label="Degree" value={formData.degree} onChange={(v: string) => handleChange('degree', v)} />
        <InputGroup label="Institution" value={formData.institution} onChange={(v: string) => handleChange('institution', v)} />
      </div>
      <InputGroup label="Year" value={formData.year} onChange={(v: string) => handleChange('year', v)} />
      <InputGroup label="Description" value={formData.description} onChange={(v: string) => handleChange('description', v)} type="textarea" />
      <div className="flex gap-3 pt-2">
        <button onClick={() => onSave(formData)} className="px-4 py-2 bg-indigo-600 text-white text-xs font-bold rounded-md hover:bg-indigo-500">Save Entry</button>
        <button onClick={onCancel} className="px-4 py-2 bg-transparent border border-white/10 text-white text-xs font-bold rounded-md hover:bg-white/5">Cancel</button>
      </div>
    </div>
  );
};

interface AdminDashboardClientProps {
  initialContent: FullSiteContent;
}

export default function AdminDashboardClient({ initialContent }: AdminDashboardClientProps) {
  const [content, setContent] = useState<FullSiteContent>(initialContent);
  const [isSaving, setIsSaving] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);
  const [activeTab, setActiveTab] = useState("general");
  const [alert, setAlert] = useState<{ type: 'success' | 'error', message: string } | null>(null);
  const router = useRouter();

  useEffect(() => {
    setContent(initialContent);
    setHasChanges(false);
  }, [initialContent]);

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

      setAlert({ type: 'success', message: 'Published successfully.' });
      setHasChanges(false);
      router.refresh();
      setTimeout(() => setAlert(null), 3000);
    } catch (error) {
      setAlert({ type: 'error', message: 'Failed to publish. Check connection.' });
    } finally {
      setIsSaving(false);
    }
  };

  const handleFileUpload = async (file: File): Promise<string | null> => {
    const formData = new FormData();
    formData.append('file', file);
    try {
      const res = await fetch('/api/admin/upload', { method: 'POST', body: formData });
      if (!res.ok) throw new Error('Upload failed');
      const data = await res.json();
      return data.url;
    } catch (error) {
      console.error('Upload error:', error);
      setAlert({ type: 'error', message: 'Upload failed' });
      return null;
    }
  };

  const updateField = (path: string[], value: any) => {
    const newContent = { ...content };
    let current: any = newContent;
    for (let i = 0; i < path.length - 1; i++) {
      if (!current[path[i]]) current[path[i]] = {};
      current = current[path[i]];
    }
    current[path[path.length - 1]] = value;
    setContent(newContent);
    setHasChanges(true);
  };



  return (
    <div className="min-h-screen pb-32 bg-[#020617] text-gray-200 font-sans selection:bg-blue-500/30 selection:text-white">

      {/* --- TOP BAR --- */}
      <div className="sticky top-0 z-50 bg-[#020617]/90 backdrop-blur-md border-b border-white/5 h-16 px-6 flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center shadow-lg shadow-indigo-900/20">
            <Settings className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-sm font-bold text-white tracking-wide">CMS Dashboard</h1>
            <p className="text-[10px] text-gray-500 font-mono">v2.0 • Production</p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          {hasChanges && (
            <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-yellow-500/10 text-yellow-500 border border-yellow-500/20 mr-2">
              <div className="w-1.5 h-1.5 rounded-full bg-yellow-500 animate-pulse" />
              <span className="text-[10px] font-bold uppercase tracking-wider">Unsaved</span>
            </div>
          )}
          <button
            onClick={handleSave}
            disabled={!hasChanges || isSaving}
            className={cn(
              "flex items-center gap-2 px-5 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all shadow-lg",
              hasChanges
                ? "bg-indigo-600 hover:bg-indigo-500 text-white shadow-indigo-600/20"
                : "bg-white/5 text-white/30 cursor-not-allowed"
            )}
          >
            {isSaving ? <span className="animate-spin w-4 h-4 border-2 border-white/30 border-t-white rounded-full" /> : <Save className="w-4 h-4" />}
            Publish
          </button>
          <button onClick={() => { document.cookie = 'admin_access=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;'; router.push('/'); }}
            className="p-2 text-gray-500 hover:text-white transition-colors">
            <LogOut className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* --- MAINFRAME GRID --- */}
      <div className="container mx-auto px-6 py-8 max-w-7xl grid grid-cols-1 lg:grid-cols-12 gap-8">

        {/* SIDEBAR NAVIGATION */}
        <div className="lg:col-span-2 space-y-6 sticky top-24 self-start">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="bg-transparent flex flex-col items-start h-auto p-0 space-y-1 w-full">
              {[
                { id: 'general', icon: User, label: 'Profile' },
                { id: 'experience', icon: Briefcase, label: 'Experience' },
                { id: 'education', icon: GraduationCap, label: 'Education' },
                { id: 'projects', icon: FolderGit2, label: 'Projects' },
                { id: 'skills', icon: Wrench, label: 'Skills' },
                { id: 'settings', icon: Settings, label: 'Settings' },
              ].map((tab) => (
                <TabsTrigger key={tab.id} value={tab.id} className="w-full justify-start px-4 py-3 rounded-xl data-[state=active]:bg-white/10 data-[state=active]:text-white text-gray-500 transition-all hover:bg-white/5 font-medium flex items-center gap-3 text-sm group">
                  <tab.icon className="w-4 h-4 opacity-50 group-data-[state=active]:opacity-100 group-data-[state=active]:text-indigo-400" />
                  {tab.label}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </div>

        {/* CONTENT AREA */}
        <div className="lg:col-span-10 min-h-[80vh]">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">

            {/* ================= PROFILE TAB ================= */}
            <TabsContent value="general" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Profile Card */}
                <div className="md:col-span-1 bg-[#15171F] border border-white/5 rounded-2xl p-6 flex flex-col items-center text-center space-y-4">
                  <div className="relative w-32 h-32 rounded-full overflow-hidden border-4 border-[#1E2029] shadow-2xl group cursor-pointer">
                    <Image src={content.user?.profileImage || '/placeholder.jpg'} alt="Profile" fill className="object-cover transition-opacity group-hover:opacity-50" />
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 pointer-events-none">
                      <span className="text-xs font-bold uppercase">Change</span>
                    </div>
                    <input type="file" className="absolute inset-0 opacity-0 cursor-pointer" onChange={async (e) => {
                      const f = e.target.files?.[0]; if (f) { const url = await handleFileUpload(f); if (url) updateField(['user', 'profileImage'], url); }
                    }} />
                  </div>
                  <div className="w-full space-y-2">
                    <InputGroup label="Display Name" value={content.user?.name} onChange={(v: string) => updateField(['user', 'name'], v)} />
                    <InputGroup label="Tagline (Main)" value={content.user?.tagline} onChange={(v: string) => updateField(['user', 'tagline'], v)} />
                  </div>
                </div>

                {/* Status & Location */}
                <div className="md:col-span-2 bg-[#15171F] border border-white/5 rounded-2xl p-6 space-y-6">
                  <h3 className="text-sm font-bold text-white border-b border-white/5 pb-2">Status & Contact</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <InputGroup label="Email" value={content.user?.email} onChange={(v: string) => updateField(['user', 'email'], v)} />
                    <InputGroup label="Location" value={content.user?.location} onChange={(v: string) => updateField(['user', 'location'], v)} />
                    <InputGroup label="Current Status" value={content.user?.status} onChange={(v: string) => updateField(['user', 'status'], v)} placeholder="e.g. Open to Work" />
                    <div>
                      <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest block mb-1.5">Status Color</label>
                      <select
                        className="w-full bg-[#0F1117] border border-white/10 rounded-lg px-4 py-2.5 text-gray-200 text-sm outline-none focus:border-indigo-500"
                        value={content.user?.statusColor || 'emerald'}
                        onChange={(e) => updateField(['user', 'statusColor'], e.target.value)}
                      >
                        <option value="emerald">Emerald (Green)</option>
                        <option value="blue">Blue</option>
                        <option value="amber">Amber (Yellow)</option>
                        <option value="red">Red</option>
                      </select>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest block">Typewriter Phrases</label>
                    <div className="grid grid-cols-1 gap-2">
                      {(content.user?.taglines || []).map((t, i) => (
                        <div key={i} className="flex gap-2">
                          <input className="w-full bg-[#0F1117] border border-white/5 rounded px-3 py-2 text-sm" value={t}
                            onChange={(e) => { const n = [...(content.user?.taglines || [])]; n[i] = e.target.value; updateField(['user', 'taglines'], n); }} />
                          <button onClick={() => { const n = [...(content.user?.taglines || [])]; n.splice(i, 1); updateField(['user', 'taglines'], n); }}
                            className="text-gray-500 hover:text-red-400 p-2"><Trash2 className="w-4 h-4" /></button>
                        </div>
                      ))}
                      <button onClick={() => updateField(['user', 'taglines'], [...(content.user?.taglines || []), 'New Phrase'])}
                        className="text-xs text-indigo-400 font-medium hover:text-indigo-300 py-1">+ Add Phrase</button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Bio Section */}
              <div className="bg-[#15171F] border border-white/5 rounded-2xl p-6">
                <InputGroup label="Biography" value={content.about?.bio} onChange={(v: string) => updateField(['about', 'bio'], v)} type="textarea" className="h-full" />
              </div>
            </TabsContent>

            {/* ================= EXPERIENCE TAB ================= */}
            <TabsContent value="experience">
              <DynamicListEditor<ExperienceItem>
                title="Work Experience"
                description="Manage your professional timeline."
                items={content.about?.experience || []}
                onUpdate={(items) => updateField(['about', 'experience'], items)}
                createNew={() => ({ id: Date.now().toString(), role: "New Role", company: "Company", period: "2024", description: "" })}
                renderItem={(item, i, onEdit, onDelete) => (
                  <div className="bg-[#0F1117] border border-white/5 rounded-lg p-4 flex justify-between items-center group hover:border-white/10 transition-colors">
                    <div>
                      <h4 className="text-white font-medium">{item.role} <span className="text-gray-500">@ {item.company}</span></h4>
                      <p className="text-xs text-gray-500 mt-1">{item.period}</p>
                    </div>
                    <div className="flex gap-2 opacity-50 group-hover:opacity-100 transition-opacity">
                      <button onClick={onEdit} className="p-2 hover:bg-white/10 rounded-md text-blue-400"><Wrench className="w-4 h-4" /></button>
                      <button onClick={onDelete} className="p-2 hover:bg-white/10 rounded-md text-red-400"><Trash2 className="w-4 h-4" /></button>
                    </div>
                  </div>
                )}
                renderEditForm={(item, onSave, onCancel) => (
                  <ExperienceEditForm item={item} onSave={onSave} onCancel={onCancel} />
                )}
              />
            </TabsContent>

            {/* ================= EDUCATION TAB ================= */}
            <TabsContent value="education">
              <DynamicListEditor<EducationItem>
                title="Education"
                description="Academic background and degrees."
                items={content.about?.education || []}
                onUpdate={(items) => updateField(['about', 'education'], items)}
                createNew={() => ({ id: Date.now().toString(), degree: "Degree Name", institution: "University", year: "2024", description: "" })}
                renderItem={(item, i, onEdit, onDelete) => (
                  <div className="bg-[#0F1117] border border-white/5 rounded-lg p-4 flex justify-between items-center group hover:border-white/10 transition-colors">
                    <div>
                      <h4 className="text-white font-medium">{item.degree}</h4>
                      <p className="text-xs text-gray-500 mt-1">{item.institution}, {item.year}</p>
                    </div>
                    <div className="flex gap-2 opacity-50 group-hover:opacity-100 transition-opacity">
                      <button onClick={onEdit} className="p-2 hover:bg-white/10 rounded-md text-blue-400"><Wrench className="w-4 h-4" /></button>
                      <button onClick={onDelete} className="p-2 hover:bg-white/10 rounded-md text-red-400"><Trash2 className="w-4 h-4" /></button>
                    </div>
                  </div>
                )}
                renderEditForm={(item, onSave, onCancel) => (
                  <EducationEditForm item={item} onSave={onSave} onCancel={onCancel} />
                )}
              />
              <div className="mt-8 bg-[#15171F] border border-white/5 rounded-xl p-6">
                <InputGroup label="CS & Math Background (Legacy Support)" value={content.about?.csMathBackground} onChange={(v: string) => updateField(['about', 'csMathBackground'], v)} type="textarea" />
              </div>
            </TabsContent>

            {/* ================= PROJECTS TAB (Simplified for brevity, similar pattern) ================= */}
            <TabsContent value="projects">
              {/* Re-using previous Project logic but styled better - for now simplifying to direct mapping */}
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-bold text-white">Project Showcase</h3>
                  <button onClick={() => {
                    const p: Project = { id: Date.now().toString(), title: "New Project", description: "", tags: [], imageUrl: "", githubLink: "", demoLink: "" };
                    updateField(['projects'], [p, ...content.projects]);
                  }} className="px-4 py-2 bg-indigo-600 text-white text-xs font-bold rounded-lg">+ Add Project</button>
                </div>
                {content.projects.map((p, i) => (
                  <div key={p.id || i} className="bg-[#15171F] border border-white/5 rounded-xl p-6 relative">
                    <button onClick={() => {
                      if (confirm('Delete?')) updateField(['projects'], content.projects.filter(x => x.id !== p.id));
                    }} className="absolute top-4 right-4 text-gray-600 hover:text-red-400"><Trash2 className="w-4 h-4" /></button>

                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                      <div className="md:col-span-1 space-y-2">
                        <div className="aspect-video bg-black rounded-lg border border-white/10 relative overflow-hidden">
                          {p.imageUrl && <Image src={p.imageUrl} alt="" fill className="object-cover" />}
                        </div>
                        <label className="block text-center text-xs text-blue-400 cursor-pointer">
                          Change Image
                          <input type="file" className="hidden" onChange={async e => {
                            const f = e.target.files?.[0]; if (f) {
                              const url = await handleFileUpload(f); if (url) {
                                const newP = [...content.projects]; newP[i] = { ...p, imageUrl: url }; updateField(['projects'], newP);
                              }
                            }
                          }} />
                        </label>
                      </div>
                      <div className="md:col-span-3 space-y-4">
                        <InputGroup label="Title" value={p.title} onChange={(v: string) => { const newP = [...content.projects]; newP[i].title = v; updateField(['projects'], newP); }} />
                        <InputGroup label="Description" value={p.description} type="textarea" onChange={(v: string) => { const newP = [...content.projects]; newP[i].description = v; updateField(['projects'], newP); }} />
                        <InputGroup label="Tags (comma separated)" value={p.tags.join(', ')} onChange={(v: string) => { const newP = [...content.projects]; newP[i].tags = v.split(',').map(s => s.trim()); updateField(['projects'], newP); }} />
                        <div className="grid grid-cols-2 gap-4">
                          <InputGroup label="GitHub Link" value={p.githubLink} onChange={(v: string) => { const newP = [...content.projects]; newP[i].githubLink = v; updateField(['projects'], newP); }} />
                          <InputGroup label="Demo Link" value={p.demoLink} onChange={(v: string) => { const newP = [...content.projects]; newP[i].demoLink = v; updateField(['projects'], newP); }} />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>

            {/* ================= SKILLS TAB ================= */}
            <TabsContent value="skills">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {content.skills.map((cat, cIdx) => (
                  <div key={cIdx} className="bg-[#15171F] border border-white/5 rounded-xl p-6 relative">
                    <button onClick={() => { if (confirm('Delete Category?')) { const n = [...content.skills]; n.splice(cIdx, 1); updateField(['skills'], n); } }}
                      className="absolute top-4 right-4 text-gray-600 hover:text-red-400"><Trash2 className="w-4 h-4" /></button>
                    <InputGroup label="Category Name" value={cat.category} onChange={(v: string) => { const n = [...content.skills]; n[cIdx].category = v; updateField(['skills'], n); }} />

                    <div className="mt-4 space-y-2">
                      {cat.items.map((item, iIdx) => (
                        <div key={iIdx} className="flex gap-2 items-center">
                          <input className="flex-1 bg-transparent border-b border-white/10 text-sm py-1" value={item.name}
                            onChange={(e) => { const n = [...content.skills]; n[cIdx].items[iIdx].name = e.target.value; updateField(['skills'], n); }} />
                          <input className="w-12 bg-transparent border-b border-white/10 text-sm py-1 text-right" type="number" value={item.proficiency}
                            onChange={(e) => { const n = [...content.skills]; n[cIdx].items[iIdx].proficiency = parseInt(e.target.value); updateField(['skills'], n); }} />
                          <span className="text-gray-600 text-xs">%</span>
                          <button onClick={() => { const n = [...content.skills]; n[cIdx].items.splice(iIdx, 1); updateField(['skills'], n); }} className="text-gray-600 hover:text-red-400"><X className="w-3 h-3" /></button>
                        </div>
                      ))}
                      <button onClick={() => { const n = [...content.skills]; n[cIdx].items.push({ name: 'New Skill', proficiency: 50 }); updateField(['skills'], n); }}
                        className="text-xs text-indigo-400 mt-2">+ Add Item</button>
                    </div>
                  </div>
                ))}
                <button onClick={() => updateField(['skills'], [...content.skills, { category: "New Category", items: [] }])}
                  className="border-2 border-dashed border-white/10 rounded-xl flex items-center justify-center h-full min-h-[200px] text-gray-500 hover:text-white hover:border-white/30 transition-all">
                  + New Category
                </button>
              </div>
            </TabsContent>

            {/* ================= SETTINGS TAB ================= */}
            <TabsContent value="settings">
              <div className="bg-[#15171F] border border-white/5 rounded-xl p-8 max-w-2xl">
                <h3 className="text-lg font-bold text-white mb-6">Global Section Titles</h3>
                <div className="space-y-4">
                  <InputGroup label="About Section Title" value={content.sectionTitles?.about} onChange={(v: string) => updateField(['sectionTitles', 'about'], v)} />
                  <InputGroup label="Projects Section Title" value={content.sectionTitles?.projects} onChange={(v: string) => updateField(['sectionTitles', 'projects'], v)} />
                  <InputGroup label="Skills Section Title" value={content.sectionTitles?.skills} onChange={(v: string) => updateField(['sectionTitles', 'skills'], v)} />
                  <InputGroup label="Contact Section Title" value={content.sectionTitles?.contact} onChange={(v: string) => updateField(['sectionTitles', 'contact'], v)} />
                </div>

                <h3 className="text-lg font-bold text-white mt-8 mb-6">SEO Metadata</h3>
                <div className="space-y-4">
                  <InputGroup label="Site Title" value={content.metadata?.title} onChange={(v: string) => updateField(['metadata', 'title'], v)} />
                  <InputGroup label="Site Description" value={content.metadata?.description} type="textarea" onChange={(v: string) => updateField(['metadata', 'description'], v)} />
                </div>
              </div>
            </TabsContent>

          </Tabs>
        </div>
      </div>

      {/* Floating Alert */}
      <AnimatePresence>
        {alert && (
          <motion.div
            initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 50 }}
            className={cn("fixed bottom-8 right-8 px-6 py-4 rounded-xl shadow-2xl border flex items-center gap-3 z-50",
              alert.type === 'success' ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-400" : "bg-red-500/10 border-red-500/20 text-red-400")}
          >
            {alert.type === 'success' ? <CheckCircle2 className="w-5 h-5" /> : <AlertCircle className="w-5 h-5" />}
            <span className="font-bold text-xs uppercase tracking-wide">{alert.message}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
