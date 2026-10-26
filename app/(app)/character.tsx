import { useRouter } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';

import { Avatar, Button, Card, GoldBadge, PixelText, ScreenContainer } from '@/src/components';
import { COSMETICS, SLOT_LABEL } from '@/src/constants/cosmetics';
import { useCharacterStore, useCosmeticStore } from '@/src/store';
import { colors, fontSize, pixelFont, pixelSize, spacing } from '@/src/theme';
import type { CosmeticSlot } from '@/src/types';

const GENDER_LABEL: Record<string, string> = {
  male: 'Masculino',
  female: 'Feminino',
  unspecified: 'Não informado',
};

const SLOTS: CosmeticSlot[] = ['hat', 'cape', 'background'];

export default function CharacterScreen() {
  const router = useRouter();
  const character = useCharacterStore((s) => s.character);
  const equipped = useCosmeticStore((s) => s.equipped);
  if (!character) return null;

  const { appearance } = character;
  const rows: [string, string][] = [
    ['Gênero', GENDER_LABEL[character.gender]],
    ['Cabelo', `${appearance.hairStyle} · ${appearance.hairColor}`],
    ['Barba', appearance.hasBeard ? 'Sim' : 'Não'],
    ['Tom de pele', appearance.skinTone],
    ['Roupa', `${appearance.outfit} · ${appearance.outfitColor}`],
    ['Olhos', appearance.eyes],
    ['Acessório', appearance.accessory ?? 'Nenhum'],
    ['Expressão', appearance.expression],
  ];

  return (
    <ScreenContainer>
      <View style={styles.hero}>
        <Avatar appearance={appearance} size={192} animated framed />
        <Text style={styles.name}>{character.name}</Text>
        <Text style={styles.meta}>
          Nível {character.level} · {character.daysSurvived} dias vivo
        </Text>
        <GoldBadge amount={character.gold} />
      </View>

      <Card style={styles.card}>
        <PixelText>Equipado</PixelText>
        {SLOTS.map((slot) => {
          const item = COSMETICS.find((c) => c.id === equipped[slot]);
          return <Row key={slot} label={SLOT_LABEL[slot]} value={item?.name ?? '—'} />;
        })}
        <Button label="Ir para a loja" variant="gold" onPress={() => router.push('/(app)/shop')} />
      </Card>

      <Card style={styles.card}>
        <PixelText>Aparência</PixelText>
        {rows.map(([label, value]) => (
          <Row key={label} label={label} value={value} />
        ))}
      </Card>
    </ScreenContainer>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <View style={styles.row}>
      <Text style={styles.rowLabel}>{label}</Text>
      <Text style={styles.rowValue}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  hero: {
    alignItems: 'center',
    gap: spacing.md,
    marginBottom: spacing.xl,
  },
  name: {
    color: colors.textPrimary,
    fontFamily: pixelFont,
    fontSize: pixelSize.lg,
  },
  meta: {
    color: colors.textSecondary,
    fontSize: fontSize.sm,
  },
  card: {
    gap: spacing.sm,
    marginBottom: spacing.lg,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  rowLabel: {
    color: colors.textMuted,
    fontSize: fontSize.sm,
  },
  rowValue: {
    color: colors.textPrimary,
    fontSize: fontSize.sm,
    fontWeight: '500',
  },
});
