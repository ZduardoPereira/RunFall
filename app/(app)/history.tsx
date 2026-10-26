import { StyleSheet, Text, View } from 'react-native';

import { Card, Heading, ScreenContainer } from '@/src/components';
import { useCharacterStore } from '@/src/store';
import { colors, fontSize, pixelFont, pixelSize, spacing } from '@/src/theme';
import { formatDayKey } from '@/src/utils/date';

export default function History() {
  const character = useCharacterStore((s) => s.character);
  if (!character) return null;

  const days = [...character.dayHistory].reverse();

  return (
    <ScreenContainer>
      <Heading
        title="Histórico"
        subtitle={`${character.missionsCompleted} missões concluídas · ${character.missionsFailed} falhadas`}
      />

      {days.length === 0 ? <Text style={styles.note}>Nenhum dia encerrado ainda.</Text> : null}

      {days.map((day, index) => (
        <Card key={`${day.date}-${index}`} style={[styles.card, { borderLeftColor: day.perfect ? colors.success : colors.danger }]}>
          <View style={styles.header}>
            <Text style={styles.date}>{formatDayKey(day.date)}</Text>
            <Text style={[styles.badge, { color: day.perfect ? colors.success : colors.danger }]}>
              {day.perfect ? 'Perfeito' : `-${day.hpLoss} HP`}
            </Text>
          </View>
          <Text style={styles.body}>
            {day.missionsCompleted}/{day.missionsTotal} concluídas
            {day.missionsFailed > 0 ? ` · ${day.missionsFailed} falhadas` : ''}
          </Text>
        </Card>
      ))}
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  note: {
    color: colors.textMuted,
    fontSize: fontSize.sm,
  },
  card: {
    borderLeftWidth: 6,
    marginBottom: spacing.sm,
    gap: spacing.xs,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  date: {
    color: colors.textPrimary,
    fontFamily: pixelFont,
    fontSize: pixelSize.xs,
  },
  badge: {
    fontFamily: pixelFont,
    fontSize: pixelSize.xs,
  },
  body: {
    color: colors.textSecondary,
    fontSize: fontSize.sm,
  },
});
