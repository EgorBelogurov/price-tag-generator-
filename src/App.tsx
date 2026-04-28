import { useState, useRef } from 'react';
import type { PriceTagData, A4Settings, FontConfig } from './types';
import PriceTag from './components/PriceTag';
import PriceTagForm from './components/PriceTagForm';
import PriceTagList from './components/PriceTagList';
import A4SettingsPanel from './components/A4SettingsPanel';
import FontSettings from './components/FontSettings';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { templateConfig, a4Settings as defaultA4Settings } from './lib/config';

function App() {
  const [items, setItems] = useState<PriceTagData[]>([]);
  const [selectedItem, setSelectedItem] = useState<PriceTagData | null>(null);
  const [a4Settings, setA4Settings] = useState<A4Settings>(defaultA4Settings);
  const [livePreview, setLivePreview] = useState<Omit<PriceTagData, 'id'> | null>(null);
  const previewRef = useRef<HTMLDivElement>(null);

  // Настройки шрифтов
  const [priceFont, setPriceFont] = useState<FontConfig>({
    family: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
    size: 48,
    weight: '300',
  });

  const [nameFont, setNameFont] = useState<FontConfig>({
    family: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
    size: 22,
    weight: '300',
  });

  const handleFormChange = (data: Omit<PriceTagData, 'id'>) => {
    setLivePreview(data);
  };

  // Подсчёт общего количества ценников
  const totalQuantity = items.reduce((sum, item) => sum + item.quantity, 0);

  const handleAdd = (data: Omit<PriceTagData, 'id'>) => {
    const newItem: PriceTagData = {
      ...data,
      id: Date.now().toString(),
    };
    setItems([...items, newItem]);
    setSelectedItem(newItem);
    setLivePreview(null); // Очищаем live preview после добавления
  };

  const handleRemove = (id: string) => {
    setItems(items.filter((item) => item.id !== id));
    if (selectedItem?.id === id) {
      setSelectedItem(null);
    }
  };

  const downloadSinglePNG = async () => {
    if (!previewRef.current) return;

    const canvas = await html2canvas(previewRef.current, {
      backgroundColor: null,
      scale: 2,
    });

    const currentData = livePreview || selectedItem;
    const link = document.createElement('a');
    link.download = `ценник-${currentData?.name || 'preview'}.png`;
    link.href = canvas.toDataURL('image/png');
    link.click();
  };

  const downloadPDF = async () => {
    if (items.length === 0) {
      alert('Добавьте хотя бы один ценник');
      return;
    }

    // Ждем загрузки шрифтов
    if (document.fonts) {
      await document.fonts.ready;
    }

    // Создаем временный контейнер для рендера всех ценников
    const container = document.createElement('div');
    container.style.position = 'absolute';
    container.style.left = '-9999px';
    document.body.appendChild(container);

    // Размеры в мм
    const tagWidthMm = templateConfig.size.width * 10;
    const tagHeightMm = templateConfig.size.height * 10;

    // Используем настройки пользователя
    const orientation = a4Settings.orientation;
    const a4Width = orientation === 'portrait' ? a4Settings.width : a4Settings.height;
    const a4Height = orientation === 'portrait' ? a4Settings.height : a4Settings.width;

    const pdf = new jsPDF({
      orientation,
      unit: 'mm',
      format: 'a4',
    });

    // Добавляем розовый фон на всю страницу для видимости границ
    pdf.setFillColor(255, 240, 245); // Светло-розовый
    pdf.rect(0, 0, a4Width, a4Height, 'F');

    const spacingH = a4Settings.spacing.horizontal;
    const spacingV = a4Settings.spacing.vertical;

    // Вычисляем количество ценников на странице
    const cols = Math.floor((a4Width - a4Settings.margins.left - a4Settings.margins.right + spacingH) / (tagWidthMm + spacingH));
    const rows = Math.floor((a4Height - a4Settings.margins.top - a4Settings.margins.bottom + spacingV) / (tagHeightMm + spacingV));

    // Создаём массив ценников с учётом количества
    const allTags: PriceTagData[] = [];
    items.forEach(item => {
      for (let q = 0; q < item.quantity; q++) {
        allTags.push(item);
      }
    });

    for (let i = 0; i < allTags.length; i++) {
      const item = allTags[i];
      const col = i % cols;
      const row = Math.floor(i / cols) % rows;

      // Новая страница, если нужно
      if (i > 0 && i % (cols * rows) === 0) {
        pdf.addPage();
        // Добавляем розовый фон на новую страницу
        pdf.setFillColor(255, 240, 245);
        pdf.rect(0, 0, a4Width, a4Height, 'F');
      }

      // Рендерим ценник
      const tagElement = document.createElement('div');
      container.appendChild(tagElement);

      // Используем React для рендера
      const headerHeightPx = Math.round((tagHeightMm * 3.77953) * 0.4);

      const totalHeight = tagHeightMm * 3.77953;
      const bottomHeight = totalHeight - headerHeightPx;

      tagElement.innerHTML = `
        <table style="
          width: ${tagWidthMm * 3.77953}px;
          height: ${totalHeight}px;
          background: white;
          border-collapse: collapse;
          font-family: ${priceFont.family};
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
          font-smooth: always;
          border: none;
          table-layout: fixed;
        ">
          <tr>
            <td style="
              height: ${headerHeightPx}px;
              background: ${templateConfig.colors.header};
              padding: 8px 12px;
              vertical-align: top;
              position: relative;
            ">
              <div style="
                display: flex;
                justify-content: space-between;
                align-items: flex-start;
              ">
                <span style="
                  font-size: ${priceFont.size}px;
                  font-family: ${priceFont.family};
                  font-weight: ${priceFont.weight};
                  line-height: 1;
                  color: #000000;
                  -webkit-font-smoothing: antialiased;
                  -moz-osx-font-smoothing: grayscale;
                  text-rendering: geometricPrecision;
                ">
                  ${item.price} р
                </span>
                ${item.isNew ? `
                  <span style="
                    color: ${templateConfig.colors.badge};
                    font-size: 14px;
                    font-weight: bold;
                    text-transform: uppercase;
                  ">
                    NEW
                  </span>
                ` : ''}
              </div>
            </td>
          </tr>
          <tr>
            <td style="
              height: ${bottomHeight}px;
              padding: 8px 12px 12px 12px;
              vertical-align: top;
            ">
              <div style="
                width: 100%;
                height: 100%;
                position: relative;
              ">
                <div style="
                  position: absolute;
                  top: 0;
                  left: 0;
                  right: 0;
                ">
                  <div style="
                    font-size: ${nameFont.size}px;
                    font-family: ${nameFont.family};
                    font-weight: ${nameFont.weight};
                    line-height: 1.2;
                    color: #000000;
                    -webkit-font-smoothing: antialiased;
                    -moz-osx-font-smoothing: grayscale;
                    text-rendering: geometricPrecision;
                  ">
                    ${item.name}
                  </div>
                  ${item.weight ? `
                    <div style="
                      font-size: 12px;
                      font-family: ${nameFont.family};
                      opacity: 0.6;
                      margin-top: 4px;
                      font-weight: 300;
                      color: #000000;
                    ">
                      (${item.weight})
                    </div>
                  ` : ''}
                </div>
                <div style="
                  position: absolute;
                  bottom: 0;
                  right: 0;
                ">
                  <svg width="24" height="18" viewBox="0 0 24 18" fill="none">
                    <path d="M4 3Q5 1 6 3" stroke="black" stroke-width="1.5" stroke-linecap="round" fill="none"/>
                    <path d="M18 3Q19 1 20 3" stroke="black" stroke-width="1.5" stroke-linecap="round" fill="none"/>
                    <path d="M6 10Q12 16 18 10" stroke="black" stroke-width="1.5" stroke-linecap="round" fill="none"/>
                  </svg>
                </div>
              </div>
            </td>
          </tr>
        </table>
      `;

      // Даем время на отрисовку и загрузку шрифтов
      await new Promise(resolve => setTimeout(resolve, 500));

      // Конвертируем в canvas с высоким качеством
      const canvas = await html2canvas(tagElement, {
        backgroundColor: '#ffffff',
        scale: 3,
        useCORS: true,
        allowTaint: true,
        logging: false,
        windowWidth: tagElement.scrollWidth,
        windowHeight: tagElement.scrollHeight,
        onclone: (clonedDoc) => {
          // Явно применяем font-weight к клонированным элементам
          const clonedTable = clonedDoc.querySelector('table');
          if (clonedTable) {
            const priceSpan = clonedTable.querySelector('td:first-child span:first-child');
            const nameDiv = clonedTable.querySelector('td:last-child > div > div > div:first-child');
            if (priceSpan) {
              priceSpan.style.fontWeight = String(priceFont.weight);
            }
            if (nameDiv) {
              nameDiv.style.fontWeight = String(nameFont.weight);
            }
          }
        },
      });

      // Добавляем в PDF
      const imgData = canvas.toDataURL('image/png');
      const x = a4Settings.margins.left + col * (tagWidthMm + spacingH);
      const y = a4Settings.margins.top + row * (tagHeightMm + spacingV);
      pdf.addImage(imgData, 'PNG', x, y, tagWidthMm, tagHeightMm);
    }

    document.body.removeChild(container);
    pdf.save('ценники.pdf');
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold text-gray-900">
            Генератор ценников
          </h1>
          <p className="mt-1 text-sm text-gray-600">
            Автоматическая генерация фирменных ценников кофейни
          </p>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Левая панель: форма и список */}
          <div className="space-y-6">
            {/* Форма */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Создать ценник
              </h2>
              <PriceTagForm onAdd={handleAdd} onChange={handleFormChange} />
            </div>

            {/* Список */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Позиции ({items.length}) • Всего ценников: {totalQuantity}
              </h2>
              <PriceTagList items={items} onRemove={handleRemove} />
            </div>

            {/* Настройки шрифтов */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                🔤 Настройки шрифтов
              </h2>
              <div className="space-y-6">
                <FontSettings
                  config={priceFont}
                  onChange={setPriceFont}
                  label="Цена"
                />
                <hr className="border-gray-200" />
                <FontSettings
                  config={nameFont}
                  onChange={setNameFont}
                  label="Название товара"
                />
              </div>
            </div>

            {/* Настройки раскладки A4 */}
            {items.length > 0 && (
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">
                  ⚙️ Настройки печати
                </h2>
                <A4SettingsPanel settings={a4Settings} onChange={setA4Settings} />
              </div>
            )}

            {/* Кнопки экспорта */}
            {items.length > 0 && (
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">
                  Массовая печать
                </h2>
                <button
                  onClick={downloadPDF}
                  className="w-full bg-blue-600 text-white py-3 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 font-medium"
                >
                  📄 Скачать все ценники (PDF A4)
                </button>
              </div>
            )}
          </div>

          {/* Правая панель: превью */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Превью
            </h2>
            <div className="flex items-center justify-center min-h-[400px]">
              {livePreview ? (
                <div ref={previewRef}>
                  <PriceTag
                    data={{ ...livePreview, id: 'live' }}
                    scale={1.5}
                    priceFont={priceFont}
                    nameFont={nameFont}
                  />
                </div>
              ) : selectedItem ? (
                <div ref={previewRef}>
                  <PriceTag
                    data={selectedItem}
                    scale={1.5}
                    priceFont={priceFont}
                    nameFont={nameFont}
                  />
                </div>
              ) : (
                <p className="text-gray-500">
                  Начните вводить данные в форме
                </p>
              )}
            </div>

            {/* Кнопка скачать текущий */}
            {(livePreview || selectedItem) && (
              <div className="mt-4">
                <button
                  onClick={downloadSinglePNG}
                  className="w-full bg-gray-600 text-white py-3 px-4 rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 font-medium"
                >
                  🖼️ Скачать этот ценник (PNG)
                </button>
              </div>
            )}

            {items.length > 0 && !livePreview && (
              <div className="mt-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Или выбрать из списка:
                </label>
                <select
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  value={selectedItem?.id || ''}
                  onChange={(e) => {
                    const item = items.find((i) => i.id === e.target.value);
                    setSelectedItem(item || null);
                  }}
                >
                  <option value="">Не выбрано</option>
                  {items.map((item) => (
                    <option key={item.id} value={item.id}>
                      {item.name} — {item.price} ₽
                    </option>
                  ))}
                </select>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
