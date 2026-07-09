import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

import { colors } from '@/src/theme';

export default function RootLayout() {
  return (
    <>
      <StatusBar style="light" />
      <Stack
        screenOptions={{
          headerStyle: { backgroundColor: colors.background },
          headerTintColor: colors.textPrimary,
          headerShadowVisible: false,
          contentStyle: { backgroundColor: colors.background },
        }}
      >
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="home" options={{ headerShown: false }} />
        <Stack.Screen name="create-character" options={{ title: 'Criar Personagem' }} />
        <Stack.Screen name="select-challenge" options={{ title: 'Selecionar Desafio' }} />
        <Stack.Screen name="select-difficulty" options={{ title: 'Selecionar Dificuldade' }} />
        <Stack.Screen name="cemetery" options={{ title: 'Cemitério' }} />
        <Stack.Screen name="death" options={{ headerShown: false, presentation: 'fullScreenModal' }} />
        <Stack.Screen name="(app)" options={{ headerShown: false }} />
      </Stack>
    </>
  );
}
