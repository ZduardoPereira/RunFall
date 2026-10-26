/**
 * Pixel-art layers for the 32x32 character sprite.
 *
 * Every row is exactly 32 characters. `.` is transparent; any other character
 * is a palette key (see palette.ts). Dynamic keys resolved per character:
 * S/s skin, H/h hair, O/o outfit, P/p pants.
 */
export interface Layer {
  top: number;
  rows: string[];
  /** Overrides for palette keys, used to recolor a shared shape. */
  palette?: Record<string, string>;
}

export const BODY: Layer = {
  top: 4,
  rows: [
    '...........KKKKKKKKKK...........',
    '.........KKSSSSSSSSSSKK.........',
    '........KSSSSSSSSSSSSSSK........',
    '........KSSSSSSSSSSSSSSK........',
    '.......KSSSSSSSSSSSSSSSSK.......',
    '.......KSSSSSSSSSSSSSSSSK.......',
    '.......KSSSSSSSSSSSSSSSSK.......',
    '......KsSSSSSSSSSSSSSSSSsK......',
    '......KsSSSSSSSSSSSSSSSSsK......',
    '.......KSSSSSSSSSSSSSSSSK.......',
    '........KSSSSSSSSSSSSSSK........',
    '........KsSSSSSSSSSSSSsK........',
    '.........KKsSSSSSSSSsKK.........',
    '...........KKKsSSsKKK...........',
    '.........KKKKKKKKKKKKKK.........',
    '........KSSSSSSSSSSSSSSK........',
    '.......KSSKSSSSSSSSSSKSSK.......',
    '.......KSSKSSSSSSSSSSKSSK.......',
    '.......KSSKSSSSSSSSSSKSSK.......',
    '.......KSSKSSSSSSSSSSKSSK.......',
    '.......KssKSSSSSSSSSSKssK.......',
    '.......KKKKSSSSSSSSSSKKKK.......',
    '..........KSSSSSSSSSSK..........',
    '..........KSSSSKKSSSSK..........',
    '..........KSSSSKKSSSSK..........',
    '..........KSSSSKKSSSSK..........',
    '.........KBBBBBKKBBBBBK.........',
    '.........KKKKKKKKKKKKKK.........',
  ],
};

export const OUTFITS: Record<string, Layer> = {
  Casual: {
    top: 18,
    rows: [
      '.........KOOOOKSSKOOOOK.........',
      '........KOOOOOOOOOOOOOOK........',
      '.......KOOKOOOOOOOOOOKOOK.......',
      '.......KooKOOOOOOOOOOKooK.......',
      '..........KOOOOOOOOOoK..........',
      '..........KOOOOOOOOOoK..........',
      '..........KooooooooooK..........',
      '..........KPPPPPPPPPPK..........',
      '..........KPPPPPPPPPPK..........',
      '..........KPPPPKKPPPPK..........',
      '..........KPPPPKKPPPPK..........',
      '..........KppppKKppppK..........',
    ],
  },
  Esportivo: {
    top: 18,
    rows: [
      '.........KOOOOKSSKOOOOK.........',
      '........KOOOOOOOOOOOOOOK........',
      '.......KWWKOOOOWWOOOOKWWK.......',
      '..........KOOOOWWOOOoK..........',
      '..........KOOOOWWOOOoK..........',
      '..........KOOOOOOOOOoK..........',
      '..........KWWWWWWWWWWK..........',
      '..........KPPPPPPPPPPK..........',
      '..........KppppKKppppK..........',
      '..........KSSSSKKSSSSK..........',
      '..........KWWWWKKWWWWK..........',
      '..........KWWWWKKWWWWK..........',
    ],
  },
  Militar: {
    top: 18,
    rows: [
      '.........KOOOOKSSKOOOOK.........',
      '........KOOOOOOOOOOOOOOK........',
      '.......KOOKOOKKOOKKOOKOOK.......',
      '.......KOOKOOooOOooOOKOOK.......',
      '.......KOOKOOOOOOOOOoKOOK.......',
      '.......KooKOOOOOOOOOoKooK.......',
      '.......KssKNNNNYYNNNNKssK.......',
      '..........KPPPPPPPPPPK..........',
      '..........KPPpPPPPpPPK..........',
      '..........KPPPPKKPPPPK..........',
      '..........KPPPPKKPPPPK..........',
      '..........KppppKKppppK..........',
    ],
  },
  Urbano: {
    top: 17,
    rows: [
      '..........KOOKsSSsKOOK..........',
      '.........KOOOOOKKOOOOOK.........',
      '........KOOOOOWOOWOOOOOK........',
      '.......KOOKOOOWOOWOOOKOOK.......',
      '.......KOOKOOOOOOOOOOKOOK.......',
      '.......KOOKOKKKKKKKKOKOOK.......',
      '.......KooKOKooooooKOKooK.......',
      '.......KssKOOOOOOOOOoKssK.......',
      '..........KPPPPPPPPPPK..........',
      '..........KPPPPPPPPPPK..........',
      '..........KPPPPKKPPPPK..........',
      '..........KPPPPKKPPPPK..........',
      '..........KppppKKppppK..........',
    ],
  },
};

