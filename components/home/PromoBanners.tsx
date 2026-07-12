'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { getPromoBanners } from '@/data/banners';

export default function PromoBanners() {
  const promoBanners = getPromoBanners();

  if (promoBanners.length === 0) return null;

  return (
    <section className="py-8 lg:py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6">
          {promoBanners.map((banner, index) => (
            <motion.div
              key={banner.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <Link
                href={banner.link || '#'}
                className="group block relative h-48 sm:h-56 rounded-2xl overflow-hidden"
              >
                <Image
                  src={banner.image}
                  alt={banner.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-transparent" />
                <div className="absolute inset-0 flex items-center p-6">
                  <div>
                    <h3 className="text-xl lg:text-2xl font-bold text-white mb-1">{banner.title}</h3>
                    {banner.subtitle && (
                      <p className="text-white/80 text-sm">{banner.subtitle}</p>
                    )}
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
