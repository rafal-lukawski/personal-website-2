"use client";

import { useTranslations } from "next-intl";
import Box from "@mui/material/Box";
import { hud } from "@/theme/hud";
import { career, industries, projectsData, stackCategories } from "../content";
import { HudCard, MonoMeta, Panel, PanelBody, PanelHeader, SectionLabel } from "../ui";
import type { SectionProps } from "./types";

/** Everything listed across the stack categories, counted once. */
const TECH_COUNT = stackCategories.reduce((sum, category) => sum + category.items.length, 0);

/** Oldest project in the feed; anchors the "since" caption on the count tile. */
const FIRST_PROJECT_YEAR = Math.min(
  ...projectsData.map((project) => Number(project.startDate.split("-")[0])),
);

export function StatsPanel({ order }: SectionProps) {
  const t = useTranslations();
  // UTC so a server and a browser in different time zones agree on the year.
  const currentYear = new Date().getUTCFullYear();
  const yearsInIt = currentYear - career.startYear - career.breakYears;

  const tiles = [
    {
      key: "yearsInIt",
      value: `${yearsInIt}+`,
      label: t("stats.yearsInIt"),
      detail: t("stats.yearsInItDetail", { year: career.startYear }),
    },
    {
      key: "projects",
      value: String(projectsData.length),
      label: t("stats.projects"),
      detail: t("stats.projectsDetail", { year: FIRST_PROJECT_YEAR }),
    },
    {
      key: "technologies",
      value: String(TECH_COUNT),
      label: t("stats.technologies"),
      detail: t("stats.technologiesDetail", { categories: stackCategories.length }),
    },
    {
      key: "industries",
      value: String(industries.length),
      label: t("stats.industries"),
      detail: industries.map((name) => t(`stats.industryLabels.${name}`)).join(" · "),
    },
  ];

  return (
    <Panel id="stats" sx={{ order }}>
      <PanelHeader
        title={t("hud.moduleStats")}
        meta={`REC: ${String(tiles.length).padStart(2, "0")}`}
        stampLeft="AGG: OK"
        stampRight="CONF: HIGH"
      />
      <PanelBody>
        <SectionLabel sx={{ mb: "14px" }}>{t("stats.title")}</SectionLabel>
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "repeat(2, minmax(0, 1fr))",
              md: "repeat(4, minmax(0, 1fr))",
            },
            gap: "20px",
          }}
        >
          {tiles.map((tile) => (
            <HudCard
              key={tile.key}
              sx={{ display: "flex", flexDirection: "column", height: "100%" }}
            >
              <Box
                component="p"
                sx={{
                  m: 0,
                  font: `700 2.1rem/1 ${hud.mono}`,
                  letterSpacing: "-0.02em",
                  color: hud.cyan,
                  textShadow: `0 0 14px color-mix(in srgb, ${hud.cyan} 30%, transparent)`,
                }}
              >
                {tile.value}
              </Box>
              <Box
                component="p"
                sx={{
                  m: "8px 0 0",
                  // Two lines' worth, so a wrapping label keeps every detail
                  // line starting at the same height across the row.
                  minHeight: "2.6em",
                  font: `500 11px/1.3 ${hud.mono}`,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  color: hud.text,
                }}
              >
                {tile.label}
              </Box>
              <MonoMeta sx={{ mt: "2px", color: hud.dim, hyphens: "none" }}>
                {tile.detail}
              </MonoMeta>
            </HudCard>
          ))}
        </Box>
      </PanelBody>
    </Panel>
  );
}
