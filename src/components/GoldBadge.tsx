import { StyleSheet, Text, View } from 'react-native';

import { colors, pixelFont, pixelSize, radius, spacing } from '@/src/theme';

/** Coin icon drawn with views so it matches the pixel style. */
function Coin() {
  return (
    <View style={styles.coin}>
      <View style={styles.coinInner} />
    </View>
  );
}

export function GoldBadge({ amount }: { amount: number }) {
  return (
    <View style={styles.badge}>
      <Coin />
      <Text style={styles.text}>{amount}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs + 2,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs + 2,
    borderRadius: radius.md,
    borderWidth: 2,
    borderColor: colors.goldDark,
    backgroundColor: '#2A2210',
    alignSelf: 'flex-start',
  },
  coin: {
    width: 12,
    height: 12,
    borderRadius: 2,
    backgroundColor: colors.gold,
    borderWidth: 2,
    borderColor: colors.goldDark,
    alignItems: 'center',
    justifyContent: 'center',
  },
  coinInner: {
    width: 2,
    height: 4,
    backgroundColor: colors.goldDark,
  },
  text: {
    color: colors.gold,
    fontFamily: pixelFont,
    fontSize: pixelSize.sm,
  },
});
