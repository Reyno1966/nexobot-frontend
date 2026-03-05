import Link from "next/link";

export default function HomeJA() {
  return (
    <main className="min-h-screen bg-white text-gray-900">
      {/* Navbar */}
      <nav className="max-w-6xl mx-auto px-6 py-5 flex items-center justify-between">
        <Link href="/ja" className="text-2xl font-extrabold text-blue-600">NexoBot</Link>
        <div className="flex items-center gap-4">
          <a href="#pricing" className="text-sm font-medium text-gray-600 hover:text-blue-600 transition">料金</a>
          <a href="#faq" className="text-sm font-medium text-gray-600 hover:text-blue-600 transition">よくある質問</a>
          <Link href="/auth/login" className="text-sm font-medium text-gray-700 hover:text-blue-600 transition">ログイン</Link>
          <Link href="/auth/signup" className="px-4 py-2 bg-blue-600 text-white text-sm font-semibold rounded-lg hover:bg-blue-700 transition">無料で始める</Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="max-w-6xl mx-auto px-6 py-24 text-center">
        <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 text-sm font-medium px-4 py-1.5 rounded-full mb-8">
          <span>✨</span> ビジネスのためのAI自動化
        </div>
        <h1 className="text-6xl font-extrabold leading-tight tracking-tight">
          <span className="text-blue-600">NexoBot</span>で販売とカスタマーサポートを自動化
        </h1>
        <p className="mt-6 text-xl text-gray-600 max-w-2xl mx-auto">
          24時間365日、顧客に返信し、売上を上げ、あなたのために働くインテリジェントアシスタント。時間を節約し、収益を増やし、ビジネスをスムーズに拡大しましょう。
        </p>
        <div className="mt-12 flex justify-center gap-4 flex-wrap">
          <Link href="/auth/signup" className="px-10 py-4 bg-blue-600 text-white rounded-xl font-semibold shadow-md hover:bg-blue-700 hover:shadow-lg transition-all">
            無料で始める →
          </Link>
          <a href="#features" className="px-10 py-4 border border-gray-300 rounded-xl font-semibold hover:bg-gray-100 transition-all">
            仕組みを見る
          </a>
        </div>
        <p className="mt-5 text-sm text-gray-400">クレジットカード不要 · いつでもキャンセル可</p>
      </section>

      {/* Features */}
      <section id="features" className="py-24 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-extrabold">NexoBotがビジネスをどう変えるか</h2>
          <div className="mt-16 grid md:grid-cols-3 gap-12">
            <div className="text-center">
              <div className="text-blue-600 text-5xl mb-4">⚡</div>
              <h3 className="text-2xl font-semibold">即時返信</h3>
              <p className="mt-3 text-gray-600">顧客からの問い合わせに24時間365日自動で応答。待ち時間をゼロにして満足度を向上させます。</p>
            </div>
            <div className="text-center">
              <div className="text-blue-600 text-5xl mb-4">💬</div>
              <h3 className="text-2xl font-semibold">全チャネルを接続</h3>
              <p className="mt-3 text-gray-600">WhatsApp、ウェブサイト、SNSなどすべてのチャネルを一元管理し、シームレスな顧客体験を提供。</p>
            </div>
            <div className="text-center">
              <div className="text-blue-600 text-5xl mb-4">🚀</div>
              <h3 className="text-2xl font-semibold">売上アップ</h3>
              <p className="mt-3 text-gray-600">見込み客を購買プロセスへスマートに誘導し、自動的に売上を増やします。</p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-extrabold">料金プランを選ぶ</h2>
          <div className="mt-16 grid md:grid-cols-3 gap-10">
            <div className="border rounded-2xl p-8 shadow-sm hover:shadow-md transition">
              <h3 className="text-2xl font-semibold">Starter</h3>
              <p className="mt-2 text-gray-600">小規模ビジネスに最適なプラン</p>
              <p className="mt-6 text-4xl font-bold">$29<span className="text-lg text-gray-500">/月</span></p>
              <ul className="mt-6 space-y-3 text-gray-600 text-left">
                <li>✔ 月500件までの会話</li>
                <li>✔ 基本的な自動化フロー</li>
                <li>✔ メールサポート</li>
                <li>✔ 基本分析レポート</li>
                <li>✖ 高度なカスタマイズ</li>
              </ul>
              <a href="/checkout?priceId=price_1T18BGRap0JkQNsmaUVhyNFr" className="block mt-8 px-6 py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition">
                Starterを選ぶ
              </a>
            </div>
            <div className="border-2 border-blue-600 rounded-2xl p-8 shadow-lg">
              <h3 className="text-2xl font-semibold text-blue-600">Pro</h3>
              <p className="mt-2 text-gray-600">成長中のビジネスに最適なプラン</p>
              <p className="mt-6 text-4xl font-bold">$59<span className="text-lg text-gray-500">/月</span></p>
              <ul className="mt-6 space-y-3 text-gray-600 text-left">
                <li>✔ 月2000件までの会話</li>
                <li>✔ 高度な自動化フロー</li>
                <li>✔ 優先サポート</li>
                <li>✖ 専任アカウントマネージャー</li>
              </ul>
              <a href="/checkout?priceId=price_1T15gVRap0JkQNsm59vukMuR" className="block mt-8 px-6 py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition">
                Proを選ぶ
              </a>
            </div>
            <div className="border rounded-2xl p-8 shadow-sm hover:shadow-md transition">
              <h3 className="text-2xl font-semibold">Premium</h3>
              <p className="mt-2 text-gray-600">大企業・高需要ユーザー向けプラン</p>
              <p className="mt-6 text-4xl font-bold">$99<span className="text-lg text-gray-500">/月</span></p>
              <ul className="mt-6 space-y-3 text-gray-600 text-left">
                <li>✔ 無制限の会話</li>
                <li>✔ 全高度機能</li>
                <li>✔ 専任アカウントマネージャー</li>
                <li>✔ カスタム統合開発</li>
              </ul>
              <a href="/checkout?priceId=price_1T15jDRap0JkQNsmQRvEkpcm" className="block mt-8 px-6 py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition">
                Premiumを選ぶ
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Additional Services */}
      <section id="services" className="py-24 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-extrabold">追加サービス</h2>
          <div className="mt-16 grid md:grid-cols-3 gap-10">
            <div className="border rounded-2xl p-8 bg-white shadow-sm hover:shadow-md transition">
              <h3 className="text-xl font-semibold">高度なカスタマイズ</h3>
              <p className="mt-2 text-gray-600">ブランドやビジネスニーズに合わせてNexoBotを完全カスタマイズします。</p>
              <p className="mt-6 text-3xl font-bold">$99</p>
              <a href="/checkout?priceId=price_1T161uRap0JkQNsm3BJZGOEu" className="block mt-6 px-6 py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition">購入する</a>
            </div>
            <div className="border rounded-2xl p-8 bg-white shadow-sm hover:shadow-md transition">
              <h3 className="text-xl font-semibold">高度な自動化</h3>
              <p className="mt-2 text-gray-600">複雑な自動化ワークフローを構築し、高度なビジネスニーズに対応します。</p>
              <p className="mt-6 text-3xl font-bold">$149</p>
              <a href="/checkout?priceId=price_1T163sRap0JkQNsmOrHBQuJp" className="block mt-6 px-6 py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition">購入する</a>
            </div>
            <div className="border rounded-2xl p-8 bg-white shadow-sm hover:shadow-md transition">
              <h3 className="text-xl font-semibold">外部統合</h3>
              <p className="mt-2 text-gray-600">NexoBotを既存のCRM、ERP、その他のビジネスシステムとシームレスに連携させます。</p>
              <p className="mt-6 text-3xl font-bold">$199</p>
              <a href="/checkout?priceId=price_1T166cRap0JkQNsmuPTOPBBu" className="block mt-6 px-6 py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition">購入する</a>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-24 bg-white">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-4xl font-extrabold text-center">よくある質問</h2>
          <div className="mt-16 space-y-8">
            <div>
              <h3 className="text-xl font-semibold">技術的な知識は必要ですか？</h3>
              <p className="mt-2 text-gray-600">いいえ！NexoBotはプログラミングや技術的な背景がなくても簡単に使えるよう設計されています。直感的なインターフェースで数分以内にセットアップできます。</p>
            </div>
            <div>
              <h3 className="text-xl font-semibold">NexoBotはWhatsAppに対応していますか？</h3>
              <p className="mt-2 text-gray-600">はい！NexoBotはWhatsApp Business APIに完全対応しており、Instagram、Facebook Messenger、ウェブサイトチャットなど複数のプラットフォームもサポートしています。</p>
            </div>
            <div>
              <h3 className="text-xl font-semibold">いつでもキャンセルできますか？</h3>
              <p className="mt-2 text-gray-600">もちろんです。追加料金や違約金なしにいつでもキャンセルできます。現在の請求サイクルが終了した時点でサービスが停止されます。</p>
            </div>
            <div>
              <h3 className="text-xl font-semibold">どのようなサポートが受けられますか？</h3>
              <p className="mt-2 text-gray-600">オンラインチャット、メール、ビデオ通話による24時間365日のサポートを提供しています。ProおよびPremiumプランのユーザーは優先サポートをご利用いただけます。</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section id="cta" className="py-32 bg-blue-600 text-white text-center">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-5xl font-extrabold leading-tight">今すぐNexoBotでビジネスを自動化</h2>
          <p className="mt-6 text-lg text-blue-100 max-w-2xl mx-auto">
            すでに何千もの企業がNexoBotで売上と顧客満足度を向上させています。今すぐ始めて、リスクなしでお試しください。
          </p>
          <Link href="/auth/signup" className="inline-block mt-10 px-12 py-4 bg-white text-blue-600 font-semibold rounded-xl shadow-lg hover:bg-gray-100 transition-all text-lg">
            無料で始める →
          </Link>
          <p className="mt-4 text-blue-200 text-sm">クレジットカード不要 · いつでもキャンセル可</p>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t bg-gray-50">
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <p className="text-xl font-extrabold text-blue-600">NexoBot</p>
            <p className="text-sm text-gray-400 mt-1">© {new Date().getFullYear()} NexoBot — 全著作権所有</p>
          </div>
          <div className="flex gap-6 text-sm text-gray-500">
            <a href="#pricing" className="hover:text-blue-600 transition">料金</a>
            <a href="#faq" className="hover:text-blue-600 transition">よくある質問</a>
            <Link href="/auth/login" className="hover:text-blue-600 transition">ログイン</Link>
          </div>
        </div>
      </footer>
    </main>
  );
}
