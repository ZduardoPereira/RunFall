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
        // Checking before every store has loaded from disk would re-unlock
        // achievements and grant their XP rewards twice.
        const ready =
          useAchievementStore.persist.hasHydrated() &&
          useCharacterStore.persist.hasHydrated() &&
          useCemeteryStore.persist.hasHydrated();
        if (!ready) return;

        const character = useCharacterStore.getState().character;
        const cemetery = useCemeteryStore.getState().entries;
        const ctx = { character, cemetery };

        for (const def of ACHIEVEMENT_DEFS) {
          // Read fresh each time: gainXp below re-enters checkAll via subscribe.
          if (get().unlocked[def.id]) continue;
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

const checkAll = () => useAchievementStore.getState().checkAll();
useCharacterStore.subscribe(checkAll);
useCemeteryStore.subscribe(checkAll);
useAchievementStore.persist.onFinishHydration(checkAll);
useCharacterStore.persist.onFinishHydration(checkAll);
useCemeteryStore.persist.onFinishHydration(checkAll);
