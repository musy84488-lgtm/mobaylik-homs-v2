# 📱 موبايلك حمص - متجر الهواتف الذكية

<p align="center">
  <img src="https://img.shields.io/badge/Next.js-14-black?style=for-the-badge&logo=next.js" />
  <img src="https://img.shields.io/badge/TypeScript-5.5-blue?style=for-the-badge&logo=typescript" />
  <img src="https://img.shields.io/badge/Tailwind-3.4-38bdf8?style=for-the-badge&logo=tailwindcss" />
  <img src="https://img.shields.io/badge/Supabase-2.0-3ecf8e?style=for-the-badge&logo=supabase" />
</p>

## 🚀 المميزات

- ⚡ **Next.js 14** - أحدث إصدار مع App Router
- 🎨 **Tailwind CSS** - تصميم حديث ومتجاوب
- 🛒 **سلة تسوق كاملة** - مع إدارة الكميات والألوان
- ❤️ **قائمة أمنيات** - حفظ المنتجات المفضلة
- 🔄 **مقارنة المنتجات** - مقارنة جانبية حتى 4 منتجات
- 📱 **واتساب للطلبات** - إرسال الطلبات مباشرة عبر واتساب
- 🔍 **بحث متقدم** - بحث في المنتجات والماركات
- 🌍 **مزامنة Supabase** - قاعدة بيانات سحابية
- 📊 **إحصائيات حية** - عدادات متحركة ومؤثرات
- 🌙 **وضع داكن** - دعم الوضع الداكن
- 📦 **PWA** - تطبيق ويب تقدمي

## 📋 المتطلبات

- Node.js 18+
- npm 9+

## 🛠️ التثبيت

### الطريقة السريعة (نقرة واحدة)

```bash
bash scripts/setup.sh
```

### الطريقة اليدوية

```bash
# 1. تثبيت الاعتماديات
npm install

# 2. إعداد البيئة
cp .env.example .env
# عدل ملف .env بمفاتيح Supabase الخاصة بك

# 3. تشغيل خادم التطوير
npm run dev
```

## 🔧 إعداد Supabase

1. أنشئ مشروع في [Supabase](https://supabase.com)
2. انسخ **URL** و **Anon Key** و **Service Role Key**
3. ألصقها في ملف `.env`
4. شغل Migration:
   ```bash
   npx supabase migration up
   # أو انسخ محتوى supabase/migrations/001_create_tables.sql إلى SQL Editor
   ```
5. انقل البيانات:
   ```bash
   npm run seed
   # أو: curl -X POST http://localhost:3000/api/seed
   ```

## 📁 هيكل المشروع

```
mobaylik-homs/
├── app/                    # Next.js App Router
│   ├── page.tsx           # الصفحة الرئيسية
│   ├── products/          # صفحات المنتجات
│   ├── cart/              # سلة التسوق
│   ├── checkout/          # إتمام الطلب
│   ├── categories/        # الفئات
│   ├── wishlist/          # قائمة الأمنيات
│   ├── compare/           # المقارنة
│   ├── search/            # البحث
│   ├── contact/           # اتصل بنا
│   ├── about/             # من نحن
│   └── api/               # API Routes
├── components/            # المكونات
│   ├── ui/               # مكونات واجهة المستخدم
│   ├── layout/           # Header, Footer, etc.
│   ├── products/         # ProductCard, ProductGrid
│   ├── cart/             # CartItem, CartSummary
│   ├── home/             # HeroBanner, etc.
│   └── shared/           # QuickView, OrderModal
├── lib/                   # المكتبات
│   ├── supabase/         # Supabase clients
│   ├── hooks/            # Zustand stores
│   └── utils/            # Helper functions
├── data/                  # البيانات المحلية
├── scripts/              # السكريبتات الآلية
├── supabase/             # Migrations
└── types/                # TypeScript types
```

## 🚀 النشر

### على Vercel (سكريبت آلي)

```bash
bash scripts/deploy.sh
```

### يدوياً

```bash
# 1. بناء المشروع
npm run build

# 2. النشر
vercel --prod
```

## 📞 التواصل

- **الشريك:** +963 967 768 408
- **المطور:** محمد الحسين 0938626949

## 📄 الترخيص

جميع الحقوق محفوظة © 2024 موبايلك حمص
