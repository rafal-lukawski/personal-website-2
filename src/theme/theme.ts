import { createTheme, responsiveFontSizes } from "@mui/material/styles";
import { grey } from "@mui/material/colors";

declare module "@mui/material/styles" {
  interface TypographyVariants {
    footerLink: React.CSSProperties;
    body3: React.CSSProperties;
  }

  interface TypographyVariantsOptions {
    footerLink?: React.CSSProperties;
    body3?: React.CSSProperties;
  }
}

declare module "@mui/material/Typography" {
  interface TypographyPropsVariantOverrides {
    footerLink: true;
    body3: true;
  }
}

let theme = createTheme({
  cssVariables: {
    colorSchemeSelector: "class",
  },
  colorSchemes: {
    light: {
      palette: {
        background: {
          default: grey[100],
          paper: "#ffffff",
        },
        text: {
          primary: grey[900],
          secondary: grey[700],
        },
        divider: grey[300],
      },
    },
    dark: {
      palette: {
        background: {
          default: grey[900],
          paper: "#2a2a2a",
        },
        text: {
          primary: grey[100],
          secondary: grey[400],
        },
        divider: grey[700],
      },
    },
  },
  typography: {
    fontFamily: "var(--font-geist-sans), Arial, sans-serif",
    h3: {
      fontFamily: "var(--font-geist-mono), monospace",
      fontWeight: 700,
      letterSpacing: ".2rem",
      color: "var(--mui-palette-text-primary)",
    },
    h4: {
      fontFamily: "var(--font-geist-mono), monospace",
      fontWeight: 700,
      letterSpacing: ".2rem",
      color: "var(--mui-palette-text-primary)",
    },
    h5: {
      fontFamily: "var(--font-geist-mono), monospace",
      fontWeight: 700,
      color: "var(--mui-palette-text-primary)",
    },
    h6: {
      fontWeight: 700,
      color: "var(--mui-palette-text-primary)",
    },
    body1: {
      color: "var(--mui-palette-text-secondary)",
      lineHeight: 1.4,
      fontSize: "1rem",
    },
    body2: {
      color: "var(--mui-palette-text-secondary)",
      fontSize: "0.9rem",
      lineHeight: 1.4,
    },
    body3: {
      color: "var(--mui-palette-text-secondary)",
      fontSize: "0.7rem",
      lineHeight: 1.4,
    },
    footerLink: {
      color: "var(--mui-palette-text-secondary)",
      fontSize: "0.9rem",
      lineHeight: 1.5,
      whiteSpace: "nowrap",
    },
    button: {
      textTransform: "none",
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
        },
      },
    },
    MuiTypography: {
      styleOverrides: {
        body1: ({ theme: t }) => ({
          [t.breakpoints.up("md")]: {
            fontSize: "1.1rem",
          },
        }),
        body2: ({ theme: t }) => ({
          [t.breakpoints.up("md")]: {
            fontSize: "1rem",
          },
        }),
        // Custom variant — adjust responsive sizing based on ownerState
        root: ({ ownerState, theme: t }) =>
          ownerState.variant === "body3"
            ? {
                [t.breakpoints.up("md")]: {
                  fontSize: "0.8rem",
                },
              }
            : {},
      },
    },
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundColor: "var(--mui-palette-background-default)",
          color: "var(--mui-palette-text-primary)",
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          color: "inherit",
        },
      },
    },
  },
});

theme = responsiveFontSizes(theme);

export default theme;
