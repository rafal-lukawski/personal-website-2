"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import Box from "@mui/material/Box";
import LinkMui from "@mui/material/Link";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { FaExternalLinkAlt } from "react-icons/fa";
import { hud } from "@/theme/hud";
import type { CatalogProject } from "../useProjects";
import {
  GalleryChip,
  MonoMeta,
  ShotBg,
  ShotButton,
  ShotFg,
  ShotFrame,
  ShotMeta,
  focusRing,
} from "../ui";

export function ProjectCard({
  project,
  index,
  onOpen,
}: {
  project: CatalogProject;
  /** Zero-based position in the feed; shown as the stamped slot number. */
  index: number;
  onOpen: (projectId: string) => void;
}) {
  const t = useTranslations();
  const shot = project.screenshots[0];
  const galleryLabel = `${t("hud.gallery")} ${project.title}`;

  return (
    <Box component="article" sx={{ mb: { xs: 0, lg: "20px" }, "&:last-child": { mb: 0 } }}>
      <ShotFrame>
        <ShotButton type="button" aria-label={galleryLabel} onClick={() => onOpen(project.id)}>
          <ShotMeta
            status={project.statusLabel}
            stamp={project.buildStamp}
            index={String(index + 1).padStart(2, "0")}
          />
          <ShotBg aria-hidden>
            <Image src={shot.src} alt="" width={shot.width} height={shot.height} />
          </ShotBg>
          <ShotFg>
            <Image src={shot.src} alt={shot.alt} width={shot.width} height={shot.height} />
          </ShotFg>
        </ShotButton>
      </ShotFrame>
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="baseline"
        spacing={1}
        sx={{ mt: "7px" }}
      >
        <Stack direction="row" alignItems="center" spacing="8px" sx={{ minWidth: 0 }}>
          <Typography component="h3" sx={{ m: 0, fontSize: "0.92rem" }}>
            {project.title}
          </Typography>
          {project.url && (
            <LinkMui
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${t("hud.openProject")}: ${project.title}`}
              color="inherit"
              sx={{
                display: "inline-flex",
                color: hud.muted,
                flexShrink: 0,
                "&:hover": { color: hud.cyan },
                ...focusRing,
              }}
            >
              <FaExternalLinkAlt size={11} />
            </LinkMui>
          )}
        </Stack>
        <GalleryChip type="button" onClick={() => onOpen(project.id)} aria-label={galleryLabel}>
          {t("hud.gallery")}
          <span>{project.screenshots.length}</span>
        </GalleryChip>
      </Stack>
      <MonoMeta sx={{ mt: "2px", color: hud.dim, letterSpacing: "0.04em" }}>
        {project.dateRange}
      </MonoMeta>
    </Box>
  );
}
