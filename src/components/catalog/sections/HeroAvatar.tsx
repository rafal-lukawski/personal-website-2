"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import Box from "@mui/material/Box";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { hud } from "@/theme/hud";
import { GlitchFrame } from "../GlitchFrame";
import { CornerLabels, CornerTicks, glitchOnHover, glow, scanlines } from "../ui";

const AVATAR_SRC = "/author.jpg";
const AVATAR_ALT = "Rafał Łukawski";

/** Portrait dressed as a targeting reticle: corner readouts, scanlines, sweep. */
export function HeroAvatar() {
  const reducedMotion = usePrefersReducedMotion();

  return (
    <Box
      sx={{
        position: "relative",
        width: { xs: 180, sm: 220 },
        height: { xs: 180, sm: 220 },
        zIndex: 1,
        mx: { xs: "auto", sm: 0 },
        p: "20px",
      }}
    >
      <CornerLabels topLeft="X:014.20" topRight="Y:008.80" bottomLeft="RNG:2.40" bottomRight="LOCK:OK" />
      <Box
        sx={{
          position: "relative",
          height: "100%",
          // The glow has to sit on the shot itself, not on this wrapper: the
          // wrapper is 2px larger on every side, and a shadow cast from its
          // edge outlines that inset as a dark (or, in the light theme, pale)
          // ring around the portrait.
          "&:hover [data-shot]": { boxShadow: glow(hud.cyan, 0.9) },
          ...glitchOnHover,
        }}
      >
        <CornerTicks hoverColor={hud.cyan} />
        <Box
          data-shot
          sx={{
            position: "absolute",
            inset: "4px",
            overflow: "hidden",
            background: "none",
            "& img": {
              width: "100%",
              height: "100%",
              objectFit: "cover",
              filter: "contrast(1.07) saturate(0.88)",
            },
          }}
        >
          <Box
            aria-hidden
            sx={{
              position: "absolute",
              inset: 0,
              zIndex: 2,
              pointerEvents: "none",
              backgroundImage: scanlines(0.13),
            }}
          />
          <GlitchFrame trigger="idle" sx={{ height: "100%" }}>
            <Image src={AVATAR_SRC} alt={AVATAR_ALT} width={440} height={440} priority />
          </GlitchFrame>
          {!reducedMotion && (
            <Box
              component={motion.span}
              aria-hidden
              sx={{
                position: "absolute",
                left: 0,
                right: 0,
                height: "28%",
                zIndex: 2,
                pointerEvents: "none",
                background: `linear-gradient(to bottom, transparent, color-mix(in srgb, ${hud.cyan} 28%, transparent), transparent)`,
              }}
              initial={{ top: "-20%" }}
              animate={{ top: ["-20%", "85%"] }}
              transition={{ duration: 5.6, repeat: Infinity, ease: "easeInOut" }}
            />
          )}
        </Box>
      </Box>
    </Box>
  );
}
