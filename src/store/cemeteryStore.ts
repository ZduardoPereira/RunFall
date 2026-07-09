import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import type { CemeteryEntry } from '@/src/types';

interface CemeteryState {
  entries: CemeteryEntry[];
  lockedNames: string[];
  addEntry: (entry: CemeteryEntry) => void;
  isNameLocked: (name: string) => boolean;
}

export const useCemeteryStore = create<CemeteryState>()(
  persist(
    (set, get) => ({
      entries: [],
      lockedNames: [],

      addEntry: (entry) =>
        set((state) => ({
          entries: [entry, ...state.entries],
          lockedNames: [...state.lockedNames, entry.name.trim().toLowerCase()],
        })),

      isNameLocked: (name) => get().lockedNames.includes(name.trim().toLowerCase()),
    }),
    {
      name: 'runfall-cemetery',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
