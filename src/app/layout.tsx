import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Layout from "@/components/Layout";
import { ThemeProviderComponent } from "@/components/ThemeProviderComponent";
import { contentService } from "@/services/contentService";

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
    themeColor: '#1e293b',
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
    userScalable: false,
    viewportFit: 'cover',
};

export const metadata: Metadata = {
    metadataBase: new URL(siteUrl),
    title: {
        default: "Gal Hillel - Portfolio",
        template: `%s | Gal Hillel - Portfolio`,
    },
    description: "Full Stack Developer Portfolio",
    keywords: "Gal Hillel, portfolio, software developer, software engineer, web developer, full stack, backend, frontend, computer science, projects",
    robots: "index, follow",
    openGraph: {
        title: "Gal Hillel - Portfolio",
        description: "Full Stack Developer Portfolio",
        url: siteUrl,
        siteName: "Gal Hillel - Portfolio",
        images: [
            {
                url: "/og-image.png",
                width: 1200,
                height: 630,
                alt: "Gal Hillel - Portfolio - Open Graph Image",
            },
        ],
        locale: 'en_US',
        type: 'website',
    },
    twitter: {
        card: "summary_large_image",
        title: "Gal Hillel - Portfolio",
        description: "Full Stack Developer Portfolio",
        images: [`${siteUrl}/og-image.png`],
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
    const siteLang = 'en';
    const siteDir = 'ltr';

    // Fetch full content including user profile and UI config
    const content = await contentService.getAllContent();

    return (
        <html lang={siteLang} dir={siteDir} suppressHydrationWarning className="dark">
            <body
                className={`${geistSans.variable} ${geistMono.variable} antialiased bg-black text-gray-100`}
            >
                <ThemeProviderComponent
                    attribute="class"
                    defaultTheme="system"
                    enableSystem
                    disableTransitionOnChange
                >
                    <Layout user={content.user} ui={content.ui}>{children}</Layout>
                </ThemeProviderComponent>
            </body>
        </html>
    );
}
