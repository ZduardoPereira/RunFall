import { StyleSheet, Text } from 'react-native';

import { Card, ScreenContainer } from '@/src/components';
import { ACHIEVEMENT_DEFS } from '@/src/constants/achievements';
import { useAchievementStore } from '@/src/store';
import { colors, fontSize, fontWeight, spacing } from '@/src/theme';

export default function Achievements() {
  const unlocked = useAchievementStore((s) => s.unlocked);

  return (
    <ScreenContainer>
      <Text style={styles.title}>Conquistas</Text>
      {ACHIEVEMENT_DEFS.map((def) => {
        const unlockedAt = unlocked[def.id];
        return (
          <Card key={def.id} style={styles.card}>
            <Text style={styles.cardTitle}>{def.title}</Text>
            <Text style={styles.cardDescription}>{def.description}</Text>
            <Text style={unlockedAt ? styles.unlocked : styles.locked}>
              {unlockedAt ? `Desbloqueada em ${new Date(unlockedAt).toLocaleDateString('pt-BR')}` : 'Bloqueada'}
            </Text>
          </Card>
        );
      })}
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
  card: {
    marginBottom: spacing.md,
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
  locked: {
    color: colors.textMuted,
    fontSize: fontSize.xs,
    textTransform: 'uppercase',
  },
  unlocked: {
    color: colors.success,
    fontSize: fontSize.xs,
    textTransform: 'uppercase',
    fontWeight: fontWeight.bold,
  },
});
