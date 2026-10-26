import { useLocalSearchParams, useRouter } from 'expo-router';
import { useState } from 'react';

import { Button, Heading, MissionTemplateEditor, ScreenContainer } from '@/src/components';
import { useCharacterStore } from '@/src/store';
import type { MissionTemplate } from '@/src/types';

export default function ManualMissions() {
  const router = useRouter();
  const { challengeId } = useLocalSearchParams<{ challengeId: string }>();
  const startChallenge = useCharacterStore((s) => s.startChallenge);
  const [templates, setTemplates] = useState<MissionTemplate[]>([]);

  const handleAdd = (template: MissionTemplate) => setTemplates((prev) => [...prev, template]);
  const handleRemove = (id: string) => setTemplates((prev) => prev.filter((t) => t.id !== id));

  const handleContinue = () => {
    if (!challengeId || templates.length === 0) return;
    startChallenge({ challengeId, difficultyId: 'medium', routineMode: 'manual', templates });
    router.dismissTo('/(app)/dashboard');
  };

  return (
    <ScreenContainer>
      <Heading
        title="Monte sua rotina"
        subtitle="Crie suas próprias missões e escolha o nível de cada uma. O nível define o XP ganho e quanto HP você perde ao falhar."
      />

      <MissionTemplateEditor templates={templates} onAdd={handleAdd} onRemove={handleRemove} />

      <Button label="Começar" onPress={handleContinue} disabled={templates.length === 0} />
    </ScreenContainer>
  );
}
