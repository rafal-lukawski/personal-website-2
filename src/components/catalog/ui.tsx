"use client";

import type { ReactNode } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import IconButton from "@mui/material/IconButton";
import Link from "@mui/material/Link";
import Stack from "@mui/material/Stack";
import TextField, { type TextFieldProps } from "@mui/material/TextField";
import { keyframes, styled, type CSSObject } from "@mui/material/styles";
import { Link as LocaleLink } from "@/i18n/routing";
import { hud } from "@/theme/hud";
import { channels, tintFilterId } from "./techIcons";

const cyan = hud.cyan;
const frame = hud.frame;
const frameBright = cyan;

export const scanlines = (alpha = 0.05, gap = 3) => {
  const ink = `color-mix(in srgb, ${hud.scanInk} ${Math.round(alpha * 100)}%, transparent)`;
  return `repeating-linear-gradient(to bottom, ${ink} 0, ${ink} 1px, transparent 1px, transparent ${gap}px)`;
};

export const glow = (c: string = cyan, strength = 1) =>
  `0 0 ${10 * strength}px color-mix(in srgb, ${c} 35%, transparent), 0 0 ${28 * strength}px color-mix(in srgb, ${c} 15%, transparent)`;

function cornerFill(size = 18, c: string = frame, weight = 1) {
  return [
    `linear-gradient(${c}, ${c}) left top / ${size}px ${weight}px no-repeat`,
    `linear-gradient(${c}, ${c}) left top / ${weight}px ${size}px no-repeat`,
    `linear-gradient(${c}, ${c}) right bottom / ${size}px ${weight}px no-repeat`,
    `linear-gradient(${c}, ${c}) right bottom / ${weight}px ${size}px no-repeat`,
  ].join(", ");
}

const pulse = keyframes`
  0% { box-shadow: 0 0 0 0 color-mix(in srgb, ${hud.ok} 58%, transparent); }
  70% { box-shadow: 0 0 0 8px color-mix(in srgb, ${hud.ok} 0%, transparent); }
  100% { box-shadow: 0 0 0 0 color-mix(in srgb, ${hud.ok} 0%, transparent); }
`;

const sidebarScan = keyframes`
  0% { top: -90px; }
  100% { top: calc(100% + 90px); }
`;

const blink = keyframes`
  0%, 49% { opacity: 1; }
  50%, 100% { opacity: 0; }
`;

const phosphor = keyframes`
  0% {
    background: color-mix(in srgb, ${hud.ok} 22%, transparent);
    box-shadow: 0 0 5px color-mix(in srgb, ${hud.ok} 28%, transparent);
  }
  100% {
    background: transparent;
    box-shadow: none;
    text-shadow: 0 0 8px color-mix(in srgb, ${hud.ok} 35%, transparent);
  }
`;

const glitch = keyframes`
  0%, 100% { transform: none; filter: none; }
  20% {
    transform: translate(1px, -1px);
    filter: drop-shadow(-2px 0 color-mix(in srgb, ${hud.glitch} 70%, transparent)) drop-shadow(2px 0 color-mix(in srgb, ${hud.cyan} 70%, transparent));
  }
  45% {
    transform: translate(-1px, 1px);
    filter: drop-shadow(2px 0 color-mix(in srgb, ${hud.glitch} 70%, transparent)) drop-shadow(-2px 0 color-mix(in srgb, ${hud.cyan} 70%, transparent));
  }
  70% {
    transform: translate(1px, 1px);
    filter: drop-shadow(-1px 0 color-mix(in srgb, ${hud.glitch} 50%, transparent)) drop-shadow(1px 0 color-mix(in srgb, ${hud.cyan} 50%, transparent));
  }
`;

const reticle = keyframes`
  0%, 100% { opacity: 0.62; transform: scale(0.98); }
  50% { opacity: 1; transform: scale(1); }
`;

const reducedMotion = "@media (prefers-reduced-motion: reduce)";

/** The single focus treatment for every interactive HUD element. */
export const focusRing = {
  "&:focus-visible": {
    outline: `2px solid ${cyan}`,
    outlineOffset: 2,
  },
} as const;

/** Off-screen but readable by assistive tech; mirrors MUI's `visuallyHidden`. */
export const srOnly = {
  position: "absolute",
  width: "1px",
  height: "1px",
  padding: 0,
  margin: "-1px",
  overflow: "hidden",
  clip: "rect(0 0 0 0)",
  whiteSpace: "nowrap",
  border: 0,
} as const;

