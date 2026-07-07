"use client";

import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import IconButton from "@mui/material/IconButton";
import { grey } from "@mui/material/colors";
import Image from "next/image";
import CloseIcon from "@mui/icons-material/Close";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { FaExternalLinkAlt } from "react-icons/fa";
import { SectionLayout } from "./SectionLayout";
import { Project } from "./types";
import { useTranslations } from "next-intl";

const projectsData: Project[] = [
  {
    id: "mediaflip",
    url: "https://mediaflip.io",
    customer: "Rafał Łukawski",
    screenshots: [
      {
        id: "screen1",
        src: "/mediaflip-1.png",
        alt: "",
        sourceUrl: "mediaflip.io",
      },
      {
        id: "screen2",
        src: "/mediaflip-2.png",
        alt: "",
        sourceUrl: "mediaflip.io/pl/stos-technologiczny",
      },
      {
        id: "screen5",
        src: "/mediaflip-5.png",
        alt: "",
        sourceUrl: "mediaflip.io/pl/generator",
      },
    ],
  },
  {
    id: "egzoclinic",
    url: undefined,
    customer: { display: "EGZOTech.com", url: "https://egzotech.com" },
    screenshots: [
      {
        id: "screen1",
        src: "/egzoclinic-5.png",
        alt: "",
        sourceUrl: "egzotech.com",
      },
      {
        id: "screen2",
        src: "/egzoclinic-2.png",
        alt: "",
        sourceUrl: "egzotech.com",
      },
      {
        id: "screen3",
        src: "/egzoclinic-3.png",
        alt: "",
        sourceUrl: "egzotech.com",
      },
      {
        id: "screen4",
        src: "/egzoclinic-4.png",
        alt: "",
        sourceUrl: "egzotech.com",
      },
    ],
  },
  {
    id: "generator",
    url: "https://generator-paskow.pl",
    customer: "Rafał Łukawski",
    screenshots: [
      {
        id: "screen1",
        src: "/generator-1.png",
        alt: "",
        sourceUrl: "generator-paskow.pl",
      },
      {
        id: "screen2",
        src: "/generator-2.png",
        alt: "",
        sourceUrl: "generator-paskow.pl",
      },
    ],
  },
  {
    id: "stella",
    url: "https://app.egzotech.com",
    customer: { display: "EGZOTech.com", url: "https://egzotech.com" },
    screenshots: [
      {
        id: "screen1",
        src: "/stella-app_login-page.png",
        alt: "",
        sourceUrl: "egzotech.com",
      },
      {
        id: "screen2",
        src: "/stella-app_emg-program.png",
        alt: "",
        sourceUrl: "egzotech.com",
      },
    ],
  },
  {
    id: "multibenefit",
    url: undefined,
    customer: {
      display: "Benefit Systems",
      url: "https://www.benefitsystems.pl/",
    },
    screenshots: [
      {
        id: "screen1",
        src: "/multi-1.png",
        alt: "",
        sourceUrl: "web.archive.org",
      },
      {
        id: "screen2",
        src: "/multi-2.png",
        alt: "",
        sourceUrl: "web.archive.org",
      },
    ],
  },
];

