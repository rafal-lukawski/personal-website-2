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

const cyan = hud.cyan;

function cornerFill(size = 20) {
  const c = cyan;
  return [
    `linear-gradient(${c}, ${c}) left top / ${size}px 2px no-repeat`,
    `linear-gradient(${c}, ${c}) left top / 2px ${size}px no-repeat`,
    `linear-gradient(${c}, ${c}) right top / ${size}px 2px no-repeat`,
    `linear-gradient(${c}, ${c}) right top / 2px ${size}px no-repeat`,
    `linear-gradient(${c}, ${c}) left bottom / ${size}px 2px no-repeat`,
    `linear-gradient(${c}, ${c}) left bottom / 2px ${size}px no-repeat`,
    `linear-gradient(${c}, ${c}) right bottom / ${size}px 2px no-repeat`,
    `linear-gradient(${c}, ${c}) right bottom / 2px ${size}px no-repeat`,
  ].join(", ");
}

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
  0%, 100% { transform: none; filter: none; }
  20% { transform: translate(1px, -1px); filter: hue-rotate(-8deg); }
  40% { transform: translate(-1px, 1px); filter: hue-rotate(8deg); }
  60% { transform: translate(1px, 1px); }
  80% { transform: translate(-1px, -1px); }
`;

const reducedMotion = "@media (prefers-reduced-motion: reduce)";
const focusRing = {
  "&:focus-visible": {
    outline: `2px solid ${cyan}`,
    outlineOffset: 2,
  },
} as const;

export const Root = styled(Box)({
  minHeight: "100vh",
  isolation: "isolate",
  color: hud.text,
  background: hud.bg,
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
  "&::after": {
    content: '""',
    position: "fixed",
    inset: 0,
    zIndex: 30,
    pointerEvents: "none",
    backgroundImage: "repeating-linear-gradient(to bottom, rgba(255,255,255,0.05) 0, rgba(255,255,255,0.05) 1px, transparent 1px, transparent 3px)",
  },
  "& *": { boxSizing: "border-box" },
  "& ::selection": { background: "rgba(0, 242, 255, 0.28)", color: "#edffff" },
});

export const SkipLink = styled(Link)({
  position: "absolute",
  left: -999,
  top: 8,
  color: cyan,
  textDecoration: "none",
  "&:focus": {
    left: 8,
    zIndex: 50,
    background: hud.panel,
    backdropFilter: "blur(12px)",
    padding: "8px 12px",
    font: `500 12px/1 ${hud.mono}`,
    textTransform: "uppercase",
    letterSpacing: "0.1em",
  },
});

export const TopBar = styled("header")({
  position: "sticky",
  top: 0,
  zIndex: 20,
  isolation: "isolate",
  height: hud.headerH,
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  gap: 20,
  padding: "0 20px",
  background: hud.panel,
  backdropFilter: "blur(12px)",
  font: `500 11px/1 ${hud.mono}`,
  letterSpacing: "0.1em",
  textTransform: "uppercase",
  color: hud.muted,
  "&::after": {
    content: '""',
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    height: 1,
    background: `linear-gradient(90deg, transparent, ${cyan}, transparent)`,
    pointerEvents: "none",
  },
  "@media (max-width: 760px)": { padding: "0 20px" },
});

export const BarLink = styled(LocaleLink)({
  color: hud.muted,
  textDecoration: "none",
  ...focusRing,
  "&:hover": { color: cyan },
});

export const LangLink = styled(LocaleLink)({
  padding: "4px 6px",
  color: hud.dim,
  textDecoration: "none",
  ...focusRing,
  '&[aria-current="page"]': { color: cyan, textShadow: `0 0 8px ${cyan}` },
});

export const Page = styled("main")({
  position: "relative",
  zIndex: 1,
  maxWidth: hud.max,
  margin: "0 auto",
  padding: "20px 20px 60px",
});

export const HudButton = styled(Button)({
  position: "relative",
  overflow: "hidden",
  isolation: "isolate",
  padding: "10px 20px",
  border: 0,
  background: hud.panel,
  backdropFilter: "blur(12px)",
  color: cyan,
  font: `500 12px/1 ${hud.mono}`,
  letterSpacing: "0.1em",
  ...focusRing,
  "&::after": {
    content: '""',
    position: "absolute",
    inset: 0,
    pointerEvents: "none",
    background: cornerFill(12),
  },
  "&:hover": {
    background: "rgba(0, 242, 255, 0.08)",
    color: cyan,
    textShadow: `0 0 8px ${cyan}`,
  },
  "&.Mui-disabled": { opacity: 0.55, color: cyan },
  '&[data-state="success"]': { color: hud.ok },
  '&[data-state="error"]': { color: hud.danger },
});

export const Glitch = styled("h1")({
  margin: 0,
  fontFamily: hud.display,
  fontSize: "clamp(2.1rem, 5.7vw, 3.9rem)",
  lineHeight: 0.94,
  letterSpacing: "-0.03em",
  color: cyan,
  textShadow: `0 0 10px ${cyan}`,
  "&:hover": { animation: `${glitch} 0.2s linear` },
  [reducedMotion]: { "&:hover": { animation: "none" } },
});

export const Panel = styled("section", {
  shouldForwardProp: (prop) => prop !== "scan",
})<{ scan?: boolean }>(({ scan }) => ({
  position: "relative",
  background: hud.panel,
  backdropFilter: "blur(12px)",
  scrollMarginTop: hud.headerH + 20,
  overflow: scan ? "hidden" : undefined,
  "&::before": {
    content: '""',
    position: "absolute",
    inset: 0,
    pointerEvents: "none",
    background: cornerFill(20),
    zIndex: 1,
  },
  ...(scan
    ? {
        "&::after": {
          content: '""',
          position: "absolute",
          left: 0,
          right: 0,
          height: 80,
          background: "linear-gradient(to bottom, transparent, rgba(0, 242, 255, 0.12), transparent)",
          animation: `${sidebarScan} 7.8s linear infinite`,
          pointerEvents: "none",
          [reducedMotion]: { animation: "none" },
        },
      }
    : {}),
}));

export const PanelBar = styled(Stack)({
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "space-between",
  gap: 12,
  padding: "10px 20px",
  font: `500 11px/1 ${hud.mono}`,
  letterSpacing: "0.1em",
  textTransform: "uppercase",
  color: hud.muted,
  background: "linear-gradient(90deg, rgba(0, 242, 255, 0.08), transparent 55%)",
});

export const PanelBody = styled(Box)({
  padding: "20px",
});

export const SectionLabel = styled("h2")({
  margin: "0 0 20px",
  fontFamily: hud.mono,
  fontSize: "0.76rem",
  letterSpacing: "0.1em",
  textTransform: "uppercase",
  color: cyan,
});

export const HudCard = styled("article")({
  position: "relative",
  padding: "16px 16px 16px",
  background: hud.panel,
  backdropFilter: "blur(12px)",
  "&::before": {
    content: '""',
    position: "absolute",
    inset: 0,
    pointerEvents: "none",
    background: cornerFill(12),
  },
  "&:hover": { animation: `${glitch} 0.2s linear` },
  [reducedMotion]: { "&:hover": { animation: "none" } },
});

export const HudField = styled(TextField)({
  "& .MuiFormLabel-asterisk": { display: "none" },
  "& .MuiInputLabel-root": {
    color: hud.muted,
    font: `500 10.5px/1 ${hud.mono}`,
    letterSpacing: "0.1em",
    textTransform: "uppercase",
    transform: "none",
    position: "static",
    marginBottom: 8,
  },
  "& .MuiOutlinedInput-root": {
    borderRadius: 0,
    background: hud.panelSolid,
    font: `400 0.94rem/1.4 ${hud.mono}`,
    color: hud.text,
    "& fieldset": { border: "none" },
    "&:hover fieldset": { border: "none" },
    "&.Mui-focused fieldset": { border: "none" },
    "&::after": {
      content: '""',
      position: "absolute",
      inset: 0,
      pointerEvents: "none",
      background: cornerFill(10),
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
  inset: "20px 20% auto 0",
  height: "56%",
  pointerEvents: "none",
  opacity: 0.7,
  animation: `${drift} 18s ease-in-out infinite`,
  zIndex: 0,
  "& line": { stroke: "rgba(0, 242, 255, 0.23)", strokeWidth: 0.34 },
  "& circle": { fill: cyan },
  [reducedMotion]: { animation: "none" },
  "@media (max-width: 760px)": { inset: "0 0 auto 0", height: "45%" },
});

export const ShotButton = styled("button")({
  position: "relative",
  width: "100%",
  padding: 0,
  border: 0,
  background: hud.panelSolid,
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
    backgroundImage:
      "repeating-linear-gradient(to bottom, rgba(255,255,255,0.05) 0, rgba(255,255,255,0.05) 1px, transparent 1px, transparent 3px)",
  },
  "&::after": {
    content: '""',
    position: "absolute",
    inset: 0,
    zIndex: 3,
    pointerEvents: "none",
    background: cornerFill(16),
  },
  "& img": {
    width: "100%",
    height: "auto",
    aspectRatio: "16 / 10",
    objectFit: "cover",
    objectPosition: "top",
    filter: "saturate(0.86) contrast(1.04)",
  },
  "&:hover": { animation: `${glitch} 0.22s linear` },
  "&:hover img": { filter: "saturate(1.05) contrast(1.12)" },
  [reducedMotion]: { "&:hover": { animation: "none" } },
});

export const HudLink = styled(Link)({
  display: "flex",
  alignItems: "center",
  gap: 10,
  padding: "10px 12px",
  color: "inherit",
  textDecoration: "none",
  position: "relative",
  ...focusRing,
  "& svg": { color: cyan },
  "&:hover": { color: cyan },
  "&::after": {
    content: '""',
    position: "absolute",
    inset: 0,
    pointerEvents: "none",
    background: cornerFill(10),
  },
});

export const ShotThumb = styled("button")({
  position: "relative",
  border: 0,
  padding: 0,
  background: hud.panelSolid,
  cursor: "pointer",
  opacity: 0.55,
  ...focusRing,
  "&::after": {
    content: '""',
    position: "absolute",
    inset: 0,
    pointerEvents: "none",
    background: cornerFill(8),
  },
  '&[data-active="true"]': { opacity: 1 },
  "& img": { display: "block", width: 96, height: 60, objectFit: "cover" },
});

export const GalleryChip = styled("button")({
  display: "inline-flex",
  alignItems: "center",
  gap: 6,
  border: 0,
  background: hud.panel,
  backdropFilter: "blur(12px)",
  color: cyan,
  textTransform: "uppercase",
  letterSpacing: "0.1em",
  font: `600 9.5px/1 ${hud.mono}`,
  padding: "6px 8px",
  cursor: "pointer",
  position: "relative",
  ...focusRing,
  "&::after": {
    content: '""',
    position: "absolute",
    inset: 0,
    pointerEvents: "none",
    background: cornerFill(8),
  },
  "& span": { color: cyan, padding: "0 0 0 4px" },
});

export const LightboxDialog = styled(Dialog)({
  "& .MuiBackdrop-root": { background: "rgba(10, 10, 12, 0.92)", backdropFilter: "blur(12px)" },
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
  width: 40,
  height: 40,
  borderRadius: 0,
  border: 0,
  background: hud.panel,
  backdropFilter: "blur(12px)",
  color: hud.text,
  ...focusRing,
  "&::after": {
    content: '""',
    position: "absolute",
    inset: 0,
    pointerEvents: "none",
    background: cornerFill(10),
  },
  "&:hover": { color: cyan, background: hud.panel },
});

export function CornerTicks({ size = 18 }: { size?: number }) {
  const arm = {
    position: "absolute" as const,
    width: size,
    height: size,
    borderStyle: "solid",
    borderColor: cyan,
    zIndex: 4,
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
        px: "12px",
        py: "4px",
        background: hud.panel,
        backdropFilter: "blur(12px)",
        color: hud.ok,
        textTransform: "uppercase",
        letterSpacing: "0.1em",
        fontSize: 10,
        fontFamily: hud.mono,
        position: "relative",
        "&::after": {
          content: '""',
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          background: [
            `linear-gradient(${hud.ok}, ${hud.ok}) left top / 10px 1px no-repeat`,
            `linear-gradient(${hud.ok}, ${hud.ok}) left top / 1px 10px no-repeat`,
            `linear-gradient(${hud.ok}, ${hud.ok}) right top / 10px 1px no-repeat`,
            `linear-gradient(${hud.ok}, ${hud.ok}) right top / 1px 10px no-repeat`,
            `linear-gradient(${hud.ok}, ${hud.ok}) left bottom / 10px 1px no-repeat`,
            `linear-gradient(${hud.ok}, ${hud.ok}) left bottom / 1px 10px no-repeat`,
            `linear-gradient(${hud.ok}, ${hud.ok}) right bottom / 10px 1px no-repeat`,
            `linear-gradient(${hud.ok}, ${hud.ok}) right bottom / 1px 10px no-repeat`,
          ].join(", "),
        },
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

const stampSx = {
  position: "absolute" as const,
  zIndex: 4,
  font: `600 9.5px/1 ${hud.mono}`,
  letterSpacing: "0.1em",
  color: cyan,
  textShadow: `0 0 8px ${cyan}`,
  textTransform: "uppercase" as const,
  pointerEvents: "none" as const,
};

export function ShotMeta({
  stamp,
  index,
}: {
  stamp: string;
  index: string;
}) {
  return (
    <>
      <Box component="span" sx={{ ...stampSx, top: 8, left: 8 }}>
        STATUS: DEPLOYED
      </Box>
      <Box component="span" sx={{ ...stampSx, left: 8, bottom: 8 }}>
        {stamp}
      </Box>
      <Box component="span" sx={{ ...stampSx, right: 8, bottom: 8 }}>
        {index}
      </Box>
    </>
  );
}
