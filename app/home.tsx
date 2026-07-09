import { useRouter } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';

import { Button } from '@/src/components';
import { useCharacterStore } from '@/src/store';
import { colors, fontSize, fontWeight, spacing } from '@/src/theme';

export default function Home() {
  const router = useRouter();
  const character = useCharacterStore((s) => s.character);

  return (
    <View style={styles.container}>
      <View style={styles.hero}>
        <Text style={styles.title}>RunFall</Text>
        <Text style={styles.subtitle}>Disciplina diária. Consequências reais.</Text>
      </View>

      <View style={styles.actions}>
        {character ? (
          <Button
            label="Continuar"
            onPress={() =>
              router.replace(character.challengeId ? '/(app)/dashboard' : '/select-challenge')
            }
          />
        ) : (
          <Button label="Criar Personagem" onPress={() => router.push('/create-character')} />
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
    marginTop: spacing.xxxl,
    gap: spacing.sm,
  },
  title: {
    color: colors.textPrimary,
    fontSize: fontSize.xxl,
    fontWeight: fontWeight.bold,
  },
  subtitle: {
    color: colors.textSecondary,
    fontSize: fontSize.md,
  },
  actions: {
    gap: spacing.md,
  },
});
