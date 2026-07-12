'use client';

import Link from 'next/link';
import Image from 'next/image';
import { X, ShoppingCart, ArrowLeft, Scale } from 'lucide-react';
import { motion } from 'framer-motion';
import { useCompare } from '@/lib/hooks';
import { useCart } from '@/lib/hooks';
import { formatPrice } from '@/lib/utils';
import { EmptyState, Button, StarRating } from '@/components/ui';

export default function ComparePage() {
  const items = useCompare((state) => state.items);
  const removeItem = useCompare((state) => state.removeItem);
  const clearCompare = useCompare((state) => state.clearCompare);
  const addToCart = useCart((state) => state.addItem);

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16">
        <EmptyState
          type="products"
          title="لا يوجد منتجات للمقارنة"
          description="أضف منتجات للمقارنة بينها"
          actionLabel="تصفح المنتجات"
          onAction={() => window.location.href = '/products'}
        />
      </div>
    );
  }

  const products = items.map((item) => item.product);

  const specs = [
    { label: 'السعر', key: 'price', format: (v: number) => formatPrice(v) },
    { label: 'الماركة', key: 'brand' },
    { label: 'الموديل', key: 'model' },
    { label: 'الشاشة', key: 'screenSize' },
    { label: 'المعالج', key: 'processor' },
    { label: 'الذاكرة', key: 'storage' },
    { label: 'الرام', key: 'ram' },
    { label: 'الكاميرا', key: 'camera' },
    { label: 'البطارية', key: 'battery' },
    { label: 'نظام التشغيل', key: 'os' },
    { label: 'التقييم', key: 'rating', format: (v: number) => `${v}/5` },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-primary-100 flex items-center justify-center">
            <Scale className="w-5 h-5 text-primary-600" />
          </div>
          <div>
            <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">مقارنة المنتجات</h1>
            <p className="text-gray-500 text-sm">{items.length} منتج</p>
          </div>
        </div>
        <button
          onClick={clearCompare}
          className="text-sm text-red-500 hover:text-red-600 font-medium"
        >
          مسح الكل
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[600px]">
          <thead>
            <tr>
              <th className="text-right p-4 text-sm font-semibold text-gray-500 w-32">المواصفة</th>
              {products.map((product) => (
                <th key={product.id} className="p-4 min-w-[200px]">
                  <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
                    <div className="relative aspect-square bg-gray-50">
                      <Image src={product.image} alt={product.name} fill className="object-cover" sizes="200px" />
                      <button
                        onClick={() => removeItem(product.id)}
                        className="absolute top-2 left-2 w-7 h-7 rounded-full bg-white/90 flex items-center justify-center hover:bg-red-50 hover:text-red-500"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </div>
                    <div className="p-3">
                      <Link href={`/products/${product.slug}`}>
                        <h3 className="text-sm font-bold text-gray-900 line-clamp-1 hover:text-primary-600">{product.name}</h3>
                      </Link>
                      <p className="text-lg font-bold text-primary-600 mt-1">{formatPrice(product.price)}</p>
                      <Button
                        onClick={() => addToCart(product, 1)}
                        size="sm"
                        fullWidth
                        className="mt-2"
                        leftIcon={<ShoppingCart className="w-3.5 h-3.5" />}
                      >
                        إضافة للسلة
                      </Button>
                    </div>
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {specs.map((spec) => (
              <tr key={spec.key} className="border-t border-gray-100">
                <td className="p-4 text-sm font-semibold text-gray-700">{spec.label}</td>
                {products.map((product) => {
                  const value = (product as any)[spec.key];
                  return (
                    <td key={product.id} className="p-4 text-center">
                      <span className="text-sm text-gray-600">
                        {value !== undefined && value !== null
                          ? spec.format ? spec.format(value) : value
                          : '—'}
                      </span>
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Link
        href="/products"
        className="inline-flex items-center gap-2 text-sm text-primary-600 hover:text-primary-700 font-medium mt-8"
      >
        <ArrowLeft className="w-4 h-4" />
        متابعة التسوق
      </Link>
    </div>
  );
}
