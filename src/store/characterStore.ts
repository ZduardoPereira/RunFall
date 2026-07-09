import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

import { CHALLENGES } from '@/src/constants/challenges';
import { DIFFICULTIES } from '@/src/constants/difficulties';
import { HP_LOSS, MAX_ENERGY, MAX_HP } from '@/src/constants/hp';
import { BONUS_XP, levelFromXp, MISSION_GOLD, MISSION_XP } from '@/src/constants/xp';
import { useCemeteryStore } from '@/src/store/cemeteryStore';
import type {
  Character,
  CharacterAppearance,
  DayRecord,
  DifficultyId,
  Gender,
  Mission,
  MissionTemplate,
} from '@/src/types';

function makeId() {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

function todayKey() {
  return new Date().toISOString().slice(0, 10);
}

function difficultyOf(id: DifficultyId | null) {
  return DIFFICULTIES.find((d) => d.id === id) ?? DIFFICULTIES[1];
}

function instancesFromTemplates(templates: MissionTemplate[]): Mission[] {
  const date = todayKey();
  return templates.map((t) => ({ id: makeId(), title: t.title, tier: t.tier, completed: false, failed: false, date }));
}

interface CreateCharacterInput {
  name: string;
  gender: Gender;
  appearance: CharacterAppearance;
}

interface CharacterState {
  character: Character | null;

  createCharacter: (input: CreateCharacterInput) => void;
  setChallengeAndDifficulty: (challengeId: string, difficultyId: DifficultyId | null) => void;
  setMissionTemplates: (templates: MissionTemplate[]) => void;
  addMissionTemplate: (template: MissionTemplate) => void;
  removeMissionTemplate: (id: string) => void;
  updateMissionTemplate: (id: string, updates: Partial<Pick<MissionTemplate, 'title' | 'tier' | 'description'>>) => void;
  ensureTodayMissions: () => void;
  gainXp: (amount: number) => void;
  completeMission: (missionId: string) => void;
  failMission: (missionId: string) => 'ok' | 'dead';
  completeDay: () => void;
  advanceDay: (autoCompletePending?: boolean) => 'ok' | 'dead';
  skipDays: (n: number) => { daysAdvanced: number; died: boolean };
  killCharacter: (reason: string) => void;
}

export const useCharacterStore = create<CharacterState>()(
  persist(
    (set, get) => ({
      character: null,

      createCharacter: ({ name, gender, appearance }) => {
        const character: Character = {
          id: makeId(),
          name: name.trim(),
          gender,
          appearance,
          hp: MAX_HP,
          maxHp: MAX_HP,
          energy: MAX_ENERGY,
          maxEnergy: MAX_ENERGY,
          xp: 0,
          level: 1,
          daysSurvived: 0,
          missionsCompleted: 0,
          missionsFailed: 0,
          streak: 0,
          challengeId: null,
          difficultyId: null,
          challengeDayCount: 0,
          challengeCompleted: false,
          gold: 0,
          attributePoints: 0,
          missionTemplates: [],
          todayMissions: [],
          lastMissionDate: null,
          dayHistory: [],
          createdAt: new Date().toISOString(),
        };
        set({ character });
      },

      setChallengeAndDifficulty: (challengeId, difficultyId) =>
        set((state) =>
          state.character
            ? {
                character: {
                  ...state.character,
                  challengeId,
                  difficultyId,
                  challengeDayCount: 0,
                  challengeCompleted: false,
                },
              }
            : state
        ),

      setMissionTemplates: (templates) =>
        set((state) => (state.character ? { character: { ...state.character, missionTemplates: templates } } : state)),

      addMissionTemplate: (template) =>
        set((state) =>
          state.character
            ? { character: { ...state.character, missionTemplates: [...state.character.missionTemplates, template] } }
            : state
        ),

      removeMissionTemplate: (id) =>
        set((state) =>
          state.character
            ? {
                character: {
                  ...state.character,
                  missionTemplates: state.character.missionTemplates.filter((t) => t.id !== id),
                },
              }
            : state
        ),

      updateMissionTemplate: (id, updates) =>
        set((state) =>
          state.character
            ? {
                character: {
                  ...state.character,
                  missionTemplates: state.character.missionTemplates.map((t) =>
                    t.id === id ? { ...t, ...updates } : t
                  ),
                },
              }
            : state
        ),

      ensureTodayMissions: () => {
        const { character } = get();
        if (!character) return;
        if (character.lastMissionDate === todayKey()) return;
        set((state) =>
          state.character
            ? {
                character: {
                  ...state.character,
                  todayMissions: instancesFromTemplates(state.character.missionTemplates),
                  lastMissionDate: todayKey(),
                },
              }
            : state
        );
      },

      gainXp: (amount) =>
        set((state) => {
          if (!state.character) return state;
          const xp = state.character.xp + Math.round(amount);
          const level = levelFromXp(xp);
          const gainedLevels = Math.max(0, level - state.character.level);
          return {
            character: {
              ...state.character,
              xp,
              level,
              attributePoints: state.character.attributePoints + gainedLevels,
            },
          };
        }),

      completeMission: (missionId) => {
        const { character } = get();
        if (!character) return;
        const mission = character.todayMissions.find((m) => m.id === missionId);
        if (!mission || mission.completed || mission.failed) return;

        const difficulty = difficultyOf(character.difficultyId as DifficultyId | null);
        const xpGain = MISSION_XP[mission.tier] * difficulty.xpMultiplier;
        const goldGain = MISSION_GOLD[mission.tier];

        set((state) =>
          state.character
            ? {
                character: {
                  ...state.character,
                  missionsCompleted: state.character.missionsCompleted + 1,
                  gold: state.character.gold + goldGain,
                  todayMissions: state.character.todayMissions.map((m) =>
                    m.id === missionId ? { ...m, completed: true } : m
                  ),
                },
              }
            : state
        );
        get().gainXp(xpGain);
      },

      failMission: (missionId) => {
        const { character } = get();
        if (!character) return 'ok';
        const mission = character.todayMissions.find((m) => m.id === missionId);
        if (!mission || mission.completed || mission.failed) return 'ok';
        const { tier } = mission;

        set((state) =>
          state.character
            ? {
                character: {
                  ...state.character,
                  missionsFailed: state.character.missionsFailed + 1,
                  todayMissions: state.character.todayMissions.map((m) =>
                    m.id === missionId ? { ...m, failed: true } : m
                  ),
                },
              }
            : state
        );

        if (tier === 'death') {
          get().killCharacter('Falhou em uma missão de morte');
          return 'dead';
        }

        const difficulty = difficultyOf(character.difficultyId as DifficultyId | null);
        const loss = Math.round(HP_LOSS[tier] * difficulty.hpLossMultiplier);
        const nextHp = Math.max(0, character.hp - loss);

        set((state) => (state.character ? { character: { ...state.character, hp: nextHp } } : state));

        if (nextHp <= 0) {
          get().killCharacter('HP chegou a 0');
          return 'dead';
        }
        return 'ok';
      },

      completeDay: () => {
        const { character } = get();
        if (!character) return;

        const streak = character.streak + 1;
        const daysSurvived = character.daysSurvived + 1;
        const hp = Math.min(character.maxHp, character.hp + 10);

        set((state) => (state.character ? { character: { ...state.character, streak, daysSurvived, hp } } : state));

        get().gainXp(BONUS_XP.fullDay);
        if (streak % 7 === 0) {
          get().gainXp(BONUS_XP.fullWeek);
        }
      },

      advanceDay: (autoCompletePending = false) => {
        const unresolved = get().character?.todayMissions.filter((m) => !m.completed && !m.failed) ?? [];
        for (const mission of unresolved) {
          if (autoCompletePending) {
            get().completeMission(mission.id);
            continue;
          }
          const result = get().failMission(mission.id);
          if (result === 'dead') return 'dead';
        }

        const resolvedCharacter = get().character;
        if (!resolvedCharacter) return 'dead';

        const difficulty = difficultyOf(resolvedCharacter.difficultyId as DifficultyId | null);
        const missionsTotal = resolvedCharacter.todayMissions.length;
        const missionsFailedToday = resolvedCharacter.todayMissions.filter((m) => m.failed).length;
        const missionsCompletedToday = resolvedCharacter.todayMissions.filter((m) => m.completed).length;
        const hpLoss = resolvedCharacter.todayMissions
          .filter((m) => m.failed)
          .reduce((sum, m) => {
            if (m.tier === 'death') return sum;
            return sum + Math.round(HP_LOSS[m.tier] * difficulty.hpLossMultiplier);
          }, 0);

        const dayRecord: DayRecord = {
          date: todayKey(),
          hpLoss,
          missionsCompleted: missionsCompletedToday,
          missionsFailed: missionsFailedToday,
          missionsTotal,
          perfect: missionsTotal > 0 && missionsFailedToday === 0,
        };

        get().completeDay();
        if (!get().character) return 'dead';

        const challenge = CHALLENGES.find((c) => c.id === resolvedCharacter.challengeId);
        const challengeDayCount = resolvedCharacter.challengeDayCount + 1;
        const justCompleted =
          !resolvedCharacter.challengeCompleted &&
          !!challenge &&
          challenge.lengthDays !== 'infinite' &&
          challengeDayCount >= challenge.lengthDays;

        set((state) =>
          state.character
            ? {
                character: {
                  ...state.character,
                  dayHistory: [...state.character.dayHistory, dayRecord],
                  challengeDayCount,
                  challengeCompleted: state.character.challengeCompleted || justCompleted,
                },
              }
            : state
        );

        if (justCompleted) {
          get().gainXp(BONUS_XP.challengeComplete);
        }

        const afterDay = get().character;
        if (!afterDay) return 'dead';

        if (!afterDay.challengeCompleted) {
          set((state) =>
            state.character
              ? {
                  character: {
                    ...state.character,
                    todayMissions: instancesFromTemplates(state.character.missionTemplates),
                    lastMissionDate: todayKey(),
                  },
                }
              : state
          );
        }
        return 'ok';
      },

      skipDays: (n) => {
        let daysAdvanced = 0;
        let died = false;
        for (let i = 0; i < n; i += 1) {
          const result = get().advanceDay(true);
          if (result === 'dead') {
            died = true;
            break;
          }
          daysAdvanced += 1;
        }
        return { daysAdvanced, died };
      },

      killCharacter: (reason) => {
        const { character } = get();
        if (!character) return;

        useCemeteryStore.getState().addEntry({
          id: character.id,
          name: character.name,
          level: character.level,
          daysSurvived: character.daysSurvived,
          bornAt: character.createdAt,
          diedAt: new Date().toISOString(),
          deathReason: reason,
          difficultyId: (character.difficultyId as DifficultyId) ?? 'medium',
          challengeId: character.challengeId ?? '',
          missionsCompleted: character.missionsCompleted,
          missionsFailed: character.missionsFailed,
        });

        set({ character: null });
      },
    }),
    {
      name: 'runfall-character',
      storage: createJSONStorage(() => AsyncStorage),
      version: 1,
      migrate: (persisted) => {
        const state = persisted as { character: Partial<Character> | null };
        if (state?.character) {
          state.character = {
            gold: 0,
            attributePoints: 0,
            challengeDayCount: 0,
            challengeCompleted: false,
            dayHistory: [],
            ...state.character,
          } as Character;
        }
        return state;
      },
    }
  )
);
