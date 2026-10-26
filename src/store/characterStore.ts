import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

import { CHALLENGES } from '@/src/constants/challenges';
import { HP_REGEN_PERFECT_DAY, hpLossFor, MAX_HP } from '@/src/constants/hp';
import { BONUS_XP, levelFromXp, MISSION_GOLD, missionXpFor } from '@/src/constants/xp';
import { useCemeteryStore } from '@/src/store/cemeteryStore';
import type {
  Character,
  CharacterAppearance,
  DayRecord,
  DifficultyId,
  Gender,
  Mission,
  MissionTemplate,
  RoutineMode,
} from '@/src/types';
import { addDaysToKey, makeId, todayKey } from '@/src/utils/date';

/** Safety cap on how many missed days are processed in one sync. */
const MAX_DAYS_PER_SYNC = 400;

function instancesFromTemplates(templates: MissionTemplate[], date: string): Mission[] {
  return templates.map((t) => ({
    id: makeId(),
    title: t.title,
    tier: t.tier,
    description: t.description,
    completed: false,
    failed: false,
    date,
  }));
}

interface CreateCharacterInput {
  name: string;
  gender: Gender;
  appearance: CharacterAppearance;
}

interface StartChallengeInput {
  challengeId: string;
  difficultyId: DifficultyId;
  routineMode: RoutineMode;
  templates: MissionTemplate[];
}

type DayResult = 'ok' | 'dead';

interface CharacterState {
  character: Character | null;
  /** True between a death and the moment the death screen is dismissed. */
  justDied: boolean;
  /** Dev-only time travel, in days. Always 0 in production. */
  dayOffset: number;

  createCharacter: (input: CreateCharacterInput) => void;
  startChallenge: (input: StartChallengeInput) => void;
  addMissionTemplate: (template: MissionTemplate) => void;
  removeMissionTemplate: (id: string) => void;
  updateMissionTemplate: (id: string, updates: Partial<Pick<MissionTemplate, 'title' | 'tier' | 'description'>>) => void;
  /** Closes every day that ended since the last sync and opens today's missions. */
  syncDays: () => DayResult;
  gainXp: (amount: number) => void;
  spendGold: (amount: number) => boolean;
  completeMission: (missionId: string) => void;
  failMission: (missionId: string) => DayResult;
  killCharacter: (reason: string) => void;
  acknowledgeDeath: () => void;
  devAdvanceDays: (n: number, completePending: boolean) => { daysAdvanced: number; died: boolean };
}

