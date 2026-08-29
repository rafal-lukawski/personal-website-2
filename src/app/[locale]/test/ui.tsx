"use client";

import type { ReactNode } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import IconButton from "@mui/material/IconButton";
import Link from "@mui/material/Link";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import GlobalStyles from "@mui/material/GlobalStyles";
import { ThemeProvider, keyframes, styled } from "@mui/material/styles";
import { Link as LocaleLink } from "@/i18n/routing";
import { catalogTheme, hud } from "./theme";

export function CatalogThemeProvider({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider theme={catalogTheme}>
      <GlobalStyles
        styles={`
          html:has([data-catalog="test"]) { color-scheme: dark; }
          html:has([data-catalog="test"]) body { background: ${hud.bg} !important; color: ${hud.text}; }
          html:has([data-catalog="test"]) footer { display: none !important; }
        `}
      />
      {children}
    </ThemeProvider>
  );
}

const pulse = keyframes`
  0% { box-shadow: 0 0 0 0 rgba(0, 255, 65, 0.58); }
  70% { box-shadow: 0 0 0 8px rgba(0, 255, 65, 0); }
  100% { box-shadow: 0 0 0 0 rgba(0, 255, 65, 0); }
`;

const scan = keyframes`
  0%, 100% { top: -12%; opacity: 0; }
  12% { opacity: 1; }
  88% { opacity: 1; }
  50% { top: 80%; }
`;

const sidebarScan = keyframes`
  0% { top: -90px; }
  100% { top: calc(100% + 90px); }
`;

const blink = keyframes`
  0%, 49% { opacity: 1; }
  50%, 100% { opacity: 0; }
`;

const drift = keyframes`
  0%, 100% { transform: translateY(0); opacity: 0.55; }
  50% { transform: translateY(7px); opacity: 0.8; }
`;

const glitch = keyframes`
  0%, 100% { transform: none; text-shadow: none; filter: none; }
  20% { transform: translate(1px, -1px); text-shadow: -2px 0 #00f2ff88, 2px 0 #ff268888; }
  40% { transform: translate(-1px, 1px); text-shadow: 2px 0 #00f2ff88, -2px 0 #7f00ff88; }
  60% { transform: translate(1px, 1px); text-shadow: -1px 0 #00f2ff88, 1px 0 #ff268888; }
  80% { transform: translate(-1px, -1px); text-shadow: 1px 0 #00f2ff88, -1px 0 #7f00ff88; }
`;

const reducedMotion = "@media (prefers-reduced-motion: reduce)";
const focusRing = {
  "&:focus-visible": {
    outline: `2px solid ${hud.cyan}`,
    outlineOffset: 2,
  },
} as const;

export const Root = styled(Box)({
  minHeight: "100vh",
  isolation: "isolate",
  color: hud.text,
  background: `radial-gradient(1200px 560px at 65% -8%, rgba(0, 242, 255, 0.08), transparent 58%), ${hud.bg}`,
  "&::before": {
    content: '""',
    position: "fixed",
    inset: 0,
    zIndex: 0,
    pointerEvents: "none",
    backgroundImage:
      "linear-gradient(#ffffff05 1px, transparent 1px), linear-gradient(90deg, #ffffff05 1px, transparent 1px)",
    backgroundSize: "20px 20px",
  },
  "& *": { boxSizing: "border-box" },
  "& ::selection": { background: "rgba(0, 242, 255, 0.28)", color: "#edffff" },
});

export const SkipLink = styled(Link)({
  position: "absolute",
  left: -999,
  top: 8,
  color: hud.cyan,
  textDecoration: "none",
  "&:focus": {
    left: 8,
    zIndex: 50,
    background: hud.panel,
    border: `1px solid ${hud.line}`,
    padding: "8px 12px",
    font: `500 12px/1 ${hud.mono}`,
    textTransform: "uppercase",
  },
});

export const TopBar = styled("header")({
  position: "sticky",
  top: 0,
  zIndex: 20,
  height: hud.headerH,
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  gap: 16,
  padding: "0 18px",
  borderBottom: `1px solid ${hud.line}`,
  background: "rgba(10, 10, 12, 0.76)",
  backdropFilter: "blur(12px)",
  font: `500 11px/1 ${hud.mono}`,
  letterSpacing: "0.14em",
  textTransform: "uppercase",
  color: hud.muted,
  "@media (max-width: 760px)": {
    padding: "0 12px",
    letterSpacing: "0.08em",
  },
});

