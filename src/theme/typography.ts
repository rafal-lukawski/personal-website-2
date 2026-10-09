import type { CSSProperties } from "react";

/** next/font exposes the faces as `--font-*` variables on `<html>`. */
export const fontFamily = {
  display: "var(--font-barlow-condensed), sans-serif",
  text: "var(--font-barlow-semi-condensed), sans-serif",
  mono: "var(--font-jetbrains), monospace",
} as const;

/** Line height of `lead`; the Typewriter derives its paragraph gap from it. */
export const LEAD_LINE_HEIGHT = 1.45;

const caps = { textTransform: "uppercase" } as const;

const display = (fontWeight: number, fontSize: string, lineHeight: number, letterSpacing: string) => ({
  fontFamily: fontFamily.display,
  fontWeight,
  fontSize,
  lineHeight,
  letterSpacing,
  ...caps,
});

const mono = (fontWeight: number, fontSize: string, lineHeight: number, letterSpacing = "normal") => ({
  fontFamily: fontFamily.mono,
  fontWeight,
  fontSize,
  lineHeight,
  letterSpacing,
});

const label = { ...mono(500, "11px", 1.2, "0.1em"), ...caps };

/** The type scale, registered as MUI typography variants in `theme.ts`. */
export const typographyVariants = {
  // Display (Barlow Condensed)
  /** Hero name. */
  display: display(800, "clamp(2.2rem, 6.2vw, 5.15rem)", 0.92, "0.045em"),
  /** Two-line call to action that opens a panel. */
  headline: display(800, "clamp(1.8rem, 3.2vw, 3.6rem)", 0.9, "0em"),
  /** Big figures in parameter and stat tiles. */
  stat: display(800, "clamp(2rem, 2.6vw, 2.5rem)", 0.95, "0em"),
  /** Line under the hero name. */
  subtitle: display(600, "clamp(1.05rem, 2.2vw, 1.4rem)", 1.2, "0.02em"),
  /** Hero motto: the display family, semi-condensed and lighter, italic. */
  quote: {
    fontFamily: fontFamily.text,
    fontWeight: 500,
    fontStyle: "italic",
    fontSize: "1.05rem",
    lineHeight: 1.35,
    letterSpacing: "0.05em",
  },
  /** Description under a `stat` figure. */
  statLabel: display(600, "0.95rem", 1.3, "0.04em"),

  // Text (JetBrains Mono)
  /** Intro copy and the terminal command. */
  lead: mono(400, "0.9rem", LEAD_LINE_HEIGHT, "0.01em"),
  /** Running text: list items, form input and status. */
  body: mono(400, "0.9rem", 1.5),
  /** Card titles: projects, certificates. */
  title: mono(700, "0.9rem", 1.3),
  /** Muted caption under a card: dates, issuers, counters. */
  meta: mono(500, "10px", 1.3, "0.06em"),

  // HUD chrome (JetBrains Mono, caps)
  /** Section heading inside a panel. */
  overline: { ...mono(700, "0.76rem", 1.5, "0.15em"), ...caps },
  /** Top bar, panel bars, card headings. */
  label,
  button: label,
  /** Form labels and errors, status badge, footer. */
  caption: { ...mono(500, "10px", 1.3, "0.1em"), ...caps },
  /** Decorative readouts: stamps, chips, codes. */
  micro: { ...mono(500, "9px", 1.2, "0.12em"), ...caps },
} satisfies Record<string, CSSProperties>;

type HudTypographyVariant = Exclude<
  keyof typeof typographyVariants,
  "button" | "caption" | "overline"
>;

/** Replaces MUI's default mapping wholesale, so the built-ins are restated. */
export const variantMapping: Record<string, string> = {
  h1: "h1",
  h2: "h2",
  h3: "h3",
  h4: "h4",
  h5: "h5",
  h6: "h6",
  subtitle1: "h6",
  subtitle2: "h6",
  body1: "p",
  body2: "p",
  inherit: "p",
  display: "h1",
  headline: "p",
  stat: "p",
  subtitle: "p",
  statLabel: "p",
  quote: "p",
  lead: "p",
  body: "p",
  title: "h3",
  meta: "span",
  overline: "h2",
  label: "span",
  caption: "span",
  micro: "span",
};

/* eslint-disable @typescript-eslint/no-empty-object-type -- the members come from the mapped supertypes */
declare module "@mui/material/styles" {
  interface TypographyVariants extends Record<HudTypographyVariant, CSSProperties> {}
  interface TypographyVariantsOptions extends Partial<Record<HudTypographyVariant, CSSProperties>> {}
}

declare module "@mui/material/Typography" {
  interface TypographyPropsVariantOverrides extends Record<HudTypographyVariant, true> {}
}
/* eslint-enable @typescript-eslint/no-empty-object-type */
