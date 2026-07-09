import { useLocalSearchParams, useRouter } from 'expo-router';
import { useState } from 'react';
import { Pressable, StyleSheet, Text } from 'react-native';

import { Button, Card, ScreenContainer } from '@/src/components';
import { DIFFICULTIES } from '@/src/constants/difficulties';
import { generateMissionsForDifficulty } from '@/src/constants/missionPresets';
import { useCharacterStore } from '@/src/store';
import { colors, fontSize, fontWeight, spacing } from '@/src/theme';
import type { DifficultyId } from '@/src/types';

export default function SelectDifficulty() {
  const router = useRouter();
  const { challengeId } = useLocalSearchParams<{ challengeId: string }>();
  const setChallengeAndDifficulty = useCharacterStore((s) => s.setChallengeAndDifficulty);
  const setMissionTemplates = useCharacterStore((s) => s.setMissionTemplates);
  const [selected, setSelected] = useState<DifficultyId | null>(null);

  const handleContinue = () => {
    if (!selected || !challengeId) return;
    setMissionTemplates(generateMissionsForDifficulty(selected));
    setChallengeAndDifficulty(challengeId, selected);
    router.replace('/(app)/dashboard');
  };

  return (
    <ScreenContainer>
      <Text style={styles.title}>Escolha a dificuldade</Text>
      <Text style={styles.subtitle}>A dificuldade define quantas missões você recebe e quanto uma falha custa.</Text>

      {DIFFICULTIES.map((difficulty) => (
        <Pressable key={difficulty.id} onPress={() => setSelected(difficulty.id)}>
          <Card style={[styles.card, selected === difficulty.id && styles.cardSelected]}>
            <Text style={styles.cardTitle}>{difficulty.label}</Text>
            <Text style={styles.cardDescription}>{difficulty.description}</Text>
          </Card>
        </Pressable>
      ))}

      <Button label="Começar" onPress={handleContinue} disabled={!selected} />
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
