'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import CountUp from 'react-countup';
import { Users, ShoppingBag, Star, Smartphone } from 'lucide-react';

const stats = [
  { icon: Smartphone, value: 500, suffix: '+', label: 'منتج متوفر' },
  { icon: Users, value: 2000, suffix: '+', label: 'عميل سعيد' },
  { icon: ShoppingBag, value: 5000, suffix: '+', label: 'طلب منفذ' },
  { icon: Star, value: 4.9, suffix: '', label: 'متوسط التقييم', decimals: 1 },
];

export default function StatsSection() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.3 });

  return (
    <section ref={ref} className="py-12 lg:py-16 bg-gradient-to-br from-primary-600 to-primary-800">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="text-center"
            >
              <div className="w-14 h-14 rounded-2xl bg-white/10 backdrop-blur-sm flex items-center justify-center mx-auto mb-3">
                <stat.icon className="w-7 h-7 text-white" />
              </div>
              <div className="text-3xl lg:text-4xl font-bold text-white mb-1">
                {inView ? (
                  <CountUp
                    end={stat.value}
                    duration={2.5}
                    decimals={stat.decimals || 0}
                    suffix={stat.suffix}
                  />
                ) : (
                  `0${stat.suffix}`
                )}
              </div>
              <p className="text-white/70 text-sm">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
