import { StyleSheet, Text, View } from 'react-native';

import { colors, pixelFont, pixelSize, radius, spacing } from '@/src/theme';

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
          <Text style={[styles.label, { color }]}>{label}</Text>
          <Text style={styles.value}>
            {Math.round(value)}/{Math.round(max)}
          </Text>
        </View>
      ) : null}
      <View style={styles.track}>
        <View style={[styles.fill, { width: `${pct * 100}%`, backgroundColor: color }]}>
          <View style={styles.shine} />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    gap: spacing.xs + 2,
  },
  labelRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  label: {
    fontFamily: pixelFont,
    fontSize: pixelSize.xs,
  },
  value: {
    color: colors.textSecondary,
    fontFamily: pixelFont,
    fontSize: pixelSize.xs,
  },
  track: {
    height: 14,
    borderRadius: radius.sm,
    borderWidth: 2,
    borderColor: colors.border,
    backgroundColor: colors.background,
    overflow: 'hidden',
  },
  fill: {
    height: '100%',
  },
  shine: {
    height: 3,
    backgroundColor: 'rgba(255,255,255,0.3)',
  },
});
