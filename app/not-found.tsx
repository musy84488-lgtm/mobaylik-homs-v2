import Link from 'next/link';
import { Home, Search } from 'lucide-react';
import { Button } from '@/components/ui';

export default function NotFound() {
  return (
    <div className="container mx-auto px-4 py-24 text-center">
      <div className="max-w-md mx-auto">
        <h1 className="text-9xl font-bold text-primary-100 mb-4">404</h1>
        <h2 className="text-2xl font-bold text-gray-900 mb-3">الصفحة غير موجودة</h2>
        <p className="text-gray-500 mb-8">
          الصفحة التي تبحث عنها غير موجودة أو تم نقلها.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link href="/">
            <Button leftIcon={<Home className="w-4 h-4" />}>
              العودة للرئيسية
            </Button>
          </Link>
          <Link href="/products">
            <Button variant="outline" leftIcon={<Search className="w-4 h-4" />}>
              تصفح المنتجات
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
