export const colors = {
  background: '#0B0B0F',
  surface: '#16161C',
  surfaceAlt: '#1E1E26',
  border: '#2A2A33',

  textPrimary: '#F2F2F5',
  textSecondary: '#9A9AA5',
  textMuted: '#6B6B75',

  accent: '#5B8CFF',
  danger: '#E5484D',
  success: '#3DD68C',
} as const;

export type Colors = typeof colors;
