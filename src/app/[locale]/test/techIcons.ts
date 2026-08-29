import type { IconType } from "react-icons";
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
  SiAngular,
  SiAsana,
  SiChakraui,
  SiConfluence,
  SiCypress,
  SiDocker,
  SiGit,
  SiGithub,
  SiGooglecloud,
  SiJest,
  SiJira,
  SiMui,
  SiMysql,
  SiNextdotjs,
  SiNodedotjs,
  SiPhp,
  SiPostgresql,
  SiReact,
  SiRedux,
  SiTailwindcss,
  SiTypescript,
} from "react-icons/si";
import { IoMdSettings } from "react-icons/io";
import { MdLoop } from "react-icons/md";
import { hud } from "./theme";

export const channels = (c: string) => {
  const v = c.replace("#", "");
  const full = v.length === 3 ? v.replace(/./g, (ch) => ch + ch) : v;
  return [0, 2, 4].map((i) => parseInt(full.slice(i, i + 2), 16));
};

/**
 * How far a brand hue travels away from the HUD cyan. Low on purpose: the rows
 * should read as one cyan family that merely leans toward each brand, not as a
 * colour swatch pasted onto the console.
 */
const LEAN = 0.28;

const tint = (brand: string) => {
  const [r1, g1, b1] = channels(hud.cyan);
  const [r2, g2, b2] = channels(brand);
  const mix = (a: number, b: number) =>
    Math.round(a + (b - a) * LEAN)
      .toString(16)
      .padStart(2, "0");
  return `#${mix(r1, r2)}${mix(g1, g2)}${mix(b1, b2)}`;
};

export interface TechIcon {
  icon?: IconType;
  emoji?: string;
  color: string;
  /** Pictographic emoji carry their own colours, so drain them instead. */
  desaturate?: boolean;
}

/**
 * The main site's brand-matched hues (StackSection, ProjectManagementSection),
 * each pulled toward the console cyan by `tint`. Keyed by the label the catalog
 * renders; anything missing falls back to an unbadged row.
 */
export const techIcons: Record<string, TechIcon> = {
  // frontend
  React: { icon: SiReact, color: tint(cyan[600]) },
  TypeScript: { icon: SiTypescript, color: tint(blue[700]) },
  "Next.js": { icon: SiNextdotjs, color: tint(hud.text) },
  Angular: { icon: SiAngular, color: tint(red[600]) },
  // state management
  "Redux Toolkit": { icon: SiRedux, color: tint(deepPurple[500]) },
  Zustand: { emoji: "🐻", color: tint(deepOrange[600]), desaturate: true },
  // ui libraries
  "Chakra UI": { icon: SiChakraui, color: tint(teal[500]) },
  "Material UI": { icon: SiMui, color: tint(blue[500]) },
  "Tailwind CSS": { icon: SiTailwindcss, color: tint(cyan[500]) },
  // backend
  "Node.js": { icon: SiNodedotjs, color: tint(green[700]) },
  Express: { emoji: "E", color: tint(hud.text) },
  PostgreSQL: { icon: SiPostgresql, color: tint(indigo[600]) },
  MySQL: { icon: SiMysql, color: tint(blue[800]) },
  PHP: { icon: SiPhp, color: tint(deepPurple[400]) },
  // cloud & devops
  Git: { icon: SiGit, color: tint(deepOrange[600]) },
  GCP: { icon: SiGooglecloud, color: tint(blue[600]) },
  "Docker + Swarm": { icon: SiDocker, color: tint(lightBlue[500]) },
  "CI/CD": { icon: IoMdSettings, color: tint(purple[600]) },
  // testing
  Cypress: { icon: SiCypress, color: tint(teal[600]) },
  Jest: { icon: SiJest, color: tint(red[700]) },
  // methodologies
  Scrum: { icon: MdLoop, color: tint(green[600]) },
  Kanban: { emoji: "📌", color: tint(red[600]), desaturate: true },
  Waterfall: { emoji: "📋", color: tint(blue[700]), desaturate: true },
  // tools
  Jira: { icon: SiJira, color: tint(blue[800]) },
  Confluence: { icon: SiConfluence, color: tint(lightBlue[700]) },
  GitHub: { icon: SiGithub, color: tint(hud.text) },
  Asana: { icon: SiAsana, color: tint(red[400]) },
};

/** Stable id for the SVG filter that re-colours an emoji to `color`. */
export const tintFilterId = (color: string) => `tint-${color.replace("#", "")}`;

/** Every tint that a desaturated emoji needs a filter for. */
export const emojiTints = [
  ...new Set(Object.values(techIcons).filter((t) => t.desaturate).map((t) => t.color)),
];
