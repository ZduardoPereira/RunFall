import { Pressable, StyleSheet, Text, type StyleProp, type ViewStyle } from 'react-native';

import { colors, pixelFont, pixelSize, radius, spacing } from '@/src/theme';

type ButtonVariant = 'primary' | 'secondary' | 'danger' | 'success' | 'gold';

interface ButtonProps {
  label: string;
  onPress: () => void;
  variant?: ButtonVariant;
  disabled?: boolean;
  compact?: boolean;
  style?: StyleProp<ViewStyle>;
}

/** Chunky arcade-style button: the darker bottom edge "sinks" when pressed. */
export function Button({ label, onPress, variant = 'primary', disabled = false, compact = false, style }: ButtonProps) {
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      style={({ pressed }) => [
        styles.base,
        compact && styles.compact,
        variantStyles[variant],
        disabled && styles.disabled,
        pressed && !disabled && styles.pressed,
        style,
      ]}
    >
      <Text style={[styles.label, compact && styles.labelCompact, variant === 'gold' && styles.labelDark]}>
        {label}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
    borderRadius: radius.md,
    borderBottomWidth: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  compact: {
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.sm,
    borderBottomWidth: 3,
  },
  pressed: {
    borderBottomWidth: 1,
    marginTop: 3,
  },
  disabled: {
    opacity: 0.4,
  },
  label: {
    color: colors.textPrimary,
    fontFamily: pixelFont,
    fontSize: pixelSize.sm,
    lineHeight: 16,
    textAlign: 'center',
  },
  labelCompact: {
    fontSize: pixelSize.xs,
  },
  labelDark: {
    color: colors.background,
  },
});

const variantStyles = StyleSheet.create({
  primary: {
    backgroundColor: colors.accent,
    borderBottomColor: colors.accentDark,
  },
  secondary: {
    backgroundColor: colors.surfaceAlt,
    borderBottomColor: colors.border,
    borderWidth: 2,
    borderColor: colors.border,
  },
  danger: {
    backgroundColor: colors.danger,
    borderBottomColor: colors.dangerDark,
  },
  success: {
    backgroundColor: colors.successDark,
    borderBottomColor: '#17734B',
  },
  gold: {
    backgroundColor: colors.gold,
    borderBottomColor: colors.goldDark,
  },
});
