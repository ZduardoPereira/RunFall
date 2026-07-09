import { StyleSheet, Text } from 'react-native';

import { Card, ScreenContainer } from '@/src/components';
import { useCharacterStore } from '@/src/store';
import { colors, fontSize, fontWeight, spacing } from '@/src/theme';

export default function History() {
  const character = useCharacterStore((s) => s.character);
  if (!character) return null;

  return (
    <ScreenContainer>
      <Text style={styles.title}>Histórico</Text>
      <Card>
        <Text style={styles.stat}>Missões concluídas: {character.missionsCompleted}</Text>
        <Text style={styles.stat}>Missões falhadas: {character.missionsFailed}</Text>
      </Card>
      <Text style={styles.note}>Um registro dia a dia detalhado é um próximo passo.</Text>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  title: {
    color: colors.textPrimary,
    fontSize: fontSize.xl,
    fontWeight: fontWeight.bold,
    marginBottom: spacing.xl,
  },
  stat: {
    color: colors.textPrimary,
    fontSize: fontSize.md,
  },
  note: {
    color: colors.textMuted,
    fontSize: fontSize.sm,
    marginTop: spacing.xl,
  },
});
