"use client";

import { useTranslations } from "next-intl";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import { SHOW_STATS_PANEL } from "@/config/features";
import { ParticleField } from "./ParticleField";
import { emojiTints } from "./techIcons";
import { useLightbox } from "./useLightbox";
import { useProjects } from "./useProjects";
import { AboutPanel } from "./sections/AboutPanel";
import { CertificatesPanel } from "./sections/CertificatesPanel";
import { ContactPanel } from "./sections/ContactPanel";
import { HeroPanel } from "./sections/HeroPanel";
import { ProjectLightbox } from "./sections/ProjectLightbox";
import { ProjectsPanel } from "./sections/ProjectsPanel";
import { SiteFooter } from "./sections/SiteFooter";
import { SiteHeader } from "./sections/SiteHeader";
import { StackPanel } from "./sections/StackPanel";
import { StatsPanel } from "./sections/StatsPanel";
import { EmojiTintFilters, Page, Root, SkipLink } from "./ui";

/**
 * Below `lg` the two columns collapse into one flow (`display: contents`), so
 * the sections interleave by `order`: stats, about, projects, stack, certs, contact.
 */
const ORDER = {
  stats: 1,
  about: 2,
  projects: 3,
  stack: 4,
  certificates: 5,
  contact: 6,
} as const;

export function Catalog() {
  const t = useTranslations();
  const projects = useProjects();
  const lightbox = useLightbox(projects);

  return (
    <Root>
      <ParticleField />
      <EmojiTintFilters colors={emojiTints} />
      <SkipLink href="#about">{t("hud.skip")}</SkipLink>

      <SiteHeader />

      <Page id="top">
        <HeroPanel />

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", lg: "minmax(0, 1fr) minmax(300px, 360px)" },
            gap: "20px",
          }}
        >
          <Stack spacing="20px" useFlexGap sx={{ display: { xs: "contents", lg: "flex" } }}>
            {SHOW_STATS_PANEL && <StatsPanel order={ORDER.stats} />}
            <AboutPanel order={ORDER.about} />
            <StackPanel order={ORDER.stack} />
            <CertificatesPanel order={ORDER.certificates} />
            <ContactPanel order={ORDER.contact} />
          </Stack>

          <ProjectsPanel projects={projects} onOpen={lightbox.open} order={ORDER.projects} />
        </Box>

        <SiteFooter />
      </Page>

      <ProjectLightbox {...lightbox} />
    </Root>
  );
}
