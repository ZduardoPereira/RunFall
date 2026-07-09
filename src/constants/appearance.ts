export const APPEARANCE_OPTIONS = {
  hairStyle: ['Curto', 'Longo', 'Careca', 'Moicano', 'Cacheado'],
  hairColor: ['Preto', 'Castanho', 'Loiro', 'Ruivo', 'Grisalho'],
  skinTone: ['Clara', 'Média', 'Morena', 'Escura'],
  outfit: ['Casual', 'Esportivo', 'Militar', 'Urbano'],
  outfitColor: ['Cinza', 'Azul', 'Verde', 'Vermelho', 'Preto'],
  eyes: ['Redondos', 'Amendoados', 'Caídos', 'Fechados'],
  accessory: ['Nenhum', 'Óculos', 'Boné', 'Cachecol'],
  expression: ['Neutra', 'Determinada', 'Séria', 'Confiante'],
} as const;

export const DEFAULT_APPEARANCE = {
  hairStyle: APPEARANCE_OPTIONS.hairStyle[0],
  hairColor: APPEARANCE_OPTIONS.hairColor[0],
  hasBeard: false,
  skinTone: APPEARANCE_OPTIONS.skinTone[0],
  outfit: APPEARANCE_OPTIONS.outfit[0],
  outfitColor: APPEARANCE_OPTIONS.outfitColor[0],
  eyes: APPEARANCE_OPTIONS.eyes[0],
  accessory: null,
  expression: APPEARANCE_OPTIONS.expression[0],
};
