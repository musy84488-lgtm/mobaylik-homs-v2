'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Search,
  ShoppingCart,
  Heart,
  Menu,
  X,
  Phone,
  User,
  ChevronDown,
  Smartphone,
} from 'lucide-react';
import { useCart } from '@/lib/hooks';
import { useWishlist } from '@/lib/hooks';
import { useCompare } from '@/lib/hooks';
import { cn } from '@/lib/utils';
import { categories } from '@/data/categories';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const pathname = usePathname();

  const cartItems = useCart((state) => state.items);
  const wishlistItems = useWishlist((state) => state.items);
  const compareItems = useCompare((state) => state.items);

  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const wishlistCount = wishlistItems.length;
  const compareCount = compareItems.length;

  const navLinks = [
    { href: '/', label: 'الرئيسية' },
    { href: '/products', label: 'المنتجات' },
    { href: '/categories', label: 'الفئات' },
    { href: '/about', label: 'من نحن' },
    { href: '/contact', label: 'اتصل بنا' },
  ];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `/search?q=${encodeURIComponent(searchQuery)}`;
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-100 shadow-sm">
      {/* Top Bar */}
      <div className="bg-primary-600 text-white text-sm">
        <div className="container mx-auto px-4 py-1.5 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <a
              href="tel:+963967768408"
              className="flex items-center gap-1.5 hover:text-primary-100 transition-colors"
            >
              <Phone className="w-3.5 h-3.5" />
              <span dir="ltr">+963 967 768 408</span>
            </a>
          </div>
          <p className="hidden sm:block text-xs opacity-90">
            شحن مجاني للطلبات فوق مليون ل.س | توصيل سريع في حمص
          </p>
        </div>
      </div>

      {/* Main Header */}
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 lg:h-20 gap-4">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 shrink-0">
            <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-primary-700 rounded-xl flex items-center justify-center shadow-lg shadow-primary-500/30">
              <Smartphone className="w-5 h-5 text-white" />
            </div>
            <div className="hidden sm:block">
              <h1 className="text-xl font-bold text-gray-900 leading-tight">
                موبايلك <span className="text-primary-600">حمص</span>
              </h1>
              <p className="text-[10px] text-gray-400 -mt-0.5">أفضل الهواتف بأفضل الأسعار</p>
            </div>
          </Link>

          {/* Search Bar - Desktop */}
          <form
            onSubmit={handleSearch}
            className="hidden md:flex flex-1 max-w-xl mx-4"
          >
            <div className="relative w-full">
              <input
                type="text"
                placeholder="ابحث عن هاتف، ماركة، موديل..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full h-11 pr-4 pl-12 bg-gray-50 border border-gray-200 rounded-xl
                  focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent
                  text-sm placeholder:text-gray-400 transition-all"
              />
              <button
                type="submit"
                className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-primary-600 rounded-lg
                  flex items-center justify-center text-white hover:bg-primary-700 transition-colors"
              >
                <Search className="w-4 h-4" />
              </button>
            </div>
          </form>

          {/* Actions */}
          <div className="flex items-center gap-1.5 sm:gap-2">
            {/* Search Mobile */}
            <button
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="md:hidden w-10 h-10 flex items-center justify-center rounded-xl
                hover:bg-gray-100 transition-colors"
            >
              <Search className="w-5 h-5 text-gray-600" />
            </button>

            {/* Compare */}
            <Link
              href="/compare"
              className="relative w-10 h-10 hidden sm:flex items-center justify-center rounded-xl
                hover:bg-gray-100 transition-colors"
            >
              <User className="w-5 h-5 text-gray-600" />
              {compareCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-5 h-5 bg-accent-500 text-white text-[10px]
                  font-bold rounded-full flex items-center justify-center">
                  {compareCount}
                </span>
              )}
            </Link>

            {/* Wishlist */}
            <Link
              href="/wishlist"
              className="relative w-10 h-10 flex items-center justify-center rounded-xl
                hover:bg-gray-100 transition-colors"
            >
              <Heart className="w-5 h-5 text-gray-600" />
              {wishlistCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-5 h-5 bg-red-500 text-white text-[10px]
                  font-bold rounded-full flex items-center justify-center">
                  {wishlistCount}
                </span>
              )}
            </Link>

            {/* Cart */}
            <Link
              href="/cart"
              className="relative w-10 h-10 flex items-center justify-center rounded-xl
                hover:bg-gray-100 transition-colors"
            >
              <ShoppingCart className="w-5 h-5 text-gray-600" />
              {cartCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-5 h-5 bg-primary-600 text-white text-[10px]
                  font-bold rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link>

            {/* Mobile Menu */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden w-10 h-10 flex items-center justify-center rounded-xl
                hover:bg-gray-100 transition-colors"
            >
              {isMenuOpen ? (
                <X className="w-5 h-5 text-gray-600" />
              ) : (
                <Menu className="w-5 h-5 text-gray-600" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Search */}
        {isSearchOpen && (
          <form onSubmit={handleSearch} className="md:hidden pb-3">
            <div className="relative">
              <input
                type="text"
                placeholder="ابحث عن هاتف..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                autoFocus
                className="w-full h-11 pr-4 pl-12 bg-gray-50 border border-gray-200 rounded-xl
                  focus:outline-none focus:ring-2 focus:ring-primary-500 text-sm"
              />
              <button
                type="submit"
                className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-primary-600 rounded-lg
                  flex items-center justify-center text-white"
              >
                <Search className="w-4 h-4" />
              </button>
            </div>
          </form>
        )}
      </div>

      {/* Navigation - Desktop */}
      <nav className="hidden lg:block border-t border-gray-100">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-1 h-12">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  'px-4 py-2 rounded-lg text-sm font-medium transition-colors',
                  pathname === link.href
                    ? 'text-primary-600 bg-primary-50'
                    : 'text-gray-600 hover:text-primary-600 hover:bg-gray-50'
                )}
              >
                {link.label}
              </Link>
            ))}

            {/* Categories Dropdown */}
            <div className="relative group">
              <button className="flex items-center gap-1 px-4 py-2 rounded-lg text-sm font-medium
                text-gray-600 hover:text-primary-600 hover:bg-gray-50 transition-colors">
                الماركات
                <ChevronDown className="w-4 h-4" />
              </button>
              <div className="absolute top-full right-0 w-56 bg-white rounded-xl shadow-xl border border-gray-100
                opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200
                py-2 z-50">
                {categories.map((cat) => (
                  <Link
                    key={cat.id}
                    href={`/categories/${cat.slug}`}
                    className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-primary-50
                      hover:text-primary-600 transition-colors"
                  >
                    <span className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center text-xs">
                      {cat.productCount}
                    </span>
                    {cat.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="lg:hidden border-t border-gray-100 bg-white">
          <div className="container mx-auto px-4 py-3 space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsMenuOpen(false)}
                className={cn(
                  'block px-4 py-3 rounded-xl text-sm font-medium transition-colors',
                  pathname === link.href
                    ? 'text-primary-600 bg-primary-50'
                    : 'text-gray-600 hover:bg-gray-50'
                )}
              >
                {link.label}
              </Link>
            ))}
            <div className="pt-2 border-t border-gray-100 mt-2">
              <p className="px-4 py-2 text-xs font-semibold text-gray-400 uppercase">الماركات</p>
              {categories.map((cat) => (
                <Link
                  key={cat.id}
                  href={`/categories/${cat.slug}`}
                  onClick={() => setIsMenuOpen(false)}
                  className="block px-4 py-2.5 text-sm text-gray-600 hover:bg-gray-50 rounded-xl"
                >
                  {cat.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
