import { useLocalSearchParams, useRouter } from 'expo-router';

import { ChoiceCard, Heading, ScreenContainer } from '@/src/components';
import { colors } from '@/src/theme';

const MODES = [
  {
    id: 'preset',
    title: 'Rotina pronta',
    description: 'Escolha um nível de dificuldade e receba uma rotina de missões pronta.',
    href: '/select-difficulty' as const,
    accent: colors.accent,
  },
  {
    id: 'manual',
    title: 'Criar manualmente',
    description: 'Monte sua própria rotina, escolhendo o título e o nível de cada missão. Usa a dificuldade Média.',
    href: '/manual-missions' as const,
    accent: colors.gold,
  },
];

export default function SelectMode() {
  const router = useRouter();
  const { challengeId } = useLocalSearchParams<{ challengeId: string }>();

  return (
    <ScreenContainer>
      <Heading
        title="Sua rotina"
        subtitle="Use uma rotina pré-definida por dificuldade ou crie a sua do zero."
      />

      {MODES.map((mode) => (
        <ChoiceCard
          key={mode.id}
          title={mode.title}
          description={mode.description}
          accent={mode.accent}
          onPress={() => router.push({ pathname: mode.href, params: { challengeId } })}
        />
      ))}
    </ScreenContainer>
  );
}
