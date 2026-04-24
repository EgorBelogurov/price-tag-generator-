import { useState } from 'react';
import type { PriceTagData } from '../types';

interface PriceTagFormProps {
  onAdd: (data: Omit<PriceTagData, 'id'>) => void;
  onChange?: (data: Omit<PriceTagData, 'id'>) => void;
}

export default function PriceTagForm({ onAdd, onChange }: PriceTagFormProps) {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [weight, setWeight] = useState('');
  const [isNew, setIsNew] = useState(false);
  const [quantity, setQuantity] = useState(1);

  const notifyChange = (updatedData: Partial<{name: string; price: string; weight: string; isNew: boolean; quantity: number}>) => {
    const newName = updatedData.name !== undefined ? updatedData.name : name;
    const newPrice = updatedData.price !== undefined ? updatedData.price : price;
    const newWeight = updatedData.weight !== undefined ? updatedData.weight : weight;
    const newIsNew = updatedData.isNew !== undefined ? updatedData.isNew : isNew;
    const newQuantity = updatedData.quantity !== undefined ? updatedData.quantity : quantity;

    if (onChange && newName && newPrice) {
      onChange({
        name: newName,
        price: parseFloat(newPrice) || 0,
        weight: newWeight,
        isNew: newIsNew,
        quantity: newQuantity,
      });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!name || !price) {
      alert('Заполните название и цену');
      return;
    }

    onAdd({
      name,
      price: parseFloat(price),
      weight,
      isNew,
      quantity,
    });

    // Очистка формы
    setName('');
    setPrice('');
    setWeight('');
    setIsNew(false);
    setQuantity(1);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Название продукта
        </label>
        <input
          type="text"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
            notifyChange({ name: e.target.value });
          }}
          placeholder="Конфеты со-со"
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Цена (₽)
        </label>
        <input
          type="number"
          value={price}
          onChange={(e) => {
            setPrice(e.target.value);
            notifyChange({ price: e.target.value });
          }}
          placeholder="90"
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Граммовка
        </label>
        <input
          type="text"
          value={weight}
          onChange={(e) => {
            setWeight(e.target.value);
            notifyChange({ weight: e.target.value });
          }}
          placeholder="20 гр"
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Количество экземпляров
        </label>
        <select
          value={quantity}
          onChange={(e) => {
            const newQty = parseInt(e.target.value);
            setQuantity(newQty);
            notifyChange({ quantity: newQty });
          }}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
        >
          <option value="1">1 шт</option>
          <option value="2">2 шт</option>
          <option value="3">3 шт</option>
          <option value="4">4 шт</option>
          <option value="5">5 шт</option>
        </select>
      </div>

      <div className="flex items-center">
        <input
          type="checkbox"
          id="isNew"
          checked={isNew}
          onChange={(e) => {
            setIsNew(e.target.checked);
            notifyChange({ isNew: e.target.checked });
          }}
          className="w-4 h-4 text-green-600 border-gray-300 rounded focus:ring-green-500"
        />
        <label htmlFor="isNew" className="ml-2 text-sm font-medium text-gray-700">
          Бейдж "NEW"
        </label>
      </div>

      <button
        type="submit"
        className="w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 font-medium"
      >
        Добавить позицию
      </button>
    </form>
  );
}