export const useCharacterStore = create<CharacterState>()(
  persist(
    (set, get) => {
      const updateCharacter = (fn: (c: Character) => Partial<Character>) =>
        set((state) => (state.character ? { character: { ...state.character, ...fn(state.character) } } : state));

      const today = () => todayKey(get().dayOffset);

      /** Resolves the day `todayMissions` belongs to: pending missions fail,
       * then streak, HP, bonuses and challenge progress are applied. */
      const closeDay = (): DayResult => {
        const pending = get().character?.todayMissions.filter((m) => !m.completed && !m.failed) ?? [];
        for (const mission of pending) {
          if (get().failMission(mission.id) === 'dead') return 'dead';
        }

        const c = get().character;
        if (!c) return 'dead';

        const missions = c.todayMissions;
        const failed = missions.filter((m) => m.failed);
        const perfect = missions.length > 0 && failed.length === 0;
        const hpLoss = failed.reduce((sum, m) => (m.tier === 'death' ? sum : sum + hpLossFor(m.tier, c.difficultyId)), 0);

        const dayRecord: DayRecord = {
          date: c.lastMissionDate ?? today(),
          hpLoss,
          missionsCompleted: missions.filter((m) => m.completed).length,
          missionsFailed: failed.length,
          missionsTotal: missions.length,
          perfect,
        };

        // A day with no missions neither builds nor breaks the streak.
        const streak = perfect ? c.streak + 1 : missions.length === 0 ? c.streak : 0;
        const challenge = CHALLENGES.find((ch) => ch.id === c.challengeId);
        const challengeDayCount = c.challengeDayCount + 1;
        const justCompleted =
          !c.challengeCompleted &&
          !!challenge &&
          challenge.lengthDays !== 'infinite' &&
          challengeDayCount >= challenge.lengthDays;

        updateCharacter((ch) => ({
          daysSurvived: ch.daysSurvived + 1,
          streak,
          bestStreak: Math.max(ch.bestStreak, streak),
          hp: perfect ? Math.min(ch.maxHp, ch.hp + HP_REGEN_PERFECT_DAY) : ch.hp,
          dayHistory: [...ch.dayHistory, dayRecord],
          challengeDayCount,
          challengeCompleted: ch.challengeCompleted || justCompleted,
        }));

        if (perfect) {
          get().gainXp(BONUS_XP.fullDay);
          if (streak % 7 === 0) get().gainXp(BONUS_XP.fullWeek);
        }
        if (justCompleted) get().gainXp(BONUS_XP.challengeComplete);
        return 'ok';
      };

      return {
        character: null,
        justDied: false,
        dayOffset: 0,

        createCharacter: ({ name, gender, appearance }) => {
          const character: Character = {
            id: makeId(),
            name: name.trim(),
            gender,
            appearance,
            hp: MAX_HP,
            maxHp: MAX_HP,
            xp: 0,
            level: 1,
            daysSurvived: 0,
            missionsCompleted: 0,
            missionsFailed: 0,
            streak: 0,
            bestStreak: 0,
            challengeId: null,
            difficultyId: null,
            routineMode: 'preset',
            challengeDayCount: 0,
            challengeCompleted: false,
            gold: 0,
            missionTemplates: [],
            todayMissions: [],
            lastMissionDate: null,
            dayHistory: [],
            createdAt: new Date().toISOString(),
          };
          set({ character, justDied: false });
        },

        startChallenge: ({ challengeId, difficultyId, routineMode, templates }) => {
          const date = today();
          updateCharacter(() => ({
            challengeId,
            difficultyId,
            routineMode,
            missionTemplates: templates,
            challengeDayCount: 0,
            challengeCompleted: false,
            todayMissions: instancesFromTemplates(templates, date),
            lastMissionDate: date,
          }));
        },

        addMissionTemplate: (template) =>
          updateCharacter((c) => ({ missionTemplates: [...c.missionTemplates, template] })),

        removeMissionTemplate: (id) =>
          updateCharacter((c) => ({ missionTemplates: c.missionTemplates.filter((t) => t.id !== id) })),

        updateMissionTemplate: (id, updates) =>
          updateCharacter((c) => ({
            missionTemplates: c.missionTemplates.map((t) => (t.id === id ? { ...t, ...updates } : t)),
          })),

        syncDays: () => {
          const initial = get().character;
          if (!initial?.challengeId || initial.challengeCompleted) return 'ok';

          const now = today();
          if (!initial.lastMissionDate) {
            updateCharacter((c) => ({
              todayMissions: instancesFromTemplates(c.missionTemplates, now),
              lastMissionDate: now,
            }));
            return 'ok';
          }

          // Every day between the last open day and today counts. Days the
          // player never opened the app get their routine generated and failed.
          for (let i = 0; i < MAX_DAYS_PER_SYNC; i += 1) {
            const c = get().character;
            if (!c?.lastMissionDate || c.lastMissionDate >= now) break;

            if (closeDay() === 'dead') return 'dead';

            const after = get().character;
            if (!after) return 'dead';
            if (after.challengeCompleted) {
              updateCharacter(() => ({ todayMissions: [], lastMissionDate: now }));
              break;
            }
            const next = addDaysToKey(after.lastMissionDate ?? now, 1);
            updateCharacter((ch) => ({
              todayMissions: instancesFromTemplates(ch.missionTemplates, next),
              lastMissionDate: next,
            }));
          }
          return 'ok';
        },

        gainXp: (amount) =>
          updateCharacter((c) => {
            const xp = c.xp + Math.round(amount);
            return { xp, level: levelFromXp(xp) };
          }),

        spendGold: (amount) => {
          const c = get().character;
          if (!c || c.gold < amount) return false;
          updateCharacter((ch) => ({ gold: ch.gold - amount }));
          return true;
        },

        completeMission: (missionId) => {
          const c = get().character;
          const mission = c?.todayMissions.find((m) => m.id === missionId);
          if (!c || !mission || mission.completed || mission.failed) return;

          updateCharacter((ch) => ({
            missionsCompleted: ch.missionsCompleted + 1,
            gold: ch.gold + MISSION_GOLD[mission.tier],
            todayMissions: ch.todayMissions.map((m) => (m.id === missionId ? { ...m, completed: true } : m)),
          }));
          get().gainXp(missionXpFor(mission.tier, c.difficultyId));
        },

        failMission: (missionId) => {
          const c = get().character;
          const mission = c?.todayMissions.find((m) => m.id === missionId);
          if (!c || !mission || mission.completed || mission.failed) return 'ok';

          updateCharacter((ch) => ({
            missionsFailed: ch.missionsFailed + 1,
            todayMissions: ch.todayMissions.map((m) => (m.id === missionId ? { ...m, failed: true } : m)),
          }));

          if (mission.tier === 'death') {
            get().killCharacter(`Falhou na missão de morte "${mission.title}"`);
            return 'dead';
          }

          const hp = Math.max(0, c.hp - hpLossFor(mission.tier, c.difficultyId));
          updateCharacter(() => ({ hp }));
          if (hp <= 0) {
            get().killCharacter('O HP chegou a 0');
            return 'dead';
          }
          return 'ok';
        },

        killCharacter: (reason) => {
          const c = get().character;
          if (!c) return;

          useCemeteryStore.getState().addEntry({
            id: c.id,
            name: c.name,
            level: c.level,
            daysSurvived: c.daysSurvived,
            bornAt: c.createdAt,
            diedAt: new Date().toISOString(),
            deathReason: reason,
            difficultyId: c.difficultyId ?? 'medium',
            challengeId: c.challengeId ?? '',
            missionsCompleted: c.missionsCompleted,
            missionsFailed: c.missionsFailed,
            appearance: c.appearance,
          });

          set({ character: null, justDied: true });
        },

        acknowledgeDeath: () => set({ justDied: false }),

        devAdvanceDays: (n, completePending) => {
          let daysAdvanced = 0;
          for (let i = 0; i < n; i += 1) {
            const c = get().character;
            if (!c) return { daysAdvanced, died: true };
            if (completePending) {
              c.todayMissions.filter((m) => !m.completed && !m.failed).forEach((m) => get().completeMission(m.id));
            }
            set((state) => ({ dayOffset: state.dayOffset + 1 }));
            if (get().syncDays() === 'dead') return { daysAdvanced, died: true };
            daysAdvanced += 1;
          }
          return { daysAdvanced, died: false };
        },
      };
    },
    {
      name: 'runfall-character',
      storage: createJSONStorage(() => AsyncStorage),
      version: 2,
      migrate: (persisted) => {
        const state = persisted as { character: Character | null };
        if (state?.character) {
          // v1 characters had energy and attribute points, which no longer exist.
          const legacy = state.character as Partial<Character> & Record<string, unknown>;
          const { energy: _energy, maxEnergy: _maxEnergy, attributePoints: _points, ...rest } = legacy;
          state.character = {
            gold: 0,
            challengeDayCount: 0,
            challengeCompleted: false,
            dayHistory: [],
            bestStreak: rest.streak ?? 0,
            routineMode: rest.challengeId && !rest.difficultyId ? 'manual' : 'preset',
            ...rest,
            difficultyId: rest.difficultyId ?? (rest.challengeId ? 'medium' : null),
          } as Character;
        }
        return state;
      },
    }
  )
);
