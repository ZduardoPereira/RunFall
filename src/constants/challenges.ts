import type { Challenge } from '@/src/types';

export const CHALLENGES: Challenge[] = [
  { id: 'days-7', name: '7 dias', lengthDays: 7, description: 'Um primeiro teste de disciplina.' },
  { id: 'days-14', name: '14 dias', lengthDays: 14, description: 'Duas semanas de consistência.' },
  { id: 'days-21', name: '21 dias', lengthDays: 21, description: 'O tempo clássico para criar um hábito.' },
  { id: 'days-30', name: '30 dias', lengthDays: 30, description: 'Um mês inteiro de compromisso.' },
  { id: 'days-50', name: '50 dias', lengthDays: 50, description: 'Disciplina em um novo patamar.' },
  { id: 'days-75', name: '75 dias', lengthDays: 75, description: 'Poucos chegam até aqui.' },
  { id: 'days-100', name: '100 dias', lengthDays: 100, description: 'Um marco de resiliência.' },
  { id: 'days-365', name: '365 dias', lengthDays: 365, description: 'Um ano inteiro de vida.' },
  { id: 'hardcore', name: 'Hardcore', lengthDays: 'infinite', description: 'Sem fim. Sem segunda chance.' },
];
