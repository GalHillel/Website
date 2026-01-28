"use client";

import Image from 'next/image';
import { motion } from 'framer-motion';
import { UserContent, AboutContent, SiteUI } from '@/data/SiteContent';
import { MapPin, Briefcase, GraduationCap, Github, Linkedin, Mail, ArrowRight } from 'lucide-react';
import TypewriterTagline from '@/components/TypewriterTagline';
import GlassCard from '@/components/GlassCard';
interface AboutSectionProps {
    user: UserContent;
    about: AboutContent;
    uiContent: SiteUI['about'];
    sectionTitle?: string;
}

export default function AboutSection({ user, about, uiContent, sectionTitle }: AboutSectionProps) {
    const profileImageUrl = user.profileImage || "/placeholder-profile.jpg";

    return (
        <section id="about" className="container mx-auto px-4 py-24 md:py-32 max-w-7xl">

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">

                {/* --- COL 1: IDENTITY COLUMN (Span 4) --- */}
                <div className="lg:col-span-4">
                    <div className="lg:sticky lg:top-24 space-y-6">

                        <GlassCard className="p-8 flex flex-col items-center text-center space-y-6">
                            {/* Profile Image - Fixed Dimensions on Desktop */}
                            <motion.div
                                initial={{ scale: 0.9, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                transition={{ duration: 0.5 }}
                                className="relative w-48 h-48 lg:w-[260px] lg:h-[260px] rounded-2xl overflow-hidden border-4 border-white/5 shadow-2xl bg-black"
                            >
                                <Image
                                    src={profileImageUrl}
                                    alt={user.name}
                                    fill
                                    priority
                                    className={`object-cover ${user.imagePosition === 'top' ? 'object-top' :
                                        user.imagePosition === 'bottom' ? 'object-bottom' : 'object-center'
                                        }`}
                                />
                            </motion.div>

                            {/* Identity Info */}
                            <div className="space-y-3 w-full">
                                <h1 className="text-3xl lg:text-4xl font-bold text-white tracking-tight">{user.name}</h1>

                                <div className="min-h-[2rem] flex items-center justify-center">
                                    <TypewriterTagline
                                        taglines={user.taglines || [user.tagline || "Creator"]}
                                        className="text-blue-400 text-sm font-medium tracking-wide"
                                    />
                                </div>
                            </div>

                            {/* Dynamic Status Badge */}
                            {user.status && (
                                <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full border text-xs font-bold uppercase tracking-wider
                                    ${user.statusColor === 'blue' ? 'bg-blue-500/10 border-blue-500/20 text-blue-400' :
                                        user.statusColor === 'amber' ? 'bg-amber-500/10 border-amber-500/20 text-amber-400' :
                                            user.statusColor === 'red' ? 'bg-red-500/10 border-red-500/20 text-red-400' :
                                                'bg-emerald-500/10 border-emerald-500/20 text-emerald-400' // Default Emerald
                                    }`}
                                >
                                    <span className="relative flex h-2 w-2">
                                        <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 
                                        ${user.statusColor === 'blue' ? 'bg-blue-400' :
                                                user.statusColor === 'amber' ? 'bg-amber-400' :
                                                    user.statusColor === 'red' ? 'bg-red-400' : 'bg-emerald-400'}`}
                                        />
                                        <span className={`relative inline-flex rounded-full h-2 w-2 
                                        ${user.statusColor === 'blue' ? 'bg-blue-500' :
                                                user.statusColor === 'amber' ? 'bg-amber-500' :
                                                    user.statusColor === 'red' ? 'bg-red-500' : 'bg-emerald-500'}`}
                                        />
                                    </span>
                                    {user.status}
                                </div>
                            )}

                            {/* Socials Row */}
                            <div className="flex items-center gap-3 pt-6 w-full justify-center">
                                {user.socialLinks?.github && (
                                    <a href={user.socialLinks.github} target="_blank" rel="noopener noreferrer" className="p-3 text-slate-400 hover:text-white hover:bg-white/10 rounded-xl transition-all"><Github className="w-5 h-5" /></a>
                                )}
                                {user.socialLinks?.linkedin && (
                                    <a href={user.socialLinks.linkedin} target="_blank" rel="noopener noreferrer" className="p-3 text-slate-400 hover:text-white hover:bg-white/10 rounded-xl transition-all"><Linkedin className="w-5 h-5" /></a>
                                )}
                                <a href={`mailto:${user.email}`} className="p-3 text-slate-400 hover:text-white hover:bg-white/10 rounded-xl transition-all"><Mail className="w-5 h-5" /></a>
                            </div>

                        </GlassCard>

                        {/* Location / Status Card (Moved Here) */}
                        <GlassCard className="p-8 flex flex-col justify-between">
                            <div>
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="p-2 bg-emerald-500/10 rounded-lg text-emerald-400"><MapPin className="w-5 h-5" /></div>
                                    <h2 className="text-lg font-bold text-white tracking-tight">Location</h2>
                                </div>
                                <p className="text-2xl font-light text-white">{user.location}</p>
                                <p className="text-sm text-slate-500 mt-2">Available for Remote Work</p>
                            </div>
                        </GlassCard>

                        {/* Stacked CTA Buttons */}
                        <div className="grid grid-cols-1 gap-3">
                            <a href="#projects" className="group flex items-center justify-center gap-2 w-full py-3 bg-white text-black font-bold rounded-xl transition-transform active:scale-95">
                                View Projects <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </a>
                            <a href="#contact" className="flex items-center justify-center gap-2 w-full py-3 bg-white/5 hover:bg-white/10 border border-white/10 text-white font-medium rounded-xl transition-colors">
                                Contact Me
                            </a>
                        </div>
                    </div>
                </div>

                {/* --- COL 2: NARRATIVE FLOW (Span 8) --- */}
                <div className="lg:col-span-8 flex flex-col gap-6">

                    {/* Row 1: Bio Card */}
                    <GlassCard className="p-8 md:p-12">
                        <h2 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-6">{sectionTitle || "ABOUT ME"}</h2>
                        <div className="space-y-6 text-slate-300 leading-relaxed text-lg font-light">
                            <p className="whitespace-pre-line">{about.bio}</p>
                        </div>
                    </GlassCard>

                    {/* Row 2: Experience Timeline */}
                    <GlassCard className="p-8 md:p-10">
                        <div className="flex items-center gap-3 mb-8">
                            <div className="p-2 bg-blue-500/10 rounded-lg text-blue-400"><Briefcase className="w-5 h-5" /></div>
                            <h2 className="text-lg font-bold text-white tracking-tight">Professional Experience</h2>
                        </div>

                        <div className="space-y-8 relative pl-2">
                            {/* Timeline Line */}
                            <div className="absolute left-[11px] top-3 bottom-3 w-[2px] bg-white/5" />

                            {(about.experience || []).map((exp, i) => (
                                <div key={exp.id || i} className="relative pl-8 group">
                                    {/* Dot */}
                                    <div className="absolute left-[2px] top-2 w-[20px] h-[20px] rounded-full bg-[#020617] border-2 border-blue-500 z-10 group-hover:scale-110 transition-transform" />

                                    <div className="space-y-2">
                                        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline">
                                            <h3 className="text-xl font-bold text-white">{exp.role}</h3>
                                            <span className="text-sm font-mono text-blue-400 bg-blue-500/10 px-2 py-1 rounded">{exp.period}</span>
                                        </div>
                                        <p className="text-base text-slate-400 font-medium">{exp.company}</p>
                                        <p className="text-sm text-slate-400 leading-relaxed max-w-2xl whitespace-pre-line">{exp.description}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </GlassCard>

                    {/* Row 3: Education (Full Width) */}
                    <GlassCard className="p-8 md:p-10">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="p-2 bg-purple-500/10 rounded-lg text-purple-400"><GraduationCap className="w-5 h-5" /></div>
                            <h2 className="text-lg font-bold text-white tracking-tight">Education</h2>
                        </div>
                        <div className="space-y-6">
                            {(about.education || []).map((edu, i) => (
                                <div key={edu.id || i} className="space-y-1">
                                    <h3 className="text-base font-bold text-white leading-tight">{edu.degree}</h3>
                                    <p className="text-sm text-slate-400">{edu.institution}</p>
                                    <span className="text-xs text-purple-400 font-mono">{edu.year}</span>
                                    {edu.description && (
                                        <p className="text-slate-400 text-sm mt-2 leading-relaxed">{edu.description}</p>
                                    )}
                                </div>
                            ))}
                        </div>
                    </GlassCard>

                </div>
            </div>
        </section>
    );
}
