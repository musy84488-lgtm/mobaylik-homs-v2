import {
  HeroBanner,
  CategoriesSection,
  FeaturedProducts,
  NewArrivals,
  BestSellers,
  FeaturesSection,
  StatsSection,
  PromoBanners,
  DiscountedProducts,
  BrandsMarquee,
} from '@/components/home';

export default function HomePage() {
  return (
    <div className="space-y-0">
      <div className="container mx-auto px-4 pt-6">
        <HeroBanner />
      </div>
      <BrandsMarquee />
      <CategoriesSection />
      <FeaturedProducts />
      <PromoBanners />
      <NewArrivals />
      <DiscountedProducts />
      <BestSellers />
      <FeaturesSection />
      <StatsSection />
    </div>
  );
}
