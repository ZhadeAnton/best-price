'use client';
import { useState, useEffect } from 'react';

interface BarChartProps {
  value: number;
  label: string;
}

export default function BarChart({ value, label }: BarChartProps) {
  const [currentHeight, setCurrentHeight] = useState(0);
  const [showTooltip, setShowTooltip] = useState(false);
  const [tooltipPosition, setTooltipPosition] = useState(0);

  useEffect(() => {
    // Запускаем анимацию после монтирования
    requestAnimationFrame(() => {
      setCurrentHeight(value);
    });
  }, [value]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const relativeY = e.clientY - rect.top;
    const heightPercent = (1 - relativeY / rect.height) * 100;

    if (heightPercent <= value) {
      setTooltipPosition(relativeY);
      setShowTooltip(true);
    } else {
      setShowTooltip(false);
    }
  };

  return (
    <div className="flex flex-col items-center h-[184px]">
      <div
        className="relative w-12 h-40 bg-gray-50 rounded-md overflow-visible dark:bg-gray-700 cursor-pointer"
        onMouseMove={handleMouseMove}
        onMouseLeave={() => setShowTooltip(false)}
      >
        {showTooltip && (
          <div
            className="absolute left-1/2 -translate-x-1/2 bg-black text-white px-1 py-0.5 rounded text-xs whitespace-nowrap z-20 pointer-events-none"
            style={{
              top: tooltipPosition - 20,
            }}
          >
            {value}
          </div>
        )}
        <div
          className="absolute bottom-0 w-full bg-[#8BC34A] rounded-md transition-all duration-700 ease-out"
          style={{ height: `${currentHeight}%` }}
        />
      </div>
      <span className="mt-2 text-xs text-gray-600 dark:text-gray-400">
        {label}
      </span>
    </div>
  );
}
