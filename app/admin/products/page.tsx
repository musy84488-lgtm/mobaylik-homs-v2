'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Plus } from 'lucide-react';
import { products } from '@/data/products';
import { categories } from '@/data/categories';
import { formatPrice } from '@/lib/utils';
import { DataTable, ConfirmDialog } from '@/components/admin';
import { Button } from '@/components/ui';

export default function AdminProductsPage() {
  const [productList, setProductList] = useState(products);
  const [deleteTarget, setDeleteTarget] = useState<any>(null);

  const handleDelete = (product: any) => {
    setProductList((prev) => prev.filter((p) => p.id !== product.id));
    setDeleteTarget(null);
  };

  const getCategoryName = (categoryId: string) => {
    return categories.find((c) => c.id === categoryId)?.name || categoryId;
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 mb-1">المنتجات</h1>
          <p className="text-gray-500 text-sm">إدارة منتجات المتجر</p>
        </div>
        <Link href="/admin/products/new">
          <Button leftIcon={<Plus className="w-4 h-4" />}>
            منتج جديد
          </Button>
        </Link>
      </div>

      <DataTable
        columns={[
          {
            key: 'image',
            label: 'الصورة',
            render: (v) => (
              <div className="w-12 h-12 rounded-lg bg-gray-100 overflow-hidden">
                <img src={v} alt="" className="w-full h-full object-cover" />
              </div>
            ),
          },
          { key: 'name', label: 'الاسم' },
          { key: 'brand', label: 'الماركة' },
          {
            key: 'categoryId',
            label: 'الفئة',
            render: (v) => getCategoryName(v),
          },
          {
            key: 'price',
            label: 'السعر',
            render: (v, row) => (
              <div>
                <span className="font-semibold">{formatPrice(v)}</span>
                {row.originalPrice && row.originalPrice > v && (
                  <span className="text-xs text-gray-400 line-through block">{formatPrice(row.originalPrice)}</span>
                )}
              </div>
            ),
          },
          {
            key: 'stockCount',
            label: 'المخزن',
            render: (v, row) => (
              <span className={`font-semibold ${v < 10 ? 'text-red-600' : v < 20 ? 'text-amber-600' : 'text-green-600'}`}>
                {v}
              </span>
            ),
          },
          {
            key: 'inStock',
            label: 'الحالة',
            render: (v) => (
              <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                v ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
              }`}>
                {v ? 'متوفر' : 'نفد'}
              </span>
            ),
          },
          {
            key: 'isFeatured',
            label: 'مميز',
            render: (v) => v ? (
              <span className="px-2 py-1 rounded-full text-xs font-medium bg-primary-100 text-primary-700">نعم</span>
            ) : (
              <span className="text-gray-400 text-xs">—</span>
            ),
          },
        ]}
        data={productList}
        onEdit={(row) => window.location.href = `/admin/products/${row.slug}/edit`}
        onDelete={(row) => setDeleteTarget(row)}
        onView={(row) => window.open(`/products/${row.slug}`, '_blank')}
        itemsPerPage={10}
      />

      <ConfirmDialog
        isOpen={!!deleteTarget}
        title="حذف المنتج"
        message={`هل أنت متأكد من حذف المنتج "${deleteTarget?.name}"؟ لا يمكن التراجع عن هذا الإجراء.`}
        onConfirm={() => deleteTarget && handleDelete(deleteTarget)}
        onCancel={() => setDeleteTarget(null)}
      />
    </div>
  );
}
