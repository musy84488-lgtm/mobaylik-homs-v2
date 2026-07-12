#!/usr/bin/env node

/**
 * موبايلك حمص - سكريبت المزامنة التلقائية
 * يقوم بمزامنة البيانات المحلية مع Supabase تلقائياً
 * 
 * الاستخدام: node scripts/sync-local-to-supabase.js
 * أو: npm run sync-db
 */

const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');

const colors = {
  reset: '\x1b[0m', red: '\x1b[0;31m', green: '\x1b[0;32m',
  yellow: '\x1b[1;33m', blue: '\x1b[0;34m', cyan: '\x1b[0;36m',
};

function log(m, c = 'reset') { console.log(`${colors[c]}${m}${colors.reset}`); }

async function main() {
  log('╔════════════════════════════════════════════════════════════╗', 'blue');
  log('║        🔄 مزامنة البيانات مع Supabase                     ║', 'blue');
  log('╚════════════════════════════════════════════════════════════╝', 'blue');
  console.log('');

  // Load .env
  const envPath = path.join(process.cwd(), '.env');
  if (fs.existsSync(envPath)) {
    fs.readFileSync(envPath, 'utf-8').split('\n').forEach((line) => {
      const [k, v] = line.split('=');
      if (k && v && !process.env[k.trim()]) process.env[k.trim()] = v.trim();
    });
  }

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !key) {
    log('❌ يرجى تعيين NEXT_PUBLIC_SUPABASE_URL و SUPABASE_SERVICE_ROLE_KEY', 'red');
    process.exit(1);
  }

  const supabase = createClient(url, key, { auth: { autoRefreshToken: false, persistSession: false } });

  // Check tables exist
  log('🔍 التحقق من الجداول...', 'yellow');
  const tables = ['categories', 'products', 'orders', 'reviews'];
  for (const table of tables) {
    const { error } = await supabase.from(table).select('count', { count: 'exact', head: true });
    if (error && error.code === '42P01') {
      log(`❌ جدول ${table} غير موجود! شغل migration أولاً.`, 'red');
      process.exit(1);
    }
  }
  log('✅ جميع الجداول موجودة', 'green');

  // Sync categories
  log('📤 مزامنة الفئات...', 'yellow');
  const cats = [
    { id: 'c001', name: 'آيفون', slug: 'iphone', description: 'أحدث هواتف Apple', image: 'https://images.unsplash.com/photo-1696446701796-da61225697cc?w=400&h=300&fit=crop', product_count: 6, is_active: true, sort_order: 1 },
    { id: 'c002', name: 'سامسونج', slug: 'samsung', description: 'هواتف Samsung Galaxy', image: 'https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=400&h=300&fit=crop', product_count: 8, is_active: true, sort_order: 2 },
    { id: 'c003', name: 'شاومي', slug: 'xiaomi', description: 'هواتف Xiaomi', image: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=400&h=300&fit=crop', product_count: 4, is_active: true, sort_order: 3 },
    { id: 'c004', name: 'جوجل', slug: 'google', description: 'هواتف Google Pixel', image: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=400&h=300&fit=crop', product_count: 2, is_active: true, sort_order: 4 },
    { id: 'c005', name: 'ون بلس', slug: 'oneplus', description: 'هواتف OnePlus', image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&h=300&fit=crop', product_count: 2, is_active: true, sort_order: 5 },
    { id: 'c006', name: 'أخرى', slug: 'others', description: 'علامات تجارية أخرى', image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&h=300&fit=crop', product_count: 2, is_active: true, sort_order: 6 },
  ];

  const { error: catErr } = await supabase.from('categories').upsert(cats, { onConflict: 'id' });
  if (catErr) log(`⚠️ فئات: ${catErr.message}`, 'yellow');
  else log(`✅ ${cats.length} فئة تمت المزامنة`, 'green');

  log('', 'reset');
  log('✅ اكتملت المزامنة!', 'green');
  log('💡 لنقل المنتجات الكاملة، استخدم API endpoint /api/seed', 'cyan');
}

main().catch((e) => { log(`❌ ${e.message}`, 'red'); process.exit(1); });
