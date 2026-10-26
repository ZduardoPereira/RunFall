import type { PropsWithChildren } from 'react';
import { StyleSheet, Text, View, type StyleProp, type TextStyle } from 'react-native';

import { colors, fontSize, lineHeight, pixelFont, pixelSize, spacing } from '@/src/theme';

interface HeadingProps {
  title: string;
  subtitle?: string;
}

/** Screen title in the pixel font, with an optional plain-text subtitle. */
export function Heading({ title, subtitle }: HeadingProps) {
  return (
    <View style={styles.wrapper}>
      <Text style={styles.title}>{title}</Text>
      {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
    </View>
  );
}

/** Small pixel-font label, used for section names and stats. */
export function PixelText({ children, style }: PropsWithChildren<{ style?: StyleProp<TextStyle> }>) {
  return <Text style={[styles.pixel, style]}>{children}</Text>;
}

const styles = StyleSheet.create({
  wrapper: {
    gap: spacing.sm,
    marginBottom: spacing.xl,
  },
  title: {
    color: colors.textPrimary,
    fontFamily: pixelFont,
    fontSize: pixelSize.lg,
    lineHeight: 24,
  },
  subtitle: {
    color: colors.textSecondary,
    fontSize: fontSize.sm,
    lineHeight: lineHeight.sm,
  },
  pixel: {
    color: colors.textPrimary,
    fontFamily: pixelFont,
    fontSize: pixelSize.sm,
    lineHeight: 16,
  },
});
