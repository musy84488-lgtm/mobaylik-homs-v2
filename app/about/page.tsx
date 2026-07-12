import { Phone, Award, Users, Smartphone, Heart, CheckCircle } from 'lucide-react';
import { Phone, motion } from 'framer-motion';

export default function AboutPage() {
  const values = [
    { icon: Smartphone, title: 'منتجات أصلية', desc: 'نضمن لك أن جميع منتجاتنا أصلية 100% مع ضمان المصنع' },
    { icon: Heart, title: 'خدمة متميزة', desc: 'نقدم لك تجربة تسوق سلسة مع دعم فني على مدار الساعة' },
    { icon: Award, title: 'أفضل الأسعار', desc: 'نسعى دائماً لتقديم أفضل الأسعار التنافسية في السوق' },
    { icon: Users, title: 'ثقة العملاء', desc: 'آلاف العملاء السعداء يثقون بنا منذ سنوات' },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Hero */}
      <div className="text-center mb-16">
        <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-3xl lg:text-5xl font-bold text-gray-900 mb-4">
          موبايلك <span className="text-primary-600">حمص</span>
        </motion.h1>
        <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="text-gray-500 max-w-2xl mx-auto text-lg">
          وجهتك الأولى لشراء أحدث الهواتف الذكية في حمص. نقدم لك أفضل الماركات العالمية بأسعار تنافسية وخدمة متميزة.
        </motion.p>
      </div>

      {/* Story */}
      <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="max-w-3xl mx-auto mb-16">
        <div className="bg-white rounded-2xl border border-gray-100 p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">قصتنا</h2>
          <p className="text-gray-600 leading-relaxed mb-4">
            بدأنا رحلتنا في مدينة حمص بهدف واحد: تقديم أفضل الهواتف الذكية للعملاء بأسعار مناسبة وجودة عالية.
            نؤمن بأن الجميع يستحق الحصول على أحدث التقنيات بأسعار تنافسية.
          </p>
          <p className="text-gray-600 leading-relaxed">
            نعمل مع شركائنا من الموزعين المعتمدين لضمان وصول منتجات أصلية 100% مع ضمان كامل.
            فريقنا متخصص وملتزم بتقديم أفضل تجربة تسوق ممكنة.
          </p>
        </div>
      </motion.div>

      {/* Values */}
      <div className="mb-16">
        <h2 className="text-2xl font-bold text-gray-900 text-center mb-8">قيمنا</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {values.map((value, index) => (
            <motion.div
              key={value.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-2xl border border-gray-100 p-6 text-center hover:shadow-card transition-all"
            >
              <div className="w-14 h-14 rounded-xl bg-primary-50 flex items-center justify-center mx-auto mb-4">
                <value.icon className="w-7 h-7 text-primary-600" />
              </div>
              <h3 className="font-bold text-gray-900 mb-2">{value.title}</h3>
              <p className="text-sm text-gray-500">{value.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Why Choose Us */}
      <div className="max-w-3xl mx-auto mb-16">
        <h2 className="text-2xl font-bold text-gray-900 text-center mb-8">لماذا تختارنا؟</h2>
        <div className="space-y-3">
          {[
            'منتجات أصلية 100% مع ضمان المصنع',
            'أسعار تنافسية وعروض حصرية',
            'شحن سريع وتوصيل في نفس اليوم',
            'دعم فني متخصص على مدار الساعة',
            'سياسة إرجاع مرنة خلال 7 أيام',
            'طرق دفع متعددة وآمنة',
          ].map((item, index) => (
            <motion.div
              key={item}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              className="flex items-center gap-3 p-3 bg-white rounded-xl border border-gray-100"
            >
              <CheckCircle className="w-5 h-5 text-green-500 shrink-0" />
              <span className="text-gray-700">{item}</span>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Developer Banner */}
      <div className="bg-gradient-to-r from-primary-600 to-primary-700 rounded-2xl p-8 text-center text-white">
        <h2 className="text-2xl font-bold mb-2">هل تريد متجراً مشابهاً؟</h2>
        <p className="text-white/80 mb-4">نقدم خدمات تطوير المتاجر الإلكترونية بأعلى معايير الجودة</p>
        <a href="tel:0938626949" className="inline-flex items-center gap-2 px-6 py-3 bg-white text-primary-600 rounded-xl font-bold hover:bg-gray-100 transition-colors">
          <Phone className="w-5 h-5" />
          تواصل معنا: محمد الحسين 0938626949
        </a>
      </div>
    </div>
  );
}
