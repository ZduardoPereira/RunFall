import { useLocalSearchParams, useRouter } from 'expo-router';
import { useState } from 'react';
import { StyleSheet, Text } from 'react-native';

import { Button, MissionTemplateEditor, ScreenContainer } from '@/src/components';
import { useCharacterStore } from '@/src/store';
import { colors, fontSize, fontWeight, spacing } from '@/src/theme';
import type { MissionTemplate } from '@/src/types';

export default function ManualMissions() {
  const router = useRouter();
  const { challengeId } = useLocalSearchParams<{ challengeId: string }>();
  const setMissionTemplates = useCharacterStore((s) => s.setMissionTemplates);
  const setChallengeAndDifficulty = useCharacterStore((s) => s.setChallengeAndDifficulty);
  const [templates, setTemplates] = useState<MissionTemplate[]>([]);

  const handleAdd = (template: MissionTemplate) => setTemplates((prev) => [...prev, template]);
  const handleRemove = (id: string) => setTemplates((prev) => prev.filter((t) => t.id !== id));

  const handleContinue = () => {
    if (!challengeId || templates.length === 0) return;
    setMissionTemplates(templates);
    setChallengeAndDifficulty(challengeId, null);
    router.replace('/(app)/dashboard');
  };

  return (
    <ScreenContainer>
      <Text style={styles.title}>Monte sua rotina</Text>
      <Text style={styles.subtitle}>
        Crie suas próprias missões e escolha o nível de cada uma. O nível define o XP ganho e o quanto você perde de HP
        ao falhar.
      </Text>

      <MissionTemplateEditor templates={templates} onAdd={handleAdd} onRemove={handleRemove} />

      <Button label="Começar" onPress={handleContinue} disabled={templates.length === 0} />
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
});
