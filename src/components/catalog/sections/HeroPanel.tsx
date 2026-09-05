"use client";

import { useTranslations } from "next-intl";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { hud } from "@/theme/hud";
import { Glitch, HudButton, Panel, PanelHeader, StatusBadge } from "../ui";
import { HeroAvatar } from "./HeroAvatar";
import Stack from "@mui/material/Stack";

export function HeroPanel() {
  const t = useTranslations();

  return (
    <Panel id="hero" sx={{ mb: "20px" }}>
      <PanelHeader
        title={t("hud.moduleIdentity")}
        meta="LOC: 52.2297 / 21.0122"
        stampLeft="SYS_LOAD: 24%"
        stampRight="UPLINK: STABLE"
      />
      <Box
        sx={{
          position: "relative",
          display: "grid",
          gridTemplateColumns: { xs: "1fr", sm: "minmax(0, 1fr) auto" },
          gap: { xs: "20px", sm: "40px" },
          p: "20px 20px 26px",
          textAlign: { xs: "center", sm: "left" },
        }}
      >
        <Box sx={{ position: "relative", zIndex: 1, fontFamily: hud.mono }}>
          <Box
            sx={{
              mb: "12px",
              display: "flex",
              justifyContent: { xs: "center", sm: "flex-start" },
            }}
          >
            <StatusBadge>{t("hud.active")}</StatusBadge>
          </Box>
          <Stack direction="column" spacing={0.25}>
            <Glitch>{t("hero.name")}</Glitch>
            <HeroRoles title={t("hero.title")} />
          </Stack>
          <Typography
            sx={{
              mt: "10px",
              mb: 0,
              maxWidth: "42em",
              width: "fit-content",
              mx: { xs: "auto", sm: 0 },
              pl: "12px",
              borderLeft: `1px solid color-mix(in srgb, ${hud.cyan} 28%, transparent)`,
              color: hud.dim,
              font: `italic 400 0.88rem/1.5 ${hud.mono}`,
              letterSpacing: "0.01em",
              textAlign: "left",
            }}
          >
            <Box component="span" sx={{ display: "block" }}>
              {t("hero.mottoLine1")}
            </Box>
            <Box component="span" sx={{ display: "block" }}>
              {t("hero.mottoLine2")}
            </Box>
          </Typography>
          <Box
            sx={{
              mt: "20px",
              display: "flex",
              justifyContent: { xs: "center", sm: "flex-start" },
            }}
          >
            <HudButton href="#contact">{t("hero.contactMe")}</HudButton>
          </Box>
        </Box>

        <HeroAvatar />
      </Box>
    </Panel>
  );
}

function HeroRoles({ title }: { title: string }) {
  return (
    <Typography
      sx={{
        mb: 0,
        color: hud.cyanDeep,
        fontFamily: hud.display,
        fontWeight: 600,
        fontSize: "clamp(1.05rem, 2.2vw, 1.4rem)",
        lineHeight: 1.2,
        letterSpacing: "0.02em",
        textTransform: "uppercase",
      }}
    >
      {title}
    </Typography>
  );
}
