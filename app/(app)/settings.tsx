import { useRouter } from 'expo-router';
import { useState } from 'react';
import { StyleSheet, Text, TextInput } from 'react-native';

import { Button, Card, ScreenContainer } from '@/src/components';
import { useCharacterStore } from '@/src/store';
import { colors, fontSize, fontWeight, radius, spacing } from '@/src/theme';

const PLANNED_SETTINGS = ['Notificações diárias', 'Sons e vibração', 'Exportar dados', 'Sobre o RunFall'];

function DevTools() {
  const router = useRouter();
  const skipDays = useCharacterStore((s) => s.skipDays);
  const [customDays, setCustomDays] = useState('1');
  const [lastResult, setLastResult] = useState<string | null>(null);

  const runSkip = (n: number) => {
    const result = skipDays(n);
    if (result.died) {
      router.replace('/death');
      return;
    }
    setLastResult(`Avançou ${result.daysAdvanced} dia(s).`);
  };

  return (
    <Card style={styles.card}>
      <Text style={styles.label}>Ferramentas de teste</Text>
      <Text style={styles.hint}>
        Resolve as missões pendentes de hoje (falhando as que não foram concluídas) e avança o dia.
      </Text>
      <Button label="Pular 1 dia" variant="secondary" onPress={() => runSkip(1)} />
      <Button label="Pular 7 dias (1 semana)" variant="secondary" onPress={() => runSkip(7)} />
      <TextInput
        value={customDays}
        onChangeText={setCustomDays}
        keyboardType="number-pad"
        placeholder="Número de dias"
        placeholderTextColor={colors.textMuted}
        style={styles.input}
      />
      <Button label="Pular N dias" variant="secondary" onPress={() => runSkip(Math.max(1, parseInt(customDays, 10) || 1))} />
      {lastResult ? <Text style={styles.hint}>{lastResult}</Text> : null}
    </Card>
  );
}

export default function Settings() {
  return (
    <ScreenContainer>
      <Text style={styles.title}>Configurações</Text>
      {PLANNED_SETTINGS.map((label) => (
        <Card key={label} style={styles.card}>
          <Text style={styles.label}>{label}</Text>
        </Card>
      ))}

      {__DEV__ ? <DevTools /> : null}
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
    marginBottom: spacing.md,
  },
  label: {
    color: colors.textPrimary,
    fontSize: fontSize.md,
    fontWeight: fontWeight.semibold,
  },
  hint: {
    color: colors.textSecondary,
    fontSize: fontSize.sm,
  },
  input: {
    backgroundColor: colors.surfaceAlt,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.border,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    color: colors.textPrimary,
    fontSize: fontSize.md,
  },
});
