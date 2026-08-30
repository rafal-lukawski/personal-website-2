"use client";

import * as React from "react";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Skeleton from "@mui/material/Skeleton";
import { useColorScheme } from "@mui/material/styles";
import { useTranslations } from "next-intl";
import { LuMoon, LuSun } from "react-icons/lu";
import { useIsDarkMode } from "@/hooks/useIsDarkMode";

const TRACK = 24;
const THUMB = 18;
const PAD = 2;

export function ColorModeButton() {
  const { mode, setMode } = useColorScheme();
  const isDark = useIsDarkMode();
  const tHud = useTranslations("hud");

  if (!mode) {
    return (
      <Skeleton
        variant="rounded"
        width={TRACK * 2}
        height={TRACK}
        sx={{
          flexShrink: 0,
          borderRadius: 999,
          bgcolor: "transparent",
          alignSelf: "center",
        }}
        aria-hidden
      />
    );
  }

  return (
    <Box
      role="radiogroup"
      aria-label={tHud("colorMode")}
      sx={{
        position: "relative",
        display: "inline-flex",
        alignItems: "center",
        alignSelf: "center",
        boxSizing: "border-box",
        flexShrink: 0,
        height: TRACK,
        p: `${PAD}px`,
        borderRadius: 999,
        letterSpacing: 0,
        textTransform: "none",
        lineHeight: 1,
        bgcolor: "transparent",
      }}
    >
      <Box
        aria-hidden
        sx={{
          position: "absolute",
          top: `${PAD}px`,
          left: isDark ? `calc(${PAD}px + ${THUMB}px)` : `${PAD}px`,
          width: THUMB,
          height: THUMB,
          borderRadius: "50%",
          bgcolor: "color-mix(in srgb, var(--hud-cyan) 16%, transparent)",
          boxShadow: "0 0 10px color-mix(in srgb, var(--hud-cyan) 28%, transparent)",
          transition: "left 0.18s ease",
          pointerEvents: "none",
        }}
      />
      <ModeSlot
        active={!isDark}
        aria-label={tHud("colorModeToLight")}
        onClick={() => setMode("light")}
      >
        <LuSun size={13} />
      </ModeSlot>
      <ModeSlot
        active={isDark}
        aria-label={tHud("colorModeToDark")}
        onClick={() => setMode("dark")}
      >
        <LuMoon size={13} />
      </ModeSlot>
    </Box>
  );
}

function ModeSlot({
  active,
  "aria-label": ariaLabel,
  onClick,
  children,
}: {
  active: boolean;
  "aria-label": string;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <IconButton
      role="radio"
      aria-checked={active}
      aria-label={ariaLabel}
      onClick={onClick}
      size="small"
      sx={{
        position: "relative",
        zIndex: 1,
        width: THUMB,
        height: THUMB,
        minWidth: THUMB,
        p: 0,
        borderRadius: "50%",
        lineHeight: 1,
        fontSize: 13,
        color: active ? "var(--hud-cyan)" : "var(--hud-dim)",
        "& svg": { display: "block" },
        "&:hover": {
          color: "var(--hud-cyan)",
          background: "transparent",
        },
        "&:focus-visible": {
          outline: "2px solid var(--hud-cyan)",
          outlineOffset: 2,
        },
      }}
    >
      {children}
    </IconButton>
  );
}
