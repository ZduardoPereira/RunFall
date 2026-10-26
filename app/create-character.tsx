import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';

import { Avatar, Button, Card, OptionPicker, PixelText, ScreenContainer } from '@/src/components';
import { APPEARANCE_OPTIONS, DEFAULT_APPEARANCE } from '@/src/constants/appearance';
import { useCemeteryStore, useCharacterStore } from '@/src/store';
import { colors, fontSize, pixelFont, pixelSize, radius, spacing } from '@/src/theme';
import type { CharacterAppearance, Gender } from '@/src/types';

const GENDERS: { id: Gender; label: string }[] = [
  { id: 'male', label: 'Masculino' },
  { id: 'female', label: 'Feminino' },
  { id: 'unspecified', label: 'Não informar' },
];

const BEARD_OPTIONS = ['Sem barba', 'Com barba'] as const;

// The preview shows the bare character; shop cosmetics come later.
const NO_COSMETICS = {};

export default function CreateCharacter() {
  const router = useRouter();
  const createCharacter = useCharacterStore((s) => s.createCharacter);
  const isNameLocked = useCemeteryStore((s) => s.isNameLocked);

  const [name, setName] = useState('');
  const [gender, setGender] = useState<Gender>('unspecified');
  const [appearance, setAppearance] = useState<CharacterAppearance>(DEFAULT_APPEARANCE);
  const [error, setError] = useState<string | null>(null);

  const updateAppearance = <K extends keyof CharacterAppearance>(key: K, value: CharacterAppearance[K]) =>
    setAppearance((prev) => ({ ...prev, [key]: value }));

  const randomize = () => {
    const pick = <T,>(list: readonly T[]) => list[Math.floor(Math.random() * list.length)];
    const accessory = pick(APPEARANCE_OPTIONS.accessory);
    setAppearance({
      hairStyle: pick(APPEARANCE_OPTIONS.hairStyle),
      hairColor: pick(APPEARANCE_OPTIONS.hairColor),
      hasBeard: Math.random() < 0.3,
      skinTone: pick(APPEARANCE_OPTIONS.skinTone),
      outfit: pick(APPEARANCE_OPTIONS.outfit),
      outfitColor: pick(APPEARANCE_OPTIONS.outfitColor),
      eyes: pick(APPEARANCE_OPTIONS.eyes),
      accessory: accessory === 'Nenhum' ? null : accessory,
      expression: pick(APPEARANCE_OPTIONS.expression),
    });
  };

  const handleSubmit = () => {
    const trimmed = name.trim();
    if (trimmed.length < 3 || trimmed.length > 20) {
      setError('O nome deve ter entre 3 e 20 caracteres.');
      return;
    }
    if (isNameLocked(trimmed)) {
      setError('Este nome já pertence a um personagem falecido e está bloqueado.');
      return;
    }

    createCharacter({ name: trimmed, gender, appearance });
    router.replace('/select-challenge');
  };

  return (
    <ScreenContainer>
      <View style={styles.preview}>
        <Avatar appearance={appearance} size={160} equipped={NO_COSMETICS} animated framed />
        <Text style={styles.previewName}>{name.trim() || '???'}</Text>
        <Pressable onPress={randomize} hitSlop={8}>
          <Text style={styles.randomize}>Aleatório</Text>
        </Pressable>
      </View>

      <View style={styles.section}>
        <PixelText>Nome</PixelText>
        <TextInput
          value={name}
          onChangeText={(text) => {
            setName(text);
            setError(null);
          }}
          placeholder="Nome do personagem"
          placeholderTextColor={colors.textMuted}
          maxLength={20}
          style={styles.input}
        />
        {error ? <Text style={styles.error}>{error}</Text> : null}
      </View>

      <View style={styles.section}>
        <PixelText>Gênero</PixelText>
        <View style={styles.genderRow}>
          {GENDERS.map((g) => (
            <Pressable
              key={g.id}
              onPress={() => setGender(g.id)}
              style={[styles.genderOption, gender === g.id && styles.genderOptionSelected]}
            >
              <Text style={[styles.genderLabel, gender === g.id && styles.genderLabelSelected]}>{g.label}</Text>
            </Pressable>
          ))}
        </View>
      </View>

      <View style={styles.section}>
        <PixelText>Aparência</PixelText>
        <Card style={styles.appearanceCard}>
          <OptionPicker
            label="Cabelo"
            options={APPEARANCE_OPTIONS.hairStyle}
            value={appearance.hairStyle}
            onChange={(v) => updateAppearance('hairStyle', v)}
          />
          <OptionPicker
            label="Cor do cabelo"
            options={APPEARANCE_OPTIONS.hairColor}
            value={appearance.hairColor}
            onChange={(v) => updateAppearance('hairColor', v)}
          />
          <OptionPicker
            label="Barba"
            options={BEARD_OPTIONS}
            value={appearance.hasBeard ? BEARD_OPTIONS[1] : BEARD_OPTIONS[0]}
            onChange={(v) => updateAppearance('hasBeard', v === BEARD_OPTIONS[1])}
          />
          <OptionPicker
            label="Tom de pele"
            options={APPEARANCE_OPTIONS.skinTone}
            value={appearance.skinTone}
            onChange={(v) => updateAppearance('skinTone', v)}
          />
          <OptionPicker
            label="Roupa"
            options={APPEARANCE_OPTIONS.outfit}
            value={appearance.outfit}
            onChange={(v) => updateAppearance('outfit', v)}
          />
          <OptionPicker
            label="Cor da roupa"
            options={APPEARANCE_OPTIONS.outfitColor}
            value={appearance.outfitColor}
            onChange={(v) => updateAppearance('outfitColor', v)}
          />
          <OptionPicker
            label="Olhos"
            options={APPEARANCE_OPTIONS.eyes}
            value={appearance.eyes}
            onChange={(v) => updateAppearance('eyes', v)}
          />
          <OptionPicker
            label="Acessório"
            options={APPEARANCE_OPTIONS.accessory}
            value={appearance.accessory ?? APPEARANCE_OPTIONS.accessory[0]}
            onChange={(v) => updateAppearance('accessory', v === 'Nenhum' ? null : v)}
          />
          <OptionPicker
            label="Expressão"
            options={APPEARANCE_OPTIONS.expression}
            value={appearance.expression}
            onChange={(v) => updateAppearance('expression', v)}
          />
        </Card>
      </View>

      <Button label="Continuar" onPress={handleSubmit} />
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  preview: {
    alignItems: 'center',
    gap: spacing.md,
    marginBottom: spacing.xl,
  },
  previewName: {
    color: colors.gold,
    fontFamily: pixelFont,
    fontSize: pixelSize.md,
  },
  randomize: {
    color: colors.accent,
    fontFamily: pixelFont,
    fontSize: pixelSize.xs,
  },
  section: {
    gap: spacing.md,
    marginBottom: spacing.xl,
  },
  input: {
    backgroundColor: colors.surfaceAlt,
    borderRadius: radius.md,
    borderWidth: 2,
    borderColor: colors.border,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    color: colors.textPrimary,
    fontSize: fontSize.md,
  },
  error: {
    color: colors.danger,
    fontSize: fontSize.sm,
  },
  genderRow: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  genderOption: {
    flex: 1,
    paddingVertical: spacing.sm,
    borderRadius: radius.md,
    borderWidth: 2,
    borderColor: colors.border,
    backgroundColor: colors.surfaceAlt,
    alignItems: 'center',
  },
  genderOptionSelected: {
    borderColor: colors.accent,
    backgroundColor: colors.surface,
  },
  genderLabel: {
    color: colors.textSecondary,
    fontSize: fontSize.sm,
  },
  genderLabelSelected: {
    color: colors.textPrimary,
    fontWeight: '600',
  },
  appearanceCard: {
    gap: spacing.lg,
  },
});
