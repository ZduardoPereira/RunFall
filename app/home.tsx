import { useRouter } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';

import { Avatar, Button } from '@/src/components';
import { DEFAULT_APPEARANCE } from '@/src/constants/appearance';
import { useCharacterStore } from '@/src/store';
import { colors, fontSize, pixelFont, pixelSize, spacing } from '@/src/theme';

export default function Home() {
  const router = useRouter();
  const character = useCharacterStore((s) => s.character);

  return (
    <View style={styles.container}>
      <View style={styles.hero}>
        <Text style={styles.title}>RUNFALL</Text>
        <Text style={styles.subtitle}>Disciplina diária. Consequências reais.</Text>
      </View>

      <View style={styles.avatar}>
        <Avatar appearance={character?.appearance ?? DEFAULT_APPEARANCE} size={192} animated />
        {character ? <Text style={styles.name}>{character.name}</Text> : null}
      </View>

      <View style={styles.actions}>
        {character ? (
          <Button
            label="Continuar"
            onPress={() => router.replace(character.challengeId ? '/(app)/dashboard' : '/select-challenge')}
          />
        ) : (
          <Button label="Criar personagem" onPress={() => router.push('/create-character')} />
        )}
        <Button label="Cemitério" variant="secondary" onPress={() => router.push('/cemetery')} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    justifyContent: 'space-between',
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.xxxl,
  },
  hero: {
    marginTop: spacing.xxl,
    gap: spacing.md,
    alignItems: 'center',
  },
  title: {
    color: colors.textPrimary,
    fontFamily: pixelFont,
    fontSize: pixelSize.xl + 4,
    textShadowColor: colors.accent,
    textShadowOffset: { width: 4, height: 4 },
    textShadowRadius: 1,
  },
  subtitle: {
    color: colors.textSecondary,
    fontSize: fontSize.md,
  },
  avatar: {
    alignItems: 'center',
    gap: spacing.md,
  },
  name: {
    color: colors.gold,
    fontFamily: pixelFont,
    fontSize: pixelSize.md,
  },
  actions: {
    gap: spacing.md,
  },
});
