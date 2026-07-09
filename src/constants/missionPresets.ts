import { DIFFICULTIES } from '@/src/constants/difficulties';
import type { DifficultyId, MissionTemplate, MissionTier } from '@/src/types';

export const TIER_LABEL: Record<MissionTier, string> = {
  simple: 'Simples',
  medium: 'Média',
  hard: 'Difícil',
  death: 'Morte',
};

function makeId() {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

const MISSION_POOL: Record<MissionTier, string[]> = {
  simple: ['Beber água', 'Alongamento', 'Organizar quarto', 'Meditação', 'Responder diário'],
  medium: ['Treino leve', 'Ler', 'Estudar'],
  hard: ['Treino intenso', 'Cardio pesado', 'Jejum leve'],
  death: ['Treino obrigatório', 'Dieta', 'Meta principal', 'Sono mínimo'],
};

function pick(tier: MissionTier, count: number): MissionTemplate[] {
  const pool = MISSION_POOL[tier];
  const shuffled = [...pool].sort(() => Math.random() - 0.5);
  const chosen = count <= pool.length ? shuffled.slice(0, count) : shuffled;
  return chosen.map((title) => ({ id: makeId(), title, tier }));
}

/** Generates a starting mission routine sized to a difficulty's
 * `missionCountMultiplier`. Base counts assume "medium": 3 simple, 2 medium,
 * 1 death mission per day; `hard`/`hardcore` also mix in hard-tier missions. */
export function generateMissionsForDifficulty(difficultyId: DifficultyId): MissionTemplate[] {
  const multiplier = DIFFICULTIES.find((d) => d.id === difficultyId)?.missionCountMultiplier ?? 1;

  const simpleCount = Math.max(1, Math.round(3 * multiplier));
  const mediumCount = Math.max(1, Math.round(2 * multiplier));
  const includeHard = difficultyId === 'hard' || difficultyId === 'hardcore';

  return [
    ...pick('simple', simpleCount),
    ...pick('medium', mediumCount),
    ...(includeHard ? pick('hard', difficultyId === 'hardcore' ? 2 : 1) : []),
    ...pick('death', 1),
  ];
}
