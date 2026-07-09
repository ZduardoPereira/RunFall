import { Redirect, Stack } from 'expo-router';

import { useCharacterStore } from '@/src/store';
import { colors } from '@/src/theme';

export default function AppLayout() {
  const character = useCharacterStore((s) => s.character);

  if (!character) {
    return <Redirect href="/home" />;
  }

  return (
    <Stack
      screenOptions={{
        headerStyle: { backgroundColor: colors.background },
        headerTintColor: colors.textPrimary,
        headerShadowVisible: false,
        contentStyle: { backgroundColor: colors.background },
      }}
    >
      <Stack.Screen name="dashboard" options={{ headerShown: false }} />
      <Stack.Screen name="missions" options={{ title: 'Missões' }} />
      <Stack.Screen name="calendar" options={{ title: 'Calendário' }} />
      <Stack.Screen name="evolution" options={{ title: 'Evolução' }} />
      <Stack.Screen name="character" options={{ title: 'Personagem' }} />
      <Stack.Screen name="achievements" options={{ title: 'Conquistas' }} />
      <Stack.Screen name="history" options={{ title: 'Histórico' }} />
      <Stack.Screen name="settings" options={{ title: 'Configurações' }} />
    </Stack>
  );
}
