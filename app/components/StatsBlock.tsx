'use client';
import { ArrowUpIcon, ArrowDownIcon } from '@heroicons/react/24/solid';
import { useState, useEffect } from 'react';

interface StatItem {
  key: string;
  label: string;
  value: string | number;
  subValue?: string;
}

export default function StatsBlock() {
  const [selectedKey, setSelectedKey] = useState('parameters');
  const [isLoading, setIsLoading] = useState(true);
  const [stats, setStats] = useState<StatItem[]>([]);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch('/api/stats');
        const data = await response.json();
        
        const formattedStats = [
          {
            key: 'parameters',
            label: 'Параметры',
            value: data.parameters.value,
            subValue: data.parameters.change,
          },
          {
            key: 'contacts',
            label: 'Контакты',
            value: data.contacts.value,
            subValue: data.contacts.change,
          },
          {
            key: 'favorites',
            label: 'Избранное',
            value: data.favorites.value,
          },
          {
            key: 'orders',
            label: 'Заказов',
            value: data.orders.value,
            subValue: data.orders.change,
          },
        ];
        
        setStats(formattedStats);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching stats:', error);
        setIsLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (isLoading) {
    return (
      <div className="flex justify-between gap-1">
        {[...Array(4)].map((_, index) => (
          <div
            key={index}
            className="flex-1 rounded-lg border border-gray-100 bg-gray-50 p-2 animate-pulse"
          >
            <div className="h-4 bg-gray-200 rounded w-20 mb-2" />
            <div className="h-8 bg-gray-200 rounded w-16" />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="flex justify-between gap-1">
      {stats.map(({ key, label, value, subValue }) => (
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
