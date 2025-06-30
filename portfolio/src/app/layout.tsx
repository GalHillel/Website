import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Layout from "@/components/Layout";
// Removed: import I18nProviderClientComponent from "@/components/I18nProviderClientComponent";
// Removed: import i18nInstance from '@/i18n';
import LoadI18n from "@/components/LoadI18n"; // Added
import { ThemeProviderComponent } from "@/components/ThemeProviderComponent";
import siteContent from '@/entities/SiteContent.json';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: siteContent.metadata.title.en,
    template: `%s | ${siteContent.metadata.title.en}`,
  },
  description: siteContent.metadata.description.en,
  keywords: "Gal Hillel, portfolio, software developer, software engineer, web developer, full stack, backend, frontend, computer science, projects",
  robots: "index, follow",
  openGraph: {
    title: siteContent.metadata.title.en,
    description: siteContent.metadata.description.en,
    url: siteUrl,
    siteName: siteContent.metadata.title.en,
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: `${siteContent.metadata.title.en} - Open Graph Image`,
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: "summary_large_image",
    title: siteContent.metadata.title.en,
    description: siteContent.metadata.description.en,
    images: [`${siteUrl}/og-image.png`],
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#000000" },
  ],
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
  // params, // params.lang not used here for initial lang/dir, client will update
}: Readonly<{
  children: React.ReactNode;
  params?: { lang?: string };
}>) {
  // Initial lang and dir are static. Client-side i18n will update them.
  // This avoids depending on i18nInstance on the server.
  const initialLang = 'en';
  const initialDir = 'ltr';

  return (
    <html lang={initialLang} dir={initialDir} suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-white dark:bg-black text-gray-900 dark:text-gray-100`}
      >
        <LoadI18n /> {/* Load i18n setup on client */}
        <ThemeProviderComponent
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {/* I18nProvider is now implicitly handled by react-i18next's default context
              once i18n.js is initialized by LoadI18n. Components using useTranslation
              will pick up the client-side initialized instance. */}
          <Layout>{children}</Layout>
        </ThemeProviderComponent>
      </body>
    </html>
  );
}
