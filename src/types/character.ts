import type { DayRecord } from './dayRecord';
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

export interface Character {
  id: string;
  name: string;
  gender: Gender;
  appearance: CharacterAppearance;

  hp: number;
  maxHp: number;
  energy: number;
  maxEnergy: number;
  xp: number;
  level: number;

  daysSurvived: number;
  missionsCompleted: number;
  missionsFailed: number;
  streak: number;

  challengeId: string | null;
  difficultyId: string | null;
  challengeDayCount: number;
  challengeCompleted: boolean;

  gold: number;
  attributePoints: number;

  missionTemplates: MissionTemplate[];
  todayMissions: Mission[];
  lastMissionDate: string | null;
  dayHistory: DayRecord[];

  createdAt: string;
}
