"use client";

import Image from "next/image";
import { useCallback, useEffect, useMemo, useState, type FormEvent } from "react";
import { motion } from "framer-motion";
import { useLocale, useTranslations } from "next-intl";
import { usePathname } from "@/i18n/routing";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import LinkMui from "@mui/material/Link";
import { FaEnvelope, FaExternalLinkAlt, FaGithub, FaLinkedin } from "react-icons/fa";
import { socialLinks } from "@/config/socials";
import { certificatesData, projectsData, stackCategories } from "./content";
import { hud } from "./theme";
import {
  BarLink,
  CatalogThemeProvider,
  CornerTicks,
  Cursor,
  GalleryChip,
  Glitch,
  HudButton,
  HudCard,
  HudField,
  HudLink,
  LangLink,
  LightboxDialog,
  NavFab,
  Page,
  BarMeta,
  Panel,
  PanelBar,
  PanelBody,
  PanelStamps,
  Particles,
  ProcessDots,
  Root,
  SectionLabel,
  ShotButton,
  ShotMeta,
  ShotThumb,
  SkipLink,
  glow,
  scanlines,
  StatusBadge,
  TopBar,
} from "./ui";

const copy = {
  pl: {
    prototype: "prototyp",
    current: "obecna wersja",
    active: "aktywny",
    skip: "Przejdź do treści",
    moduleIdentity: "[MODULE: IDENTITY_CORE]",
    moduleProjects: "PROJECT_FEED",
    moduleStack: "[MODULE: TECH_STACK]",
    moduleCerts: "[MODULE: CERTIFICATE_DB]",
    terminalAbout: "[MODULE: PROFILE_DATA]",
    terminalContact: "[MODULE: CONTACT_NODE]",
    credentials: "poświadczenie",
    gallery: "galeria",
    openProject: "otwórz projekt",
    close: "zamknij",
    previous: "poprzedni slajd",
    next: "następny slajd",
  },
  en: {
    prototype: "prototype",
    current: "live site",
    active: "active",
    skip: "Skip to content",
    moduleIdentity: "IDENTITY_CORE",
    moduleProjects: "PROJECT_FEED",
    moduleStack: "TECH_STACK",
    moduleCerts: "CERTIFICATE_DB",
    terminalAbout: "ABOUT_ME",
    terminalContact: "CONTACT_ME",
    credentials: "credential",
    gallery: "gallery",
    openProject: "open project",
    close: "close",
    previous: "previous slide",
    next: "next slide",
  },
} as const;

const socialIcons = {
  LinkedIn: FaLinkedin,
  GitHub: FaGithub,
  Email: FaEnvelope,
} as const;

const particles = [
  { x: 12, y: 20, size: 2.5 },
  { x: 24, y: 42, size: 2 },
  { x: 44, y: 26, size: 2.2 },
  { x: 58, y: 46, size: 2.4 },
  { x: 72, y: 20, size: 2.1 },
  { x: 86, y: 40, size: 2.4 },
] as const;

const particleLines = [
  [12, 20, 24, 42],
  [24, 42, 44, 26],
  [44, 26, 58, 46],
  [58, 46, 72, 20],
  [72, 20, 86, 40],
  [24, 42, 58, 46],
] as const;

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  return reduced;
}

function Typewriter({ text, enabled }: { text: string; enabled: boolean }) {
  const [shown, setShown] = useState(enabled ? "" : text);

  useEffect(() => {
    if (!enabled) {
      setShown(text);
      return;
    }

    setShown("");
    let i = 0;
    const id = window.setInterval(() => {
      i += 1;
      setShown(text.slice(0, i));
      if (i >= text.length) window.clearInterval(id);
    }, 11);

    return () => window.clearInterval(id);
  }, [text, enabled]);

  return (
    <>
      {shown}
      <Cursor aria-hidden />
    </>
  );
}

