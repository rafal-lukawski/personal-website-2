"use client";

import { useEffect, useMemo, useState } from "react";
import Box from "@mui/material/Box";
import { hud } from "@/theme/hud";
import { Cursor, PhosphorChar, focusRing } from "./ui";

type Glyph = { ch: string; bold: boolean };

/** Line height of the typed body; the paragraph gap is derived from it. */
export const TYPEWRITER_LINE_HEIGHT = 1.54;
export const SHOW_LINE_PROMPT = false;
const LINE_PROMPT = "> ";
const PARAGRAPH_GAP = `${TYPEWRITER_LINE_HEIGHT * 0.7}em`;
const GLYPH_INTERVAL_MS = 11;
const promptTint = { color: `color-mix(in srgb, ${hud.ok} 62%, ${hud.muted})` } as const;

/** Turns `**bold**` markers into per-character emphasis flags. */
function parseBold(raw: string): Glyph[] {
  const glyphs: Glyph[] = [];
  let bold = false;
  for (let i = 0; i < raw.length; i++) {
    if (raw[i] === "*" && raw[i + 1] === "*") {
      bold = !bold;
      i += 1;
      continue;
    }
    glyphs.push({ ch: raw[i], bold });
  }
  return glyphs;
}

function isLineStart(glyphs: Glyph[], i: number) {
  return i === 0 || glyphs[i - 1]?.ch === "\n";
}

function Prompt({ enabled }: { enabled: boolean }) {
  return enabled ? (
    <PhosphorChar sx={promptTint}>{LINE_PROMPT}</PhosphorChar>
  ) : (
    <Box component="span" sx={promptTint}>
      {LINE_PROMPT}
    </Box>
  );
}

/**
 * Types `text` out one glyph at a time. The trailing `command` is rendered as a
 * link once it has been typed; the whole run is `aria-hidden`, so callers must
 * expose the plain text separately.
 */
export function Typewriter({
  text,
  enabled,
  command,
  commandHref,
  commandLabel,
}: {
  text: string;
  enabled: boolean;
  command: string;
  commandHref: string;
  commandLabel: string;
}) {
  const glyphs = useMemo(() => parseBold(text), [text]);
  const [count, setCount] = useState(0);
  const commandStart = glyphs.length - command.length;

  useEffect(() => {
    if (!enabled) return;

    let i = 0;
    const id = window.setInterval(() => {
      i += 1;
      setCount(i);
      if (i >= glyphs.length) window.clearInterval(id);
    }, GLYPH_INTERVAL_MS);

    return () => window.clearInterval(id);
  }, [text, enabled, glyphs.length]);

  const shownCount = enabled ? Math.min(count, glyphs.length) : glyphs.length;
  const done = shownCount >= glyphs.length;

  const renderChars = (from: number, to: number) =>
    glyphs.slice(from, to).map((glyph, offset) => {
      const i = from + offset;
      if (glyph.ch === "\n" && glyphs[i - 1]?.ch === "\n") {
        return <Box key={i} component="span" sx={{ display: "block", height: PARAGRAPH_GAP }} />;
      }
      const sx = glyph.bold ? { fontWeight: 700, color: hud.text } : undefined;
      const ch = enabled ? (
        <PhosphorChar key={i} sx={sx}>
          {glyph.ch}
        </PhosphorChar>
      ) : (
        <Box key={i} component="span" sx={sx}>
          {glyph.ch}
        </Box>
      );
      if (SHOW_LINE_PROMPT && glyph.ch !== "\n" && isLineStart(glyphs, i)) {
        return (
          <Box key={`${i}-line`} component="span">
            <Prompt enabled={enabled} />
            {ch}
          </Box>
        );
      }
      return ch;
    });

  const bodyTo = Math.min(shownCount, commandStart);
  const commandTo = Math.max(commandStart, shownCount);

  return (
    <>
      <Box component="span" aria-hidden>
        {renderChars(0, bodyTo)}
      </Box>
      {shownCount > commandStart && (
        <Box
          component="a"
          href={commandHref}
          aria-label={commandLabel}
          sx={{
            color: hud.cyan,
            textDecoration: "none",
            cursor: "pointer",
            font: "inherit",
            letterSpacing: "0.06em",
            "&:hover": {
              textShadow: `0 0 8px ${hud.cyan}`,
              textDecoration: "underline",
              textUnderlineOffset: "3px",
            },
            ...focusRing,
          }}
        >
          {renderChars(commandStart, commandTo)}
        </Box>
      )}
      <Cursor aria-hidden data-blink={done && enabled ? "true" : undefined} />
    </>
  );
}
