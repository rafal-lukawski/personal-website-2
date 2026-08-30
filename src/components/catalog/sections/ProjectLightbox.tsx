"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import { hud } from "@/theme/hud";
import type { LightboxController } from "../useLightbox";
import { CornerTicks, LightboxDialog, MonoMeta, NavFab, PanelBar, ShotThumb } from "../ui";

const TITLE_ID = "tc-lightbox-title";
const CAPTION_ID = "tc-lightbox-caption";

/** Width of the gutter the prev/next buttons sit in, flanking the shot. */
const GUTTER = 56;

const pad = (value: number) => String(value).padStart(2, "0");

export function ProjectLightbox({ project, shot, index, isOpen, close, select, step }: LightboxController) {
  const tHud = useTranslations("hud");
  const tProjects = useTranslations("projects");
  const count = project?.screenshots.length ?? 0;

  return (
    <LightboxDialog
      open={isOpen}
      onClose={close}
      aria-labelledby={TITLE_ID}
      aria-describedby={shot?.sourceUrl ? CAPTION_ID : undefined}
    >
      {project && shot && (
        <>
          <PanelBar sx={{ minHeight: 40, py: 0, pr: "48px" }}>
            <Box component="span" id={TITLE_ID} sx={{ minWidth: 0, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
              {tHud("gallery")} / {project.title}
            </Box>
            <MonoMeta aria-live="polite" sx={{ color: hud.dim, letterSpacing: "0.1em", lineHeight: 1, flexShrink: 0 }}>
              {pad(index + 1)} / {pad(count)}
            </MonoMeta>
          </PanelBar>
          <NavFab aria-label={tHud("close")} onClick={close} sx={{ top: 0, right: 0, zIndex: 3 }}>
            ×
          </NavFab>
          <Box sx={{ px: { xs: "16px", sm: `${GUTTER}px` }, py: { xs: "16px", sm: "24px" } }}>
            <Box sx={{ position: "relative" }}>
              <CornerTicks color={hud.cyan} />
              <Box
                component="img"
                src={shot.src}
                alt={shot.alt}
                sx={{ display: "block", maxWidth: "100%", maxHeight: "72vh", m: "2px" }}
              />
              {count > 1 && (
                <>
                  <NavFab
                    aria-label={tHud("previous")}
                    onClick={() => step(-1)}
                    // Outside the shot on wide screens, over it on narrow ones,
                    // where there is no gutter left to sit in.
                    sx={{ left: { xs: 8, sm: -(GUTTER - 8) }, top: "50%", transform: "translateY(-50%)", zIndex: 3 }}
                  >
                    ‹
                  </NavFab>
                  <NavFab
                    aria-label={tHud("next")}
                    onClick={() => step(1)}
                    sx={{ right: { xs: 8, sm: -(GUTTER - 8) }, top: "50%", transform: "translateY(-50%)", zIndex: 3 }}
                  >
                    ›
                  </NavFab>
                </>
              )}
            </Box>
            {shot.sourceUrl && (
              <MonoMeta id={CAPTION_ID} sx={{ mt: "8px", textAlign: "right", lineHeight: 1.2 }}>
                {tProjects("source")}: {shot.sourceUrl}
              </MonoMeta>
            )}
            {count > 1 && (
              <Stack
                direction="row"
                flexWrap="wrap"
                justifyContent="center"
                spacing={1}
                useFlexGap
                sx={{ mt: "24px" }}
              >
                {project.screenshots.map((thumb, idx) => (
                  <ShotThumb
                    key={thumb.id}
                    type="button"
                    data-active={idx === index}
                    aria-label={`${tHud("gallery")} ${idx + 1} / ${count}`}
                    onClick={() => select(idx)}
                  >
                    <Image src={thumb.src} alt={thumb.alt} width={120} height={75} />
                  </ShotThumb>
                ))}
              </Stack>
            )}
          </Box>
        </>
      )}
    </LightboxDialog>
  );
}
