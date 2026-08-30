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
import { ColorModeButton } from "@/components/ColorModeButton";
import { hud } from "@/theme/hud";
import { ParticleField } from "./ParticleField";
import { certificatesData, projectsData, stackCategories } from "./content";
import { emojiTints, hudTintColor, techIcons, tintFilterId } from "./techIcons";
import {
  CornerTicks,
  Cursor,
  PhosphorChar,
  EmojiTintFilters,
  GalleryChip,
  Glitch,
  HudButton,
  HudCard,
  HudField,
  HudFieldError,
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
  ProcessDots,
  Root,
  SectionLabel,
  ShotButton,
  ShotBg,
  ShotFg,
  ShotMeta,
  ShotThumb,
  SkipLink,
  glow,
  scanlines,
  StatusBadge,
  TopBar,
} from "./ui";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type ContactFields = { name: string; email: string; message: string };
type ContactErrors = Partial<Record<keyof ContactFields, string>>;

function readContactFields(form: HTMLFormElement): ContactFields {
  const data = new FormData(form);
  return {
    name: String(data.get("name") ?? ""),
    email: String(data.get("email") ?? ""),
    message: String(data.get("message") ?? ""),
  };
}

function validateContact(
  values: ContactFields,
  messages: { required: string; email: string },
): ContactErrors {
  const errors: ContactErrors = {};
  if (!values.name.trim()) errors.name = messages.required;
  const email = values.email.trim();
  if (!email) errors.email = messages.required;
  else if (!EMAIL_RE.test(email)) errors.email = messages.email;
  if (!values.message.trim()) errors.message = messages.required;
  return errors;
}

const socialIcons = {
  LinkedIn: FaLinkedin,
  GitHub: FaGithub,
  Email: FaEnvelope,
} as const;

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

function isPromptChar(text: string, i: number) {
  const ch = text[i];
  if (ch === ">" && (i === 0 || text[i - 1] === "\n")) return true;
  if (ch === " " && text[i - 1] === ">" && (i === 1 || text[i - 2] === "\n")) return true;
  return false;
}

function Typewriter({
  text,
  enabled,
  command,
  commandHref,
  commandLabel,
}: {
  text: string;
  enabled: boolean;
  command: string;
  commandHref: string;
  commandLabel: string;
}) {
  const [count, setCount] = useState(0);
  const commandStart = text.length - command.length;

  useEffect(() => {
    if (!enabled) return;

    let i = 0;
    const id = window.setInterval(() => {
      i += 1;
      setCount(i);
      if (i >= text.length) window.clearInterval(id);
    }, 11);

    return () => window.clearInterval(id);
  }, [text, enabled]);

  const shownCount = enabled ? Math.min(count, text.length) : text.length;
  const done = shownCount >= text.length;

  const renderChars = (from: number, to: number, extraSx?: object) =>
    text
      .slice(from, to)
      .split("")
      .map((ch, offset) => {
        const i = from + offset;
        const prompt = isPromptChar(text, i);
        const sx = {
          ...(prompt
            ? { color: `color-mix(in srgb, ${hud.ok} 62%, ${hud.muted})` }
            : undefined),
          ...extraSx,
        };
        return enabled ? (
          <PhosphorChar key={i} sx={sx}>
            {ch}
          </PhosphorChar>
        ) : (
          <Box key={i} component="span" sx={sx}>
            {ch}
          </Box>
        );
      });

  const bodyTo = Math.min(shownCount, commandStart);
  const commandTo = Math.max(commandStart, shownCount);

  return (
    <>
      <Box component="span" aria-hidden>
        {renderChars(0, bodyTo)}
      </Box>
      {shownCount > commandStart && (
        <Box
          component="a"
          href={commandHref}
          aria-label={commandLabel}
          sx={{
            color: hud.cyan,
            textDecoration: "none",
            cursor: "pointer",
            font: "inherit",
            letterSpacing: "0.06em",
            "&:hover": {
              textShadow: `0 0 8px ${hud.cyan}`,
              textDecoration: "underline",
              textUnderlineOffset: "3px",
            },
            "&:focus-visible": {
              outline: `2px solid ${hud.cyan}`,
              outlineOffset: 2,
            },
          }}
        >
          {renderChars(commandStart, commandTo)}
        </Box>
      )}
      <Cursor aria-hidden data-blink={done && enabled ? "true" : undefined} />
    </>
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
        {items.map((item) => {
          const meta = techIcons[item];
          const Icon = meta?.icon;
          return (
            <Box
              component="li"
              key={item}
              sx={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "0.89rem" }}
            >
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
              {item}
            </Box>
          );
        })}
      </Box>
    </HudCard>
  );
}

