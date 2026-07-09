import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';

import { useCharacterStore } from '@/src/store';
import { colors, fontSize, fontWeight, spacing } from '@/src/theme';

const MIN_SPLASH_MS = 900;

export default function Splash() {
  const router = useRouter();
  const [hydrated, setHydrated] = useState(useCharacterStore.persist.hasHydrated());

  useEffect(() => {
    const unsub = useCharacterStore.persist.onFinishHydration(() => setHydrated(true));
    if (useCharacterStore.persist.hasHydrated()) setHydrated(true);
    return unsub;
  }, []);

  useEffect(() => {
    if (!hydrated) return;

    const timer = setTimeout(() => {
      const character = useCharacterStore.getState().character;
      if (!character) {
        router.replace('/home');
      } else if (!character.challengeId || !character.difficultyId) {
        router.replace('/select-challenge');
      } else {
        router.replace('/(app)/dashboard');
      }
    }, MIN_SPLASH_MS);

    return () => clearTimeout(timer);
  }, [hydrated, router]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>RunFall</Text>
      <ActivityIndicator color={colors.accent} style={styles.spinner} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.background,
    gap: spacing.xl,
  },
  title: {
    color: colors.textPrimary,
    fontSize: fontSize.xxl,
    fontWeight: fontWeight.bold,
    letterSpacing: 1,
  },
  spinner: {
    marginTop: spacing.md,
  },
});