export const BarLink = styled(LocaleLink)({
  color: hud.muted,
  textDecoration: "none",
  ...focusRing,
  "&:hover": { color: hud.cyan },
});

export const LangLink = styled(LocaleLink)({
  padding: "4px 6px",
  color: hud.dim,
  textDecoration: "none",
  ...focusRing,
  '&[aria-current="page"]': { color: hud.cyan },
});

export const Page = styled("main")({
  position: "relative",
  zIndex: 1,
  maxWidth: hud.max,
  margin: "0 auto",
  padding: "24px 18px 64px",
  "@media (max-width: 760px)": { padding: "20px 12px 54px" },
});

export const HudButton = styled(Button)({
  position: "relative",
  overflow: "hidden",
  isolation: "isolate",
  padding: "11px 20px",
  border: `1px solid ${hud.cyan}`,
  background: "transparent",
  color: hud.cyan,
  font: `500 12px/1 ${hud.mono}`,
  letterSpacing: "0.16em",
  ...focusRing,
  "&::before": {
    content: '""',
    position: "absolute",
    inset: 0,
    width: 0,
    background: "linear-gradient(90deg, rgba(0, 242, 255, 0.12), rgba(0, 242, 255, 0.78))",
    transition: "width 0.32s ease",
    zIndex: -1,
  },
  "&:hover": {
    background: "transparent",
    color: "#041015",
    "&::before": { width: "100%" },
  },
  "&.Mui-disabled": { opacity: 0.55, color: hud.cyan },
  '&[data-state="success"]': { borderColor: hud.ok, color: hud.ok },
  '&[data-state="error"]': { borderColor: hud.danger, color: hud.danger },
});

export const Glitch = styled("h1")({
  margin: 0,
  fontFamily: hud.display,
  fontSize: "clamp(2.1rem, 5.7vw, 3.9rem)",
  lineHeight: 0.94,
  letterSpacing: "-0.03em",
  color: hud.cyan,
  textShadow: "0 0 14px rgba(0, 242, 255, 0.22)",
  transition: "text-shadow 0.2s ease, filter 0.2s ease",
  "&:hover": { animation: `${glitch} 0.2s linear` },
  [reducedMotion]: { "&:hover": { animation: "none" } },
});

export const Panel = styled("section", {
  shouldForwardProp: (prop) => prop !== "scan",
})<{ scan?: boolean }>(({ scan }) => ({
  position: "relative",
  background: hud.panel,
  backdropFilter: "blur(12px)",
  scrollMarginTop: hud.headerH + 12,
  overflow: scan ? "hidden" : undefined,
  "&::before, &::after": {
    content: '""',
    position: "absolute",
    inset: 0,
    pointerEvents: "none",
  },
  "&::before": {
    background: [
      `linear-gradient(${hud.lineStrong}, ${hud.lineStrong}) left top / 22px 1px no-repeat`,
      `linear-gradient(${hud.lineStrong}, ${hud.lineStrong}) left top / 1px 22px no-repeat`,
      `linear-gradient(${hud.lineStrong}, ${hud.lineStrong}) right top / 22px 1px no-repeat`,
      `linear-gradient(${hud.lineStrong}, ${hud.lineStrong}) right top / 1px 22px no-repeat`,
      `linear-gradient(${hud.lineStrong}, ${hud.lineStrong}) left bottom / 22px 1px no-repeat`,
      `linear-gradient(${hud.lineStrong}, ${hud.lineStrong}) left bottom / 1px 22px no-repeat`,
      `linear-gradient(${hud.lineStrong}, ${hud.lineStrong}) right bottom / 22px 1px no-repeat`,
      `linear-gradient(${hud.lineStrong}, ${hud.lineStrong}) right bottom / 1px 22px no-repeat`,
    ].join(", "),
  },
  "&::after": scan
    ? {
        left: 0,
        right: 0,
        height: 80,
        border: "none",
        background: "linear-gradient(to bottom, transparent, rgba(0, 242, 255, 0.1), transparent)",
        animation: `${sidebarScan} 7.8s linear infinite`,
        [reducedMotion]: { animation: "none" },
      }
    : { border: "1px solid rgba(0, 242, 255, 0.08)" },
}));

