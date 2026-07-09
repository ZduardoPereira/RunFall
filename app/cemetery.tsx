import { StyleSheet, Text } from 'react-native';

import { Card, ScreenContainer } from '@/src/components';
import { CHALLENGES } from '@/src/constants/challenges';
import { DIFFICULTIES } from '@/src/constants/difficulties';
import { useCemeteryStore } from '@/src/store';
import { colors, fontSize, fontWeight, spacing } from '@/src/theme';

export default function Cemetery() {
  const entries = useCemeteryStore((s) => s.entries);

  if (entries.length === 0) {
    return (
      <ScreenContainer>
        <Text style={styles.title}>Cemitério</Text>
        <Text style={styles.empty}>Nenhum personagem morreu ainda.</Text>
      </ScreenContainer>
    );
  }

  return (
    <ScreenContainer>
      <Text style={styles.title}>Cemitério</Text>
      {entries.map((entry) => {
        const challenge = CHALLENGES.find((c) => c.id === entry.challengeId);
        const difficulty = DIFFICULTIES.find((d) => d.id === entry.difficultyId);
        return (
          <Card key={entry.id} style={styles.card}>
            <Text style={styles.name}>{entry.name}</Text>
            <Text style={styles.detail}>Nível {entry.level} · {entry.daysSurvived} dias vividos</Text>
            <Text style={styles.detail}>
              {challenge?.name ?? '—'} · {difficulty?.label ?? '—'}
            </Text>
            <Text style={styles.detail}>Nascido em {formatDate(entry.bornAt)}</Text>
            <Text style={styles.detail}>Morreu em {formatDate(entry.diedAt)}</Text>
            <Text style={styles.reason}>{entry.deathReason}</Text>
          </Card>
        );
      })}
    </ScreenContainer>
  );
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('pt-BR');
}

const styles = StyleSheet.create({
  title: {
    color: colors.textPrimary,
    fontSize: fontSize.xl,
    fontWeight: fontWeight.bold,
    marginBottom: spacing.xl,
  },
  empty: {
    color: colors.textSecondary,
    fontSize: fontSize.sm,
  },
  card: {
    marginBottom: spacing.md,
  },
  name: {
    color: colors.textPrimary,
    fontSize: fontSize.md,
    fontWeight: fontWeight.semibold,
  },
  detail: {
    color: colors.textSecondary,
    fontSize: fontSize.sm,
  },
  reason: {
    color: colors.danger,
    fontSize: fontSize.sm,
  },
});
