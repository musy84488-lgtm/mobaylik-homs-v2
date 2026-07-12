import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Grid3X3, ChevronLeft, Smartphone } from 'lucide-react';
import { categories } from '@/data/categories';
import { getProductsByCategory } from '@/data/products';

export default function CategoriesPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center gap-3 mb-8">
        <div className="w-10 h-10 rounded-xl bg-primary-100 flex items-center justify-center">
          <Grid3X3 className="w-5 h-5 text-primary-600" />
        </div>
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">جميع الفئات</h1>
          <p className="text-gray-500 text-sm">تصفح المنتجات حسب الماركة</p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((category, index) => {
          const categoryProducts = getProductsByCategory(category.id);
          return (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Link
                href={`/categories/${category.slug}`}
                className="group block bg-white rounded-2xl border border-gray-100 overflow-hidden
                  hover:shadow-card hover:border-gray-200 transition-all duration-300"
              >
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={category.image}
                    alt={category.name}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="flex items-center gap-2 mb-1">
                      <Smartphone className="w-5 h-5 text-white" />
                      <h2 className="text-xl font-bold text-white">{category.name}</h2>
                    </div>
                    <p className="text-white/70 text-sm">{category.description}</p>
                  </div>
                </div>
                <div className="p-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">{categoryProducts.length} منتج</span>
                    <span className="flex items-center gap-1 text-sm font-semibold text-primary-600 group-hover:gap-2 transition-all">
                      تصفح
                      <ChevronLeft className="w-4 h-4" />
                    </span>
                  </div>
                </div>
              </Link>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
