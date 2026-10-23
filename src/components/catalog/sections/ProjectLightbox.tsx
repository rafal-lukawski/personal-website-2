"use client";

import { useState } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import type { SxProps, Theme } from "@mui/material/styles";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { hud } from "@/theme/hud";
import { fontFamily } from "@/theme/typography";
import type { LightboxController } from "../useLightbox";
import type { CatalogShot } from "../useProjects";
import {
  CornerTicks,
  LightboxDialog,
  MonoMeta,
  NavFab,
  ShotThumb,
  captionSwap,
  chromeIn,
  chromeInNav,
  glitch,
  glow,
  scanLeft,
  scanRight,
  shotEnterNext,
  shotEnterPrev,
  shotLeaveNext,
  shotLeavePrev,
  shotLock,
} from "../ui";

const TITLE_ID = "tc-lightbox-title";
const CAPTION_ID = "tc-lightbox-caption";

/** How long the shot has the frame to itself before the chrome follows. */
const SHOT_LEAD = 320;
const SWAP_MS = 280;

const pad = (value: number) => String(value).padStart(2, "0");

const still: SxProps<Theme> = {
  "@media (prefers-reduced-motion: reduce)": { animation: "none", opacity: 1 },
};

function reveal(delayMs: number): SxProps<Theme> {
  return {
    animation: `${chromeIn} 280ms ease-out both`,
    animationDelay: `${SHOT_LEAD + delayMs}ms`,
    ...still,
  };
}

function navReveal(delayMs: number): SxProps<Theme> {
  return {
    animation: `${chromeInNav} 280ms ease-out both`,
    animationDelay: `${SHOT_LEAD + delayMs}ms`,
    "@media (prefers-reduced-motion: reduce)": {
      animation: "none",
      opacity: 1,
      transform: "translateY(-50%)",
    },
  };
}

/**
 * Header, gutters, caption row and thumbs. The shot takes the rest, so its
 * width is whatever still leaves that chrome inside the viewport.
 */
const CHROME_H = 248;

/** Gutter between the frame and the shot; caption and thumbs align to it. */
const PAD = "var(--tc-lightbox-pad)";

const hairline = `color-mix(in srgb, ${hud.frame} 45%, transparent)`;

/** Gutters on both sides plus the gap between the corner ticks and the shot. */
const SIDES = `2 * ${PAD} + 4px`;

/**
 * Both dimensions are spelled out, not left to the image, so the frame can
 * ease between shots of different proportions instead of jumping.
 */
function shotSize(ratio: number) {
  const width = `min(100cqw - ${SIDES}, max(120px, 100cqh - ${CHROME_H}px) * ${ratio})`;
  return {
    frameWidth: `calc(${width} + ${SIDES})`,
    height: `calc(${width} / ${ratio})`,
  };
}

const resize = (property: string, reduced: boolean) =>
  reduced ? "none" : `${property} ${SWAP_MS}ms ease-out`;

const navSx = {
  top: "50%",
  width: 44,
  height: 60,
  zIndex: 6,
  color: "#e6f1f5",
  fontSize: 22,
  background: "rgba(18, 30, 36, 0.78)",
  "&::after": { background: "none" },
  "&:hover": { color: "#fff", background: "rgba(18, 30, 36, 0.92)" },
};

/**
 * Fills the shot box. Mid-resize the box has neither shot's proportions, so
 * the incoming one is cropped from the top and the outgoing one letterboxed.
 */
function ShotPicture({
  shot,
  decorative = false,
  fit = "cover",
}: {
  shot: CatalogShot;
  decorative?: boolean;
  fit?: "cover" | "contain";
}) {
  return (
    <Image
      src={shot.src}
      alt={decorative ? "" : shot.alt}
      sizes="(max-width: 1120px) calc(100vw - 80px), 960px"
      style={{
        display: "block",
        width: "100%",
        height: "100%",
        objectFit: fit,
        objectPosition: fit === "cover" ? "top" : "center",
      }}
    />
  );
}

