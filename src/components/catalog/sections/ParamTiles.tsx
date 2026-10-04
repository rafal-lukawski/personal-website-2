"use client";

import { useTranslations } from "next-intl";
import Box from "@mui/material/Box";
import { hud } from "@/theme/hud";
import { paramTiles } from "../content";
import { glitchOnHover, glow, Panel } from "../ui";
import type { SectionProps } from "./types";

type ParamTileProps = {
  /** HUD identifier printed in the tile's top bar, e.g. `PARAM: EXP_YEARS`. */
  code: string;
  value: string;
  label: string;
  /** Status line pinned to the bottom of the tile. */
  readout: string;
};

export function ParamTiles({ order }: SectionProps) {
  const t = useTranslations("params");

  return (
    <Box
      component="section"
      aria-label={t("title")}
      sx={{
        order,
        display: "grid",
        gridTemplateColumns: {
          xs: "minmax(0, 1fr)",
          sm: `repeat(${paramTiles.length}, minmax(0, 1fr))`,
        },
        gap: "20px",
      }}
    >
      {paramTiles.map((tile) => (
        <ParamTile
          key={tile.key}
          code={t(`${tile.key}.code`)}
          value={t(`${tile.key}.value`, { count: tile.count })}
          label={t(`${tile.key}.label`)}
          readout={t(`${tile.key}.readout`)}
        />
      ))}
    </Box>
  );
}

function ParamTile({ code, value, label, readout }: ParamTileProps) {
  return (
    <Panel
      as="article"
      sx={{
        display: "flex",
        flexDirection: "column",
        p: "14px 18px",
        ...glitchOnHover,
      }}
    >
      <Box
        aria-hidden
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "12px",
          mb: "18px",
          font: `500 9px/1 ${hud.mono}`,
          letterSpacing: "0.15em",
          textTransform: "uppercase",
          color: hud.dim,
        }}
      >
        <span>{code}</span>
        <Box
          component="span"
          sx={{
            width: 6,
            height: 6,
            flexShrink: 0,
            borderRadius: "50%",
            bgcolor: hud.ok,
            boxShadow: glow(hud.ok, 0.5),
          }}
        />
      </Box>
      <Box
        component="p"
        sx={{
          m: 0,
          fontFamily: hud.display,
          fontWeight: 800,
          fontSize: "clamp(2rem, 2.6vw, 2.5rem)",
          lineHeight: 0.95,
          textTransform: "uppercase",
          color: hud.cyan,
          filter: `drop-shadow(0 0 6px color-mix(in srgb, ${hud.cyan} 35%, transparent))`,
        }}
      >
        {value}
      </Box>
      <Box
        component="p"
        sx={{
          m: "10px 0 18px",
          font: `500 10.5px/1.3 ${hud.mono}`,
          letterSpacing: "0.1em",
          textTransform: "uppercase",
          color: hud.text,
        }}
      >
        {label}
      </Box>
      <Box
        component="p"
        sx={{
          // Pinned to the bottom so readouts line up across a row whose values wrap differently.
          mt: "auto",
          mb: 0,
          pt: "10px",
          borderTop: `1px solid color-mix(in srgb, ${hud.cyan} 14%, transparent)`,
          font: `500 9px/1.3 ${hud.mono}`,
          letterSpacing: "0.1em",
          textTransform: "uppercase",
          color: hud.dim,
        }}
      >
        {readout}
      </Box>
    </Panel>
  );
}