export const Root = styled(Box)({
  position: "relative",
  minHeight: "100vh",
  isolation: "isolate",
  color: hud.text,
  background: hud.bg,
  "&::before": {
    content: '""',
    position: "fixed",
    inset: 0,
    zIndex: 1,
    pointerEvents: "none",
    backgroundImage:
      `linear-gradient(${hud.gridLine} 1px, transparent 1px), linear-gradient(90deg, ${hud.gridLine} 1px, transparent 1px)`,
    backgroundSize: "20px 20px",
  },
  "&::after": {
    content: '""',
    position: "fixed",
    inset: 0,
    zIndex: 30,
    pointerEvents: "none",
    backgroundImage: scanlines(0.02),
  },
  "& *": { boxSizing: "border-box" },
  "& ::selection": { background: hud.selectionBg, color: hud.selectionFg },
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
    backdropFilter: hud.blurChrome,
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
  backdropFilter: hud.blurChrome,
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

export const LangLink = styled(LocaleLink)({
  display: "inline-flex",
  alignItems: "center",
  height: 24,
  padding: "0 6px",
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
  backdropFilter: hud.blurChrome,
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
    background: `color-mix(in srgb, ${hud.cyan} 8%, transparent)`,
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
  fontWeight: 800,
  fontSize: "clamp(2.2rem, 6.2vw, 4.15rem)",
  lineHeight: 0.92,
  letterSpacing: "0.045em",
  textTransform: "uppercase",
  backgroundImage: `repeating-linear-gradient(to bottom, ${cyan} 0px, ${cyan} 2px, color-mix(in srgb, ${hud.cyanDeep} 42%, ${cyan}) 2px, color-mix(in srgb, ${hud.cyanDeep} 42%, ${cyan}) 3px)`,
  backgroundClip: "text",
  WebkitBackgroundClip: "text",
  color: "transparent",
  WebkitTextFillColor: "transparent",
  filter: `drop-shadow(0 0 6px color-mix(in srgb, ${cyan} 55%, transparent))`,
  "&:hover": { animation: `${glitch} 0.2s linear` },
  [reducedMotion]: { "&:hover": { animation: "none", filter: `drop-shadow(0 0 6px color-mix(in srgb, ${cyan} 55%, transparent))` } },
});

/**
 * Emotion stops filtering invalid DOM props as soon as `shouldForwardProp` is
 * supplied, so the styling props have to be excluded by hand as well.
 */
const forwardExcept =
  (...styleProps: string[]) =>
  (prop: PropertyKey) =>
    prop !== "sx" && prop !== "as" && prop !== "theme" && !styleProps.includes(String(prop));

export const Panel = styled("section", {
  shouldForwardProp: forwardExcept("scan"),
})<{ scan?: boolean }>(({ scan }) => ({
  position: "relative",
  background: hud.surface,
  backdropFilter: hud.blurSurface,
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
          background:
            `linear-gradient(to bottom, transparent, color-mix(in srgb, ${hud.cyan} 12%, transparent), transparent)`,
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
  background: `linear-gradient(90deg, color-mix(in srgb, ${hud.cyan} 8%, transparent), transparent 55%)`,
  "&::after": {
    content: '""',
    position: "absolute",
    left: 20,
    right: 20,
    bottom: 0,
    height: 1,
    background: `linear-gradient(90deg, color-mix(in srgb, ${cyan} 35%, transparent), transparent)`,
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
  textShadow: `0 0 8px color-mix(in srgb, ${cyan} 25%, transparent)`,
});

/** Sunken card chrome: corner ticks that brighten and glitch on hover. */
const hudCardStyles: CSSObject = {
  position: "relative",
  padding: "16px 16px 16px",
  background: hud.sunken,
  backdropFilter: hud.blurChrome,
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
};

export const HudCard = styled("article")(hudCardStyles);

/** `HudCard` for cards that are themselves a link. */
export const HudCardLink = styled("a")({
  ...hudCardStyles,
  display: "block",
  color: "inherit",
  textDecoration: "none",
  ...focusRing,
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
    "&.Mui-error::after": {
      background: cornerFill(10, `color-mix(in srgb, ${hud.danger} 60%, transparent)`),
    },
    "&.Mui-error.Mui-focused::after": { background: cornerFill(10, hud.danger) },
    "&.Mui-error": { boxShadow: glow(hud.danger, 0.55) },
  },
  "& .MuiInputLabel-root.Mui-error": {
    color: hud.danger,
    textShadow: `0 0 8px color-mix(in srgb, ${hud.danger} 25%, transparent)`,
  },
  "& .MuiOutlinedInput-input": { padding: "10px 12px" },
  "& .MuiInputBase-multiline": { padding: 0 },
});

export function HudFieldError({ id, children }: { id: string; children: ReactNode }) {
  return (
    <Box
      id={id}
      role="alert"
      sx={{
        position: "relative",
        display: "inline-flex",
        alignItems: "center",
        gap: "8px",
        mt: "8px",
        px: "10px",
        py: "7px",
        color: hud.danger,
        font: `500 10px/1 ${hud.mono}`,
        letterSpacing: "0.12em",
        textTransform: "uppercase",
        textShadow: `0 0 8px color-mix(in srgb, ${hud.danger} 50%, transparent)`,
        background: hud.panel,
        "&::after": {
          content: '""',
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          background: cornerFill(8, hud.danger),
        },
      }}
    >
      <Box
        aria-hidden
        component="span"
        sx={{
          width: 6,
          height: 6,
          flexShrink: 0,
          bgcolor: hud.danger,
          boxShadow: glow(hud.danger, 0.5),
        }}
      />
      {children}
    </Box>
  );
}

/** A labelled HUD input plus its error readout, wired for screen readers. */
export function HudFormField({
  id,
  name,
  label,
  error,
  ...field
}: {
  id: string;
  name: string;
  label: string;
  /** Message to show below the field; also flips the field into its error state. */
  error?: string;
} & Pick<TextFieldProps, "type" | "multiline" | "minRows">) {
  const errorId = `${id}-err`;
  return (
    <Box>
      <HudField
        {...field}
        id={id}
        name={name}
        label={label}
        required
        fullWidth
        error={Boolean(error)}
        slotProps={{
          htmlInput: { "aria-describedby": error ? errorId : undefined },
          inputLabel: { shrink: true },
        }}
      />
      {error && <HudFieldError id={errorId}>{error}</HudFieldError>}
    </Box>
  );
}

export const Cursor = styled("span")({
  display: "inline-block",
  width: "0.55em",
  height: "0.92em",
  marginLeft: 1,
  verticalAlign: "-0.08em",
  background: `color-mix(in srgb, ${hud.ok} 62%, transparent)`,
  boxShadow: `0 0 5px color-mix(in srgb, ${hud.ok} 38%, transparent), 0 0 10px color-mix(in srgb, ${hud.ok} 18%, transparent)`,
  animation: "none",
  '&[data-blink="true"]': {
    animation: `${blink} 0.95s steps(1) infinite`,
  },
  [reducedMotion]: { animation: "none" },
});

export const PhosphorChar = styled("span")({
  animation: `${phosphor} 100ms ease-out forwards`,
  [reducedMotion]: { animation: "none" },
});

/** Holds the corner ticks; its padding is the transparent gap around the shot. */
export const ShotFrame = styled("div")({
  position: "relative",
  padding: 2,
  "&::after": {
    content: '""',
    position: "absolute",
    inset: 0,
    zIndex: 3,
    pointerEvents: "none",
    background: cornerFill(18),
  },
  "&:hover::after": { background: cornerFill(18, frameBright) },
  "&:hover": { animation: `${glitch} 0.22s linear` },
  [reducedMotion]: { "&:hover": { animation: "none" } },
});

export const ShotButton = styled("button")({
  position: "relative",
  display: "block",
  width: "100%",
  padding: 0,
  border: 0,
  overflow: "hidden",
  appearance: "none",
  background: "none",
  cursor: "pointer",
  color: "inherit",
  ...focusRing,
  "&::before": {
    content: '""',
    position: "absolute",
    inset: 0,
    zIndex: 2,
    pointerEvents: "none",
    backgroundImage: scanlines(0.035),
  },
  "&:hover": { boxShadow: glow(cyan, 0.9) },
});

export const ShotBg = styled("span")({
  position: "absolute",
  inset: 0,
  zIndex: 0,
  overflow: "hidden",
  pointerEvents: "none",
  "& img": {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    objectPosition: "top",
    transform: "scale(1.16)",
    filter: hud.shotBgFilter,
  },
});

export const ShotFg = styled("span")({
  position: "relative",
  display: "block",
  zIndex: 1,
  boxSizing: "border-box",
  padding: 32,
  "& img": {
    display: "block",
    width: "100%",
    height: "auto",
    objectFit: "contain",
    objectPosition: "center",
    filter: "saturate(0.92) contrast(1.04)",
  },
  [`button:hover & img`]: {
    filter: "saturate(1.08) contrast(1.12)",
  },
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
  "& svg": { color: cyan, width: 16, height: 16, flexShrink: 0 },
  "&:hover": { color: cyan, textDecoration: "none" },
  "&.MuiLink-underlineAlways, &.MuiLink-underlineHover": { textDecoration: "none" },
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
  backdropFilter: hud.blurChrome,
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
  "& .MuiBackdrop-root": { background: hud.overlay, backdropFilter: hud.blurChrome },
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
  backdropFilter: hud.blurChrome,
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

export function CornerTicks({
  size = 18,
  color = frame,
  weight = 1,
  animated = false,
}: {
  size?: number;
  color?: string;
  weight?: number;
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
        background: cornerFill(size, color, weight),
        ...(animated
          ? { animation: `${reticle} 2.6s ease-in-out infinite`, [reducedMotion]: { animation: "none" } }
          : {}),
      }}
    />
  );
}

/** Shared look of the tiny decorative readouts printed on panel chrome. */
const microStamp = {
  position: "absolute" as const,
  m: 0,
  zIndex: 4,
  font: `500 8px/1 ${hud.mono}`,
  textTransform: "uppercase" as const,
  color: hud.dim,
  pointerEvents: "none" as const,
  whiteSpace: "nowrap" as const,
};

export function PanelStamps({ left, right }: { left?: string; right?: string }) {
  const base = { ...microStamp, bottom: 6, letterSpacing: "0.15em" };
  return (
    <Box aria-hidden>
      {left && <Box component="span" sx={{ ...base, left: 26 }}>{left}</Box>}
      {right && <Box component="span" sx={{ ...base, right: 26 }}>{right}</Box>}
    </Box>
  );
}

const CORNERS = {
  topLeft: { top: 0, left: 0 },
  topRight: { top: 0, right: 0 },
  bottomLeft: { bottom: 0, left: 0 },
  bottomRight: { bottom: 0, right: 0 },
} as const;

/** Decorative readouts pinned to the four corners of a positioned box. */
export function CornerLabels(labels: Partial<Record<keyof typeof CORNERS, string>>) {
  return (
    <Box aria-hidden>
      {(Object.keys(CORNERS) as (keyof typeof CORNERS)[]).map((corner) =>
        labels[corner] ? (
          <Box
            key={corner}
            component="span"
            sx={{ ...microStamp, letterSpacing: "0.1em", ...CORNERS[corner] }}
          >
            {labels[corner]}
          </Box>
        ) : null,
      )}
    </Box>
  );
}

/** Title bar + status dots + corner stamps: the chrome every panel shares. */
export function PanelHeader({
  title,
  meta,
  stampLeft,
  stampRight,
}: {
  title: string;
  meta?: string;
  stampLeft?: string;
  stampRight?: string;
}) {
  return (
    <>
      <PanelBar>
        <span>{title}</span>
        <Stack direction="row" alignItems="center" spacing="10px">
          {meta && <BarMeta>{meta}</BarMeta>}
          <ProcessDots />
        </Stack>
      </PanelBar>
      <PanelStamps left={stampLeft} right={stampRight} />
    </>
  );
}

/** Small mono caption used for dates, counters and credentials. */
export const MonoMeta = styled("span")({
  display: "block",
  margin: 0,
  font: `500 10px/1.3 ${hud.mono}`,
  letterSpacing: "0.06em",
  color: hud.muted,
});

export function EmojiTintFilters({ colors }: { colors: string[] }) {
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

export const BarMeta = styled("span")({
  font: `500 9px/1 ${hud.mono}`,
  letterSpacing: "0.15em",
  textTransform: "uppercase",
  color: hud.dim,
  whiteSpace: "nowrap",
  "@media (max-width: 640px)": { display: "none" },
});

export function ProcessDots() {
  const dots = [hud.danger, hud.warn, hud.ok];
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
            boxShadow: idx === dots.length - 1 ? glow(hud.ok, 0.5) : "none",
          }}
        />
      ))}
    </Stack>
  );
}

export function StatusBadge({ children }: { children: ReactNode }) {
  const ok = `color-mix(in srgb, ${hud.ok} 50%, transparent)`;
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
        backdropFilter: hud.blurChrome,
        color: hud.ok,
        textTransform: "uppercase",
        letterSpacing: "0.1em",
        fontSize: 10,
        fontFamily: hud.mono,
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
  status,
  stamp,
  index,
}: {
  status: string;
  stamp: string;
  index: string;
}) {
  return (
    <>
      <Box component="span" sx={{ ...stampSx, top: 8, left: 8 }}>
        STATUS: {status}
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
