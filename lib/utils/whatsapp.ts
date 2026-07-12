import { Order, CartItem } from '@/types';

const STORE_PHONE = process.env.NEXT_PUBLIC_STORE_WHATSAPP || '+963967768408';

export function generateWhatsAppLink(message: string): string {
  const encodedMessage = encodeURIComponent(message);
  return `https://wa.me/${STORE_PHONE.replace(/\+/g, '')}?text=${encodedMessage}`;
}

export function generateOrderMessage(order: Order): string {
  const items = order.items
    .map(
      (item, index) =>
        `${index + 1}. ${item.productName} - ${item.price.toLocaleString('ar-SY')} ل.س × ${item.quantity}`
    )
    .join('\n');

  return `🛒 طلب جديد من متجر موبايلك حمص!

👤 الاسم: ${order.customerName}
📱 الهاتف: ${order.customerPhone}
📍 العنوان: ${order.customerAddress}
🏙️ المدينة: ${order.city}

📦 المنتجات:
${items}

💰 المجموع: ${order.total.toLocaleString('ar-SY')} ل.س
💳 طريقة الدفع: ${getPaymentMethodName(order.paymentMethod)}

${order.notes ? `📝 ملاحظات: ${order.notes}` : ''}

شكراً لثقتكم بنا! ❤️`;
}

export function generateQuickOrderMessage(items: CartItem[], customerInfo: { name: string; phone: string }): string {
  const itemsList = items
    .map(
      (item, index) =>
        `${index + 1}. ${item.product.name} - ${item.product.price.toLocaleString('ar-SY')} ل.س × ${item.quantity}`
    )
    .join('\n');

  const total = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

  return `🛒 طلب سريع من متجر موبايلك حمص!

👤 الاسم: ${customerInfo.name}
📱 الهاتف: ${customerInfo.phone}

📦 المنتجات:
${itemsList}

💰 المجموع: ${total.toLocaleString('ar-SY')} ل.س

أرجو تأكيد الطلب! ❤️`;
}

function getPaymentMethodName(method: string): string {
  const methods: Record<string, string> = {
    cash: 'الدفع عند الاستلام',
    transfer: 'تحويل بنكي',
    card: 'بطاقة ائتمان',
  };
  return methods[method] || method;
}

export function openWhatsApp(message: string): void {
  const link = generateWhatsAppLink(message);
  window.open(link, '_blank', 'noopener,noreferrer');
}
