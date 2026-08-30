import { createTheme } from "@mui/material/styles";
import { hud, hudDark, hudLight } from "./hud";

const theme = createTheme({
  cssVariables: {
    colorSchemeSelector: "class",
  },
  colorSchemes: {
    light: {
      palette: {
        primary: { main: hudLight.cyan },
        success: { main: hudLight.ok },
        error: { main: hudLight.danger },
        background: { default: hudLight.bg, paper: hudLight.panelSolid },
        text: {
          primary: hudLight.text,
          secondary: hudLight.muted,
          disabled: hudLight.dim,
        },
        divider: hudLight.cyan,
      },
    },
    dark: {
      palette: {
        primary: { main: hudDark.cyan },
        success: { main: hudDark.ok },
        error: { main: hudDark.danger },
        background: { default: hudDark.bg, paper: hudDark.panelSolid },
        text: {
          primary: hudDark.text,
          secondary: hudDark.muted,
          disabled: hudDark.dim,
        },
        divider: hudDark.cyan,
      },
    },
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
        root: {
          minWidth: 0,
          borderRadius: 0,
          boxShadow: "none",
          "&:hover": { boxShadow: "none" },
        },
      },
    },
    MuiInputBase: {
      styleOverrides: { root: { fontFamily: hud.mono, borderRadius: 0 } },
    },
    MuiPaper: {
      styleOverrides: {
        root: { backgroundImage: "none", backgroundColor: hud.panelSolid },
      },
    },
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundColor: "var(--hud-bg)",
          color: "var(--hud-text)",
        },
      },
    },
  },
});

export default theme;
