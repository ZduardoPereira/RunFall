import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

import { ACHIEVEMENT_DEFS } from '@/src/constants/achievements';
import { useCemeteryStore } from '@/src/store/cemeteryStore';
import { useCharacterStore } from '@/src/store/characterStore';

interface AchievementState {
  unlocked: Record<string, string>;
  checkAll: () => void;
}

export const useAchievementStore = create<AchievementState>()(
  persist(
    (set, get) => ({
      unlocked: {},

      checkAll: () => {
        const character = useCharacterStore.getState().character;
        const cemetery = useCemeteryStore.getState().entries;
        const ctx = { character, cemetery };
        const unlocked = get().unlocked;

        for (const def of ACHIEVEMENT_DEFS) {
          if (unlocked[def.id]) continue;
          if (!def.check(ctx)) continue;

          set((state) => ({ unlocked: { ...state.unlocked, [def.id]: new Date().toISOString() } }));
          if (def.xpReward) {
            useCharacterStore.getState().gainXp(def.xpReward);
          }
        }
      },
    }),
    {
      name: 'runfall-achievements',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);

useCharacterStore.subscribe(() => useAchievementStore.getState().checkAll());
useCemeteryStore.subscribe(() => useAchievementStore.getState().checkAll());
