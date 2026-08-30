"use client";

import Stack from "@mui/material/Stack";
import { useTranslations } from "next-intl";
import { hud } from "@/theme/hud";

export function SiteFooter() {
  const tFooter = useTranslations("footer");

  return (
    <Stack
      direction="row"
      justifyContent="space-between"
      spacing={1.5}
      sx={{
        position: "relative",
        mt: "40px",
        pt: "20px",
        color: hud.dim,
        font: `500 10.5px/1.4 ${hud.mono}`,
        letterSpacing: "0.1em",
        textTransform: "uppercase",
        "&::before": {
          content: '""',
          position: "absolute",
          left: 0,
          right: 0,
          top: 0,
          height: 1,
          background: `linear-gradient(90deg, transparent, color-mix(in srgb, ${hud.cyan} 50%, transparent), transparent)`,
        },
      }}
    >
      <span>{tFooter("copyright", { year: new Date().getFullYear() })}</span>
    </Stack>
  );
}
