import { Pressable, StyleSheet, Text, View } from 'react-native';

import { colors, fontSize, fontWeight, pixelFont, pixelSize, radius, spacing } from '@/src/theme';

interface OptionPickerProps {
  label: string;
  options: readonly string[];
  value: string;
  onChange: (value: string) => void;
}

export function OptionPicker({ label, options, value, onChange }: OptionPickerProps) {
  const index = Math.max(0, options.indexOf(value));

  const step = (dir: 1 | -1) => {
    const next = (index + dir + options.length) % options.length;
    onChange(options[next]);
  };

  return (
    <View style={styles.wrapper}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.row}>
        <Pressable onPress={() => step(-1)} style={styles.arrow} hitSlop={8}>
          <Text style={styles.arrowText}>‹</Text>
        </Pressable>
        <Text style={styles.value}>{value}</Text>
        <Pressable onPress={() => step(1)} style={styles.arrow} hitSlop={8}>
          <Text style={styles.arrowText}>›</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    gap: spacing.xs,
  },
  label: {
    color: colors.textSecondary,
    fontFamily: pixelFont,
    fontSize: pixelSize.xs,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.surfaceAlt,
    borderRadius: radius.md,
    borderWidth: 2,
    borderColor: colors.border,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
  },
  value: {
    color: colors.textPrimary,
    fontSize: fontSize.md,
    fontWeight: fontWeight.medium,
  },
  arrow: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
  },
  arrowText: {
    color: colors.accent,
    fontSize: fontSize.lg,
    fontWeight: fontWeight.bold,
  },
});
