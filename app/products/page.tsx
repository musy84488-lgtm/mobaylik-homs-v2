'use client';

import { useState, useMemo, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { Package } from 'lucide-react';
import { products } from '@/data/products';
import { ProductGrid, ProductFilters } from '@/components/products';
import { FilterState, SortOption, PriceRange } from '@/types';
import { motion } from 'framer-motion';

function ProductsContent() {
  const searchParams = useSearchParams();

  const [filters, setFilters] = useState<FilterState>({
    categories: searchParams.get('category') ? [searchParams.get('category')!] : [],
    brands: searchParams.get('brand') ? [searchParams.get('brand')!] : [],
    priceRange: (searchParams.get('price') as PriceRange) || 'all',
    storage: [],
    ram: [],
    inStock: null,
    sort: (searchParams.get('sort') as SortOption) || 'newest',
    search: searchParams.get('q') || '',
  });

  const filteredProducts = useMemo(() => {
    let result = [...products];

    if (filters.search) {
      const query = filters.search.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(query) ||
          p.brand.toLowerCase().includes(query) ||
          p.description.toLowerCase().includes(query)
      );
    }

    if (filters.categories.length > 0) {
      result = result.filter((p) => filters.categories.includes(p.categoryId));
    }

    if (filters.brands.length > 0) {
      result = result.filter((p) => filters.brands.includes(p.brand));
    }

    if (filters.priceRange !== 'all') {
      result = result.filter((p) => {
        switch (filters.priceRange) {
          case 'under-100k': return p.price < 100000;
          case '100k-300k': return p.price >= 100000 && p.price < 300000;
          case '300k-500k': return p.price >= 300000 && p.price < 500000;
          case '500k-1m': return p.price >= 500000 && p.price < 1000000;
          case 'above-1m': return p.price >= 1000000;
          default: return true;
        }
      });
    }

    if (filters.storage.length > 0) {
      result = result.filter((p) => p.storage && filters.storage.includes(p.storage));
    }

    if (filters.ram.length > 0) {
      result = result.filter((p) => p.ram && filters.ram.includes(p.ram));
    }

    if (filters.inStock === true) {
      result = result.filter((p) => p.inStock);
    }

    result.sort((a, b) => {
      switch (filters.sort) {
        case 'price-asc': return a.price - b.price;
        case 'price-desc': return b.price - a.price;
        case 'name-asc': return a.name.localeCompare(b.name);
        case 'name-desc': return b.name.localeCompare(a.name);
        case 'rating': return b.rating - a.rating;
        case 'bestseller': return b.soldCount - a.soldCount;
        case 'newest': default: return (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0);
      }
    });

    return result;
  }, [filters]);

  return (
    <div className="container mx-auto px-4 py-8">
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-xl bg-primary-100 flex items-center justify-center">
            <Package className="w-5 h-5 text-primary-600" />
          </div>
          <div>
            <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">جميع المنتجات</h1>
            <p className="text-gray-500 text-sm">{filteredProducts.length} منتج متوفر</p>
          </div>
        </div>
      </motion.div>

      <div className="flex flex-col lg:flex-row gap-6">
        <aside className="lg:w-72 shrink-0">
          <ProductFilters filters={filters} onChange={setFilters} totalProducts={filteredProducts.length} />
        </aside>
        <div className="flex-1 min-w-0">
          <ProductGrid products={filteredProducts} emptyMessage="لا توجد منتجات تطابق معايير البحث" />
        </div>
      </div>
    </div>
  );
}

export default function ProductsPage() {
  return (
    <Suspense fallback={
      <div className="container mx-auto px-4 py-8">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-gray-200 rounded-lg w-48" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="bg-gray-200 rounded-2xl h-80" />
            ))}
          </div>
        </div>
      </div>
    }>
      <ProductsContent />
    </Suspense>
  );
}
