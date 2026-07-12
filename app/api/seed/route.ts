import { NextResponse } from 'next/server';
import { createAdminClient } from '@/lib/supabase';
import { products } from '@/data/products';
import { categories } from '@/data/categories';

export async function POST() {
  try {
    const supabase = createAdminClient();

    // Seed categories
    const { error: catError } = await supabase
      .from('categories')
      .upsert(categories.map((c) => ({
        id: c.id,
        name: c.name,
        slug: c.slug,
        description: c.description,
        image: c.image,
        icon: c.icon,
        product_count: c.productCount,
        parent_id: c.parentId,
        is_active: c.isActive,
        sort_order: c.sortOrder,
      })));

    if (catError) throw catError;

    // Seed products
    const { error: prodError } = await supabase
      .from('products')
      .upsert(products.map((p) => ({
        id: p.id,
        name: p.name,
        slug: p.slug,
        description: p.description,
        price: p.price,
        original_price: p.originalPrice,
        discount: p.discount,
        image: p.image,
        images: p.images,
        category_id: p.categoryId,
        brand: p.brand,
        model: p.model,
        storage: p.storage,
        ram: p.ram,
        color: p.color,
        colors: p.colors,
        screen_size: p.screenSize,
        battery: p.battery,
        processor: p.processor,
        camera: p.camera,
        os: p.os,
        sim: p.sim,
        warranty: p.warranty,
        in_stock: p.inStock,
        stock_count: p.stockCount,
        rating: p.rating,
        review_count: p.reviewCount,
        sold_count: p.soldCount,
        is_new: p.isNew,
        is_featured: p.isFeatured,
        is_best_seller: p.isBestSeller,
        tags: p.tags,
        specifications: p.specifications,
      })));

    if (prodError) throw prodError;

    return NextResponse.json({
      success: true,
      message: 'Database seeded successfully',
      categories: categories.length,
      products: products.length,
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || 'Failed to seed database' },
      { status: 500 }
    );
  }
}
