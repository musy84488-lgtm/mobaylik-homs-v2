'use client';

import { useMemo } from 'react';
import Link from 'next/link';
import {
  Package, ShoppingCart, TrendingUp, DollarSign,
  ArrowUpRight, ArrowDownRight
} from 'lucide-react';
import { StatCard, DataTable } from '@/components/admin';
import { products } from '@/data/products';
import { categories } from '@/data/categories';
import { formatPrice } from '@/lib/utils';
import { motion } from 'framer-motion';

export default function AdminDashboardPage() {
  const stats = useMemo(() => {
    const totalProducts = products.length;
    const totalCategories = categories.length;
    const totalValue = products.reduce((sum, p) => sum + p.price * p.stockCount, 0);
    const totalStock = products.reduce((sum, p) => sum + p.stockCount, 0);
    const lowStock = products.filter((p) => p.stockCount < 10).length;
    const outOfStock = products.filter((p) => !p.inStock).length;

    return { totalProducts, totalCategories, totalValue, totalStock, lowStock, outOfStock };
  }, []);

  const recentProducts = [...products].sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0)).slice(0, 5);

  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-2xl font-bold text-gray-900 mb-1">لوحة التحكم</h1>
        <p className="text-gray-500 text-sm">نظرة عامة على أداء المتجر</p>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="إجمالي المنتجات"
          value={stats.totalProducts}
          change="+3 هذا الشهر"
          changeType="positive"
          icon={Package}
          iconColor="text-blue-600"
          iconBg="bg-blue-50"
        />
        <StatCard
          title="إجمالي الفئات"
          value={stats.totalCategories}
          icon={TrendingUp}
          iconColor="text-green-600"
          iconBg="bg-green-50"
        />
        <StatCard
          title="قيمة المخزون"
          value={formatPrice(stats.totalValue)}
          icon={DollarSign}
          iconColor="text-amber-600"
          iconBg="bg-amber-50"
        />
        <StatCard
          title="الكمية في المخزن"
          value={stats.totalStock}
          change={`${stats.lowStock} منخفضة`}
          changeType="negative"
          icon={ShoppingCart}
          iconColor="text-purple-600"
          iconBg="bg-purple-50"
        />
      </div>

      {/* Alerts */}
      {(stats.lowStock > 0 || stats.outOfStock > 0) && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {stats.lowStock > 0 && (
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 flex items-center gap-3">
              <ArrowDownRight className="w-5 h-5 text-amber-600" />
              <div>
                <p className="text-sm font-semibold text-amber-800">{stats.lowStock} منتج كمية منخفضة</p>
                <p className="text-xs text-amber-600">أقل من 10 قطع في المخزن</p>
              </div>
            </div>
          )}
          {stats.outOfStock > 0 && (
            <div className="bg-red-50 border border-red-200 rounded-xl p-4 flex items-center gap-3">
              <ArrowUpRight className="w-5 h-5 text-red-600" />
              <div>
                <p className="text-sm font-semibold text-red-800">{stats.outOfStock} منتج نفد من المخزن</p>
                <p className="text-xs text-red-600">يرجى إعادة التزويد</p>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Quick Links */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Link href="/admin/products/new" className="bg-white rounded-xl border border-gray-100 p-5 hover:shadow-soft hover:border-gray-200 transition-all group">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 mb-1">إضافة منتج</p>
              <p className="text-lg font-bold text-gray-900 group-hover:text-primary-600 transition-colors">منتج جديد</p>
            </div>
            <Package className="w-8 h-8 text-primary-200 group-hover:text-primary-400 transition-colors" />
          </div>
        </Link>
        <Link href="/admin/categories/new" className="bg-white rounded-xl border border-gray-100 p-5 hover:shadow-soft hover:border-gray-200 transition-all group">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 mb-1">إضافة فئة</p>
              <p className="text-lg font-bold text-gray-900 group-hover:text-primary-600 transition-colors">فئة جديدة</p>
            </div>
            <TrendingUp className="w-8 h-8 text-primary-200 group-hover:text-primary-400 transition-colors" />
          </div>
        </Link>
        <Link href="/admin/orders" className="bg-white rounded-xl border border-gray-100 p-5 hover:shadow-soft hover:border-gray-200 transition-all group">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 mb-1">الطلبات</p>
              <p className="text-lg font-bold text-gray-900 group-hover:text-primary-600 transition-colors">عرض الطلبات</p>
            </div>
            <ShoppingCart className="w-8 h-8 text-primary-200 group-hover:text-primary-400 transition-colors" />
          </div>
        </Link>
      </div>

      {/* Recent Products */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-gray-900">أحدث المنتجات</h2>
          <Link href="/admin/products" className="text-sm text-primary-600 hover:text-primary-700 font-medium">
            عرض الكل
          </Link>
        </div>
        <DataTable
          columns={[
            { key: 'name', label: 'المنتج' },
            { key: 'brand', label: 'الماركة' },
            { key: 'price', label: 'السعر', render: (v) => formatPrice(v) },
            { key: 'stockCount', label: 'المخزن' },
            { key: 'inStock', label: 'الحالة', render: (v) => (
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${v ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                {v ? 'متوفر' : 'نفد'}
              </span>
            )},
          ]}
          data={recentProducts}
          onEdit={(row) => window.location.href = `/admin/products/${row.slug}/edit`}
          onView={(row) => window.open(`/products/${row.slug}`, '_blank')}
          itemsPerPage={5}
        />
      </div>
    </div>
  );
}
