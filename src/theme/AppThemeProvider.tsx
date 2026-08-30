"use client";

import * as React from "react";
import { ThemeProvider, useColorScheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import GlobalStyles from "@mui/material/GlobalStyles";
import theme from "./theme";
import { hudRootCss } from "./hud";
import {
  COLOR_MODE_COOKIE,
  COLOR_MODE_STORAGE_KEY,
  DEFAULT_MODE,
  type ColorModePreference,
} from "./colorMode";

const ONE_YEAR = 60 * 60 * 24 * 365;

function writeColorModeCookie(value: ColorModePreference) {
  const secure = window.location.protocol === "https:" ? "; Secure" : "";
  document.cookie = `${COLOR_MODE_COOKIE}=${encodeURIComponent(value)}; path=/; max-age=${ONE_YEAR}; SameSite=Lax${secure}`;
}

function resolveMode(
  mode: string | undefined,
  systemMode: string | undefined,
): "light" | "dark" | undefined {
  if (mode === "light" || mode === "dark") return mode;
  if (mode === "system") {
    if (systemMode === "light" || systemMode === "dark") return systemMode;
    if (typeof window !== "undefined") {
      return window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light";
    }
  }
  return undefined;
}

/** Keeps `<html class>` correct before paint (locale soft-nav remounts). */
function ColorSchemeClassSync({ defaultMode }: { defaultMode: ColorModePreference }) {
  const { mode, systemMode } = useColorScheme();

  React.useLayoutEffect(() => {
    const resolved =
      resolveMode(mode, systemMode) ??
      resolveMode(defaultMode, undefined);
    if (!resolved) return;

    const root = document.documentElement;
    root.classList.remove("light", "dark");
    root.classList.add(resolved);
  }, [mode, systemMode, defaultMode]);

  return null;
}

function ColorModeCookieSync() {
  const { mode } = useColorScheme();

  React.useEffect(() => {
    if (mode === "light" || mode === "dark" || mode === "system") {
      writeColorModeCookie(mode);
    }
  }, [mode]);

  return null;
}

type AppThemeProviderProps = {
  children: React.ReactNode;
  /** Preference from the request cookie (SSR). */
  defaultMode?: ColorModePreference;
};

export function AppThemeProvider({
  children,
  defaultMode = DEFAULT_MODE,
}: AppThemeProviderProps) {
  // Concrete cookie value → skip the undefined-mode hydration pass.
  const noSsr = defaultMode === "light" || defaultMode === "dark";

  return (
    <ThemeProvider
      theme={theme}
      defaultMode={defaultMode}
      modeStorageKey={COLOR_MODE_STORAGE_KEY}
      noSsr={noSsr}
      disableTransitionOnChange
    >
      <GlobalStyles styles={hudRootCss()} />
      <CssBaseline enableColorScheme />
      <ColorSchemeClassSync defaultMode={defaultMode} />
      <ColorModeCookieSync />
      {children}
    </ThemeProvider>
  );
}

export { DEFAULT_MODE };
