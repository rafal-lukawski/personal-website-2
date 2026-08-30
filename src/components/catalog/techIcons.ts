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
import { hud, hudDark } from "@/theme/hud";

export const channels = (c: string) => {
  const v = c.replace("#", "");
  const full = v.length === 3 ? v.replace(/./g, (ch) => ch + ch) : v;
  return [0, 2, 4].map((i) => parseInt(full.slice(i, i + 2), 16));
};

const LEAN = 0.28;

const tint = (brand: string) => {
  const [r1, g1, b1] = channels(hudDark.cyan);
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
  /** Brand hex, mixed toward HUD cyan in CSS so light/dark follow `--hud-cyan`. */
  color: string;
  desaturate?: boolean;
}

const TEXT = hudDark.text;

export const techIcons: Record<string, TechIcon> = {
  React: { icon: SiReact, color: cyan[600] },
  TypeScript: { icon: SiTypescript, color: blue[700] },
  "Next.js": { icon: SiNextdotjs, color: TEXT },
  Angular: { icon: SiAngular, color: red[600] },
  "Redux Toolkit": { icon: SiRedux, color: deepPurple[500] },
  Zustand: { emoji: "🐻", color: tint(deepOrange[600]), desaturate: true },
  "Chakra UI": { icon: SiChakraui, color: teal[500] },
  "Material UI": { icon: SiMui, color: blue[500] },
  "Tailwind CSS": { icon: SiTailwindcss, color: cyan[500] },
  "Node.js": { icon: SiNodedotjs, color: green[700] },
  Express: { emoji: "E", color: TEXT },
  PostgreSQL: { icon: SiPostgresql, color: indigo[600] },
  MySQL: { icon: SiMysql, color: blue[800] },
  PHP: { icon: SiPhp, color: deepPurple[400] },
  Git: { icon: SiGit, color: deepOrange[600] },
  GCP: { icon: SiGooglecloud, color: blue[600] },
  "Docker + Swarm": { icon: SiDocker, color: lightBlue[500] },
  "CI/CD": { icon: IoMdSettings, color: purple[600] },
  Cypress: { icon: SiCypress, color: teal[600] },
  Jest: { icon: SiJest, color: red[700] },
  Scrum: { icon: MdLoop, color: green[600] },
  Kanban: { emoji: "📌", color: tint(red[600]), desaturate: true },
  Waterfall: { emoji: "📋", color: tint(blue[700]), desaturate: true },
  Jira: { icon: SiJira, color: blue[800] },
  Confluence: { icon: SiConfluence, color: lightBlue[700] },
  GitHub: { icon: SiGithub, color: TEXT },
  Asana: { icon: SiAsana, color: red[400] },
};

export const tintFilterId = (color: string) => `tint-${color.replace("#", "")}`;

export const emojiTints = [
  ...new Set(Object.values(techIcons).filter((t) => t.desaturate).map((t) => t.color)),
];

export function hudTintColor(brand: string) {
  return `color-mix(in srgb, ${hud.cyan} 72%, ${brand} 28%)`;
}
