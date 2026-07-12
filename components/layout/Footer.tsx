import Link from 'next/link';
import {
  Smartphone,
  Phone,
  MapPin,
  Mail,
  Clock,
  Facebook,
  Instagram,
  Send,
  Youtube,
  Heart,
  ExternalLink,
} from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { href: '/', label: 'الرئيسية' },
    { href: '/products', label: 'المنتجات' },
    { href: '/categories', label: 'الفئات' },
    { href: '/about', label: 'من نحن' },
    { href: '/contact', label: 'اتصل بنا' },
  ];

  const customerLinks = [
    { href: '/cart', label: 'سلة التسوق' },
    { href: '/wishlist', label: 'قائمة الأمنيات' },
    { href: '/compare', label: 'المقارنة' },
  ];

  const socialLinks = [
    { icon: Facebook, href: '#', label: 'Facebook' },
    { icon: Instagram, href: '#', label: 'Instagram' },
    { icon: Send, href: '#', label: 'Telegram' },
    { icon: Youtube, href: '#', label: 'Youtube' },
  ];

  return (
    <footer className="bg-dark-900 text-gray-300">
      {/* Main Footer */}
      <div className="container mx-auto px-4 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-primary-700 rounded-xl flex items-center justify-center">
                <Smartphone className="w-5 h-5 text-white" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-white leading-tight">
                  موبايلك <span className="text-primary-400">حمص</span>
                </h2>
              </div>
            </Link>
            <p className="text-sm text-gray-400 mb-4 leading-relaxed">
              وجهتك الأولى لشراء أحدث الهواتف الذكية في حمص. نقدم لك أفضل الماركات العالمية بأسعار تنافسية وخدمة متميزة.
            </p>
            <div className="flex items-center gap-2">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-lg bg-dark-800 flex items-center justify-center
                    hover:bg-primary-600 hover:text-white transition-all duration-200"
                  aria-label={social.label}
                >
                  <social.icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-bold mb-4 text-sm uppercase tracking-wider">روابط سريعة</h3>
            <ul className="space-y-2.5">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-400 hover:text-primary-400 transition-colors flex items-center gap-2"
                  >
                    <span className="w-1 h-1 rounded-full bg-gray-600" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h3 className="text-white font-bold mb-4 text-sm uppercase tracking-wider">خدمة العملاء</h3>
            <ul className="space-y-2.5">
              {customerLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-400 hover:text-primary-400 transition-colors flex items-center gap-2"
                  >
                    <span className="w-1 h-1 rounded-full bg-gray-600" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-white font-bold mb-4 text-sm uppercase tracking-wider">تواصل معنا</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <Phone className="w-4 h-4 text-primary-400 mt-0.5 shrink-0" />
                <div>
                  <p className="text-sm text-gray-300 font-medium">الهاتف</p>
                  <a href="tel:+963967768408" className="text-sm text-gray-400 hover:text-primary-400 transition-colors" dir="ltr">
                    +963 967 768 408
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-primary-400 mt-0.5 shrink-0" />
                <div>
                  <p className="text-sm text-gray-300 font-medium">الموقع</p>
                  <p className="text-sm text-gray-400">حمص، سوريا</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Clock className="w-4 h-4 text-primary-400 mt-0.5 shrink-0" />
                <div>
                  <p className="text-sm text-gray-300 font-medium">ساعات العمل</p>
                  <p className="text-sm text-gray-400">السبت - الخميس: 9 ص - 9 م</p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Developer Banner */}
      <div className="bg-primary-600/10 border-t border-primary-600/20">
        <div className="container mx-auto px-4 py-3">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-2 text-center">
            <span className="text-sm text-primary-300">
              إذا أردت متجراً مشابهاً ومتكاملاً تواصل معنا:
            </span>
            <a
              href="tel:0938626949"
              className="inline-flex items-center gap-1.5 text-sm font-bold text-primary-400 hover:text-primary-300 transition-colors"
            >
              <Phone className="w-3.5 h-3.5" />
              محمد الحسين 0938626949
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-dark-800">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-gray-500">
            <p className="flex items-center gap-1">
              تم التطوير بـ <Heart className="w-3 h-3 text-red-500 fill-red-500" /> في حمص
            </p>
            <p>© {currentYear} موبايلك حمص. جميع الحقوق محفوظة.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
