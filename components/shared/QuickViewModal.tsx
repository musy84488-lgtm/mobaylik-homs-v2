'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { X, ShoppingCart, Heart, Check, ChevronLeft } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Product } from '@/types';
import { formatPrice, getDiscountPercentage } from '@/lib/utils';
import { useCart } from '@/lib/hooks';
import { useWishlist } from '@/lib/hooks';
import { StarRating, Badge, Button, QuantitySelector } from '@/components/ui';

interface QuickViewModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function QuickViewModal({ product, isOpen, onClose }: QuickViewModalProps) {
  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState(product?.color || '');
  const [selectedImage, setSelectedImage] = useState(0);

  const addItem = useCart((state) => state.addItem);
  const toggleWishlist = useWishlist((state) => state.toggleItem);
  const isInWishlist = useWishlist((state) => state.isInWishlist);

  if (!product) return null;

  const discount = getDiscountPercentage(product.originalPrice || 0, product.price);
  const images = product.images || [product.image];

  const handleAddToCart = () => {
    addItem(product, quantity, selectedColor || undefined);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto shadow-2xl"
          >
            <div className="relative p-6 lg:p-8">
              {/* Close Button */}
              <button
                onClick={onClose}
                className="absolute top-4 left-4 w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center
                  hover:bg-gray-200 transition-colors z-10"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
                {/* Images */}
                <div>
                  <div className="relative aspect-square rounded-xl overflow-hidden bg-gray-50 mb-3">
                    <Image
                      src={images[selectedImage]}
                      alt={product.name}
                      fill
                      className="object-cover"
                      sizes="(max-width: 1024px) 100vw, 50vw"
                    />
                    {discount > 0 && (
                      <Badge variant="danger" className="absolute top-3 left-3">
                        -{discount}%
                      </Badge>
                    )}
                  </div>
                  {images.length > 1 && (
                    <div className="flex gap-2">
                      {images.map((img, i) => (
                        <button
                          key={i}
                          onClick={() => setSelectedImage(i)}
                          className={`relative w-16 h-16 rounded-lg overflow-hidden border-2 transition-colors ${
                            i === selectedImage ? 'border-primary-600' : 'border-gray-200'
                          }`}
                        >
                          <Image src={img} alt="" fill className="object-cover" sizes="64px" />
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* Details */}
                <div>
                  <p className="text-sm text-primary-600 font-medium mb-1">{product.brand}</p>
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">{product.name}</h2>

                  <div className="flex items-center gap-2 mb-3">
                    <StarRating rating={product.rating} showValue reviewCount={product.reviewCount} />
                  </div>

                  <div className="flex items-baseline gap-3 mb-4">
                    <span className="text-3xl font-bold text-primary-600">{formatPrice(product.price)}</span>
                    {product.originalPrice && product.originalPrice > product.price && (
                      <span className="text-lg text-gray-400 line-through">{formatPrice(product.originalPrice)}</span>
                    )}
                  </div>

                  <p className="text-gray-600 text-sm leading-relaxed mb-4">{product.description}</p>

                  {/* Colors */}
                  {product.colors && product.colors.length > 0 && (
                    <div className="mb-4">
                      <p className="text-sm font-semibold text-gray-800 mb-2">اللون: {selectedColor}</p>
                      <div className="flex gap-2">
                        {product.colors.map((color) => (
                          <button
                            key={color}
                            onClick={() => setSelectedColor(color)}
                            className={`px-3 py-1.5 rounded-lg text-sm border-2 transition-colors ${
                              selectedColor === color
                                ? 'border-primary-600 bg-primary-50 text-primary-600'
                                : 'border-gray-200 text-gray-600 hover:border-gray-300'
                            }`}
                          >
                            {color}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Specs */}
                  <div className="grid grid-cols-2 gap-2 mb-4">
                    {product.storage && (
                      <div className="bg-gray-50 rounded-lg p-2.5">
                        <p className="text-xs text-gray-400">الذاكرة</p>
                        <p className="text-sm font-semibold text-gray-800">{product.storage}</p>
                      </div>
                    )}
                    {product.ram && (
                      <div className="bg-gray-50 rounded-lg p-2.5">
                        <p className="text-xs text-gray-400">الرام</p>
                        <p className="text-sm font-semibold text-gray-800">{product.ram}</p>
                      </div>
                    )}
                    {product.screenSize && (
                      <div className="bg-gray-50 rounded-lg p-2.5">
                        <p className="text-xs text-gray-400">الشاشة</p>
                        <p className="text-sm font-semibold text-gray-800">{product.screenSize}</p>
                      </div>
                    )}
                    {product.battery && (
                      <div className="bg-gray-50 rounded-lg p-2.5">
                        <p className="text-xs text-gray-400">البطارية</p>
                        <p className="text-sm font-semibold text-gray-800">{product.battery}</p>
                      </div>
                    )}
                  </div>

                  {/* Quantity & Actions */}
                  <div className="flex items-center gap-3 mb-4">
                    <QuantitySelector value={quantity} onChange={setQuantity} max={product.stockCount} />
                    <span className="text-sm text-gray-500">
                      {product.inStock ? `${product.stockCount} متوفر` : 'غير متوفر'}
                    </span>
                  </div>

                  <div className="flex gap-3">
                    <Button
                      onClick={handleAddToCart}
                      disabled={!product.inStock}
                      fullWidth
                      leftIcon={<ShoppingCart className="w-5 h-5" />}
                    >
                      إضافة للسلة
                    </Button>
                    <Button
                      onClick={() => toggleWishlist(product)}
                      variant="outline"
                      className="w-12 h-12 p-0"
                    >
                      <Heart
                        className={`w-5 h-5 ${
                          isInWishlist(product.id) ? 'fill-red-500 text-red-500' : ''
                        }`}
                      />
                    </Button>
                  </div>

                  <Link
                    href={`/products/${product.slug}`}
                    onClick={onClose}
                    className="inline-flex items-center gap-1 text-sm text-primary-600 hover:text-primary-700 mt-4 font-medium"
                  >
                    عرض التفاصيل الكاملة
                    <ChevronLeft className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
