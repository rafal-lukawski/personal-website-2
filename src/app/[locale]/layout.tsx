import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { cookies } from "next/headers";
import "../globals.css";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v16-appRouter";
import InitColorSchemeScript from "@mui/material/InitColorSchemeScript";
import { AppThemeProvider } from "@/theme";
import {
  COLOR_MODE_COOKIE,
  COLOR_MODE_STORAGE_KEY,
  parseColorMode,
} from "@/theme/colorMode";
import { Footer } from "@/components/Footer";
import { GoogleAnalytics } from "@/components/GoogleAnalytics";
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
  
  // Image dimensions per locale
  const imageConfig = {
    en: { width: 992, height: 469 },
    pl: { width: 990, height: 486 },
  };
  
  const currentImageConfig = imageConfig[locale as 'en' | 'pl'] || imageConfig.en;
  
  return {
    title: "Rafał Łukawski - IT Project Manager | Software Developer",
    description: "Full-stack developer with 5+ years of modern frontend/backend experience and 20+ years of experience in IT. Google Cloud Professional Architect | Professional Scrum Master",
    authors: [{ name: "Rafał Łukawski" }],
    
    // This sets the proper hreflang and canonical tags
    alternates: {
      canonical: `${baseUrl}/${locale}`,
      languages: {
        'en': `${baseUrl}/en`,
        'pl': `${baseUrl}/pl`,
        'x-default': `${baseUrl}/en`, // Default for unmatched languages
      },
    },
    
    // Open Graph for social media
    openGraph: {
      title: "Rafał Łukawski - IT Project Manager | Software Developer",
      description: "Full-stack developer with 5+ years of modern frontend/backend experience. Google Cloud Professional Architect | Professional Scrum Master",
      locale: locale === 'pl' ? 'pl_PL' : 'en_US',
      alternateLocale: locale === 'pl' ? ['en_US'] : ['pl_PL'],
      url: `${baseUrl}/${locale}`,
      siteName: "Rafał Łukawski Portfolio",
      type: 'website',
      images: [
        {
          url: `${baseUrl}/preview_${locale}.webp`,
          width: currentImageConfig.width,
          height: currentImageConfig.height,
          alt: 'Rafał Łukawski - IT Project Manager | Software Developer',
        },
      ],
    },
    
    // Twitter Card for better Twitter/X sharing
    twitter: {
      card: 'summary_large_image',
      title: "Rafał Łukawski - IT Project Manager | Software Developer",
      description: "Full-stack developer with 5+ years of modern frontend/backend experience. Google Cloud Professional Architect | Professional Scrum Master",
      images: [`${baseUrl}/preview_${locale}.webp`],
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;

  // Ensure that the incoming `locale` is valid
  if (!routing.locales.includes(locale as "en" | "pl")) {
    notFound();
  }

  // Providing all messages to the client
  // side is the easiest way to get started
  const messages = await getMessages();
  const cookieStore = await cookies();
  const colorMode = parseColorMode(cookieStore.get(COLOR_MODE_COOKIE)?.value);

  return (
    <html lang={locale} suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <InitColorSchemeScript
          attribute="class"
          defaultMode={colorMode}
          modeStorageKey={COLOR_MODE_STORAGE_KEY}
        />
        <GoogleAnalytics />
        <NextIntlClientProvider messages={messages}>
          <AppRouterCacheProvider>
            <AppThemeProvider defaultMode={colorMode}>
              {children}
              <Footer />
            </AppThemeProvider>
          </AppRouterCacheProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
