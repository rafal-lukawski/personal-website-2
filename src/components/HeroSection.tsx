"use client";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import Image from "next/image";
import { useTranslations } from "next-intl";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import { scrollToSection } from "@/hooks/useScrollSpy";

export function HeroSection() {
  const t = useTranslations("hero");

  return (
    <Box
      id="hero"
      sx={{
        width: "100%",
        py: { xs: 4, md: 6 },
        mt: { xs: 6, md: 6 },
        scrollMarginTop: "48px",
      }}
    >
      <Container maxWidth="xl">
        <Box sx={{ mb: 3, textAlign: "center" }}>
          <Typography
            variant="body2"
            sx={{
              fontStyle: "italic",
              fontWeight: 400,
              color: "text.disabled",
              fontSize: { xs: "0.875rem", md: "0.95rem" },
              lineHeight: 1.2,
            }}
          >
            {t("mottoLine1")}
          </Typography>
          <Typography
            variant="body2"
            sx={{
              fontStyle: "italic",
              fontWeight: 400,
              color: "text.disabled",
              fontSize: { xs: "0.875rem", md: "0.95rem" },
              lineHeight: 1.2,
            }}
          >
            {t("mottoLine2")}
          </Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            alignItems: { xs: "center", md: "center" },
            justifyContent: "space-evenly",
            gap: { xs: 3, md: 4 },
          }}
        >
          <Box sx={{ textAlign: { xs: "center", md: "left" } }}>
            <Typography
              variant="h3"
              component="h1"
              sx={{
                mb: 1,
              }}
            >
              {t("name")}
            </Typography>
            <Typography
              variant="h5"
              component="h2"
              sx={{
                color: "text.secondary",
                fontWeight: 400,
                mb: 2,
              }}
            >
              {t("title")}
            </Typography>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1,
                pl: { xs: 0, md: 2 },
                justifyContent: { xs: "center", md: "flex-start" },
              }}
            >
              <Box
                sx={{
                  width: 8,
                  height: 8,
                  borderRadius: "50%",
                  backgroundColor: "#22c55e",
                  flexShrink: 0,
                }}
              />
              <Typography
                variant="h6"
                component="p"
                sx={{
                  color: "text.primary",
                  fontWeight: 600,
                }}
              >
                {t("tagline")}
              </Typography>
            </Box>
            <Box
              sx={{
                pl: { xs: 0, md: 2 },
                mt: 4,
                display: "flex",
                justifyContent: { xs: "center", md: "flex-start" },
              }}
            >
              <Button
                variant="contained"
                onClick={() => scrollToSection("contact")}
                startIcon={<MailOutlineIcon />}
                sx={{
                  px: 3,
                  py: 1.5,
                  fontSize: "1rem",
                  fontWeight: 600,
                  textTransform: "none",
                  borderRadius: 2,
                  boxShadow: 3,
                  "&:hover": {
                    boxShadow: 4,
                  },
                }}
              >
                {t("contactMe")}
              </Button>
            </Box>
          </Box>

          <Box
            sx={{
              width: 230,
              height: 230,
              position: "relative",
              overflow: "hidden",
              flexShrink: 0,
              boxShadow: "0 4px 12px rgba(0, 0, 0, 0.25)",
              transition: "box-shadow 0.3s ease, transform 0.3s ease",
              "&:hover": {
                boxShadow: "0 8px 24px rgba(0, 0, 0, 0.35)",
              },
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            <Image
              src="/author.jpg"
              alt="Rafał Łukawski"
              fill
              style={{ objectFit: "cover" }}
              priority
            />

            {/* <Box sx={{ aspectRatio: "16/9", width: "100%", display: "flex" }}>
              <iframe
                width="100%"
                src="https://www.youtube.com/embed/kMqArTOAEVQ?si=79JRN0P1CibtWsPP"
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen={true}
              ></iframe>
            </Box> */}
            {/* <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Typography variant="body3" component="span">
                {t("videoDescriptionLine1")}
              </Typography>
              <Typography variant="body3" component="span">
                {t("videoDescriptionLine2")}
              </Typography>
            </Box> */}
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
