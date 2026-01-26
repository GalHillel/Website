"use client";


import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import SpotlightCard from '@/components/SpotlightCard';
import { UserContent, SiteUI } from '@/data/SiteContent';
import { CheckCircle2, XCircle, AlertCircle } from 'lucide-react';

// SVG Icons
const LinkedInIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="text-blue-600 dark:text-blue-400 group-hover:text-blue-700 dark:group-hover:text-blue-500 transition-colors">
        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
    </svg>
);

const GitHubIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="text-slate-700 dark:text-slate-300 group-hover:text-slate-800 dark:group-hover:text-slate-200 transition-colors">
        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
    </svg>
);

const EmailIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="text-red-500 dark:text-red-400 group-hover:text-red-600 dark:group-hover:text-red-500 transition-colors">
        <path d="M0 3v18h24v-18h-24zm21.518 2l-9.518 7.713-9.518-7.713h19.036zm-19.518 14v-11.817l10 8.104 10-8.104v11.817h-20z" />
    </svg>
);

interface ContactFormProps {
    user: UserContent | null;
    resumeUrl?: string;
    uiContent: SiteUI['contact'];
}

export default function ContactForm({ user, resumeUrl, uiContent }: ContactFormProps) {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [feedback, setFeedback] = useState<{ type: 'success' | 'error', message: string } | null>(null);

    const EMAILJS_SERVICE_ID = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
    const EMAILJS_TEMPLATE_ID = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
    const EMAILJS_USER_ID = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setIsSubmitting(true);
        setFeedback(null);

        // Capture the form element synchronously
        const formElement = event.currentTarget;

        // Check configuration
        if (!EMAILJS_SERVICE_ID || !EMAILJS_TEMPLATE_ID || !EMAILJS_USER_ID) {
            console.error('EmailJS credentials missing.');
            setFeedback({ type: 'error', message: 'System configuration error. Please try again later.' });
            setIsSubmitting(false);
            return;
        }

        import('emailjs-com')
            .then((emailjs) => {
                emailjs.sendForm(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, formElement, EMAILJS_USER_ID)
                    .then(() => {
                        setFeedback({ type: 'success', message: 'Message sent successfully!' });
                        formElement.reset();
                    })
                    .catch((error) => {
                        console.error('EmailJS error:', error.text);
                        setFeedback({ type: 'error', message: 'Failed to send message. Please try again.' });
                    })
                    .finally(() => {
                        setIsSubmitting(false);
                        // Clear success message after 5 seconds
                        setTimeout(() => {
                            if (feedback?.type === 'success') setFeedback(null);
                        }, 5000);
                    });
            })
            .catch((err) => {
                console.error('EmailJS library error:', err);
                setFeedback({ type: 'error', message: 'System error: EmailJS library missing.' });
                setIsSubmitting(false);
            });
    };

    return (
        <div className="container mx-auto px-4 py-8 md:py-16">
            <h1 className="page-title-glow">
                {uiContent?.title || "Get in Touch"}
            </h1>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-start max-w-6xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <SpotlightCard className="p-6 sm:p-8 backdrop-blur-xl bg-[#0f1020]/80 border-white/10 shadow-2xl relative overflow-hidden group">
                        {/* Subtle Inner Glow */}
                        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

                        <h2 className="text-2xl font-semibold mb-6 text-white relative z-10">
                            {uiContent?.formTitle || "Send Me a Message"}
                        </h2>
                        <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
                            <div>
                                <label htmlFor="name" className="block text-sm font-medium text-white/80 mb-1 uppercase tracking-wider">
                                    {uiContent?.nameLabel || "Your Name"}
                                </label>
                                <input
                                    type="text"
                                    name="name"
                                    id="name"
                                    required
                                    placeholder={uiContent?.nameLabel ? `Enter ${uiContent.nameLabel}` : "Enter your name"}
                                    className="glass-input w-full bg-white/5 focus:bg-white/10 border-white/20 focus:border-white/30 text-white placeholder:text-white/50 rounded-lg px-4 py-3 outline-none transition-all duration-300"
                                />
                            </div>
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-white/80 mb-1 uppercase tracking-wider">
                                    {uiContent?.emailLabel || "Your Email"}
                                </label>
                                <input
                                    type="email"
                                    name="email"
                                    id="email"
                                    required
                                    placeholder={uiContent?.emailLabel ? `Enter ${uiContent.emailLabel}` : "Enter your email"}
                                    className="glass-input w-full bg-white/5 focus:bg-white/10 border-white/20 focus:border-white/30 text-white placeholder:text-white/50 rounded-lg px-4 py-3 outline-none transition-all duration-300"
                                />
                            </div>
                            <div>
                                <label htmlFor="message" className="block text-sm font-medium text-white/80 mb-1 uppercase tracking-wider">
                                    {uiContent?.messageLabel || "Your Message"}
                                </label>
                                <textarea
                                    name="message"
                                    id="message"
                                    rows={4}
                                    required
                                    placeholder={uiContent?.messageLabel ? `Write ${uiContent.messageLabel} here...` : "Write your message here..."}
                                    className="glass-input w-full resize-none bg-white/5 focus:bg-white/10 border-white/20 focus:border-white/30 text-white placeholder:text-white/50 rounded-lg px-4 py-3 outline-none transition-all duration-300"
                                ></textarea>
                            </div>
                            <div>
                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="w-full py-4 rounded-xl font-bold flex items-center justify-center gap-2 text-white shadow-lg
                                    bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-600 hover:from-cyan-400 hover:via-blue-400 hover:to-purple-500
                                    transform hover:scale-[1.02] active:scale-[0.98] transition-all duration-300"
                                >
                                    {isSubmitting ? (
                                        <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                    ) : (
                                        uiContent?.submitButton || 'Send Message'
                                    )}
                                </button>
                            </div>
                        </form>
                    </SpotlightCard>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="space-y-6"
                >
                    <SpotlightCard className="p-6 sm:p-8 backdrop-blur-xl bg-[#0f1020]/80 border-white/10 shadow-2xl relative overflow-hidden group">
                        {/* Subtle Inner Glow */}
                        <div className="absolute inset-0 bg-gradient-to-bl from-purple-500/5 via-transparent to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

                        <h2 className="text-2xl font-semibold mb-6 text-white relative z-10">
                            {uiContent?.infoTitle || "Contact Information"}
                        </h2>
                        <p className="text-white/70 mb-6 relative z-10">{uiContent?.infoText || "Feel free to reach out through any of these platforms. I look forward to hearing from you!"}</p>

                        <div className="space-y-4 relative z-10">
                            {user?.linkedin && (
                                <a
                                    href={user.linkedin} target="_blank" rel="noopener noreferrer"
                                    className="group flex items-center p-3 rounded-lg hover:bg-white/10 transition-all duration-300 border border-transparent hover:border-white/10"
                                >
                                    <LinkedInIcon />
                                    <span className="ml-3 font-medium text-white/80 group-hover:text-white transition-colors">{uiContent?.linkedinText || "LinkedIn Profile"}</span>
                                </a>
                            )}
                            {user?.github && (
                                <a
                                    href={user.github} target="_blank" rel="noopener noreferrer"
                                    className="group flex items-center p-3 rounded-lg hover:bg-white/10 transition-all duration-300 border border-transparent hover:border-white/10"
                                >
                                    <GitHubIcon />
                                    <span className="ml-3 font-medium text-white/80 group-hover:text-white transition-colors">{uiContent?.githubText || "GitHub Profile"}</span>
                                </a>
                            )}
                            {user?.email && (
                                <a
                                    href={`mailto:${user.email}`}
                                    className="group flex items-center p-3 rounded-lg hover:bg-white/10 transition-all duration-300 border border-transparent hover:border-white/10"
                                >
                                    <EmailIcon />
                                    <span className="ml-3 font-medium text-white/80 group-hover:text-white transition-colors">{uiContent?.emailText || "Send an Email"}</span>
                                </a>
                            )}
                        </div>

                        {resumeUrl && (
                            <div className="mt-8 pt-6 border-t border-white/10 relative z-10">
                                <p className="text-sm text-white/60 mb-2">
                                    {uiContent?.resumePrompt || "You can also download my resume:"}
                                </p>
                                <Link
                                    href={resumeUrl} target="_blank" download
                                    className="inline-flex items-center text-blue-400 hover:text-blue-300 font-semibold transition-colors"
                                >
                                    {uiContent?.downloadResume || "Download Resume"}
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                                    </svg>
                                </Link>
                            </div>
                        )}
                    </SpotlightCard>
                </motion.div>
            </div>

            {/* Toast Notification */}
            <AnimatePresence>
                {feedback && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 20 }}
                        className={`fixed bottom-8 right-8 z-50 px-6 py-4 rounded-2xl backdrop-blur-xl border shadow-2xl flex items-center gap-3 ${feedback.type === 'success'
                            ? "bg-green-500/20 border-green-500/30 text-green-200"
                            : "bg-red-500/20 border-red-500/30 text-red-200"
                            }`}
                    >
                        {feedback.type === 'success' ? <CheckCircle2 className="w-5 h-5" /> : <AlertCircle className="w-5 h-5" />}
                        <span className="font-medium">{feedback.message}</span>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
