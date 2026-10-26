import { StyleSheet, Text } from 'react-native';

import { Card, Heading, ScreenContainer } from '@/src/components';
import { ACHIEVEMENT_DEFS } from '@/src/constants/achievements';
import { useAchievementStore } from '@/src/store';
import { colors, fontSize, pixelFont, pixelSize, spacing } from '@/src/theme';

export default function Achievements() {
  const unlocked = useAchievementStore((s) => s.unlocked);
  const unlockedCount = ACHIEVEMENT_DEFS.filter((def) => unlocked[def.id]).length;

  return (
    <ScreenContainer>
      <Heading title="Conquistas" subtitle={`${unlockedCount} de ${ACHIEVEMENT_DEFS.length} desbloqueadas`} />
      {ACHIEVEMENT_DEFS.map((def) => {
        const unlockedAt = unlocked[def.id];
        return (
          <Card key={def.id} style={[styles.card, unlockedAt ? styles.cardUnlocked : styles.cardLocked]}>
            <Text style={[styles.cardTitle, unlockedAt && styles.titleUnlocked]}>{def.title}</Text>
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
  card: {
    marginBottom: spacing.md,
    gap: spacing.sm,
  },
  cardUnlocked: {
    borderColor: colors.gold,
  },
  cardLocked: {
    opacity: 0.6,
  },
  cardTitle: {
    color: colors.textPrimary,
    fontFamily: pixelFont,
    fontSize: pixelSize.sm,
    lineHeight: 16,
  },
  titleUnlocked: {
    color: colors.gold,
  },
  cardDescription: {
    color: colors.textSecondary,
    fontSize: fontSize.sm,
  },
  locked: {
    color: colors.textMuted,
    fontFamily: pixelFont,
    fontSize: pixelSize.xs,
  },
  unlocked: {
    color: colors.success,
    fontFamily: pixelFont,
    fontSize: pixelSize.xs,
  },
});
