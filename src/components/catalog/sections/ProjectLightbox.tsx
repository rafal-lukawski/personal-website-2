"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { hud } from "@/theme/hud";
import type { LightboxController } from "../useLightbox";
import { CornerTicks, LightboxDialog, MonoMeta, NavFab, ShotThumb, srOnly } from "../ui";

const TITLE_ID = "tc-lightbox-title";
const CAPTION_ID = "tc-lightbox-caption";

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
        <Box sx={{ position: "relative", px: { xs: 5, sm: 6 } }}>
          <Typography id={TITLE_ID} sx={srOnly}>
            {tHud("gallery")} {project.title}
          </Typography>
          <MonoMeta
            aria-live="polite"
            sx={{
              mb: "10px",
              mr: "48px",
              textAlign: "right",
              color: hud.dim,
              letterSpacing: "0.1em",
              lineHeight: 1,
            }}
          >
            {pad(index + 1)} / {pad(count)}
          </MonoMeta>
          <Box sx={{ position: "relative" }}>
            <CornerTicks />
            <Box
              component="img"
              src={shot.src}
              alt={shot.alt}
              sx={{ display: "block", maxWidth: "100%", maxHeight: "78vh", m: "2px" }}
            />
          </Box>
          {shot.sourceUrl && (
            <MonoMeta id={CAPTION_ID} sx={{ mt: "10px", textAlign: "right", lineHeight: 1.2 }}>
              {tProjects("source")}: {shot.sourceUrl}
            </MonoMeta>
          )}
          {count > 1 && (
            <Stack direction="row" flexWrap="wrap" spacing={1} useFlexGap sx={{ mt: "20px" }}>
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
          <NavFab aria-label={tHud("close")} onClick={close} sx={{ top: 0, right: 0 }}>
            ×
          </NavFab>
          {count > 1 && (
            <>
              <NavFab
                aria-label={tHud("previous")}
                onClick={() => step(-1)}
                sx={{ left: 0, top: "50%", transform: "translateY(-50%)" }}
              >
                ‹
              </NavFab>
              <NavFab
                aria-label={tHud("next")}
                onClick={() => step(1)}
                sx={{ right: 0, top: "50%", transform: "translateY(-50%)" }}
              >
                ›
              </NavFab>
            </>
          )}
        </Box>
      )}
    </LightboxDialog>
  );
}
