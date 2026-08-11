"use client";

import * as React from "react";
import IconButton from "@mui/material/IconButton";
import Skeleton from "@mui/material/Skeleton";
import { useColorScheme } from "@mui/material/styles";
import { LuMoon, LuSun } from "react-icons/lu";
import { useIsDarkMode } from "@/hooks/useIsDarkMode";

export const ColorModeButton = React.forwardRef<
  HTMLButtonElement,
  Omit<React.ComponentProps<typeof IconButton>, "aria-label" | "onClick" | "children">
>(function ColorModeButton(props, ref) {
  const { mode, setMode } = useColorScheme();
  const isDark = useIsDarkMode();

  if (!mode) {
    return (
      <Skeleton
        variant="circular"
        width={34}
        height={34}
        sx={{ flexShrink: 0 }}
        aria-hidden
      />
    );
  }

  return (
    <IconButton
      onClick={() => setMode(isDark ? "light" : "dark")}
      size="small"
      aria-label="Toggle color mode"
      ref={ref}
      sx={{
        color: "text.primary",
      }}
      {...props}
    >
      {isDark ? <LuMoon size={20} /> : <LuSun size={20} />}
    </IconButton>
  );
});
