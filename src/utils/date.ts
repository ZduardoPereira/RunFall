/** Day keys are local-time `YYYY-MM-DD` strings, so they sort and compare as text. */
export function dayKey(date: Date) {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

export function addDaysToKey(key: string, days: number) {
  const [y, m, d] = key.split('-').map(Number);
  return dayKey(new Date(y, m - 1, d + days));
}

/** Today's key, shifted by `offsetDays` (used by the dev time-travel tools). */
export function todayKey(offsetDays = 0) {
  return addDaysToKey(dayKey(new Date()), offsetDays);
}

export function formatDayKey(key: string) {
  const [y, m, d] = key.split('-');
  return `${d}/${m}/${y}`;
}

export function makeId() {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}
