'use client';
import { QuestionMarkCircleIcon } from '@heroicons/react/24/outline';

interface ProgressBarProps {
  title?: string;
  value: number;
  subtitle?: string;
  label: string;
  description?: string;
  showInfo?: boolean;
  bgColor?: string;
}

export default function ProgressBar({
  title,
  value,
  subtitle,
  label,
  description,
  showInfo = false,
  bgColor = '#F5F5F5',
}: ProgressBarProps) {
  const isRed = value < 50;
  const knobColor = isRed ? '#ef4444' : '#8BC34A';
  const roundedColor = isRed ? '#be2e00' : '#8BC34A';

  return (
    <div className="bg-white rounded-lg border border-gray-100 p-5 h-full">
      {showInfo && (
        <div className="flex justify-end">
          <button className="text-gray-400 hover:text-gray-600">
            <QuestionMarkCircleIcon className="w-5 h-5" />
          </button>
        </div>
      )}

      {title && <h2 className="text-xl font-medium mb-4">{title}</h2>}

      <div className="flex justify-between items-start mb-3">
        <div>
          <h3 className="text-lg font-bold text-gray-500 mt-0.5">{label}</h3>
        </div>
      </div>

      <div
        className="relative h-[12px] rounded-full"
        style={{ backgroundColor: bgColor }}
      >
        <div
          className="absolute left-0 top-0 h-full transition-colors rounded-l-full"
          style={{
            width: `${value}%`,
            backgroundColor: knobColor,
          }}
        />

        <div
          className="absolute top-1/2 w-4 h-4 rounded-full bg-white"
          style={{
            left: `${value}%`,
            transform: 'translate(-50%, -50%)',
            border: `4px solid ${roundedColor}`,
            boxShadow: '0 1px 2px rgba(0,0,0,0.1)',
          }}
        />
      </div>

      {subtitle && (
        <p className="mt-2 text-xs text-gray-500 font-bold">{subtitle}</p>
      )}

      {description && (
        <p className="mt-2 text-xs text-gray-500">{description}</p>
      )}
    </div>
  );
}
