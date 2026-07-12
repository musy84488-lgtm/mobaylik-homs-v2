'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { Search, Package } from 'lucide-react';
import { searchProducts } from '@/data/products';
import { ProductGrid } from '@/components/products';
import { motion } from 'framer-motion';

function SearchContent() {
  const searchParams = useSearchParams();
  const query = searchParams.get('q') || '';
  const [results, setResults] = useState(searchProducts(query));

  useEffect(() => {
    setResults(searchProducts(query));
  }, [query]);

  return (
    <div className="container mx-auto px-4 py-8">
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-xl bg-primary-100 flex items-center justify-center">
            <Search className="w-5 h-5 text-primary-600" />
          </div>
          <div>
            <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">نتائج البحث</h1>
            <p className="text-gray-500 text-sm">
              {results.length} نتيجة لـ "{query}"
            </p>
          </div>
        </div>
      </motion.div>

      <ProductGrid
        products={results}
        emptyMessage={`لا توجد نتائج لـ "${query}". جرب كلمات بحث أخرى.`}
      />
    </div>
  );
}

export default function SearchPage() {
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
      <SearchContent />
    </Suspense>
  );
}
