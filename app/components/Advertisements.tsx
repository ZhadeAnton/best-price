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
      try {
        const response = await fetch('/api/advertisements');
        const data = await response.json();
        setData(data);
      } catch (error) {
        console.error('Error fetching advertisements data:', error);
      }
    };

    fetchData();
  }, []);

  if (!data) {
    return (
      <div className="bg-white rounded-lg border border-gray-100 p-3">
        <div className="h-7 w-32 bg-gray-100 rounded animate-pulse mb-4" />
        <div className="space-y-3">
          {[...Array(4)].map((_, index) => (
            <div key={index} className="flex justify-between items-center py-2">
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-gray-100 animate-pulse" />
                <div className="h-4 w-20 bg-gray-100 rounded animate-pulse" />
              </div>
              <div className="flex items-center gap-1">
                <div className="h-4 w-8 bg-gray-100 rounded animate-pulse" />
                <div className="w-4 h-4 bg-gray-100 rounded animate-pulse" />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

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
