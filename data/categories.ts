import { Category } from '@/types';

export const categories: Category[] = [
  {
    id: 'c001',
    name: 'آيفون',
    slug: 'iphone',
    description: 'أحدث هواتف Apple iPhone بجميع الموديلات والألوان',
    image: 'https://images.unsplash.com/photo-1696446701796-da61225697cc?w=400&h=300&fit=crop',
    icon: 'Smartphone',
    productCount: 6,
    parentId: null,
    isActive: true,
    sortOrder: 1,
  },
  {
    id: 'c002',
    name: 'سامسونج',
    slug: 'samsung',
    description: 'هواتف Samsung Galaxy بجميع الفئات من الرائد إلى الاقتصادي',
    image: 'https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=400&h=300&fit=crop',
    icon: 'Smartphone',
    productCount: 8,
    parentId: null,
    isActive: true,
    sortOrder: 2,
  },
  {
    id: 'c003',
    name: 'شاومي',
    slug: 'xiaomi',
    description: 'هواتف Xiaomi و Redmi و Poco بأسعار تنافسية وأداء ممتاز',
    image: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=400&h=300&fit=crop',
    icon: 'Smartphone',
    productCount: 4,
    parentId: null,
    isActive: true,
    sortOrder: 3,
  },
  {
    id: 'c004',
    name: 'جوجل',
    slug: 'google',
    description: 'هواتف Google Pixel مع أحدث ميزات الذكاء الاصطناعي',
    image: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=400&h=300&fit=crop',
    icon: 'Smartphone',
    productCount: 2,
    parentId: null,
    isActive: true,
    sortOrder: 4,
  },
  {
    id: 'c005',
    name: 'ون بلس',
    slug: 'oneplus',
    description: 'هواتف OnePlus بأداء سريع وتصميم أنيق',
    image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&h=300&fit=crop',
    icon: 'Smartphone',
    productCount: 2,
    parentId: null,
    isActive: true,
    sortOrder: 5,
  },
  {
    id: 'c006',
    name: 'أخرى',
    slug: 'others',
    description: 'هواتف من علامات تجارية أخرى مثل Nothing و Realme وغيرها',
    image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&h=300&fit=crop',
    icon: 'Smartphone',
    productCount: 2,
    parentId: null,
    isActive: true,
    sortOrder: 6,
  },
];

export function getCategoryById(id: string): Category | undefined {
  return categories.find((c) => c.id === id);
}

export function getCategoryBySlug(slug: string): Category | undefined {
  return categories.find((c) => c.slug === slug);
}

export function getActiveCategories(): Category[] {
  return categories.filter((c) => c.isActive).sort((a, b) => a.sortOrder - b.sortOrder);
}