export const PanelBar = styled(Stack)({
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "space-between",
  gap: 12,
  padding: "9px 12px",
  borderBottom: "1px solid rgba(0, 242, 255, 0.14)",
  font: `500 11px/1 ${hud.mono}`,
  letterSpacing: "0.13em",
  textTransform: "uppercase",
  color: hud.muted,
});

export const PanelBody = styled(Box)({
  padding: "16px 14px 18px",
});

export const SectionLabel = styled("h2")({
  margin: "0 0 12px",
  fontFamily: hud.mono,
  fontSize: "0.76rem",
  letterSpacing: "0.13em",
  textTransform: "uppercase",
  color: hud.cyan,
});

export const HudCard = styled("article")({
  position: "relative",
  padding: "13px 12px 14px",
  background: hud.panel2,
  border: "1px solid rgba(0, 242, 255, 0.1)",
  transition: "box-shadow 0.2s ease, border-color 0.2s ease, transform 0.2s ease",
  "&:hover": {
    borderColor: "rgba(0, 242, 255, 0.45)",
    boxShadow: "0 0 18px rgba(0, 242, 255, 0.14)",
    transform: "translateY(-1px)",
    animation: `${glitch} 0.2s linear`,
  },
  [reducedMotion]: { "&:hover": { animation: "none" } },
});

export const HudField = styled(TextField)({
  "& .MuiInputLabel-root": {
    color: hud.muted,
    font: `500 10.5px/1 ${hud.mono}`,
    letterSpacing: "0.12em",
    textTransform: "uppercase",
    transform: "none",
    position: "static",
    marginBottom: 6,
  },
  "& .MuiOutlinedInput-root": {
    borderRadius: 0,
    background: "rgba(9, 13, 18, 0.78)",
    font: `400 0.94rem/1.4 ${hud.mono}`,
    color: hud.text,
    "& fieldset": { borderColor: "rgba(0, 242, 255, 0.2)" },
    "&:hover fieldset": { borderColor: "rgba(0, 242, 255, 0.2)" },
    "&.Mui-focused fieldset": {
      borderColor: "rgba(0, 242, 255, 0.68)",
      borderWidth: 1,
      boxShadow: "0 0 0 1px rgba(0, 242, 255, 0.24)",
    },
  },
  "& .MuiOutlinedInput-input": { padding: "10px 12px" },
  "& .MuiInputBase-multiline": { padding: 0 },
});

export const Cursor = styled("span")({
  display: "inline-block",
  width: 8,
  height: "0.92em",
  marginLeft: 3,
  verticalAlign: "-0.08em",
  background: hud.ok,
  animation: `${blink} 0.95s steps(1) infinite`,
  [reducedMotion]: { animation: "none" },
});

export const Particles = styled("svg")({
  position: "absolute",
  inset: "10px 18% auto 0",
  height: "56%",
  pointerEvents: "none",
  opacity: 0.7,
  animation: `${drift} 18s ease-in-out infinite`,
  "& line": { stroke: "rgba(0, 242, 255, 0.23)", strokeWidth: 0.34 },
  "& circle": { fill: "rgba(0, 242, 255, 0.9)" },
  [reducedMotion]: { animation: "none" },
  "@media (max-width: 760px)": { inset: "0 0 auto 0", height: "45%" },
});

export const ScanLine = styled(Box)({
  position: "absolute",
  left: 0,
  right: 0,
  height: "28%",
  zIndex: 2,
  background: "linear-gradient(to bottom, transparent, rgba(0, 242, 255, 0.2), transparent)",
  animation: `${scan} 5.6s ease-in-out infinite`,
  [reducedMotion]: { animation: "none" },
});

