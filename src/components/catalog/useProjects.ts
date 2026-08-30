"use client";

import { useMemo } from "react";
import { useTranslations } from "next-intl";
import { projectsData } from "./content";

/** A project from `content.ts` with every translated string resolved. */
export type CatalogProject = ReturnType<typeof useProjects>[number];
export type CatalogShot = CatalogProject["screenshots"][number];

/**
 * Single source of the project feed: the gallery panel and the lightbox both
 * read the same translated list, so indices and labels can never drift apart.
 */
export function useProjects() {
  const t = useTranslations();

  return useMemo(
    () =>
      projectsData.map((project, idx) => ({
        ...project,
        title: t(`projects.${project.id}.title`),
        dateRange: t(`projects.${project.id}.dateRange`),
        screenshots: project.screenshots.map((screen) => ({
          ...screen,
          alt: t(`projects.${project.id}.screenshots.${screen.id}.alt`),
        })),
        statusLabel: t(`hud.projectStatus.${project.status}`),
        buildStamp: `STAMP: 2024_PROJ_${String(idx + 1).padStart(2, "0")}`,
      })),
    [t],
  );
}
