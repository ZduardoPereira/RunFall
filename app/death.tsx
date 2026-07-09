import { useRouter } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';

import { Button, Card } from '@/src/components';
import { useCemeteryStore } from '@/src/store';
import { colors, fontSize, fontWeight, spacing } from '@/src/theme';

export default function Death() {
  const router = useRouter();
  const lastEntry = useCemeteryStore((s) => s.entries[0]);

  const handleContinue = () => {
    router.replace('/create-character');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{lastEntry?.name ?? 'Seu personagem'} morreu</Text>
      <Text style={styles.reason}>{lastEntry?.deathReason ?? 'A jornada chegou ao fim.'}</Text>

      {lastEntry ? (
        <Card style={styles.card}>
          <Row label="Dias sobrevividos" value={String(lastEntry.daysSurvived)} />
          <Row label="Nível" value={String(lastEntry.level)} />
          <Row label="Missões concluídas" value={String(lastEntry.missionsCompleted)} />
          <Row label="Missões falhadas" value={String(lastEntry.missionsFailed)} />
        </Card>
      ) : null}

      <Button label="Criar novo personagem" onPress={handleContinue} />
    </View>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <View style={styles.row}>
      <Text style={styles.rowLabel}>{label}</Text>
      <Text style={styles.rowValue}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    justifyContent: 'center',
    paddingHorizontal: spacing.xl,
    gap: spacing.xl,
  },
  title: {
    color: colors.textPrimary,
    fontSize: fontSize.xl,
    fontWeight: fontWeight.bold,
    textAlign: 'center',
  },
  reason: {
    color: colors.textSecondary,
    fontSize: fontSize.md,
    textAlign: 'center',
  },
  card: {
    gap: spacing.sm,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  rowLabel: {
    color: colors.textMuted,
    fontSize: fontSize.sm,
  },
  rowValue: {
    color: colors.textPrimary,
    fontSize: fontSize.sm,
    fontWeight: fontWeight.semibold,
  },
});
