'use client';

import { TrendingUp, DollarSign, Package, Users } from 'lucide-react';
import { StatCard } from '@/components/admin';
import { products } from '@/data/products';
import { formatPrice } from '@/lib/utils';

export default function AnalyticsPage() {
  const totalRevenue = products.reduce((sum, p) => sum + p.price * p.soldCount, 0);
  const totalSold = products.reduce((sum, p) => sum + p.soldCount, 0);
  const avgPrice = Math.round(products.reduce((sum, p) => sum + p.price, 0) / products.length);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 mb-1">الإحصائيات</h1>
        <p className="text-gray-500 text-sm">تحليل أداء المتجر</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="إجمالي المبيعات" value={formatPrice(totalRevenue)} icon={DollarSign} iconColor="text-green-600" iconBg="bg-green-50" />
        <StatCard title="المنتجات المباعة" value={totalSold} icon={Package} iconColor="text-blue-600" iconBg="bg-blue-50" />
        <StatCard title="متوسط السعر" value={formatPrice(avgPrice)} icon={TrendingUp} iconColor="text-amber-600" iconBg="bg-amber-50" />
        <StatCard title="إجمالي المنتجات" value={products.length} icon={Users} iconColor="text-purple-600" iconBg="bg-purple-50" />
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 p-6">
        <h2 className="text-lg font-bold text-gray-900 mb-4">أكثر المنتجات مبيعاً</h2>
        <div className="space-y-3">
          {[...products].sort((a, b) => b.soldCount - a.soldCount).slice(0, 10).map((p, i) => (
            <div key={p.id} className="flex items-center gap-4 p-3 bg-gray-50 rounded-xl">
              <span className="w-8 h-8 rounded-lg bg-primary-100 text-primary-600 flex items-center justify-center font-bold text-sm">{i + 1}</span>
              <div className="flex-1"><p className="font-semibold text-gray-800">{p.name}</p><p className="text-xs text-gray-400">{p.brand}</p></div>
              <div className="text-left"><p className="font-bold text-gray-800">{p.soldCount} مبيع</p><p className="text-xs text-gray-400">{formatPrice(p.price)}</p></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
