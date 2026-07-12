import { Package, Search, Heart, ShoppingCart } from 'lucide-react';
import { cn } from '@/lib/utils';
import Button from './Button';

interface EmptyStateProps {
  type?: 'products' | 'search' | 'wishlist' | 'cart' | 'orders';
  title?: string;
  description?: string;
  actionLabel?: string;
  onAction?: () => void;
  className?: string;
}

const icons = {
  products: Package,
  search: Search,
  wishlist: Heart,
  cart: ShoppingCart,
  orders: Package,
};

const defaultMessages = {
  products: {
    title: 'لا توجد منتجات',
    description: 'لم يتم العثور على أي منتجات في الوقت الحالي',
  },
  search: {
    title: 'لا توجد نتائج',
    description: 'جرب البحث بكلمات مختلفة أو تصفح الفئات',
  },
  wishlist: {
    title: 'قائمة الأمنيات فارغة',
    description: 'أضف منتجاتك المفضلة إلى قائمة الأمنيات',
  },
  cart: {
    title: 'سلة التسوق فارغة',
    description: 'أضف منتجات إلى سلة التسوق للمتابعة',
  },
  orders: {
    title: 'لا توجد طلبات',
    description: 'لم تقم بأي طلبات بعد',
  },
};

export default function EmptyState({
  type = 'products',
  title,
  description,
  actionLabel,
  onAction,
  className,
}: EmptyStateProps) {
  const Icon = icons[type];
  const defaults = defaultMessages[type];

  return (
    <div className={cn('flex flex-col items-center justify-center py-16 px-4 text-center', className)}>
      <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center mb-4">
        <Icon className="w-10 h-10 text-gray-400" />
      </div>
      <h3 className="text-xl font-bold text-gray-800 mb-2">
        {title || defaults.title}
      </h3>
      <p className="text-gray-500 max-w-md mb-6">
        {description || defaults.description}
      </p>
      {actionLabel && onAction && (
        <Button onClick={onAction} variant="primary">
          {actionLabel}
        </Button>
      )}
    </div>
  );
}
