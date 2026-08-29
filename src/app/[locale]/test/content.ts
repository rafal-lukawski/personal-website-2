export const projectsData = [
  {
    id: "glam4less",
    url: "https://glam4less.pl",
    customer: "DRC Dawid Ryżak",
    screenshots: [
      {
        id: "screen1",
        src: "/projects/glam4less-1.webp",
        sourceUrl: "glam4less.pl",
      },
    ],
  },
  {
    id: "mediaflip",
    url: "https://mediaflip.io",
    customer: "Rafał Łukawski",
    screenshots: [
      {
        id: "screen1",
        src: "/projects/mediaflip-1.webp",
        sourceUrl: "mediaflip.io",
      },
      {
        id: "screen2",
        src: "/projects/mediaflip-2.webp",
        sourceUrl: "mediaflip.io/pl/stos-technologiczny",
      },
      {
        id: "screen4",
        src: "/projects/mediaflip-4.webp",
        sourceUrl: "mediaflip.io/pl/admin/memes",
      },
      {
        id: "screen5",
        src: "/projects/mediaflip-5.webp",
        sourceUrl: "mediaflip.io/pl/generator",
      },
    ],
  },
  {
    id: "egzoclinic",
    url: undefined as string | undefined,
    customer: { display: "EGZOTech.com", url: "https://egzotech.com" },
    screenshots: [
      {
        id: "screen1",
        src: "/projects/egzoclinic-5.webp",
        sourceUrl: "egzotech.com",
      },
      {
        id: "screen2",
        src: "/projects/egzoclinic-2.webp",
        sourceUrl: "egzotech.com",
      },
      {
        id: "screen3",
        src: "/projects/egzoclinic-3.webp",
        sourceUrl: "egzotech.com",
      },
      {
        id: "screen4",
        src: "/projects/egzoclinic-4.webp",
        sourceUrl: "egzotech.com",
      },
    ],
  },
  {
    id: "generator",
    url: "https://generator-paskow.pl",
    customer: "Rafał Łukawski",
    screenshots: [
      {
        id: "screen1",
        src: "/projects/generator-1.webp",
        sourceUrl: "generator-paskow.pl",
      },
      {
        id: "screen2",
        src: "/projects/generator-2.webp",
        sourceUrl: "generator-paskow.pl",
      },
    ],
  },
  {
    id: "stella",
    url: "https://app.egzotech.com",
    customer: { display: "EGZOTech.com", url: "https://egzotech.com" },
    screenshots: [
      {
        id: "screen1",
        src: "/projects/stella-app_login-page.webp",
        sourceUrl: "egzotech.com",
      },
      {
        id: "screen2",
        src: "/projects/stella-app_emg-program.webp",
        sourceUrl: "egzotech.com",
      },
    ],
  },
  {
    id: "multibenefit",
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
      },
      {
        id: "screen2",
        src: "/projects/multi-2.webp",
        sourceUrl: "web.archive.org",
      },
    ],
  },
] as const;

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
