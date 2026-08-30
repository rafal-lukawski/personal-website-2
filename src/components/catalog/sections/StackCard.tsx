"use client";

import Box from "@mui/material/Box";
import { hud } from "@/theme/hud";
import { hudTintColor, techIcons, tintFilterId } from "../techIcons";
import { HudCard, SectionLabel } from "../ui";

/** A titled list of technologies, each prefixed with its brand-tinted mark. */
export function StackCard({ title, items }: { title: string; items: readonly string[] }) {
  return (
    <HudCard>
      <SectionLabel
        as="h3"
        sx={{
          m: "0 0 9px",
          font: `500 11px/1.2 ${hud.mono}`,
          letterSpacing: "0.1em",
          textShadow: "none",
        }}
      >
        {title}
      </SectionLabel>
      <Box
        component="ul"
        sx={{ m: 0, p: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: "4px" }}
      >
        {items.map((item) => (
          <Box
            component="li"
            key={item}
            sx={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "0.89rem" }}
          >
            <TechMark name={item} />
            {item}
          </Box>
        ))}
      </Box>
    </HudCard>
  );
}

function TechMark({ name }: { name: string }) {
  const meta = techIcons[name];
  const Icon = meta?.icon;
  return (
    <Box
      aria-hidden
      component="span"
      sx={{
        flexShrink: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: 16,
        fontSize: "0.94rem",
        fontWeight: 700,
        color: meta ? hudTintColor(meta.color) : hud.dim,
        filter: meta?.desaturate ? `url(#${tintFilterId(meta.color)})` : "none",
      }}
    >
      {Icon ? <Icon /> : meta?.emoji}
    </Box>
  );
}
