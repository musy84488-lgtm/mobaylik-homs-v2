'use client';

import Link from 'next/link';
import { ChevronLeft, Zap } from 'lucide-react';
import { getNewProducts } from '@/data/products';
import { ProductGrid } from '@/components/products';

export default function NewArrivals() {
  const products = getNewProducts();

  return (
    <section className="py-12 lg:py-16">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-2">
            <Zap className="w-6 h-6 text-green-500" />
            <div>
              <h2 className="text-2xl lg:text-3xl font-bold text-gray-900">وصل حديثاً</h2>
              <p className="text-gray-500 mt-1">أحدث الهواتف المتوفرة لدينا</p>
            </div>
          </div>
          <Link
            href="/products?new=true"
            className="hidden sm:flex items-center gap-1 text-sm font-semibold text-primary-600 hover:text-primary-700 transition-colors"
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
