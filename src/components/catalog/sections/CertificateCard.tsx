"use client";

import Image from "next/image";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import type { certificatesData } from "../content";
import { CornerTicks, HudCardLink, MonoMeta } from "../ui";

type Certificate = (typeof certificatesData)[number];

export function CertificateCard({
  certificate,
  name,
  issuer,
  credentialsLabel,
}: {
  certificate: Certificate;
  name: string;
  issuer: string;
  credentialsLabel: string;
}) {
  return (
    <HudCardLink
      href={certificate.validationLink}
      target="_blank"
      rel="noopener noreferrer"
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        textAlign: "center",
        p: "20px",
      }}
    >
      <Box sx={{ position: "relative", width: 94, height: 94, mb: "20px", display: "grid", placeItems: "center" }}>
        <CornerTicks size={12} />
        <Image src={certificate.customIcon} alt="" width={64} height={64} />
      </Box>
      <Typography component="strong" sx={{ fontSize: "0.87rem", lineHeight: 1.24, fontWeight: 700 }}>
        {name}
      </Typography>
      <MonoMeta sx={{ mt: "4px" }}>
        {issuer} · {credentialsLabel}
      </MonoMeta>
    </HudCardLink>
  );
}
