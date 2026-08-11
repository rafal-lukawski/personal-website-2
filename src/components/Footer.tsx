"use client";

import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Link from "@mui/material/Link";
import { FaArrowUp } from "react-icons/fa";
import { scrollToSection } from "@/hooks/useScrollSpy";
import { sections } from "@/config/navigation";
import { socialLinks } from "@/config/socials";
import { useTranslations } from "next-intl";

export function Footer() {
  const tNav = useTranslations("navigation");
  const tFooter = useTranslations("footer");
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    scrollToSection("hero");
  };

  return (
    <Box
      component="footer"
      sx={{
        mt: 12,
        mb: 4,
        borderTop: 1,
        borderColor: "divider",
        pt: 8,
        pb: 4,
      }}
    >
      <Container maxWidth="xl">
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            gap: { xs: 6, md: 10 },
            justifyContent: "center",
            mb: 4,
          }}
        >
          {/* Call to Action Section */}
          <Box sx={{ display: "flex", flexDirection: "column", alignItems: "flex-start", gap: 2 }}>
            <Typography variant="h4" component="h3">
              {tFooter("cta.line1")}{" "}
              <Box component="span" sx={{ color: "text.disabled" }}>
                {tFooter("cta.line2")}
              </Box>
            </Typography>
            <Button
              variant="contained"
              onClick={scrollToTop}
              startIcon={<FaArrowUp />}
              sx={{
                backgroundColor: "text.primary",
                color: "background.paper",
                textTransform: "none",
                mt: 3,
                px: 3,
                py: 1.5,
                "&:hover": {
                  backgroundColor: "text.secondary",
                },
              }}
            >
              {tFooter("cta.button")}
            </Button>
          </Box>

          {/* Links Group */}
          <Box sx={{ display: "flex", gap: { xs: 6, md: 10 } }}>
            {/* Sitemap Section */}
            <Box>
              <Typography variant="h6" component="h4" sx={{ mb: 2 }}>
                {tFooter("sitemap")}
              </Typography>
              <Box component="ul" sx={{ listStyle: "none", p: 0, m: 0, display: "flex", flexDirection: "column", gap: 1 }}>
                {sections.map((item) => (
                  <Box component="li" key={item.label}>
                    <Link
                      href={`#${item.id}`}
                      variant="footerLink"
                      underline="hover"
                      sx={{ cursor: "pointer" }}
                      onClick={(e) => {
                        e.preventDefault();
                        scrollToSection(item.id);
                      }}
                    >
                      <Typography variant="footerLink">{tNav(item.id)}</Typography>
                    </Link>
                  </Box>
                ))}
              </Box>
            </Box>

            {/* Socials Section */}
            <Box>
              <Typography variant="h6" component="h4" sx={{ mb: 2 }}>
                {tFooter("socials")}
              </Typography>
              <Box component="ul" sx={{ listStyle: "none", p: 0, m: 0, display: "flex", flexDirection: "column", gap: 1 }}>
                {socialLinks.map((social) => {
                  const Icon = social.icon;
                  return (
                    <Box component="li" key={social.name}>
                      <Link
                        href={social.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        underline="hover"
                        color="inherit"
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          gap: 1,
                        }}
                      >
                        <Icon />
                        <Typography variant="footerLink">{social.name}</Typography>
                      </Link>
                    </Box>
                  );
                })}
              </Box>
            </Box>
          </Box>
        </Box>

        {/* Copyright */}
        <Box sx={{ display: "flex", justifyContent: "flex-end", pt: 2 }}>
          <Typography variant="body2">
            {tFooter("copyright", { year: currentYear })}
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}

