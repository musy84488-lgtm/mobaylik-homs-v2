'use client';

import { motion } from 'framer-motion';
import { Truck, Shield, Headphones, RotateCcw, Award, Clock } from 'lucide-react';

const features = [
  {
    icon: Truck,
    title: 'شحن سريع',
    description: 'توصيل سريع في حمص وضواحيها',
    color: 'bg-blue-50 text-blue-600',
  },
  {
    icon: Shield,
    title: 'ضمان أصلي',
    description: 'جميع المنتجات أصلية 100% مع ضمان',
    color: 'bg-green-50 text-green-600',
  },
  {
    icon: Headphones,
    title: 'دعم فني',
    description: 'فريق دعم متخصص على مدار الساعة',
    color: 'bg-purple-50 text-purple-600',
  },
  {
    icon: RotateCcw,
    title: 'إرجاع سهل',
    description: 'سياسة إرجاع مرنة خلال 7 أيام',
    color: 'bg-orange-50 text-orange-600',
  },
  {
    icon: Award,
    title: 'جودة مضمونة',
    description: 'نختار لك أفضل المنتجات بعناية',
    color: 'bg-yellow-50 text-yellow-600',
  },
  {
    icon: Clock,
    title: 'توصيل في نفس اليوم',
    description: 'للطلبات قبل الساعة 3 مساءً',
    color: 'bg-red-50 text-red-600',
  },
];

export default function FeaturesSection() {
  return (
    <section className="py-12 lg:py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-2">لماذا تختار موبايلك حمص؟</h2>
          <p className="text-gray-500">نقدم لك تجربة تسوق فريدة مع مميزات حصرية</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="flex items-start gap-4 p-5 bg-white rounded-2xl border border-gray-100
                hover:shadow-soft hover:border-gray-200 transition-all duration-300"
            >
              <div className={`w-12 h-12 rounded-xl ${feature.color} flex items-center justify-center shrink-0`}>
                <feature.icon className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-gray-900 mb-1">{feature.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{feature.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
