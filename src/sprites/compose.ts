import type { CharacterAppearance } from '../types/character';
import { BACKGROUNDS, type Pixels } from './backgrounds';
import { BASE_PALETTE, HAIR_COLORS, OUTFIT_COLORS, PANTS_BY_OUTFIT, SKIN_TONES } from './palette';
import {
  ACCESSORIES,
  BEARD,
  BODY,
  CAPES,
  EXPRESSIONS,
  EYES,
  HAIR_STYLES,
  HATS,
  OUTFITS,
  TOMBSTONE,
  type Layer,
} from './parts';

export type { Pixels };

export const SPRITE_SIZE = 32;

export interface EquippedCosmetics {
  hat?: string | null;
  cape?: string | null;
  background?: string | null;
}

function emptyPixels(): Pixels {
  return Array.from({ length: SPRITE_SIZE }, () => Array<string | null>(SPRITE_SIZE).fill(null));
}

function paint(target: Pixels, layer: Layer | undefined, palette: Record<string, string>) {
  if (!layer) return;
  const colors = layer.palette ? { ...palette, ...layer.palette } : palette;
  layer.rows.forEach((row, i) => {
    const y = layer.top + i;
    if (y < 0 || y >= SPRITE_SIZE) return;
    for (let x = 0; x < SPRITE_SIZE; x += 1) {
      const key = row[x];
      if (!key || key === '.') continue;
      const color = colors[key];
      if (color) target[y][x] = color;
    }
  });
}

/** Builds the full 32x32 color grid for a character, back to front. */
export function composeCharacter(appearance: CharacterAppearance, equipped: EquippedCosmetics = {}): Pixels {
  const skin = SKIN_TONES[appearance.skinTone] ?? SKIN_TONES.Clara;
  const hair = HAIR_COLORS[appearance.hairColor] ?? HAIR_COLORS.Preto;
  const outfit = OUTFIT_COLORS[appearance.outfitColor] ?? OUTFIT_COLORS.Cinza;
  const pants = PANTS_BY_OUTFIT[appearance.outfit] ?? PANTS_BY_OUTFIT.Casual;

  const palette: Record<string, string> = {
    ...BASE_PALETTE,
    S: skin[0],
    s: skin[1],
    H: hair[0],
    h: hair[1],
    O: outfit[0],
    o: outfit[1],
    P: pants[0],
    p: pants[1],
  };
  // Sport shorts read better in the outfit's own color.
  if (appearance.outfit === 'Esportivo') {
    palette.P = outfit[1];
    palette.p = outfit[1];
  }

  const background = equipped.background ? BACKGROUNDS[equipped.background] : undefined;
  const pixels = background ? background() : emptyPixels();
  const hat = equipped.hat ? HATS[equipped.hat] : undefined;
  const accessory = appearance.accessory ? ACCESSORIES[appearance.accessory] : undefined;

  paint(pixels, equipped.cape ? CAPES[equipped.cape] : undefined, palette);
  paint(pixels, BODY, palette);
  paint(pixels, OUTFITS[appearance.outfit], palette);
  if (appearance.hasBeard) paint(pixels, BEARD, palette);
  paint(pixels, EYES[appearance.eyes], palette);
  paint(pixels, EXPRESSIONS[appearance.expression], palette);
  paint(pixels, HAIR_STYLES[appearance.hairStyle], palette);
  // A shop hat replaces the cap so they don't stack.
  if (!(hat && appearance.accessory === 'Boné')) paint(pixels, accessory, palette);
  paint(pixels, hat, palette);

  return pixels;
}

export function composeTombstone(): Pixels {
  const pixels = emptyPixels();
  paint(pixels, TOMBSTONE, BASE_PALETTE);
  return pixels;
}

/** A single cosmetic on its own, used for shop thumbnails of backgrounds. */
export function composeBackground(id: string): Pixels {
  return BACKGROUNDS[id]?.() ?? emptyPixels();
}
