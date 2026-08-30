"use client";

import { useTranslations } from "next-intl";
import Box from "@mui/material/Box";
import { certificatesData } from "../content";
import { Panel, PanelBody, PanelHeader } from "../ui";
import type { SectionProps } from "./types";
import { CertificateCard } from "./CertificateCard";

export function CertificatesPanel({ order }: SectionProps) {
  const t = useTranslations();

  return (
    <Panel id="certificates" sx={{ order }}>
      <PanelHeader
        title={t("hud.moduleCerts")}
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
              name={t(`certificates.items.${certificate.nameKey}.name`)}
              issuer={t(`certificates.items.${certificate.nameKey}.issuer`)}
              credentialsLabel={t("hud.credentials")}
            />
          ))}
        </Box>
      </PanelBody>
    </Panel>
  );
}
