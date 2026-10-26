import { useLocalSearchParams, useRouter } from 'expo-router';
import { useState } from 'react';

import { Button, ChoiceCard, Heading, ScreenContainer } from '@/src/components';
import { DIFFICULTIES } from '@/src/constants/difficulties';
import { generateMissionsForDifficulty } from '@/src/constants/missionPresets';
import { useCharacterStore } from '@/src/store';
import { tierColors } from '@/src/theme';
import type { DifficultyId } from '@/src/types';

const DIFFICULTY_ACCENT: Record<DifficultyId, string> = {
  easy: tierColors.simple,
  medium: tierColors.medium,
  hard: tierColors.hard,
  hardcore: tierColors.death,
};

export default function SelectDifficulty() {
  const router = useRouter();
  const { challengeId } = useLocalSearchParams<{ challengeId: string }>();
  const startChallenge = useCharacterStore((s) => s.startChallenge);
  const [selected, setSelected] = useState<DifficultyId | null>(null);

  const handleContinue = () => {
    if (!selected || !challengeId) return;
    startChallenge({
      challengeId,
      difficultyId: selected,
      routineMode: 'preset',
      templates: generateMissionsForDifficulty(selected),
    });
    router.dismissTo('/(app)/dashboard');
  };

  return (
    <ScreenContainer>
      <Heading
        title="Dificuldade"
        subtitle="A dificuldade define quantas missões você recebe, quanto XP ganha e quanto uma falha custa."
      />

      {DIFFICULTIES.map((difficulty) => (
        <ChoiceCard
          key={difficulty.id}
          title={difficulty.label}
          description={difficulty.description}
          tag={`x${difficulty.xpMultiplier} XP`}
          accent={DIFFICULTY_ACCENT[difficulty.id]}
          selected={selected === difficulty.id}
          onPress={() => setSelected(difficulty.id)}
        />
      ))}

      <Button label="Começar" onPress={handleContinue} disabled={!selected} />
    </ScreenContainer>
  );
}
