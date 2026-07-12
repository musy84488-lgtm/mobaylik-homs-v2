export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  originalPrice?: number;
  discount?: number;
  image: string;
  images?: string[];
  categoryId: string;
  categoryName?: string;
  brand: string;
  model: string;
  storage?: string;
  ram?: string;
  color?: string;
  colors?: string[];
  screenSize?: string;
  battery?: string;
  processor?: string;
  camera?: string;
  os?: string;
  sim?: string;
  warranty?: string;
  inStock: boolean;
  stockCount: number;
  rating: number;
  reviewCount: number;
  soldCount: number;
  isNew?: boolean;
  isFeatured?: boolean;
  isBestSeller?: boolean;
  tags?: string[];
  specifications?: Record<string, string>;
  createdAt?: string;
  updatedAt?: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
  image: string;
  icon?: string;
  productCount?: number;
  parentId?: string | null;
  isActive: boolean;
  sortOrder: number;
  createdAt?: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedColor?: string;
  selectedStorage?: string;
}

export interface WishlistItem {
  product: Product;
  addedAt: string;
}

export interface CompareItem {
  product: Product;
  addedAt: string;
}

export interface OrderItem {
  productId: string;
  productName: string;
  productImage: string;
  price: number;
  quantity: number;
  selectedColor?: string;
  selectedStorage?: string;
}

export interface Order {
  id: string;
  customerName: string;
  customerPhone: string;
  customerEmail?: string;
  customerAddress: string;
  city: string;
  notes?: string;
  items: OrderItem[];
  subtotal: number;
  shippingCost: number;
  total: number;
  status: 'pending' | 'confirmed' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  paymentMethod: 'cash' | 'transfer' | 'card';
  whatsappMessage?: string;
  createdAt: string;
  updatedAt?: string;
}

export interface Review {
  id: string;
  productId: string;
  customerName: string;
  rating: number;
  comment: string;
  createdAt: string;
}

export interface Banner {
  id: string;
  title: string;
  subtitle?: string;
  image: string;
  link?: string;
  position: 'hero' | 'promo' | 'category';
  isActive: boolean;
  sortOrder: number;
}

export interface StoreSettings {
  name: string;
  phone: string;
  whatsapp: string;
  email?: string;
  address?: string;
  logo?: string;
  socialLinks?: {
    facebook?: string;
    instagram?: string;
    telegram?: string;
    youtube?: string;
  };
}

export type SortOption = 'newest' | 'price-asc' | 'price-desc' | 'name-asc' | 'name-desc' | 'rating' | 'bestseller';

export type PriceRange = 'all' | 'under-100k' | '100k-300k' | '300k-500k' | '500k-1m' | 'above-1m';

export interface FilterState {
  categories: string[];
  brands: string[];
  priceRange: PriceRange;
  storage: string[];
  ram: string[];
  inStock: boolean | null;
  sort: SortOption;
  search: string;
}
