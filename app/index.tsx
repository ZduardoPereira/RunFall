import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';

import { useCharacterStore } from '@/src/store';
import { colors, pixelFont, pixelSize, spacing } from '@/src/theme';

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
      const { character, justDied } = useCharacterStore.getState();
      if (!character) {
        router.replace(justDied ? '/death' : '/home');
      } else if (!character.challengeId) {
        router.replace('/select-challenge');
      } else {
        router.replace('/(app)/dashboard');
      }
    }, MIN_SPLASH_MS);

    return () => clearTimeout(timer);
  }, [hydrated, router]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>RUNFALL</Text>
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
    fontFamily: pixelFont,
    fontSize: pixelSize.xl,
    textShadowColor: colors.accent,
    textShadowOffset: { width: 3, height: 3 },
    textShadowRadius: 1,
  },
  spinner: {
    marginTop: spacing.md,
  },
});
