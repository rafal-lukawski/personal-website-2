"use client";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Chip from "@mui/material/Chip";
import { SectionLayout } from "./SectionLayout";
import { useTranslations } from "next-intl";
import {
  blue,
  cyan,
  deepOrange,
  deepPurple,
  green,
  indigo,
  lightBlue,
  purple,
  red,
  teal,
} from "@mui/material/colors";
import {
  SiReact,
  SiTypescript,
  SiNextdotjs,
  SiAngular,
  SiRedux,
  SiChakraui,
  SiMui,
  SiTailwindcss,
  SiCypress,
  SiJest,
  SiNodedotjs,
  SiPostgresql,
  SiMysql,
  SiGit,
  SiGooglecloud,
  SiDocker,
  SiPhp,
} from "react-icons/si";
import { IoMdSettings } from "react-icons/io";
import { MdLoop } from "react-icons/md";
import { IconType } from "react-icons";
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

export function StackSection() {
  const t = useTranslations("technologies");

  // Brand-matched hues, kept at MUI 500-700 shades so they stay readable on the light chips
  const categories: TechCategory[] = [
    {
      title: t("frontend"),
      items: [
        { name: "React", icon: SiReact, color: cyan[600] },
        { name: "TypeScript", icon: SiTypescript, color: blue[700] },
        { name: "Next.js", icon: SiNextdotjs, color: "currentColor" },
        { name: "Angular", icon: SiAngular, color: red[600] },
      ],
    },
    {
      title: t("stateManagement"),
      items: [
        { name: "Redux Toolkit", icon: SiRedux, color: deepPurple[500] },
        { name: "Zustand", emoji: "🐻", color: deepOrange[600], colorEmoji: true },
      ],
    },
    {
      title: t("uiLibraries"),
      items: [
        { name: "Chakra-UI", icon: SiChakraui, color: teal[500] },
        { name: "Material-UI", icon: SiMui, color: blue[500] },
        { name: "Tailwind CSS", icon: SiTailwindcss, color: cyan[500] },
      ],
    },
    {
      title: t("testing"),
      items: [
        { name: "Cypress", icon: SiCypress, color: teal[600] },
        { name: "Jest", icon: SiJest, color: red[700] },
      ],
    },
    {
      title: t("backend"),
      items: [
        { name: "Node.js", icon: SiNodedotjs, color: green[700] },
        { name: "Express", emoji: "E", color: "currentColor" },
        { name: "PostgreSQL", icon: SiPostgresql, color: indigo[600] },
        { name: "MySQL", icon: SiMysql, color: blue[800] },
        { name: "PHP", icon: SiPhp, color: deepPurple[400] },
      ],
    },
    {
      title: t("cloudDevops"),
      items: [
        { name: "Git", icon: SiGit, color: deepOrange[600] },
        { name: "GCP", icon: SiGooglecloud, color: blue[600] },
        { name: "Docker + Swarm", icon: SiDocker, color: lightBlue[500] },
        { name: "CI/CD", icon: IoMdSettings, color: purple[600] },
      ],
    },
  ];

  return (
    <SectionLayout title={t("title")} id="stack">
      <Categories categories={categories} />
    </SectionLayout>
  );
}
