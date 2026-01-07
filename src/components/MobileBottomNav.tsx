'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Home, User, Briefcase, Code, Mail } from 'lucide-react';

const MobileBottomNav = () => {
    const pathname = usePathname();

    const navItems = [
        { href: '/', label: 'Home', Icon: Home },
        { href: '/projects', label: 'Projects', Icon: Briefcase },
        { href: '/skills', label: 'Skills', Icon: Code },
        { href: '/about', label: 'About', Icon: User },
        { href: '/contact', label: 'Contact', Icon: Mail },
    ];

    // Hide on admin routes or auth routes
    if (pathname.startsWith('/admin') || pathname.startsWith('/auth')) {
        return null;
    }

    return (
        <div className="fixed bottom-0 left-0 w-full z-50 md:hidden pb-safe">
            <div className="mx-4 mb-4">
                <nav className="flex items-center justify-between px-6 py-3 rounded-full bg-black/60 backdrop-blur-xl border border-white/10 shadow-2xl">
                    {navItems.map(({ href, label, Icon }) => {
                        const isActive = pathname === href;
                        return (
                            <Link
                                key={href}
                                href={href}
                                className={cn(
                                    "relative flex flex-col items-center gap-1 p-2 rounded-xl transition-all duration-300",
                                    isActive ? "text-blue-400 scale-110" : "text-white/50 hover:text-white hover:bg-white/5"
                                )}
                            >
                                {isActive && (
                                    <span className="absolute inset-0 bg-blue-500/15 blur-xl rounded-full -z-10" />
                                )}
                                <Icon className={cn("w-5 h-5", isActive && "fill-current/20 drop-shadow-[0_0_8px_rgba(59,130,246,0.5)]")} strokeWidth={isActive ? 2.5 : 2} />
                                <span className={cn("text-[10px] font-medium transition-colors", isActive ? "text-blue-400" : "text-white/50")}>
                                    {label}
                                </span>
                            </Link>
                        );
                    })}
                </nav>
            </div>
            {/* Gradient Fade at bottom to blend with safe area if needed */}
            <div className="absolute -z-10 bottom-0 left-0 w-full h-24 bg-gradient-to-t from-black/80 to-transparent pointer-events-none" />
        </div>
    );
};

export default MobileBottomNav;
