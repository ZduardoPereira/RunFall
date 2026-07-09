import type { Href } from 'expo-router';
import { useRouter } from 'expo-router';
import { useEffect } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { Button, Card, ProgressBar, ScreenContainer } from '@/src/components';
import { ACHIEVEMENT_DEFS } from '@/src/constants/achievements';
import { CHALLENGES } from '@/src/constants/challenges';
import { DIFFICULTIES } from '@/src/constants/difficulties';
import { xpProgressWithinLevel } from '@/src/constants/xp';
import { useAchievementStore, useCharacterStore } from '@/src/store';
import { colors, fontSize, fontWeight, radius, spacing } from '@/src/theme';

const MENU: { label: string; href: Href }[] = [
  { label: 'Missões', href: '/(app)/missions' },
  { label: 'Calendário', href: '/(app)/calendar' },
  { label: 'Evolução', href: '/(app)/evolution' },
  { label: 'Personagem', href: '/(app)/character' },
  { label: 'Conquistas', href: '/(app)/achievements' },
  { label: 'Histórico', href: '/(app)/history' },
  { label: 'Cemitério', href: '/cemetery' },
  { label: 'Configurações', href: '/(app)/settings' },
];

export default function Dashboard() {
  const router = useRouter();
  const character = useCharacterStore((s) => s.character);
  const ensureTodayMissions = useCharacterStore((s) => s.ensureTodayMissions);
  const unlockedAchievements = useAchievementStore((s) => s.unlocked);

  useEffect(() => {
    ensureTodayMissions();
  }, [ensureTodayMissions]);

  if (!character) return null;

  const xpProgress = xpProgressWithinLevel(character.xp, character.level);
  const challenge = CHALLENGES.find((c) => c.id === character.challengeId);
  const difficulty = DIFFICULTIES.find((d) => d.id === character.difficultyId);
  const unlockedList = ACHIEVEMENT_DEFS.filter((def) => unlockedAchievements[def.id]);

  return (
    <ScreenContainer>
      <Text style={styles.name}>{character.name}</Text>
      <Text style={styles.meta}>
        Nível {character.level} · {challenge?.name ?? 'Sem desafio'} · {difficulty?.label ?? '—'}
      </Text>

      <Card style={styles.statsCard}>
        <ProgressBar label="HP" value={character.hp} max={character.maxHp} color={colors.danger} />
        <ProgressBar label="Energia" value={character.energy} max={character.maxEnergy} color={colors.accent} />
        <ProgressBar
          label={`XP (Nível ${character.level})`}
          value={xpProgress.current}
          max={xpProgress.needed}
          color={colors.success}
        />
      </Card>

      {character.challengeCompleted ? (
        <Card style={styles.completeCard}>
          <Text style={styles.completeTitle}>Desafio concluído!</Text>
          <Text style={styles.completeText}>
            Você completou "{challenge?.name ?? 'o desafio'}" em {character.challengeDayCount} dias.
          </Text>
          {unlockedList.length > 0 ? (
            <View style={styles.achievementList}>
              <Text style={styles.sectionTitle}>Conquistas</Text>
              {unlockedList.map((def) => (
                <Text key={def.id} style={styles.achievementRow}>
                  • {def.title}
                </Text>
              ))}
            </View>
          ) : null}
          <Button label="Começar novo desafio" onPress={() => router.push('/select-challenge')} />
        </Card>
      ) : challenge ? (
        <Card style={styles.progressCard}>
          {challenge.lengthDays === 'infinite' ? (
            <Text style={styles.progressLabel}>Dia {character.challengeDayCount} · Hardcore (sem fim)</Text>
          ) : (
            <>
              <Text style={styles.progressLabel}>
                Dia {character.challengeDayCount} de {challenge.lengthDays}
              </Text>
              <ProgressBar
                label="Progresso do desafio"
                value={character.challengeDayCount}
                max={challenge.lengthDays}
                color={colors.accent}
              />
            </>
          )}
        </Card>
      ) : null}

      <View style={styles.row}>
        <Card style={styles.smallStat}>
          <Text style={styles.smallStatValue}>{character.daysSurvived}</Text>
          <Text style={styles.smallStatLabel}>Dias vivos</Text>
        </Card>
        <Card style={styles.smallStat}>
          <Text style={styles.smallStatValue}>{character.streak}</Text>
          <Text style={styles.smallStatLabel}>Sequência</Text>
        </Card>
        <Card style={styles.smallStat}>
          <Text style={styles.smallStatValue}>{character.missionsCompleted}</Text>
          <Text style={styles.smallStatLabel}>Concluídas</Text>
        </Card>
      </View>

      <Text style={styles.sectionTitle}>Menu</Text>
      <View style={styles.menuGrid}>
        {MENU.map((item) => (
          <Pressable key={item.label} style={styles.menuItem} onPress={() => router.push(item.href)}>
            <Text style={styles.menuLabel}>{item.label}</Text>
          </Pressable>
        ))}
      </View>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  name: {
    color: colors.textPrimary,
    fontSize: fontSize.xl,
    fontWeight: fontWeight.bold,
  },
  meta: {
    color: colors.textSecondary,
    fontSize: fontSize.sm,
    marginBottom: spacing.xl,
  },
  statsCard: {
    marginBottom: spacing.lg,
  },
  progressCard: {
    marginBottom: spacing.lg,
  },
  progressLabel: {
    color: colors.textPrimary,
    fontSize: fontSize.sm,
    fontWeight: fontWeight.medium,
  },
  completeCard: {
    marginBottom: spacing.lg,
    borderColor: colors.success,
  },
  completeTitle: {
    color: colors.success,
    fontSize: fontSize.lg,
    fontWeight: fontWeight.bold,
  },
  completeText: {
    color: colors.textSecondary,
    fontSize: fontSize.sm,
  },
  achievementList: {
    gap: spacing.xs,
  },
  achievementRow: {
    color: colors.textPrimary,
    fontSize: fontSize.sm,
  },
  row: {
    flexDirection: 'row',
    gap: spacing.md,
    marginBottom: spacing.xl,
  },
  smallStat: {
    flex: 1,
    alignItems: 'center',
  },
  smallStatValue: {
    color: colors.textPrimary,
    fontSize: fontSize.lg,
    fontWeight: fontWeight.bold,
  },
  smallStatLabel: {
    color: colors.textMuted,
    fontSize: fontSize.xs,
  },
  sectionTitle: {
    color: colors.textPrimary,
    fontSize: fontSize.md,
    fontWeight: fontWeight.semibold,
    marginBottom: spacing.md,
  },
  menuGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.md,
  },
  menuItem: {
    width: '47%',
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.lg,
    paddingVertical: spacing.lg,
    alignItems: 'center',
  },
  menuLabel: {
    color: colors.textPrimary,
    fontSize: fontSize.sm,
    fontWeight: fontWeight.medium,
  },
});
