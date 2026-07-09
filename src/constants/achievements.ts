import type { CemeteryEntry, Character } from '@/src/types';

export interface AchievementContext {
  character: Character | null;
  cemetery: CemeteryEntry[];
}

export interface AchievementDef {
  id: string;
  title: string;
  description: string;
  xpReward?: number;
  check: (ctx: AchievementContext) => boolean;
}

export const ACHIEVEMENT_DEFS: AchievementDef[] = [
  {
    id: 'first-character',
    title: 'Primeiro personagem criado',
    description: 'Crie seu primeiro personagem.',
    check: ({ character, cemetery }) => character !== null || cemetery.length > 0,
  },
  {
    id: 'first-week',
    title: 'Primeira semana',
    description: 'Sobreviva 7 dias.',
    check: ({ character }) => (character?.daysSurvived ?? 0) >= 7,
  },
  {
    id: 'days-30',
    title: '30 dias vivos',
    description: 'Sobreviva 30 dias.',
    check: ({ character }) => (character?.daysSurvived ?? 0) >= 30,
  },
  {
    id: 'missions-100',
    title: '100 missões',
    description: 'Complete 100 missões.',
    check: ({ character }) => (character?.missionsCompleted ?? 0) >= 100,
  },
  {
    id: 'level-10',
    title: 'Nível 10',
    description: 'Alcance o nível 10.',
    check: ({ character }) => (character?.level ?? 0) >= 10,
  },
  {
    id: 'level-25',
    title: 'Nível 25',
    description: 'Alcance o nível 25.',
    check: ({ character }) => (character?.level ?? 0) >= 25,
  },
  {
    id: 'level-50',
    title: 'Nível 50',
    description: 'Alcance o nível 50.',
    check: ({ character }) => (character?.level ?? 0) >= 50,
  },
  {
    id: 'hardcore-30',
    title: 'Hardcore 30 dias',
    description: 'Sobreviva 30 dias no modo Hardcore.',
    check: ({ character }) => character?.difficultyId === 'hardcore' && character.daysSurvived >= 30,
  },
  {
    id: 'hardcore-100',
    title: 'Hardcore 100 dias',
    description: 'Sobreviva 100 dias no modo Hardcore.',
    check: ({ character }) => character?.difficultyId === 'hardcore' && character.daysSurvived >= 100,
  },
  {
    id: 'no-missions-failed',
    title: 'Nenhuma missão perdida',
    description: 'Sobreviva 7 dias sem falhar nenhuma missão.',
    check: ({ character }) => (character?.daysSurvived ?? 0) >= 7 && character?.missionsFailed === 0,
  },
  {
    id: 'first-challenge-complete',
    title: 'Primeiro desafio concluído',
    description: 'Complete um desafio pela primeira vez.',
    xpReward: 500,
    check: ({ character }) => character?.challengeCompleted === true,
  },
  {
    id: 'first-death',
    title: 'Primeira morte',
    description: 'Perca seu primeiro personagem.',
    check: ({ cemetery }) => cemetery.length >= 1,
  },
  {
    id: 'deaths-10',
    title: '10 personagens mortos',
    description: 'Perca 10 personagens.',
    check: ({ cemetery }) => cemetery.length >= 10,
  },
];
