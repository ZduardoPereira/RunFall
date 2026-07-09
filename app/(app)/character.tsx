import { StyleSheet, Text, View } from 'react-native';

import { Card, ScreenContainer } from '@/src/components';
import { useCharacterStore } from '@/src/store';
import { colors, fontSize, fontWeight, spacing } from '@/src/theme';

const GENDER_LABEL: Record<string, string> = {
  male: 'Masculino',
  female: 'Feminino',
  unspecified: 'Não informado',
};

export default function CharacterScreen() {
  const character = useCharacterStore((s) => s.character);
  if (!character) return null;

  const rows: [string, string][] = [
    ['Ouro', String(character.gold)],
    ['Pontos de atributo', String(character.attributePoints)],
    ['Gênero', GENDER_LABEL[character.gender]],
    ['Cabelo', character.appearance.hairStyle],
    ['Cor do cabelo', character.appearance.hairColor],
    ['Tom de pele', character.appearance.skinTone],
    ['Roupa', character.appearance.outfit],
    ['Cor da roupa', character.appearance.outfitColor],
    ['Olhos', character.appearance.eyes],
    ['Acessório', character.appearance.accessory ?? 'Nenhum'],
    ['Expressão', character.appearance.expression],
  ];

  return (
    <ScreenContainer>
      <Text style={styles.title}>{character.name}</Text>
      <Card style={styles.card}>
        {rows.map(([label, value]) => (
          <View key={label} style={styles.row}>
            <Text style={styles.rowLabel}>{label}</Text>
            <Text style={styles.rowValue}>{value}</Text>
          </View>
        ))}
      </Card>
      <Text style={styles.note}>A ilustração visual do personagem é um próximo passo.</Text>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  title: {
    color: colors.textPrimary,
    fontSize: fontSize.xl,
    fontWeight: fontWeight.bold,
    marginBottom: spacing.xl,
  },
  card: {
    gap: spacing.sm,
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
    fontWeight: fontWeight.medium,
  },
  note: {
    color: colors.textMuted,
    fontSize: fontSize.sm,
    marginTop: spacing.xl,
  },
});
