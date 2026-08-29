import { JetBrains_Mono, Syne } from "next/font/google";
import type { Metadata } from "next";

const syne = Syne({
  subsets: ["latin", "latin-ext"],
  variable: "--font-syne",
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
    <div className={`${syne.variable} ${jetBrains.variable}`} data-catalog="test">
      {children}
    </div>
  );
}
