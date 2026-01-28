import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProviderComponent } from "@/components/ThemeProviderComponent";
import { contentService } from "@/services/contentService";
import GlobalBackground from "@/components/ui/GlobalBackground";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ScrollToTopButton from "@/components/ScrollToTopButton";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

export const viewport: Viewport = {
    themeColor: '#020617',
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
    userScalable: false,
    viewportFit: 'cover',
};

export const metadata: Metadata = {
    metadataBase: new URL(siteUrl),
    title: {
        default: "Gal Hillel - Full Stack Developer",
        template: `%s | Gal Hillel`,
    },
    description: "Senior Full Stack Developer specializing in modern web technologies, React, Next.js, and Cloud Architecture.",
    keywords: "Gal Hillel, portfolio, software developer, next.js, react, typescript, full stack",
    robots: "index, follow",
    openGraph: {
        title: "Gal Hillel - Portfolio",
        description: "Building high-performance web applications.",
        url: siteUrl,
        siteName: "Gal Hillel",
        images: [
            {
                url: "/og-image.png",
                width: 1200,
                height: 630,
                alt: "Gal Hillel Portfolio",
            },
        ],
        locale: 'en_US',
        type: 'website',
    },
    icons: {
        icon: "/favicon.ico",
        apple: "/apple-touch-icon.png",
    },
};

export default async function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const content = await contentService.getAllContent();

    return (
        <html lang="en" suppressHydrationWarning className="dark scroll-smooth">
            <body
                className={`${geistSans.variable} ${geistMono.variable} antialiased bg-slate-950 text-slate-100 overflow-x-hidden selection:bg-blue-500/30 selection:text-blue-200`}
            >
                <ThemeProviderComponent
                    attribute="class"
                    defaultTheme="dark"
                    enableSystem={false}
                    disableTransitionOnChange
                >
                    {/* 1. Global Fixed Background */}
                    <GlobalBackground />

                    {/* 2. Global Header */}
                    <Header navLinks={content.ui.navLinks} />

                    {/* 3. Main Content */}
                    <main className="relative z-10 min-h-screen flex flex-col">
                        {children}
                    </main>

                    {/* 4. Global Footer */}
                    <Footer user={content.user} ui={content.ui.footer} />

                    {/* 5. Utilities */}
                    <ScrollToTopButton />
                </ThemeProviderComponent>
            </body>
        </html>
    );
}
