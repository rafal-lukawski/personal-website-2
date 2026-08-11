export const COLOR_MODE_COOKIE = "color-mode";
export const COLOR_MODE_STORAGE_KEY = "color-mode";

export type ColorModePreference = "light" | "dark" | "system";

export const DEFAULT_MODE: ColorModePreference = "system";

export function parseColorMode(
  value: string | undefined | null,
): ColorModePreference {
  if (value === "light" || value === "dark" || value === "system") {
    return value;
  }
  return DEFAULT_MODE;
}
