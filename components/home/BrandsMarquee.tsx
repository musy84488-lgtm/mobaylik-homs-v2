'use client';

import Marquee from 'react-fast-marquee';
import { getAllBrands } from '@/data/products';

export default function BrandsMarquee() {
  const brands = getAllBrands();

  return (
    <section className="py-8 border-y border-gray-100 bg-white">
      <div className="container mx-auto px-4 mb-4">
        <p className="text-center text-sm text-gray-400 font-medium">الماركات المتوفرة لدينا</p>
      </div>
      <Marquee speed={40} gradient={true} gradientWidth={100}>
        {brands.map((brand) => (
          <div
            key={brand}
            className="mx-8 px-6 py-3 bg-gray-50 rounded-xl text-lg font-bold text-gray-700
              hover:bg-primary-50 hover:text-primary-600 transition-colors cursor-default"
          >
            {brand}
          </div>
        ))}
      </Marquee>
    </section>
  );
}
