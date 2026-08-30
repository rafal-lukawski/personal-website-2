"use client";

import Box from "@mui/material/Box";
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
        <Box component="span" sx={{ color: hud.cyan }}>
          RL
        </Box>
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
              {code}
            </LangLink>
          ))}
        </Stack>
      </Stack>
    </TopBar>
  );
}
