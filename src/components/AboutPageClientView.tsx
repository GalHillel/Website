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
    <div className="container mx-auto px-4 py-8 md:py-16 pt-24">
      <AnimatedSection>
        <h1 className="page-title-glow">
          About Me
        </h1>
      </AnimatedSection>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 items-start max-w-7xl mx-auto">
        {/* Profile Photo Section */}
        <AnimatedSection delay={0.2} className="lg:col-span-4 flex flex-col items-center">
          <div className="glass-panel p-8 flex flex-col items-center w-full sticky top-32">
            <div className="relative group">
              {/* Soft Glow Behind */}
              <div className="absolute inset-0 bg-blue-500/30 rounded-full blur-2xl group-hover:bg-blue-400/40 transition-all duration-500 scale-110" />

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

            <div className="mt-8 w-full space-y-3">
              <div className="flex justify-between text-sm border-b border-white/5 pb-2">
                <span className="text-white/50">Location</span>
                <span className="text-white">{user.location || "Tel Aviv, Israel"}</span>
              </div>
              <div className="flex justify-between text-sm border-b border-white/5 pb-2">
                <span className="text-white/50">Experience</span>
                <span className="text-white">3+ Years</span>
              </div>
              <div className="flex justify-between text-sm border-b border-white/5 pb-2">
                <span className="text-white/50">Email</span>
                <span className="text-white">{user.email}</span>
              </div>
            </div>
          </div>
        </AnimatedSection>

        {/* Bio and Details Section */}
        <AnimatedSection delay={0.4} className="lg:col-span-8 space-y-8">
          <div className="glass-panel p-8 md:p-10 relative overflow-hidden">
            {/* Decorative blob */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl pointer-events-none" />

            <section className="mb-12 relative z-10">
              <h3 className="text-2xl font-bold mb-6 text-white flex items-center gap-3">
                <span className="w-8 h-1 bg-blue-500 rounded-full" />
                Biography
              </h3>
              <p className="text-white/80 leading-relaxed text-lg">
                {about.bio}
              </p>
            </section>

            {about.experience && (
              <section className="mb-12 relative z-10">
                <h3 className="text-2xl font-bold mb-6 text-white flex items-center gap-3">
                  <span className="w-8 h-1 bg-cyan-500 rounded-full" />
                  Experience
                </h3>
                <div className="bg-white/5 rounded-2xl p-6 border border-white/5">
                  <p className="text-white/80 leading-relaxed text-lg whitespace-pre-line">
                    {about.experience}
                  </p>
                </div>
              </section>
            )}

            <section className="mb-12 relative z-10">
              <h3 className="text-2xl font-bold mb-6 text-white flex items-center gap-3">
                <span className="w-8 h-1 bg-purple-500 rounded-full" />
                Education
              </h3>
              <div className="bg-white/5 rounded-2xl p-6 border border-white/5">
                <p className="text-white/90 leading-relaxed text-lg whitespace-pre-line font-medium">
                  {about.education}
                </p>
              </div>
            </section>

            <section className="relative z-10">
              <h3 className="text-2xl font-bold mb-6 text-white flex items-center gap-3">
                <span className="w-8 h-1 bg-pink-500 rounded-full" />
                CS & Math Background
              </h3>
              <div className="bg-white/5 rounded-2xl p-6 border border-white/5">
                <p className="text-white/80 leading-relaxed text-lg whitespace-pre-line">
                  {about.csMathBackground}
                </p>
              </div>
            </section>
          </div>
        </AnimatedSection>
      </div>
    </div>
  );
}
