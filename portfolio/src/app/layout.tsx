import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Layout from "@/components/Layout";
import I18nProviderClientComponent from "@/components/I18nProviderClientComponent";
import { ThemeProviderComponent } from "@/components/ThemeProviderComponent";
import i18nInstance from '@/i18n';
import siteContent from '@/entities/SiteContent.json';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"; // Fallback for local

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl), // Important for resolving relative image paths
  title: {
    default: siteContent.metadata.title.en, // Default title for the site
    template: `%s | ${siteContent.metadata.title.en}`, // Template for page-specific titles
  },
  description: siteContent.metadata.description.en,
  keywords: "Gal Hillel, portfolio, software developer, software engineer, web developer, full stack, backend, frontend, computer science, projects", // General keywords
  robots: "index, follow",
  openGraph: {
    title: siteContent.metadata.title.en,
    description: siteContent.metadata.description.en,
    url: siteUrl,
    siteName: siteContent.metadata.title.en,
    images: [
      {
        url: "/og-image.png", // Path relative to /public
        width: 1200,
        height: 630,
        alt: `${siteContent.metadata.title.en} - Open Graph Image`,
      },
    ],
    locale: 'en_US', // Default locale
    type: 'website',
  },
  twitter: { // Basic Twitter card setup
    card: "summary_large_image",
    title: siteContent.metadata.title.en,
    description: siteContent.metadata.description.en,
    images: [`${siteUrl}/og-image.png`], // Must be absolute URL for Twitter
    // creator: "@yourtwitterhandle", // Optional: if you have a Twitter handle
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png", // Example: create this file in /public
    // Add other icon sizes if needed
  },
  // alternates: { // For multilingual sites, helps search engines understand different versions
  //   canonical: siteUrl, // Base canonical URL
  //   languages: {
  //     'en-US': `${siteUrl}/en`,
  //     'he-IL': `${siteUrl}/he`,
  //   },
  // },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" }, // Light theme (Tailwind bg-white)
    { media: "(prefers-color-scheme: dark)", color: "#000000" },  // Dark theme (Tailwind bg-black)
  ],
  width: "device-width",
  initialScale: 1,
  // colorScheme: "dark light", // Already handled by themeColor preference
};

export default function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params?: { lang?: string };
}>) {
  const currentLang = params?.lang || i18nInstance.language || 'en';
  const direction = currentLang === 'he' ? 'rtl' : 'ltr';

  // Note: For fully dynamic metadata per language in this root layout,
  // it would typically require generating metadata in a generateMetadata function
  // that has access to the language context (e.g., from params if using [lang] in path).
  // The static metadata object above uses English defaults.
  // Page-level generateMetadata functions can provide localized metadata.

  return (
    <html lang={currentLang} dir={direction} suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-white dark:bg-black text-gray-900 dark:text-gray-100`}
      >
        <ThemeProviderComponent
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <I18nProviderClientComponent locale={currentLang}>
            <Layout>{children}</Layout>
          </I18nProviderClientComponent>
        </ThemeProviderComponent>
      </body>
    </html>
  );
}
