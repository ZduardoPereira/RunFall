import { useLocalSearchParams, useRouter } from 'expo-router';
import { Pressable, StyleSheet, Text } from 'react-native';

import { Card, ScreenContainer } from '@/src/components';
import { colors, fontSize, fontWeight, spacing } from '@/src/theme';

const MODES = [
  {
    id: 'preset',
    title: 'Desafios pré-definidos',
    description: 'Escolha um nível de dificuldade e receba uma rotina de missões pronta.',
    href: '/select-difficulty' as const,
  },
  {
    id: 'manual',
    title: 'Criar manualmente',
    description: 'Monte sua própria rotina, escolhendo o título e o nível de cada missão.',
    href: '/manual-missions' as const,
  },
];

export default function SelectMode() {
  const router = useRouter();
  const { challengeId } = useLocalSearchParams<{ challengeId: string }>();

  return (
    <ScreenContainer>
      <Text style={styles.title}>Como você quer montar sua rotina?</Text>
      <Text style={styles.subtitle}>Você pode usar uma rotina pré-definida por dificuldade ou criar a sua do zero.</Text>

      {MODES.map((mode) => (
        <Pressable
          key={mode.id}
          onPress={() => router.push({ pathname: mode.href, params: { challengeId } })}
        >
          <Card style={styles.card}>
            <Text style={styles.cardTitle}>{mode.title}</Text>
            <Text style={styles.cardDescription}>{mode.description}</Text>
          </Card>
        </Pressable>
      ))}
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  title: {
    color: colors.textPrimary,
    fontSize: fontSize.xl,
    fontWeight: fontWeight.bold,
    marginBottom: spacing.xs,
  },
  subtitle: {
    color: colors.textSecondary,
    fontSize: fontSize.sm,
    marginBottom: spacing.xl,
  },
  card: {
    marginBottom: spacing.md,
  },
  cardTitle: {
    color: colors.textPrimary,
    fontSize: fontSize.md,
    fontWeight: fontWeight.semibold,
  },
  cardDescription: {
    color: colors.textSecondary,
    fontSize: fontSize.sm,
  },
});
