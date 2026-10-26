import { useState } from 'react';
import { StyleSheet, Text, TextInput } from 'react-native';

import { Button, Card, Heading, PixelText, ScreenContainer } from '@/src/components';
import { useCharacterStore } from '@/src/store';
import { colors, fontSize, radius, spacing } from '@/src/theme';

const PLANNED_SETTINGS = ['Notificações diárias', 'Sons e vibração', 'Exportar dados', 'Sobre o RunFall'];

/** Time travel for testing: moves the app's clock forward and closes the days
 * exactly as midnight would. Death is handled by the (app) layout redirect. */
function DevTools() {
  const devAdvanceDays = useCharacterStore((s) => s.devAdvanceDays);
  const dayOffset = useCharacterStore((s) => s.dayOffset);
  const [customDays, setCustomDays] = useState('1');
  const [lastResult, setLastResult] = useState<string | null>(null);

  const run = (n: number, completePending: boolean) => {
    const result = devAdvanceDays(n, completePending);
    if (!result.died) setLastResult(`Avançou ${result.daysAdvanced} dia(s).`);
  };

  return (
    <Card style={styles.card}>
      <PixelText>Ferramentas de teste</PixelText>
      <Text style={styles.hint}>Relógio do app adiantado em {dayOffset} dia(s).</Text>
      <Button label="+1 dia concluindo tudo" variant="secondary" onPress={() => run(1, true)} />
      <Button label="+1 dia falhando pendentes" variant="secondary" onPress={() => run(1, false)} />
      <Button label="+7 dias concluindo tudo" variant="secondary" onPress={() => run(7, true)} />
      <TextInput
        value={customDays}
        onChangeText={setCustomDays}
        keyboardType="number-pad"
        placeholder="Número de dias"
        placeholderTextColor={colors.textMuted}
        style={styles.input}
      />
      <Button
        label="+N dias concluindo tudo"
        variant="secondary"
        onPress={() => run(Math.max(1, parseInt(customDays, 10) || 1), true)}
      />
      {lastResult ? <Text style={styles.hint}>{lastResult}</Text> : null}
    </Card>
  );
}

export default function Settings() {
  return (
    <ScreenContainer>
      <Heading title="Ajustes" />
      {PLANNED_SETTINGS.map((label) => (
        <Card key={label} style={styles.card}>
          <Text style={styles.label}>{label}</Text>
          <Text style={styles.soon}>Em breve</Text>
        </Card>
      ))}

      {__DEV__ ? <DevTools /> : null}
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  card: {
    marginBottom: spacing.md,
  },
  label: {
    color: colors.textPrimary,
    fontSize: fontSize.md,
    fontWeight: '600',
  },
  soon: {
    color: colors.textMuted,
    fontSize: fontSize.xs,
  },
  hint: {
    color: colors.textSecondary,
    fontSize: fontSize.sm,
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
});
