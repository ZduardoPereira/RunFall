import { useState } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';

import { Button } from '@/src/components/Button';
import { Card } from '@/src/components/Card';
import { OptionPicker } from '@/src/components/OptionPicker';
import { TIER_LABEL } from '@/src/constants/missionPresets';
import { colors, fontSize, fontWeight, pixelFont, pixelSize, radius, spacing, tierColors } from '@/src/theme';
import type { MissionTemplate, MissionTier } from '@/src/types';
import { makeId } from '@/src/utils/date';

const TIER_ORDER: MissionTier[] = ['simple', 'medium', 'hard', 'death'];
const TIER_LABELS = TIER_ORDER.map((tier) => TIER_LABEL[tier]);

interface MissionTemplateEditorProps {
  templates: MissionTemplate[];
  onAdd: (template: MissionTemplate) => void;
  onUpdate?: (id: string, updates: Partial<Pick<MissionTemplate, 'title' | 'tier' | 'description'>>) => void;
  onRemove?: (id: string) => void;
}

export function MissionTemplateEditor({ templates, onAdd, onUpdate, onRemove }: MissionTemplateEditorProps) {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [tierLabel, setTierLabel] = useState<string>(TIER_LABELS[0]);

  const resetForm = () => {
    setEditingId(null);
    setTitle('');
    setDescription('');
    setTierLabel(TIER_LABELS[0]);
  };

  const startEdit = (template: MissionTemplate) => {
    setEditingId(template.id);
    setTitle(template.title);
    setDescription(template.description ?? '');
    setTierLabel(TIER_LABEL[template.tier]);
  };

  const handleSubmit = () => {
    const trimmedTitle = title.trim();
    if (!trimmedTitle) return;
    const tier = TIER_ORDER[TIER_LABELS.indexOf(tierLabel)];
    const trimmedDescription = description.trim() || undefined;

    if (editingId && onUpdate) {
      onUpdate(editingId, { title: trimmedTitle, tier, description: trimmedDescription });
    } else {
      onAdd({ id: makeId(), title: trimmedTitle, tier, description: trimmedDescription });
    }
    resetForm();
  };

  return (
    <View style={styles.wrapper}>
      {templates.map((template) => (
        <Pressable key={template.id} onPress={() => onUpdate && startEdit(template)} disabled={!onUpdate}>
          <Card
            style={[
              styles.item,
              { borderLeftColor: tierColors[template.tier] },
              editingId === template.id && styles.itemEditing,
            ]}
          >
            <View style={styles.itemInfo}>
              <Text style={styles.itemTitle}>{template.title}</Text>
              {template.description ? <Text style={styles.itemDescription}>{template.description}</Text> : null}
              <Text style={[styles.itemTier, { color: tierColors[template.tier] }]}>{TIER_LABEL[template.tier]}</Text>
            </View>
            {onRemove ? (
              <Pressable onPress={() => onRemove(template.id)} hitSlop={8}>
                <Text style={styles.remove}>Remover</Text>
              </Pressable>
            ) : null}
          </Card>
        </Pressable>
      ))}

      <Card style={styles.form}>
        <TextInput
          value={title}
          onChangeText={setTitle}
          placeholder="Nome da missão"
          placeholderTextColor={colors.textMuted}
          style={styles.input}
        />
        <TextInput
          value={description}
          onChangeText={setDescription}
          placeholder="Descrição (opcional)"
          placeholderTextColor={colors.textMuted}
          style={styles.input}
          multiline
        />
        <OptionPicker label="Nível" options={TIER_LABELS} value={tierLabel} onChange={setTierLabel} />
        <View style={styles.formActions}>
          <Button
            label={editingId ? 'Salvar' : 'Adicionar missão'}
            variant="secondary"
            onPress={handleSubmit}
            disabled={!title.trim()}
          />
          {editingId ? <Button label="Cancelar" variant="secondary" onPress={resetForm} /> : null}
        </View>
      </Card>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    gap: spacing.md,
    marginBottom: spacing.xl,
  },
  item: {
    borderLeftWidth: 6,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  itemEditing: {
    borderColor: colors.accent,
  },
  itemInfo: {
    gap: spacing.xs,
    flex: 1,
    marginRight: spacing.md,
  },
  itemTitle: {
    color: colors.textPrimary,
    fontSize: fontSize.md,
    fontWeight: fontWeight.medium,
  },
  itemDescription: {
    color: colors.textSecondary,
    fontSize: fontSize.sm,
  },
  itemTier: {
    fontFamily: pixelFont,
    fontSize: pixelSize.xs,
  },
  remove: {
    color: colors.danger,
    fontFamily: pixelFont,
    fontSize: pixelSize.xs,
  },
  form: {
    gap: spacing.md,
  },
  formActions: {
    flexDirection: 'row',
    gap: spacing.sm,
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
