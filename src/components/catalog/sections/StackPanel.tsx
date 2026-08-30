"use client";

import { useTranslations } from "next-intl";
import Box from "@mui/material/Box";
import { stackCategories } from "../content";
import { Panel, PanelBody, PanelHeader } from "../ui";
import type { SectionProps } from "./types";
import { StackCard } from "./StackCard";

/** Project-management cards live next to the tech grid but have no icon data. */
const PM_CATEGORIES = [
  { titleKey: "methodologies", items: ["Scrum", "Kanban", "Waterfall"] },
  { titleKey: "tools", items: ["Jira", "Confluence", "GitHub", "Asana"] },
] as const;

export function StackPanel({ order }: SectionProps) {
  const tHud = useTranslations("hud");
  const tTech = useTranslations("technologies");
  const tPm = useTranslations("projectManagement");

  return (
    <Panel id="stack" sx={{ order }}>
      <PanelHeader
        title={tHud("moduleStack")}
        meta={`NODES: ${stackCategories.length + PM_CATEGORIES.length}`}
        stampLeft="SYS_LOAD: 24%"
        stampRight="SYNC: OK"
      />
      <PanelBody>
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", sm: "repeat(3, minmax(0, 1fr))" },
            gap: "20px",
          }}
        >
          {stackCategories.map((category) => (
            <StackCard key={category.titleKey} title={tTech(category.titleKey)} items={category.items} />
          ))}
        </Box>
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" },
            gap: "20px",
            mt: "20px",
          }}
        >
          {PM_CATEGORIES.map((category) => (
            <StackCard key={category.titleKey} title={tPm(category.titleKey)} items={category.items} />
          ))}
        </Box>
      </PanelBody>
    </Panel>
  );
}
