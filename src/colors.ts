
/**
 * Turns number triplet into an rgb formatted color.
 */
export function rgb(r: number, g: number, b: number): string {
  return `rgb(${r}, ${g}, ${b})`;
}

/**
 * RGB number triplet.
 */
export type N3 = [number, number, number];

/**
 * Color palette for sessions participants.
 */
export const COLORS: string[] = ([
  [79, 195, 247],
  [139, 195, 74],
  [255, 213, 79],
  [255, 112, 67],
  [186, 104, 200],
  [240, 98, 146],
  [77, 182, 172],
  [112, 123, 211],
  [239, 83, 80],
  [141, 110, 99],
] as N3[]).map((c) => rgb(...c));

/**
 * Fallback session participant color.
 */
export const FALLBACK_COLOR: string = rgb(127, 127, 127);
