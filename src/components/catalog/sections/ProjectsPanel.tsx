"use client";

import { useTranslations } from "next-intl";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { hud } from "@/theme/hud";
import type { CatalogProject } from "../useProjects";
import { Panel, PanelBody, PanelHeader, SectionLabel } from "../ui";
import type { SectionProps } from "./types";
import { ProjectCard } from "./ProjectCard";

export function ProjectsPanel({
  projects,
  onOpen,
  order,
}: SectionProps & {
  projects: readonly CatalogProject[];
  onOpen: (projectId: string) => void;
}) {
  const t = useTranslations();

  return (
    <Box
      component="aside"
      id="projects"
      sx={{
        order,
        position: { lg: "sticky" },
        top: { lg: hud.headerH + 12 },
        alignSelf: { lg: "start" },
      }}
    >
      <Panel scan>
        <PanelHeader
          title={t("hud.moduleProjects")}
          meta="FEED: LIVE"
          stampLeft={`IDX: ${String(projects.length).padStart(2, "0")}`}
          stampRight="RX: 100%"
        />
        <PanelBody>
          <Stack
            direction="row"
            alignItems="baseline"
            justifyContent="space-between"
            sx={{ mb: "10px" }}
          >
            <SectionLabel sx={{ m: 0, fontSize: "0.86rem" }}>{t("projects.title")}</SectionLabel>
            <Typography sx={{ color: hud.dim, font: `500 11px/1 ${hud.mono}` }}>
              {String(projects.length).padStart(2, "0")}
            </Typography>
          </Stack>
          <Box
            sx={{
              display: { xs: "grid", lg: "block" },
              gridTemplateColumns: { xs: "1fr", sm: "repeat(2, minmax(0, 1fr))", lg: "none" },
              gap: { xs: "20px", lg: 0 },
            }}
          >
            {projects.map((project, idx) => (
              <ProjectCard key={project.id} project={project} index={idx} onOpen={onOpen} />
            ))}
          </Box>
        </PanelBody>
      </Panel>
    </Box>
  );
}