function HeroParticleNetwork() {
  return (
    <Particles viewBox="0 0 100 60" preserveAspectRatio="none" aria-hidden>
      {particleLines.map(([x1, y1, x2, y2], idx) => (
        <line key={`${x1}-${idx}`} x1={x1} y1={y1} x2={x2} y2={y2} />
      ))}
      {particles.map((node, idx) => (
        <circle key={`${node.x}-${idx}`} cx={node.x} cy={node.y} r={node.size / 2} />
      ))}
    </Particles>
  );
}

function StackCard({ title, items }: { title: string; items: readonly string[] }) {
  return (
    <HudCard>
      <Typography
        component="h3"
        sx={{
          m: 0,
          mb: "9px",
          font: `500 11px/1.2 ${hud.mono}`,
          letterSpacing: "0.1em",
          textTransform: "uppercase",
          color: hud.cyan,
        }}
      >
        {title}
      </Typography>
      <Box component="ul" sx={{ m: 0, p: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: "4px" }}>
        {items.map((item) => (
          <Box component="li" key={item} sx={{ fontSize: "0.89rem" }}>
            {item}
          </Box>
        ))}
      </Box>
    </HudCard>
  );
}

export function Catalog() {
  const locale = useLocale() as "pl" | "en";
  const ui = copy[locale] ?? copy.en;
  const tHero = useTranslations("hero");
  const tAbout = useTranslations("about");
  const tTech = useTranslations("technologies");
  const tPm = useTranslations("projectManagement");
  const tProjects = useTranslations("projects");
  const tCerts = useTranslations("certificates");
  const tContact = useTranslations("contact");
  const tFooter = useTranslations("footer");
  const pathname = usePathname();
  const reducedMotion = usePrefersReducedMotion();
  const aboutText = useMemo(
    () => `${tAbout("paragraph1")}\n\n${tAbout("paragraph2")}`,
    [tAbout, locale],
  );

  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [lightbox, setLightbox] = useState<{ projectId: string; index: number } | null>(null);

  const projects = useMemo(
    () =>
      projectsData.map((project, idx) => ({
        ...project,
        title: tProjects(`${project.id}.title`),
        dateRange: tProjects(`${project.id}.dateRange`),
        screenshots: project.screenshots.map((screen) => ({
          ...screen,
          alt: tProjects(`${project.id}.screenshots.${screen.id}.alt`),
        })),
        buildStamp: `STAMP: 2024_PROJ_${String(idx + 1).padStart(2, "0")}`,
      })),
    [tProjects],
  );

  const activeProject = lightbox ? projects.find((p) => p.id === lightbox.projectId) : null;
  const activeShot = activeProject && lightbox ? activeProject.screenshots[lightbox.index] : null;

  const openLightbox = useCallback((projectId: string, index = 0) => {
    setLightbox({ projectId, index });
  }, []);

  const closeLightbox = useCallback(() => setLightbox(null), []);
  const stepLightbox = useCallback(
    (dir: -1 | 1) => {
      setLightbox((current) => {
        if (!current) return current;
        const project = projects.find((item) => item.id === current.projectId);
        if (!project) return current;
        const length = project.screenshots.length;
        return { projectId: current.projectId, index: (current.index + dir + length) % length };
      });
    },
    [projects],
  );

  useEffect(() => {
    if (!lightbox) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "ArrowLeft") {
        event.preventDefault();
        stepLightbox(-1);
      }
      if (event.key === "ArrowRight") {
        event.preventDefault();
        stepLightbox(1);
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [lightbox, stepLightbox]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus("submitting");
    const form = event.currentTarget;
    const formData = new FormData(form);

    try {
      const response = await fetch("https://formspree.io/f/xldargao", {
        method: "POST",
        body: formData,
        headers: { Accept: "application/json" },
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

  const year = new Date().getFullYear();
  const submitState = status === "success" || status === "error" ? status : undefined;

  return (
    <CatalogThemeProvider>
      <Root>
        <SkipLink href="#about">{ui.skip}</SkipLink>

        <TopBar>
          <Stack direction="row" alignItems="center" spacing="14px">
            <Box component="span" sx={{ color: hud.cyan }}>
              RL
            </Box>
            <Box component="span" sx={{ display: { xs: "none", sm: "inline" } }}>
              {ui.prototype}
            </Box>
          </Stack>
          <Stack direction="row" alignItems="center" spacing="14px">
            <BarLink href="/" locale={locale}>
              {ui.current}
            </BarLink>
            <Stack direction="row" spacing="2px">
              {(["pl", "en"] as const).map((code) => (
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

        <Page id="top">
          <Box
            component="section"
            id="hero"
            sx={{
              position: "relative",
              mb: "20px",
              background: hud.surface,
              backdropFilter: "blur(12px)",
            }}
          >
            <CornerTicks />
            <PanelBar>
              <span>{ui.moduleIdentity}</span>
              <Stack direction="row" alignItems="center" spacing="10px">
                <BarMeta>LOC: 52.2297 / 21.0122</BarMeta>
                <ProcessDots />
              </Stack>
            </PanelBar>
            <PanelStamps left="SYS_LOAD: 24%" right="UPLINK: STABLE" />
            <Box
              sx={{
                position: "relative",
                display: "grid",
                gridTemplateColumns: { xs: "1fr", sm: "minmax(0, 1fr) auto" },
                gap: { xs: "20px", sm: "40px" },
                p: "20px 20px 26px",
                textAlign: { xs: "center", sm: "left" },
              }}
            >
            <HeroParticleNetwork />
            <Box sx={{ position: "relative", zIndex: 1 }}>
              <Box sx={{ mb: "12px", display: "flex", justifyContent: { xs: "center", sm: "flex-start" } }}>
                <StatusBadge>{ui.active}</StatusBadge>
              </Box>
              <Glitch>
                {tHero("name")}
              </Glitch>
              <Typography sx={{ mt: "14px", mb: 0, color: hud.muted, fontSize: "1.04rem" }}>{tHero("title")}</Typography>
              <Typography sx={{ mt: "10px", mb: 0, fontSize: "0.98rem" }}>{tHero("tagline")}</Typography>
              <Typography
                sx={{
                  mt: 2,
                  mb: 0,
                  maxWidth: "36em",
                  mx: { xs: "auto", sm: 0 },
                  color: hud.dim,
                  fontSize: "0.9rem",
                  fontStyle: "italic",
                  lineHeight: 1.45,
                }}
              >
                {tHero("mottoLine1")} {tHero("mottoLine2")}
              </Typography>
              <Box sx={{ mt: "20px", display: "flex", justifyContent: { xs: "center", sm: "flex-start" } }}>
                <HudButton href="#contact">{tHero("contactMe")}</HudButton>
              </Box>
            </Box>

            <Box
              sx={{
                position: "relative",
                width: { xs: 180, sm: 220 },
                height: { xs: 180, sm: 220 },
                zIndex: 1,
                mx: { xs: "auto", sm: 0 },
                p: "20px",
              }}
            >
              <Typography
                sx={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  m: 0,
                  font: `500 8px/1 ${hud.mono}`,
                  letterSpacing: "0.1em",
                  color: hud.dim,
                  textTransform: "uppercase",
                }}
              >
                X:014.20
              </Typography>
              <Typography
                sx={{
                  position: "absolute",
                  top: 0,
                  right: 0,
                  m: 0,
                  font: `500 8px/1 ${hud.mono}`,
                  letterSpacing: "0.1em",
                  color: hud.dim,
                  textTransform: "uppercase",
                }}
              >
                Y:008.80
              </Typography>
              <Typography
                sx={{
                  position: "absolute",
                  bottom: 0,
                  left: 0,
                  m: 0,
                  font: `500 8px/1 ${hud.mono}`,
                  letterSpacing: "0.1em",
                  color: hud.dim,
                  textTransform: "uppercase",
                }}
              >
                RNG:2.40
              </Typography>
              <Typography
                sx={{
                  position: "absolute",
                  bottom: 0,
                  right: 0,
                  m: 0,
                  font: `500 8px/1 ${hud.mono}`,
                  letterSpacing: "0.1em",
                  color: hud.dim,
                  textTransform: "uppercase",
                }}
              >
                LOCK:OK
              </Typography>
              <Box
                sx={{
                  position: "relative",
                  height: "100%",
                  overflow: "hidden",
                  bgcolor: hud.bg,
                  "& img": { width: "100%", height: "100%", objectFit: "cover", filter: "contrast(1.07) saturate(0.88)" },
                }}
              >
                <CornerTicks animated />
                <Box
                  aria-hidden
                  sx={{
                    position: "absolute",
                    inset: 0,
                    zIndex: 2,
                    pointerEvents: "none",
                    backgroundImage: scanlines(0.13),
                  }}
                />
                <Box
                  aria-hidden
                  sx={{
                    position: "absolute",
                    inset: "18%",
                    zIndex: 3,
                    pointerEvents: "none",
                    "&::before, &::after": {
                      content: '""',
                      position: "absolute",
                      background: hud.cyan,
                    },
                    "&::before": { left: "50%", top: -6, bottom: -6, width: 1, transform: "translateX(-50%)", opacity: 0.3 },
                    "&::after": { top: "50%", left: -6, right: -6, height: 1, transform: "translateY(-50%)", opacity: 0.3 },
                  }}
                >
                  <CornerTicks size={12} animated />
                </Box>
                <Image src="/author.jpg" alt="Rafał Łukawski" width={440} height={440} priority />
                {!reducedMotion && (
                  <Box
                    component={motion.span}
                    aria-hidden
                    sx={{
                      position: "absolute",
                      left: 0,
                      right: 0,
                      height: "28%",
                      zIndex: 2,
                      pointerEvents: "none",
                      background: "linear-gradient(to bottom, transparent, rgba(0, 242, 255, 0.28), transparent)",
                    }}
                    initial={{ top: "-20%" }}
                    animate={{ top: ["-20%", "85%"] }}
                    transition={{ duration: 5.6, repeat: Infinity, ease: "easeInOut" }}
                  />
                )}
              </Box>
            </Box>
            </Box>
          </Box>

          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: { xs: "1fr", lg: "minmax(0, 1fr) minmax(300px, 360px)" },
              gap: "20px",
            }}
          >
            <Stack spacing="20px">
              <Panel id="about">
                <PanelBar>
                  <span>{ui.terminalAbout}</span>
                  <Stack direction="row" alignItems="center" spacing="10px">
                    <BarMeta>PID: 0x41</BarMeta>
                    <ProcessDots />
                  </Stack>
                </PanelBar>
                <PanelStamps left="ENC: UTF-8" right="BUF: OK" />
                <PanelBody>
                  <Typography
                    sx={{
                      m: 0,
                      color: hud.muted,
                      fontFamily: hud.mono,
                      letterSpacing: "0.01em",
                      lineHeight: 1.54,
                      fontSize: "0.95rem",
                      whiteSpace: "pre-line",
                    }}
                  >
                    <Typewriter text={aboutText} enabled={!reducedMotion} />
                  </Typography>
                </PanelBody>
              </Panel>

              <Panel id="stack">
                <PanelBar>
                  <span>{ui.moduleStack}</span>
                  <Stack direction="row" alignItems="center" spacing="10px">
                    <BarMeta>NODES: 8</BarMeta>
                    <ProcessDots />
                  </Stack>
                </PanelBar>
                <PanelStamps left="SYS_LOAD: 24%" right="SYNC: OK" />
                <PanelBody>
                  <Box
                    sx={{
                      display: "grid",
                      gridTemplateColumns: { xs: "1fr", sm: "repeat(3, minmax(0, 1fr))" },
                      gap: "20px",
                    }}
                  >
                    {stackCategories.map((category) => (
                      <StackCard key={category.titleKey} title={tTech(category.titleKey)} items={category.items} />
                    ))}
                  </Box>
                  <Box
                    sx={{
                      display: "grid",
                      gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" },
                      gap: "20px",
                      mt: "20px",
                    }}
                  >
                    <StackCard title={tPm("methodologies")} items={["Scrum", "Kanban", "Waterfall"]} />
                    <StackCard title={tPm("tools")} items={["Jira", "Confluence", "GitHub", "Asana"]} />
                  </Box>
                </PanelBody>
              </Panel>

              <Panel id="certificates">
                <PanelBar>
                  <span>{ui.moduleCerts}</span>
                  <Stack direction="row" alignItems="center" spacing="10px">
                    <BarMeta>REC: 02</BarMeta>
                    <ProcessDots />
                  </Stack>
                </PanelBar>
                <PanelStamps left="VERIFY: PASS" right="CHK: 0xA7" />
                <PanelBody>
                  <Box
                    sx={{
                      display: "grid",
                      gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" },
                      gap: "20px",
                    }}
                  >
                    {certificatesData.map((cert) => (
                      <LinkMui
                        key={cert.nameKey}
                        href={cert.validationLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        underline="none"
                        color="inherit"
                        sx={{
                          position: "relative",
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                          textAlign: "center",
                          p: "20px",
                          background: hud.sunken,
                          backdropFilter: "blur(12px)",
                          "&:hover": { boxShadow: glow(hud.cyan, 0.8) },
                          "&:focus-visible": { outline: `2px solid ${hud.cyan}`, outlineOffset: 2 },
                        }}
                      >
                        <CornerTicks size={12} />
                        <Box
                          sx={{
                            position: "relative",
                            width: 94,
                            height: 94,
                            mb: "20px",
                            display: "grid",
                            placeItems: "center",
                          }}
                        >
                          <CornerTicks size={12} />
                          <Image src={cert.customIcon} alt="" width={64} height={64} />
                        </Box>
                        <Typography component="strong" sx={{ fontSize: "0.87rem", lineHeight: 1.24, fontWeight: 700 }}>
                          {tCerts(`items.${cert.nameKey}.name`)}
                        </Typography>
                        <Typography
                          component="span"
                          sx={{
                            mt: "4px",
                            color: hud.muted,
                            font: `500 10px/1.3 ${hud.mono}`,
                            letterSpacing: "0.06em",
                          }}
                        >
                          {tCerts(`items.${cert.nameKey}.issuer`)} · {ui.credentials}
                        </Typography>
                      </LinkMui>
                    ))}
                  </Box>
                </PanelBody>
              </Panel>

              <Panel id="contact">
                <PanelBar>
                  <span>{ui.terminalContact}</span>
                  <Stack direction="row" alignItems="center" spacing="10px">
                    <BarMeta>CH: SECURE</BarMeta>
                    <ProcessDots />
                  </Stack>
                </PanelBar>
                <PanelStamps left="LOC: 52.2297 / 21.0122" right="TX: READY" />
                <PanelBody
                  sx={{
                    display: "grid",
                    gridTemplateColumns: { xs: "1fr", sm: "1fr 1.1fr" },
                    gap: "20px",
                  }}
                >
                  <Box>
                    <Stack spacing="20px">
                      {socialLinks.map((social) => {
                        const Icon = socialIcons[social.name as keyof typeof socialIcons] ?? FaEnvelope;
                        return (
                          <HudLink
                            key={social.name}
                            href={social.url}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <Icon />
                            {social.name}
                          </HudLink>
                        );
                      })}
                    </Stack>
                  </Box>

                  <Box>
                    <SectionLabel>{tContact("sendMessage")}</SectionLabel>
                    <Box component="form" onSubmit={handleSubmit} sx={{ display: "flex", flexDirection: "column", gap: "20px" }}>
                      <HudField id="tc-name" name="name" label={tContact("form.name")} required fullWidth InputLabelProps={{ shrink: true }} />
                      <HudField
                        id="tc-email"
                        name="email"
                        type="email"
                        label={tContact("form.email")}
                        required
                        fullWidth
                        InputLabelProps={{ shrink: true }}
                      />
                      <HudField
                        id="tc-message"
                        name="message"
                        label={tContact("form.message")}
                        required
                        fullWidth
                        multiline
                        minRows={5}
                        InputLabelProps={{ shrink: true }}
                      />
                      <Box>
                        <HudButton type="submit" disabled={status === "submitting"} data-state={submitState}>
                          {status === "submitting"
                            ? tContact("form.sending")
                            : status === "success"
                              ? tContact("form.sent")
                              : status === "error"
                                ? tContact("form.error")
                                : tContact("form.send")}
                        </HudButton>
                      </Box>
                      <Box aria-live="polite" aria-atomic="true" sx={{ minHeight: "1.2em" }}>
                        {status === "success" && (
                          <Typography sx={{ m: 0, font: `500 0.81rem/1.3 ${hud.mono}`, color: hud.ok }}>
                            {tContact("form.successMessage")}
                          </Typography>
                        )}
                        {status === "error" && (
                          <Typography sx={{ m: 0, font: `500 0.81rem/1.3 ${hud.mono}`, color: hud.danger }}>
                            {tContact("form.errorMessage")}
                          </Typography>
                        )}
                      </Box>
                    </Box>
                  </Box>
                </PanelBody>
              </Panel>
            </Stack>

            <Box
              component="aside"
              id="projects"
              sx={{ position: { lg: "sticky" }, top: { lg: hud.headerH + 12 }, alignSelf: { lg: "start" } }}
            >
              <Panel scan>
                <PanelBar>
                  <span>{ui.moduleProjects}</span>
                  <Stack direction="row" alignItems="center" spacing="10px">
                    <BarMeta>FEED: LIVE</BarMeta>
                    <ProcessDots />
                  </Stack>
                </PanelBar>
                <PanelStamps left="IDX: 06" right="RX: 100%" />
                <PanelBody>
                  <Stack direction="row" alignItems="baseline" justifyContent="space-between" sx={{ mb: "10px" }}>
                    <Typography
                      component="h2"
                      sx={{
                        m: 0,
                        fontFamily: hud.mono,
                        fontSize: "0.86rem",
                        letterSpacing: "0.15em",
                        textTransform: "uppercase",
                        color: hud.cyan,
                        textShadow: `0 0 8px ${hud.cyan}40`,
                      }}
                    >
                      {tProjects("title")}
                    </Typography>
                    <Typography sx={{ color: hud.dim, font: `500 11px/1 ${hud.mono}` }}>0{projects.length}</Typography>
                  </Stack>
                  <Box
                    sx={{
                      display: { xs: "grid", lg: "block" },
                      gridTemplateColumns: { xs: "1fr", sm: "repeat(2, minmax(0, 1fr))", lg: "none" },
                      gap: { xs: "20px", lg: 0 },
                    }}
                  >
                    {projects.map((project, idx) => (
                      <Box key={project.id} component="article" sx={{ mb: { xs: 0, lg: "20px" }, "&:last-child": { mb: 0 } }}>
                        <ShotButton
                          type="button"
                          aria-label={`${ui.gallery} ${project.title}`}
                          onClick={() => openLightbox(project.id)}
                        >
                          <ShotMeta stamp={project.buildStamp} index={String(idx + 1).padStart(2, "0")} />
                          <Image src={project.screenshots[0].src} alt={project.screenshots[0].alt} width={640} height={400} />
                        </ShotButton>
                        <Stack direction="row" justifyContent="space-between" alignItems="baseline" spacing={1} sx={{ mt: "7px" }}>
                          <Typography component="h3" sx={{ m: 0, fontSize: "0.92rem" }}>
                            {project.title}
                          </Typography>
                          <Stack direction="row" alignItems="center" spacing={1}>
                            <GalleryChip
                              type="button"
                              onClick={() => openLightbox(project.id)}
                              aria-label={`${ui.gallery} ${project.title}`}
                            >
                              {ui.gallery}
                              <span>{project.screenshots.length}</span>
                            </GalleryChip>
                            {project.url && (
                              <LinkMui
                                href={project.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label={`${ui.openProject}: ${project.title}`}
                                color="inherit"
                                sx={{
                                  color: hud.muted,
                                  "&:hover": { color: hud.cyan },
                                  "&:focus-visible": { outline: `2px solid ${hud.cyan}`, outlineOffset: 2 },
                                }}
                              >
                                <FaExternalLinkAlt size={11} />
                              </LinkMui>
                            )}
                          </Stack>
                        </Stack>
                        <Typography sx={{ mt: "2px", mb: 0, color: hud.dim, font: `500 10px/1.3 ${hud.mono}`, letterSpacing: "0.04em" }}>
                          {project.dateRange}
                        </Typography>
                      </Box>
                    ))}
                  </Box>
                </PanelBody>
              </Panel>
            </Box>
          </Box>

          <Stack
            direction="row"
            justifyContent="space-between"
            spacing={1.5}
            sx={{
              position: "relative",
              mt: "40px",
              pt: "20px",
              color: hud.dim,
              font: `500 10.5px/1.4 ${hud.mono}`,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              "&::before": {
                content: '""',
                position: "absolute",
                left: 0,
                right: 0,
                top: 0,
                height: 1,
                background: `linear-gradient(90deg, transparent, ${hud.cyan}80, transparent)`,
              },
            }}
          >
            <span>{tFooter("copyright", { year })}</span>
            <BarLink href="/" locale={locale}>
              {ui.current}
            </BarLink>
          </Stack>
        </Page>

        <LightboxDialog
          open={Boolean(activeProject && activeShot && lightbox)}
          onClose={closeLightbox}
          aria-labelledby="tc-lightbox-title"
          aria-describedby={activeShot?.sourceUrl ? "tc-lightbox-caption" : undefined}
        >
          {activeProject && activeShot && lightbox && (
            <Box sx={{ position: "relative", px: { xs: 5, sm: 6 } }}>
              <Typography id="tc-lightbox-title" sx={{ position: "absolute", width: 1, height: 1, overflow: "hidden", clip: "rect(0 0 0 0)" }}>
                {ui.gallery} {activeProject.title}
              </Typography>
              <Typography
                sx={{
                  m: 0,
                  mb: "10px",
                  mr: "48px",
                  textAlign: "right",
                  color: hud.dim,
                  font: `500 10px/1 ${hud.mono}`,
                  letterSpacing: "0.1em",
                }}
                aria-live="polite"
              >
                {String(lightbox.index + 1).padStart(2, "0")} / {String(activeProject.screenshots.length).padStart(2, "0")}
              </Typography>
              <Box sx={{ position: "relative" }}>
                <CornerTicks />
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <Box
                  component="img"
                  src={activeShot.src}
                  alt={activeShot.alt}
                  sx={{
                    display: "block",
                    maxWidth: "100%",
                    maxHeight: "78vh",
                  }}
                />
              </Box>
              {activeShot.sourceUrl && (
                <Typography
                  id="tc-lightbox-caption"
                  component="figcaption"
                  sx={{ mt: "10px", textAlign: "right", color: hud.muted, font: `500 10px/1.2 ${hud.mono}` }}
                >
                  {tProjects("source")}: {activeShot.sourceUrl}
                </Typography>
              )}
              {activeProject.screenshots.length > 1 && (
                <Stack direction="row" flexWrap="wrap" spacing={1} useFlexGap sx={{ mt: "20px" }}>
                  {activeProject.screenshots.map((shot, idx) => (
                    <ShotThumb
                      key={shot.id}
                      type="button"
                      data-active={idx === lightbox.index}
                      aria-label={`${ui.gallery} ${idx + 1} / ${activeProject.screenshots.length}`}
                      onClick={() => setLightbox({ projectId: activeProject.id, index: idx })}
                    >
                      <Image src={shot.src} alt={shot.alt} width={120} height={75} />
                    </ShotThumb>
                  ))}
                </Stack>
              )}
              <NavFab aria-label={ui.close} onClick={closeLightbox} sx={{ top: 0, right: 0 }}>
                ×
              </NavFab>
              {activeProject.screenshots.length > 1 && (
                <>
                  <NavFab aria-label={ui.previous} onClick={() => stepLightbox(-1)} sx={{ left: 0, top: "50%", transform: "translateY(-50%)" }}>
                    ‹
                  </NavFab>
                  <NavFab aria-label={ui.next} onClick={() => stepLightbox(1)} sx={{ right: 0, top: "50%", transform: "translateY(-50%)" }}>
                    ›
                  </NavFab>
                </>
              )}
            </Box>
          )}
        </LightboxDialog>
      </Root>
    </CatalogThemeProvider>
  );
}
