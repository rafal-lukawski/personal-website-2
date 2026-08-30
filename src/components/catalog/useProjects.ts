"use client";

import { useMemo } from "react";
import { useFormatter, useTranslations } from "next-intl";
import { projectsData, type YearMonth } from "./content";

/** A project from `content.ts` with every translated string resolved. */
export type CatalogProject = ReturnType<typeof useProjects>[number];
export type CatalogShot = CatalogProject["screenshots"][number];

type Formatter = ReturnType<typeof useFormatter>;

/**
 * `YYYY-MM` as a localised "Month YYYY". Anchored to UTC so the server and the
 * browser always land on the same month, whatever time zone either one runs in.
 */
function monthLabel(format: Formatter, yearMonth: YearMonth) {
  const [year, month] = yearMonth.split("-").map(Number);
  const label = format.dateTime(new Date(Date.UTC(year, month - 1, 1)), {
    year: "numeric",
    month: "long",
    timeZone: "UTC",
  });
  // Polish month names are lower-case in CLDR; the feed shows them capitalised.
  return label.charAt(0).toUpperCase() + label.slice(1);
}

/**
 * Single source of the project feed: the gallery panel and the lightbox both
 * read the same translated list, so indices and labels can never drift apart.
 */
export function useProjects() {
  const t = useTranslations();
  const format = useFormatter();

  return useMemo(
    () =>
      projectsData.map((project, idx) => {
        // Slots are numbered bottom-up, so the newest project wears the highest one.
        const slot = String(projectsData.length - idx).padStart(2, "0");
        const [startYear] = project.startDate.split("-");
        const start = monthLabel(format, project.startDate);
        const end = project.endDate ? monthLabel(format, project.endDate) : t("projects.present");

        return {
          ...project,
          title: t(`projects.${project.id}.title`),
          dateRange: `${start} - ${end}`,
          screenshots: project.screenshots.map((screen) => ({
            ...screen,
            alt: t(`projects.${project.id}.screenshots.${screen.id}.alt`),
          })),
          statusLabel: t(`hud.projectStatus.${project.status}`),
          slotLabel: slot,
          buildStamp: `STAMP: ${startYear}_PROJ_${slot}`,
        };
      }),
    [t, format],
  );
}
