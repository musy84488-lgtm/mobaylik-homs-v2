'use client';

import { useState } from 'react';
import { Save, Store, Phone, Mail, MapPin } from 'lucide-react';
import { Button } from '@/components/ui';

export default function SettingsPage() {
  const [settings, setSettings] = useState({
    storeName: 'موبايلك حمص',
    storePhone: '+963 967 768 408',
    storeEmail: '',
    storeAddress: 'حمص، سوريا',
    whatsappNumber: '+963 967 768 408',
    developerName: 'محمد الحسين',
    developerPhone: '0938626949',
    facebook: '',
    instagram: '',
    telegram: '',
    youtube: '',
  });

  const update = (field: string, value: string) => {
    setSettings((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('تم حفظ الإعدادات! (في الوضع التجريبي)');
  };

  const inputClass = "w-full h-11 px-4 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-500";
  const labelClass = "text-sm font-semibold text-gray-700 mb-1.5 flex items-center gap-1.5";

  return (
    <div className="max-w-2xl">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-1">الإعدادات</h1>
        <p className="text-gray-500 text-sm">إعدادات المتجر العامة</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="bg-white rounded-2xl border border-gray-100 p-6">
          <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2"><Store className="w-5 h-5 text-primary-600" />معلومات المتجر</h2>
          <div className="space-y-4">
            <div><label className={labelClass}><Store className="w-3.5 h-3.5" />اسم المتجر</label><input type="text" value={settings.storeName} onChange={(e) => update('storeName', e.target.value)} className={inputClass} /></div>
            <div><label className={labelClass}><Phone className="w-3.5 h-3.5" />رقم الهاتف</label><input type="text" value={settings.storePhone} onChange={(e) => update('storePhone', e.target.value)} className={inputClass} dir="ltr" /></div>
            <div><label className={labelClass}><Mail className="w-3.5 h-3.5" />البريد الإلكتروني</label><input type="email" value={settings.storeEmail} onChange={(e) => update('storeEmail', e.target.value)} className={inputClass} dir="ltr" /></div>
            <div><label className={labelClass}><MapPin className="w-3.5 h-3.5" />العنوان</label><input type="text" value={settings.storeAddress} onChange={(e) => update('storeAddress', e.target.value)} className={inputClass} /></div>
            <div><label className={labelClass}><Phone className="w-3.5 h-3.5" />رقم واتساب</label><input type="text" value={settings.whatsappNumber} onChange={(e) => update('whatsappNumber', e.target.value)} className={inputClass} dir="ltr" /></div>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-gray-100 p-6">
          <h2 className="text-lg font-bold text-gray-900 mb-4">معلومات المطور</h2>
          <div className="space-y-4">
            <div><label className={labelClass}>اسم المطور</label><input type="text" value={settings.developerName} onChange={(e) => update('developerName', e.target.value)} className={inputClass} /></div>
            <div><label className={labelClass}>رقم المطور</label><input type="text" value={settings.developerPhone} onChange={(e) => update('developerPhone', e.target.value)} className={inputClass} dir="ltr" /></div>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-gray-100 p-6">
          <h2 className="text-lg font-bold text-gray-900 mb-4">وسائل التواصل الاجتماعي</h2>
          <div className="space-y-4">
            <div><label className={labelClass}>Facebook</label><input type="url" value={settings.facebook} onChange={(e) => update('facebook', e.target.value)} className={inputClass} dir="ltr" placeholder="https://facebook.com/..." /></div>
            <div><label className={labelClass}>Instagram</label><input type="url" value={settings.instagram} onChange={(e) => update('instagram', e.target.value)} className={inputClass} dir="ltr" placeholder="https://instagram.com/..." /></div>
            <div><label className={labelClass}>Telegram</label><input type="url" value={settings.telegram} onChange={(e) => update('telegram', e.target.value)} className={inputClass} dir="ltr" placeholder="https://t.me/..." /></div>
            <div><label className={labelClass}>Youtube</label><input type="url" value={settings.youtube} onChange={(e) => update('youtube', e.target.value)} className={inputClass} dir="ltr" placeholder="https://youtube.com/..." /></div>
          </div>
        </div>

        <Button type="submit" size="lg" leftIcon={<Save className="w-5 h-5" />}>حفظ الإعدادات</Button>
      </form>
    </div>
  );
}
