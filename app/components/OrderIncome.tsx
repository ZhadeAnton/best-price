'use client';
import { useEffect, useState } from 'react';

interface IncomeData {
  total: number;
  today: number;
  week: number;
  month: number;
}

export default function OrderIncome() {
  const [data, setData] = useState<IncomeData | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/income');
        const data = await response.json();
        setData(data);
      } catch (error) {
        console.error('Error fetching income data:', error);
      }
    };

    fetchData();
  }, []);

  if (!data) {
    return (
      <div className="bg-white rounded-lg border border-gray-100 p-3">
        <div className="h-5 w-48 bg-gray-100 rounded animate-pulse mb-3" />
        <div className="space-y-4">
          {[...Array(4)].map((_, index) => (
            <div key={index} className="flex justify-between items-center py-2">
              <div className="h-4 w-24 bg-gray-100 rounded animate-pulse" />
              <div className="h-4 w-20 bg-gray-100 rounded animate-pulse" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  const items = [
    { label: 'Всего', value: data.total },
    { label: 'За последний год', value: data.today },
    { label: 'За последний месяц', value: data.week },
    { label: 'За последнюю неделю', value: data.month },
  ];

  return (
    <div className="bg-white rounded-lg border border-gray-100 p-5">
      <h2 className="text-xl font-medium mb-4">Доходы от заказов</h2>
      <div className="divide-y divide-gray-100">
        {items.map(({ label, value }) => (
          <div
            key={label}
            className="flex justify-between items-center text-sm py-2.5 first:pt-0 last:pb-0"
          >
            <span className="text-gray-500">{label}</span>
            <span className="font-medium tabular-nums">
              {value.toLocaleString()} ₽
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
