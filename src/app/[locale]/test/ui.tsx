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
import { channels, tintFilterId } from "./techIcons";

const cyan = hud.cyan;

// Frame arms are chrome, not content: a hairline at ~50% cyan at rest, brought
// up to full only where an element is hovered or focused.
const frame = `${cyan}80`;
const frameBright = cyan;

export const scanlines = (alpha = 0.05, gap = 3) =>
  `repeating-linear-gradient(to bottom, rgba(255,255,255,${alpha}) 0, rgba(255,255,255,${alpha}) 1px, transparent 1px, transparent ${gap}px)`;

// Neon glow replaces every box-shadow in the system.
export const glow = (c: string = cyan, strength = 1) =>
  `0 0 ${10 * strength}px ${c}59, 0 0 ${28 * strength}px ${c}26`;

function cornerFill(size = 18, c: string = frame, weight = 1) {
  return [
    `linear-gradient(${c}, ${c}) left top / ${size}px ${weight}px no-repeat`,
    `linear-gradient(${c}, ${c}) left top / ${weight}px ${size}px no-repeat`,
    `linear-gradient(${c}, ${c}) right bottom / ${size}px ${weight}px no-repeat`,
    `linear-gradient(${c}, ${c}) right bottom / ${weight}px ${size}px no-repeat`,
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

// RGB split: a red ghost to one side, a cyan ghost to the other.
const glitch = keyframes`
  0%, 100% { transform: none; filter: none; }
  20% {
    transform: translate(1px, -1px);
    filter: drop-shadow(-2px 0 rgba(255, 0, 72, 0.7)) drop-shadow(2px 0 rgba(0, 242, 255, 0.7));
  }
  45% {
    transform: translate(-1px, 1px);
    filter: drop-shadow(2px 0 rgba(255, 0, 72, 0.7)) drop-shadow(-2px 0 rgba(0, 242, 255, 0.7));
  }
  70% {
    transform: translate(1px, 1px);
    filter: drop-shadow(-1px 0 rgba(255, 0, 72, 0.5)) drop-shadow(1px 0 rgba(0, 242, 255, 0.5));
  }
`;

// Reticle arms breathe so the targeting frame never reads as a static border.
const reticle = keyframes`
  0%, 100% { opacity: 0.62; transform: scale(0.98); }
  50% { opacity: 1; transform: scale(1); }
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
      "linear-gradient(#ffffff08 1px, transparent 1px), linear-gradient(90deg, #ffffff08 1px, transparent 1px)",
    backgroundSize: "20px 20px",
  },
  "&::after": {
    content: '""',
    position: "fixed",
    inset: 0,
    zIndex: 30,
    pointerEvents: "none",
    backgroundImage: scanlines(0.04),
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
    background: `linear-gradient(90deg, transparent, ${frame}, transparent)`,
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
  "&:hover::after": { background: cornerFill(12, frameBright) },
  "&:hover": {
    background: "rgba(0, 242, 255, 0.08)",
    color: cyan,
    textShadow: `0 0 8px ${cyan}`,
    boxShadow: glow(cyan),
    animation: `${glitch} 0.22s linear`,
  },
  [reducedMotion]: { "&:hover": { animation: "none" } },
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
  background: hud.surface,
  backdropFilter: "blur(12px)",
  scrollMarginTop: hud.headerH + 20,
  overflow: scan ? "hidden" : undefined,
  "&::before": {
    content: '""',
    position: "absolute",
    inset: 0,
    pointerEvents: "none",
    background: cornerFill(18),
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
  letterSpacing: "0.15em",
  textTransform: "uppercase",
  color: cyan,
  background: "linear-gradient(90deg, rgba(0, 242, 255, 0.08), transparent 55%)",
  "&::after": {
    content: '""',
    position: "absolute",
    left: 20,
    right: 20,
    bottom: 0,
    height: 1,
    background: `linear-gradient(90deg, ${cyan}59, transparent)`,
  },
  position: "relative",
});

export const PanelBody = styled(Box)({
  padding: "20px 20px 26px",
});

export const SectionLabel = styled("h2")({
  margin: "0 0 20px",
  fontFamily: hud.mono,
  fontSize: "0.76rem",
  letterSpacing: "0.15em",
  textTransform: "uppercase",
  color: cyan,
  textShadow: `0 0 8px ${cyan}40`,
});

export const HudCard = styled("article")({
  position: "relative",
  padding: "16px 16px 16px",
  background: hud.sunken,
  backdropFilter: "blur(12px)",
  "&::before": {
    content: '""',
    position: "absolute",
    inset: 0,
    pointerEvents: "none",
    background: cornerFill(12),
  },
  "&:hover::before": { background: cornerFill(12, frameBright) },
  "&:hover": { animation: `${glitch} 0.2s linear`, boxShadow: glow(cyan, 0.8) },
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
    "&.Mui-focused::after": { background: cornerFill(10, frameBright) },
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
    backgroundImage: scanlines(0.12),
  },
  "&::after": {
    content: '""',
    position: "absolute",
    inset: 0,
    zIndex: 3,
    pointerEvents: "none",
    background: cornerFill(18),
  },
  "& img": {
    width: "100%",
    height: "auto",
    aspectRatio: "16 / 10",
    objectFit: "cover",
    objectPosition: "top",
    filter: "saturate(0.86) contrast(1.04)",
  },
  "&:hover::after": { background: cornerFill(18, frameBright) },
  "&:hover": { animation: `${glitch} 0.22s linear`, boxShadow: glow(cyan, 0.9) },
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
  "&:hover::after": { background: cornerFill(10, frameBright) },
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
  '&[data-active="true"]::after': { background: cornerFill(8, frameBright) },
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
  "&:hover::after": { background: cornerFill(8, frameBright) },
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
  "&:hover::after": { background: cornerFill(10, frameBright) },
  "&:hover": { color: cyan, background: hud.panel },
});

/**
 * The single corner-bracket primitive. Panels, cards, buttons and fields all
 * render the exact same L-arms via `cornerFill`, so the geometry never drifts.
 * Only the top-left / bottom-right pair is drawn, so a frame implies its box
 * along one diagonal instead of closing it on all four corners.
 */
export function CornerTicks({
  size = 18,
  color = frame,
  animated = false,
}: {
  size?: number;
  color?: string;
  animated?: boolean;
}) {
  return (
    <Box
      aria-hidden
      sx={{
        position: "absolute",
        inset: 0,
        zIndex: 4,
        pointerEvents: "none",
        background: cornerFill(size, color),
        ...(animated
          ? { animation: `${reticle} 2.6s ease-in-out infinite`, [reducedMotion]: { animation: "none" } }
          : {}),
      }}
    />
  );
}

/**
 * Micro-telemetry pinned to a module's bottom corners. It lives in the gutter
 * `PanelBody` reserves, so it reads as frame chrome and never overlaps content.
 */
export function PanelStamps({ left, right }: { left?: string; right?: string }) {
  const base = {
    position: "absolute" as const,
    bottom: 6,
    zIndex: 4,
    font: `500 8px/1 ${hud.mono}`,
    letterSpacing: "0.15em",
    textTransform: "uppercase" as const,
    color: hud.dim,
    pointerEvents: "none" as const,
    whiteSpace: "nowrap" as const,
  };
  return (
    <Box aria-hidden>
      {left && <Box component="span" sx={{ ...base, left: 26 }}>{left}</Box>}
      {right && <Box component="span" sx={{ ...base, right: 26 }}>{right}</Box>}
    </Box>
  );
}

/**
 * Emoji glyphs ignore `color`, so the pictographic ones are re-coloured with a
 * luminance ramp instead: each pixel keeps its own shading but is mapped onto
 * that row's tint, which keeps the icon's base hue while bringing it into the
 * console's cyan family alongside the vector icons.
 */
export function EmojiTintFilters({ colors }: { colors: string[] }) {
  // Emoji sit mid-luminance, so lift the ramp to reach the full tint.
  const gain = 1.55;
  const lum = [0.2126, 0.7152, 0.0722];
  return (
    <svg aria-hidden width={0} height={0} style={{ position: "absolute" }} focusable="false">
      <defs>
        {colors.map((color) => {
          const row = (level: number) => lum.map((l) => l * gain * level).join(" ") + " 0 0";
          const [r, g, b] = channels(color).map((v) => v / 255);
          return (
            <filter key={color} id={tintFilterId(color)} colorInterpolationFilters="sRGB">
              <feColorMatrix
                type="matrix"
                values={`${row(r)} ${row(g)} ${row(b)} 0 0 0 1 0`}
              />
            </filter>
          );
        })}
      </defs>
    </svg>
  );
}

/** Process/telemetry code shown inside a module header bar, beside the dots. */
export const BarMeta = styled("span")({
  font: `500 9px/1 ${hud.mono}`,
  letterSpacing: "0.15em",
  textTransform: "uppercase",
  color: hud.dim,
  whiteSpace: "nowrap",
  "@media (max-width: 640px)": { display: "none" },
});

export function ProcessDots() {
  const dots = [hud.danger, "#ffd24d", hud.ok];
  return (
    <Stack direction="row" spacing="6px" aria-hidden>
      {dots.map((color, idx) => (
        <Box
          key={color}
          sx={{
            width: 8,
            height: 8,
            borderRadius: "50%",
            bgcolor: color,
            // only the live "online" light glows
            boxShadow: idx === dots.length - 1 ? glow(hud.ok, 0.5) : "none",
          }}
        />
      ))}
    </Stack>
  );
}

export function StatusBadge({ children }: { children: ReactNode }) {
  const ok = `${hud.ok}80`;
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
        // Trimming the label to cap height (below) also shrinks the box, so pin
        // the height back to what the untrimmed line box gave: 14px + 4px x 2.
        minHeight: 22,
        position: "relative",
        "&::after": {
          content: '""',
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          background: [
            `linear-gradient(${ok}, ${ok}) left top / 10px 1px no-repeat`,
            `linear-gradient(${ok}, ${ok}) left top / 1px 10px no-repeat`,
            `linear-gradient(${ok}, ${ok}) right bottom / 10px 1px no-repeat`,
            `linear-gradient(${ok}, ${ok}) right bottom / 1px 10px no-repeat`,
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
      {/*
        Trimming the line box down to cap height makes the flex centring act on
        the letters themselves rather than on the ascender/descender space the
        uppercase label never fills, so the text sits optically centred and the
        dot lines up with it without a magic offset.
      */}
      <Box component="span" sx={{ display: "block", textBox: "trim-both cap alphabetic" }}>
        {children}
      </Box>
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
