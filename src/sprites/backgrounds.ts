/** Procedural 32x32 backdrops sold in the shop. */
export type Pixels = (string | null)[][];

const SIZE = 32;

function fill(color: (x: number, y: number) => string | null): Pixels {
  return Array.from({ length: SIZE }, (_, y) => Array.from({ length: SIZE }, (_, x) => color(x, y)));
}

function band(y: number, stops: string[]) {
  return stops[Math.min(stops.length - 1, Math.floor((y / SIZE) * stops.length))];
}

/** Small deterministic hash so "random" details look the same every render. */
function noise(x: number, y: number) {
  const n = Math.sin(x * 12.9898 + y * 78.233) * 43758.5453;
  return n - Math.floor(n);
}

function forest(): Pixels {
  const sky = ['#8fd3e8', '#a6dde6', '#bde6e0', '#cdeedb'];
  return fill((x, y) => {
    const ridge = 13 + Math.round(2 * Math.sin(x / 2.3) + Math.sin(x / 1.1));
    if (y >= 25) return (x + y) % 3 === 0 ? '#2b7040' : '#3f9e5a';
    if (y >= ridge + 4) return '#245c3e';
    if (y >= ridge) return noise(x, y) > 0.8 ? '#3a7d55' : '#2f6b4a';
    return band(y * 2, sky);
  });
}

function sunset(): Pixels {
  const sky = ['#2b1b4a', '#4a2462', '#7a2f6a', '#b33f68', '#e3644f', '#f5a14a'];
  return fill((x, y) => {
    if (y >= 26) return '#1d1230';
    const dx = x - 15.5;
    const dy = y - 21;
    if (dx * dx + dy * dy <= 42) return y % 3 === 0 && y > 19 ? '#f5a14a' : '#ffd36b';
    return band(y * 1.2, sky);
  });
}

function night(): Pixels {
  const sky = ['#0b0d2a', '#10143a', '#161b4a', '#1e2459'];
  return fill((x, y) => {
    const mx = x - 25;
    const my = y - 6;
    if (mx * mx + my * my <= 12) return mx * mx + (my + 1) * (my + 1) <= 6 && mx > 0 ? '#c9c4a0' : '#f3efd2';
    if (y >= 28) return '#0a0a1c';
    const n = noise(x, y);
    if (n > 0.975) return '#ffffff';
    if (n > 0.955) return '#fff3a3';
    return band(y, sky);
  });
}

function dungeon(): Pixels {
  return fill((x, y) => {
    if (y >= 27) return (x + y) % 4 === 0 ? '#2a2535' : '#3a3446';
    const row = Math.floor(y / 4);
    const offset = row % 2 === 0 ? 0 : 4;
    if (y % 4 === 3 || (x + offset) % 8 === 7) return '#25212f';
    return noise(x, y) > 0.85 ? '#544c66' : '#4a4458';
  });
}

export const BACKGROUNDS: Record<string, () => Pixels> = {
  'bg-forest': forest,
  'bg-sunset': sunset,
  'bg-night': night,
  'bg-dungeon': dungeon,
};
