import type { Href } from 'expo-router';
import { useRouter } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { Avatar, Button, Card, GoldBadge, PixelText, ProgressBar, ScreenContainer } from '@/src/components';
import { CHALLENGES } from '@/src/constants/challenges';
import { difficultyOf } from '@/src/constants/difficulties';
import { xpProgressWithinLevel } from '@/src/constants/xp';
import { useCharacterStore } from '@/src/store';
import { colors, fontSize, pixelFont, pixelSize, radius, spacing } from '@/src/theme';

const MENU: { label: string; href: Href; color?: string }[] = [
  { label: 'Missões', href: '/(app)/missions', color: colors.accent },
  { label: 'Loja', href: '/(app)/shop', color: colors.gold },
  { label: 'Personagem', href: '/(app)/character' },
  { label: 'Evolução', href: '/(app)/evolution' },
  { label: 'Calendário', href: '/(app)/calendar' },
  { label: 'Conquistas', href: '/(app)/achievements' },
  { label: 'Histórico', href: '/(app)/history' },
  { label: 'Cemitério', href: '/cemetery' },
  { label: 'Ajustes', href: '/(app)/settings' },
];

export default function Dashboard() {
  const router = useRouter();
  const character = useCharacterStore((s) => s.character);

  if (!character) return null;

  const xpProgress = xpProgressWithinLevel(character.xp, character.level);
  const challenge = CHALLENGES.find((c) => c.id === character.challengeId);
  const difficulty = difficultyOf(character.difficultyId);
  const missions = character.todayMissions;
  const resolved = missions.filter((m) => m.completed || m.failed).length;
  const lowHp = character.hp <= character.maxHp * 0.3;

  return (
    <ScreenContainer>
      <View style={styles.header}>
        <Avatar appearance={character.appearance} size={96} animated framed />
        <View style={styles.headerInfo}>
          <Text style={styles.name} numberOfLines={1}>
            {character.name}
          </Text>
          <Text style={styles.meta}>
            Nível {character.level} · {character.routineMode === 'manual' ? 'Rotina própria' : difficulty.label}
          </Text>
          <GoldBadge amount={character.gold} />
        </View>
      </View>

      <Card style={styles.block}>
        <ProgressBar label="HP" value={character.hp} max={character.maxHp} color={colors.hp} />
        <ProgressBar
          label={`XP · Nv ${character.level}`}
          value={xpProgress.current}
          max={xpProgress.needed}
          color={colors.xp}
        />
        {lowHp ? <Text style={styles.warning}>HP baixo! Um dia perfeito recupera 10 HP.</Text> : null}
      </Card>

      {character.challengeCompleted ? (
        <Card style={[styles.block, styles.completeCard]}>
          <PixelText style={styles.completeTitle}>Desafio concluído!</PixelText>
          <Text style={styles.body}>
            Você completou &quot;{challenge?.name ?? 'o desafio'}&quot; em {character.challengeDayCount} dias. Gaste
            seu ouro na loja e comece o próximo.
          </Text>
          <Button label="Novo desafio" variant="success" onPress={() => router.push('/select-challenge')} />
        </Card>
      ) : (
        <>
          {challenge ? (
            <Card style={styles.block}>
              {challenge.lengthDays === 'infinite' ? (
                <PixelText>Dia {character.challengeDayCount + 1} · Sem fim</PixelText>
              ) : (
                <ProgressBar
                  label={`Desafio ${challenge.name}`}
                  value={character.challengeDayCount}
                  max={challenge.lengthDays}
                  color={colors.accent}
                />
              )}
            </Card>
          ) : null}

          <Pressable onPress={() => router.push('/(app)/missions')}>
            <Card style={[styles.block, styles.todayCard]}>
              <View style={styles.todayHeader}>
                <PixelText>Missões de hoje</PixelText>
                <PixelText style={styles.todayCount}>
                  {resolved}/{missions.length}
                </PixelText>
              </View>
              <View style={styles.pips}>
                {missions.map((m) => (
                  <View
                    key={m.id}
                    style={[
                      styles.pip,
                      m.completed && { backgroundColor: colors.success },
                      m.failed && { backgroundColor: colors.danger },
                    ]}
                  />
                ))}
              </View>
              <Text style={styles.body}>
                {resolved === missions.length && missions.length > 0
                  ? 'Tudo resolvido. O dia fecha sozinho à meia-noite.'
                  : 'O que ficar pendente à meia-noite conta como falha.'}
              </Text>
            </Card>
          </Pressable>
        </>
      )}

      <View style={styles.row}>
        <Stat value={character.daysSurvived} label="Dias vivos" />
        <Stat value={character.streak} label="Sequência" />
        <Stat value={character.bestStreak} label="Recorde" />
      </View>

      <View style={styles.menuGrid}>
        {MENU.map((item) => (
          <Pressable
            key={item.label}
            style={({ pressed }) => [
              styles.menuItem,
              item.color && { borderColor: item.color },
              pressed && styles.menuItemPressed,
            ]}
            onPress={() => router.push(item.href)}
          >
            <Text style={[styles.menuLabel, item.color && { color: item.color }]}>{item.label}</Text>
          </Pressable>
        ))}
      </View>
    </ScreenContainer>
  );
}

function Stat({ value, label }: { value: number; label: string }) {
  return (
    <Card style={styles.stat}>
      <Text style={styles.statValue}>{value}</Text>
      <Text style={styles.statLabel}>{label}</Text>
    </Card>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.lg,
    marginBottom: spacing.lg,
  },
  headerInfo: {
    flex: 1,
    gap: spacing.sm,
  },
  name: {
    color: colors.textPrimary,
    fontFamily: pixelFont,
    fontSize: pixelSize.lg,
    lineHeight: 22,
  },
  meta: {
    color: colors.textSecondary,
    fontSize: fontSize.sm,
  },
  block: {
    marginBottom: spacing.lg,
  },
  warning: {
    color: colors.danger,
    fontSize: fontSize.xs,
  },
  completeCard: {
    borderColor: colors.success,
  },
  completeTitle: {
    color: colors.success,
  },
  body: {
    color: colors.textSecondary,
    fontSize: fontSize.sm,
  },
  todayCard: {
    borderColor: colors.accent,
  },
  todayHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  todayCount: {
    color: colors.accent,
  },
  pips: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.xs,
  },
  pip: {
    width: 18,
    height: 18,
    borderRadius: radius.sm,
    borderWidth: 2,
    borderColor: colors.border,
    backgroundColor: colors.surfaceAlt,
  },
  row: {
    flexDirection: 'row',
    gap: spacing.md,
    marginBottom: spacing.xl,
  },
  stat: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: spacing.xs,
    gap: spacing.sm,
  },
  statValue: {
    color: colors.textPrimary,
    fontFamily: pixelFont,
    fontSize: pixelSize.lg,
  },
  statLabel: {
    color: colors.textMuted,
    fontSize: fontSize.xs,
  },
  menuGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
  },
  menuItem: {
    width: '31.5%',
    backgroundColor: colors.surface,
    borderWidth: 2,
    borderBottomWidth: 4,
    borderColor: colors.border,
    borderRadius: radius.lg,
    paddingVertical: spacing.lg,
    alignItems: 'center',
  },
  menuItemPressed: {
    borderBottomWidth: 2,
    marginTop: 2,
  },
  menuLabel: {
    color: colors.textPrimary,
    fontFamily: pixelFont,
    fontSize: pixelSize.xs,
  },
});
