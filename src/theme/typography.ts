export const fontSize = {
  xs: 12,
  sm: 14,
  md: 16,
  lg: 20,
  xl: 28,
  xxl: 36,
} as const;

export const fontWeight = {
  regular: '400',
  medium: '500',
  semibold: '600',
  bold: '700',
} as const;

export const lineHeight = {
  xs: 16,
  sm: 20,
  md: 22,
  lg: 26,
  xl: 34,
  xxl: 42,
} as const;

/** Pixel font loaded in the root layout. It runs wide, so it uses its own
 * smaller scale and is reserved for titles, labels and numbers. */
export const pixelFont = 'PressStart2P_400Regular';

export const pixelSize = {
  xs: 8,
  sm: 10,
  md: 12,
  lg: 16,
  xl: 22,
} as const;
