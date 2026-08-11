import * as React from "react";
import Box from "@mui/material/Box";

const TRANSITION_TIMEOUT = 200;

interface AnimatedHamburgerProps {
  isOpen: boolean;
}

export function AnimatedHamburger({ isOpen }: AnimatedHamburgerProps) {
  return (
    <Box
      sx={{
        width: 24,
        height: 18,
        position: "relative",
        color: "text.primary",
      }}
    >
      <Box
        sx={{
          position: "absolute",
          top: isOpen ? "50%" : 0,
          left: 0,
          width: "100%",
          height: 2,
          backgroundColor: "currentColor",
          borderRadius: 1,
          transition: `all ${TRANSITION_TIMEOUT}ms ease-in-out`,
          transformOrigin: "center",
          transform: isOpen ? "translateY(-50%) rotate(45deg)" : "none",
        }}
      />
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: 0,
          width: "100%",
          height: 2,
          backgroundColor: "currentColor",
          borderRadius: 1,
          transition: `all ${TRANSITION_TIMEOUT}ms ease-in-out`,
          opacity: isOpen ? 0 : 1,
          transform: "translateY(-50%)",
        }}
      />
      <Box
        sx={{
          position: "absolute",
          top: isOpen ? "50%" : "100%",
          left: 0,
          width: "100%",
          height: 2,
          backgroundColor: "currentColor",
          borderRadius: 1,
          transition: `all ${TRANSITION_TIMEOUT}ms ease-in-out`,
          transformOrigin: "center",
          transform: isOpen
            ? "translateY(-50%) rotate(-45deg)"
            : "translateY(-100%)",
        }}
      />
    </Box>
  );
}

export { TRANSITION_TIMEOUT };














