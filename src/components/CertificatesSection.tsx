"use client";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import { grey } from "@mui/material/colors";
import Image from "next/image";
import { SectionLayout } from "./SectionLayout";
import React from "react";
import { useTranslations } from "next-intl";

const certificatesData = [
  {
    date: "2024.07",
    name: "Professional Cloud Architect",
    issuer: "Google",
    customIcon: "/google-cloud-architect.webp",
    validationLink: "https://www.credly.com/badges/257b922c-e06d-493b-b9a8-4e3be00b87a3/linked_in_profile",
  },
  {
    date: "2012.01",
    name: "Professional Scrum Master",
    issuer: "Scrum.org",
    customIcon: "/scrum-master-psm1.webp",
    validationLink: "https://www.credly.com/badges/44c1cea7-7e2a-4a44-88ee-03c189587963",
  },
];


const formatDate = (dateStr: string) => {
  const [year, month] = dateStr.split(".");
  const date = new Date(parseInt(year), parseInt(month) - 1);
  return date.toLocaleDateString("en-US", { month: "long", year: "numeric" });
};

export function CertificatesSection() {
  const t = useTranslations("certificates");
  
  return (
    <SectionLayout title={t("title")} id="certificates">
      <Box sx={{ display: "grid", gridTemplateColumns: "auto 1fr", gap: 4, alignItems: "start" }}>
        {certificatesData.map((cert, index) => (
          <React.Fragment key={index}>
            {/* Date Column */}
            <Box sx={{ display: "flex", justifyContent: "flex-end", alignItems: "center", pt: 1, minWidth: 120 }}>
              <Typography variant="body2" sx={{ color: grey[700] }}>
                {formatDate(cert.date)}
              </Typography>
            </Box>
            
            {/* Content Column */}
            <Box sx={{ display: "flex", alignItems: "flex-start", gap: 2 }}>
              {cert.customIcon && (
                <Box
                  sx={{
                    width: 48,
                    height: 48,
                    flexShrink: 0,
                    position: "relative",
                    borderRadius: 2,
                    overflow: "hidden",
                  }}
                >
                  <Image
                    src={cert.customIcon}
                    alt={cert.name}
                    fill
                    style={{ objectFit: "contain" }}
                  />
                </Box>
              )}
              <Box sx={{ flex: 1 }}>
                <Typography variant="body1" component="div" sx={{ fontWeight: "bold", color: grey[900], lineHeight: 1.2 }}>
                  {cert.name}
                </Typography>
                <Typography variant="body2" component="div" sx={{ color: grey[700], mt: 0.5, mb: 0.5 }}>
                  {cert.issuer}
                </Typography>
                {cert.validationLink && (
                  <Link
                    href={cert.validationLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    underline="hover"
                    sx={{ color: "#1976d2", fontSize: "0.875rem" }}
                  >
                    {t("showCredentials")}
                  </Link>
                )}
              </Box>
            </Box>
          </React.Fragment>
        ))}
      </Box>
    </SectionLayout>
  );
}