export function ProjectLightbox({
  project,
  shot,
  index,
  isOpen,
  close,
  select,
  step,
  direction,
  moveId,
  swipeHandlers,
}: LightboxController) {
  const t = useTranslations();
  const reduced = usePrefersReducedMotion();
  const count = project?.screenshots.length ?? 0;

  const [tracked, setTracked] = useState<CatalogShot | null>(null);
  const [outgoing, setOutgoing] = useState<CatalogShot | null>(null);
  if ((shot?.src.src ?? null) !== (tracked?.src.src ?? null)) {
    setOutgoing(tracked && shot && moveId > 0 && !reduced ? tracked : null);
    setTracked(shot);
  }

  const swapping = moveId > 0 && !reduced;
  const leave = direction > 0 ? shotLeaveNext : shotLeavePrev;
  const enter = direction > 0 ? shotEnterNext : shotEnterPrev;
  const size = shotSize(shot ? shot.src.width / shot.src.height : 1);

  return (
    <LightboxDialog
      open={isOpen}
      onClose={close}
      aria-labelledby={TITLE_ID}
      aria-describedby={shot ? CAPTION_ID : undefined}
    >
      {project && shot && (
        <Box
          sx={(theme) => ({
            position: "relative",
            display: "flex",
            flexDirection: "column",
            width: size.frameWidth,
            maxWidth: "100%",
            transition: resize("width", reduced),
            maxHeight: "100%",
            m: "auto",
            flexShrink: 0,
            overflow: "hidden",
            backgroundColor: "#0e1416",
            "--tc-lightbox-pad": "12px",
            [theme.breakpoints.up("sm")]: { "--tc-lightbox-pad": "28px" },
            ...theme.applyStyles("light", {
              backgroundColor: "#f4f8f9",
            }),
          })}
        >
          <CornerTicks />
          <Box
            sx={{
              display: "flex",
              alignItems: "stretch",
              flexShrink: 0,
              minHeight: 56,
              borderBottom: `1px solid ${hairline}`,
              ...reveal(0),
            }}
          >
            <Typography
              variant="label"
              id={TITLE_ID}
              sx={{
                pl: PAD,
                pr: 2,
                alignSelf: "center",
                minWidth: 0,
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
                color: hud.cyan,
                letterSpacing: "0.18em",
              }}
            >
              <Box component="span" sx={{ opacity: 0.6 }}>
                {t("hud.gallery")}
              </Box>
              <Box component="span" sx={{ mx: 1.25, color: hud.dim }}>
                /
              </Box>
              {project.title}
            </Typography>
            <Box sx={{ ml: "auto", display: "flex", alignItems: "center", flexShrink: 0 }}>
              <MonoMeta
                key={index}
                aria-live="polite"
                sx={{
                  px: 2.5,
                  color: hud.dim,
                  letterSpacing: "0.12em",
                  ...(swapping ? { animation: `${captionSwap} ${SWAP_MS}ms ease-out`, ...still } : {}),
                }}
              >
                {pad(index + 1)} / {pad(count)}
              </MonoMeta>
              <NavFab
                aria-label={t("hud.close")}
                onClick={close}
                sx={{
                  position: "relative",
                  top: "auto",
                  width: 56,
                  height: "auto",
                  alignSelf: "stretch",
                  fontSize: 20,
                  background: "transparent",
                  borderLeft: `1px solid ${hairline}`,
                  "&::after": { background: "none" },
                  "&:hover": { background: "transparent" },
                  ...reveal(0),
                }}
              >
                ×
              </NavFab>
            </Box>
          </Box>
          <Box
            key={project.id}
            sx={{ flexShrink: 0, px: PAD, pt: 2.5 }}
            {...swipeHandlers}
          >
            {/* The padding is the transparent gap between the ticks and the shot. */}
            <Box sx={{ position: "relative", p: "2px" }}>
              <CornerTicks draw />
              <Box
                sx={{
                  position: "relative",
                  overflow: "hidden",
                  height: size.height,
                  transition: resize("height", reduced),
                  ...(reduced
                    ? {}
                    : { animation: `${shotLock} ${SHOT_LEAD}ms ease-out both`, ...still }),
                }}
              >
                {outgoing && (
                  <Box
                    key={outgoing.src.src}
                    aria-hidden
                    sx={{
                      position: "absolute",
                      inset: 0,
                      zIndex: 1,
                      pointerEvents: "none",
                      animation: `${leave} 240ms ease-in forwards`,
                    }}
                  >
                    <Box sx={{ width: "100%", height: "100%", animation: `${glitch} 180ms linear` }}>
                      <ShotPicture shot={outgoing} decorative fit="contain" />
                    </Box>
                  </Box>
                )}
                <Box
                  key={shot.src.src}
                  sx={{
                    height: "100%",
                    ...(swapping ? { animation: `${enter} ${SWAP_MS}ms ease-out`, ...still } : {}),
                  }}
                >
                  <Box
                    sx={{
                      height: "100%",
                      ...(swapping ? { animation: `${glitch} 180ms linear`, ...still } : {}),
                    }}
                  >
                    <ShotPicture shot={shot} />
                  </Box>
                </Box>
                {swapping && (
                  <Box
                    key={moveId}
                    aria-hidden
                    sx={{
                      position: "absolute",
                      top: 0,
                      bottom: 0,
                      width: "2px",
                      zIndex: 5,
                      pointerEvents: "none",
                      background: hud.cyan,
                      boxShadow: glow(hud.cyan, 1),
                      animation: `${direction > 0 ? scanRight : scanLeft} ${SWAP_MS}ms linear forwards`,
                      ...still,
                    }}
                  />
                )}
              </Box>
              {count > 1 && (
                <>
                  <NavFab
                    aria-label={t("hud.previous")}
                    onClick={() => step(-1)}
                    sx={{ ...navSx, left: 12, transform: "translateY(-50%)", ...navReveal(80) }}
                  >
                    ‹
                  </NavFab>
                  <NavFab
                    aria-label={t("hud.next")}
                    onClick={() => step(1)}
                    sx={{ ...navSx, right: 12, transform: "translateY(-50%)", ...navReveal(80) }}
                  >
                    ›
                  </NavFab>
                </>
              )}
            </Box>
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", sm: "row" },
              alignItems: { xs: "flex-start", sm: "center" },
              gap: { xs: 0.5, sm: 2.5 },
              flexShrink: 0,
              px: PAD,
              pt: 2,
              pb: 1.75,
              ...reveal(160),
            }}
          >
            <Typography
              id={CAPTION_ID}
              key={shot.src.src}
              component="p"
              sx={{
                m: 0,
                flex: "0 1 auto",
                minWidth: 0,
                color: hud.text,
                fontFamily: fontFamily.text,
                fontStyle: "italic",
                fontWeight: 400,
                fontSize: "1rem",
                lineHeight: 1.35,
                letterSpacing: "0.01em",
                textTransform: "none",
                display: "-webkit-box",
                WebkitLineClamp: 2,
                WebkitBoxOrient: "vertical",
                overflow: "hidden",
                ...(swapping ? { animation: `${captionSwap} ${SWAP_MS}ms ease-out`, ...still } : {}),
              }}
            >
              {shot.caption}
            </Typography>
            {shot.sourceUrl && (
              <MonoMeta
                sx={{
                  flexShrink: 0,
                  color: hud.dim,
                  pl: { sm: 2 },
                  borderLeft: { sm: `1px solid ${hairline}` },
                }}
              >
                {t("projects.source")}: {shot.sourceUrl}
              </MonoMeta>
            )}
          </Box>
          {count > 1 && (
            <Box
              sx={{
                flexShrink: 0,
                minWidth: 0,
                mx: PAD,
                pt: 1,
                pb: 1.5,
                borderTop: `1px solid ${hairline}`,
                ...reveal(240),
              }}
            >
              <Box
                sx={{
                  // Room for the focus ring, which the scroller would clip.
                  p: "4px",
                  overflowX: "auto",
                  scrollbarWidth: "none",
                  "&::-webkit-scrollbar": { display: "none" },
                }}
              >
                <Stack
                  direction="row"
                  spacing={1.5}
                  useFlexGap
                  sx={{ width: "max-content", mx: "auto", flexWrap: "nowrap" }}
                >
                  {project.screenshots.map((thumb, idx) => (
                    <ShotThumb
                      key={thumb.src.src}
                      type="button"
                      data-active={idx === index}
                      aria-label={`${t("hud.gallery")} ${idx + 1} / ${count}`}
                      onClick={() => select(idx)}
                    >
                      <Image src={thumb.src} alt="" width={224} height={126} sizes="112px" />
                      <Box
                        component="span"
                        aria-hidden
                        sx={{
                          position: "absolute",
                          right: 3,
                          bottom: 3,
                          zIndex: 2,
                          px: "4px",
                          py: "3px",
                          color: "#d7e4eb",
                          background: "rgba(10, 14, 16, 0.82)",
                          fontFamily: fontFamily.mono,
                          fontSize: 9,
                          letterSpacing: "0.08em",
                          lineHeight: 1,
                          pointerEvents: "none",
                        }}
                      >
                        {pad(idx + 1)}
                      </Box>
                    </ShotThumb>
                  ))}
                </Stack>
              </Box>
            </Box>
          )}
        </Box>
      )}
    </LightboxDialog>
  );
}
