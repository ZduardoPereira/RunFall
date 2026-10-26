import { useEffect, useMemo, useRef } from 'react';
import { Animated, StyleSheet, View } from 'react-native';

import { PixelSprite } from '@/src/components/PixelSprite';
import {
  composeBackground,
  composeCharacter,
  composeTombstone,
  SPRITE_SIZE,
  type EquippedCosmetics,
} from '@/src/sprites/compose';
import { useCosmeticStore } from '@/src/store';
import { colors, radius } from '@/src/theme';
import type { CharacterAppearance } from '@/src/types';

interface AvatarProps {
  appearance: CharacterAppearance;
  size?: number;
  /** Defaults to whatever the player has equipped in the shop. */
  equipped?: EquippedCosmetics;
  /** Idle bounce of one sprite pixel. */
  animated?: boolean;
  framed?: boolean;
}

export function Avatar({ appearance, size = 128, equipped, animated = false, framed = false }: AvatarProps) {
  const storeEquipped = useCosmeticStore((s) => s.equipped);
  const { hat, cape, background } = equipped ?? storeEquipped;

  const characterPixels = useMemo(
    () => composeCharacter(appearance, { hat, cape }),
    [appearance, hat, cape]
  );
  const backgroundPixels = useMemo(() => (background ? composeBackground(background) : null), [background]);

  const unit = Math.max(1, Math.round(size / SPRITE_SIZE));
  const bounce = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (!animated) return;
    // Zero-duration jumps keep the motion snapped to the pixel grid.
    const loop = Animated.loop(
      Animated.sequence([
        Animated.delay(500),
        Animated.timing(bounce, { toValue: -unit, duration: 0, useNativeDriver: true }),
        Animated.delay(500),
        Animated.timing(bounce, { toValue: 0, duration: 0, useNativeDriver: true }),
      ])
    );
    loop.start();
    return () => loop.stop();
  }, [animated, bounce, unit]);

  const content = (
    <View>
      {backgroundPixels ? <PixelSprite pixels={backgroundPixels} size={size} /> : null}
      <Animated.View style={[backgroundPixels && styles.overlay, { transform: [{ translateY: bounce }] }]}>
        <PixelSprite pixels={characterPixels} size={size} />
      </Animated.View>
    </View>
  );

  if (!framed) return content;
  return <View style={styles.frame}>{content}</View>;
}

export function Tombstone({ size = 96 }: { size?: number }) {
  const pixels = useMemo(() => composeTombstone(), []);
  return <PixelSprite pixels={pixels} size={size} />;
}

const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
  },
  frame: {
    alignSelf: 'center',
    padding: 4,
    backgroundColor: colors.surfaceAlt,
    borderRadius: radius.md,
    borderWidth: 2,
    borderColor: colors.borderStrong,
    overflow: 'hidden',
  },
});
