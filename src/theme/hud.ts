export type HudPalette = {
  bg: string;
  surface: string;
  sunken: string;
  panel: string;
  panelSolid: string;
  cyan: string;
  cyanDeep: string;
  ok: string;
  text: string;
  muted: string;
  dim: string;
  danger: string;
  gridLine: string;
  scanInk: string;
  selectionBg: string;
  selectionFg: string;
  overlay: string;
  shotBgFilter: string;
};

export const hudDark: HudPalette = {
  bg: "#0a0a0c",
  surface: "rgba(21, 38, 44, 0.45)",
  sunken: "rgba(0, 0, 0, 0.15)",
  panel: "rgba(10, 10, 12, 0.8)",
  panelSolid: "#0a0a0c",
  cyan: "#00f2ff",
  cyanDeep: "#007a82",
  ok: "#00ff41",
  text: "#d7e4eb",
  muted: "#9eb2be",
  dim: "#68808d",
  danger: "#ff6d8d",
  gridLine: "#ffffff08",
  scanInk: "#ffffff",
  selectionBg: "rgba(0, 242, 255, 0.28)",
  selectionFg: "#edffff",
  overlay: "rgba(10, 10, 12, 0.92)",
  shotBgFilter: "grayscale(1) blur(3px) brightness(0.22)",
};

export const hudLight: HudPalette = {
  bg: "#eef3f5",
  surface: "rgba(255, 255, 255, 0.45)",
  sunken: "rgba(26, 42, 50, 0.06)",
  panel: "rgba(255, 255, 255, 0.82)",
  panelSolid: "#f7fbfc",
  cyan: "#007a8a",
  cyanDeep: "#005760",
  ok: "#128a3e",
  text: "#1a2a32",
  muted: "#4a6570",
  dim: "#6a8490",
  danger: "#c43d5a",
  gridLine: "#1a2a3214",
  scanInk: "#1a2a32",
  selectionBg: "rgba(0, 122, 138, 0.22)",
  selectionFg: "#1a2a32",
  overlay: "rgba(238, 243, 245, 0.92)",
  shotBgFilter: "grayscale(1) blur(3px) brightness(0.82)",
};

function paletteVars(p: HudPalette): string {
  return `
    --hud-bg: ${p.bg};
    --hud-surface: ${p.surface};
    --hud-sunken: ${p.sunken};
    --hud-panel: ${p.panel};
    --hud-panel-solid: ${p.panelSolid};
    --hud-cyan: ${p.cyan};
    --hud-cyan-deep: ${p.cyanDeep};
    --hud-ok: ${p.ok};
    --hud-text: ${p.text};
    --hud-muted: ${p.muted};
    --hud-dim: ${p.dim};
    --hud-danger: ${p.danger};
    --hud-grid-line: ${p.gridLine};
    --hud-scan-ink: ${p.scanInk};
    --hud-selection-bg: ${p.selectionBg};
    --hud-selection-fg: ${p.selectionFg};
    --hud-overlay: ${p.overlay};
    --hud-shot-bg-filter: ${p.shotBgFilter};
    --hud-frame: color-mix(in srgb, ${p.cyan} 50%, transparent);
  `;
}

/** Injected once on `:root` so styled HUD chrome follows `html.light` / `html.dark`. */
export function hudRootCss(): string {
  return `
    :root, html.dark {
      ${paletteVars(hudDark)}
      color-scheme: dark;
    }
    html.light {
      ${paletteVars(hudLight)}
      color-scheme: light;
    }
  `;
}

export const hud = {
  bg: "var(--hud-bg)",
  surface: "var(--hud-surface)",
  sunken: "var(--hud-sunken)",
  panel: "var(--hud-panel)",
  panelSolid: "var(--hud-panel-solid)",
  cyan: "var(--hud-cyan)",
  ok: "var(--hud-ok)",
  text: "var(--hud-text)",
  muted: "var(--hud-muted)",
  dim: "var(--hud-dim)",
  danger: "var(--hud-danger)",
  headerH: 40,
  max: 1240,
  grid: 20,
  display: "var(--font-oxanium), sans-serif",
  mono: "var(--font-jetbrains), monospace",
} as const;
