import { PressStart2P_400Regular } from '@expo-google-fonts/press-start-2p';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { View } from 'react-native';

import { colors, pixelFont, pixelSize } from '@/src/theme';

export default function RootLayout() {
  const [fontsLoaded, fontError] = useFonts({ PressStart2P_400Regular });

  // Hold the first frame until the pixel font is ready so text doesn't jump.
  if (!fontsLoaded && !fontError) {
    return <View style={{ flex: 1, backgroundColor: colors.background }} />;
  }

  return (
    <>
      <StatusBar style="light" />
      <Stack
        screenOptions={{
          // SDK 58 makes iOS 26+ headers transparent (Liquid Glass) by default;
          // the screens assume an opaque header above their content.
          headerTransparent: false,
          headerStyle: { backgroundColor: colors.background },
          headerTintColor: colors.textPrimary,
          headerTitleStyle: { fontFamily: pixelFont, fontSize: pixelSize.md },
          headerShadowVisible: false,
          contentStyle: { backgroundColor: colors.background },
        }}
      >
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="home" options={{ headerShown: false }} />
        <Stack.Screen name="create-character" options={{ title: 'Novo herói' }} />
        <Stack.Screen name="select-challenge" options={{ title: 'Desafio' }} />
        <Stack.Screen name="select-mode" options={{ title: 'Rotina' }} />
        <Stack.Screen name="select-difficulty" options={{ title: 'Dificuldade' }} />
        <Stack.Screen name="manual-missions" options={{ title: 'Rotina' }} />
        <Stack.Screen name="cemetery" options={{ title: 'Cemitério' }} />
        <Stack.Screen name="death" options={{ headerShown: false, presentation: 'fullScreenModal', gestureEnabled: false }} />
        <Stack.Screen name="(app)" options={{ headerShown: false }} />
      </Stack>
    </>
  );
}