export function Catalog() {
  const locale = useLocale() as "pl" | "en";
  const tHud = useTranslations("hud");
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
  const aboutCommand = tAbout("contactCommand");
  const aboutBody = useMemo(
    () => `> ${tAbout("paragraph1")}\n\n> ${tAbout("paragraph2")}`,
    [tAbout, locale],
  );
  const aboutText = `${aboutBody}\n\n> ${aboutCommand}`;

  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errors, setErrors] = useState<ContactErrors>({});
  const [lightbox, setLightbox] = useState<{ projectId: string; index: number } | null>(null);
  const validationCopy = useMemo(
    () => ({
      required: tContact("form.errors.required"),
      email: tContact("form.errors.email"),
    }),
    [tContact],
  );

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
        statusLabel: tHud(`projectStatus.${project.status}`),
        buildStamp: `STAMP: 2024_PROJ_${String(idx + 1).padStart(2, "0")}`,
      })),
    [tProjects, tHud],
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

  const handleFormChange = (event: FormEvent<HTMLFormElement>) => {
    const form = event.currentTarget;
    if (status === "success" || status === "error") setStatus("idle");
    setErrors((current) => {
      if (!current.name && !current.email && !current.message) return current;
      return validateContact(readContactFields(form), validationCopy);
    });
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const nextErrors = validateContact(readContactFields(form), validationCopy);

    if (nextErrors.name || nextErrors.email || nextErrors.message) {
      setErrors(nextErrors);
      const first = (["name", "email", "message"] as const).find((key) => nextErrors[key]);
      if (first) (form.elements.namedItem(first) as HTMLElement | null)?.focus();
      return;
    }

    setErrors({});
    setStatus("submitting");
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
    <Root>
      <ParticleField />
      <EmojiTintFilters colors={emojiTints} />
      <SkipLink href="#about">{tHud("skip")}</SkipLink>

      <TopBar>
        <Stack direction="row" alignItems="center" spacing="14px">
          <Box component="span" sx={{ color: hud.cyan }}>
            RL
          </Box>
        </Stack>
        <Stack direction="row" alignItems="center" spacing="10px">
          <ColorModeButton />
          <Stack direction="row" alignItems="center" spacing="2px">
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
              backdropFilter: hud.blurSurface,
              WebkitBackdropFilter: hud.blurSurface,
            }}
          >
            <CornerTicks />
            <PanelBar>
              <span>{tHud("moduleIdentity")}</span>
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
            <Box sx={{ position: "relative", zIndex: 1, fontFamily: hud.mono }}>
              <Box sx={{ mb: "12px", display: "flex", justifyContent: { xs: "center", sm: "flex-start" } }}>
                <StatusBadge>{tHud("active")}</StatusBadge>
              </Box>
              <Glitch>
                {tHero("name")}
              </Glitch>
              <Typography
                aria-label={tHero("title")}
                sx={{
                  mt: "14px",
                  mb: 0,
                  color: hud.text,
                  font: `400 1.02rem/1.45 ${hud.mono}`,
                  letterSpacing: "0.02em",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: { xs: "center", sm: "flex-start" },
                  flexWrap: "wrap",
                  columnGap: "12px",
                  rowGap: "6px",
                }}
              >
                {tHero("title")
                  .split(" | ")
                  .map((part, idx) => (
                    <Box key={part} component="span" sx={{ display: "inline-flex", alignItems: "center", gap: "12px" }}>
                      {idx > 0 && (
                        <Box
                          component="span"
                          aria-hidden
                          sx={{
                            width: "2px",
                            height: "0.9em",
                            bgcolor: hud.cyan,
                            boxShadow: `0 0 8px ${hud.cyan}`,
                            flexShrink: 0,
                          }}
                        />
                      )}
                      {part}
                    </Box>
                  ))}
              </Typography>
              <Typography
                sx={{
                  mt: "10px",
                  mb: 0,
                  maxWidth: "42em",
                  mx: { xs: "auto", sm: 0 },
                  color: hud.dim,
                  font: `400 0.88rem/1.5 ${hud.mono}`,
                  letterSpacing: "0.01em",
                }}
              >
                <Box component="span" sx={{ display: "block" }}>
                  {tHero("mottoLine1")}
                </Box>
                <Box component="span" sx={{ display: "block" }}>
                  {tHero("mottoLine2")}
                </Box>
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
                      background: `linear-gradient(to bottom, transparent, color-mix(in srgb, ${hud.cyan} 28%, transparent), transparent)`,
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
            <Stack
              spacing="20px"
              useFlexGap
              sx={{ display: { xs: "contents", lg: "flex" } }}
            >
              <Panel id="about" sx={{ order: 1 }}>
                <PanelBar>
                  <span>{tHud("terminalAbout")}</span>
                  <Stack direction="row" alignItems="center" spacing="10px">
                    <BarMeta>PID: 0x41</BarMeta>
                    <ProcessDots />
                  </Stack>
                </PanelBar>
                <PanelStamps left="ENC: UTF-8" right="BUF: OK" />
                <PanelBody>
                  <Typography
                    component="div"
                    sx={{
                      position: "relative",
                      m: 0,
                      color: hud.muted,
                      fontFamily: hud.mono,
                      letterSpacing: "0.01em",
                      lineHeight: 1.54,
                      fontSize: "0.95rem",
                      whiteSpace: "pre-line",
                    }}
                  >
                    <Box
                      component="p"
                      sx={{
                        position: "absolute",
                        width: 1,
                        height: 1,
                        padding: 0,
                        margin: -1,
                        overflow: "hidden",
                        clip: "rect(0, 0, 0, 0)",
                        whiteSpace: "nowrap",
                        border: 0,
                      }}
                    >
                      {aboutBody}
                    </Box>
                    <Typewriter
                      key={aboutText}
                      text={aboutText}
                      enabled={!reducedMotion}
                      command={aboutCommand}
                      commandHref="#contact"
                      commandLabel={tHero("contactMe")}
                    />
                  </Typography>
                </PanelBody>
              </Panel>

              <Panel id="stack" sx={{ order: 3 }}>
                <PanelBar>
                  <span>{tHud("moduleStack")}</span>
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

              <Panel id="certificates" sx={{ order: 4 }}>
                <PanelBar>
                  <span>{tHud("moduleCerts")}</span>
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
                          backdropFilter: hud.blurChrome,
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
                          {tCerts(`items.${cert.nameKey}.issuer`)} · {tHud("credentials")}
                        </Typography>
                      </LinkMui>
                    ))}
                  </Box>
                </PanelBody>
              </Panel>

              <Panel id="contact" sx={{ order: 5 }}>
                <PanelBar>
                  <span>{tHud("terminalContact")}</span>
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
                    <Typography
                      sx={{
                        mt: 0,
                        mb: "20px",
                        color: hud.muted,
                        font: `400 0.95rem/1.45 ${hud.mono}`,
                        letterSpacing: "0.01em",
                      }}
                    >
                      {tHero("tagline")}
                    </Typography>
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
                    <Box
                      component="form"
                      noValidate
                      onSubmit={handleSubmit}
                      onChange={handleFormChange}
                      sx={{ display: "flex", flexDirection: "column", gap: "20px" }}
                    >
                      <Box>
                        <HudField
                          id="tc-name"
                          name="name"
                          label={tContact("form.name")}
                          required
                          fullWidth
                          error={Boolean(errors.name)}
                          inputProps={{ "aria-describedby": errors.name ? "tc-name-err" : undefined }}
                          InputLabelProps={{ shrink: true }}
                        />
                        {errors.name && <HudFieldError id="tc-name-err">{errors.name}</HudFieldError>}
                      </Box>
                      <Box>
                        <HudField
                          id="tc-email"
                          name="email"
                          type="email"
                          label={tContact("form.email")}
                          required
                          fullWidth
                          error={Boolean(errors.email)}
                          inputProps={{ "aria-describedby": errors.email ? "tc-email-err" : undefined }}
                          InputLabelProps={{ shrink: true }}
                        />
                        {errors.email && <HudFieldError id="tc-email-err">{errors.email}</HudFieldError>}
                      </Box>
                      <Box>
                        <HudField
                          id="tc-message"
                          name="message"
                          label={tContact("form.message")}
                          required
                          fullWidth
                          multiline
                          minRows={5}
                          error={Boolean(errors.message)}
                          inputProps={{ "aria-describedby": errors.message ? "tc-message-err" : undefined }}
                          InputLabelProps={{ shrink: true }}
                        />
                        {errors.message && <HudFieldError id="tc-message-err">{errors.message}</HudFieldError>}
                      </Box>
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
              sx={{
                order: 2,
                position: { lg: "sticky" },
                top: { lg: hud.headerH + 12 },
                alignSelf: { lg: "start" },
              }}
            >
              <Panel scan>
                <PanelBar>
                  <span>{tHud("moduleProjects")}</span>
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
                        textShadow: `0 0 8px color-mix(in srgb, ${hud.cyan} 25%, transparent)`,
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
                    {projects.map((project, idx) => {
                      const shot = project.screenshots[0];
                      return (
                      <Box key={project.id} component="article" sx={{ mb: { xs: 0, lg: "20px" }, "&:last-child": { mb: 0 } }}>
                        <ShotButton
                          type="button"
                          aria-label={`${tHud("gallery")} ${project.title}`}
                          onClick={() => openLightbox(project.id)}
                        >
                          <ShotMeta
                            status={project.statusLabel}
                            stamp={project.buildStamp}
                            index={String(idx + 1).padStart(2, "0")}
                          />
                          <ShotBg aria-hidden>
                            <Image src={shot.src} alt="" width={shot.width} height={shot.height} />
                          </ShotBg>
                          <ShotFg>
                            <Image src={shot.src} alt={shot.alt} width={shot.width} height={shot.height} />
                          </ShotFg>
                        </ShotButton>
                        <Stack direction="row" justifyContent="space-between" alignItems="baseline" spacing={1} sx={{ mt: "7px" }}>
                          <Stack direction="row" alignItems="center" spacing="8px" sx={{ minWidth: 0 }}>
                            <Typography component="h3" sx={{ m: 0, fontSize: "0.92rem" }}>
                              {project.title}
                            </Typography>
                            {project.url && (
                              <LinkMui
                                href={project.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label={`${tHud("openProject")}: ${project.title}`}
                                color="inherit"
                                sx={{
                                  display: "inline-flex",
                                  color: hud.muted,
                                  flexShrink: 0,
                                  "&:hover": { color: hud.cyan },
                                  "&:focus-visible": { outline: `2px solid ${hud.cyan}`, outlineOffset: 2 },
                                }}
                              >
                                <FaExternalLinkAlt size={11} />
                              </LinkMui>
                            )}
                          </Stack>
                          <GalleryChip
                            type="button"
                            onClick={() => openLightbox(project.id)}
                            aria-label={`${tHud("gallery")} ${project.title}`}
                          >
                            {tHud("gallery")}
                            <span>{project.screenshots.length}</span>
                          </GalleryChip>
                        </Stack>
                        <Typography sx={{ mt: "2px", mb: 0, color: hud.dim, font: `500 10px/1.3 ${hud.mono}`, letterSpacing: "0.04em" }}>
                          {project.dateRange}
                        </Typography>
                      </Box>
                      );
                    })}
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
                background: `linear-gradient(90deg, transparent, color-mix(in srgb, ${hud.cyan} 50%, transparent), transparent)`,
              },
            }}
          >
            <span>{tFooter("copyright", { year })}</span>
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
                {tHud("gallery")} {activeProject.title}
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
                      aria-label={`${tHud("gallery")} ${idx + 1} / ${activeProject.screenshots.length}`}
                      onClick={() => setLightbox({ projectId: activeProject.id, index: idx })}
                    >
                      <Image src={shot.src} alt={shot.alt} width={120} height={75} />
                    </ShotThumb>
                  ))}
                </Stack>
              )}
              <NavFab aria-label={tHud("close")} onClick={closeLightbox} sx={{ top: 0, right: 0 }}>
                ×
              </NavFab>
              {activeProject.screenshots.length > 1 && (
                <>
                  <NavFab aria-label={tHud("previous")} onClick={() => stepLightbox(-1)} sx={{ left: 0, top: "50%", transform: "translateY(-50%)" }}>
                    ‹
                  </NavFab>
                  <NavFab aria-label={tHud("next")} onClick={() => stepLightbox(1)} sx={{ right: 0, top: "50%", transform: "translateY(-50%)" }}>
                    ›
                  </NavFab>
                </>
              )}
            </Box>
          )}
        </LightboxDialog>
      </Root>
    );
}
