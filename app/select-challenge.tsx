import { useRouter } from 'expo-router';
import { useState } from 'react';

import { Button, ChoiceCard, Heading, ScreenContainer } from '@/src/components';
import { CHALLENGES } from '@/src/constants/challenges';
import { colors } from '@/src/theme';

export default function SelectChallenge() {
  const router = useRouter();
  const [selected, setSelected] = useState<string | null>(null);

  const handleContinue = () => {
    if (!selected) return;
    router.push({ pathname: '/select-mode', params: { challengeId: selected } });
  };

  return (
    <ScreenContainer>
      <Heading
        title="Escolha um desafio"
        subtitle="A duração do desafio define quanto tempo seu personagem precisa sobreviver."
      />

      {CHALLENGES.map((challenge) => (
        <ChoiceCard
          key={challenge.id}
          title={challenge.name}
          description={challenge.description}
          tag={challenge.lengthDays === 'infinite' ? 'Sem fim' : `${challenge.lengthDays}d`}
          accent={challenge.lengthDays === 'infinite' ? colors.danger : colors.accent}
          selected={selected === challenge.id}
          onPress={() => setSelected(challenge.id)}
        />
      ))}

      <Button label="Continuar" onPress={handleContinue} disabled={!selected} />
    </ScreenContainer>
  );
}
