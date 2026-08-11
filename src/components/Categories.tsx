import { Box, BoxProps, Chip, Typography } from "@mui/material";
import { IconType } from "react-icons";

interface TechItem {
  name: string;
  icon?: IconType;
  emoji?: string;
  color: string;
  /** Render the emoji in its native colors instead of grayscale. */
  colorEmoji?: boolean;
}

interface TechCategory {
  title: string;
  items: TechItem[];
}

export const Categories = (props: {
  categories: TechCategory[];
  template?: BoxProps["gridTemplateColumns"];
  orientation?: "row" | "column";
}) => {
  const {
    categories,
    template = {
      xs: "1fr",
      sm: "repeat(2, 1fr)",
      md: "repeat(4, 1fr)",
    },
    orientation = "column",
  } = props;
  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: template,
        gap: 4,
      }}
    >
      {categories.map((category) => (
        <Box key={category.title}>
          <Typography
            variant="h6"
            component="h3"
            sx={{
              mb: 2,
              fontWeight: 600,
              whiteSpace: "nowrap",
            }}
          >
            {category.title}
          </Typography>
          <Box
            sx={{
              display: "flex",
              flexDirection: orientation,
              gap: 1,
            }}
          >
            {category.items.map((item) => {
              const Icon = item.icon;
              return (
                <Chip
                  key={item.name}
                  icon={
                    item.emoji ? (
                      <Box
                        component="span"
                        sx={{
                          fontSize: "0.94rem",
                          marginLeft: "8px",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontWeight: "bold",
                          color: item.color,
                          filter: item.colorEmoji ? "none" : "grayscale(1)",
                          minWidth: "0.94rem",
                        }}
                      >
                        {item.emoji}
                      </Box>
                    ) : Icon ? (
                      <Icon
                        style={{
                          color: item.color,
                          fontSize: "0.94rem",
                          marginLeft: "8px",
                        }}
                      />
                    ) : undefined
                  }
                  label={item.name}
                  sx={{
                    justifyContent: "flex-start",
                    fontSize: "0.875rem",
                    backgroundColor: "action.hover",
                    color: "text.primary",
                    "& .MuiChip-icon": {
                      marginRight: "4px",
                    },
                  }}
                />
              );
            })}
          </Box>
        </Box>
      ))}
    </Box>
  );
};
