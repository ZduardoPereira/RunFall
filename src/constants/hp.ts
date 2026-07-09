export const MAX_HP = 100;
export const MAX_ENERGY = 100;

/** HP lost on a failed mission, by tier. `death` means the character dies. */
export const HP_LOSS = {
  simple: 10,
  medium: 20,
  hard: 35,
  death: 'lethal',
} as const;
