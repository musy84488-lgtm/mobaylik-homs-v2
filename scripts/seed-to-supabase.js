#!/usr/bin/env node

/**
 * موبايلك حمص - سكريبت نقل البيانات إلى Supabase
 * يقوم بنقل جميع البيانات المحلية إلى قاعدة بيانات Supabase
 * 
 * الاستخدام: node scripts/seed-to-supabase.js
 * أو: npm run seed
 */

const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');

// Colors for console output
const colors = {
  reset: '\x1b[0m',
  red: '\x1b[0;31m',
  green: '\x1b[0;32m',
  yellow: '\x1b[1;33m',
  blue: '\x1b[0;34m',
  cyan: '\x1b[0;36m',
};

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

function logHeader(title) {
  console.log('');
  log('╔════════════════════════════════════════════════════════════╗', 'blue');
  log(`║        ${title.padEnd(48)}║`, 'blue');
  log('╚════════════════════════════════════════════════════════════╝', 'blue');
  console.log('');
}

async function main() {
  logHeader('🚀 نقل البيانات إلى Supabase');

  // Load environment variables
  const envPath = path.join(process.cwd(), '.env');
  if (fs.existsSync(envPath)) {
    const envContent = fs.readFileSync(envPath, 'utf-8');
    envContent.split('\n').forEach((line) => {
      const [key, value] = line.split('=');
      if (key && value && !process.env[key.trim()]) {
        process.env[key.trim()] = value.trim();
      }
    });
  }

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseKey) {
    log('❌ خطأ: متغيرات Supabase غير محددة في .env', 'red');
    log('   يرجى تعيين:', 'yellow');
    log('   NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co', 'cyan');
    log('   SUPABASE_SERVICE_ROLE_KEY=your-service-role-key', 'cyan');
    process.exit(1);
  }

  log(`🔗 الاتصال بـ Supabase: ${supabaseUrl}`, 'blue');

  const supabase = createClient(supabaseUrl, supabaseKey, {
    auth: { autoRefreshToken: false, persistSession: false },
  });

  // Test connection
  log('🧪 اختبار الاتصال...', 'yellow');
  const { error: testError } = await supabase.from('categories').select('count', { count: 'exact', head: true });

  if (testError && testError.code !== 'PGRST116') {
    log(`❌ خطأ في الاتصال: ${testError.message}`, 'red');
    log('💡 تأكد من:', 'yellow');
    log('   1. أن جداول قاعدة البيانات موجودة (شغل migration أولاً)', 'cyan');
    log('   2. أن مفتاح الخدمة (Service Role Key) صحيح', 'cyan');
    process.exit(1);
  }

  log('✅ الاتصال ناجح!', 'green');

  // Load data
  log('📂 تحميل البيانات المحلية...', 'yellow');

  // We need to require the TypeScript files - for simplicity, we'll inline the data
  // In production, you would compile the TS files first

  const categories = [
    { id: 'c001', name: 'آيفون', slug: 'iphone', description: 'أحدث هواتف Apple iPhone بجميع الموديلات والألوان', image: 'https://images.unsplash.com/photo-1696446701796-da61225697cc?w=400&h=300&fit=crop', icon: 'Smartphone', product_count: 6, parent_id: null, is_active: true, sort_order: 1 },
    { id: 'c002', name: 'سامسونج', slug: 'samsung', description: 'هواتف Samsung Galaxy بجميع الفئات', image: 'https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=400&h=300&fit=crop', icon: 'Smartphone', product_count: 8, parent_id: null, is_active: true, sort_order: 2 },
    { id: 'c003', name: 'شاومي', slug: 'xiaomi', description: 'هواتف Xiaomi و Redmi و Poco', image: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=400&h=300&fit=crop', icon: 'Smartphone', product_count: 4, parent_id: null, is_active: true, sort_order: 3 },
    { id: 'c004', name: 'جوجل', slug: 'google', description: 'هواتف Google Pixel', image: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=400&h=300&fit=crop', icon: 'Smartphone', product_count: 2, parent_id: null, is_active: true, sort_order: 4 },
    { id: 'c005', name: 'ون بلس', slug: 'oneplus', description: 'هواتف OnePlus', image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&h=300&fit=crop', icon: 'Smartphone', product_count: 2, parent_id: null, is_active: true, sort_order: 5 },
    { id: 'c006', name: 'أخرى', slug: 'others', description: 'هواتف من علامات تجارية أخرى', image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&h=300&fit=crop', icon: 'Smartphone', product_count: 2, parent_id: null, is_active: true, sort_order: 6 },
  ];

  log(`📊 ${categories.length} فئة جاهزة للنقل`, 'cyan');

  // Seed categories
  log('📤 جاري نقل الفئات...', 'yellow');
  const { error: catError } = await supabase.from('categories').upsert(categories, { onConflict: 'id' });
  if (catError) {
    log(`❌ خطأ في نقل الفئات: ${catError.message}`, 'red');
    log(`   الكود: ${catError.code}`, 'red');
  } else {
    log(`✅ تم نقل ${categories.length} فئة بنجاح`, 'green');
  }

  // For products, we'll create a simplified version
  // In practice, you'd want to compile the TS files or use ts-node
  log('', 'reset');
  log('⚠️ ملاحظة: لنقل المنتجات، يجب تشغيل API endpoint:', 'yellow');
  log('   curl -X POST http://localhost:3000/api/seed', 'cyan');
  log('   أو بعد النشر:', 'yellow');
  log('   curl -X POST https://your-domain.vercel.app/api/seed', 'cyan');
  log('', 'reset');

  logHeader('✅ اكتمل النقل الجزئي');
  log('📋 تم نقل الفئات بنجاح', 'green');
  log('📋 استخدم API endpoint لنقل المنتجات الكاملة', 'yellow');
  log('', 'reset');
  log('🎯 الخطوات التالية:', 'blue');
  log('   1. npm run dev', 'cyan');
  log('   2. curl -X POST http://localhost:3000/api/seed', 'cyan');
  log('   3. افحص البيانات في لوحة Supabase', 'cyan');
}

main().catch((error) => {
  log(`❌ خطأ غير متوقع: ${error.message}`, 'red');
  process.exit(1);
});
