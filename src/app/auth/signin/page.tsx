'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Lock, ArrowRight, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import SpotlightCard from '@/components/SpotlightCard';

export default function SignIn() {
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        // Simulate network delay for effect
        await new Promise(resolve => setTimeout(resolve, 800));

        const adminPassword = process.env.NEXT_PUBLIC_ADMIN_PASSWORD;

        if (password === adminPassword) {
            const expires = new Date();
            expires.setTime(expires.getTime() + (24 * 60 * 60 * 1000));
            document.cookie = `admin_access=true; path=/; expires=${expires.toUTCString()}`;
            router.push('/admin');
            router.refresh();
        } else {
            setError('Access Denied');
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center relative overflow-hidden">
            {/* Background is handled by global CSS, but we can add a specific spotlight here if needed */}

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="w-full max-w-md p-8"
            >
                <SpotlightCard className="p-8 md:p-12 border-white/20 shadow-2xl relative overflow-hidden backdrop-blur-2xl bg-black/40">
                    {/* Decorative glow */}
                    <div className="absolute -top-20 -right-20 w-40 h-40 bg-blue-500/20 rounded-full blur-3xl" />
                    <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-purple-500/20 rounded-full blur-3xl" />

                    <div className="relative z-10 flex flex-col items-center text-center space-y-8">
                        <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center backdrop-blur-md shadow-inner">
                            <Lock className="w-8 h-8 text-white/80" />
                        </div>

                        <div className="space-y-2">
                            <h1 className="text-3xl font-bold tracking-tight text-white text-glow">Command Center</h1>
                            <p className="text-white/40 text-sm uppercase tracking-widest">Restricted Access</p>
                        </div>

                        <form onSubmit={handleSubmit} className="w-full space-y-6">
                            <motion.div
                                animate={error ? { x: [-10, 10, -10, 10, 0] } : {}}
                                transition={{ type: "spring", stiffness: 500, damping: 25 }}
                            >
                                <div className="relative group">
                                    <input
                                        type="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        placeholder="Enter Passkey"
                                        className="glass-input text-center text-lg tracking-widest placeholder:text-white/20 focus:border-white/30 transition-all"
                                        autoFocus
                                    />
                                </div>
                            </motion.div>

                            <AnimatePresence>
                                {error && (
                                    <motion.div
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{ opacity: 1, height: 'auto' }}
                                        exit={{ opacity: 0, height: 0 }}
                                        className="text-red-400 text-sm flex items-center justify-center gap-2"
                                    >
                                        <AlertCircle className="w-4 h-4" />
                                        {error}
                                    </motion.div>
                                )}
                            </AnimatePresence>

                            <button
                                type="submit"
                                disabled={isLoading}
                                className="w-full glass-button-primary py-4 text-lg font-semibold flex items-center justify-center gap-2 group hover:scale-[1.02] active:scale-[0.98] transition-all"
                            >
                                {isLoading ? (
                                    <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                ) : (
                                    <>
                                        Enter Portal
                                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                    </>
                                )}
                            </button>
                        </form>
                    </div>
                </SpotlightCard>
            </motion.div>
        </div>
    );
}
