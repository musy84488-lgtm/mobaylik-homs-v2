import { NextResponse } from 'next/server';
import { products } from '@/data/products';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get('category');
  const brand = searchParams.get('brand');
  const search = searchParams.get('q');
  const featured = searchParams.get('featured');
  const newProducts = searchParams.get('new');
  const bestseller = searchParams.get('bestseller');

  let result = [...products];

  if (category) result = result.filter((p) => p.categoryId === category);
  if (brand) result = result.filter((p) => p.brand.toLowerCase() === brand.toLowerCase());
  if (search) {
    const q = search.toLowerCase();
    result = result.filter((p) =>
      p.name.toLowerCase().includes(q) ||
      p.brand.toLowerCase().includes(q) ||
      p.description.toLowerCase().includes(q)
    );
  }
  if (featured === 'true') result = result.filter((p) => p.isFeatured);
  if (newProducts === 'true') result = result.filter((p) => p.isNew);
  if (bestseller === 'true') result = result.filter((p) => p.isBestSeller);

  return NextResponse.json({ products: result, count: result.length });
}
