#!/bin/bash

# ============================================================
# موبايلك حمص - سكريبت النشر على Vercel
# ============================================================

set -e

RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

echo -e "${BLUE}╔════════════════════════════════════════════════════════════╗${NC}"
echo -e "${BLUE}║        🚀 سكريبت النشر على Vercel                         ║${NC}"
echo -e "${BLUE}╚════════════════════════════════════════════════════════════╝${NC}"
echo ""

# Check if Vercel CLI is installed
if ! command -v vercel &> /dev/null; then
    echo -e "${YELLOW}📦 تثبيت Vercel CLI...${NC}"
    npm install -g vercel
fi

# Check if git is initialized
if [ ! -d .git ]; then
    echo -e "${YELLOW}📦 تهيئة Git...${NC}"
    git init
    git add .
    git commit -m "Initial commit: mobaylik-homs v2.0"
fi

# Build check
echo -e "${YELLOW}🔨 التحقق من البناء...${NC}"
if ! npm run build; then
    echo -e "${RED}❌ فشل البناء. يرجى إصلاح الأخطاء أولاً.${NC}"
    exit 1
fi
echo -e "${GREEN}✅ البناء ناجح${NC}"

# Deploy
echo ""
echo -e "${YELLOW}🚀 جاري النشر...${NC}"
vercel --prod

echo ""
echo -e "${GREEN}╔════════════════════════════════════════════════════════════╗${NC}"
echo -e "${GREEN}║              ✅ تم النشر بنجاح!                            ║${NC}"
echo -e "${GREEN}╚════════════════════════════════════════════════════════════╝${NC}"