export function ProjectsSection() {
  const t = useTranslations("projects");
  const [selectedProjectId, setSelectedProjectId] = React.useState<
    string | null
  >(null);
  const [selectedScreenshotIndex, setSelectedScreenshotIndex] = React.useState<
    number | null
  >(null);

  // Merge translations with project data
  const projects = projectsData.map((project) => ({
    ...project,
    title: t(`${project.id}.title`),
    dateRange: t(`${project.id}.dateRange`),
    description: t(`${project.id}.description`),
    customer:
      typeof project.customer === "object"
        ? { ...project.customer, display: t(`${project.id}.customer`) }
        : t(`${project.id}.customer`),
    screenshots: project.screenshots.map((screen) => ({
      ...screen,
      alt: t(`${project.id}.screenshots.${screen.id}.alt`),
    })),
  }));

  const handleScreenshotClick = (projectId: string, index: number) => {
    setSelectedProjectId(projectId);
    setSelectedScreenshotIndex(index);
  };

  const handleCloseDialog = React.useCallback(() => {
    setSelectedProjectId(null);
    setSelectedScreenshotIndex(null);
  }, []);

  const handlePrevious = React.useCallback(() => {
    if (selectedProjectId !== null && selectedScreenshotIndex !== null) {
      const project = projects.find((p) => p.id === selectedProjectId);
      if (project) {
        const newIndex =
          selectedScreenshotIndex > 0
            ? selectedScreenshotIndex - 1
            : project.screenshots.length - 1;
        setSelectedScreenshotIndex(newIndex);
      }
    }
  }, [selectedProjectId, selectedScreenshotIndex, projects]);

  const handleNext = React.useCallback(() => {
    if (selectedProjectId !== null && selectedScreenshotIndex !== null) {
      const project = projects.find((p) => p.id === selectedProjectId);
      if (project) {
        const newIndex =
          selectedScreenshotIndex < project.screenshots.length - 1
            ? selectedScreenshotIndex + 1
            : 0;
        setSelectedScreenshotIndex(newIndex);
      }
    }
  }, [selectedProjectId, selectedScreenshotIndex, projects]);

  // Handle keyboard navigation
  React.useEffect(() => {
    if (selectedScreenshotIndex === null || selectedProjectId === null) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        handlePrevious();
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        handleNext();
      } else if (e.key === "Escape") {
        handleCloseDialog();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [
    selectedScreenshotIndex,
    selectedProjectId,
    handlePrevious,
    handleNext,
    handleCloseDialog,
  ]);

  const selectedProject =
    selectedProjectId !== null
      ? projects.find((p) => p.id === selectedProjectId)
      : null;
  const selectedScreenshot =
    selectedProject && selectedScreenshotIndex !== null
      ? selectedProject.screenshots[selectedScreenshotIndex]
      : null;

  return (
    <SectionLayout title={t("title")} id="projects">
      <Box sx={{ display: "flex", flexDirection: "column", gap: 4 }}>
        {projects.map((project, index) => (
          <Box
            key={project.id}
            sx={{
              display: "grid",
              gridTemplateColumns: { xs: "1fr", md: "1fr auto" },
              gap: { xs: 3, md: 4 },
              pb: index < projects.length - 1 ? 4 : 0,
              borderBottom:
                index < projects.length - 1 ? `1px solid ${grey[300]}` : "none",
            }}
          >
            {/* Left side: Project info */}
            <Box sx={{ display: "flex", flexDirection: "column" }}>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: 1,
                  mb: 0.5,
                }}
              >
                <Typography
                  variant="h5"
                  component="h3"
                  sx={{
                    lineHeight: 1.2,
                  }}
                >
                  {project.title}
                </Typography>
                {project.url && (
                  <Link
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    sx={{
                      color: grey[600],
                      "&:hover": {
                        color: grey[800],
                      },
                      textDecoration: "none",
                      fontSize: "0.9rem",
                      mt: 0.5,
                      display: "inline-flex",
                      alignItems: "center",
                    }}
                  >
                    <FaExternalLinkAlt />
                  </Link>
                )}
              </Box>
              <Typography
                variant="body1"
                sx={
                  {
                    // mb: 0.5,
                  }
                }
              >
                {project.dateRange}
              </Typography>
              {project.customer && (
                <Typography
                  variant="body2"
                  sx={{
                    color: grey[700],
                    mb: 2,
                  }}
                >
                  <Box component="span" sx={{ fontWeight: 600 }}>
                    {t("customer")}:{" "}
                  </Box>
                  {typeof project.customer === "object" ? (
                    <Link
                      href={project.customer.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      sx={{
                        color: grey[700],
                        textDecoration: "underline",
                        "&:hover": {
                          color: grey[900],
                        },
                      }}
                    >
                      {project.customer.display}
                    </Link>
                  ) : (
                    <Box component="span">{project.customer}</Box>
                  )}
                </Typography>
              )}
              <Typography variant="body2">{project.description}</Typography>
            </Box>

            {/* Right side: Thumbnail */}
            {project.screenshots.length > 0 && (
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Box
                  component="button"
                  onClick={() => handleScreenshotClick(project.id, 0)}
                  sx={{
                    position: "relative",
                    width: { xs: 220, md: 300 },
                    height: "auto",
                    cursor: "pointer",
                    border: `2px solid ${grey[300]}`,
                    borderRadius: 2,
                    overflow: "hidden",
                    backgroundColor: grey[50],
                    p: 0.5,
                    // border: '1px solid red',
                    transition: "all 0.2s ease",
                    "&:hover": {
                      borderColor: grey[400],
                      boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
                      transform: "scale(1.02)",
                    },
                  }}
                >
                  <Image
                    src={project.screenshots[0].src}
                    alt={project.screenshots[0].alt}
                    title={project.screenshots[0].alt}
                    width={400}
                    height={300}
                    style={{
                      width: "100%",
                      height: "auto",
                      display: "block",
                      borderRadius: 4,
                    }}
                    unoptimized
                  />
                </Box>
              </Box>
            )}
          </Box>
        ))}
      </Box>

      {/* Gallery Dialog */}
      <Dialog
        open={selectedScreenshotIndex !== null && selectedProject !== null}
        onClose={handleCloseDialog}
        maxWidth="lg"
        fullWidth
        PaperProps={{
          sx: {
            backgroundColor: "white",
            maxHeight: "90vh",
            position: "relative",
          },
        }}
      >
        {selectedProject &&
          selectedScreenshot &&
          selectedScreenshotIndex !== null && (
            <>
              <IconButton
                onClick={handleCloseDialog}
                sx={{
                  position: "absolute",
                  top: 8,
                  right: 8,
                  zIndex: 10,
                  backgroundColor: "white",
                  boxShadow: "0 2px 8px rgba(0, 0, 0, 0.15)",
                  "&:hover": {
                    backgroundColor: grey[100],
                    transform: "scale(1.1)",
                  },
                }}
              >
                <CloseIcon />
              </IconButton>

              <DialogContent
                sx={{
                  p: 4,
                  position: "relative",
                  minHeight: 200,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {/* Left navigation arrow */}
                {selectedProject.screenshots.length > 1 && (
                  <IconButton
                    onClick={handlePrevious}
                    sx={{
                      position: "absolute",
                      left: 16,
                      top: "50%",
                      transform: "translateY(-50%)",
                      zIndex: 10,
                      backgroundColor: "white",
                      boxShadow: "0 2px 8px rgba(0, 0, 0, 0.15)",
                      "&:hover": {
                        backgroundColor: grey[100],
                        transform: "translateY(-50%) scale(1.1)",
                      },
                    }}
                  >
                    <ChevronLeftIcon />
                  </IconButton>
                )}

                {/* Image */}
                <Box
                  sx={{
                    width: "100%",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <Box
                    component="img"
                    key={selectedScreenshotIndex}
                    src={selectedScreenshot.src}
                    alt={selectedScreenshot.alt}
                    title={selectedScreenshot.alt}
                    sx={{
                      maxWidth: "100%",
                      maxHeight: "70vh",
                      width: "auto",
                      height: "auto",
                      borderRadius: 2,
                      display: "block",
                      objectFit: "contain",
                    }}
                  />

                  {/* Source */}
                  {selectedScreenshot.sourceUrl && (
                    <Typography
                      variant="body2"
                      sx={{
                        mt: 2,
                        textAlign: "right",
                        width: "100%",
                        fontSize: "0.85rem",
                      }}
                    >
                      {t("source")}: {selectedScreenshot.sourceUrl}
                    </Typography>
                  )}
                </Box>

                {/* Right navigation arrow */}
                {selectedProject.screenshots.length > 1 && (
                  <IconButton
                    onClick={handleNext}
                    sx={{
                      position: "absolute",
                      right: 16,
                      top: "50%",
                      transform: "translateY(-50%)",
                      zIndex: 10,
                      backgroundColor: "white",
                      boxShadow: "0 2px 8px rgba(0, 0, 0, 0.15)",
                      "&:hover": {
                        backgroundColor: grey[100],
                        transform: "translateY(-50%) scale(1.1)",
                      },
                    }}
                  >
                    <ChevronRightIcon />
                  </IconButton>
                )}
              </DialogContent>
            </>
          )}
      </Dialog>
    </SectionLayout>
  );
}
