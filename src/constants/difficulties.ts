import type { DifficultyConfig } from '@/src/types';

export const DIFFICULTIES: DifficultyConfig[] = [
  {
    id: 'easy',
    label: 'Fácil',
    description: 'Poucas missões, HP perdido reduzido, XP menor.',
    hpLossMultiplier: 0.5,
    xpMultiplier: 0.75,
    missionCountMultiplier: 0.7,
    instantDeathOnFailedDeathMission: true,
  },
  {
    id: 'medium',
    label: 'Médio',
    description: 'Experiência balanceada.',
    hpLossMultiplier: 1,
    xpMultiplier: 1,
    missionCountMultiplier: 1,
    instantDeathOnFailedDeathMission: true,
  },
  {
    id: 'hard',
    label: 'Difícil',
    description: 'Mais missões, mais XP, mais punições.',
    hpLossMultiplier: 1.4,
    xpMultiplier: 1.3,
    missionCountMultiplier: 1.4,
    instantDeathOnFailedDeathMission: true,
  },
  {
    id: 'hardcore',
    label: 'Hardcore',
    description: 'Dias infinitos. Qualquer missão de morte falhada é morte imediata. Maior XP e recompensa.',
    hpLossMultiplier: 1.75,
    xpMultiplier: 2,
    missionCountMultiplier: 1.6,
    instantDeathOnFailedDeathMission: true,
  },
];
