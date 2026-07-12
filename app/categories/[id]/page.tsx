'use client';

import { useParams } from 'next/navigation';
import Link from 'next/link';
import { Package, ChevronLeft } from 'lucide-react';
import { getCategoryBySlug } from '@/data/categories';
import { getProductsByCategory } from '@/data/products';
import { ProductGrid } from '@/components/products';

export default function CategoryPage() {
  const params = useParams();
  const slug = params.id as string;
  const category = getCategoryBySlug(slug);
  const products = category ? getProductsByCategory(category.id) : [];

  if (!category) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
        <h1 className="text-2xl font-bold text-gray-900 mb-2">الفئة غير موجودة</h1>
        <Link href="/categories" className="text-primary-600 hover:underline">العودة للفئات</Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <nav className="flex items-center gap-2 text-sm text-gray-500 mb-6">
        <Link href="/" className="hover:text-primary-600 transition-colors">الرئيسية</Link>
        <ChevronLeft className="w-3.5 h-3.5" />
        <Link href="/categories" className="hover:text-primary-600 transition-colors">الفئات</Link>
        <ChevronLeft className="w-3.5 h-3.5" />
        <span className="text-gray-800 font-medium">{category.name}</span>
      </nav>

      <div className="flex items-center gap-3 mb-8">
        <div className="w-10 h-10 rounded-xl bg-primary-100 flex items-center justify-center">
          <Package className="w-5 h-5 text-primary-600" />
        </div>
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">{category.name}</h1>
          <p className="text-gray-500 text-sm">{products.length} منتج متوفر</p>
        </div>
      </div>

      {category.description && (
        <p className="text-gray-600 mb-8 max-w-2xl">{category.description}</p>
      )}

      <ProductGrid products={products} emptyMessage="لا توجد منتجات في هذه الفئة حالياً" />
    </div>
  );
}
