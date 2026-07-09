import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Pressable, StyleSheet, Text } from 'react-native';

import { Button, Card, ScreenContainer } from '@/src/components';
import { CHALLENGES } from '@/src/constants/challenges';
import { colors, fontSize, fontWeight, spacing } from '@/src/theme';

export default function SelectChallenge() {
  const router = useRouter();
  const [selected, setSelected] = useState<string | null>(null);

  const handleContinue = () => {
    if (!selected) return;
    router.push({ pathname: '/select-mode', params: { challengeId: selected } });
  };

  return (
    <ScreenContainer>
      <Text style={styles.title}>Escolha um desafio</Text>
      <Text style={styles.subtitle}>A duração do desafio define quanto tempo seu personagem precisa sobreviver.</Text>

      {CHALLENGES.map((challenge) => (
        <Pressable key={challenge.id} onPress={() => setSelected(challenge.id)}>
          <Card style={[styles.card, selected === challenge.id && styles.cardSelected]}>
            <Text style={styles.cardTitle}>{challenge.name}</Text>
            <Text style={styles.cardDescription}>{challenge.description}</Text>
          </Card>
        </Pressable>
      ))}

      <Button label="Continuar" onPress={handleContinue} disabled={!selected} />
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  title: {
    color: colors.textPrimary,
    fontSize: fontSize.xl,
    fontWeight: fontWeight.bold,
    marginBottom: spacing.xs,
  },
  subtitle: {
    color: colors.textSecondary,
    fontSize: fontSize.sm,
    marginBottom: spacing.xl,
  },
  card: {
    marginBottom: spacing.md,
  },
  cardSelected: {
    borderColor: colors.accent,
  },
  cardTitle: {
    color: colors.textPrimary,
    fontSize: fontSize.md,
    fontWeight: fontWeight.semibold,
  },
  cardDescription: {
    color: colors.textSecondary,
    fontSize: fontSize.sm,
  },
});
