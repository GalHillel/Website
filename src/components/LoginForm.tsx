'use client';

import { useActionState } from 'react';
import { useFormStatus } from 'react-dom';
import { authenticate } from '@/app/actions';
import { GlassCard } from '@/components/GlassCard';

export default function LoginForm() {
    const [errorMessage, dispatch, isPending] = useActionState(authenticate, undefined);

    return (
        <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-black via-gray-900 to-black p-4">
            <GlassCard className="w-full max-w-md p-8">
                <h1 className="text-3xl font-bold text-white mb-6 text-center">Admin Login</h1>
                <form action={dispatch} className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-white/70 mb-1" htmlFor="email">
                            Email
                        </label>
                        <input
                            className="w-full px-4 py-2 bg-black/20 border border-white/10 rounded-lg text-white focus:outline-none focus:border-white/30 focus:ring-1 focus:ring-white/30 transition-all"
                            id="email"
                            type="email"
                            name="email"
                            placeholder="admin@example.com"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-white/70 mb-1" htmlFor="password">
                            Password
                        </label>
                        <input
                            className="w-full px-4 py-2 bg-black/20 border border-white/10 rounded-lg text-white focus:outline-none focus:border-white/30 focus:ring-1 focus:ring-white/30 transition-all"
                            id="password"
                            type="password"
                            name="password"
                            placeholder="••••••••"
                            required
                            minLength={6}
                        />
                    </div>
                    <div className="flex items-center justify-between">
                        {/* Add "Remember me" or "Forgot password" if needed later */}
                    </div>
                    <LoginButton />
                    <div
                        className="flex h-8 items-end space-x-1"
                        aria-live="polite"
                        aria-atomic="true"
                    >
                        {errorMessage && (
                            <p className="text-sm text-red-500">{errorMessage}</p>
                        )}
                    </div>
                </form>
            </GlassCard>
        </div>
    );
}

function LoginButton() {
    const { pending } = useFormStatus();

    return (
        <button
            className="w-full px-6 py-3 bg-white text-black font-bold rounded-lg hover:bg-white/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            aria-disabled={pending}
        >
            {pending ? 'Logging in...' : 'Log in'}
        </button>
    );
}
