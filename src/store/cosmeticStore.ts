import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

import { COSMETICS } from '@/src/constants/cosmetics';
import { useCharacterStore } from '@/src/store/characterStore';
import type { CosmeticSlot } from '@/src/types';

export type BuyResult = 'ok' | 'owned' | 'no-gold' | 'no-character';

/** The wardrobe belongs to the player, not the character: cosmetics are
 * bought with the living character's gold but survive its death. */
interface CosmeticState {
  owned: string[];
  equipped: Partial<Record<CosmeticSlot, string | null>>;
  buy: (id: string) => BuyResult;
  equip: (id: string) => void;
  unequip: (slot: CosmeticSlot) => void;
}

export const useCosmeticStore = create<CosmeticState>()(
  persist(
    (set, get) => ({
      owned: [],
      equipped: {},

      buy: (id) => {
        const item = COSMETICS.find((c) => c.id === id);
        if (!item) return 'owned';
        if (get().owned.includes(id)) return 'owned';
        if (!useCharacterStore.getState().character) return 'no-character';
        if (!useCharacterStore.getState().spendGold(item.price)) return 'no-gold';

        set((state) => ({
          owned: [...state.owned, id],
          equipped: { ...state.equipped, [item.slot]: id },
        }));
        return 'ok';
      },

      equip: (id) => {
        const item = COSMETICS.find((c) => c.id === id);
        if (!item || !get().owned.includes(id)) return;
        set((state) => ({ equipped: { ...state.equipped, [item.slot]: id } }));
      },

      unequip: (slot) => set((state) => ({ equipped: { ...state.equipped, [slot]: null } })),
    }),
    {
      name: 'runfall-cosmetics',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
