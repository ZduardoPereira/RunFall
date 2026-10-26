export type CosmeticSlot = 'hat' | 'cape' | 'background';

export interface Cosmetic {
  id: string;
  name: string;
  slot: CosmeticSlot;
  price: number;
  description: string;
}
