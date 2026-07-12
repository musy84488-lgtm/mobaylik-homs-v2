'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Plus, X, Save, Image as ImageIcon } from 'lucide-react';
import { categories } from '@/data/categories';
import { Button } from '@/components/ui';
import { motion } from 'framer-motion';

const initialForm = {
  name: '',
  slug: '',
  description: '',
  price: '',
  originalPrice: '',
  discount: '',
  image: '',
  images: [] as string[],
  categoryId: '',
  brand: '',
  model: '',
  storage: '',
  ram: '',
  color: '',
  colors: [] as string[],
  screenSize: '',
  battery: '',
  processor: '',
  camera: '',
  os: '',
  sim: '',
  warranty: '',
  stockCount: '0',
  inStock: true,
  isNew: false,
  isFeatured: false,
  isBestSeller: false,
  tags: [] as string[],
};

export default function NewProductPage() {
  const router = useRouter();
  const [form, setForm] = useState(initialForm);
  const [colorInput, setColorInput] = useState('');
  const [tagInput, setTagInput] = useState('');
  const [imageInput, setImageInput] = useState('');
  const [specs, setSpecs] = useState<{key: string, value: string}[]>([]);
  const [specKey, setSpecKey] = useState('');
  const [specValue, setSpecValue] = useState('');

  const updateField = (field: string, value: any) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const addColor = () => {
    if (colorInput.trim() && !form.colors.includes(colorInput.trim())) {
      setForm((prev) => ({ ...prev, colors: [...prev.colors, colorInput.trim()] }));
      setColorInput('');
    }
  };

  const removeColor = (color: string) => {
    setForm((prev) => ({ ...prev, colors: prev.colors.filter((c) => c !== color) }));
  };

  const addTag = () => {
    if (tagInput.trim() && !form.tags.includes(tagInput.trim())) {
      setForm((prev) => ({ ...prev, tags: [...prev.tags, tagInput.trim()] }));
      setTagInput('');
    }
  };

  const removeTag = (tag: string) => {
    setForm((prev) => ({ ...prev, tags: prev.tags.filter((t) => t !== tag) }));
  };

  const addImage = () => {
    if (imageInput.trim() && !form.images.includes(imageInput.trim())) {
      setForm((prev) => ({ ...prev, images: [...prev.images, imageInput.trim()] }));
      setImageInput('');
    }
  };

  const removeImage = (img: string) => {
    setForm((prev) => ({ ...prev, images: prev.images.filter((i) => i !== img) }));
  };

  const addSpec = () => {
    if (specKey.trim() && specValue.trim()) {
      setSpecs((prev) => [...prev, { key: specKey.trim(), value: specValue.trim() }]);
      setSpecKey('');
      setSpecValue('');
    }
  };

  const removeSpec = (index: number) => {
    setSpecs((prev) => prev.filter((_, i) => i !== index));
  };

  const generateSlug = (name: string) => {
    return name
      .toLowerCase()
      .replace(/[^a-z0-9\u0600-\u06ff\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newProduct = {
      ...form,
      id: 'p' + Date.now(),
      slug: form.slug || generateSlug(form.name),
      price: Number(form.price),
      originalPrice: form.originalPrice ? Number(form.originalPrice) : undefined,
      discount: form.discount ? Number(form.discount) : undefined,
      stockCount: Number(form.stockCount),
      rating: 0,
      reviewCount: 0,
      soldCount: 0,
      specifications: Object.fromEntries(specs.map((s) => [s.key, s.value])),
    };
    console.log('New Product:', newProduct);
    alert('تم إضافة المنتج بنجاح! (في الوضع التجريبي)');
    router.push('/admin/products');
  };

  const inputClass = "w-full h-11 px-4 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all";
  const labelClass = "text-sm font-semibold text-gray-700 mb-1.5 block";

  return (
    <div className="max-w-4xl">
      <div className="flex items-center gap-3 mb-6">
        <Link href="/admin/products" className="w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors">
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">إضافة منتج جديد</h1>
          <p className="text-gray-500 text-sm">أدخل تفاصيل المنتج الجديد</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic Info */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-2xl border border-gray-100 p-6">
          <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
            <Package className="w-5 h-5 text-primary-600" />
            المعلومات الأساسية
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="sm:col-span-2">
              <label className={labelClass}>اسم المنتج *</label>
              <input type="text" required value={form.name} onChange={(e) => { updateField('name', e.target.value); updateField('slug', generateSlug(e.target.value)); }} className={inputClass} placeholder="مثال: iPhone 15 Pro Max" />
            </div>
            <div>
              <label className={labelClass}>الرابط (Slug)</label>
              <input type="text" value={form.slug} onChange={(e) => updateField('slug', e.target.value)} className={inputClass} placeholder="iphone-15-pro-max" dir="ltr" />
            </div>
            <div>
              <label className={labelClass}>الماركة *</label>
              <input type="text" required value={form.brand} onChange={(e) => updateField('brand', e.target.value)} className={inputClass} placeholder="Apple" />
            </div>
            <div>
              <label className={labelClass}>الموديل *</label>
              <input type="text" required value={form.model} onChange={(e) => updateField('model', e.target.value)} className={inputClass} placeholder="iPhone 15 Pro Max" />
            </div>
            <div>
              <label className={labelClass}>الفئة *</label>
              <select required value={form.categoryId} onChange={(e) => updateField('categoryId', e.target.value)} className={inputClass}>
                <option value="">اختر الفئة</option>
                {categories.map((c) => (
                  <option key={c.id} value={c.id}>{c.name}</option>
                ))}
              </select>
            </div>
            <div className="sm:col-span-2">
              <label className={labelClass}>الوصف *</label>
              <textarea required value={form.description} onChange={(e) => updateField('description', e.target.value)} rows={3} className={inputClass + " py-3 resize-none"} placeholder="وصف تفصيلي للمنتج..." />
            </div>
          </div>
        </motion.div>

        {/* Pricing */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="bg-white rounded-2xl border border-gray-100 p-6">
          <h2 className="text-lg font-bold text-gray-900 mb-4">التسعير</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className={labelClass}>السعر الحالي *</label>
              <input type="number" required value={form.price} onChange={(e) => updateField('price', e.target.value)} className={inputClass} placeholder="3200000" min="0" />
            </div>
            <div>
              <label className={labelClass}>السعر الأصلي</label>
              <input type="number" value={form.originalPrice} onChange={(e) => updateField('originalPrice', e.target.value)} className={inputClass} placeholder="3500000" min="0" />
            </div>
            <div>
              <label className={labelClass}>نسبة الخصم</label>
              <input type="number" value={form.discount} onChange={(e) => updateField('discount', e.target.value)} className={inputClass} placeholder="10" min="0" max="100" />
            </div>
          </div>
        </motion.div>

        {/* Images */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }} className="bg-white rounded-2xl border border-gray-100 p-6">
          <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
            <ImageIcon className="w-5 h-5 text-primary-600" />
            الصور
          </h2>
          <div className="mb-4">
            <label className={labelClass}>صورة رئيسية *</label>
            <input type="url" required value={form.image} onChange={(e) => updateField('image', e.target.value)} className={inputClass} placeholder="https://images.unsplash.com/..." dir="ltr" />
            {form.image && (
              <div className="mt-2 w-24 h-24 rounded-lg overflow-hidden bg-gray-100">
                <img src={form.image} alt="Preview" className="w-full h-full object-cover" />
              </div>
            )}
          </div>
          <div>
            <label className={labelClass}>صور إضافية</label>
            <div className="flex gap-2 mb-2">
              <input type="url" value={imageInput} onChange={(e) => setImageInput(e.target.value)} className={inputClass + " flex-1"} placeholder="رابط الصورة" dir="ltr" />
              <Button type="button" size="sm" onClick={addImage} leftIcon={<Plus className="w-4 h-4" />}>إضافة</Button>
            </div>
            {form.images.length > 0 && (
              <div className="flex gap-2 flex-wrap">
                {form.images.map((img, i) => (
                  <div key={i} className="relative w-16 h-16 rounded-lg overflow-hidden bg-gray-100 group">
                    <img src={img} alt="" className="w-full h-full object-cover" />
                    <button type="button" onClick={() => removeImage(img)} className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <X className="w-4 h-4 text-white" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </motion.div>

        {/* Specifications */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="bg-white rounded-2xl border border-gray-100 p-6">
          <h2 className="text-lg font-bold text-gray-900 mb-4">المواصفات التقنية</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
            <div><label className={labelClass}>الشاشة</label><input type="text" value={form.screenSize} onChange={(e) => updateField('screenSize', e.target.value)} className={inputClass} placeholder="6.7 بوصة" /></div>
            <div><label className={labelClass}>المعالج</label><input type="text" value={form.processor} onChange={(e) => updateField('processor', e.target.value)} className={inputClass} placeholder="A17 Pro" /></div>
            <div><label className={labelClass}>الذاكرة</label><input type="text" value={form.storage} onChange={(e) => updateField('storage', e.target.value)} className={inputClass} placeholder="256GB" /></div>
            <div><label className={labelClass}>الرام</label><input type="text" value={form.ram} onChange={(e) => updateField('ram', e.target.value)} className={inputClass} placeholder="8GB" /></div>
            <div><label className={labelClass}>الكاميرا</label><input type="text" value={form.camera} onChange={(e) => updateField('camera', e.target.value)} className={inputClass} placeholder="48MP + 12MP + 12MP" /></div>
            <div><label className={labelClass}>البطارية</label><input type="text" value={form.battery} onChange={(e) => updateField('battery', e.target.value)} className={inputClass} placeholder="4422 mAh" /></div>
            <div><label className={labelClass}>نظام التشغيل</label><input type="text" value={form.os} onChange={(e) => updateField('os', e.target.value)} className={inputClass} placeholder="iOS 17" /></div>
            <div><label className={labelClass}>الشريحة</label><input type="text" value={form.sim} onChange={(e) => updateField('sim', e.target.value)} className={inputClass} placeholder="Dual Nano + eSIM" /></div>
            <div><label className={labelClass}>الضمان</label><input type="text" value={form.warranty} onChange={(e) => updateField('warranty', e.target.value)} className={inputClass} placeholder="سنة واحدة" /></div>
            <div><label className={labelClass}>اللون الافتراضي</label><input type="text" value={form.color} onChange={(e) => updateField('color', e.target.value)} className={inputClass} placeholder="تيتانيوم طبيعي" /></div>
          </div>

          {/* Colors */}
          <div className="mb-4">
            <label className={labelClass}>الألوان المتوفرة</label>
            <div className="flex gap-2 mb-2">
              <input type="text" value={colorInput} onChange={(e) => setColorInput(e.target.value)} className={inputClass + " flex-1"} placeholder="أضف لون..." onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addColor())} />
              <Button type="button" size="sm" onClick={addColor} leftIcon={<Plus className="w-4 h-4" />}>إضافة</Button>
            </div>
            <div className="flex gap-2 flex-wrap">
              {form.colors.map((color) => (
                <span key={color} className="inline-flex items-center gap-1 px-3 py-1.5 bg-primary-50 text-primary-700 rounded-lg text-sm">
                  {color}
                  <button type="button" onClick={() => removeColor(color)}><X className="w-3 h-3" /></button>
                </span>
              ))}
            </div>
          </div>

          {/* Tags */}
          <div className="mb-4">
            <label className={labelClass}>الوسوم</label>
            <div className="flex gap-2 mb-2">
              <input type="text" value={tagInput} onChange={(e) => setTagInput(e.target.value)} className={inputClass + " flex-1"} placeholder="أضف وسم..." onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())} />
              <Button type="button" size="sm" onClick={addTag} leftIcon={<Plus className="w-4 h-4" />}>إضافة</Button>
            </div>
            <div className="flex gap-2 flex-wrap">
              {form.tags.map((tag) => (
                <span key={tag} className="inline-flex items-center gap-1 px-3 py-1.5 bg-gray-100 text-gray-700 rounded-lg text-sm">
                  {tag}
                  <button type="button" onClick={() => removeTag(tag)}><X className="w-3 h-3" /></button>
                </span>
              ))}
            </div>
          </div>

          {/* Custom Specs */}
          <div>
            <label className={labelClass}>مواصفات إضافية</label>
            <div className="flex gap-2 mb-2">
              <input type="text" value={specKey} onChange={(e) => setSpecKey(e.target.value)} className={inputClass + " flex-1"} placeholder="اسم المواصفة" />
              <input type="text" value={specValue} onChange={(e) => setSpecValue(e.target.value)} className={inputClass + " flex-1"} placeholder="القيمة" />
              <Button type="button" size="sm" onClick={addSpec} leftIcon={<Plus className="w-4 h-4" />}>إضافة</Button>
            </div>
            {specs.length > 0 && (
              <div className="space-y-1">
                {specs.map((spec, i) => (
                  <div key={i} className="flex items-center justify-between px-3 py-2 bg-gray-50 rounded-lg">
                    <span className="text-sm"><span className="font-semibold">{spec.key}:</span> {spec.value}</span>
                    <button type="button" onClick={() => removeSpec(i)}><X className="w-4 h-4 text-gray-400 hover:text-red-500" /></button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </motion.div>

        {/* Stock & Status */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }} className="bg-white rounded-2xl border border-gray-100 p-6">
          <h2 className="text-lg font-bold text-gray-900 mb-4">المخزون والحالة</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div><label className={labelClass}>الكمية في المخزن *</label><input type="number" required value={form.stockCount} onChange={(e) => updateField('stockCount', e.target.value)} className={inputClass} min="0" /></div>
            <div className="flex items-center gap-6 pt-6">
              <label className="flex items-center gap-2 cursor-pointer"><input type="checkbox" checked={form.inStock} onChange={(e) => updateField('inStock', e.target.checked)} className="w-5 h-5" /><span className="text-sm font-medium">متوفر</span></label>
              <label className="flex items-center gap-2 cursor-pointer"><input type="checkbox" checked={form.isNew} onChange={(e) => updateField('isNew', e.target.checked)} className="w-5 h-5" /><span className="text-sm font-medium">جديد</span></label>
              <label className="flex items-center gap-2 cursor-pointer"><input type="checkbox" checked={form.isFeatured} onChange={(e) => updateField('isFeatured', e.target.checked)} className="w-5 h-5" /><span className="text-sm font-medium">مميز</span></label>
            </div>
            <div className="sm:col-span-2">
              <label className="flex items-center gap-2 cursor-pointer"><input type="checkbox" checked={form.isBestSeller} onChange={(e) => updateField('isBestSeller', e.target.checked)} className="w-5 h-5" /><span className="text-sm font-medium">الأكثر مبيعاً</span></label>
            </div>
          </div>
        </motion.div>

        {/* Submit */}
        <div className="flex gap-3">
          <Button type="submit" size="lg" leftIcon={<Save className="w-5 h-5" />}>حفظ المنتج</Button>
          <Link href="/admin/products"><Button type="button" variant="outline" size="lg">إلغاء</Button></Link>
        </div>
      </form>
    </div>
  );
}
