import { useMemo, useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { Avatar, Button, Card, GoldBadge, ScreenContainer } from '@/src/components';
import { COSMETICS, SLOT_LABEL } from '@/src/constants/cosmetics';
import { useCharacterStore, useCosmeticStore } from '@/src/store';
import { colors, fontSize, pixelFont, pixelSize, radius, spacing } from '@/src/theme';
import type { Cosmetic, CosmeticSlot } from '@/src/types';

const SLOTS: CosmeticSlot[] = ['hat', 'cape', 'background'];

export default function Shop() {
  const character = useCharacterStore((s) => s.character);
  const owned = useCosmeticStore((s) => s.owned);
  const equipped = useCosmeticStore((s) => s.equipped);
  const buy = useCosmeticStore((s) => s.buy);
  const equip = useCosmeticStore((s) => s.equip);
  const unequip = useCosmeticStore((s) => s.unequip);

  const [slot, setSlot] = useState<CosmeticSlot>('hat');
  const [previewId, setPreviewId] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  const preview = COSMETICS.find((c) => c.id === previewId) ?? null;
  // Try-on: the selected item replaces whatever is equipped in its slot.
  const previewEquipped = useMemo(
    () => (preview ? { ...equipped, [preview.slot]: preview.id } : equipped),
    [equipped, preview]
  );

  if (!character) return null;

  const handleBuy = (item: Cosmetic) => {
    const result = buy(item.id);
    if (result === 'ok') setMessage(`${item.name} comprado e equipado!`);
    else if (result === 'no-gold') setMessage(`Faltam ${item.price - character.gold} de ouro. Complete missões!`);
  };

  const items = COSMETICS.filter((c) => c.slot === slot);

  return (
    <ScreenContainer>
      <Card style={styles.previewCard}>
        <Avatar appearance={character.appearance} size={160} equipped={previewEquipped} animated framed />
        <Text style={styles.previewLabel}>{preview ? `Provando: ${preview.name}` : 'Toque num item para provar'}</Text>
        <GoldBadge amount={character.gold} />
        {message ? <Text style={styles.message}>{message}</Text> : null}
      </Card>

      <View style={styles.tabs}>
        {SLOTS.map((s) => (
          <Pressable
            key={s}
            onPress={() => {
              setSlot(s);
              setPreviewId(null);
            }}
            style={[styles.tab, slot === s && styles.tabActive]}
          >
            <Text style={[styles.tabLabel, slot === s && styles.tabLabelActive]}>{SLOT_LABEL[s]}</Text>
          </Pressable>
        ))}
      </View>

      <View style={styles.grid}>
        {items.map((item) => {
          const isOwned = owned.includes(item.id);
          const isEquipped = equipped[item.slot] === item.id;
          const canAfford = character.gold >= item.price;
          return (
            <Pressable
              key={item.id}
              style={[styles.item, previewId === item.id && styles.itemPreviewing, isEquipped && styles.itemEquipped]}
              onPress={() => {
                setPreviewId(item.id);
                setMessage(null);
              }}
            >
              <Avatar
                appearance={character.appearance}
                size={64}
                equipped={item.slot === 'background' ? { background: item.id } : { [item.slot]: item.id }}
              />
              <Text style={styles.itemName} numberOfLines={2}>
                {item.name}
              </Text>
              <Text style={styles.itemDescription} numberOfLines={2}>
                {item.description}
              </Text>
              {isOwned ? (
                isEquipped ? (
                  <Button label="Remover" variant="secondary" compact style={styles.itemButton} onPress={() => unequip(item.slot)} />
                ) : (
                  <Button label="Equipar" compact style={styles.itemButton} onPress={() => equip(item.id)} />
                )
              ) : (
                <Button
                  label={`${item.price} ouro`}
                  variant="gold"
                  compact
                  style={styles.itemButton}
                  disabled={!canAfford}
                  onPress={() => handleBuy(item)}
                />
              )}
            </Pressable>
          );
        })}
      </View>

      <Text style={styles.footnote}>
        Ganhe ouro concluindo missões. Cosméticos ficam com você para sempre, mesmo se o personagem morrer.
      </Text>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  previewCard: {
    alignItems: 'center',
    marginBottom: spacing.lg,
  },
  previewLabel: {
    color: colors.textSecondary,
    fontSize: fontSize.sm,
  },
  message: {
    color: colors.gold,
    fontSize: fontSize.sm,
    textAlign: 'center',
  },
  tabs: {
    flexDirection: 'row',
    gap: spacing.sm,
    marginBottom: spacing.lg,
  },
  tab: {
    flex: 1,
    paddingVertical: spacing.md,
    borderRadius: radius.md,
    borderWidth: 2,
    borderColor: colors.border,
    backgroundColor: colors.surface,
    alignItems: 'center',
  },
  tabActive: {
    borderColor: colors.gold,
    backgroundColor: colors.surfaceAlt,
  },
  tabLabel: {
    color: colors.textSecondary,
    fontFamily: pixelFont,
    fontSize: pixelSize.xs,
  },
  tabLabelActive: {
    color: colors.gold,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    rowGap: spacing.md,
  },
  item: {
    width: '48.5%',
    alignItems: 'center',
    gap: spacing.sm,
    padding: spacing.md,
    borderRadius: radius.lg,
    borderWidth: 2,
    borderColor: colors.border,
    backgroundColor: colors.surface,
  },
  itemPreviewing: {
    borderColor: colors.accent,
  },
  itemEquipped: {
    borderColor: colors.success,
  },
  itemName: {
    color: colors.textPrimary,
    fontFamily: pixelFont,
    fontSize: pixelSize.xs,
    lineHeight: 12,
    textAlign: 'center',
  },
  itemButton: {
    alignSelf: 'stretch',
  },
  itemDescription: {
    color: colors.textMuted,
    fontSize: fontSize.xs,
    textAlign: 'center',
    minHeight: 32,
  },
  footnote: {
    color: colors.textMuted,
    fontSize: fontSize.xs,
    marginTop: spacing.xl,
    textAlign: 'center',
  },
});
