import { Pressable, StyleSheet, Text, View } from 'react-native';

import { colors, fontSize, lineHeight, pixelFont, pixelSize, radius, spacing } from '@/src/theme';

interface ChoiceCardProps {
  title: string;
  description: string;
  /** Short pixel-font tag on the right, e.g. "x2 XP". */
  tag?: string;
  accent?: string;
  selected?: boolean;
  onPress: () => void;
}

export function ChoiceCard({ title, description, tag, accent = colors.accent, selected = false, onPress }: ChoiceCardProps) {
  return (
    <Pressable onPress={onPress}>
      {({ pressed }) => (
        <View
          style={[
            styles.card,
            { borderLeftColor: accent },
            selected && { borderColor: accent, backgroundColor: colors.surfaceAlt },
            pressed && styles.pressed,
          ]}
        >
          <View style={styles.header}>
            <Text style={[styles.title, selected && { color: accent }]}>{title}</Text>
            {tag ? <Text style={[styles.tag, { color: accent }]}>{tag}</Text> : null}
          </View>
          <Text style={styles.description}>{description}</Text>
        </View>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    borderWidth: 2,
    borderLeftWidth: 6,
    borderColor: colors.border,
    padding: spacing.lg,
    gap: spacing.sm,
    marginBottom: spacing.md,
  },
  pressed: {
    opacity: 0.85,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: spacing.sm,
  },
  title: {
    color: colors.textPrimary,
    fontFamily: pixelFont,
    fontSize: pixelSize.sm,
    lineHeight: 16,
    flexShrink: 1,
  },
  tag: {
    fontFamily: pixelFont,
    fontSize: pixelSize.xs,
  },
  description: {
    color: colors.textSecondary,
    fontSize: fontSize.sm,
    lineHeight: lineHeight.sm,
  },
});
