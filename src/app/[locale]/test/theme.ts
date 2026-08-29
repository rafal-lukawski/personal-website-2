import { createTheme } from "@mui/material/styles";

export const hud = {
  bg: "#0a0a0c",
  // Three levels: the page, a module lifted off it, and a sub-module recessed
  // back into that module. Depth reads from tone alone, without any borders.
  surface: "rgba(21, 38, 44, 0.26)",
  sunken: "rgba(0, 0, 0, 0.22)",
  panel: "rgba(10, 10, 12, 0.8)",
  panelSolid: "#0a0a0c",
  cyan: "#00f2ff",
  ok: "#00ff41",
  text: "#d7e4eb",
  muted: "#9eb2be",
  dim: "#68808d",
  danger: "#ff6d8d",
  headerH: 40,
  max: 1240,
  grid: 20,
  display: "var(--font-syne), var(--font-geist-sans), sans-serif",
  mono: "var(--font-jetbrains), var(--font-geist-mono), monospace",
} as const;

export const catalogTheme = createTheme({
  palette: {
    mode: "dark",
    primary: { main: hud.cyan },
    success: { main: hud.ok },
    error: { main: hud.danger },
    background: { default: hud.bg, paper: hud.panelSolid },
    text: { primary: hud.text, secondary: hud.muted, disabled: hud.dim },
    divider: "transparent",
  },
  typography: {
    fontFamily: hud.mono,
    button: { textTransform: "uppercase", letterSpacing: "0.1em", fontWeight: 500 },
  },
  shape: { borderRadius: 0 },
  components: {
    MuiButtonBase: { defaultProps: { disableRipple: true } },
    MuiButton: {
      styleOverrides: {
        root: { minWidth: 0, borderRadius: 0, boxShadow: "none", "&:hover": { boxShadow: "none" } },
      },
    },
    MuiInputBase: {
      styleOverrides: { root: { fontFamily: hud.mono, borderRadius: 0 } },
    },
    MuiPaper: {
      styleOverrides: { root: { backgroundImage: "none", backgroundColor: hud.panelSolid } },
    },
  },
});