export const ShotButton = styled("button")({
  position: "relative",
  width: "100%",
  padding: 0,
  border: "1px solid rgba(0, 242, 255, 0.25)",
  background: "#070a10",
  overflow: "hidden",
  cursor: "pointer",
  color: "inherit",
  ...focusRing,
  "&::before": {
    content: '""',
    position: "absolute",
    inset: 0,
    zIndex: 2,
    pointerEvents: "none",
    background:
      "repeating-linear-gradient(to bottom, rgba(255,255,255,0.02) 0, rgba(255,255,255,0.02) 1px, transparent 1px, transparent 4px)",
  },
  "& img": {
    width: "100%",
    height: "auto",
    aspectRatio: "16 / 10",
    objectFit: "cover",
    objectPosition: "top",
    filter: "saturate(0.86) contrast(1.04)",
    transition: "transform 0.24s ease, filter 0.24s ease",
  },
  "&:hover img": { transform: "scale(1.02)", filter: "saturate(1) contrast(1.08)" },
  "&:hover": { animation: `${glitch} 0.2s linear` },
  [reducedMotion]: { "&:hover": { animation: "none" } },
});

export const GalleryChip = styled("button")({
  display: "inline-flex",
  alignItems: "center",
  gap: 6,
  border: "1px solid rgba(0, 242, 255, 0.26)",
  background: "rgba(0, 242, 255, 0.08)",
  color: hud.cyan,
  textTransform: "uppercase",
  letterSpacing: "0.09em",
  font: `600 9.5px/1 ${hud.mono}`,
  padding: "4px 6px",
  cursor: "pointer",
  ...focusRing,
  "& span": { color: "#041015", background: "rgba(0, 242, 255, 0.82)", padding: "2px 4px" },
  "&:hover": { borderColor: "rgba(0, 242, 255, 0.58)" },
});

export const LightboxDialog = styled(Dialog)({
  "& .MuiBackdrop-root": { background: "rgba(5, 8, 11, 0.9)" },
  "& .MuiDialog-container": { alignItems: "center" },
  "& .MuiPaper-root": {
    background: "transparent",
    boxShadow: "none",
    overflow: "visible",
    maxWidth: "min(1080px, calc(100% - 40px))",
    margin: 20,
  },
});

export const NavFab = styled(IconButton)({
  position: "absolute",
  width: 38,
  height: 38,
  borderRadius: 0,
  border: "1px solid rgba(0, 242, 255, 0.25)",
  background: "rgba(8, 12, 16, 0.8)",
  color: hud.text,
  ...focusRing,
  "&:hover": { borderColor: hud.cyan, color: hud.cyan, background: "rgba(8, 12, 16, 0.8)" },
});

export function CornerTicks() {
  const arm = {
    position: "absolute" as const,
    width: 18,
    height: 18,
    borderStyle: "solid",
    borderColor: hud.cyan,
    zIndex: 3,
    pointerEvents: "none" as const,
  };
  return (
    <>
      <Box sx={{ ...arm, top: 0, left: 0, borderWidth: "2px 0 0 2px" }} />
      <Box sx={{ ...arm, top: 0, right: 0, borderWidth: "2px 2px 0 0" }} />
      <Box sx={{ ...arm, bottom: 0, left: 0, borderWidth: "0 0 2px 2px" }} />
      <Box sx={{ ...arm, bottom: 0, right: 0, borderWidth: "0 2px 2px 0" }} />
    </>
  );
}

export function ProcessDots() {
  return (
    <Stack direction="row" spacing="6px" aria-hidden>
      {["#ff6666", "#ffd24d", "#63e58d"].map((color) => (
        <Box key={color} sx={{ width: 8, height: 8, borderRadius: "50%", bgcolor: color }} />
      ))}
    </Stack>
  );
}

export function StatusBadge({ children }: { children: ReactNode }) {
  return (
    <Box
      component="span"
      sx={{
        display: "inline-flex",
        alignItems: "center",
        gap: 1,
        px: "11px",
        py: "4px",
        pl: "9px",
        borderRadius: 999,
        border: `1px solid ${hud.ok}`,
        bgcolor: hud.okSoft,
        color: hud.ok,
        textTransform: "uppercase",
        letterSpacing: "0.16em",
        fontSize: 10,
      }}
    >
      <Box
        component="span"
        sx={{
          width: 6,
          height: 6,
          borderRadius: "50%",
          bgcolor: hud.ok,
          animation: `${pulse} 2.2s ease-out infinite`,
          [reducedMotion]: { animation: "none" },
        }}
      />
      {children}
    </Box>
  );
}
