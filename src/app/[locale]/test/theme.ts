import { createTheme } from "@mui/material/styles";

export const hud = {
  bg: "#0a0a0c",
  panel: "rgba(14, 16, 22, 0.62)",
  panel2: "rgba(17, 20, 29, 0.66)",
  line: "rgba(0, 242, 255, 0.25)",
  lineStrong: "rgba(0, 242, 255, 0.8)",
  cyan: "#00f2ff",
  ok: "#00ff41",
  okSoft: "rgba(0, 255, 65, 0.17)",
  text: "#d7e4eb",
  muted: "#9eb2be",
  dim: "#68808d",
  danger: "#ff6d8d",
  headerH: 44,
  max: 1240,
  display: "var(--font-syne), var(--font-geist-sans), sans-serif",
  mono: "var(--font-jetbrains), var(--font-geist-mono), monospace",
} as const;

export const catalogTheme = createTheme({
  palette: {
    mode: "dark",
    primary: { main: hud.cyan },
    success: { main: hud.ok },
    error: { main: hud.danger },
    background: { default: hud.bg, paper: hud.panel },
    text: { primary: hud.text, secondary: hud.muted, disabled: hud.dim },
    divider: hud.line,
  },
  typography: {
    fontFamily: hud.mono,
    button: { textTransform: "uppercase", letterSpacing: "0.16em", fontWeight: 500 },
  },
  components: {
    MuiButtonBase: {
      defaultProps: { disableRipple: true },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          minWidth: 0,
          borderRadius: 0,
          boxShadow: "none",
          "&:hover": { boxShadow: "none" },
        },
      },
    },
    MuiInputBase: {
      styleOverrides: {
        root: { fontFamily: hud.mono },
      },
    },
  },
});
