import Link from "next/link";

export default function HomeID() {
  return (
    <main className="min-h-screen bg-white text-gray-900">
      {/* Navbar */}
      <nav className="max-w-6xl mx-auto px-6 py-5 flex items-center justify-between">
        <Link href="/id" className="text-2xl font-extrabold text-blue-600">NexoBot</Link>
        <div className="flex items-center gap-4">
          <a href="#pricing" className="text-sm font-medium text-gray-600 hover:text-blue-600 transition">Harga</a>
          <a href="#faq" className="text-sm font-medium text-gray-600 hover:text-blue-600 transition">FAQ</a>
          <Link href="/auth/login" className="text-sm font-medium text-gray-700 hover:text-blue-600 transition">Masuk</Link>
          <Link href="/auth/signup" className="px-4 py-2 bg-blue-600 text-white text-sm font-semibold rounded-lg hover:bg-blue-700 transition">Mulai Gratis</Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="max-w-6xl mx-auto px-6 py-24 text-center">
        <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 text-sm font-medium px-4 py-1.5 rounded-full mb-8">
          <span>✨</span> Otomatisasi AI untuk bisnis Anda
        </div>
        <h1 className="text-6xl font-extrabold leading-tight tracking-tight">
          Otomatiskan penjualan dan dukungan pelanggan dengan <span className="text-blue-600">NexoBot</span>
        </h1>
        <p className="mt-6 text-xl text-gray-600 max-w-2xl mx-auto">
          Asisten cerdas Anda yang membalas pelanggan, menghasilkan penjualan, dan bekerja untuk Anda 24/7. Hemat waktu, tingkatkan pendapatan, dan kembangkan bisnis Anda dengan mudah.
        </p>
        <div className="mt-12 flex justify-center gap-4 flex-wrap">
          <Link href="/auth/signup" className="px-10 py-4 bg-blue-600 text-white rounded-xl font-semibold shadow-md hover:bg-blue-700 hover:shadow-lg transition-all">
            Mulai Gratis →
          </Link>
          <a href="#features" className="px-10 py-4 border border-gray-300 rounded-xl font-semibold hover:bg-gray-100 transition-all">
            Lihat cara kerjanya
          </a>
        </div>
        <p className="mt-5 text-sm text-gray-400">Tanpa kartu kredit · Batalkan kapan saja</p>
      </section>

      {/* Features */}
      <section id="features" className="py-24 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-extrabold">Bagaimana NexoBot mengubah bisnis Anda</h2>
          <div className="mt-16 grid md:grid-cols-3 gap-12">
            <div className="text-center">
              <div className="text-blue-600 text-5xl mb-4">⚡</div>
              <h3 className="text-2xl font-semibold">Respons instan</h3>
              <p className="mt-3 text-gray-600">Balas pertanyaan pelanggan secara otomatis 24/7. Tanpa waktu tunggu — hanya layanan terbaik yang instan.</p>
            </div>
            <div className="text-center">
              <div className="text-blue-600 text-5xl mb-4">💬</div>
              <h3 className="text-2xl font-semibold">Hubungkan semua saluran</h3>
              <p className="mt-3 text-gray-600">Kelola WhatsApp, website, media sosial, dan semua saluran pelanggan lainnya dalam satu platform yang terintegrasi.</p>
            </div>
            <div className="text-center">
              <div className="text-blue-600 text-5xl mb-4">🚀</div>
              <h3 className="text-2xl font-semibold">Tingkatkan penjualan</h3>
              <p className="mt-3 text-gray-600">Arahkan calon pelanggan secara cerdas melalui proses pembelian dan tingkatkan pendapatan secara otomatis.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-extrabold">Pilih paket yang tepat untuk Anda</h2>
          <div className="mt-16 grid md:grid-cols-3 gap-10">
            <div className="border rounded-2xl p-8 shadow-sm hover:shadow-md transition">
              <h3 className="text-2xl font-semibold">Starter</h3>
              <p className="mt-2 text-gray-600">Ideal untuk bisnis kecil yang baru memulai</p>
              <p className="mt-6 text-4xl font-bold">$29<span className="text-lg text-gray-500">/bln</span></p>
              <ul className="mt-6 space-y-3 text-gray-600 text-left">
                <li>✔ Hingga 500 percakapan/bulan</li>
                <li>✔ Alur otomasi dasar</li>
                <li>✔ Dukungan email</li>
                <li>✔ Laporan analitik dasar</li>
                <li>✖ Kustomisasi lanjutan</li>
              </ul>
              <a href="/checkout?priceId=price_1T18BGRap0JkQNsmaUVhyNFr" className="block mt-8 px-6 py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition">
                Pilih Starter
              </a>
            </div>
            <div className="border-2 border-blue-600 rounded-2xl p-8 shadow-lg">
              <h3 className="text-2xl font-semibold text-blue-600">Pro</h3>
              <p className="mt-2 text-gray-600">Untuk bisnis yang sedang berkembang pesat</p>
              <p className="mt-6 text-4xl font-bold">$59<span className="text-lg text-gray-500">/bln</span></p>
              <ul className="mt-6 space-y-3 text-gray-600 text-left">
                <li>✔ Hingga 2000 percakapan/bulan</li>
                <li>✔ Alur otomasi lanjutan</li>
                <li>✔ Dukungan prioritas</li>
                <li>✖ Manajer akun khusus</li>
              </ul>
              <a href="/checkout?priceId=price_1T15gVRap0JkQNsm59vukMuR" className="block mt-8 px-6 py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition">
                Pilih Pro
              </a>
            </div>
            <div className="border rounded-2xl p-8 shadow-sm hover:shadow-md transition">
              <h3 className="text-2xl font-semibold">Premium</h3>
              <p className="mt-2 text-gray-600">Untuk perusahaan besar dan kebutuhan tinggi</p>
              <p className="mt-6 text-4xl font-bold">$99<span className="text-lg text-gray-500">/bln</span></p>
              <ul className="mt-6 space-y-3 text-gray-600 text-left">
                <li>✔ Percakapan tak terbatas</li>
                <li>✔ Semua fitur lanjutan</li>
                <li>✔ Manajer akun khusus</li>
                <li>✔ Pengembangan integrasi kustom</li>
              </ul>
              <a href="/checkout?priceId=price_1T15jDRap0JkQNsmQRvEkpcm" className="block mt-8 px-6 py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition">
                Pilih Premium
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Additional Services */}
      <section id="services" className="py-24 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-extrabold">Layanan Tambahan</h2>
          <div className="mt-16 grid md:grid-cols-3 gap-10">
            <div className="border rounded-2xl p-8 bg-white shadow-sm hover:shadow-md transition">
              <h3 className="text-xl font-semibold">Kustomisasi Lanjutan</h3>
              <p className="mt-2 text-gray-600">Sesuaikan NexoBot sepenuhnya dengan merek dan kebutuhan bisnis Anda.</p>
              <p className="mt-6 text-3xl font-bold">$99</p>
              <a href="/checkout?priceId=price_1T161uRap0JkQNsm3BJZGOEu" className="block mt-6 px-6 py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition">Beli</a>
            </div>
            <div className="border rounded-2xl p-8 bg-white shadow-sm hover:shadow-md transition">
              <h3 className="text-xl font-semibold">Otomasi Lanjutan</h3>
              <p className="mt-2 text-gray-600">Bangun alur kerja otomasi yang kompleks untuk memenuhi kebutuhan bisnis lanjutan Anda.</p>
              <p className="mt-6 text-3xl font-bold">$149</p>
              <a href="/checkout?priceId=price_1T163sRap0JkQNsmOrHBQuJp" className="block mt-6 px-6 py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition">Beli</a>
            </div>
            <div className="border rounded-2xl p-8 bg-white shadow-sm hover:shadow-md transition">
              <h3 className="text-xl font-semibold">Integrasi Eksternal</h3>
              <p className="mt-2 text-gray-600">Integrasikan NexoBot secara mulus dengan CRM, ERP, atau sistem bisnis lainnya yang sudah ada.</p>
              <p className="mt-6 text-3xl font-bold">$199</p>
              <a href="/checkout?priceId=price_1T166cRap0JkQNsmuPTOPBBu" className="block mt-6 px-6 py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition">Beli</a>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-24 bg-white">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-4xl font-extrabold text-center">Pertanyaan yang Sering Diajukan</h2>
          <div className="mt-16 space-y-8">
            <div>
              <h3 className="text-xl font-semibold">Apakah saya memerlukan keahlian teknis untuk menggunakan NexoBot?</h3>
              <p className="mt-2 text-gray-600">Tidak! NexoBot dirancang agar mudah digunakan tanpa latar belakang teknis atau pemrograman apapun. Antarmuka intuitifnya memungkinkan Anda menyelesaikan pengaturan dalam hitungan menit.</p>
            </div>
            <div>
              <h3 className="text-xl font-semibold">Apakah NexoBot mendukung WhatsApp?</h3>
              <p className="mt-2 text-gray-600">Ya! NexoBot sepenuhnya mendukung WhatsApp Business API, serta Instagram, Facebook Messenger, live chat website, dan berbagai platform lainnya.</p>
            </div>
            <div>
              <h3 className="text-xl font-semibold">Bisakah saya membatalkan langganan kapan saja?</h3>
              <p className="mt-2 text-gray-600">Tentu saja. Anda dapat membatalkan langganan kapan saja tanpa biaya tambahan atau denda. Layanan akan berakhir pada akhir siklus penagihan saat ini.</p>
            </div>
            <div>
              <h3 className="text-xl font-semibold">Dukungan pelanggan seperti apa yang Anda tawarkan?</h3>
              <p className="mt-2 text-gray-600">Kami menyediakan dukungan pelanggan 24/7 melalui live chat, email, dan video call. Pengguna paket Pro dan Premium mendapatkan layanan dukungan prioritas.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section id="cta" className="py-32 bg-blue-600 text-white text-center">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-5xl font-extrabold leading-tight">Otomatiskan bisnis Anda hari ini dengan NexoBot</h2>
          <p className="mt-6 text-lg text-blue-100 max-w-2xl mx-auto">
            Ribuan bisnis sudah menggunakan NexoBot untuk meningkatkan penjualan dan kepuasan pelanggan. Mulai sekarang, coba tanpa risiko.
          </p>
          <Link href="/auth/signup" className="inline-block mt-10 px-12 py-4 bg-white text-blue-600 font-semibold rounded-xl shadow-lg hover:bg-gray-100 transition-all text-lg">
            Mulai Gratis →
          </Link>
          <p className="mt-4 text-blue-200 text-sm">Tanpa kartu kredit · Batalkan kapan saja</p>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t bg-gray-50">
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <p className="text-xl font-extrabold text-blue-600">NexoBot</p>
            <p className="text-sm text-gray-400 mt-1">© {new Date().getFullYear()} NexoBot — Semua hak dilindungi</p>
          </div>
          <div className="flex gap-6 text-sm text-gray-500">
            <a href="#pricing" className="hover:text-blue-600 transition">Harga</a>
            <a href="#faq" className="hover:text-blue-600 transition">FAQ</a>
            <Link href="/auth/login" className="hover:text-blue-600 transition">Masuk</Link>
          </div>
        </div>
      </footer>
    </main>
  );
}
