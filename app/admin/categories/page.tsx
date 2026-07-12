'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Plus } from 'lucide-react';
import { categories } from '@/data/categories';
import { DataTable, ConfirmDialog } from '@/components/admin';
import { Button } from '@/components/ui';

export default function AdminCategoriesPage() {
  const [categoryList, setCategoryList] = useState(categories);
  const [deleteTarget, setDeleteTarget] = useState<any>(null);

  const handleDelete = (category: any) => {
    setCategoryList((prev) => prev.filter((c) => c.id !== category.id));
    setDeleteTarget(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 mb-1">الفئات</h1>
          <p className="text-gray-500 text-sm">إدارة فئات المنتجات</p>
        </div>
        <Link href="/admin/categories/new">
          <Button leftIcon={<Plus className="w-4 h-4" />}>فئة جديدة</Button>
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
          { key: 'slug', label: 'الرابط' },
          { key: 'description', label: 'الوصف', render: (v) => <span className="line-clamp-1 max-w-xs">{v}</span> },
          { key: 'productCount', label: 'المنتجات' },
          {
            key: 'isActive',
            label: 'الحالة',
            render: (v) => (
              <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${v ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}>
                {v ? 'نشط' : 'معطل'}
              </span>
            ),
          },
        ]}
        data={categoryList}
        onEdit={(row) => window.location.href = `/admin/categories/${row.slug}/edit`}
        onDelete={(row) => setDeleteTarget(row)}
        itemsPerPage={10}
      />

      <ConfirmDialog
        isOpen={!!deleteTarget}
        title="حذف الفئة"
        message={`هل أنت متأكد من حذف الفئة "${deleteTarget?.name}"؟`}
        onConfirm={() => deleteTarget && handleDelete(deleteTarget)}
        onCancel={() => setDeleteTarget(null)}
      />
    </div>
  );
}
