"use client";

import { useTranslations } from "next-intl";
import Box from "@mui/material/Box";
import { certificatesData } from "../content";
import { Panel, PanelBody, PanelHeader } from "../ui";
import type { SectionProps } from "./types";
import { CertificateCard } from "./CertificateCard";

export function CertificatesPanel({ order }: SectionProps) {
  const tHud = useTranslations("hud");
  const tCerts = useTranslations("certificates");

  return (
    <Panel id="certificates" sx={{ order }}>
      <PanelHeader
        title={tHud("moduleCerts")}
        meta={`REC: ${String(certificatesData.length).padStart(2, "0")}`}
        stampLeft="VERIFY: PASS"
        stampRight="CHK: 0xA7"
      />
      <PanelBody>
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" },
            gap: "20px",
          }}
        >
          {certificatesData.map((certificate) => (
            <CertificateCard
              key={certificate.nameKey}
              certificate={certificate}
              name={tCerts(`items.${certificate.nameKey}.name`)}
              issuer={tCerts(`items.${certificate.nameKey}.issuer`)}
              credentialsLabel={tHud("credentials")}
            />
          ))}
        </Box>
      </PanelBody>
    </Panel>
  );
}
