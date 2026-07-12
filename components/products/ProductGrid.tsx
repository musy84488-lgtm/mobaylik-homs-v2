import { Product } from '@/types';
import ProductCard from './ProductCard';
import { EmptyState } from '@/components/ui';

interface ProductGridProps {
  products: Product[];
  emptyMessage?: string;
}

export default function ProductGrid({ products, emptyMessage }: ProductGridProps) {
  if (products.length === 0) {
    return (
      <EmptyState
        type="products"
        title={emptyMessage || 'لا توجد منتجات'}
        description="جرب تغيير معايير البحث أو تصفح الفئات الأخرى"
      />
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 lg:gap-6">
      {products.map((product, index) => (
        <ProductCard key={product.id} product={product} index={index} />
      ))}
    </div>
  );
}
