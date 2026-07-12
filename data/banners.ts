import { Banner } from '@/types';

export const banners: Banner[] = [
  {
    id: 'b001',
    title: 'أحدث الهواتف الذكية',
    subtitle: 'اكتشف تشكيلتنا الواسعة من أحدث الهواتف بأفضل الأسعار',
    image: 'https://images.unsplash.com/photo-1556656793-02715d8dd6f8?w=1200&h=500&fit=crop',
    link: '/products',
    position: 'hero',
    isActive: true,
    sortOrder: 1,
  },
  {
    id: 'b002',
    title: 'iPhone 15 Pro Max',
    subtitle: 'تصميم تيتانيوم فاخر - متوفر الآن',
    image: 'https://images.unsplash.com/photo-1696446701796-da61225697cc?w=1200&h=500&fit=crop',
    link: '/products/iphone-15-pro-max',
    position: 'hero',
    isActive: true,
    sortOrder: 2,
  },
  {
    id: 'b003',
    title: 'Samsung Galaxy S24 Ultra',
    subtitle: 'مع قلم S Pen وكاميرا 200MP',
    image: 'https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=1200&h=500&fit=crop',
    link: '/products/samsung-galaxy-s24-ultra',
    position: 'hero',
    isActive: true,
    sortOrder: 3,
  },
  {
    id: 'b004',
    title: 'تخفيضات خاصة',
    subtitle: 'خصومات تصل إلى 20% على الهواتف المختارة',
    image: 'https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?w=800&h=400&fit=crop',
    link: '/products?discount=true',
    position: 'promo',
    isActive: true,
    sortOrder: 1,
  },
  {
    id: 'b005',
    title: 'هواتف اقتصادية',
    subtitle: 'أفضل الهواتف بأسعار مناسبة',
    image: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=800&h=400&fit=crop',
    link: '/products?price=under-1m',
    position: 'promo',
    isActive: true,
    sortOrder: 2,
  },
];

export function getHeroBanners(): Banner[] {
  return banners.filter((b) => b.position === 'hero' && b.isActive).sort((a, b) => a.sortOrder - b.sortOrder);
}

export function getPromoBanners(): Banner[] {
  return banners.filter((b) => b.position === 'promo' && b.isActive).sort((a, b) => a.sortOrder - b.sortOrder);
}
