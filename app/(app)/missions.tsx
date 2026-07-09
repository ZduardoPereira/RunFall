import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { Button, Card, MissionTemplateEditor, ScreenContainer } from '@/src/components';
import { TIER_LABEL } from '@/src/constants/missionPresets';
import { useCharacterStore } from '@/src/store';
import { colors, fontSize, fontWeight, spacing } from '@/src/theme';

export default function Missions() {
  const router = useRouter();
  const character = useCharacterStore((s) => s.character);
  const ensureTodayMissions = useCharacterStore((s) => s.ensureTodayMissions);
  const completeMission = useCharacterStore((s) => s.completeMission);
  const failMission = useCharacterStore((s) => s.failMission);
  const addMissionTemplate = useCharacterStore((s) => s.addMissionTemplate);
  const updateMissionTemplate = useCharacterStore((s) => s.updateMissionTemplate);
  const removeMissionTemplate = useCharacterStore((s) => s.removeMissionTemplate);
  const [showRoutine, setShowRoutine] = useState(false);

  useEffect(() => {
    ensureTodayMissions();
  }, [ensureTodayMissions]);

  if (!character) return null;

  const handleFail = (missionId: string) => {
    const result = failMission(missionId);
    if (result === 'dead') {
      router.replace('/death');
    }
  };

  return (
    <ScreenContainer>
      <Text style={styles.title}>Missões de hoje</Text>

      {character.challengeCompleted ? (
        <Text style={styles.subtitle}>
          Desafio concluído! Volte ao Dashboard para começar um novo desafio antes de continuar.
        </Text>
      ) : (
        <>
          <Text style={styles.subtitle}>Complete ou falhe cada missão para ver o efeito em HP e XP.</Text>

          {character.todayMissions.map((mission) => {
            const resolution = mission.completed ? 'completed' : mission.failed ? 'failed' : null;
            return (
              <Card key={mission.id} style={styles.card}>
                <View style={styles.cardHeader}>
                  <Text style={styles.cardTitle}>{mission.title}</Text>
                  <Text style={[styles.tierBadge, mission.tier === 'death' && styles.tierBadgeDeath]}>
                    {TIER_LABEL[mission.tier]}
                  </Text>
                </View>
                {mission.description ? <Text style={styles.cardDescription}>{mission.description}</Text> : null}

                {resolution ? (
                  <Text style={resolution === 'completed' ? styles.resolvedOk : styles.resolvedFail}>
                    {resolution === 'completed' ? 'Concluída' : 'Falhou'}
                  </Text>
                ) : (
                  <View style={styles.actions}>
                    <Button label="Concluir" onPress={() => completeMission(mission.id)} />
                    <Button label="Falhar" variant="danger" onPress={() => handleFail(mission.id)} />
                  </View>
                )}
              </Card>
            );
          })}

          {character.todayMissions.length === 0 ? (
            <Text style={styles.subtitle}>Nenhuma missão na sua rotina ainda. Adicione uma abaixo.</Text>
          ) : null}
        </>
      )}

      <Button
        label={showRoutine ? 'Ocultar minha rotina' : 'Minha rotina'}
        variant="secondary"
        onPress={() => setShowRoutine((v) => !v)}
      />

      {showRoutine ? (
        <View style={styles.routineSection}>
          <Text style={styles.sectionTitle}>Minha rotina</Text>
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
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
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
  tierBadge: {
    color: colors.textMuted,
    fontSize: fontSize.xs,
    textTransform: 'uppercase',
  },
  tierBadgeDeath: {
    color: colors.danger,
    fontWeight: fontWeight.bold,
  },
  actions: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  resolvedOk: {
    color: colors.success,
    fontSize: fontSize.sm,
    fontWeight: fontWeight.medium,
  },
  resolvedFail: {
    color: colors.danger,
    fontSize: fontSize.sm,
    fontWeight: fontWeight.medium,
  },
  routineSection: {
    marginTop: spacing.xl,
  },
  sectionTitle: {
    color: colors.textPrimary,
    fontSize: fontSize.md,
    fontWeight: fontWeight.semibold,
    marginBottom: spacing.xs,
  },
  note: {
    color: colors.textMuted,
    fontSize: fontSize.xs,
    marginBottom: spacing.md,
  },
});
