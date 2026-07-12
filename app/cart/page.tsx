'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ShoppingCart, ArrowLeft, Package } from 'lucide-react';
import { useCart } from '@/lib/hooks';
import { CartItem, CartSummary } from '@/components/cart';
import { EmptyState, Button } from '@/components/ui';
import { OrderModal } from '@/components/shared';

export default function CartPage() {
  const items = useCart((state) => state.items);
  const [showOrderModal, setShowOrderModal] = useState(false);

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16">
        <EmptyState
          type="cart"
          title="سلة التسوق فارغة"
          description="أضف بعض المنتجات إلى سلة التسوق للمتابعة"
          actionLabel="تصفح المنتجات"
          onAction={() => window.location.href = '/products'}
        />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center gap-3 mb-8">
        <div className="w-10 h-10 rounded-xl bg-primary-100 flex items-center justify-center">
          <ShoppingCart className="w-5 h-5 text-primary-600" />
        </div>
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">سلة التسوق</h1>
          <p className="text-gray-500 text-sm">{items.length} منتج في السلة</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-4">
          {items.map((item) => (
            <CartItem key={item.product.id} item={item} />
          ))}

          <Link
            href="/products"
            className="inline-flex items-center gap-2 text-sm text-primary-600 hover:text-primary-700 font-medium"
          >
            <ArrowLeft className="w-4 h-4" />
            متابعة التسوق
          </Link>
        </div>

        {/* Summary */}
        <div>
          <CartSummary />
          <div className="mt-4">
            <Button
              onClick={() => setShowOrderModal(true)}
              fullWidth
              size="lg"
              leftIcon={<Package className="w-5 h-5" />}
            >
              طلب سريع عبر واتساب
            </Button>
          </div>
        </div>
      </div>

      <OrderModal isOpen={showOrderModal} onClose={() => setShowOrderModal(false)} />
    </div>
  );
}
