import type { DifficultyId } from './difficulty';

export interface CemeteryEntry {
  id: string;
  name: string;
  level: number;
  daysSurvived: number;
  bornAt: string;
  diedAt: string;
  deathReason: string;
  difficultyId: DifficultyId;
  challengeId: string;
  missionsCompleted: number;
  missionsFailed: number;
}
