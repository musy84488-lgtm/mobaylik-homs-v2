'use client';

import { useState } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import {
  Heart, ShoppingCart, Share2, Check, Truck, Shield, RotateCcw,
  ChevronLeft, Package
} from 'lucide-react';
import { motion } from 'framer-motion';
import { getProductBySlug, products } from '@/data/products';
import { formatPrice, getDiscountPercentage } from '@/lib/utils';
import { useCart } from '@/lib/hooks';
import { useWishlist } from '@/lib/hooks';
import { StarRating, Badge, Button, QuantitySelector } from '@/components/ui';
import { ProductGrid } from '@/components/products';

export default function ProductDetailPage() {
  const params = useParams();
  const slug = params.id as string;
  const product = getProductBySlug(slug);

  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState(product?.color || '');
  const [selectedImage, setSelectedImage] = useState(0);

  const addItem = useCart((state) => state.addItem);
  const toggleWishlist = useWishlist((state) => state.toggleItem);
  const isInWishlist = useWishlist((state) => state.isInWishlist);

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
        <h1 className="text-2xl font-bold text-gray-900 mb-2">المنتج غير موجود</h1>
        <p className="text-gray-500 mb-6">المنتج الذي تبحث عنه غير متوفر</p>
        <Link href="/products" className="text-primary-600 hover:underline">العودة للمنتجات</Link>
      </div>
    );
  }

  const discount = getDiscountPercentage(product.originalPrice || 0, product.price);
  const images = product.images || [product.image];
  const relatedProducts = products.filter((p) => p.categoryId === product.categoryId && p.id !== product.id).slice(0, 4);

  return (
    <div className="container mx-auto px-4 py-8">
      <nav className="flex items-center gap-2 text-sm text-gray-500 mb-6">
        <Link href="/" className="hover:text-primary-600 transition-colors">الرئيسية</Link>
        <ChevronLeft className="w-3.5 h-3.5" />
        <Link href="/products" className="hover:text-primary-600 transition-colors">المنتجات</Link>
        <ChevronLeft className="w-3.5 h-3.5" />
        <span className="text-gray-800 font-medium">{product.name}</span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 mb-16">
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
          <div className="relative aspect-square rounded-2xl overflow-hidden bg-gray-50 mb-4">
            <Image src={images[selectedImage]} alt={product.name} fill className="object-cover" sizes="(max-width: 1024px) 100vw, 50vw" priority />
            {discount > 0 && <Badge variant="danger" className="absolute top-4 left-4 text-sm px-3 py-1">خصم {discount}%</Badge>}
            {product.isNew && <Badge variant="success" className="absolute top-4 right-4">جديد</Badge>}
          </div>
          {images.length > 1 && (
            <div className="flex gap-3">
              {images.map((img, i) => (
                <button key={i} onClick={() => setSelectedImage(i)} className={`relative w-20 h-20 rounded-xl overflow-hidden border-2 transition-colors ${i === selectedImage ? 'border-primary-600' : 'border-gray-200 hover:border-gray-300'}`}>
                  <Image src={img} alt="" fill className="object-cover" sizes="80px" />
                </button>
              ))}
            </div>
          )}
        </motion.div>

        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
          <div className="flex items-center gap-2 mb-2">
            <Link href={`/products?brand=${product.brand}`} className="text-sm text-primary-600 font-medium hover:underline">{product.brand}</Link>
            <span className="text-gray-300">|</span>
            <span className="text-sm text-gray-400">{product.model}</span>
          </div>
          <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-3">{product.name}</h1>
          <div className="flex items-center gap-3 mb-4">
            <StarRating rating={product.rating} showValue reviewCount={product.reviewCount} />
            <span className="text-sm text-gray-400">|</span>
            <span className="text-sm text-gray-500">{product.soldCount} تم البيع</span>
          </div>
          <div className="flex items-baseline gap-3 mb-6">
            <span className="text-3xl lg:text-4xl font-bold text-primary-600">{formatPrice(product.price)}</span>
            {product.originalPrice && product.originalPrice > product.price && (
              <span className="text-xl text-gray-400 line-through">{formatPrice(product.originalPrice)}</span>
            )}
          </div>
          <p className="text-gray-600 leading-relaxed mb-6">{product.description}</p>

          {product.colors && product.colors.length > 0 && (
            <div className="mb-6">
              <p className="text-sm font-semibold text-gray-800 mb-2">اللون: {selectedColor}</p>
              <div className="flex gap-2">
                {product.colors.map((color) => (
                  <button key={color} onClick={() => setSelectedColor(color)} className={`px-4 py-2 rounded-xl text-sm border-2 transition-colors ${selectedColor === color ? 'border-primary-600 bg-primary-50 text-primary-600 font-semibold' : 'border-gray-200 text-gray-600 hover:border-gray-300'}`}>
                    {color}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-6">
            <QuantitySelector value={quantity} onChange={setQuantity} max={product.stockCount} />
            <div className="flex gap-3 flex-1">
              <Button onClick={() => addItem(product, quantity, selectedColor || undefined)} disabled={!product.inStock} size="lg" className="flex-1" leftIcon={<ShoppingCart className="w-5 h-5" />}>
                {product.inStock ? 'إضافة للسلة' : 'غير متوفر'}
              </Button>
              <Button onClick={() => toggleWishlist(product)} variant="outline" size="lg" className="w-12 h-12 p-0">
                <Heart className={`w-5 h-5 ${isInWishlist(product.id) ? 'fill-red-500 text-red-500' : ''}`} />
              </Button>
              <Button variant="outline" size="lg" className="w-12 h-12 p-0 hidden sm:flex" onClick={() => { if (navigator.share) navigator.share({ title: product.name, text: product.description, url: window.location.href }); }}>
                <Share2 className="w-5 h-5" />
              </Button>
            </div>
          </div>

          <div className="flex items-center gap-2 mb-6">
            {product.inStock ? (
              <><Check className="w-4 h-4 text-green-500" /><span className="text-sm text-green-600 font-medium">متوفر - {product.stockCount} قطعة</span></>
            ) : (
              <span className="text-sm text-red-500 font-medium">غير متوفر حالياً</span>
            )}
          </div>

          <div className="grid grid-cols-3 gap-3 mb-8">
            <div className="flex flex-col items-center gap-1.5 p-3 bg-gray-50 rounded-xl">
              <Truck className="w-5 h-5 text-primary-600" /><span className="text-xs text-gray-600 text-center">شحن سريع</span>
            </div>
            <div className="flex flex-col items-center gap-1.5 p-3 bg-gray-50 rounded-xl">
              <Shield className="w-5 h-5 text-primary-600" /><span className="text-xs text-gray-600 text-center">ضمان أصلي</span>
            </div>
            <div className="flex flex-col items-center gap-1.5 p-3 bg-gray-50 rounded-xl">
              <RotateCcw className="w-5 h-5 text-primary-600" /><span className="text-xs text-gray-600 text-center">إرجاع سهل</span>
            </div>
          </div>

          {product.specifications && Object.keys(product.specifications).length > 0 && (
            <div className="border border-gray-100 rounded-2xl overflow-hidden">
              <div className="bg-gray-50 px-4 py-3 border-b border-gray-100">
                <h3 className="font-bold text-gray-800">المواصفات التقنية</h3>
              </div>
              <div className="divide-y divide-gray-100">
                {Object.entries(product.specifications).map(([key, value]) => (
                  <div key={key} className="flex items-center px-4 py-3">
                    <span className="text-sm text-gray-500 w-32 shrink-0">{key}</span>
                    <span className="text-sm font-medium text-gray-800">{value}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </motion.div>
      </div>

      {relatedProducts.length > 0 && (
        <div className="border-t border-gray-100 pt-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">منتجات مشابهة</h2>
          <ProductGrid products={relatedProducts} />
        </div>
      )}
    </div>
  );
}
