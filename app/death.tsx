import { useRouter } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';

import { Button, Card, Tombstone } from '@/src/components';
import { useCemeteryStore, useCharacterStore } from '@/src/store';
import { colors, fontSize, pixelFont, pixelSize, spacing } from '@/src/theme';

export default function Death() {
  const router = useRouter();
  const lastEntry = useCemeteryStore((s) => s.entries[0]);
  const acknowledgeDeath = useCharacterStore((s) => s.acknowledgeDeath);

  const handleContinue = () => {
    acknowledgeDeath();
    router.replace('/create-character');
  };

  return (
    <View style={styles.container}>
      <View style={styles.hero}>
        <Text style={styles.gameOver}>FIM DE JOGO</Text>
        <Tombstone size={160} />
        <Text style={styles.title}>{lastEntry?.name ?? 'Seu personagem'} morreu</Text>
        <Text style={styles.reason}>{lastEntry?.deathReason ?? 'A jornada chegou ao fim.'}</Text>
      </View>

      {lastEntry ? (
        <Card style={styles.card}>
          <Row label="Dias sobrevividos" value={String(lastEntry.daysSurvived)} />
          <Row label="Nível" value={String(lastEntry.level)} />
          <Row label="Missões concluídas" value={String(lastEntry.missionsCompleted)} />
          <Row label="Missões falhadas" value={String(lastEntry.missionsFailed)} />
        </Card>
      ) : null}

      <Text style={styles.note}>
        O nome {lastEntry?.name ?? ''} está bloqueado para sempre. Seus cosméticos continuam com você.
      </Text>
      <Button label="Novo personagem" onPress={handleContinue} />
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
  hero: {
    alignItems: 'center',
    gap: spacing.md,
  },
  gameOver: {
    color: colors.danger,
    fontFamily: pixelFont,
    fontSize: pixelSize.xl,
    textShadowColor: colors.dangerDark,
    textShadowOffset: { width: 3, height: 3 },
    textShadowRadius: 1,
  },
  title: {
    color: colors.textPrimary,
    fontFamily: pixelFont,
    fontSize: pixelSize.md,
    textAlign: 'center',
    lineHeight: 20,
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
    fontFamily: pixelFont,
    fontSize: pixelSize.sm,
  },
  note: {
    color: colors.textMuted,
    fontSize: fontSize.xs,
    textAlign: 'center',
  },
});