const HAIR_TOP = [
  '..........KKKKKKKKKKKK..........',
  '........KKHHHHHHHHHHHHKK........',
  '.......KHHHHHHHHHHHHHHHHK.......',
  '.......KHHHHHHHHHHHHHHHHK.......',
  '.......KHHHHHhHHHHhHHHHHK.......',
  '.......KHHhKKhHHHHhKKhHHK.......',
];

export const HAIR_STYLES: Record<string, Layer> = {
  Curto: {
    top: 3,
    rows: [
      ...HAIR_TOP,
      '.......KhK....KhhK....KhK.......',
      '.......Kh..............hK.......',
    ],
  },
  Longo: {
    top: 3,
    rows: [
      ...HAIR_TOP,
      '.......KHK....KhhK....KHK.......',
      '......KHHK............KHHK......',
      '......KHHK............KHHK......',
      '......KHHK............KHHK......',
      '......KHHK............KHHK......',
      '......KHHK............KHHK......',
      '......KHHK............KHHK......',
      '......KHHK............KHHK......',
      '......KHHHK..........KHHHK......',
      '......KHHHK..........KHHHK......',
      '......KhhhK..........KhhhK......',
      '.......KKK............KKK.......',
    ],
  },
  Careca: {
    top: 5,
    rows: ['............WW..................'],
    palette: { W: '#ffffff59' },
  },
  Moicano: {
    top: 0,
    rows: [
      '..............KKKK..............',
      '.............KHHHHK.............',
      '.............KHHhHK.............',
      '.............KHHhHK.............',
      '.............KHHhHK.............',
      '.............KhHHhK.............',
      '..............KhhK..............',
    ],
  },
  Cacheado: {
    top: 1,
    rows: [
      '...........KK..KK..KK...........',
      '.........KKHHKKHHKKHHKK.........',
      '........KHHHHHHHHHHHHHHK........',
      '.......KHHhHHHHhHHHHhHHHK.......',
      '......KHHHHHhHHHHHHhHHHHHK......',
      '......KHhHHHHHHHHHHHHHHhHK......',
      '......KHHHHhHHHHHHHHhHHHHK......',
      '......KHHhKKhHHKKHHhKKhHHK......',
      '......KHHK............KHHK......',
      '......KHHK............KHHK......',
      '......KhhK............KhhK......',
      '.......KK..............KK.......',
    ],
  },
};

export const EYES: Record<string, Layer> = {
  Redondos: {
    top: 10,
    rows: ['...........WE......WE...........', '...........EE......EE...........'],
  },
  Amendoados: {
    top: 10,
    rows: ['...........EE......EE...........', '..........KEEK....KEEK..........'],
  },
  Caídos: {
    top: 10,
    rows: ['..........KKKK....KKKK..........', '...........EE......EE...........'],
  },
  Fechados: {
    top: 10,
    rows: ['...........KK......KK...........', '..........K..K....K..K..........'],
  },
};

export const EXPRESSIONS: Record<string, Layer> = {
  Neutra: {
    top: 14,
    rows: ['..............KKKK..............'],
  },
  Determinada: {
    top: 9,
    rows: [
      '...........KKK....KKK...........',
      '................................',
      '................................',
      '................................',
      '................................',
      '..............KKKK..............',
    ],
  },
  Séria: {
    top: 9,
    rows: [
      '..........KKKK....KKKK..........',
      '................................',
      '................................',
      '................................',
      '................................',
      '...............KK...............',
    ],
  },
  Confiante: {
    top: 12,
    rows: [
      '.........cc..........cc.........',
      '.............K....K.............',
      '..............KMMK..............',
    ],
  },
};

export const BEARD: Layer = {
  top: 13,
  rows: [
    '........HH...HHHHHH...HH........',
    '........HHHHHH....HHHHHH........',
    '........KHHHHHHHHHHHHHHK........',
    '.........KKHHHHHHHHHHKK.........',
    '...........KKKHHHHKKK...........',
  ],
};

export const ACCESSORIES: Record<string, Layer> = {
  Óculos: {
    top: 9,
    rows: [
      '.........KKKKKK..KKKKKK.........',
      '.........K....KKKK....K.........',
      '.........K....K..K....K.........',
      '.........KKKKKK..KKKKKK.........',
    ],
  },
  Boné: {
    top: 2,
    rows: [
      '..........KKKKKKKKKKKK..........',
      '.........KRRRRRRRRRRRRK.........',
      '........KRRRRRRWWRRRRRRK........',
      '.......KRRRRRRRRRRRRRRRRK.......',
      '.......KRRRRRRRRRRRRRRRRK.......',
      '......KrrrrrrrrrrrrrrrrrrK......',
      '......KKKKKKKKKKKKKKKKKKKK......',
    ],
  },
  Cachecol: {
    top: 17,
    rows: [
      '..........KRRRRRRRRRRK..........',
      '.........KRRRRRRRRRRRRK.........',
      '.........KrrrrrrrrrrrrK.........',
      '..................KRRK..........',
      '..................KRRK..........',
      '..................KrrK..........',
      '..................KKKK..........',
    ],
  },
};

