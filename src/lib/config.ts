import type { TemplateConfig, A4Settings } from '../types';

export const templateConfig: TemplateConfig = {
  size: {
    width: 7.9,  // см (79 мм, точная калибровка для 77 мм при печати)
    height: 6.0, // см (60 мм, точная калибровка для 58 мм при печати)
  },
  colors: {
    header: '#D4E5A6',     // светло-зеленый
    badge: '#E879F9',      // розовый (fuchsia-400)
    text: '#000000',       // черный
    background: '#FFFFFF', // белый
  },
  fonts: {
    price: {
      family: "'Ultima Pro', 'Arial Black', sans-serif",
      size: 48,
    },
    name: {
      family: "'Gotham Pro', 'Helvetica Neue', sans-serif",
      size: 22,
    },
    weight: {
      family: "'Gotham Pro', 'Helvetica Neue', sans-serif",
      size: 12,
    },
  },
  layout: {
    padding: 12,
    spacing: 8,
  },
};

export const a4Settings: A4Settings = {
  width: 210,  // мм
  height: 297, // мм
  orientation: 'portrait',
  margins: {
    top: 10,
    right: 10,
    bottom: 10,
    left: 10,
  },
  spacing: {
    horizontal: 5,  // мм между ценниками
    vertical: 5,    // мм между ценниками
  },
};

// Конвертация см в пиксели (96 DPI)
export const cmToPx = (cm: number): number => cm * 37.795275591;

// Конвертация мм в пиксели (96 DPI)
export const mmToPx = (mm: number): number => mm * 3.7795275591;
