import type { PriceTagData } from '../types';

interface PriceTagListProps {
  items: PriceTagData[];
  onRemove: (id: string) => void;
}

export default function PriceTagList({ items, onRemove }: PriceTagListProps) {
  if (items.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        Добавьте первую позицию
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {items.map((item) => (
        <div
          key={item.id}
          className="flex items-center justify-between p-3 bg-gray-50 rounded-md border border-gray-200"
        >
          <div className="flex-1">
            <div className="font-medium text-gray-900">
              {item.name}
              {item.isNew && (
                <span className="ml-2 text-xs bg-fuchsia-400 text-white px-2 py-0.5 rounded-full">
                  NEW
                </span>
              )}
              <span className="ml-2 text-xs bg-blue-500 text-white px-2 py-0.5 rounded-full">
                ×{item.quantity}
              </span>
            </div>
            <div className="text-sm text-gray-600">
              {item.price} ₽ {item.weight && `• ${item.weight}`}
            </div>
          </div>
          <button
            onClick={() => onRemove(item.id)}
            className="ml-4 text-red-600 hover:text-red-800 font-medium"
          >
            Удалить
          </button>
        </div>
      ))}
    </div>
  );
}
