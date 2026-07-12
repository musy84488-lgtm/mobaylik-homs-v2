'use client';

import { Minus, Plus } from 'lucide-react';
import { cn } from '@/lib/utils';

interface QuantitySelectorProps {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  size?: 'sm' | 'md';
  className?: string;
}

export default function QuantitySelector({
  value,
  onChange,
  min = 1,
  max = 99,
  size = 'md',
  className,
}: QuantitySelectorProps) {
  const sizes = {
    sm: 'w-7 h-7 text-sm',
    md: 'w-9 h-9 text-base',
  };

  const inputSizes = {
    sm: 'w-10 h-7 text-sm',
    md: 'w-12 h-9 text-base',
  };

  const handleDecrement = () => {
    if (value > min) onChange(value - 1);
  };

  const handleIncrement = () => {
    if (value < max) onChange(value + 1);
  };

  return (
    <div className={cn('flex items-center gap-1', className)}>
      <button
        onClick={handleDecrement}
        disabled={value <= min}
        className={cn(
          sizes[size],
          'flex items-center justify-center rounded-lg border border-gray-200',
          'bg-white text-gray-600 hover:bg-gray-50 active:bg-gray-100',
          'disabled:opacity-40 disabled:cursor-not-allowed',
          'transition-colors duration-200'
        )}
      >
        <Minus className="w-4 h-4" />
      </button>
      <input
        type="number"
        value={value}
        onChange={(e) => {
          const val = parseInt(e.target.value) || min;
          onChange(Math.max(min, Math.min(max, val)));
        }}
        min={min}
        max={max}
        className={cn(
          inputSizes[size],
          'text-center border border-gray-200 rounded-lg',
          'focus:outline-none focus:ring-2 focus:ring-primary-500',
          'font-semibold text-gray-800'
        )}
      />
      <button
        onClick={handleIncrement}
        disabled={value >= max}
        className={cn(
          sizes[size],
          'flex items-center justify-center rounded-lg border border-gray-200',
          'bg-white text-gray-600 hover:bg-gray-50 active:bg-gray-100',
          'disabled:opacity-40 disabled:cursor-not-allowed',
          'transition-colors duration-200'
        )}
      >
        <Plus className="w-4 h-4" />
      </button>
    </div>
  );
}
