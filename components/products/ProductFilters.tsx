'use client';

import { useState } from 'react';
import { ChevronDown, X, SlidersHorizontal } from 'lucide-react';
import { cn } from '@/lib/utils';
import { categories, getAllBrands, getAllStorageOptions, getAllRamOptions } from '@/data';
import { FilterState, PriceRange, SortOption } from '@/types';

interface ProductFiltersProps {
  filters: FilterState;
  onChange: (filters: FilterState) => void;
  totalProducts: number;
}

const priceRanges: { value: PriceRange; label: string }[] = [
  { value: 'all', label: 'الكل' },
  { value: 'under-100k', label: 'أقل من 100 ألف' },
  { value: '100k-300k', label: '100 - 300 ألف' },
  { value: '300k-500k', label: '300 - 500 ألف' },
  { value: '500k-1m', label: '500 ألف - 1 مليون' },
  { value: 'above-1m', label: 'أكثر من 1 مليون' },
];

const sortOptions: { value: SortOption; label: string }[] = [
  { value: 'newest', label: 'الأحدث' },
  { value: 'price-asc', label: 'السعر: من الأقل' },
  { value: 'price-desc', label: 'السعر: من الأعلى' },
  { value: 'name-asc', label: 'الاسم: أ-ي' },
  { value: 'name-desc', label: 'الاسم: ي-أ' },
  { value: 'rating', label: 'الأعلى تقييماً' },
  { value: 'bestseller', label: 'الأكثر مبيعاً' },
];

