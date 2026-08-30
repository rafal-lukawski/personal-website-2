export type ProjectStatus = "development" | "deployed" | "maintained";

type Project = {
  id: string;
  status: ProjectStatus;
  url: string | undefined;
  customer: string | { display: string; url: string };
  screenshots: readonly {
    id: string;
    src: string;
    sourceUrl: string;
    width: number;
    height: number;
  }[];
};

export const projectsData = [
  {
    id: "glam4less",
    status: "development",
    url: "https://glam4less.pl",
    customer: "DRC Dawid Ryżak",
    screenshots: [
      {
        id: "screen1",
        src: "/projects/glam4less-1.webp",
        sourceUrl: "glam4less.pl",
        width: 1013,
        height: 1024,
      },
    ],
  },
  {
    id: "mediaflip",
    status: "maintained",
    url: "https://mediaflip.io",
    customer: "Rafał Łukawski",
    screenshots: [
      {
        id: "screen1",
        src: "/projects/mediaflip-1.webp",
        sourceUrl: "mediaflip.io",
        width: 1280,
        height: 800,
      },
      {
        id: "screen2",
        src: "/projects/mediaflip-2.webp",
        sourceUrl: "mediaflip.io/pl/stos-technologiczny",
        width: 1280,
        height: 800,
      },
      {
        id: "screen4",
        src: "/projects/mediaflip-4.webp",
        sourceUrl: "mediaflip.io/pl/admin/memes",
        width: 1577,
        height: 816,
      },
      {
        id: "screen5",
        src: "/projects/mediaflip-5.webp",
        sourceUrl: "mediaflip.io/pl/generator",
        width: 1280,
        height: 800,
      },
    ],
  },
  {
    id: "egzoclinic",
    status: "deployed",
    url: undefined as string | undefined,
    customer: { display: "EGZOTech.com", url: "https://egzotech.com" },
    screenshots: [
      {
        id: "screen1",
        src: "/projects/egzoclinic-4.webp",
        sourceUrl: "egzotech.com",
        width: 1024,
        height: 556,
      },
      {
        id: "screen5",
        src: "/projects/egzoclinic-5.webp",
        sourceUrl: "egzotech.com",
        width: 440,
        height: 441,
      },
      {
        id: "screen2",
        src: "/projects/egzoclinic-2.webp",
        sourceUrl: "egzotech.com",
        width: 932,
        height: 561,
      },
      {
        id: "screen3",
        src: "/projects/egzoclinic-3.webp",
        sourceUrl: "egzotech.com",
        width: 1024,
        height: 538,
      },

    ],
  },
  {
    id: "generator",
    status: "deployed",
    url: "https://generator-paskow.pl",
    customer: "Rafał Łukawski",
    screenshots: [
      {
        id: "screen1",
        src: "/projects/generator-1.webp",
        sourceUrl: "generator-paskow.pl",
        width: 1440,
        height: 900,
      },
      {
        id: "screen2",
        src: "/projects/generator-2.webp",
        sourceUrl: "generator-paskow.pl",
        width: 1440,
        height: 900,
      },
    ],
  },
  {
    id: "stella",
    status: "deployed",
    url: "https://app.egzotech.com",
    customer: { display: "EGZOTech.com", url: "https://egzotech.com" },
    screenshots: [
      {
        id: "screen1",
        src: "/projects/stella-app_emg-program.webp",
        sourceUrl: "egzotech.com",
        width: 1444,
        height: 896,
      },
      {
        id: "screen2",
        src: "/projects/stella-app_login-page.webp",
        sourceUrl: "egzotech.com",
        width: 1440,
        height: 900,
      },
    ],
  },
  {
    id: "multibenefit",
    status: "deployed",
    url: undefined as string | undefined,
    customer: {
      display: "Benefit Systems",
      url: "https://www.benefitsystems.pl/",
    },
    screenshots: [
      {
        id: "screen1",
        src: "/projects/multi-1.webp",
        sourceUrl: "web.archive.org",
        width: 1120,
        height: 1020,
      },
      {
        id: "screen2",
        src: "/projects/multi-2.webp",
        sourceUrl: "web.archive.org",
        width: 1195,
        height: 1106,
      },
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
