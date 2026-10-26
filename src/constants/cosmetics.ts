import type { Cosmetic, CosmeticSlot } from '@/src/types';

export const SLOT_LABEL: Record<CosmeticSlot, string> = {
  hat: 'Chapéus',
  cape: 'Capas',
  background: 'Fundos',
};

export const COSMETICS: Cosmetic[] = [
  { id: 'bandana', name: 'Bandana', slot: 'hat', price: 80, description: 'Pronto para o treino.' },
  { id: 'top-hat', name: 'Cartola', slot: 'hat', price: 150, description: 'Disciplina com elegância.' },
  { id: 'wizard', name: 'Chapéu de mago', slot: 'hat', price: 250, description: 'Magia é só rotina bem feita.' },
  { id: 'crown', name: 'Coroa', slot: 'hat', price: 500, description: 'Para quem governa os próprios hábitos.' },

  { id: 'cape-red', name: 'Capa vermelha', slot: 'cape', price: 120, description: 'Todo herói precisa de uma.' },
  { id: 'cape-shadow', name: 'Capa sombria', slot: 'cape', price: 200, description: 'Treina enquanto os outros dormem.' },
  { id: 'cape-royal', name: 'Capa real', slot: 'cape', price: 400, description: 'Roxo e ouro, digna de lenda.' },

  { id: 'bg-forest', name: 'Floresta', slot: 'background', price: 60, description: 'Ar puro e grama verde.' },
  { id: 'bg-sunset', name: 'Pôr do sol', slot: 'background', price: 100, description: 'O fim de mais um dia vencido.' },
  { id: 'bg-night', name: 'Noite estrelada', slot: 'background', price: 150, description: 'Para os notívagos disciplinados.' },
  { id: 'bg-dungeon', name: 'Masmorra', slot: 'background', price: 200, description: 'Onde os fracos não sobrevivem.' },
];
