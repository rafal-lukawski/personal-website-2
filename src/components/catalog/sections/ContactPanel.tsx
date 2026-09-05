"use client";

import { useTranslations } from "next-intl";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { socialLinks } from "@/config/socials";
import { hud } from "@/theme/hud";
import { HudLink, Panel, PanelBody, PanelHeader, SectionLabel } from "../ui";
import type { SectionProps } from "./types";
import { ContactForm } from "./ContactForm";

export function ContactPanel({ order }: SectionProps) {
  const t = useTranslations();

  return (
    <Panel id="contact" sx={{ order }}>
      <PanelHeader
        title={t("hud.terminalContact")}
        meta="CH: SECURE"
        stampLeft="LOC: 52.2297 / 21.0122"
        stampRight="TX: READY"
      />
      <PanelBody
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", sm: "1fr 1.1fr" },
          gap: "20px",
        }}
      >
        <Box>
          <Typography
            component="p"
            sx={{
              mt: 0,
              mb: "24px",
              fontFamily: hud.display,
              fontWeight: 800,
              fontSize: "clamp(1.8rem, 3.2vw, 3.6rem)",
              lineHeight: 0.9,
              letterSpacing: "-0.00em",
              textTransform: "uppercase",
            }}
          >
            <Box component="span" sx={{ display: "block", color: hud.cyanDeep }}>
              {t("contact.ctaLine1")}
            </Box>
            <Box
              component="span"
              sx={{
                display: "block",
                color: hud.cyan,
                filter: `drop-shadow(0 0 6px color-mix(in srgb, ${hud.cyan} 20%, transparent))`,
              }}
            >
              {t("contact.ctaLine2")}
            </Box>
          </Typography>
          <Stack spacing="20px">
            {socialLinks.map(({ name, url, icon: Icon }) => (
              <HudLink key={name} href={url} target="_blank" rel="noopener noreferrer">
                <Icon />
                {name}
              </HudLink>
            ))}
          </Stack>
        </Box>

        <Box>
          <SectionLabel>{t("contact.sendMessage")}</SectionLabel>
          <ContactForm />
        </Box>
      </PanelBody>
    </Panel>
  );
}
