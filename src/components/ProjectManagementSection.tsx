"use client";

import { SectionLayout } from "./SectionLayout";
import { useTranslations } from "next-intl";
import {
  SiJira,
  SiConfluence,
  SiGithub,
  SiAsana,
} from "react-icons/si";
import { MdLoop } from "react-icons/md";
import { IconType } from "react-icons";
import { blue, green, lightBlue, red } from "@mui/material/colors";
import { Categories } from "@/components/Categories";

interface TechItem {
  name: string;
  icon?: IconType;
  emoji?: string;
  color: string;
  colorEmoji?: boolean;
}

interface TechCategory {
  title: string;
  items: TechItem[];
}

export function ProjectManagementSection() {
  const t = useTranslations("projectManagement");

  // Brand-matched hues, kept at MUI 500-700 shades so they stay readable on the light chips
  const categories: TechCategory[] = [
    {
      title: t("methodologies"),
      items: [
        { name: "Scrum", icon: MdLoop, color: green[600] },
        { name: "Kanban", emoji: "📌", color: red[600], colorEmoji: true },
        { name: "Waterfall", emoji: "📋", color: blue[700], colorEmoji: true },
      ],
    },
    {
      title: t("tools"),
      items: [
        { name: "Jira", icon: SiJira, color: blue[800] },
        { name: "Confluence", icon: SiConfluence, color: lightBlue[700] },
        { name: "GitHub", icon: SiGithub, color: "currentColor" },
        { name: "Asana", icon: SiAsana, color: red[400] },
      ],
    },
  ];

  return (
    <SectionLayout title={t("title")} id="pm">
      <Categories 
        categories={categories} 
        template={{ xs: "1fr", sm: "repeat(2, minmax(200px, 230px))" }} 
        orientation="column" 
      />
    </SectionLayout>
  );
}
