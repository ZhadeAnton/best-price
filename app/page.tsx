'use client';
import OrderIncome from '@/app/components/OrderIncome';
import ProgressBar from '@/app/components/ProgressBar';
import BarChart from '@/app/components/BarChart';
import StatsBlock from '@/app/components/StatsBlock';
import Advertisements from '@/app/components/Advertisements';
import { progressData } from '@/app/lib/data';
import { useEffect, useState } from 'react';

interface SalesData {
  day: string;
  value: number;
}

export default function Home() {
  const [salesData, setSalesData] = useState<SalesData[]>([]);
  const { serviceLevel, promotionActivity } = progressData;
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchSalesData = async () => {
      try {
        const response = await fetch('/api/sales');
        const data = await response.json();

        await new Promise((resolve) => setTimeout(resolve, 400));

        setSalesData(data);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching sales data:', error);
        setIsLoading(false);
      }
    };

    fetchSalesData();
  }, []);

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900]">
      <div className="container mx-auto px-4 py-8 max-w-[720px]">
        <h1 className="text-2xl font-semibold mb-5 dark:text-white">Сводка</h1>

        <div className="bg-white rounded-lg shadow-sm p-6 mb-3">
          <div className="mb-4 flex justify-between items-center">
            <h2 className="text-lg font-medium dark:text-white">
              Статистика за 21 — 27 дек
            </h2>

            <button className="text-sm text-gray-500 hover:text-gray-700 border border-gray-200 rounded-lg px-2 py-1">
              Больше статистики
            </button>
          </div>

          <StatsBlock />

          <div className="flex justify-between items-end mt-3">
            {isLoading ? (
              <div className="flex justify-between items-end w-full">
                {[...Array(7)].map((_, index) => (
                  <div
                    key={index}
                    className="flex flex-col items-center h-[184px]"
                  >
                    <div className="relative w-12 h-40 bg-gray-50 rounded-md animate-pulse" />
                    <div className="mt-2 h-4 w-12 bg-gray-100 rounded animate-pulse" />
                  </div>
                ))}
              </div>
            ) : (
              salesData.map(({ day, value }) => (
                <BarChart key={day} value={value} label={day} />
              ))
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div className="h-[224px]">
            <OrderIncome />
          </div>
          <div className="h-[224px]">
            <Advertisements />
          </div>
          <div className="h-[224px]">
            <ProgressBar {...serviceLevel} showInfo isLoading={isLoading} />
          </div>
          <div className="h-[224px]">
            <ProgressBar
              {...promotionActivity}
              showInfo
              isLoading={isLoading}
            />
          </div>
        </div>
      </div>
    </main>
  );
}
