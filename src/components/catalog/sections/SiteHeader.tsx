"use client";

import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import { useLocale } from "next-intl";
import { usePathname } from "@/i18n/routing";
import { ColorModeButton } from "@/components/ColorModeButton";
import { hud } from "@/theme/hud";
import { LangLink, TopBar } from "../ui";

/** Display order of the language switch, independent of the routing config. */
const LOCALES = ["pl", "en"] as const;

export function SiteHeader() {
  const locale = useLocale();
  const pathname = usePathname();

  return (
    <TopBar>
      <Stack direction="row" alignItems="center" spacing="14px">
        <Typography variant="label" sx={{ color: hud.cyan }}>
          RL
        </Typography>
      </Stack>
      <Stack direction="row" alignItems="center" spacing="10px">
        <ColorModeButton />
        <Stack direction="row" alignItems="center" spacing="2px">
          {LOCALES.map((code) => (
            <LangLink
              key={code}
              href={pathname}
              locale={code}
              aria-current={locale === code ? "page" : undefined}
            >
              <Typography variant="label">{code}</Typography>
            </LangLink>
          ))}
        </Stack>
      </Stack>
    </TopBar>
  );
}
