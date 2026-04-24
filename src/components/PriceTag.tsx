import type { PriceTagData, FontConfig } from '../types';
import { templateConfig, cmToPx } from '../lib/config';

interface PriceTagProps {
  data: PriceTagData;
  scale?: number;
  priceFont?: FontConfig;
  nameFont?: FontConfig;
}

export default function PriceTag({ data, scale = 1, priceFont, nameFont }: PriceTagProps) {
  const width = cmToPx(templateConfig.size.width) * scale;
  const height = cmToPx(templateConfig.size.height) * scale;
  const headerHeight = Math.round(height * 0.4); // 40% высоты под плашку

  // Используем переданные настройки или дефолтные
  const actualPriceFont = priceFont || {
    family: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
    size: 48,
    weight: '300',
  };

  const actualNameFont = nameFont || {
    family: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
    size: 22,
    weight: '300',
  };

  return (
    <div
      className="price-tag relative bg-white shadow-lg overflow-hidden"
      style={{
        width: `${width}px`,
        height: `${height}px`,
        fontSize: `${scale}em`,
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", "Helvetica Neue", Helvetica, Arial, sans-serif',
      }}
    >
      {/* Верхняя цветная плашка с ценой */}
      <div
        className="absolute top-0 left-0 right-0"
        style={{
          height: `${headerHeight}px`,
          backgroundColor: templateConfig.colors.header,
        }}
      >
        {/* Цена */}
        <div
          style={{
            position: 'absolute',
            top: `${8 * scale}px`,
            left: `${12 * scale}px`,
            fontSize: `${actualPriceFont.size * scale}px`,
            fontFamily: actualPriceFont.family,
            fontWeight: actualPriceFont.weight,
            color: templateConfig.colors.text,
            lineHeight: '1',
            display: 'inline-block',
          }}
        >
          {data.price} р
        </div>

        {/* Бейдж NEW */}
        {data.isNew && (
          <div
            className="font-bold uppercase"
            style={{
              position: 'absolute',
              top: `${8 * scale}px`,
              right: `${12 * scale}px`,
              color: templateConfig.colors.badge,
              fontSize: `${14 * scale}px`,
              fontWeight: 'bold',
            }}
          >
            NEW
          </div>
        )}
      </div>

      {/* Нижняя белая часть с названием и граммовкой */}
      <div
        className="absolute left-0 right-0 flex flex-col justify-between"
        style={{
          top: `${headerHeight}px`,
          height: `${height - headerHeight}px`,
          paddingTop: `${8 * scale}px`,
          paddingBottom: `${templateConfig.layout.padding * scale}px`,
          paddingLeft: `${12 * scale}px`,
          paddingRight: `${12 * scale}px`,
        }}
      >
        {/* Название продукта */}
        <div>
          <div
            className="leading-tight"
            style={{
              fontSize: `${actualNameFont.size * scale}px`,
              fontFamily: actualNameFont.family,
              fontWeight: actualNameFont.weight,
              color: templateConfig.colors.text,
            }}
          >
            {data.name}
          </div>

          {/* Граммовка */}
          {data.weight && (
            <div
              className="opacity-60"
              style={{
                fontSize: `${templateConfig.fonts.weight.size * scale}px`,
                fontFamily: templateConfig.fonts.weight.family,
                color: templateConfig.colors.text,
                marginTop: `${4 * scale}px`,
              }}
            >
              ({data.weight})
            </div>
          )}
        </div>

        {/* Смайлик внизу справа */}
        <div className="flex justify-end">
          <svg
            width={`${24 * scale}`}
            height={`${18 * scale}`}
            viewBox="0 0 24 18"
            fill="none"
          >
            {/* Левый глазик */}
            <path
              d="M4 3Q5 1 6 3"
              stroke={templateConfig.colors.text}
              strokeWidth="1.5"
              strokeLinecap="round"
              fill="none"
            />
            {/* Правый глазик */}
            <path
              d="M18 3Q19 1 20 3"
              stroke={templateConfig.colors.text}
              strokeWidth="1.5"
              strokeLinecap="round"
              fill="none"
            />
            {/* Улыбка */}
            <path
              d="M6 10Q12 16 18 10"
              stroke={templateConfig.colors.text}
              strokeWidth="1.5"
              strokeLinecap="round"
              fill="none"
            />
          </svg>
        </div>
      </div>
    </div>
  );
}
