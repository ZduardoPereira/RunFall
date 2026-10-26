import type { DayRecord } from './dayRecord';
import type { DifficultyId } from './difficulty';
import type { Mission, MissionTemplate } from './mission';

export type Gender = 'male' | 'female' | 'unspecified';

export interface CharacterAppearance {
  hairStyle: string;
  hairColor: string;
  hasBeard: boolean;
  skinTone: string;
  outfit: string;
  outfitColor: string;
  eyes: string;
  accessory: string | null;
  expression: string;
}

export type RoutineMode = 'preset' | 'manual';

export interface Character {
  id: string;
  name: string;
  gender: Gender;
  appearance: CharacterAppearance;

  hp: number;
  maxHp: number;
  xp: number;
  level: number;

  daysSurvived: number;
  missionsCompleted: number;
  missionsFailed: number;
  streak: number;
  bestStreak: number;

  challengeId: string | null;
  difficultyId: DifficultyId | null;
  routineMode: RoutineMode;
  challengeDayCount: number;
  challengeCompleted: boolean;

  gold: number;

  missionTemplates: MissionTemplate[];
  todayMissions: Mission[];
  /** Day key (YYYY-MM-DD, local time) that `todayMissions` belongs to. */
  lastMissionDate: string | null;
  dayHistory: DayRecord[];

  createdAt: string;
}
