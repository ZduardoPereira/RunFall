import { difficultyOf } from '@/src/constants/difficulties';
import type { DifficultyId, MissionTier } from '@/src/types';

const EARLY_LEVEL_THRESHOLDS: Record<number, number> = {
  1: 0,
  2: 100,
  3: 250,
  4: 450,
  5: 700,
};

/** Total XP required to reach `level`. Levels 1-5 use fixed values from the
 * spec; beyond that the general formula level^2 * 50 takes over. */
export function xpForLevel(level: number): number {
  if (level <= 1) return 0;
  if (level in EARLY_LEVEL_THRESHOLDS) return EARLY_LEVEL_THRESHOLDS[level];
  return level * level * 50;
}

export function levelFromXp(xp: number): number {
  let level = 1;
  while (xp >= xpForLevel(level + 1)) {
    level += 1;
  }
  return level;
}

export function xpProgressWithinLevel(xp: number, level: number) {
  const current = xpForLevel(level);
  const next = xpForLevel(level + 1);
  return {
    current: xp - current,
    needed: next - current,
  };
}

export const MISSION_XP = {
  simple: 20,
  medium: 40,
  hard: 70,
  death: 100,
} as const;

export const MISSION_GOLD = {
  simple: 5,
  medium: 10,
  hard: 15,
  death: 25,
} as const;

/** Bonuses granted when a day closes. `fullDay` and `fullWeek` require a
 * perfect day (no failed missions); `fullWeek` fires every 7-day streak. */
export const BONUS_XP = {
  fullDay: 50,
  fullWeek: 250,
  challengeComplete: 1000,
} as const;

export function missionXpFor(tier: MissionTier, difficultyId: DifficultyId | null) {
  return Math.round(MISSION_XP[tier] * difficultyOf(difficultyId).xpMultiplier);
}
