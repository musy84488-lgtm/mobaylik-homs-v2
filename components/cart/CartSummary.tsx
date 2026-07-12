'use client';

import { useRouter } from 'next/navigation';
import { ShoppingCart, Truck, Tag, CreditCard } from 'lucide-react';
import { useCart } from '@/lib/hooks';
import { formatPrice } from '@/lib/utils';
import { Button } from '@/components/ui';

export default function CartSummary() {
  const router = useRouter();
  const items = useCart((state) => state.items);
  const getTotalPrice = useCart((state) => state.getTotalPrice);

  const subtotal = getTotalPrice();
  const shippingCost = subtotal > 1000000 ? 0 : 25000;
  const total = subtotal + shippingCost;

  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-6 sticky top-24">
      <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
        <ShoppingCart className="w-5 h-5 text-primary-600" />
        ملخص الطلب
      </h2>

      <div className="space-y-3 mb-4">
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-500">المجموع الفرعي</span>
          <span className="font-semibold text-gray-800">{formatPrice(subtotal)}</span>
        </div>
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-500 flex items-center gap-1">
            <Truck className="w-3.5 h-3.5" />
            الشحن
          </span>
          <span className="font-semibold text-gray-800">
            {shippingCost === 0 ? 'مجاني' : formatPrice(shippingCost)}
          </span>
        </div>
        {subtotal > 1000000 && (
          <div className="flex items-center gap-1 text-xs text-green-600 bg-green-50 p-2 rounded-lg">
            <Tag className="w-3.5 h-3.5" />
            تهانينا! لقد حصلت على شحن مجاني
          </div>
        )}
        <div className="border-t border-gray-100 pt-3">
          <div className="flex items-center justify-between">
            <span className="text-base font-bold text-gray-900">الإجمالي</span>
            <span className="text-xl font-bold text-primary-600">{formatPrice(total)}</span>
          </div>
        </div>
      </div>

      <Button
        onClick={() => router.push('/checkout')}
        fullWidth
        size="lg"
        leftIcon={<CreditCard className="w-5 h-5" />}
        className="mb-3"
      >
        إتمام الطلب
      </Button>

      <p className="text-xs text-gray-400 text-center">
        بالضغط على إتمام الطلب، سيتم تحويلك إلى واتساب لتأكيد الطلب
      </p>
    </div>
  );
}
