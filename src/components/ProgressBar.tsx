import { StyleSheet, Text, View } from 'react-native';

import { colors, fontSize, radius, spacing } from '@/src/theme';

interface ProgressBarProps {
  label?: string;
  value: number;
  max: number;
  color?: string;
}

export function ProgressBar({ label, value, max, color = colors.accent }: ProgressBarProps) {
  const pct = max > 0 ? Math.max(0, Math.min(1, value / max)) : 0;

  return (
    <View style={styles.wrapper}>
      {label ? (
        <View style={styles.labelRow}>
          <Text style={styles.label}>{label}</Text>
          <Text style={styles.value}>
            {Math.round(value)}/{Math.round(max)}
          </Text>
        </View>
      ) : null}
      <View style={styles.track}>
        <View style={[styles.fill, { width: `${pct * 100}%`, backgroundColor: color }]} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    gap: spacing.xs,
  },
  labelRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  label: {
    color: colors.textSecondary,
    fontSize: fontSize.sm,
  },
  value: {
    color: colors.textMuted,
    fontSize: fontSize.sm,
  },
  track: {
    height: 8,
    borderRadius: radius.full,
    backgroundColor: colors.surfaceAlt,
    overflow: 'hidden',
  },
  fill: {
    height: '100%',
    borderRadius: radius.full,
  },
});
