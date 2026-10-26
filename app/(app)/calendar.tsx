import { StyleSheet, Text, View } from 'react-native';

import { Heading, ScreenContainer } from '@/src/components';
import { useCharacterStore } from '@/src/store';
import { colors, fontSize, pixelFont, pixelSize, radius, spacing } from '@/src/theme';

function hexToRgb(hex: string) {
  const value = hex.replace('#', '');
  return {
    r: parseInt(value.slice(0, 2), 16),
    g: parseInt(value.slice(2, 4), 16),
    b: parseInt(value.slice(4, 6), 16),
  };
}

function lerpColor(from: string, to: string, t: number) {
  const a = hexToRgb(from);
  const b = hexToRgb(to);
  const clamped = Math.max(0, Math.min(1, t));
  const r = Math.round(a.r + (b.r - a.r) * clamped);
  const g = Math.round(a.g + (b.g - a.g) * clamped);
  const bChannel = Math.round(a.b + (b.b - a.b) * clamped);
  return `rgb(${r}, ${g}, ${bChannel})`;
}

export default function CalendarScreen() {
  const character = useCharacterStore((s) => s.character);
  if (!character) return null;

  return (
    <ScreenContainer>
      <Heading
        title="Calendário"
        subtitle={`${character.daysSurvived} dias sobrevividos · sequência ${character.streak} (recorde ${character.bestStreak})`}
      />

      {character.dayHistory.length === 0 ? (
        <Text style={styles.note}>Nenhum dia encerrado ainda. Os dias fecham sozinhos à meia-noite.</Text>
      ) : (
        <View style={styles.grid}>
          {character.dayHistory.map((day, index) => {
            // Any failure tints the day; heavier HP loss pushes it further to red.
            const badness = day.perfect ? 0 : 0.35 + (character.maxHp > 0 ? day.hpLoss / character.maxHp : 0);
            const color = lerpColor(colors.success, colors.danger, badness);
            return (
              <View key={day.date + index} style={[styles.day, { backgroundColor: color }]}>
                <Text style={styles.dayLabel}>{index + 1}</Text>
              </View>
            );
          })}
        </View>
      )}

      <View style={styles.legend}>
        <View style={[styles.legendSwatch, { backgroundColor: colors.success }]} />
        <Text style={styles.legendText}>Dia perfeito</Text>
        <View style={[styles.legendSwatch, { backgroundColor: colors.danger }]} />
        <Text style={styles.legendText}>Muito dano</Text>
      </View>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  note: {
    color: colors.textMuted,
    fontSize: fontSize.sm,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
  },
  day: {
    width: 40,
    height: 40,
    borderRadius: radius.sm,
    borderBottomWidth: 4,
    borderBottomColor: 'rgba(0,0,0,0.3)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  dayLabel: {
    color: colors.background,
    fontFamily: pixelFont,
    fontSize: pixelSize.xs,
  },
  legend: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    marginTop: spacing.xl,
  },
  legendSwatch: {
    width: 14,
    height: 14,
    borderRadius: radius.sm,
  },
  legendText: {
    color: colors.textMuted,
    fontSize: fontSize.xs,
    marginRight: spacing.md,
  },
});
