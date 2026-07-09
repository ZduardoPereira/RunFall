export type MissionTier = 'simple' | 'medium' | 'hard' | 'death';

export interface MissionTemplate {
  id: string;
  title: string;
  tier: MissionTier;
  description?: string;
}

export interface Mission {
  id: string;
  title: string;
  tier: MissionTier;
  description?: string;
  completed: boolean;
  failed: boolean;
  date: string;
}
