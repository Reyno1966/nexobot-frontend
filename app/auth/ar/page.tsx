export default function HomeAR() {
  return (
    <main className="bg-white text-gray-900" dir="rtl">

      {/* HERO */}
      <section className="py-32 px-6 text-center max-w-4xl mx-auto">
        <h1 className="text-5xl font-extrabold leading-tight">
          قم بأتمتة المبيعات وخدمة العملاء مع{" "}
          <span className="text-blue-600">NexoBot</span>
        </h1>

        <p className="mt-6 text-lg text-gray-600">
          مساعدك الذكي الذي يجيب على العملاء، ويولد المبيعات، ويعمل من أجلك
          على مدار الساعة. وفر الوقت، وزد أرباحك، ووسع عملك بسهولة.
        </p>

        <div className="mt-10 flex justify-center gap-4">
          <a
            href="/en"
            className="px-10 py-4 bg-blue-600 text-white rounded-xl font-semibold shadow-md hover:bg-blue-700 transition-all"
          >
            ابدأ الآن
          </a>

          <a
            href="#how"
            className="px-10 py-4 bg-white border border-gray-300 rounded-xl font-semibold hover:bg-gray-100 transition-all"
          >
            شاهد كيف يعمل
          </a>
        </div>
      </section>

      {/* INTRO */}
      <section className="py-20 px-6 text-center max-w-3xl mx-auto">
        <h2 className="text-4xl font-bold">
          كل ما تحتاجه لأتمتة عملك
        </h2>

        <p className="mt-6 text-gray-600 text-lg">
          يجمع NexoBot بين الذكاء الاصطناعي والأتمتة والتواصل متعدد القنوات
          لمساعدتك على خدمة المزيد من العملاء وإغلاق المزيد من المبيعات دون جهد.
        </p>
      </section>

      {/* FEATURES */}
      <section className="py-20 px-6 max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10">

        <div className="p-8 border rounded-2xl shadow-sm hover:shadow-md transition">
          <h3 className="text-xl font-bold mb-3">ردود تلقائية 24/7</h3>
          <p className="text-gray-600">
            يجيب NexoBot على العملاء في الوقت الفعلي — حتى أثناء نومك.
          </p>
        </div>

        <div className="p-8 border rounded-2xl shadow-sm hover:shadow-md transition">
          <h3 className="text-xl font-bold mb-3">توليد المبيعات</h3>
          <p className="text-gray-600">
            حوّل المحادثات إلى مبيعات عبر رسائل ذكية وشخصية.
          </p>
        </div>

        <div className="p-8 border rounded-2xl shadow-sm hover:shadow-md transition">
          <h3 className="text-xl font-bold mb-3">متعدد القنوات</h3>
          <p className="text-gray-600">
            واتساب، إنستغرام، فيسبوك، والموقع — كل ذلك في مكان واحد.
          </p>
        </div>

      </section>

      {/* PRICING */}
      <section className="py-24 px-6 bg-gray-50" id="pricing">
        <h2 className="text-4xl font-bold text-center mb-16">
          اختر الخطة المناسبة لعملك
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-6xl mx-auto">

          {/* BASIC */}
          <div className="p-10 bg-white border rounded-2xl shadow-sm hover:shadow-md transition">
            <h3 className="text-2xl font-bold mb-4">الخطة الأساسية</h3>
            <p className="text-gray-600 mb-6">
              مثالية للشركات الصغيرة التي ترغب في البدء بالأتمتة.
            </p>
            <p className="text-4xl font-extrabold mb-6">19€<span className="text-lg">/شهريًا</span></p>

            <ul className="text-gray-600 space-y-3 mb-8">
              <li>✔ ردود تلقائية 24/7</li>
              <li>✔ حتى 500 رسالة شهريًا</li>
              <li>✔ قناة واحدة متصلة</li>
              <li>✔ دعم أساسي</li>
            </ul>

            <a
              href="/en"
              className="block text-center px-8 py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition"
            >
              ابدأ الآن
            </a>
          </div>

          {/* PRO */}
          <div className="p-10 bg-white border-2 border-blue-600 rounded-2xl shadow-md hover:shadow-lg transition">
            <h3 className="text-2xl font-bold mb-4">الخطة الاحترافية</h3>
            <p className="text-gray-600 mb-6">
              مثالية للشركات التي ترغب في التوسع وزيادة المبيعات.
            </p>
            <p className="text-4xl font-extrabold mb-6">49€<span className="text-lg">/شهريًا</span></p>

            <ul className="text-gray-600 space-y-3 mb-8">
              <li>✔ ردود تلقائية متقدمة</li>
              <li>✔ رسائل غير محدودة</li>
              <li>✔ 3 قنوات متصلة</li>
              <li>✔ أتمتة ذكية</li>
              <li>✔ دعم أولوية</li>
            </ul>

            <a
              href="/en"
              className="block text-center px-8 py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition"
            >
              اختر الاحترافية
            </a>
          </div>

          {/* ENTERPRISE */}
          <div className="p-10 bg-white border rounded-2xl shadow-sm hover:shadow-md transition">
            <h3 className="text-2xl font-bold mb-4">خطة الشركات</h3>
            <p className="text-gray-600 mb-6">
              للشركات التي تحتاج إلى حلول مخصصة وقابلية توسع كاملة.
            </p>
            <p className="text-4xl font-extrabold mb-6">99€<span className="text-lg">/شهريًا</span></p>

            <ul className="text-gray-600 space-y-3 mb-8">
              <li>✔ جميع ميزات الخطة الاحترافية</li>
              <li>✔ قنوات غير محدودة</li>
              <li>✔ أتمتة متقدمة</li>
              <li>✔ دعم مخصص</li>
              <li>✔ تكاملات مخصصة</li>
            </ul>

            <a
              href="/en"
              className="block text-center px-8 py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition"
            >
              تواصل معنا
            </a>
          </div>

        </div>
      </section>

      {/* EXTRA SERVICES */}
      <section className="py-24 px-6 max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-16">
          الخدمات الإضافية
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">

          <div className="p-8 border rounded-2xl shadow-sm hover:shadow-md transition">
            <h3 className="text-xl font-bold mb-3">إعداد واتساب</h3>
            <p className="text-gray-600 mb-4">
              إعداد كامل لقناة WhatsApp Business API الخاصة بك.
            </p>
            <p className="font-bold text-blue-600">49€ دفعة واحدة</p>
          </div>

          <div className="p-8 border rounded-2xl shadow-sm hover:shadow-md transition">
            <h3 className="text-xl font-bold mb-3">إنشاء شات بوت مخصص</h3>
            <p className="text-gray-600 mb-4">
              نقوم ببناء شات بوت مصمم خصيصًا لعملك.
            </p>
            <p className="font-bold text-blue-600">99€ دفعة واحدة</p>
          </div>

          <div className="p-8 border rounded-2xl shadow-sm hover:shadow-md transition">
            <h3 className="text-xl font-bold mb-3">دمج الموقع الإلكتروني</h3>
            <p className="text-gray-600 mb-4">
              نقوم بدمج NexoBot في موقعك بطريقة احترافية.
            </p>
            <p className="font-bold text-blue-600">39€ دفعة واحدة</p>
          </div>

        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="py-24 px-6 bg-gray-50" id="how">
        <h2 className="text-4xl font-bold text-center mb-16">
          كيف يعمل NexoBot
        </h2>

        <div className="max-w-4xl mx-auto space-y-12">

          <div>
            <h3 className="text-2xl font-bold mb-3">1. اربط قنواتك</h3>
            <p className="text-gray-600">
              واتساب، إنستغرام، فيسبوك أو موقعك — اختر المكان الذي تريد الأتمتة فيه.
            </p>
          </div>

          <div>
            <h3 className="text-2xl font-bold mb-3">2. قم بإعداد الأتمتة</h3>
            <p className="text-gray-600">
              حدد ما يجب أن يقوم به NexoBot: الرد، البيع، تأهيل العملاء والمزيد.
            </p>
          </div>

          <div>
            <h3 className="text-2xl font-bold mb-3">3. دعه يعمل من أجلك</h3>
            <p className="text-gray-600">
              يجيب NexoBot على العملاء 24/7 ويساعدك على زيادة المبيعات.
            </p>
          </div>

        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 px-6 max-w-5xl mx-auto" dir="rtl">
        <h2 className="text-4xl font-bold text-center mb-16">
          الأسئلة الشائعة
        </h2>

        <div className="space-y-10">

          <div>
            <h3 className="text-2xl font-bold mb-3">
              هل يعمل NexoBot مع واتساب؟
            </h3>
            <p className="text-gray-600">
              نعم، يتكامل NexoBot بالكامل مع WhatsApp Business API لأتمتة الردود
              والمبيعات والدعم.
            </p>
          </div>

          <div>
            <h3 className="text-2xl font-bold mb-3">
              هل يمكنني استخدامه على إنستغرام وفيسبوك أيضًا؟
            </h3>
            <p className="text-gray-600">
              بالتأكيد. يمكنك ربط عدة قنوات وإدارتها جميعًا من منصة واحدة.
            </p>
          </div>

          <div>
            <h3 className="text-2xl font-bold mb-3">
              هل أحتاج إلى خبرة تقنية؟
            </h3>
            <p className="text-gray-600">
              لا. تم تصميم NexoBot ليكون بسيطًا وسهل الاستخدام. يمكنك البدء خلال دقائق.
            </p>
          </div>

          <div>
            <h3 className="text-2xl font-bold mb-3">
              هل يمكنني الإلغاء في أي وقت؟
            </h3>
            <p className="text-gray-600">
              نعم، يمكنك الإلغاء أو تغيير خطتك في أي وقت دون أي رسوم إضافية.
            </p>
          </div>

        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="py-24 px-6 bg-gray-50" dir="rtl">
        <h2 className="text-4xl font-bold text-center mb-16">
          ماذا يقول عملاؤنا
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-6xl mx-auto">

          <div className="p-8 bg-white border rounded-2xl shadow-sm">
            <p className="text-gray-700 italic mb-4">
              &ldquo;ساعدنا NexoBot في تقليل وقت الرد على العملاء بنسبة 70%. مذهل حقًا.&rdquo;
            </p>
            <p className="font-bold">مارك ر.</p>
            <p className="text-gray-500 text-sm">تجارة إلكترونية</p>
          </div>

          <div className="p-8 bg-white border rounded-2xl shadow-sm">
            <p className="text-gray-700 italic mb-4">
              &ldquo;قمنا بزيادة مبيعاتنا بنسبة 40% خلال شهر واحد فقط. لا يمكن الاستغناء عنه.&rdquo;
            </p>
            <p className="font-bold">جوليا س.</p>
            <p className="text-gray-500 text-sm">خدمات رقمية</p>
          </div>

          <div className="p-8 bg-white border rounded-2xl shadow-sm">
            <p className="text-gray-700 italic mb-4">
              &ldquo;سهل الاستخدام، سريع الإعداد، وفعال للغاية.&rdquo;
            </p>
            <p className="font-bold">لوكاس م.</p>
            <p className="text-gray-500 text-sm">مطعم</p>
          </div>

        </div>
      </section>

      {/* FINAL CTA */}
      <section className="py-32 px-6 text-center max-w-4xl mx-auto" dir="rtl">
        <h2 className="text-5xl font-extrabold mb-6">
          هل أنت مستعد لتنمية عملك؟
        </h2>

        <p className="text-lg text-gray-600 mb-10">
          ابدأ اليوم مع NexoBot وقم بأتمتة المبيعات والدعم والتواصل بسهولة.
        </p>

        <a
          href="/en"
          className="px-12 py-4 bg-blue-600 text-white rounded-xl font-semibold shadow-md hover:bg-blue-700 transition-all"
        >
          ابدأ الآن
        </a>
      </section>

      {/* FOOTER */}
      <footer className="py-10 text-center text-gray-500 text-sm border-t" dir="rtl">
        © {new Date().getFullYear()} NexoBot — جميع الحقوق محفوظة.
      </footer>

    </main>
  );
}
