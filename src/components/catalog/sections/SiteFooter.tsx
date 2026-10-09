"use client";

import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { useTranslations } from "next-intl";
import { hud } from "@/theme/hud";

export function SiteFooter() {
  const t = useTranslations();

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
      <Typography variant="caption">
        {t("footer.copyright", { year: new Date().getFullYear() })}
      </Typography>
    </Stack>
  );
}
