import { Redirect, Stack } from 'expo-router';
import { useEffect } from 'react';
import { AppState } from 'react-native';

import { useCharacterStore } from '@/src/store';
import { colors, pixelFont, pixelSize } from '@/src/theme';

/** How often to check whether midnight has passed while the app is open. */
const DAY_CHECK_INTERVAL_MS = 30_000;

export default function AppLayout() {
  const character = useCharacterStore((s) => s.character);
  const justDied = useCharacterStore((s) => s.justDied);
  const syncDays = useCharacterStore((s) => s.syncDays);

  // Days close on their own: on open, when returning to the app, and at midnight.
  useEffect(() => {
    syncDays();
    const subscription = AppState.addEventListener('change', (state) => {
      if (state === 'active') syncDays();
    });
    const interval = setInterval(syncDays, DAY_CHECK_INTERVAL_MS);
    return () => {
      subscription.remove();
      clearInterval(interval);
    };
  }, [syncDays]);

  if (!character) {
    return <Redirect href={justDied ? '/death' : '/home'} />;
  }

  return (
    <Stack
      screenOptions={{
        headerTransparent: false,
        headerStyle: { backgroundColor: colors.background },
        headerTintColor: colors.textPrimary,
        headerTitleStyle: { fontFamily: pixelFont, fontSize: pixelSize.md },
        headerShadowVisible: false,
        contentStyle: { backgroundColor: colors.background },
      }}
    >
      <Stack.Screen name="dashboard" options={{ headerShown: false }} />
      <Stack.Screen name="missions" options={{ title: 'Missões' }} />
      <Stack.Screen name="shop" options={{ title: 'Loja' }} />
      <Stack.Screen name="calendar" options={{ title: 'Calendário' }} />
      <Stack.Screen name="evolution" options={{ title: 'Evolução' }} />
      <Stack.Screen name="character" options={{ title: 'Personagem' }} />
      <Stack.Screen name="achievements" options={{ title: 'Conquistas' }} />
      <Stack.Screen name="history" options={{ title: 'Histórico' }} />
      <Stack.Screen name="settings" options={{ title: 'Ajustes' }} />
    </Stack>
  );
}
