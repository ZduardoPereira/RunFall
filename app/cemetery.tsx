import { StyleSheet, Text, View } from 'react-native';

import { Avatar, Card, Heading, ScreenContainer, Tombstone } from '@/src/components';
import { CHALLENGES } from '@/src/constants/challenges';
import { DIFFICULTIES } from '@/src/constants/difficulties';
import { useCemeteryStore } from '@/src/store';
import { colors, fontSize, pixelFont, pixelSize, spacing } from '@/src/theme';

// The dead are shown as they were, without the shop wardrobe.
const NO_COSMETICS = {};

export default function Cemetery() {
  const entries = useCemeteryStore((s) => s.entries);

  return (
    <ScreenContainer>
      <Heading
        title="Cemitério"
        subtitle={entries.length === 0 ? 'Nenhum personagem morreu ainda.' : `${entries.length} heróis caídos.`}
      />
      {entries.map((entry) => {
        const challenge = CHALLENGES.find((c) => c.id === entry.challengeId);
        const difficulty = DIFFICULTIES.find((d) => d.id === entry.difficultyId);
        return (
          <Card key={entry.id} style={styles.card}>
            <View style={styles.sprite}>
              {entry.appearance ? (
                <Avatar appearance={entry.appearance} size={64} equipped={NO_COSMETICS} />
              ) : (
                <Tombstone size={64} />
              )}
            </View>
            <View style={styles.info}>
              <Text style={styles.name}>{entry.name}</Text>
              <Text style={styles.detail}>
                Nível {entry.level} · {entry.daysSurvived} dias vividos
              </Text>
              <Text style={styles.detail}>
                {challenge?.name ?? '—'} · {difficulty?.label ?? '—'}
              </Text>
              <Text style={styles.detail}>
                {formatDate(entry.bornAt)} – {formatDate(entry.diedAt)}
              </Text>
              <Text style={styles.reason}>{entry.deathReason}</Text>
            </View>
          </Card>
        );
      })}
    </ScreenContainer>
  );
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('pt-BR');
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  sprite: {
    opacity: 0.75,
  },
  info: {
    flex: 1,
    gap: 2,
  },
  name: {
    color: colors.textPrimary,
    fontFamily: pixelFont,
    fontSize: pixelSize.sm,
    marginBottom: spacing.xs,
  },
  detail: {
    color: colors.textSecondary,
    fontSize: fontSize.xs,
  },
  reason: {
    color: colors.danger,
    fontSize: fontSize.xs,
  },
});
