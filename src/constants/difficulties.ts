import type { DifficultyConfig, DifficultyId } from '@/src/types';

export const DIFFICULTIES: DifficultyConfig[] = [
  {
    id: 'easy',
    label: 'Fácil',
    description: 'Poucas missões, HP perdido reduzido, XP menor.',
    hpLossMultiplier: 0.5,
    xpMultiplier: 0.75,
    missionCountMultiplier: 0.7,
  },
  {
    id: 'medium',
    label: 'Médio',
    description: 'Experiência balanceada.',
    hpLossMultiplier: 1,
    xpMultiplier: 1,
    missionCountMultiplier: 1,
  },
  {
    id: 'hard',
    label: 'Difícil',
    description: 'Mais missões, mais XP, mais punições.',
    hpLossMultiplier: 1.4,
    xpMultiplier: 1.3,
    missionCountMultiplier: 1.4,
  },
  {
    id: 'hardcore',
    label: 'Hardcore',
    description: 'Mais missões e punições pesadas. Maior XP e recompensa.',
    hpLossMultiplier: 1.75,
    xpMultiplier: 2,
    missionCountMultiplier: 1.6,
  },
];

export function difficultyOf(id: DifficultyId | null | undefined) {
  return DIFFICULTIES.find((d) => d.id === id) ?? DIFFICULTIES[1];
}
