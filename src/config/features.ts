/**
 * Build-time switches for sections that are written but not published yet.
 * Deliberately plain constants rather than env vars: flipping one is a code
 * change that goes through review, and the hidden section stays type-checked.
 */

/** The "by the numbers" panel between the hero and the profile. */
export const SHOW_STATS_PANEL: boolean = false;
