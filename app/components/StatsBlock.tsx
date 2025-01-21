'use client';
import { ArrowUpIcon, ArrowDownIcon } from '@heroicons/react/24/solid';
import { useState } from 'react';

const statItems = [
  {
    key: 'parameters',
    label: 'Параметры',
    value: '174',
    subValue: '+5.4%',
  },
  {
    key: 'contacts',
    label: 'Контакты',
    value: '0',
    subValue: '-100%',
  },
  {
    key: 'favorites',
    label: 'Избранное',
    value: '8',
  },
  {
    key: 'orders',
    label: 'Заказов',
    value: '0',
    subValue: '-100%',
  },
];

export default function StatsBlock() {
  const [selectedKey, setSelectedKey] = useState('parameters');

  return (
    <div className="flex justify-between gap-1">
      {statItems.map(({ key, label, value, subValue }) => (
        <div
          key={key}
          onClick={() => setSelectedKey(key)}
          className={`flex-1 rounded-lg border p-2 cursor-pointer transition-colors ${
            selectedKey === key
              ? 'border-[#8BC34A] bg-white'
              : 'border-gray-100 bg-gray-50'
          }`}
        >
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm text-gray-500 mt-1">{label}</div>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-semibold">{value}</span>
                {subValue && (
                  <div className="flex items-center gap-0.5">
                    {subValue.includes('+') ? (
                      <ArrowUpIcon className="w-3 h-3 text-green-500" />
                    ) : (
                      <ArrowDownIcon className="w-3 h-3 text-red-500" />
                    )}
                    <span
                      className={`text-xs ${
                        subValue.includes('+')
                          ? 'text-green-500'
                          : 'text-red-500'
                      }`}
                    >
                      {subValue.replace('+', '')}
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
