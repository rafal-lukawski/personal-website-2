"use client";

import { useTranslations } from "next-intl";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { hud } from "@/theme/hud";
import { Typewriter } from "../Typewriter";
import { Panel, PanelBody, PanelHeader, srOnly } from "../ui";
import type { SectionProps } from "./types";

const PARAGRAPHS = ["about.paragraph1", "about.paragraph2"] as const;

export function IntroPanel({ order }: SectionProps) {
  const t = useTranslations();
  const reducedMotion = usePrefersReducedMotion();

  // Cheap enough to rebuild every render, and never stale after a locale swap.
  const command = t("about.contactCommand");
  const body = PARAGRAPHS.map((key) => t(key)).join("\n\n");
  const text = `${body}\n\n${command}`;

  return (
    <Panel id="about" sx={{ order }}>
      <PanelHeader
        title={t("hud.terminalIntro")}
        meta="PID: 0x41"
        stampLeft="ENC: UTF-8"
        stampRight="BUF: OK"
      />
      <PanelBody>
        <Typography variant="headline" sx={{ m: 0, mb: "16px" }}>
          <Box component="span" sx={{ display: "block", color: hud.cyanDeep }}>
            {t("about.ctaLine1")}
          </Box>
          <Box
            component="span"
            sx={{
              display: "block",
              color: hud.cyan,
              filter: `drop-shadow(0 0 6px color-mix(in srgb, ${hud.cyan} 20%, transparent))`,
            }}
          >
            {t("about.ctaLine2")}
          </Box>
        </Typography>
        <Typography
          variant="lead"
          component="div"
          sx={{ position: "relative", m: 0, color: hud.dim, whiteSpace: "pre-line" }}
        >
          {/* The typed run is aria-hidden, so screen readers get the prose here. */}
          <Box component="p" sx={srOnly}>
            {body.replaceAll("**", "")}
          </Box>
          <Typewriter
            key={text}
            text={text}
            enabled={!reducedMotion}
            command={command}
            commandHref="#contact"
            commandLabel={t("hero.contactMe")}
          />
        </Typography>
      </PanelBody>
    </Panel>
  );
}
