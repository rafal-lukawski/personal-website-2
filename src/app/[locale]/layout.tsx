import type { Metadata } from "next";
import { JetBrains_Mono, Oxanium } from "next/font/google";
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
import { GoogleAnalytics } from "@/components/GoogleAnalytics";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";

const oxanium = Oxanium({
  subsets: ["latin", "latin-ext"],
  variable: "--font-oxanium",
  weight: ["600", "700", "800"],
});

const jetBrains = JetBrains_Mono({
  subsets: ["latin", "latin-ext"],
  variable: "--font-jetbrains",
  weight: ["400", "500", "700"],
});

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

  const imageConfig = {
    en: { width: 992, height: 469 },
    pl: { width: 990, height: 486 },
  };

  const currentImageConfig = imageConfig[locale as "en" | "pl"] || imageConfig.en;

  return {
    title: "Rafał Łukawski - IT Project Manager | Software Developer",
    description:
      "Full-stack developer with 5+ years of modern frontend/backend experience and 20+ years of experience in IT. Google Cloud Professional Architect | Professional Scrum Master",
    authors: [{ name: "Rafał Łukawski" }],

    alternates: {
      canonical: `${baseUrl}/${locale}`,
      languages: {
        en: `${baseUrl}/en`,
        pl: `${baseUrl}/pl`,
        "x-default": `${baseUrl}/en`,
      },
    },

    openGraph: {
      title: "Rafał Łukawski - IT Project Manager | Software Developer",
      description:
        "Full-stack developer with 5+ years of modern frontend/backend experience. Google Cloud Professional Architect | Professional Scrum Master",
      locale: locale === "pl" ? "pl_PL" : "en_US",
      alternateLocale: locale === "pl" ? ["en_US"] : ["pl_PL"],
      url: `${baseUrl}/${locale}`,
      siteName: "Rafał Łukawski Portfolio",
      type: "website",
      images: [
        {
          url: `${baseUrl}/preview_${locale}.webp`,
          width: currentImageConfig.width,
          height: currentImageConfig.height,
          alt: "Rafał Łukawski - IT Project Manager | Software Developer",
        },
      ],
    },

    twitter: {
      card: "summary_large_image",
      title: "Rafał Łukawski - IT Project Manager | Software Developer",
      description:
        "Full-stack developer with 5+ years of modern frontend/backend experience. Google Cloud Professional Architect | Professional Scrum Master",
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

  if (!routing.locales.includes(locale as "en" | "pl")) {
    notFound();
  }

  const messages = await getMessages();
  const cookieStore = await cookies();
  const colorMode = parseColorMode(cookieStore.get(COLOR_MODE_COOKIE)?.value);
  const htmlColorClass =
    colorMode === "light" || colorMode === "dark" ? colorMode : undefined;

  return (
    <html
      lang={locale}
      className={htmlColorClass}
      suppressHydrationWarning
    >
      <body
        className={`${oxanium.variable} ${jetBrains.variable}`}
        suppressHydrationWarning
      >
        <InitColorSchemeScript
          attribute="class"
          defaultMode={colorMode}
          modeStorageKey={COLOR_MODE_STORAGE_KEY}
        />
        <GoogleAnalytics />
        <NextIntlClientProvider messages={messages}>
          <AppRouterCacheProvider>
            <AppThemeProvider defaultMode={colorMode}>{children}</AppThemeProvider>
          </AppRouterCacheProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
