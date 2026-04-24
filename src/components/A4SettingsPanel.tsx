import type { A4Settings } from '../types';

interface A4SettingsPanelProps {
  settings: A4Settings;
  onChange: (settings: A4Settings) => void;
}

export default function A4SettingsPanel({ settings, onChange }: A4SettingsPanelProps) {
  const updateMargin = (side: keyof A4Settings['margins'], value: number) => {
    onChange({
      ...settings,
      margins: {
        ...settings.margins,
        [side]: value,
      },
    });
  };

  const updateSpacing = (direction: keyof A4Settings['spacing'], value: number) => {
    onChange({
      ...settings,
      spacing: {
        ...settings.spacing,
        [direction]: value,
      },
    });
  };

  const updateOrientation = (orientation: 'portrait' | 'landscape') => {
    onChange({
      ...settings,
      orientation,
    });
  };

  return (
    <div className="space-y-4">
      {/* Ориентация */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Ориентация листа
        </label>
        <div className="flex gap-2">
          <button
            onClick={() => updateOrientation('portrait')}
            className={`flex-1 py-2 px-4 rounded-md border ${
              settings.orientation === 'portrait'
                ? 'bg-green-600 text-white border-green-600'
                : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
            }`}
          >
            📄 Книжная
          </button>
          <button
            onClick={() => updateOrientation('landscape')}
            className={`flex-1 py-2 px-4 rounded-md border ${
              settings.orientation === 'landscape'
                ? 'bg-green-600 text-white border-green-600'
                : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
            }`}
          >
            📃 Альбомная
          </button>
        </div>
      </div>

      {/* Поля страницы */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Поля страницы (мм)
        </label>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="text-xs text-gray-600">Сверху</label>
            <input
              type="number"
              value={settings.margins.top}
              onChange={(e) => updateMargin('top', parseFloat(e.target.value))}
              className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              min="0"
              step="1"
            />
          </div>
          <div>
            <label className="text-xs text-gray-600">Справа</label>
            <input
              type="number"
              value={settings.margins.right}
              onChange={(e) => updateMargin('right', parseFloat(e.target.value))}
              className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              min="0"
              step="1"
            />
          </div>
          <div>
            <label className="text-xs text-gray-600">Снизу</label>
            <input
              type="number"
              value={settings.margins.bottom}
              onChange={(e) => updateMargin('bottom', parseFloat(e.target.value))}
              className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              min="0"
              step="1"
            />
          </div>
          <div>
            <label className="text-xs text-gray-600">Слева</label>
            <input
              type="number"
              value={settings.margins.left}
              onChange={(e) => updateMargin('left', parseFloat(e.target.value))}
              className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              min="0"
              step="1"
            />
          </div>
        </div>
      </div>

      {/* Отступы между ценниками */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Отступы между ценниками (мм)
        </label>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="text-xs text-gray-600">По горизонтали</label>
            <input
              type="number"
              value={settings.spacing.horizontal}
              onChange={(e) => updateSpacing('horizontal', parseFloat(e.target.value))}
              className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              min="0"
              step="1"
            />
          </div>
          <div>
            <label className="text-xs text-gray-600">По вертикали</label>
            <input
              type="number"
              value={settings.spacing.vertical}
              onChange={(e) => updateSpacing('vertical', parseFloat(e.target.value))}
              className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              min="0"
              step="1"
            />
          </div>
        </div>
      </div>

      {/* Информация */}
      <div className="mt-4 p-3 bg-blue-50 rounded-md border border-blue-200">
        <p className="text-xs text-blue-800">
          <strong>Размер листа:</strong> {settings.width}×{settings.height} мм<br />
          <strong>Размер ценника:</strong> 50×70 мм (5×7 см)
        </p>
      </div>
    </div>
  );
}
