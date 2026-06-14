import { NameTag } from '../../../shared/api/enums';

interface FeatureOption {
  tag: NameTag;
  title: string;
  icon: string;
  isMulti: boolean;
  options: string[];
}

export const FEATURE_TRANSLATION = {
  SIZE: 'TAMAÑO',
  TOPPINGS: 'TOPPINGS',
  TYPE_SAUSAGE: 'TIPO DE SALCHICHA',
  TYPE_MEAT: 'TIPO DE CARNE',
  SAUCE: 'SALSAS',
}

export const FEATURE_CONFIG: Record<string, FeatureOption[]> = {
  'Perros': [
    {
      tag: 'SIZE',
      title: 'TAMAÑO',
      icon: '📏',
      isMulti: false,
      options: ['Pan mini', 'Normal']
    },
    {
      tag: 'TOPPINGS',
      title: 'TOPPINGS',
      icon: '🥗',
      isMulti: true,
      options: ['Queso', 'Papa', 'Zanahoria', 'Cebolla', 'Queso rallado']
    },
    {
      tag: 'TYPE_SAUSAGE',
      title: 'TIPO DE SALCHICHA',
      icon: '⭐',
      isMulti: false,
      options: ['Mini Frankfurt', 'Catirota', 'CatireHot', 'Chicken', 'Chesse', 'Salchicatire', 'Chistorra', 'Uruguayo', 'Antioqueño', 'Choricatire', 'Chori Frito']
    },
    {
      tag: 'SAUCE',
      title: 'SALSAS',
      icon: '🫙',
      isMulti: true,
      options: ['Ketchup', 'Mostaza', 'Mayonesa', 'Salsa de ajo']
    },
  ],
  'Hamburguesas': [
    {
      tag: 'SIZE',
      title: 'TAMAÑO',
      icon: '📏',
      isMulti: false,
      options: ['Sencilla', 'Mixta']
    },
    {
      tag: 'TOPPINGS',
      title: 'TOPPINGS',
      icon: '🥗',
      isMulti: true,
      options: ['Lechuga', 'Tomate', 'Cebolla', 'Papas', 'Queso tipo gouda', 'Queso rallado', 'Tocineta', 'Huevo frito']
    },
    {
      tag: 'TYPE_MEAT',
      title: 'TIPO DE CARNE',
      icon: '⭐',
      isMulti: true,
      options: ['Carne', 'Croqueta de pollo', 'Croqueta de chuleta']
    },
    {
      tag: 'SAUCE',
      title: 'SALSAS',
      icon: '🫙',
      isMulti: true,
      options: ['Ketchup', 'Mostaza', 'Mayonesa', 'Salsa de ajo']
    },
  ],
  'Salchipapas': [
    {
      tag: 'SIZE',
      title: 'TAMAÑO',
      icon: '📏',
      isMulti: false,
      options: ['Junior', 'Normal', 'Porción de papas']
    },
    {
      tag: 'TOPPINGS',
      title: 'TOPPINGS',
      icon: '🥗',
      isMulti: false,
      options: ['Queso rallado']
    },
    {
      tag: 'TYPE_SAUSAGE',
      title: 'TIPO DE SALCHICHA',
      icon: '⭐',
      isMulti: true,
      options: ['Catirota', 'CatireHot', 'Chicken', 'Chesse', 'Salchicatire', 'Chistorra', 'Uruguayo', 'Antioqueño', 'Choricatire', 'Chori Frito']
    },
    {
      tag: 'SAUCE',
      title: 'SALSAS',
      icon: '🫙',
      isMulti: true,
      options: ['Ketchup', 'Mostaza', 'Mayonesa', 'Salsa de ajo']
    },
  ],
  'Bebidas': [
    {
      tag: 'SIZE',
      title: 'TAMAÑO',
      icon: '📏',
      isMulti: false,
      options: ['2L', '1L', 'Personal', 'Nestea']
    },
  ]
};