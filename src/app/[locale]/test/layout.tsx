import { JetBrains_Mono, Oxanium } from "next/font/google";
import type { Metadata } from "next";

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

export const metadata: Metadata = {
  title: "Rafał Łukawski — layout prototype",
  robots: { index: false, follow: false },
};

export default function TestCatalogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={`${oxanium.variable} ${jetBrains.variable}`} data-catalog="test">
      {children}
    </div>
  );
}
