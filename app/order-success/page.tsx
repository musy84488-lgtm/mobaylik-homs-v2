'use client';

import Link from 'next/link';
import { CheckCircle, ShoppingBag, MessageCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui';

export default function OrderSuccessPage() {
  return (
    <div className="container mx-auto px-4 py-16">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-md mx-auto text-center"
      >
        <div className="w-24 h-24 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6">
          <CheckCircle className="w-12 h-12 text-green-600" />
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-3">تم إرسال طلبك بنجاح!</h1>
        <p className="text-gray-500 mb-2">
          تم فتح واتساب مع تفاصيل طلبك الكاملة.
        </p>
        <p className="text-gray-500 mb-8">
          يرجى إرسال الرسالة لتأكيد الطلب. سنتواصل معك قريباً!
        </p>

        <div className="space-y-3">
          <Link href="/products">
            <Button fullWidth leftIcon={<ShoppingBag className="w-5 h-5" />}>
              متابعة التسوق
            </Button>
          </Link>
          <a href="https://wa.me/963967768408" target="_blank" rel="noopener noreferrer">
            <Button variant="outline" fullWidth leftIcon={<MessageCircle className="w-5 h-5" />}>
              التواصل المباشر
            </Button>
          </a>
        </div>
      </motion.div>
    </div>
  );
}
