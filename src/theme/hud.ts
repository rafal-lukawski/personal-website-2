export type HudPalette = {
  bg: string;
  surface: string;
  sunken: string;
  panel: string;
  panelSolid: string;
  cyan: string;
  cyanDeep: string;
  ok: string;
  warn: string;
  text: string;
  muted: string;
  dim: string;
  danger: string;
  glitch: string;
  gridLine: string;
  scanInk: string;
  selectionBg: string;
  selectionFg: string;
  overlay: string;
  shotBgFilter: string;
  /** Derived from `cyan`; the standard border tint for HUD chrome. */
  frame: string;
};

const CYAN_DARK = "#00f2ff";
const CYAN_LIGHT = "#007a8a";
const TEXT_LIGHT = "#1a2a32";

function frameOf(cyan: string): string {
  return `color-mix(in srgb, ${cyan} 50%, transparent)`;
}

export const hudDark: HudPalette = {
  bg: "#0a0a0c",
  surface: "rgba(21, 38, 44, 0.45)",
  sunken: "rgba(0, 0, 0, 0.15)",
  panel: "rgba(10, 10, 12, 0.8)",
  panelSolid: "#0a0a0c",
  cyan: CYAN_DARK,
  cyanDeep: "#007a82",
  ok: "#00ff41",
  warn: "#ffd24d",
  text: "#d7e4eb",
  muted: "#9eb2be",
  dim: "#68808d",
  danger: "#ff6d8d",
  glitch: "#ff0048",
  gridLine: "#ffffff08",
  scanInk: "#ffffff",
  selectionBg: "rgba(0, 242, 255, 0.28)",
  selectionFg: "#edffff",
  overlay: "rgba(46, 50, 56, 0.92)",
  shotBgFilter: "grayscale(1) blur(3px) brightness(0.22)",
  frame: frameOf(CYAN_DARK),
};

export const hudLight: HudPalette = {
  bg: "rgba(26, 42, 50, 0.05)",
  surface: "rgba(255, 255, 255, 0.85)",
  sunken: "rgba(46, 62, 70, 0.06)",
  panel: "rgba(255, 255, 255, 0.82)",
  panelSolid: "rgba(26, 42, 50, 0.1)",
  cyan: CYAN_LIGHT,
  cyanDeep: "#005760",
  ok: "#128a3e",
  warn: "#b3760b",
  text: TEXT_LIGHT,
  muted: "#4a6570",
  dim: "#6a8490",
  danger: "#c43d5a",
  glitch: "#d1003c",
  gridLine: "#1a2a3214",
  scanInk: "#1a2a32",
  selectionBg: "rgba(0, 122, 138, 0.22)",
  selectionFg: "#1a2a32",
  overlay: "rgba(174, 186, 192, 0.92)",
  shotBgFilter: "grayscale(1) blur(3px) brightness(0.9)",
  frame: frameOf(CYAN_LIGHT),
};

/** MUI flattens `palette.hud` from both color schemes into these variables. */
const v = (token: keyof HudPalette) => `var(--mui-palette-hud-${token})`;

/**
 * Ergonomic accessor for the HUD tokens. Components use this instead of writing
 * `var(...)` by hand, so the variable names stay an implementation detail here.
 */
export const hud = {
  bg: v("bg"),
  surface: v("surface"),
  sunken: v("sunken"),
  panel: v("panel"),
  panelSolid: v("panelSolid"),
  cyan: v("cyan"),
  cyanDeep: v("cyanDeep"),
  ok: v("ok"),
  warn: v("warn"),
  text: v("text"),
  muted: v("muted"),
  dim: v("dim"),
  danger: v("danger"),
  glitch: v("glitch"),
  gridLine: v("gridLine"),
  scanInk: v("scanInk"),
  selectionBg: v("selectionBg"),
  selectionFg: v("selectionFg"),
  overlay: v("overlay"),
  shotBgFilter: v("shotBgFilter"),
  frame: v("frame"),
  // Backdrop blur is the same in both schemes, so it needs no variable.
  blurSurface: "blur(3px)",
  blurChrome: "blur(4px)",
  headerH: 40,
  max: 1240,
  grid: 20,
  display: "var(--font-oxanium), sans-serif",
  mono: "var(--font-jetbrains), monospace",
} as const;
