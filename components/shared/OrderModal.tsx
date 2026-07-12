'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ShoppingCart, Phone, User, MapPin, MessageSquare, CreditCard, Truck, CheckCircle } from 'lucide-react';
import { CartItem } from '@/types';
import { formatPrice, generateQuickOrderMessage, openWhatsApp } from '@/lib/utils';
import { Button } from '@/components/ui';
import { useCart } from '@/lib/hooks';

interface OrderModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function OrderModal({ isOpen, onClose }: OrderModalProps) {
  const [step, setStep] = useState<'form' | 'success'>('form');
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: '',
    city: 'حمص',
    notes: '',
    paymentMethod: 'cash' as 'cash' | 'transfer',
  });

  const items = useCart((state) => state.items);
  const getTotalPrice = useCart((state) => state.getTotalPrice);
  const clearCart = useCart((state) => state.clearCart);

  const subtotal = getTotalPrice();
  const shippingCost = subtotal > 1000000 ? 0 : 25000;
  const total = subtotal + shippingCost;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const message = generateQuickOrderMessage(items, {
      name: formData.name,
      phone: formData.phone,
    });

    // Add order details
    const fullMessage = `${message}

📍 العنوان: ${formData.address}
🏙️ المدينة: ${formData.city}
💳 طريقة الدفع: ${formData.paymentMethod === 'cash' ? 'الدفع عند الاستلام' : 'تحويل بنكي'}
💰 الإجمالي الكلي: ${total.toLocaleString('ar-SY')} ل.س
${formData.notes ? `📝 ملاحظات: ${formData.notes}` : ''}

✅ يرجى تأكيد الطلب`;

    openWhatsApp(fullMessage);
    setStep('success');
    clearCart();
  };

  const handleClose = () => {
    onClose();
    setTimeout(() => setStep('form'), 300);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
          onClick={handleClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto shadow-2xl"
          >
            {step === 'form' ? (
              <div className="p-6">
                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-2">
                    <div className="w-10 h-10 rounded-xl bg-primary-100 flex items-center justify-center">
                      <ShoppingCart className="w-5 h-5 text-primary-600" />
                    </div>
                    <div>
                      <h2 className="text-lg font-bold text-gray-900">إتمام الطلب</h2>
                      <p className="text-xs text-gray-400">سيتم إرسال الطلب عبر واتساب</p>
                    </div>
                  </div>
                  <button
                    onClick={handleClose}
                    className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center hover:bg-gray-200"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                {/* Order Summary */}
                <div className="bg-gray-50 rounded-xl p-4 mb-6">
                  <h3 className="text-sm font-semibold text-gray-800 mb-3">ملخص الطلب</h3>
                  <div className="space-y-2 max-h-32 overflow-y-auto">
                    {items.map((item) => (
                      <div key={item.product.id} className="flex items-center justify-between text-sm">
                        <span className="text-gray-600 line-clamp-1">
                          {item.product.name} × {item.quantity}
                        </span>
                        <span className="font-medium text-gray-800">
                          {formatPrice(item.product.price * item.quantity)}
                        </span>
                      </div>
                    ))}
                  </div>
                  <div className="border-t border-gray-200 mt-2 pt-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-500">المجموع</span>
                      <span className="font-bold text-primary-600">{formatPrice(total)}</span>
                    </div>
                  </div>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-1.5 flex items-center gap-1.5">
                      <User className="w-3.5 h-3.5" />
                      الاسم الكامل *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="أدخل اسمك الكامل"
                      className="w-full h-11 px-4 bg-gray-50 border border-gray-200 rounded-xl text-sm
                        focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-1.5 flex items-center gap-1.5">
                      <Phone className="w-3.5 h-3.5" />
                      رقم الهاتف *
                    </label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="مثال: 0933xxxxxx"
                      dir="ltr"
                      className="w-full h-11 px-4 bg-gray-50 border border-gray-200 rounded-xl text-sm
                        focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-1.5 flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5" />
                      العنوان *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.address}
                      onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                      placeholder="الحي - الشارع - رقم البناء"
                      className="w-full h-11 px-4 bg-gray-50 border border-gray-200 rounded-xl text-sm
                        focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-1.5">المدينة</label>
                    <select
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      className="w-full h-11 px-4 bg-gray-50 border border-gray-200 rounded-xl text-sm
                        focus:outline-none focus:ring-2 focus:ring-primary-500"
                    >
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
                      <CreditCard className="w-3.5 h-3.5" />
                      طريقة الدفع
                    </label>
                    <div className="grid grid-cols-2 gap-3">
                      <label
                        className={`flex items-center gap-2 p-3 rounded-xl border-2 cursor-pointer transition-colors ${
                          formData.paymentMethod === 'cash'
                            ? 'border-primary-600 bg-primary-50'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <input
                          type="radio"
                          value="cash"
                          checked={formData.paymentMethod === 'cash'}
                          onChange={() => setFormData({ ...formData, paymentMethod: 'cash' })}
                          className="hidden"
                        />
                        <Truck className="w-5 h-5 text-primary-600" />
                        <div>
                          <p className="text-sm font-semibold">عند الاستلام</p>
                          <p className="text-xs text-gray-400">الدفع نقداً</p>
                        </div>
                      </label>
                      <label
                        className={`flex items-center gap-2 p-3 rounded-xl border-2 cursor-pointer transition-colors ${
                          formData.paymentMethod === 'transfer'
                            ? 'border-primary-600 bg-primary-50'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <input
                          type="radio"
                          value="transfer"
                          checked={formData.paymentMethod === 'transfer'}
                          onChange={() => setFormData({ ...formData, paymentMethod: 'transfer' })}
                          className="hidden"
                        />
                        <CreditCard className="w-5 h-5 text-primary-600" />
                        <div>
                          <p className="text-sm font-semibold">تحويل بنكي</p>
                          <p className="text-xs text-gray-400">بعد تأكيد الطلب</p>
                        </div>
                      </label>
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-1.5 flex items-center gap-1.5">
                      <MessageSquare className="w-3.5 h-3.5" />
                      ملاحظات (اختياري)
                    </label>
                    <textarea
                      value={formData.notes}
                      onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                      placeholder="أي ملاحظات خاصة بالطلب..."
                      rows={3}
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm
                        focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none"
                    />
                  </div>

                  <Button
                    type="submit"
                    fullWidth
                    size="lg"
                    leftIcon={<Phone className="w-5 h-5" />}
                  >
                    إرسال الطلب عبر واتساب
                  </Button>

                  <p className="text-xs text-gray-400 text-center">
                    سيتم تحويلك إلى واتساب لإرسال تفاصيل طلبك وتأكيده
                  </p>
                </form>
              </div>
            ) : (
              <div className="p-8 text-center">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', stiffness: 200, damping: 15 }}
                  className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4"
                >
                  <CheckCircle className="w-10 h-10 text-green-600" />
                </motion.div>
                <h2 className="text-xl font-bold text-gray-900 mb-2">تم إرسال طلبك!</h2>
                <p className="text-gray-500 mb-6">
                  تم فتح واتساب مع تفاصيل طلبك. يرجى إرسال الرسالة لتأكيد الطلب.
                </p>
                <Button onClick={handleClose} fullWidth>
                  العودة للتسوق
                </Button>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
