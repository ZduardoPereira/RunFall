import { useState } from 'react';
import { Alert, StyleSheet, Text, View } from 'react-native';

import { Button, Card, Heading, MissionTemplateEditor, PixelText, ScreenContainer } from '@/src/components';
import { hpLossFor } from '@/src/constants/hp';
import { TIER_LABEL } from '@/src/constants/missionPresets';
import { MISSION_GOLD, missionXpFor } from '@/src/constants/xp';
import { useCharacterStore } from '@/src/store';
import { colors, fontSize, pixelFont, pixelSize, radius, spacing, tierColors } from '@/src/theme';
import type { Mission } from '@/src/types';

export default function Missions() {
  const character = useCharacterStore((s) => s.character);
  const completeMission = useCharacterStore((s) => s.completeMission);
  const failMission = useCharacterStore((s) => s.failMission);
  const addMissionTemplate = useCharacterStore((s) => s.addMissionTemplate);
  const updateMissionTemplate = useCharacterStore((s) => s.updateMissionTemplate);
  const removeMissionTemplate = useCharacterStore((s) => s.removeMissionTemplate);
  const [showRoutine, setShowRoutine] = useState(false);

  if (!character) return null;

  // Death is handled by the (app) layout, which redirects once the character is gone.
  const handleFail = (mission: Mission) => {
    if (mission.tier !== 'death') {
      failMission(mission.id);
      return;
    }
    Alert.alert('Missão de morte', `Falhar "${mission.title}" mata ${character.name} para sempre. Tem certeza?`, [
      { text: 'Cancelar', style: 'cancel' },
      { text: 'Falhar', style: 'destructive', onPress: () => failMission(mission.id) },
    ]);
  };

  return (
    <ScreenContainer>
      <Heading
        title="Missões de hoje"
        subtitle={
          character.challengeCompleted
            ? 'Desafio concluído! Volte ao início para começar um novo desafio.'
            : 'Conclua cada missão até a meia-noite. O que ficar pendente conta como falha.'
        }
      />

      {!character.challengeCompleted
        ? character.todayMissions.map((mission) => (
            <MissionCard
              key={mission.id}
              mission={mission}
              xp={missionXpFor(mission.tier, character.difficultyId)}
              penalty={mission.tier === 'death' ? 'MORTE' : `-${hpLossFor(mission.tier, character.difficultyId)} HP`}
              onComplete={() => completeMission(mission.id)}
              onFail={() => handleFail(mission)}
            />
          ))
        : null}

      {!character.challengeCompleted && character.todayMissions.length === 0 ? (
        <Text style={styles.note}>Nenhuma missão hoje. Adicione missões à sua rotina abaixo; elas valem a partir de amanhã.</Text>
      ) : null}

      <View style={styles.routineToggle}>
        <Button
          label={showRoutine ? 'Ocultar rotina' : 'Editar rotina'}
          variant="secondary"
          onPress={() => setShowRoutine((v) => !v)}
        />
      </View>

      {showRoutine ? (
        <View style={styles.routineSection}>
          <PixelText>Minha rotina</PixelText>
          <Text style={styles.note}>Toque numa missão para editar. Mudanças valem a partir de amanhã.</Text>
          <MissionTemplateEditor
            templates={character.missionTemplates}
            onAdd={addMissionTemplate}
            onUpdate={updateMissionTemplate}
            onRemove={removeMissionTemplate}
          />
        </View>
      ) : null}
    </ScreenContainer>
  );
}

interface MissionCardProps {
  mission: Mission;
  xp: number;
  penalty: string;
  onComplete: () => void;
  onFail: () => void;
}

function MissionCard({ mission, xp, penalty, onComplete, onFail }: MissionCardProps) {
  const tierColor = tierColors[mission.tier];
  const resolved = mission.completed || mission.failed;

  return (
    <Card style={[styles.card, { borderLeftColor: tierColor }, resolved && styles.cardResolved]}>
      <View style={styles.cardHeader}>
        <Text style={[styles.cardTitle, mission.completed && styles.titleDone]}>{mission.title}</Text>
        <Text style={[styles.tier, { color: tierColor }]}>{TIER_LABEL[mission.tier]}</Text>
      </View>
      {mission.description ? <Text style={styles.description}>{mission.description}</Text> : null}

      <View style={styles.chips}>
        <Chip text={`+${xp} XP`} color={colors.xp} />
        <Chip text={`+${MISSION_GOLD[mission.tier]} ouro`} color={colors.gold} />
        <Chip text={penalty} color={colors.danger} />
      </View>

      {resolved ? (
        <PixelText style={{ color: mission.completed ? colors.success : colors.danger }}>
          {mission.completed ? 'Concluída' : 'Falhou'}
        </PixelText>
      ) : (
        <View style={styles.actions}>
          <Button label="Concluir" variant="success" compact style={styles.action} onPress={onComplete} />
          <Button label="Falhar" variant="danger" compact style={styles.action} onPress={onFail} />
        </View>
      )}
    </Card>
  );
}

function Chip({ text, color }: { text: string; color: string }) {
  return (
    <View style={[styles.chip, { borderColor: color }]}>
      <Text style={[styles.chipText, { color }]}>{text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderLeftWidth: 6,
    marginBottom: spacing.md,
  },
  cardResolved: {
    opacity: 0.6,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: spacing.sm,
  },
  cardTitle: {
    color: colors.textPrimary,
    fontSize: fontSize.md,
    fontWeight: '600',
    flexShrink: 1,
  },
  titleDone: {
    textDecorationLine: 'line-through',
  },
  tier: {
    fontFamily: pixelFont,
    fontSize: pixelSize.xs,
  },
  description: {
    color: colors.textSecondary,
    fontSize: fontSize.sm,
  },
  chips: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.xs,
  },
  chip: {
    borderWidth: 1,
    borderRadius: radius.sm,
    paddingHorizontal: spacing.xs + 2,
    paddingVertical: 3,
  },
  chipText: {
    fontFamily: pixelFont,
    fontSize: pixelSize.xs,
  },
  actions: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  action: {
    flex: 1,
  },
  note: {
    color: colors.textMuted,
    fontSize: fontSize.sm,
    marginBottom: spacing.md,
  },
  routineToggle: {
    marginTop: spacing.md,
  },
  routineSection: {
    marginTop: spacing.xl,
    gap: spacing.sm,
  },
});