export default function ProductFilters({ filters, onChange, totalProducts }: ProductFiltersProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [expandedSections, setExpandedSections] = useState<string[]>(['categories', 'price']);

  const brands = getAllBrands();
  const storageOptions = getAllStorageOptions();
  const ramOptions = getAllRamOptions();

  const toggleSection = (section: string) => {
    setExpandedSections((prev) =>
      prev.includes(section) ? prev.filter((s) => s !== section) : [...prev, section]
    );
  };

  const updateFilter = (key: keyof FilterState, value: any) => {
    onChange({ ...filters, [key]: value });
  };

  const toggleArrayFilter = (key: 'categories' | 'brands' | 'storage' | 'ram', value: string) => {
    const current = filters[key];
    const updated = current.includes(value)
      ? current.filter((v) => v !== value)
      : [...current, value];
    updateFilter(key, updated);
  };

  const clearFilters = () => {
    onChange({
      categories: [],
      brands: [],
      priceRange: 'all',
      storage: [],
      ram: [],
      inStock: null,
      sort: 'newest',
      search: '',
    });
  };

  const hasActiveFilters =
    filters.categories.length > 0 ||
    filters.brands.length > 0 ||
    filters.priceRange !== 'all' ||
    filters.storage.length > 0 ||
    filters.ram.length > 0 ||
    filters.inStock !== null;

  const FilterSection = ({
    title,
    sectionKey,
    children,
  }: {
    title: string;
    sectionKey: string;
    children: React.ReactNode;
  }) => (
    <div className="border-b border-gray-100 last:border-0">
      <button
        onClick={() => toggleSection(sectionKey)}
        className="w-full flex items-center justify-between py-3 text-sm font-semibold text-gray-800"
      >
        {title}
        <ChevronDown
          className={cn(
            'w-4 h-4 text-gray-400 transition-transform',
            expandedSections.includes(sectionKey) && 'rotate-180'
          )}
        />
      </button>
      {expandedSections.includes(sectionKey) && (
        <div className="pb-3 space-y-1.5">{children}</div>
      )}
    </div>
  );

  const CheckboxItem = ({
    label,
    checked,
    onChange,
    count,
  }: {
    label: string;
    checked: boolean;
    onChange: () => void;
    count?: number;
  }) => (
    <label className="flex items-center gap-2 cursor-pointer group">
      <div
        className={cn(
          'w-4 h-4 rounded border-2 flex items-center justify-center transition-colors',
          checked
            ? 'bg-primary-600 border-primary-600'
            : 'border-gray-300 group-hover:border-primary-400'
        )}
      >
        {checked && (
          <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        )}
      </div>
      <input type="checkbox" checked={checked} onChange={onChange} className="hidden" />
      <span className="text-sm text-gray-600 group-hover:text-gray-800 transition-colors">{label}</span>
      {count !== undefined && <span className="text-xs text-gray-400 mr-auto">({count})</span>}
    </label>
  );

  return (
    <div className="lg:sticky lg:top-24">
      {/* Mobile Toggle */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="lg:hidden w-full flex items-center justify-between px-4 py-3 bg-white border border-gray-200
          rounded-xl text-sm font-semibold text-gray-800"
      >
        <span className="flex items-center gap-2">
          <SlidersHorizontal className="w-4 h-4" />
          الفلاتر
          {hasActiveFilters && (
            <span className="w-5 h-5 bg-primary-600 text-white text-xs rounded-full flex items-center justify-center">
              !
            </span>
          )}
        </span>
        <span className="text-gray-400 text-xs">{totalProducts} منتج</span>
      </button>

      {/* Filters Panel */}
      <div
        className={cn(
          'bg-white border border-gray-100 rounded-2xl overflow-hidden',
          'lg:block',
          isOpen ? 'block mt-3' : 'hidden'
        )}
      >
        <div className="p-4">
          {/* Header */}
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-bold text-gray-900">تصفية المنتجات</h2>
            {hasActiveFilters && (
              <button
                onClick={clearFilters}
                className="text-xs text-red-500 hover:text-red-600 flex items-center gap-1 transition-colors"
              >
                <X className="w-3 h-3" />
                إعادة تعيين
              </button>
            )}
          </div>

          {/* Sort */}
          <div className="mb-4">
            <label className="text-xs font-semibold text-gray-500 uppercase mb-2 block">الترتيب</label>
            <select
              value={filters.sort}
              onChange={(e) => updateFilter('sort', e.target.value as SortOption)}
              className="w-full h-10 px-3 bg-gray-50 border border-gray-200 rounded-lg text-sm
                focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              {sortOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>
          </div>

          {/* Categories */}
          <FilterSection title="الفئات" sectionKey="categories">
            {categories.map((cat) => (
              <CheckboxItem
                key={cat.id}
                label={cat.name}
                checked={filters.categories.includes(cat.id)}
                onChange={() => toggleArrayFilter('categories', cat.id)}
                count={cat.productCount}
              />
            ))}
          </FilterSection>

          {/* Price Range */}
          <FilterSection title="نطاق السعر" sectionKey="price">
            {priceRanges.map((range) => (
              <label key={range.value} className="flex items-center gap-2 cursor-pointer group">
                <div
                  className={cn(
                    'w-4 h-4 rounded-full border-2 flex items-center justify-center transition-colors',
                    filters.priceRange === range.value
                      ? 'border-primary-600'
                      : 'border-gray-300 group-hover:border-primary-400'
                  )}
                >
                  {filters.priceRange === range.value && (
                    <div className="w-2 h-2 rounded-full bg-primary-600" />
                  )}
                </div>
                <input
                  type="radio"
                  name="priceRange"
                  value={range.value}
                  checked={filters.priceRange === range.value}
                  onChange={() => updateFilter('priceRange', range.value)}
                  className="hidden"
                />
                <span className="text-sm text-gray-600">{range.label}</span>
              </label>
            ))}
          </FilterSection>

          {/* Brands */}
          <FilterSection title="الماركات" sectionKey="brands">
            {brands.map((brand) => (
              <CheckboxItem
                key={brand}
                label={brand}
                checked={filters.brands.includes(brand)}
                onChange={() => toggleArrayFilter('brands', brand)}
              />
            ))}
          </FilterSection>

          {/* Storage */}
          <FilterSection title="الذاكرة" sectionKey="storage">
            {storageOptions.map((storage) => (
              <CheckboxItem
                key={storage}
                label={storage}
                checked={filters.storage.includes(storage!)}
                onChange={() => toggleArrayFilter('storage', storage!)}
              />
            ))}
          </FilterSection>

          {/* RAM */}
          <FilterSection title="الرام" sectionKey="ram">
            {ramOptions.map((ram) => (
              <CheckboxItem
                key={ram}
                label={ram}
                checked={filters.ram.includes(ram!)}
                onChange={() => toggleArrayFilter('ram', ram!)}
              />
            ))}
          </FilterSection>

          {/* Stock */}
          <FilterSection title="توفر المنتج" sectionKey="stock">
            <label className="flex items-center gap-2 cursor-pointer">
              <div
                className={cn(
                  'w-10 h-5 rounded-full transition-colors relative',
                  filters.inStock === true ? 'bg-primary-600' : 'bg-gray-300'
                )}
              >
                <div
                  className={cn(
                    'absolute top-0.5 w-4 h-4 rounded-full bg-white shadow transition-transform',
                    filters.inStock === true ? 'left-5' : 'left-0.5'
                  )}
                />
              </div>
              <input
                type="checkbox"
                checked={filters.inStock === true}
                onChange={(e) => updateFilter('inStock', e.target.checked ? true : null)}
                className="hidden"
              />
              <span className="text-sm text-gray-600">متاح فقط</span>
            </label>
          </FilterSection>
        </div>
      </div>
    </div>
  );
}
