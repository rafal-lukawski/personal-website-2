import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { TRANSITION_TIMEOUT } from "./AnimatedHamburger";
import { ReactNode } from "react";

interface SectionLayoutProps {
  title: string;
  children: ReactNode;
  subtitle?: string;
}

export function SectionLayout({ title, children, subtitle, id }: SectionLayoutProps & { id?: string }) {
  return (
    <Box
      id={id}
      component="section"
      sx={{
        width: "100%",
        py: { xs: 4, md: 6 },
        display: "flex",
        justifyContent: "center",
        scrollMarginTop: "64px",
      }}
    >
      <Container maxWidth="xl" sx={{ paddingX: 0 }}>
        <Box
          sx={(theme) => ({
            backgroundColor: "background.paper",
            border: "1px solid rgba(255, 255, 255, 0.3)",
            p: { xs: 3, md: 4 },
            transition: `all ${TRANSITION_TIMEOUT}ms ease`,
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
            "&:hover": {
              boxShadow: "0 12px 40px 0 rgba(31, 38, 135, 0.2)",
            },
            ...theme.applyStyles("dark", {
              border: "1px solid rgba(255, 255, 255, 0.08)",
              boxShadow: "0 4px 12px rgba(0, 0, 0, 0.4)",
              "&:hover": {
                boxShadow: "0 12px 40px 0 rgba(0, 0, 0, 0.45)",
              },
            }),
          })}
        >
          <Typography
            variant="h4"
            component="h2"
            sx={{
              mb: 3
            }}
          >
            {title}
          </Typography>
          {subtitle && (
            <Typography
              variant="body2"
              sx={{
                mb: 4,
                fontSize: { xs: "0.9rem", md: "1rem" },
              }}
            >
              {subtitle}
            </Typography>
          )}
          {children}
        </Box>
      </Container>
    </Box>
  );
}

