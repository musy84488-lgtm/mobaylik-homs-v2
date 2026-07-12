'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { ArrowLeft, Save } from 'lucide-react';
import { getCategoryBySlug } from '@/data/categories';
import { Button } from '@/components/ui';
import { motion } from 'framer-motion';

export default function EditCategoryPage() {
  const params = useParams();
  const router = useRouter();
  const slug = params.id as string;
  const category = getCategoryBySlug(slug);

  const [form, setForm] = useState<any>(null);

  useEffect(() => {
    if (category) {
      setForm({
        name: category.name,
        slug: category.slug,
        description: category.description || '',
        image: category.image,
        icon: category.icon || 'Smartphone',
        isActive: category.isActive,
        sortOrder: String(category.sortOrder),
      });
    }
  }, [category]);

  if (!category || !form) {
    return (
      <div className="text-center py-16">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">الفئة غير موجودة</h1>
        <Link href="/admin/categories" className="text-primary-600 hover:underline">العودة للفئات</Link>
      </div>
    );
  }

  const updateField = (field: string, value: any) => {
    setForm((prev: any) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Updated Category:', form);
    alert('تم تحديث الفئة بنجاح! (في الوضع التجريبي)');
    router.push('/admin/categories');
  };

  const inputClass = "w-full h-11 px-4 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-500";
  const labelClass = "text-sm font-semibold text-gray-700 mb-1.5 block";

  return (
    <div className="max-w-2xl">
      <div className="flex items-center gap-3 mb-6">
        <Link href="/admin/categories" className="w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors">
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">تعديل الفئة</h1>
          <p className="text-gray-500 text-sm">{category.name}</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-2xl border border-gray-100 p-6">
          <div className="space-y-4">
            <div><label className={labelClass}>اسم الفئة *</label><input type="text" required value={form.name} onChange={(e) => updateField('name', e.target.value)} className={inputClass} /></div>
            <div><label className={labelClass}>الرابط (Slug)</label><input type="text" value={form.slug} onChange={(e) => updateField('slug', e.target.value)} className={inputClass} dir="ltr" /></div>
            <div><label className={labelClass}>الوصف</label><textarea value={form.description} onChange={(e) => updateField('description', e.target.value)} rows={3} className={inputClass + " py-3 resize-none"} /></div>
            <div>
              <label className={labelClass}>صورة الفئة *</label>
              <input type="url" required value={form.image} onChange={(e) => updateField('image', e.target.value)} className={inputClass} dir="ltr" />
              {form.image && <div className="mt-2 w-32 h-24 rounded-lg overflow-hidden bg-gray-100"><img src={form.image} alt="Preview" className="w-full h-full object-cover" /></div>}
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div><label className={labelClass}>الأيقونة</label>
                <select value={form.icon} onChange={(e) => updateField('icon', e.target.value)} className={inputClass}>
                  <option value="Smartphone">هاتف</option>
                  <option value="Tablet">تابلت</option>
                  <option value="Watch">ساعة</option>
                  <option value="Headphones">سماعات</option>
                </select>
              </div>
              <div><label className={labelClass}>الترتيب</label><input type="number" value={form.sortOrder} onChange={(e) => updateField('sortOrder', e.target.value)} className={inputClass} min="0" /></div>
            </div>
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" checked={form.isActive} onChange={(e) => updateField('isActive', e.target.checked)} className="w-5 h-5" />
              <span className="text-sm font-medium">نشط</span>
            </label>
          </div>
        </motion.div>

        <div className="flex gap-3">
          <Button type="submit" size="lg" leftIcon={<Save className="w-5 h-5" />}>حفظ التغييرات</Button>
          <Link href="/admin/categories"><Button type="button" variant="outline" size="lg">إلغاء</Button></Link>
        </div>
      </form>
    </div>
  );
}
