import { difficultyOf } from '@/src/constants/difficulties';
import type { DifficultyId, MissionTier } from '@/src/types';

export const MAX_HP = 100;

/** HP recovered at the end of a day where no mission was failed. */
export const HP_REGEN_PERFECT_DAY = 10;

/** HP lost on a failed mission, by tier. `death` means the character dies. */
export const HP_LOSS = {
  simple: 10,
  medium: 20,
  hard: 35,
  death: 'lethal',
} as const;

/** HP lost for failing a non-lethal mission, scaled by difficulty. */
export function hpLossFor(tier: Exclude<MissionTier, 'death'>, difficultyId: DifficultyId | null) {
  return Math.round(HP_LOSS[tier] * difficultyOf(difficultyId).hpLossMultiplier);
}
