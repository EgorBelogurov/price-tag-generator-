import type { FontConfig } from '../types';

interface FontSettingsProps {
  config: FontConfig;
  onChange: (config: FontConfig) => void;
  label: string;
}

const AVAILABLE_FONTS = [
  { name: 'System Default', value: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif' },
  { name: 'Arial', value: 'Arial, sans-serif' },
  { name: 'Helvetica', value: 'Helvetica, Arial, sans-serif' },
  { name: 'Times New Roman', value: '"Times New Roman", Times, serif' },
  { name: 'Georgia', value: 'Georgia, serif' },
  { name: 'Courier New', value: '"Courier New", Courier, monospace' },
  { name: 'Verdana', value: 'Verdana, sans-serif' },
  { name: 'Trebuchet MS', value: '"Trebuchet MS", sans-serif' },
  { name: 'Comic Sans MS', value: '"Comic Sans MS", cursive' },
  { name: 'Impact', value: 'Impact, sans-serif' },
  { name: 'Palatino', value: 'Palatino, "Palatino Linotype", serif' },
  { name: 'Garamond', value: 'Garamond, serif' },
];

const FONT_WEIGHTS = [
  { name: 'Тонкий (100)', value: '100' },
  { name: 'Очень лёгкий (200)', value: '200' },
  { name: 'Лёгкий (300)', value: '300' },
  { name: 'Нормальный (400)', value: '400' },
  { name: 'Средний (500)', value: '500' },
  { name: 'Полужирный (600)', value: '600' },
  { name: 'Жирный (700)', value: '700' },
  { name: 'Очень жирный (800)', value: '800' },
  { name: 'Максимально жирный (900)', value: '900' },
];

export default function FontSettings({ config, onChange, label }: FontSettingsProps) {
  return (
    <div className="space-y-3">
      <h3 className="text-sm font-semibold text-gray-800">{label}</h3>

      {/* Выбор шрифта */}
      <div>
        <label className="block text-xs text-gray-600 mb-1">Шрифт</label>
        <select
          value={config.family}
          onChange={(e) => onChange({ ...config, family: e.target.value })}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 text-sm"
        >
          {AVAILABLE_FONTS.map((font) => (
            <option key={font.value} value={font.value}>
              {font.name}
            </option>
          ))}
        </select>
      </div>

      {/* Размер шрифта */}
      <div>
        <label className="block text-xs text-gray-600 mb-1">
          Размер: {config.size}px
        </label>
        <input
          type="range"
          min="12"
          max="72"
          value={config.size}
          onChange={(e) => onChange({ ...config, size: parseInt(e.target.value) })}
          className="w-full"
        />
      </div>

      {/* Толщина шрифта */}
      <div>
        <label className="block text-xs text-gray-600 mb-1">Толщина</label>
        <select
          value={config.weight}
          onChange={(e) => onChange({ ...config, weight: e.target.value })}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 text-sm"
        >
          {FONT_WEIGHTS.map((weight) => (
            <option key={weight.value} value={weight.value}>
              {weight.name}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
