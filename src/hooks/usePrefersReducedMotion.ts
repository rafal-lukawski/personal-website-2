"use client";

import useMediaQuery from "@mui/material/useMediaQuery";

/** True when the OS asks for less motion; gates every optional HUD animation. */
export function usePrefersReducedMotion(): boolean {
  return useMediaQuery("(prefers-reduced-motion: reduce)");
}
