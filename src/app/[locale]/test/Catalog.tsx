"use client";

import Image from "next/image";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/routing";
import { FaEnvelope, FaExternalLinkAlt, FaGithub, FaLinkedin } from "react-icons/fa";
import { socialLinks } from "@/config/socials";
import { certificatesData, projectsData, stackCategories } from "./content";

const copy = {
  pl: {
    prototype: "prototyp",
    current: "obecna wersja",
    active: "aktywny",
    skip: "Przejdź do treści",
    moduleProjects: "[MODULE: PROJECT_FEED]",
    moduleStack: "[MODULE: TECH_STACK]",
    moduleCerts: "[MODULE: CERTIFICATE_DB]",
    terminalAbout: "ABOUT.EXE",
    terminalContact: "CONTACT.EXE",
    credentials: "poświadczenie",
  },
  en: {
    prototype: "prototype",
    current: "live site",
    active: "active",
    skip: "Skip to content",
    moduleProjects: "[MODULE: PROJECT_FEED]",
    moduleStack: "[MODULE: TECH_STACK]",
    moduleCerts: "[MODULE: CERTIFICATE_DB]",
    terminalAbout: "ABOUT.EXE",
    terminalContact: "CONTACT.EXE",
    credentials: "credential",
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

function Typewriter({
  text,
  enabled,
  onDone,
}: {
  text: string;
  enabled: boolean;
  onDone?: () => void;
}) {
  const [shown, setShown] = useState(enabled ? "" : text);

  useEffect(() => {
    if (!enabled) {
      setShown(text);
      onDone?.();
      return;
    }

    setShown("");
    let i = 0;
    const id = window.setInterval(() => {
      i += 1;
      setShown(text.slice(0, i));
      if (i >= text.length) {
        window.clearInterval(id);
        onDone?.();
      }
    }, 11);

    return () => window.clearInterval(id);
  }, [text, enabled, onDone]);

  return (
    <>
      {shown}
      <span className="tc-cursor" aria-hidden />
    </>
  );
}

function CornerTicks() {
  return (
    <>
      <span className="tc-corner tl" />
      <span className="tc-corner tr" />
      <span className="tc-corner bl" />
      <span className="tc-corner br" />
    </>
  );
}

function ProcessDots() {
  return (
    <div className="tc-dots" aria-hidden>
      <span />
      <span />
      <span />
    </div>
  );
}

function HeroParticleNetwork() {
  return (
    <svg className="tc-particles" viewBox="0 0 100 60" preserveAspectRatio="none" aria-hidden>
      {particleLines.map(([x1, y1, x2, y2], idx) => (
        <line key={`${x1}-${idx}`} x1={x1} y1={y1} x2={x2} y2={y2} />
      ))}
      {particles.map((node, idx) => (
        <circle key={`${node.x}-${idx}`} cx={node.x} cy={node.y} r={node.size / 2} />
      ))}
    </svg>
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
  const [aboutDone, setAboutDone] = useState(reducedMotion);
  const markAboutDone = useCallback(() => setAboutDone(true), []);

  useEffect(() => {
    setAboutDone(reducedMotion);
  }, [locale, reducedMotion]);

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

  const closeLightbox = useCallback(() => setLightbox(null), []);
  const stepLightbox = useCallback(
    (dir: -1 | 1) => {
      if (!lightbox) return;
      const project = projects.find((item) => item.id === lightbox.projectId);
      if (!project) return;
      const length = project.screenshots.length;
      setLightbox({ projectId: lightbox.projectId, index: (lightbox.index + dir + length) % length });
    },
    [lightbox, projects],
  );

  useEffect(() => {
    if (!lightbox) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeLightbox();
      if (event.key === "ArrowLeft") stepLightbox(-1);
      if (event.key === "ArrowRight") stepLightbox(1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [lightbox, closeLightbox, stepLightbox]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
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

  return (
    <>
      <a className="tc-skip" href="#about">
        {ui.skip}
      </a>

      <header className="tc-bar">
        <div className="tc-bar-left">
          <span className="tc-bar-mark">RL</span>
          <span>{ui.prototype}</span>
        </div>
        <div className="tc-bar-right">
          <a href={`/${locale}`}>{ui.current}</a>
          <div className="tc-lang">
            {(["pl", "en"] as const).map((code) => (
              <Link key={code} href={pathname} locale={code} aria-current={locale === code ? "true" : undefined}>
                {code}
              </Link>
            ))}
          </div>
        </div>
      </header>

      <main className="tc-page" id="top">
        <section className="tc-hero" id="hero">
          <HeroParticleNetwork />
          <div className="tc-identity">
            <div className="tc-kicker">
              <span className="tc-badge">
                <i />
                {ui.active}
              </span>
            </div>
            <h1 className="tc-name tc-glitchable">{tHero("name")}</h1>
            <p className="tc-role">{tHero("title")}</p>
            <p className="tc-tagline">{tHero("tagline")}</p>
            <p className="tc-motto">
              {tHero("mottoLine1")} {tHero("mottoLine2")}
            </p>
            <div className="tc-cta">
              <a className="tc-btn" href="#contact">
                {tHero("contactMe")}
              </a>
            </div>
          </div>

          <div className="tc-portrait">
            <div className="tc-portrait-frame">
              <CornerTicks />
              <Image src="/author.jpg" alt="Rafał Łukawski" width={440} height={440} priority />
              <span className="tc-scan" />
            </div>
            <div className="tc-portrait-base" />
          </div>
        </section>

        <div className="tc-shell">
          <div className="tc-main">
            <section className="tc-panel" id="about">
              <div className="tc-panel-bar">
                <span>{ui.terminalAbout}</span>
                <ProcessDots />
              </div>
              <div className="tc-panel-body tc-about">
                <h2 className="tc-section-label">[MODULE: PROFILE_DATA]</h2>
                <p>
                  <Typewriter text={tAbout("paragraph1")} enabled={!reducedMotion} onDone={markAboutDone} />
                </p>
                {aboutDone && <p>{tAbout("paragraph2")}</p>}
              </div>
            </section>

            <section className="tc-panel" id="stack">
              <div className="tc-panel-bar">
                <span>{ui.moduleStack}</span>
                <ProcessDots />
              </div>
              <div className="tc-panel-body">
                <div className="tc-stack">
                  {stackCategories.map((category) => (
                    <article className="tc-card tc-glitchable" key={category.titleKey}>
                      <h3>{tTech(category.titleKey)}</h3>
                      <ul>
                        {category.items.map((item) => (
                          <li key={item}>{item}</li>
                        ))}
                      </ul>
                    </article>
                  ))}
                </div>
                <div className="tc-pm">
                  <article className="tc-card tc-glitchable">
                    <h3>{tPm("methodologies")}</h3>
                    <ul>
                      <li>Scrum</li>
                      <li>Kanban</li>
                      <li>Waterfall</li>
                    </ul>
                  </article>
                  <article className="tc-card tc-glitchable">
                    <h3>{tPm("tools")}</h3>
                    <ul>
                      <li>Jira</li>
                      <li>Confluence</li>
                      <li>GitHub</li>
                      <li>Asana</li>
                    </ul>
                  </article>
                </div>
              </div>
            </section>

            <section className="tc-panel" id="certificates">
              <div className="tc-panel-bar">
                <span>{ui.moduleCerts}</span>
                <ProcessDots />
              </div>
              <div className="tc-panel-body">
                <div className="tc-certs">
                  {certificatesData.map((cert) => (
                    <a key={cert.nameKey} className="tc-cert" href={cert.validationLink} target="_blank" rel="noopener noreferrer">
                      <div className="tc-cert-plate">
                        <span className="tc-cert-ring" />
                        <span className="tc-cert-glow" />
                        <Image src={cert.customIcon} alt="" width={64} height={64} />
                      </div>
                      <strong>{tCerts(`items.${cert.nameKey}.name`)}</strong>
                      <span>
                        {tCerts(`items.${cert.nameKey}.issuer`)} · {ui.credentials}
                      </span>
                    </a>
                  ))}
                </div>
              </div>
            </section>

            <section className="tc-panel" id="contact">
              <div className="tc-panel-bar">
                <span>{ui.terminalContact}</span>
                <ProcessDots />
              </div>
              <div className="tc-panel-body tc-contact">
                <div>
                  <h2 className="tc-section-label">[MODULE: CONTACT_NODE]</h2>
                  <div className="tc-socials">
                    {socialLinks.map((social) => {
                      const Icon = socialIcons[social.name as keyof typeof socialIcons] ?? FaEnvelope;
                      return (
                        <a key={social.name} className="tc-social" href={social.url} target="_blank" rel="noopener noreferrer">
                          <Icon />
                          {social.name}
                        </a>
                      );
                    })}
                  </div>
                </div>

                <div>
                  <h2 className="tc-section-label">{tContact("sendMessage")}</h2>
                  <form className="tc-form" onSubmit={handleSubmit}>
                    <div className="tc-field">
                      <label htmlFor="tc-name">{tContact("form.name")}</label>
                      <input id="tc-name" name="name" required />
                    </div>
                    <div className="tc-field">
                      <label htmlFor="tc-email">{tContact("form.email")}</label>
                      <input id="tc-email" name="email" type="email" required />
                    </div>
                    <div className="tc-field">
                      <label htmlFor="tc-message">{tContact("form.message")}</label>
                      <textarea id="tc-message" name="message" required />
                    </div>
                    <button
                      className="tc-btn"
                      type="submit"
                      disabled={status === "submitting"}
                      data-state={status === "success" || status === "error" ? status : undefined}
                    >
                      {status === "submitting"
                        ? tContact("form.sending")
                        : status === "success"
                          ? tContact("form.sent")
                          : status === "error"
                            ? tContact("form.error")
                            : tContact("form.send")}
                    </button>
                    {status === "success" && <p className="tc-form-msg ok">{tContact("form.successMessage")}</p>}
                    {status === "error" && <p className="tc-form-msg err">{tContact("form.errorMessage")}</p>}
                  </form>
                </div>
              </div>
            </section>
          </div>

          <aside className="tc-aside" id="projects">
            <div className="tc-panel tc-projects-panel">
              <div className="tc-panel-bar">
                <span>{ui.moduleProjects}</span>
                <ProcessDots />
              </div>
              <div className="tc-panel-body">
                <div className="tc-projects-head">
                  <h2>{tProjects("title")}</h2>
                  <span className="tc-count">0{projects.length}</span>
                </div>
                <div className="tc-projects-grid">
                  {projects.map((project, idx) => (
                    <article className="tc-project" key={project.id}>
                      <button type="button" className="tc-project-shot tc-glitchable" aria-label={project.title} onClick={() => setLightbox({ projectId: project.id, index: 0 })}>
                        <CornerTicks />
                        <span className="tc-shot-meta tc-shot-meta-top">VERSION: 2.0</span>
                        <span className="tc-shot-meta tc-shot-meta-bot">{project.buildStamp}</span>
                        <span className="tc-shot-meta tc-shot-meta-side">{String(idx + 1).padStart(2, "0")}</span>
                        <Image src={project.screenshots[0].src} alt={project.screenshots[0].alt} width={640} height={400} />
                      </button>
                      <div className="tc-project-meta">
                        <h3>{project.title}</h3>
                        {project.url && (
                          <a href={project.url} target="_blank" rel="noopener noreferrer" aria-label={project.title}>
                            <FaExternalLinkAlt size={11} />
                          </a>
                        )}
                      </div>
                      <p className="tc-project-date">{project.dateRange}</p>
                    </article>
                  ))}
                </div>
              </div>
            </div>
          </aside>
        </div>

        <div className="tc-foot">
          <span>{tFooter("copyright", { year })}</span>
          <a href={`/${locale}`}>{ui.current}</a>
        </div>
      </main>

      {activeProject && activeShot && lightbox && (
        <div className="tc-lightbox" role="dialog" aria-modal="true" aria-label={activeShot.alt} onClick={closeLightbox}>
          <figure onClick={(event) => event.stopPropagation()}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={activeShot.src} alt={activeShot.alt} />
            {activeShot.sourceUrl && (
              <figcaption>
                {tProjects("source")}: {activeShot.sourceUrl}
              </figcaption>
            )}
          </figure>
          <div className="tc-lightbox-ui">
            <button type="button" className="tc-lb-close" onClick={closeLightbox} aria-label="Close">
              ×
            </button>
            {activeProject.screenshots.length > 1 && (
              <>
                <button type="button" className="tc-lb-prev" onClick={() => stepLightbox(-1)} aria-label="Previous">
                  ‹
                </button>
                <button type="button" className="tc-lb-next" onClick={() => stepLightbox(1)} aria-label="Next">
                  ›
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}
