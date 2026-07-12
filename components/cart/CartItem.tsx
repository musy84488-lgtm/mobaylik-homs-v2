'use client';

import Image from 'next/image';
import { X } from 'lucide-react';
import { CartItem as CartItemType } from '@/types';
import { formatPrice } from '@/lib/utils';
import { QuantitySelector } from '@/components/ui';
import { useCart } from '@/lib/hooks';

interface CartItemProps {
  item: CartItemType;
}

export default function CartItem({ item }: CartItemProps) {
  const updateQuantity = useCart((state) => state.updateQuantity);
  const removeItem = useCart((state) => state.removeItem);

  return (
    <div className="flex gap-4 p-4 bg-white rounded-xl border border-gray-100 hover:border-gray-200 transition-colors">
      {/* Image */}
      <div className="relative w-24 h-24 shrink-0 rounded-lg overflow-hidden bg-gray-50">
        <Image
          src={item.product.image}
          alt={item.product.name}
          fill
          className="object-cover"
          sizes="96px"
        />
      </div>

      {/* Details */}
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-2">
          <div>
            <h3 className="text-sm font-bold text-gray-900 line-clamp-1">{item.product.name}</h3>
            <p className="text-xs text-gray-400 mt-0.5">{item.product.brand}</p>
            {(item.selectedColor || item.selectedStorage) && (
              <p className="text-xs text-gray-500 mt-1">
                {item.selectedColor && <span>اللون: {item.selectedColor}</span>}
                {item.selectedColor && item.selectedStorage && ' · '}
                {item.selectedStorage && <span>الذاكرة: {item.selectedStorage}</span>}
              </p>
            )}
          </div>
          <button
            onClick={() => removeItem(item.product.id)}
            className="shrink-0 w-7 h-7 rounded-lg bg-gray-100 flex items-center justify-center
              hover:bg-red-100 hover:text-red-500 transition-colors"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="flex items-end justify-between mt-3">
          <QuantitySelector
            value={item.quantity}
            onChange={(qty) => updateQuantity(item.product.id, qty)}
            min={1}
            max={item.product.stockCount}
            size="sm"
          />
          <div className="text-left">
            <p className="text-sm font-bold text-primary-600">
              {formatPrice(item.product.price * item.quantity)}
            </p>
            <p className="text-xs text-gray-400">
              {formatPrice(item.product.price)} × {item.quantity}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
