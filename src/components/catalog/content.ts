import type { StaticImageData } from "next/image";
import egzoclinic2 from "../../../public/projects/egzoclinic-2.webp";
import egzoclinic3 from "../../../public/projects/egzoclinic-3.webp";
import egzoclinic4 from "../../../public/projects/egzoclinic-4.webp";
import egzoclinic5 from "../../../public/projects/egzoclinic-5.webp";
import generator1 from "../../../public/projects/generator-1.webp";
import generator2 from "../../../public/projects/generator-2.webp";
import glam4less3 from "../../../public/projects/glam4less-3.webp";
import glam4less4 from "../../../public/projects/glam4less-4.webp";
import glam4less5 from "../../../public/projects/glam4less-5.webp";
import glam4less6 from "../../../public/projects/glam4less-6.webp";
import mediaflip1 from "../../../public/projects/mediaflip-1.webp";
import mediaflip2 from "../../../public/projects/mediaflip-2.webp";
import mediaflip4 from "../../../public/projects/mediaflip-4.webp";
import mediaflip5 from "../../../public/projects/mediaflip-5.webp";
import multi1 from "../../../public/projects/multi-1.webp";
import multi2 from "../../../public/projects/multi-2.webp";
import stellaEmg from "../../../public/projects/stella-app_emg-program.webp";
import stellaLogin from "../../../public/projects/stella-app_login-page.webp";

export type ProjectStatus = "development" | "deployed" | "maintained";

/** Month precision is all the feed ever renders, so the day is left out. */
export type YearMonth = `${number}-${number}`;

type Project = {
  id: string;
  status: ProjectStatus;
  /** First month of work; also the year stamped on the card. */
  startDate: YearMonth;
  /** Last month of work; `undefined` while the project is still running. */
  endDate: YearMonth | undefined;
  url: string | undefined;
  customer: string | { display: string; url: string };
  screenshots: readonly {
    src: StaticImageData;
    sourceUrl: string;
  }[];
};

export const projectsData = [
  {
    id: "glam4less",
    status: "development",
    startDate: "2026-07",
    endDate: undefined,
    url: "https://glam4less.pl",
    customer: "DRC Dawid Ryżak",
    screenshots: [
      { src: glam4less6, sourceUrl: "glam4less.pl" },
      { src: glam4less3, sourceUrl: "glam4less.pl" },
      { src: glam4less4, sourceUrl: "glam4less.pl" },
      { src: glam4less5, sourceUrl: "glam4less.pl" },
    ],
  },
  {
    id: "mediaflip",
    status: "maintained",
    startDate: "2026-01",
    endDate: undefined,
    url: "https://mediaflip.io",
    customer: "Rafał Łukawski",
    screenshots: [
      { src: mediaflip1, sourceUrl: "mediaflip.io" },
      { src: mediaflip2, sourceUrl: "mediaflip.io/pl/stos-technologiczny" },
      { src: mediaflip4, sourceUrl: "mediaflip.io/pl/admin/memes" },
      { src: mediaflip5, sourceUrl: "mediaflip.io/pl/generator" },
    ],
  },
  {
    id: "egzoclinic",
    status: "deployed",
    startDate: "2022-01",
    endDate: "2025-10",
    url: undefined as string | undefined,
    customer: { display: "EGZOTech.com", url: "https://egzotech.com" },
    screenshots: [
      { src: egzoclinic4, sourceUrl: "egzotech.com" },
      { src: egzoclinic5, sourceUrl: "egzotech.com" },
      { src: egzoclinic2, sourceUrl: "egzotech.com" },
      { src: egzoclinic3, sourceUrl: "egzotech.com" },
    ],
  },
  {
    id: "generator",
    status: "deployed",
    startDate: "2024-12",
    endDate: "2025-11",
    url: "https://generator-paskow.pl",
    customer: "Rafał Łukawski",
    screenshots: [
      { src: generator1, sourceUrl: "generator-paskow.pl" },
      { src: generator2, sourceUrl: "generator-paskow.pl" },
    ],
  },
  {
    id: "stella",
    status: "deployed",
    startDate: "2022-03",
    endDate: "2024-04",
    url: "https://app.egzotech.com",
    customer: { display: "EGZOTech.com", url: "https://egzotech.com" },
    screenshots: [
      { src: stellaEmg, sourceUrl: "egzotech.com" },
      { src: stellaLogin, sourceUrl: "egzotech.com" },
    ],
  },
  {
    id: "multibenefit",
    status: "deployed",
    startDate: "2013-06",
    endDate: "2016-02",
    url: undefined as string | undefined,
    customer: {
      display: "Benefit Systems",
      url: "https://www.benefitsystems.pl/",
    },
    screenshots: [
      { src: multi1, sourceUrl: "web.archive.org" },
      { src: multi2, sourceUrl: "web.archive.org" },
    ],
  },
] as const satisfies readonly Project[];

export const certificatesData = [
  {
    date: "2024.07",
    nameKey: "googleCloudArchitect",
    customIcon: "/google-cloud-architect.webp",
    validationLink:
      "https://www.credly.com/badges/257b922c-e06d-493b-b9a8-4e3be00b87a3/linked_in_profile",
  },
  {
    date: "2012.01",
    nameKey: "scrumMaster",
    customIcon: "/scrum-master-psm1.webp",
    validationLink:
      "https://www.credly.com/badges/44c1cea7-7e2a-4a44-88ee-03c189587963",
  },
] as const;

/**
 * Career facts behind the stat tiles. Kept as two numbers rather than one
 * "years of experience" so the break stays visible instead of being baked in.
 */
export const career = {
  /** First professional IT role. */
  startYear: 2000,
  /** Years spent out of the industry, subtracted from the experience tile. */
  breakYears: 3,
} as const;

/** Industries the portfolio covers; the labels themselves live in the messages. */
export const industries = ["medtech", "ecommerce", "aiMedia", "fashionTech"] as const;

export const stackCategories = [
  {
    titleKey: "frontend",
    items: ["React", "TypeScript", "Next.js", "Angular"],
  },
  {
    titleKey: "stateManagement",
    items: ["Redux Toolkit", "Zustand"],
  },
  {
    titleKey: "uiLibraries",
    items: ["Chakra UI", "Material UI", "Tailwind CSS"],
  },
  {
    titleKey: "backend",
    items: ["Node.js", "Express", "PostgreSQL", "MySQL", "PHP"],
  },
  {
    titleKey: "cloudDevops",
    items: ["Git", "GCP", "Docker + Swarm", "CI/CD"],
  },
  {
    titleKey: "testing",
    items: ["Cypress", "Jest"],
  },
] as const;
