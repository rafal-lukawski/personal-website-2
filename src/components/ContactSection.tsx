"use client";

import { useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Link from "@mui/material/Link";
import Alert from "@mui/material/Alert";
import { SectionLayout } from "./SectionLayout";
import { socialLinks } from "@/config/socials";
import { useTranslations } from "next-intl";
import { useTheme } from "@mui/material/styles";

export function ContactSection() {
  const t = useTranslations("contact");
  const theme = useTheme();
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("submitting");

    const form = e.currentTarget;
    const formData = new FormData(form);

    try {
      const response = await fetch("https://formspree.io/f/xldargao", {
        method: "POST",
        body: formData,
        headers: {
          Accept: "application/json",
        },
      });

      if (response.ok) {
        setStatus("success");
        form.reset();
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  return (
    <SectionLayout title={t("title")} id="contact">
      <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" }, gap: 8 }}>
        {/* Contact Information */}
        <Box>
          <Typography variant="h6" component="h3" sx={{ mb: 3 }}>
            {t("getInTouch")}
          </Typography>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            {socialLinks.map((social) => {
              const Icon = social.icon;
              
              return (
                <Box key={social.name} sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                  <Icon size={24} color={theme.palette.text.secondary} />
                  <Link
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    underline="hover"
                    sx={{ color: "primary.main", fontSize: "1rem" }}
                  >
                    {social.name}
                  </Link>
                </Box>
              );
            })}
          </Box>
        </Box>

        {/* Contact Form */}
        <Box>
          <Typography variant="h6" component="h3" sx={{ mb: 3 }}>
            {t("sendMessage")}
          </Typography>
          <form onSubmit={handleSubmit}>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
              <TextField
                label={t("form.name")}
                name="name"
                variant="outlined"
                fullWidth
                required
              />
              <TextField
                label={t("form.email")}
                name="email"
                type="email"
                variant="outlined"
                fullWidth
                required
              />
              <TextField
                label={t("form.message")}
                name="message"
                variant="outlined"
                multiline
                rows={4}
                fullWidth
                required
              />
              <Button
                type="submit"
                variant="contained"
                disabled={status === "submitting"}
                sx={{
                  py: 1.5,
                  textTransform: "none",
                  fontSize: "1rem",
                  backgroundColor: status === "success" ? "success.main" : "primary.main",
                  "&:hover": {
                    backgroundColor: status === "success" ? "success.dark" : "primary.dark",
                  },
                }}
              >
                {status === "submitting"
                  ? t("form.sending")
                  : status === "success"
                  ? t("form.sent")
                  : status === "error"
                  ? t("form.error")
                  : t("form.send")}
              </Button>
              {status === "success" && (
                <Alert severity="success">{t("form.successMessage")}</Alert>
              )}
              {status === "error" && (
                <Alert severity="error">{t("form.errorMessage")}</Alert>
              )}
            </Box>
          </form>
        </Box>
      </Box>
    </SectionLayout>
  );
}

