"use client";

import * as React from "react";
import { CssVarsProvider, useColorScheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import theme from "./theme";
import {
  COLOR_MODE_COOKIE,
  COLOR_MODE_STORAGE_KEY,
  DEFAULT_MODE,
  type ColorModePreference,
} from "./colorMode";

const ONE_YEAR = 60 * 60 * 24 * 365;

function ColorModeCookieSync() {
  const { mode } = useColorScheme();

  React.useEffect(() => {
    if (mode === "light" || mode === "dark" || mode === "system") {
      document.cookie = `${COLOR_MODE_COOKIE}=${encodeURIComponent(mode)}; path=/; max-age=${ONE_YEAR}; SameSite=Lax`;
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
      <CssBaseline enableColorScheme />
      <ColorModeCookieSync />
      {children}
    </ThemeProvider>
  );
}

export { DEFAULT_MODE };
