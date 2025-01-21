'use client';
import { useEffect, useState } from 'react';
import { ChevronRightIcon } from '@heroicons/react/24/outline';

interface AdvertisementsData {
  active: number;
  inactive: number;
  archived: number;
  deleted: number;
}

export default function Advertisements() {
  const [data, setData] = useState<AdvertisementsData | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('/api/advertisements');
      const data = await response.json();
      setData(data);
    };

    fetchData();
  }, []);

  if (!data) return null;

  const items = [
    { label: 'Активные', value: data.active, color: 'bg-green-500' },
    { label: 'Неактивные', value: data.inactive, color: 'bg-gray-500' },
    { label: 'Архивные', value: data.archived, color: 'bg-gray-400' },
    { label: 'Удаленные', value: data.deleted, color: 'bg-red-500' },
  ];

  return (
    <div className="bg-white rounded-lg border border-gray-100 p-5">
      <h2 className="text-xl font-medium mb-4">Объявления</h2>
      <div className="divide-y divide-gray-100">
        {items.map(({ label, value, color }) => (
          <div
            key={label}
            className="flex justify-between items-center text-sm py-2.5 first:pt-0 last:pb-0"
          >
            <div className="flex items-center gap-2">
              <div className={`w-1.5 h-1.5 rounded-full ${color}`} />
              <span className="text-gray-500">{label}</span>
            </div>
            <div className="flex items-center gap-1">
              <span className="font-medium tabular-nums">{value}</span>
              <ChevronRightIcon className="w-4 h-4 text-gray-400" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
