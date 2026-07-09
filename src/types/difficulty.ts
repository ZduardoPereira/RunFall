export type DifficultyId = 'easy' | 'medium' | 'hard' | 'hardcore';

export interface DifficultyConfig {
  id: DifficultyId;
  label: string;
  description: string;
  hpLossMultiplier: number;
  xpMultiplier: number;
  missionCountMultiplier: number;
  instantDeathOnFailedDeathMission: boolean;
}
