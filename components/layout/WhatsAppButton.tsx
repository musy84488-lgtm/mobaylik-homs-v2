'use client';

import { MessageCircle } from 'lucide-react';
import { motion } from 'framer-motion';

const STORE_PHONE = process.env.NEXT_PUBLIC_STORE_WHATSAPP || '963967768408';

export default function WhatsAppButton() {
  const handleClick = () => {
    const message = encodeURIComponent('مرحباً! أريد الاستفسار عن منتجات متجر موبايلك حمص');
    window.open(`https://wa.me/${STORE_PHONE}?text=${message}`, '_blank', 'noopener,noreferrer');
  };

  return (
    <motion.button
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      onClick={handleClick}
      className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-green-500 text-white rounded-full
        shadow-lg shadow-green-500/30 flex items-center justify-center
        hover:bg-green-600 transition-colors duration-200"
      aria-label="تواصل عبر واتساب"
    >
      <MessageCircle className="w-7 h-7" />
      <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full animate-pulse" />
    </motion.button>
  );
}
