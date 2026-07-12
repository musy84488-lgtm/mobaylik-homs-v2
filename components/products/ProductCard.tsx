'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Heart, Eye, ShoppingCart, Check } from 'lucide-react';
import { motion } from 'framer-motion';
import { Product } from '@/types';
import { formatPrice, getDiscountPercentage } from '@/lib/utils';
import { useCart } from '@/lib/hooks';
import { useWishlist } from '@/lib/hooks';
import { useCompare } from '@/lib/hooks';
import { StarRating, Badge, Button } from '@/components/ui';
import { useState } from 'react';

interface ProductCardProps {
  product: Product;
  index?: number;
}

export default function ProductCard({ product, index = 0 }: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [showQuickView, setShowQuickView] = useState(false);

  const addItem = useCart((state) => state.addItem);
  const toggleWishlist = useWishlist((state) => state.toggleItem);
  const isInWishlist = useWishlist((state) => state.isInWishlist);
  const toggleCompare = useCompare((state) => state.toggleItem);
  const isInCompare = useCompare((state) => state.isInCompare);

  const discount = getDiscountPercentage(product.originalPrice || 0, product.price);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(product, 1);
  };

  const handleToggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product);
  };

  const handleToggleCompare = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleCompare(product);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative bg-white rounded-2xl border border-gray-100 overflow-hidden
        hover:shadow-card hover:border-gray-200 transition-all duration-300"
    >
      {/* Badges */}
      <div className="absolute top-3 left-3 z-10 flex flex-col gap-1.5">
        {product.isNew && (
          <Badge variant="success" size="sm">جديد</Badge>
        )}
        {discount > 0 && (
          <Badge variant="danger" size="sm">-{discount}%</Badge>
        )}
        {!product.inStock && (
          <Badge variant="dark" size="sm">غير متوفر</Badge>
        )}
      </div>

      {/* Wishlist Button */}
      <button
        onClick={handleToggleWishlist}
        className="absolute top-3 right-3 z-10 w-9 h-9 rounded-full bg-white/90 backdrop-blur-sm
          flex items-center justify-center shadow-sm hover:bg-white transition-colors"
      >
        <Heart
          className={`w-4 h-4 transition-colors ${
            isInWishlist(product.id)
              ? 'fill-red-500 text-red-500'
              : 'text-gray-400 hover:text-red-500'
          }`}
        />
      </button>

      {/* Image */}
      <Link href={`/products/${product.slug}`} className="block">
        <div className="relative aspect-square bg-gray-50 overflow-hidden">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-500"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          />

          {/* Quick Actions Overlay */}
          <div
            className={`absolute inset-0 bg-black/20 flex items-center justify-center gap-2
              transition-opacity duration-300 ${
                isHovered ? 'opacity-100' : 'opacity-0'
              }`}
          >
            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setShowQuickView(true);
              }}
              className="w-10 h-10 rounded-full bg-white text-gray-700 flex items-center justify-center
                hover:bg-primary-600 hover:text-white transition-colors shadow-lg"
              title="نظرة سريعة"
            >
              <Eye className="w-4 h-4" />
            </button>
            <button
              onClick={handleToggleCompare}
              className={`w-10 h-10 rounded-full flex items-center justify-center shadow-lg transition-colors ${
                isInCompare(product.id)
                  ? 'bg-primary-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-primary-600 hover:text-white'
              }`}
              title="مقارنة"
            >
              <Check className="w-4 h-4" />
            </button>
          </div>
        </div>
      </Link>

      {/* Content */}
      <div className="p-4">
        <Link href={`/products/${product.slug}`}>
          <p className="text-xs text-primary-600 font-medium mb-1">{product.brand}</p>
          <h3 className="text-sm font-bold text-gray-900 mb-1 line-clamp-1 hover:text-primary-600 transition-colors">
            {product.name}
          </h3>
          <p className="text-xs text-gray-400 mb-2">{product.storage} · {product.ram}</p>
        </Link>

        <div className="flex items-center gap-1 mb-3">
          <StarRating rating={product.rating} size="sm" />
          <span className="text-xs text-gray-400">({product.reviewCount})</span>
        </div>

        <div className="flex items-end justify-between">
          <div>
            <p className="text-lg font-bold text-primary-600">{formatPrice(product.price)}</p>
            {product.originalPrice && product.originalPrice > product.price && (
              <p className="text-xs text-gray-400 line-through">{formatPrice(product.originalPrice)}</p>
            )}
          </div>
          <Button
            onClick={handleAddToCart}
            disabled={!product.inStock}
            size="sm"
            className="w-10 h-10 p-0 rounded-xl"
            leftIcon={<ShoppingCart className="w-4 h-4" />}
          />
        </div>
      </div>
    </motion.div>
  );
}
