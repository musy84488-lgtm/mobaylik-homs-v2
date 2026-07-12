'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  CreditCard, Truck, Phone, User, MapPin, MessageSquare,
  ChevronLeft, CheckCircle, ShoppingBag
} from 'lucide-react';
import { useCart } from '@/lib/hooks';
import { formatPrice, generateQuickOrderMessage, openWhatsApp } from '@/lib/utils';
import { Button } from '@/components/ui';
import { motion } from 'framer-motion';

export default function CheckoutPage() {
  const router = useRouter();
  const items = useCart((state) => state.items);
  const getTotalPrice = useCart((state) => state.getTotalPrice);
  const clearCart = useCart((state) => state.clearCart);

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: '',
    city: 'حمص',
    notes: '',
    paymentMethod: 'cash' as 'cash' | 'transfer',
  });

  if (items.length === 0 && !isSubmitted) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <ShoppingBag className="w-16 h-16 text-gray-300 mx-auto mb-4" />
        <h1 className="text-2xl font-bold text-gray-900 mb-2">سلة التسوق فارغة</h1>
        <p className="text-gray-500 mb-6">أضف منتجات إلى سلة التسوق أولاً</p>
        <Link href="/products" className="text-primary-600 hover:underline">تصفح المنتجات</Link>
      </div>
    );
  }

  const subtotal = getTotalPrice();
  const shippingCost = subtotal > 1000000 ? 0 : 25000;
  const total = subtotal + shippingCost;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const message = generateQuickOrderMessage(items, {
      name: formData.name,
      phone: formData.phone,
    });

    const fullMessage = `${message}

📍 العنوان: ${formData.address}
🏙️ المدينة: ${formData.city}
💳 طريقة الدفع: ${formData.paymentMethod === 'cash' ? 'الدفع عند الاستلام' : 'تحويل بنكي'}
💰 الإجمالي الكلي: ${total.toLocaleString('ar-SY')} ل.س
${formData.notes ? `📝 ملاحظات: ${formData.notes}` : ''}

✅ يرجى تأكيد الطلب`;

    openWhatsApp(fullMessage);
    clearCart();
    setIsSubmitted(true);
  };

  if (isSubmitted) {
    return (
      <div className="container mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-md mx-auto text-center"
        >
          <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-10 h-10 text-green-600" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-3">تم إرسال طلبك!</h1>
          <p className="text-gray-500 mb-2">
            تم فتح واتساب مع تفاصيل طلبك الكاملة.
          </p>
          <p className="text-gray-500 mb-8">
            يرجى إرسال الرسالة لتأكيد الطلب. سنتواصل معك قريباً!
          </p>
          <Button onClick={() => router.push('/products')} fullWidth>
            متابعة التسوق
          </Button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <nav className="flex items-center gap-2 text-sm text-gray-500 mb-6">
        <Link href="/" className="hover:text-primary-600 transition-colors">الرئيسية</Link>
        <ChevronLeft className="w-3.5 h-3.5" />
        <Link href="/cart" className="hover:text-primary-600 transition-colors">السلة</Link>
        <ChevronLeft className="w-3.5 h-3.5" />
        <span className="text-gray-800 font-medium">إتمام الطلب</span>
      </nav>

      <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-8">إتمام الطلب</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
        {/* Form */}
        <div className="lg:col-span-2">
          <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-gray-100 p-6 space-y-5">
            <h2 className="text-lg font-bold text-gray-900 mb-4">معلومات التوصيل</h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-gray-700 mb-1.5 flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5" /> الاسم الكامل *
                </label>
                <input type="text" required value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="أدخل اسمك الكامل"
                  className="w-full h-11 px-4 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-500" />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 mb-1.5 flex items-center gap-1.5">
                  <Phone className="w-3.5 h-3.5" /> رقم الهاتف *
                </label>
                <input type="tel" required value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="مثال: 0933xxxxxx" dir="ltr"
                  className="w-full h-11 px-4 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-500" />
              </div>
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700 mb-1.5 flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5" /> العنوان *
              </label>
              <input type="text" required value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                placeholder="الحي - الشارع - رقم البناء"
                className="w-full h-11 px-4 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-500" />
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700 mb-1.5">المدينة</label>
              <select value={formData.city}
                onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                className="w-full h-11 px-4 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-500">
                <option value="حمص">حمص</option>
                <option value="الوعر">الوعر</option>
                <option value="الخالدية">الخالدية</option>
                <option value="العاصي">العاصي</option>
                <option value="الحضارة">الحضارة</option>
                <option value="الأندلس">الأندلس</option>
                <option value="أخرى">أخرى</option>
              </select>
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700 mb-1.5 flex items-center gap-1.5">
                <CreditCard className="w-3.5 h-3.5" /> طريقة الدفع
              </label>
              <div className="grid grid-cols-2 gap-3">
                <label className={`flex items-center gap-2 p-3 rounded-xl border-2 cursor-pointer transition-colors ${formData.paymentMethod === 'cash' ? 'border-primary-600 bg-primary-50' : 'border-gray-200 hover:border-gray-300'}`}>
                  <input type="radio" value="cash" checked={formData.paymentMethod === 'cash'}
                    onChange={() => setFormData({ ...formData, paymentMethod: 'cash' })} className="hidden" />
                  <Truck className="w-5 h-5 text-primary-600" />
                  <div><p className="text-sm font-semibold">عند الاستلام</p><p className="text-xs text-gray-400">الدفع نقداً</p></div>
                </label>
                <label className={`flex items-center gap-2 p-3 rounded-xl border-2 cursor-pointer transition-colors ${formData.paymentMethod === 'transfer' ? 'border-primary-600 bg-primary-50' : 'border-gray-200 hover:border-gray-300'}`}>
                  <input type="radio" value="transfer" checked={formData.paymentMethod === 'transfer'}
                    onChange={() => setFormData({ ...formData, paymentMethod: 'transfer' })} className="hidden" />
                  <CreditCard className="w-5 h-5 text-primary-600" />
                  <div><p className="text-sm font-semibold">تحويل بنكي</p><p className="text-xs text-gray-400">بعد تأكيد الطلب</p></div>
                </label>
              </div>
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700 mb-1.5 flex items-center gap-1.5">
                <MessageSquare className="w-3.5 h-3.5" /> ملاحظات (اختياري)
              </label>
              <textarea value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                placeholder="أي ملاحظات خاصة بالطلب..." rows={3}
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 resize-none" />
            </div>

            <Button type="submit" fullWidth size="lg" leftIcon={<Phone className="w-5 h-5" />}>
              إرسال الطلب عبر واتساب
            </Button>
          </form>
        </div>

        {/* Order Summary */}
        <div>
          <div className="bg-white rounded-2xl border border-gray-100 p-6 sticky top-24">
            <h2 className="text-lg font-bold text-gray-900 mb-4">ملخص الطلب</h2>
            <div className="space-y-3 mb-4 max-h-64 overflow-y-auto">
              {items.map((item) => (
                <div key={item.product.id} className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-lg bg-gray-50 overflow-hidden shrink-0">
                    <img src={item.product.image} alt={item.product.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-800 line-clamp-1">{item.product.name}</p>
                    <p className="text-xs text-gray-400">× {item.quantity}</p>
                  </div>
                  <span className="text-sm font-semibold text-gray-800">{formatPrice(item.product.price * item.quantity)}</span>
                </div>
              ))}
            </div>
            <div className="border-t border-gray-100 pt-3 space-y-2">
              <div className="flex items-center justify-between text-sm"><span className="text-gray-500">المجموع</span><span className="font-semibold">{formatPrice(subtotal)}</span></div>
              <div className="flex items-center justify-between text-sm"><span className="text-gray-500">الشحن</span><span className="font-semibold">{shippingCost === 0 ? 'مجاني' : formatPrice(shippingCost)}</span></div>
              {subtotal > 1000000 && <p className="text-xs text-green-600 bg-green-50 p-2 rounded-lg">شحن مجاني للطلبات فوق مليون ل.س</p>}
              <div className="border-t border-gray-100 pt-2">
                <div className="flex items-center justify-between"><span className="font-bold text-gray-900">الإجمالي</span><span className="text-xl font-bold text-primary-600">{formatPrice(total)}</span></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
