"use client";

import { useEffect, useRef } from "react";
import Box from "@mui/material/Box";
import { ParticleSim } from "@/lib/particles";

export function ParticleField() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reduced.matches) return;

    const sim = new ParticleSim(canvas);
    sim.start();
    return () => sim.destroy();
  }, []);

  return (
    <Box
      component="canvas"
      ref={ref}
      aria-hidden
      sx={{
        position: "fixed",
        inset: 0,
        zIndex: 0,
        pointerEvents: "none",
        display: "block",
        width: "100%",
        height: "100%",
        opacity: 0.5,
      }}
    />
  );
}
