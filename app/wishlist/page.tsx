'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Heart, X, ShoppingCart, ArrowLeft } from 'lucide-react';
import { motion } from 'framer-motion';
import { useWishlist } from '@/lib/hooks';
import { useCart } from '@/lib/hooks';
import { formatPrice } from '@/lib/utils';
import { EmptyState, Button } from '@/components/ui';

export default function WishlistPage() {
  const items = useWishlist((state) => state.items);
  const removeItem = useWishlist((state) => state.removeItem);
  const addToCart = useCart((state) => state.addItem);

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16">
        <EmptyState
          type="wishlist"
          title="قائمة الأمنيات فارغة"
          description="أضف منتجاتك المفضلة إلى قائمة الأمنيات"
          actionLabel="تصفح المنتجات"
          onAction={() => window.location.href = '/products'}
        />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center gap-3 mb-8">
        <div className="w-10 h-10 rounded-xl bg-red-100 flex items-center justify-center">
          <Heart className="w-5 h-5 text-red-500" />
        </div>
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">قائمة الأمنيات</h1>
          <p className="text-gray-500 text-sm">{items.length} منتج في قائمة الأمنيات</p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 lg:gap-6">
        {items.map((item, index) => (
          <motion.div
            key={item.product.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            className="bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-card transition-all"
          >
            <div className="relative aspect-square bg-gray-50">
              <Image
                src={item.product.image}
                alt={item.product.name}
                fill
                className="object-cover"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
              />
              <button
                onClick={() => removeItem(item.product.id)}
                className="absolute top-3 left-3 w-8 h-8 rounded-full bg-white/90 backdrop-blur-sm
                  flex items-center justify-center hover:bg-red-50 hover:text-red-500 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="p-4">
              <Link href={`/products/${item.product.slug}`}>
                <h3 className="text-sm font-bold text-gray-900 line-clamp-1 hover:text-primary-600 transition-colors">
                  {item.product.name}
                </h3>
              </Link>
              <p className="text-lg font-bold text-primary-600 mt-2">{formatPrice(item.product.price)}</p>
              <Button
                onClick={() => addToCart(item.product, 1)}
                size="sm"
                fullWidth
                className="mt-3"
                leftIcon={<ShoppingCart className="w-4 h-4" />}
              >
                إضافة للسلة
              </Button>
            </div>
          </motion.div>
        ))}
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
