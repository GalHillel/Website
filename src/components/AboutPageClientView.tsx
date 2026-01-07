// @/components/AboutPageClientView.tsx
"use client";

import Image from 'next/image';
import AnimatedSection from '@/components/AnimatedSection';
import { UserContent, AboutContent } from '@/entities/SiteContent';

interface AboutPageClientViewProps {
  user: UserContent;
  about: AboutContent;
}

export default function AboutPageClientView({ user, about }: AboutPageClientViewProps) {
  const profileImageUrl = user.profileImage || "/placeholder-profile.jpg";

  return (
    <div className="container mx-auto px-4 py-8 md:py-16">
      {/* Title Removed as per user request to avoid duplication */}

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 items-start max-w-7xl mx-auto">
        {/* Profile Photo Section */}
        <AnimatedSection delay={0.2} className="lg:col-span-4 flex flex-col items-center">
          <div className="glass-panel p-8 flex flex-col items-center w-full sticky top-32">
            <div className="relative group">
              {/* Soft Glow Behind */}
              <div className="absolute inset-0 bg-blue-500/30 rounded-full blur-2xl md:group-hover:bg-blue-400/40 transition-all duration-500 md:group-hover:scale-110" />

              <div className="w-48 h-48 md:w-64 md:h-64 relative rounded-full overflow-hidden border-4 border-white/10 shadow-2xl z-10">
                <Image
                  src={profileImageUrl}
                  alt={`${user.name} - Profile Photo`}
                  fill
                  className={`object-cover transition-transform duration-500 group-hover:scale-105 ${user.imagePosition === 'top' ? 'object-top' :
                    user.imagePosition === 'bottom' ? 'object-bottom' : 'object-center'
                    }`}
                />
              </div>
            </div>

            <h2 className="text-3xl font-bold text-center text-white mt-8">{user.name}</h2>
            <p className="text-blue-200/80 text-center mt-2 font-medium tracking-wide">{user.tagline || "Full Stack Developer"}</p>

            <div className="mt-5 w-full space-y-3">
              <div className="grid grid-cols-[100px_1fr] items-center text-sm border-b border-white/10 pb-3">
                <span className="text-white/50 font-medium">Location</span>
                <span className="text-white">{user.location || "Tel Aviv, Israel"}</span>
              </div>
              <div className="grid grid-cols-[100px_1fr] items-center text-sm border-b border-white/10 pb-3">
                <span className="text-white/50 font-medium">Experience</span>
                <span className="text-white">3+ Years</span>
              </div>
              <div className="grid grid-cols-[100px_1fr] items-center text-sm border-b border-white/10 pb-3">
                <span className="text-white/50 font-medium">Email</span>
                <span className="text-white truncate">{user.email}</span>
              </div>
            </div>
          </div>
        </AnimatedSection>

        {/* Bio and Details Section */}
        {/* Bio and Details Section - Split into Glass Cards */}
        <div className="lg:col-span-8 space-y-6">

          {/* Biography Card */}
          <AnimatedSection delay={0.4}>
            <div className="rounded-2xl border border-white/10 bg-[#0f1020]/80 backdrop-blur-md p-6 md:p-8 shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl pointer-events-none -mr-16 -mt-16" />
              <h3 className="text-2xl font-bold mb-4 text-white flex items-center gap-3 relative z-10">
                <span className="w-8 h-1 bg-blue-500 rounded-full" />
                Biography
              </h3>
              <p className="text-white/80 leading-relaxed text-lg relative z-10">
                {about.bio}
              </p>
            </div>
          </AnimatedSection>

          {/* Experience Card */}
          {about.experience && (
            <AnimatedSection delay={0.5}>
              <div className="rounded-2xl border border-white/10 bg-[#0f1020]/80 backdrop-blur-md p-6 md:p-8 shadow-xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none -mr-16 -mt-16" />
                <h3 className="text-2xl font-bold mb-4 text-white flex items-center gap-3 relative z-10">
                  <span className="w-8 h-1 bg-cyan-500 rounded-full" />
                  Experience
                </h3>
                <p className="text-white/80 leading-relaxed text-lg whitespace-pre-line relative z-10">
                  {about.experience}
                </p>
              </div>
            </AnimatedSection>
          )}

          {/* Education Card */}
          <AnimatedSection delay={0.6}>
            <div className="rounded-2xl border border-white/10 bg-[#0f1020]/80 backdrop-blur-md p-6 md:p-8 shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl pointer-events-none -mr-16 -mt-16" />
              <h3 className="text-2xl font-bold mb-4 text-white flex items-center gap-3 relative z-10">
                <span className="w-8 h-1 bg-purple-500 rounded-full" />
                Education
              </h3>
              <p className="text-white/80 leading-relaxed text-lg whitespace-pre-line font-medium relative z-10">
                {about.education}
              </p>
            </div>
          </AnimatedSection>

          {/* CS & Math Background Card */}
          <AnimatedSection delay={0.7}>
            <div className="rounded-2xl border border-white/10 bg-[#0f1020]/80 backdrop-blur-md p-6 md:p-8 shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-pink-500/10 rounded-full blur-3xl pointer-events-none -mr-16 -mt-16" />
              <h3 className="text-2xl font-bold mb-4 text-white flex items-center gap-3 relative z-10">
                <span className="w-8 h-1 bg-pink-500 rounded-full" />
                CS & Math Background
              </h3>
              <p className="text-white/80 leading-relaxed text-lg whitespace-pre-line relative z-10">
                {about.csMathBackground}
              </p>
            </div>
          </AnimatedSection>

        </div>
      </div>
    </div>
  );
}