/* ---------- Shop cosmetics ---------- */

export const HATS: Record<string, Layer> = {
  bandana: {
    top: 5,
    rows: [
      '.......KKKKKKKKKKKKKKKKKK.......',
      '.......KRRRRRRWRRRRRRRRRK.......',
      '.......KrrrrrrrrrrrrrrrrKRK.....',
      '.......KKKKKKKKKKKKKKKKKK.KRK...',
      '..........................KK....',
    ],
  },
  'top-hat': {
    top: 0,
    rows: [
      '...........KKKKKKKKKK...........',
      '...........KDDDDDDDDK...........',
      '...........KDDDDDDDDK...........',
      '...........KDDDDDDDDK...........',
      '...........KRRRRRRRRK...........',
      '...........KddddddddK...........',
      '.......KKKKKKKKKKKKKKKKKK.......',
      '.......KddddddddddddddddK.......',
      '.......KKKKKKKKKKKKKKKKKK.......',
    ],
  },
  wizard: {
    top: 0,
    rows: [
      '.................KK.............',
      '................KVVK............',
      '...............KVVVK............',
      '..............KVVXVVK...........',
      '.............KVVVVVVVK..........',
      '............KVVVVVVvVVK.........',
      '...........KVVXVVVVVVVVK........',
      '.....KKKKKKKKKKKKKKKKKKKKKK.....',
      '....KvvvvvvvvvvvvvvvvvvvvvvK....',
      '....KKKKKKKKKKKKKKKKKKKKKKKK....',
    ],
  },
  crown: {
    top: 1,
    rows: [
      '..........K....KK....K..........',
      '.........KYK..KYYK..KYK.........',
      '.........KYYKKYYYYKKYYK.........',
      '.........KYYYYYYYYYYYYK.........',
      '.........KYYRYYLLYYRYYK.........',
      '.........KyyyyyyyyyyyyK.........',
      '.........KKKKKKKKKKKKKK.........',
    ],
  },
};

const CAPE_ROWS = [
  '.......KRK............KRK.......',
  '.......KRRK..........KRRK.......',
  '......KRRRRRRRRRRRRRRRRRRK......',
  '.....KRRRRRRRRRRRRRRRRRRRRK.....',
  '.....KRRRRRRRRRRRRRRRRRRRRK.....',
  '....KRRRRRRRRRRRRRRRRRRRRRRK....',
  '....KRRRRRRRRRRRRRRRRRRRRRRK....',
  '....KrRRRRRRRRRRRRRRRRRRRRrK....',
  '...KrRRRRRRRRRRRRRRRRRRRRRRrK...',
  '...KrRRRRRRRRRRRRRRRRRRRRRRrK...',
  '...KrRRRRRRRRRRRRRRRRRRRRRRrK...',
  '..KrrRRRRRRRRRRRRRRRRRRRRRRrrK..',
  '..KrrRRRRRRRRRRRRRRRRRRRRRRrrK..',
  '..KKrrrrrrrrrrrrrrrrrrrrrrrrKK..',
  '...KKKKKKKKKKKKKKKKKKKKKKKKKK...',
];

export const CAPES: Record<string, Layer> = {
  'cape-red': { top: 16, rows: CAPE_ROWS },
  'cape-shadow': { top: 16, rows: CAPE_ROWS, palette: { R: '#3a3350', r: '#221e30' } },
  'cape-royal': { top: 16, rows: CAPE_ROWS, palette: { R: '#7b4bd1', r: '#f2c14e' } },
};

export const TOMBSTONE: Layer = {
  top: 4,
  rows: [
    '...........KKKKKKKKKK...........',
    '.........KKGGGGGGGGGGKK.........',
    '........KGGGGGGGGGGGGGgK........',
    '........KGGGGGGKKGGGGGgK........',
    '........KGGGGGKKKKGGGGgK........',
    '........KGGGGGGKKGGGGGgK........',
    '........KGGGGGGKKGGGGGgK........',
    '........KGGGGGGGGGGGGGgK........',
    '........KGGKKKKKKKKKKGgK........',
    '........KGGGGGGGGGGGGGgK........',
    '........KGGKKKKKKKKKKGgK........',
    '........KGGGGGGGGGGGGGgK........',
    '........KGGGGGGGGGGGGGgK........',
    '........KGGGGGGGGGGGGGgK........',
    '........KGGGGGGGGGGGGGgK........',
    '........KGGGGGGGGGGGGGgK........',
    '........KGGGGGGGGGGGGGgK........',
    '........KGGGGGGGGGGGGGgK........',
    '........KGGGGGGGGGGGGGgK........',
    '.......KKKKKKKKKKKKKKKKKK.......',
    '.....FFFFFFFFFFFFFFFFFFFFFF.....',
    '....FFfFFFFfFFFFFFfFFFFfFFFF....',
    '....ffffffffffffffffffffffff....',
  ],
};
