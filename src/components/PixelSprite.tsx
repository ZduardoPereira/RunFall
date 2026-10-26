import { memo, useMemo } from 'react';
import { View } from 'react-native';

import { SPRITE_SIZE, type Pixels } from '@/src/sprites/compose';

interface PixelSpriteProps {
  pixels: Pixels;
  /** Rendered width/height; rounded to a whole number of screen points per pixel. */
  size: number;
}

interface Run {
  x: number;
  y: number;
  width: number;
  color: string;
}

/** Same-colored neighbours in a row are merged so a sprite is ~200 views
 * instead of 1024. */
function toRuns(pixels: Pixels): Run[] {
  const runs: Run[] = [];
  pixels.forEach((row, y) => {
    let x = 0;
    while (x < row.length) {
      const color = row[x];
      let end = x + 1;
      while (end < row.length && row[end] === color) end += 1;
      if (color) runs.push({ x, y, width: end - x, color });
      x = end;
    }
  });
  return runs;
}

export const PixelSprite = memo(function PixelSprite({ pixels, size }: PixelSpriteProps) {
  const unit = Math.max(1, Math.round(size / SPRITE_SIZE));
  const runs = useMemo(() => toRuns(pixels), [pixels]);

  return (
    <View style={{ width: unit * SPRITE_SIZE, height: unit * SPRITE_SIZE }}>
      {runs.map((run) => (
        <View
          key={`${run.x}-${run.y}`}
          style={{
            position: 'absolute',
            left: run.x * unit,
            top: run.y * unit,
            width: run.width * unit,
            height: unit,
            backgroundColor: run.color,
          }}
        />
      ))}
    </View>
  );
});
