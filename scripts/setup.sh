#!/bin/bash

# ============================================================
# موبايلك حمص - سكريبت الإعداد الآلي الشامل
# يقوم بتثبيت الاعتماديات وإعداد المشروع بنقرة واحدة
# ============================================================

set -e

RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

echo -e "${BLUE}╔════════════════════════════════════════════════════════════╗${NC}"
echo -e "${BLUE}║        🚀 موبايلك حمص - سكريبت الإعداد الآلي              ║${NC}"
echo -e "${BLUE}╚════════════════════════════════════════════════════════════╝${NC}"
echo ""

# Check Node.js version
echo -e "${YELLOW}📋 التحقق من Node.js...${NC}"
if ! command -v node &> /dev/null; then
    echo -e "${RED}❌ Node.js غير مثبت. يرجى تثبيت Node.js 18+${NC}"
    exit 1
fi

NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 18 ]; then
    echo -e "${RED}❌ Node.js يجب أن يكون 18 أو أعلى. الإصدار الحالي: $(node -v)${NC}"
    exit 1
fi
echo -e "${GREEN}✅ Node.js $(node -v)${NC}"

# Check npm
echo -e "${YELLOW}📋 التحقق من npm...${NC}"
if ! command -v npm &> /dev/null; then
    echo -e "${RED}❌ npm غير مثبت${NC}"
    exit 1
fi
echo -e "${GREEN}✅ npm $(npm -v)${NC}"

# Install dependencies
echo ""
echo -e "${YELLOW}📦 تثبيت الاعتماديات...${NC}"
echo -e "${BLUE}⏳ هذا قد يستغرق بضع دقائق...${NC}"

# First try normal install
if npm install; then
    echo -e "${GREEN}✅ تم تثبيت الاعتماديات بنجاح${NC}"
else
    echo -e "${YELLOW}⚠️ حدث خطأ في التثبيت، جاري المحاولة بطريقة بديلة...${NC}"

    # Fix common issues
    echo -e "${BLUE}🔧 إصلاح المشاكل الشائعة...${NC}"

    # Remove node_modules and lock files
    rm -rf node_modules package-lock.json

    # Install with legacy peer deps
    npm install --legacy-peer-deps || {
        echo -e "${YELLOW}⚠️ المحاولة الثانية...${NC}"
        npm install --force || {
            echo -e "${RED}❌ فشل تثبيت الاعتماديات${NC}"
            exit 1
        }
    }
fi

# Install TypeScript and types if missing
echo -e "${YELLOW}📦 التحقق من TypeScript...${NC}"
if ! npx tsc --version &> /dev/null; then
    echo -e "${BLUE}🔧 تثبيت TypeScript...${NC}"
    npm install -D typescript @types/node @types/react @types/react-dom
fi
echo -e "${GREEN}✅ TypeScript جاهز${NC}"

# Create .env if not exists
echo ""
echo -e "${YELLOW}⚙️ إعداد ملف البيئة...${NC}"
if [ ! -f .env ]; then
    cp .env.example .env
    echo -e "${GREEN}✅ تم إنشاء .env من .env.example${NC}"
    echo -e "${YELLOW}⚠️ يرجى تحديث متغيرات Supabase في ملف .env${NC}"
else
    echo -e "${GREEN}✅ ملف .env موجود بالفعل${NC}"
fi

# Create necessary directories
echo -e "${YELLOW}📁 إنشاء المجلدات...${NC}"
mkdir -p public/images/products
mkdir -p public/images/categories
mkdir -p public/images/brands
mkdir -p .next
echo -e "${GREEN}✅ المجلدات جاهزة${NC}"

# Build the project
echo ""
echo -e "${YELLOW}🔨 بناء المشروع...${NC}"
if npm run build; then
    echo -e "${GREEN}✅ تم بناء المشروع بنجاح${NC}"
else
    echo -e "${YELLOW}⚠️ تحذير: هناك أخطاء في البناء${NC}"
    echo -e "${YELLOW}💡 يمكنك تشغيل 'npm run dev' للتطوير${NC}"
fi

echo ""
echo -e "${GREEN}╔════════════════════════════════════════════════════════════╗${NC}"
echo -e "${GREEN}║              ✅ تم الإعداد بنجاح!                          ║${NC}"
echo -e "${GREEN}╚════════════════════════════════════════════════════════════╝${NC}"
echo ""
echo -e "${BLUE}📋 الخطوات التالية:${NC}"
echo -e "  1. ${YELLOW}تحديث .env${NC} بمفاتيح Supabase الخاصة بك"
echo -e "  2. ${YELLOW}npm run dev${NC} لتشغيل خادم التطوير"
echo -e "  3. ${YELLOW}npm run seed${NC} لنقل البيانات إلى Supabase"
echo -e "  4. ${YELLOW}npm run deploy${NC} للنشر على Vercel"
echo ""
echo -e "${BLUE}📞 للتواصل:${NC}"
echo -e "  ${GREEN}الشريك:${NC} +963 967 768 408"
echo -e "  ${GREEN}المطور:${NC} محمد الحسين 0938626949"
echo ""
