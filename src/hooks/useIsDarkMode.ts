"use client";

import { useColorScheme } from "@mui/material/styles";

/** Resolved light/dark, including when mode is `"system"`. */
export function useIsDarkMode(): boolean {
  const { mode, systemMode } = useColorScheme();
  const resolved = mode === "system" ? systemMode : mode;
  return resolved === "dark";
}
