import { StyleSheet, Text } from 'react-native';

import { Card, ProgressBar, ScreenContainer } from '@/src/components';
import { xpProgressWithinLevel } from '@/src/constants/xp';
import { useCharacterStore } from '@/src/store';
import { colors, fontSize, fontWeight, spacing } from '@/src/theme';

export default function Evolution() {
  const character = useCharacterStore((s) => s.character);
  if (!character) return null;

  const progress = xpProgressWithinLevel(character.xp, character.level);

  return (
    <ScreenContainer>
      <Text style={styles.title}>Evolução</Text>
      <Card>
        <Text style={styles.level}>Nível {character.level}</Text>
        <ProgressBar
          label="XP para o próximo nível"
          value={progress.current}
          max={progress.needed}
          color={colors.success}
        />
        <Text style={styles.stat}>XP total: {character.xp}</Text>
      </Card>
      <Text style={styles.note}>Recompensas de nível (roupas, títulos, molduras) são um próximo passo.</Text>
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
  level: {
    color: colors.textPrimary,
    fontSize: fontSize.lg,
    fontWeight: fontWeight.semibold,
  },
  stat: {
    color: colors.textSecondary,
    fontSize: fontSize.sm,
  },
  note: {
    color: colors.textMuted,
    fontSize: fontSize.sm,
    marginTop: spacing.xl,
  },
});
