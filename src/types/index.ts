export interface PriceTagData {
  id: string;
  name: string;
  price: number;
  weight: string;
  isNew: boolean;
  quantity: number; // количество экземпляров (1-5)
}

export interface FontConfig {
  family: string;
  size: number;
  weight: string;
}

export interface TemplateConfig {
  size: {
    width: number;  // в см
    height: number; // в см
  };
  colors: {
    header: string;
    badge: string;
    text: string;
    background: string;
  };
  fonts: {
    price: {
      family: string;
      size: number;
    };
    name: {
      family: string;
      size: number;
    };
    weight: {
      family: string;
      size: number;
    };
  };
  layout: {
    padding: number;
    spacing: number;
  };
}

export interface A4Settings {
  width: number;  // 210 мм
  height: number; // 297 мм
  orientation: 'portrait' | 'landscape';
  margins: {
    top: number;
    right: number;
    bottom: number;
    left: number;
  };
  spacing: {
    horizontal: number;
    vertical: number;
  };
}
