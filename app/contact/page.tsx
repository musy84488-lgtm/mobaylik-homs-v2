'use client';

import { useState } from 'react';
import { Phone, MapPin, Clock, MessageCircle, Send, Mail, User } from 'lucide-react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui';
import { openWhatsApp } from '@/lib/utils';

export default function ContactPage() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const msg = `مرحباً، أنا ${formData.name}
البريد: ${formData.email}
الرسالة: ${formData.message}`;
    openWhatsApp(msg);
  };

  const contactInfo = [
    { icon: Phone, label: 'الهاتف', value: '+963 967 768 408', href: 'tel:+963967768408' },
    { icon: MessageCircle, label: 'واتساب', value: '+963 967 768 408', href: 'https://wa.me/963967768408' },
    { icon: MapPin, label: 'الموقع', value: 'حمص، سوريا' },
    { icon: Clock, label: 'ساعات العمل', value: 'السبت - الخميس: 9 ص - 9 م' },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-12">
        <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-3">اتصل بنا</h1>
        <p className="text-gray-500 max-w-lg mx-auto">نحن هنا لمساعدتك! تواصل معنا عبر أي من القنوات التالية</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 max-w-5xl mx-auto">
        {/* Contact Info */}
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
          <div className="space-y-4">
            {contactInfo.map((item, index) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center gap-4 p-4 bg-white rounded-xl border border-gray-100 hover:border-gray-200 transition-colors"
              >
                <div className="w-12 h-12 rounded-xl bg-primary-50 flex items-center justify-center shrink-0">
                  <item.icon className="w-5 h-5 text-primary-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-400">{item.label}</p>
                  {item.href ? (
                    <a href={item.href} className="text-base font-semibold text-gray-800 hover:text-primary-600 transition-colors" dir="ltr">
                      {item.value}
                    </a>
                  ) : (
                    <p className="text-base font-semibold text-gray-800">{item.value}</p>
                  )}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Map Placeholder */}
          <div className="mt-6 rounded-2xl overflow-hidden border border-gray-100 h-64 bg-gray-100 flex items-center justify-center">
            <div className="text-center">
              <MapPin className="w-8 h-8 text-gray-300 mx-auto mb-2" />
              <p className="text-sm text-gray-400">حمص، سوريا</p>
            </div>
          </div>
        </motion.div>

        {/* Contact Form */}
        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
          <div className="bg-white rounded-2xl border border-gray-100 p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-6">أرسل رسالة</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-700 mb-1.5 flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5" /> الاسم *
                </label>
                <input type="text" required value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full h-11 px-4 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-500" />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 mb-1.5 flex items-center gap-1.5">
                  <Mail className="w-3.5 h-3.5" /> البريد الإلكتروني *
                </label>
                <input type="email" required value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full h-11 px-4 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-500" />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 mb-1.5 flex items-center gap-1.5">
                  <MessageCircle className="w-3.5 h-3.5" /> الرسالة *
                </label>
                <textarea required value={formData.message} rows={4}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 resize-none" />
              </div>
              <Button type="submit" fullWidth size="lg" leftIcon={<Send className="w-5 h-5" />}>
                إرسال عبر واتساب
              </Button>
            </form>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
