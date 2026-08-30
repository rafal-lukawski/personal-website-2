"use client";

import { useTranslations } from "next-intl";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { hud } from "@/theme/hud";
import { Typewriter, TYPEWRITER_LINE_HEIGHT } from "../Typewriter";
import { Panel, PanelBody, PanelHeader, srOnly } from "../ui";
import type { SectionProps } from "./types";

const PARAGRAPHS = ["paragraph1", "paragraph2", "paragraph3", "paragraph4"] as const;

export function AboutPanel({ order }: SectionProps) {
  const tHud = useTranslations("hud");
  const tHero = useTranslations("hero");
  const tAbout = useTranslations("about");
  const reducedMotion = usePrefersReducedMotion();

  // Cheap enough to rebuild every render, and never stale after a locale swap.
  const command = tAbout("contactCommand");
  const body = PARAGRAPHS.map((key) => `> ${tAbout(key)}`).join("\n\n");
  const text = `${body}\n\n> ${command}`;

  return (
    <Panel id="about" sx={{ order }}>
      <PanelHeader
        title={tHud("terminalAbout")}
        meta="PID: 0x41"
        stampLeft="ENC: UTF-8"
        stampRight="BUF: OK"
      />
      <PanelBody>
        <Typography
          component="div"
          sx={{
            position: "relative",
            m: 0,
            color: hud.muted,
            fontFamily: hud.mono,
            letterSpacing: "0.01em",
            lineHeight: TYPEWRITER_LINE_HEIGHT,
            fontSize: "0.95rem",
            whiteSpace: "pre-line",
          }}
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
            commandLabel={tHero("contactMe")}
          />
        </Typography>
      </PanelBody>
    </Panel>
  );
}
