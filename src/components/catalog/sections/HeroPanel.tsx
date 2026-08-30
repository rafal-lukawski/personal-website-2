"use client";

import { useTranslations } from "next-intl";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { hud } from "@/theme/hud";
import { Glitch, HudButton, Panel, PanelHeader, StatusBadge } from "../ui";
import { HeroAvatar } from "./HeroAvatar";

export function HeroPanel() {
  const tHud = useTranslations("hud");
  const tHero = useTranslations("hero");

  return (
    <Panel id="hero" sx={{ mb: "20px" }}>
      <PanelHeader
        title={tHud("moduleIdentity")}
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
          <Box sx={{ mb: "12px", display: "flex", justifyContent: { xs: "center", sm: "flex-start" } }}>
            <StatusBadge>{tHud("active")}</StatusBadge>
          </Box>
          <Glitch>{tHero("name")}</Glitch>
          <HeroRoles title={tHero("title")} />
          <Typography
            sx={{
              mt: "10px",
              mb: 0,
              maxWidth: "42em",
              mx: { xs: "auto", sm: 0 },
              color: hud.dim,
              font: `400 0.88rem/1.5 ${hud.mono}`,
              letterSpacing: "0.01em",
            }}
          >
            <Box component="span" sx={{ display: "block" }}>
              {tHero("mottoLine1")}
            </Box>
            <Box component="span" sx={{ display: "block" }}>
              {tHero("mottoLine2")}
            </Box>
          </Typography>
          <Box sx={{ mt: "20px", display: "flex", justifyContent: { xs: "center", sm: "flex-start" } }}>
            <HudButton href="#contact">{tHero("contactMe")}</HudButton>
          </Box>
        </Box>

        <HeroAvatar />
      </Box>
    </Panel>
  );
}

/** Job titles separated by a glowing tick instead of the source `" | "`. */
function HeroRoles({ title }: { title: string }) {
  return (
    <Typography
      aria-label={title}
      sx={{
        mt: "14px",
        mb: 0,
        color: hud.text,
        font: `400 1.02rem/1.45 ${hud.mono}`,
        letterSpacing: "0.02em",
        display: "flex",
        alignItems: "center",
        justifyContent: { xs: "center", sm: "flex-start" },
        flexWrap: "wrap",
        columnGap: "12px",
        rowGap: "6px",
      }}
    >
      {title.split(" | ").map((part, idx) => (
        <Box key={part} component="span" sx={{ display: "inline-flex", alignItems: "center", gap: "12px" }}>
          {idx > 0 && (
            <Box
              component="span"
              aria-hidden
              sx={{
                width: "2px",
                height: "0.9em",
                bgcolor: hud.cyan,
                boxShadow: `0 0 8px ${hud.cyan}`,
                flexShrink: 0,
              }}
            />
          )}
          {part}
        </Box>
      ))}
    </Typography>
  );
}
