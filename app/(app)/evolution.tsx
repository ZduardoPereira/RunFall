import { StyleSheet, Text, View } from 'react-native';

import { Card, Heading, PixelText, ProgressBar, ScreenContainer } from '@/src/components';
import { BONUS_XP, xpForLevel, xpProgressWithinLevel } from '@/src/constants/xp';
import { useCharacterStore } from '@/src/store';
import { colors, fontSize, pixelFont, pixelSize, spacing } from '@/src/theme';

const UPCOMING_LEVELS = 5;

export default function Evolution() {
  const character = useCharacterStore((s) => s.character);
  if (!character) return null;

  const progress = xpProgressWithinLevel(character.xp, character.level);
  const upcoming = Array.from({ length: UPCOMING_LEVELS }, (_, i) => character.level + i + 1);

  return (
    <ScreenContainer>
      <Heading title="Evolução" subtitle={`XP total: ${character.xp}`} />

      <Card style={styles.card}>
        <Text style={styles.level}>Nível {character.level}</Text>
        <ProgressBar label="Próximo nível" value={progress.current} max={progress.needed} color={colors.xp} />
      </Card>

      <Card style={styles.card}>
        <PixelText>Próximos níveis</PixelText>
        {upcoming.map((level) => (
          <View key={level} style={styles.row}>
            <Text style={styles.rowLabel}>Nível {level}</Text>
            <Text style={styles.rowValue}>{Math.max(0, xpForLevel(level) - character.xp)} XP</Text>
          </View>
        ))}
      </Card>

      <Card style={styles.card}>
        <PixelText>Bônus</PixelText>
        <Text style={styles.body}>Dia perfeito: +{BONUS_XP.fullDay} XP e +10 HP</Text>
        <Text style={styles.body}>7 dias perfeitos seguidos: +{BONUS_XP.fullWeek} XP</Text>
        <Text style={styles.body}>Desafio concluído: +{BONUS_XP.challengeComplete} XP</Text>
      </Card>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  card: {
    marginBottom: spacing.lg,
  },
  level: {
    color: colors.xp,
    fontFamily: pixelFont,
    fontSize: pixelSize.xl,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  rowLabel: {
    color: colors.textSecondary,
    fontSize: fontSize.sm,
  },
  rowValue: {
    color: colors.textPrimary,
    fontFamily: pixelFont,
    fontSize: pixelSize.xs,
  },
  body: {
    color: colors.textSecondary,
    fontSize: fontSize.sm,
  },
});
