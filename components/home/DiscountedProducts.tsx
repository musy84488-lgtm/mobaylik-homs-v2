'use client';

import Link from 'next/link';
import { ChevronLeft, Percent } from 'lucide-react';
import { getDiscountedProducts } from '@/data/products';
import { ProductGrid } from '@/components/products';

export default function DiscountedProducts() {
  const products = getDiscountedProducts();

  return (
    <section className="py-12 lg:py-16 bg-gradient-to-br from-red-50 to-orange-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl bg-red-500 flex items-center justify-center">
              <Percent className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-2xl lg:text-3xl font-bold text-gray-900">عروض خاصة</h2>
              <p className="text-gray-500 mt-1">خصومات حصرية لفترة محدودة</p>
            </div>
          </div>
          <Link
            href="/products?discount=true"
            className="hidden sm:flex items-center gap-1 text-sm font-semibold text-red-600 hover:text-red-700 transition-colors"
          >
            عرض الكل
            <ChevronLeft className="w-4 h-4" />
          </Link>
        </div>

        <ProductGrid products={products} />
      </div>
    </section>
  );
}
