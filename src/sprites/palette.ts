/** Color tables for the pixel-art sprites. Each entry is [base, shadow]. */
export type Shade = readonly [string, string];

export const SKIN_TONES: Record<string, Shade> = {
  Clara: ['#f5d0b0', '#d9a988'],
  Média: ['#e0ac7e', '#bf885c'],
  Morena: ['#b97a4f', '#94593a'],
  Escura: ['#7a4a2e', '#5a3420'],
};

export const HAIR_COLORS: Record<string, Shade> = {
  Preto: ['#2e2636', '#18121d'],
  Castanho: ['#6b3e22', '#4a2914'],
  Loiro: ['#e8c35a', '#b8912f'],
  Ruivo: ['#c8502a', '#8f3518'],
  Grisalho: ['#bdbdc6', '#8a8a94'],
};

export const OUTFIT_COLORS: Record<string, Shade> = {
  Cinza: ['#8a8f98', '#62666e'],
  Azul: ['#3f6fd8', '#2c4ea0'],
  Verde: ['#3f9e5a', '#2b7040'],
  Vermelho: ['#d04a4a', '#962f2f'],
  Preto: ['#3a3a44', '#24242c'],
};

export const PANTS_BY_OUTFIT: Record<string, Shade> = {
  Casual: ['#3c5a8a', '#2a3f63'],
  Esportivo: ['#2f2f38', '#1f1f26'],
  Militar: ['#5a5f3c', '#3e422a'],
  Urbano: ['#2f2f38', '#1f1f26'],
};

/** Fixed colors shared by every sprite. Lowercase letters are usually the
 * shadow of the matching uppercase one. */
export const BASE_PALETTE: Record<string, string> = {
  K: '#1a1420',
  E: '#1a1420',
  W: '#f4f4f4',
  M: '#8a3b3b',
  c: '#e8939a',
  B: '#3b2a22',
  Y: '#f2c14e',
  y: '#c48a1c',
  R: '#d94a4a',
  r: '#9e2f2f',
  V: '#7b4bd1',
  v: '#55308f',
  X: '#fff3a3',
  L: '#7fc8ff',
  N: '#7a4e2d',
  n: '#55331c',
  D: '#34343f',
  d: '#22222b',
  G: '#9aa0ab',
  g: '#6c717c',
  F: '#3f9e5a',
  f: '#2b7040',
};
