import Link from "next/link";

export default function HomeTR() {
  return (
    <main className="min-h-screen bg-white text-gray-900">
      {/* Navbar */}
      <nav className="max-w-6xl mx-auto px-6 py-5 flex items-center justify-between">
        <Link href="/tr" className="text-2xl font-extrabold text-blue-600">NexoBot</Link>
        <div className="flex items-center gap-4">
          <a href="#pricing" className="text-sm font-medium text-gray-600 hover:text-blue-600 transition">Fiyatlar</a>
          <a href="#faq" className="text-sm font-medium text-gray-600 hover:text-blue-600 transition">SSS</a>
          <Link href="/auth/login" className="text-sm font-medium text-gray-700 hover:text-blue-600 transition">Giriş Yap</Link>
          <Link href="/auth/signup" className="px-4 py-2 bg-blue-600 text-white text-sm font-semibold rounded-lg hover:bg-blue-700 transition">Ücretsiz Başla</Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="max-w-6xl mx-auto px-6 py-24 text-center">
        <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 text-sm font-medium px-4 py-1.5 rounded-full mb-8">
          <span>✨</span> İşletmeniz için yapay zeka otomasyonu
        </div>
        <h1 className="text-6xl font-extrabold leading-tight tracking-tight">
          <span className="text-blue-600">NexoBot</span> ile satışlarınızı ve müşteri desteğinizi otomatikleştirin
        </h1>
        <p className="mt-6 text-xl text-gray-600 max-w-2xl mx-auto">
          7/24 müşterilere yanıt veren, satış yaratan ve sizin için çalışan akıllı asistanınız. Zamandan tasarruf edin, gelirinizi artırın ve işletmenizi kolayca ölçeklendirin.
        </p>
        <div className="mt-12 flex justify-center gap-4 flex-wrap">
          <Link href="/auth/signup" className="px-10 py-4 bg-blue-600 text-white rounded-xl font-semibold shadow-md hover:bg-blue-700 hover:shadow-lg transition-all">
            Ücretsiz Başla →
          </Link>
          <a href="#features" className="px-10 py-4 border border-gray-300 rounded-xl font-semibold hover:bg-gray-100 transition-all">
            Nasıl çalışır
          </a>
        </div>
        <p className="mt-5 text-sm text-gray-400">Kredi kartı gerekmez · İstediğiniz zaman iptal edin</p>
      </section>

      {/* Features */}
      <section id="features" className="py-24 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-extrabold">NexoBot işletmenizi nasıl dönüştürür</h2>
          <div className="mt-16 grid md:grid-cols-3 gap-12">
            <div className="text-center">
              <div className="text-blue-600 text-5xl mb-4">⚡</div>
              <h3 className="text-2xl font-semibold">Anında yanıtlar</h3>
              <p className="mt-3 text-gray-600">Müşteri sorularını 7/24 otomatik olarak yanıtlayın. Bekleme süresi olmadan mükemmel hizmet sunun.</p>
            </div>
            <div className="text-center">
              <div className="text-blue-600 text-5xl mb-4">💬</div>
              <h3 className="text-2xl font-semibold">Tüm kanalları bağlayın</h3>
              <p className="mt-3 text-gray-600">WhatsApp, web sitesi, sosyal medya ve diğer tüm kanalları tek bir platformda yönetin.</p>
            </div>
            <div className="text-center">
              <div className="text-blue-600 text-5xl mb-4">🚀</div>
              <h3 className="text-2xl font-semibold">Satışlarınızı artırın</h3>
              <p className="mt-3 text-gray-600">Potansiyel müşterileri satın alma sürecine akıllıca yönlendirin ve geliri otomatik olarak artırın.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-extrabold">Size uygun planı seçin</h2>
          <div className="mt-16 grid md:grid-cols-3 gap-10">
            <div className="border rounded-2xl p-8 shadow-sm hover:shadow-md transition">
              <h3 className="text-2xl font-semibold">Starter</h3>
              <p className="mt-2 text-gray-600">Küçük işletmeler için ideal plan</p>
              <p className="mt-6 text-4xl font-bold">$29<span className="text-lg text-gray-500">/ay</span></p>
              <ul className="mt-6 space-y-3 text-gray-600 text-left">
                <li>✔ Ayda 500 konuşmaya kadar</li>
                <li>✔ Temel otomasyon akışları</li>
                <li>✔ E-posta desteği</li>
                <li>✔ Temel analitik raporlar</li>
                <li>✖ Gelişmiş özelleştirme</li>
              </ul>
              <a href="/checkout?priceId=price_1T18BGRap0JkQNsmaUVhyNFr" className="block mt-8 px-6 py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition">
                Starter&apos;ı Seç
              </a>
            </div>
            <div className="border-2 border-blue-600 rounded-2xl p-8 shadow-lg">
              <h3 className="text-2xl font-semibold text-blue-600">Pro</h3>
              <p className="mt-2 text-gray-600">Büyüyen işletmeler için ideal plan</p>
              <p className="mt-6 text-4xl font-bold">$59<span className="text-lg text-gray-500">/ay</span></p>
              <ul className="mt-6 space-y-3 text-gray-600 text-left">
                <li>✔ Ayda 2000 konuşmaya kadar</li>
                <li>✔ Gelişmiş otomasyon akışları</li>
                <li>✔ Öncelikli destek</li>
                <li>✖ Özel hesap yöneticisi</li>
              </ul>
              <a href="/checkout?priceId=price_1T15gVRap0JkQNsm59vukMuR" className="block mt-8 px-6 py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition">
                Pro&apos;yu Seç
              </a>
            </div>
            <div className="border rounded-2xl p-8 shadow-sm hover:shadow-md transition">
              <h3 className="text-2xl font-semibold">Premium</h3>
              <p className="mt-2 text-gray-600">Büyük işletmeler ve yüksek talep için plan</p>
              <p className="mt-6 text-4xl font-bold">$99<span className="text-lg text-gray-500">/ay</span></p>
              <ul className="mt-6 space-y-3 text-gray-600 text-left">
                <li>✔ Sınırsız konuşma</li>
                <li>✔ Tüm gelişmiş özellikler</li>
                <li>✔ Özel hesap yöneticisi</li>
                <li>✔ Özel entegrasyon geliştirme</li>
              </ul>
              <a href="/checkout?priceId=price_1T15jDRap0JkQNsmQRvEkpcm" className="block mt-8 px-6 py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition">
                Premium&apos;u Seç
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Additional Services */}
      <section id="services" className="py-24 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-extrabold">Ek Hizmetler</h2>
          <div className="mt-16 grid md:grid-cols-3 gap-10">
            <div className="border rounded-2xl p-8 bg-white shadow-sm hover:shadow-md transition">
              <h3 className="text-xl font-semibold">Gelişmiş Özelleştirme</h3>
              <p className="mt-2 text-gray-600">NexoBot&apos;u markanıza ve iş ihtiyaçlarınıza göre tamamen özelleştirin.</p>
              <p className="mt-6 text-3xl font-bold">$99</p>
              <a href="/checkout?priceId=price_1T161uRap0JkQNsm3BJZGOEu" className="block mt-6 px-6 py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition">Satın Al</a>
            </div>
            <div className="border rounded-2xl p-8 bg-white shadow-sm hover:shadow-md transition">
              <h3 className="text-xl font-semibold">Gelişmiş Otomasyonlar</h3>
              <p className="mt-2 text-gray-600">Karmaşık otomasyon iş akışları oluşturarak gelişmiş iş ihtiyaçlarınızı karşılayın.</p>
              <p className="mt-6 text-3xl font-bold">$149</p>
              <a href="/checkout?priceId=price_1T163sRap0JkQNsmOrHBQuJp" className="block mt-6 px-6 py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition">Satın Al</a>
            </div>
            <div className="border rounded-2xl p-8 bg-white shadow-sm hover:shadow-md transition">
              <h3 className="text-xl font-semibold">Dış Entegrasyonlar</h3>
              <p className="mt-2 text-gray-600">NexoBot&apos;u mevcut CRM, ERP veya diğer iş sistemlerinizle sorunsuz entegre edin.</p>
              <p className="mt-6 text-3xl font-bold">$199</p>
              <a href="/checkout?priceId=price_1T166cRap0JkQNsmuPTOPBBu" className="block mt-6 px-6 py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition">Satın Al</a>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-24 bg-white">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-4xl font-extrabold text-center">Sıkça Sorulan Sorular</h2>
          <div className="mt-16 space-y-8">
            <div>
              <h3 className="text-xl font-semibold">NexoBot&apos;u kullanmak için teknik bilgi gerekiyor mu?</h3>
              <p className="mt-2 text-gray-600">Hayır! NexoBot, herhangi bir teknik veya programlama bilgisi gerektirmeden kullanılacak şekilde tasarlanmıştır. Sezgisel arayüzü sayesinde dakikalar içinde kurulum yapabilirsiniz.</p>
            </div>
            <div>
              <h3 className="text-xl font-semibold">NexoBot WhatsApp&apos;ı destekliyor mu?</h3>
              <p className="mt-2 text-gray-600">Evet! NexoBot, WhatsApp Business API&apos;yi tam olarak desteklemenin yanı sıra Instagram, Facebook Messenger, web sitesi sohbeti ve daha fazlasını da destekler.</p>
            </div>
            <div>
              <h3 className="text-xl font-semibold">İstediğim zaman iptal edebilir miyim?</h3>
              <p className="mt-2 text-gray-600">Elbette. Ek ücret veya ceza olmaksızın istediğiniz zaman iptal edebilirsiniz. Hizmet, mevcut fatura döneminin sonunda sona erecektir.</p>
            </div>
            <div>
              <h3 className="text-xl font-semibold">Ne tür müşteri desteği sunuyorsunuz?</h3>
              <p className="mt-2 text-gray-600">Çevrimiçi sohbet, e-posta ve görüntülü görüşme yoluyla 7/24 müşteri desteği sunuyoruz. Pro ve Premium plan kullanıcıları öncelikli destek hizmetinden yararlanır.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section id="cta" className="py-32 bg-blue-600 text-white text-center">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-5xl font-extrabold leading-tight">Bugün NexoBot ile işletmenizi otomatikleştirin</h2>
          <p className="mt-6 text-lg text-blue-100 max-w-2xl mx-auto">
            Binlerce işletme NexoBot sayesinde satışlarını ve müşteri memnuniyetini artırıyor. Hemen başlayın, risksiz deneyin.
          </p>
          <Link href="/auth/signup" className="inline-block mt-10 px-12 py-4 bg-white text-blue-600 font-semibold rounded-xl shadow-lg hover:bg-gray-100 transition-all text-lg">
            Ücretsiz Başla →
          </Link>
          <p className="mt-4 text-blue-200 text-sm">Kredi kartı gerekmez · İstediğiniz zaman iptal edin</p>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t bg-gray-50">
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <p className="text-xl font-extrabold text-blue-600">NexoBot</p>
            <p className="text-sm text-gray-400 mt-1">© {new Date().getFullYear()} NexoBot — Tüm haklar saklıdır</p>
          </div>
          <div className="flex gap-6 text-sm text-gray-500">
            <a href="#pricing" className="hover:text-blue-600 transition">Fiyatlar</a>
            <a href="#faq" className="hover:text-blue-600 transition">SSS</a>
            <Link href="/auth/login" className="hover:text-blue-600 transition">Giriş Yap</Link>
          </div>
        </div>
      </footer>
    </main>
  );
}
