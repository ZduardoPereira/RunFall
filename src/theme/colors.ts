import type { MissionTier } from '@/src/types';

export const colors = {
  background: '#0E0B16',
  surface: '#1A1526',
  surfaceAlt: '#241D33',
  border: '#3A2F52',
  borderStrong: '#5A4A7E',

  textPrimary: '#F4EFFF',
  textSecondary: '#B3A7CF',
  textMuted: '#7A6E96',

  accent: '#7C5CFF',
  accentDark: '#5338C9',
  danger: '#FF4D6D',
  dangerDark: '#B8304A',
  success: '#3DDC97',
  successDark: '#239E69',
  gold: '#FFC94D',
  goldDark: '#C48A1C',
  hp: '#FF4D6D',
  xp: '#4DD2FF',
} as const;

export const tierColors: Record<MissionTier, string> = {
  simple: '#3DDC97',
  medium: '#4DA3FF',
  hard: '#FF9F43',
  death: '#FF4D6D',
};

export type Colors = typeof colors;
