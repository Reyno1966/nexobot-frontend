import Link from "next/link";

export default function HomeAR() {
  return (
    <main dir="rtl" lang="ar" className="min-h-screen bg-white text-gray-900">
      {/* Navbar */}
      <nav className="max-w-6xl mx-auto px-6 py-5 flex items-center justify-between">
        <Link href="/ar" className="text-2xl font-extrabold text-blue-600">NexoBot</Link>
        <div className="flex items-center gap-4">
          <a href="#pricing" className="text-sm font-medium text-gray-600 hover:text-blue-600 transition">الأسعار</a>
          <a href="#faq" className="text-sm font-medium text-gray-600 hover:text-blue-600 transition">الأسئلة الشائعة</a>
          <Link href="/auth/login" className="text-sm font-medium text-gray-700 hover:text-blue-600 transition">تسجيل الدخول</Link>
          <Link href="/auth/signup" className="px-4 py-2 bg-blue-600 text-white text-sm font-semibold rounded-lg hover:bg-blue-700 transition">ابدأ مجاناً</Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="max-w-4xl mx-auto px-6 py-24 text-center">
        <span className="inline-block bg-blue-100 text-blue-700 text-xs font-semibold px-3 py-1 rounded-full mb-6 uppercase tracking-wide">
          الذكاء الاصطناعي للمبيعات ودعم العملاء
        </span>
        <h1 className="text-5xl font-extrabold leading-tight mb-6">
          أتمتة مبيعاتك ودعم العملاء مع NexoBot
        </h1>
        <p className="text-xl text-gray-600 mb-10">
          يدير NexoBot عملاءك المحتملين، ويرد على العملاء، ويعزز مبيعاتك على مدار الساعة — بينما تركز أنت على ما يهم حقاً.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/auth/signup" className="px-8 py-4 bg-blue-600 text-white text-lg font-semibold rounded-xl hover:bg-blue-700 transition shadow-lg">
            ابدأ مجاناً
          </Link>
          <a href="#pricing" className="px-8 py-4 border border-gray-300 text-gray-700 text-lg font-semibold rounded-xl hover:border-blue-600 hover:text-blue-600 transition">
            عرض الأسعار
          </a>
        </div>
        <p className="mt-4 text-sm text-gray-500">لا يلزم وجود بطاقة ائتمانية</p>
      </section>

      {/* Features */}
      <section className="bg-gray-50 py-20">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-extrabold text-center mb-4">لماذا تختار NexoBot؟</h2>
          <p className="text-center text-gray-500 mb-14 max-w-2xl mx-auto">
            كل ما تحتاجه لأتمتة أعمالك وتقديم تجربة عملاء استثنائية.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
              <div className="text-3xl mb-4">🤖</div>
              <h3 className="text-xl font-bold mb-2">ذكاء اصطناعي محادثي</h3>
              <p className="text-gray-600">يرد تلقائياً على الأسئلة المتكررة ويؤهل عملاءك المحتملين في الوقت الفعلي، على مدار الساعة طوال أيام الأسبوع.</p>
            </div>
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
              <div className="text-3xl mb-4">📈</div>
              <h3 className="text-xl font-bold mb-2">تعزيز المبيعات</h3>
              <p className="text-gray-600">حوّل المزيد من الزوار إلى عملاء من خلال محادثات مخصصة ومتابعة تلقائية.</p>
            </div>
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
              <div className="text-3xl mb-4">🔗</div>
              <h3 className="text-xl font-bold mb-2">تكاملات سهلة</h3>
              <p className="text-gray-600">اربط NexoBot بأدواتك الحالية: CRM، البريد الإلكتروني، واتساب، سلاك والمزيد.</p>
            </div>
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
              <div className="text-3xl mb-4">📊</div>
              <h3 className="text-xl font-bold mb-2">التحليلات والتقارير</h3>
              <p className="text-gray-600">تتبع أداء بوتك باستخدام لوحات تحكم بديهية وتقارير مفصلة.</p>
            </div>
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
              <div className="text-3xl mb-4">🛡️</div>
              <h3 className="text-xl font-bold mb-2">الأمان والامتثال</h3>
              <p className="text-gray-600">بياناتك محمية بتشفير كامل من طرف إلى طرف وامتثال تام للوائح حماية البيانات.</p>
            </div>
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
              <div className="text-3xl mb-4">⚡</div>
              <h3 className="text-xl font-bold mb-2">إعداد سريع</h3>
              <p className="text-gray-600">أطلق بوتك في أقل من 10 دقائق دون الحاجة إلى أي خبرة تقنية.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-20">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-extrabold text-center mb-4">أسعار بسيطة وشفافة</h2>
          <p className="text-center text-gray-500 mb-14 max-w-2xl mx-auto">
            اختر الخطة التي تناسب احتياجاتك. غيّر أو ألغِ في أي وقت.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Starter */}
            <div className="rounded-2xl border border-gray-200 p-8 flex flex-col">
              <h3 className="text-xl font-bold mb-2">المبتدئ</h3>
              <p className="text-gray-500 text-sm mb-6">مثالي للمستقلين والفرق الصغيرة.</p>
              <div className="text-4xl font-extrabold mb-1">$29<span className="text-lg font-medium text-gray-500">/شهر</span></div>
              <ul className="mt-6 mb-8 space-y-3 text-sm text-gray-700 flex-1">
                <li>✅ بوت نشط واحد</li>
                <li>✅ حتى 500 محادثة/شهر</li>
                <li>✅ تكاملات أساسية</li>
                <li>✅ دعم عبر البريد الإلكتروني</li>
              </ul>
              <Link href="/auth/signup?priceId=price_1T18BGRap0JkQNsmaUVhyNFr" className="block text-center px-6 py-3 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition">
                ابدأ الآن
              </Link>
            </div>
            {/* Pro */}
            <div className="rounded-2xl border-2 border-blue-600 p-8 flex flex-col relative shadow-lg">
              <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-blue-600 text-white text-xs font-bold px-4 py-1 rounded-full">الأكثر شعبية</span>
              <h3 className="text-xl font-bold mb-2">الاحترافي</h3>
              <p className="text-gray-500 text-sm mb-6">للشركات النامية.</p>
              <div className="text-4xl font-extrabold mb-1">$59<span className="text-lg font-medium text-gray-500">/شهر</span></div>
              <ul className="mt-6 mb-8 space-y-3 text-sm text-gray-700 flex-1">
                <li>✅ 5 بوتات نشطة</li>
                <li>✅ حتى 5,000 محادثة/شهر</li>
                <li>✅ تكاملات متقدمة</li>
                <li>✅ دعم ذو أولوية</li>
                <li>✅ تحليلات مفصلة</li>
              </ul>
              <Link href="/auth/signup?priceId=price_1T15gVRap0JkQNsm59vukMuR" className="block text-center px-6 py-3 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition">
                ابدأ الآن
              </Link>
            </div>
            {/* Premium */}
            <div className="rounded-2xl border border-gray-200 p-8 flex flex-col">
              <h3 className="text-xl font-bold mb-2">المميز</h3>
              <p className="text-gray-500 text-sm mb-6">للشركات الكبيرة ذات الاحتياجات المتقدمة.</p>
              <div className="text-4xl font-extrabold mb-1">$99<span className="text-lg font-medium text-gray-500">/شهر</span></div>
              <ul className="mt-6 mb-8 space-y-3 text-sm text-gray-700 flex-1">
                <li>✅ بوتات غير محدودة</li>
                <li>✅ محادثات غير محدودة</li>
                <li>✅ جميع التكاملات</li>
                <li>✅ دعم مخصص 24/7</li>
                <li>✅ تخصيص متقدم</li>
                <li>✅ اتفاقية مستوى الخدمة مضمونة</li>
              </ul>
              <Link href="/auth/signup?priceId=price_1T15jDRap0JkQNsmQRvEkpcm" className="block text-center px-6 py-3 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition">
                ابدأ الآن
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Additional Services */}
      <section className="bg-gray-50 py-20">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-extrabold text-center mb-4">خدمات إضافية</h2>
          <p className="text-center text-gray-500 mb-14 max-w-2xl mx-auto">
            عزز تجربتك مع NexoBot بخدماتنا التكميلية.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-2xl border border-gray-200 p-8 flex flex-col">
              <div className="text-3xl mb-4">🎨</div>
              <h3 className="text-xl font-bold mb-2">التخصيص المتقدم</h3>
              <p className="text-gray-600 mb-6 flex-1">اضبط مظهر وسلوك بوتك ليعكس هوية علامتك التجارية.</p>
              <div className="text-2xl font-extrabold mb-4">$99</div>
              <Link href="/auth/signup?priceId=price_1T161uRap0JkQNsm3BJZGOEu" className="block text-center px-6 py-3 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition">
                اعرف المزيد
              </Link>
            </div>
            <div className="bg-white rounded-2xl border border-gray-200 p-8 flex flex-col">
              <div className="text-3xl mb-4">⚙️</div>
              <h3 className="text-xl font-bold mb-2">الأتمتة المتقدمة</h3>
              <p className="text-gray-600 mb-6 flex-1">أنشئ سير عمل معقدة وأتمتة لتحسين عمليات أعمالك.</p>
              <div className="text-2xl font-extrabold mb-4">$149</div>
              <Link href="/auth/signup?priceId=price_1T163sRap0JkQNsmOrHBQuJp" className="block text-center px-6 py-3 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition">
                اعرف المزيد
              </Link>
            </div>
            <div className="bg-white rounded-2xl border border-gray-200 p-8 flex flex-col">
              <div className="text-3xl mb-4">🔌</div>
              <h3 className="text-xl font-bold mb-2">التكاملات الخارجية</h3>
              <p className="text-gray-600 mb-6 flex-1">اربط NexoBot بأنظمتك الداخلية وأدوات الطرف الثالث بتكاملات مخصصة.</p>
              <div className="text-2xl font-extrabold mb-4">$199</div>
              <Link href="/auth/signup?priceId=price_1T166cRap0JkQNsmuPTOPBBu" className="block text-center px-6 py-3 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition">
                اعرف المزيد
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-20">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="text-3xl font-extrabold text-center mb-14">الأسئلة الشائعة</h2>
          <div className="space-y-8">
            <div>
              <h3 className="text-lg font-bold mb-2">كيف يعمل NexoBot؟</h3>
              <p className="text-gray-600">يستخدم NexoBot الذكاء الاصطناعي لتحليل رسائل عملائك والرد عليها تلقائياً بطريقة طبيعية وملائمة، على مدار الساعة.</p>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-2">هل يمكنني تجربة NexoBot مجاناً؟</h3>
              <p className="text-gray-600">نعم! يمكنك البدء بفترة تجريبية مجانية دون الحاجة لبطاقة ائتمانية. استكشف جميع الميزات قبل الالتزام.</p>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-2">ما المنصات المدعومة؟</h3>
              <p className="text-gray-600">يتكامل NexoBot مع موقعك الإلكتروني، واتساب، فيسبوك ماسنجر، إنستغرام، سلاك والعديد من المنصات الأخرى.</p>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-2">هل يمكنني تغيير خطتي في أي وقت؟</h3>
              <p className="text-gray-600">بالتأكيد. يمكنك ترقية أو تخفيض خطتك في أي وقت من لوحة التحكم، دون رسوم خفية.</p>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-2">هل بياناتي آمنة؟</h3>
              <p className="text-gray-600">الأمان هو أولويتنا القصوى. جميع البيانات مشفرة ونحن ملتزمون بلوائح حماية البيانات. لا يتم مشاركة معلوماتك مع أي طرف ثالث.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="bg-blue-600 py-20">
        <div className="max-w-3xl mx-auto px-6 text-center text-white">
          <h2 className="text-3xl font-extrabold mb-4">هل أنت مستعد لتحويل أعمالك؟</h2>
          <p className="text-blue-100 mb-8 text-lg">
            انضم إلى آلاف الشركات التي تستخدم NexoBot لأتمتة نموها.
          </p>
          <Link href="/auth/signup" className="inline-block px-10 py-4 bg-white text-blue-600 text-lg font-bold rounded-xl hover:bg-blue-50 transition shadow-lg">
            ابدأ مجاناً
          </Link>
          <p className="mt-4 text-blue-200 text-sm">لا يلزم وجود بطاقة ائتمانية · إلغاء في أي وقت</p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-12">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div>
              <Link href="/ar" className="text-xl font-extrabold text-white">NexoBot</Link>
              <p className="text-sm mt-1">أتمتة مبيعاتك ودعم عملائك.</p>
            </div>
            <div className="flex gap-6 text-sm">
              <a href="#pricing" className="hover:text-white transition">الأسعار</a>
              <a href="#faq" className="hover:text-white transition">الأسئلة الشائعة</a>
              <Link href="/auth/login" className="hover:text-white transition">تسجيل الدخول</Link>
              <Link href="/auth/signup" className="hover:text-white transition">إنشاء حساب</Link>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-xs">
            <p>&copy; {new Date().getFullYear()} NexoBot. جميع الحقوق محفوظة.</p>
          </div>
        </div>
      </footer>
    </main>
  );
}
