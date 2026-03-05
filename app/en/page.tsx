import Link from "next/link";

export default function HomeEN() {
  return (
    <main className="min-h-screen bg-white text-gray-900">

      {/* Navbar */}
      <nav className="max-w-6xl mx-auto px-6 py-5 flex items-center justify-between">
        <Link href="/en" className="text-2xl font-extrabold text-blue-600">NexoBot</Link>
        <div className="flex items-center gap-4">
          <a href="#pricing" className="text-sm font-medium text-gray-600 hover:text-blue-600 transition">Pricing</a>
          <a href="#faq" className="text-sm font-medium text-gray-600 hover:text-blue-600 transition">FAQ</a>
          <Link href="/auth/login" className="text-sm font-medium text-gray-700 hover:text-blue-600 transition">Sign in</Link>
          <Link href="/auth/signup" className="px-4 py-2 bg-blue-600 text-white text-sm font-semibold rounded-lg hover:bg-blue-700 transition">
            Get started free
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="max-w-6xl mx-auto px-6 py-24 text-center">
        <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 text-sm font-medium px-4 py-1.5 rounded-full mb-8">
          <span>✨</span> AI automation for your business
        </div>
        <h1 className="text-6xl font-extrabold leading-tight tracking-tight">
          Automate your sales and customer support with{" "}
          <span className="text-blue-600">NexoBot</span>
        </h1>
        <p className="mt-6 text-xl text-gray-600 max-w-2xl mx-auto">
          Your intelligent assistant that replies to customers, generates sales, and works for you 24/7.
          Save time, increase revenue, and scale your business effortlessly.
        </p>
        <div className="mt-12 flex justify-center gap-4 flex-wrap">
          <Link href="/auth/signup" className="px-10 py-4 bg-blue-600 text-white rounded-xl font-semibold shadow-md hover:bg-blue-700 hover:shadow-lg transition-all">
            Get started free →
          </Link>
          <a href="#features" className="px-10 py-4 border border-gray-300 rounded-xl font-semibold hover:bg-gray-100 transition-all">
            See how it works
          </a>
        </div>
        <p className="mt-5 text-sm text-gray-400">No credit card required · Cancel anytime</p>
      </section>

      {/* Features */}
      <section id="features" className="py-24 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-extrabold">Everything you need to automate your business</h2>
          <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
            NexoBot combines artificial intelligence, automation, and multichannel communication so you can serve more customers and close more sales effortlessly.
          </p>
          <div className="mt-16 grid md:grid-cols-3 gap-12">
            <div className="text-center">
              <div className="text-blue-600 text-5xl mb-4">⚡</div>
              <h3 className="text-2xl font-semibold">Instant responses</h3>
              <p className="mt-3 text-gray-600">Your bot replies automatically 24/7 with no delays or waiting times.</p>
            </div>
            <div className="text-center">
              <div className="text-blue-600 text-5xl mb-4">💬</div>
              <h3 className="text-2xl font-semibold">Connect all your channels</h3>
              <p className="mt-3 text-gray-600">WhatsApp, website, social media, or CRM. NexoBot integrates seamlessly with your ecosystem.</p>
            </div>
            <div className="text-center">
              <div className="text-blue-600 text-5xl mb-4">🚀</div>
              <h3 className="text-2xl font-semibold">Boost your sales</h3>
              <p className="mt-3 text-gray-600">Smart flows, automated funnels, and segmentation to convert more customers.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-extrabold">Plans designed to grow with you</h2>
          <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
            Choose the ideal plan for your business and start automating sales, support, and lead generation.
          </p>
          <div className="mt-16 grid md:grid-cols-3 gap-10">
            <div className="border rounded-2xl p-8 shadow-sm hover:shadow-md transition">
              <h3 className="text-2xl font-semibold">Starter</h3>
              <p className="mt-2 text-gray-600">Perfect for entrepreneurs just starting out</p>
              <p className="mt-6 text-4xl font-bold">$29<span className="text-lg text-gray-500">/mo</span></p>
              <ul className="mt-6 space-y-3 text-gray-600 text-left">
                <li>✔ AI automated responses</li>
                <li>✔ Website chat widget</li>
                <li>✔ Message templates</li>
                <li>✔ 24/7 customer handling</li>
                <li>✔ Basic lead capture</li>
                <li>✔ Intuitive dashboard</li>
                <li>✔ Website integration</li>
                <li>✖ WhatsApp not included</li>
                <li>✖ No advanced automations</li>
                <li>✖ No segmentation</li>
              </ul>
              <a href="/checkout?priceId=price_1T18BGRap0JkQNsmaUVhyNFr" className="block mt-8 px-6 py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition">Choose Starter</a>
            </div>
            <div className="border-2 border-blue-600 rounded-2xl p-8 shadow-lg">
              <h3 className="text-2xl font-semibold text-blue-600">Pro</h3>
              <p className="mt-2 text-gray-600">Ideal for growing businesses</p>
              <p className="mt-6 text-4xl font-bold">$59<span className="text-lg text-gray-500">/mo</span></p>
              <ul className="mt-6 space-y-3 text-gray-600 text-left">
                <li>✔ Everything in Starter</li>
                <li>✔ WhatsApp integration</li>
                <li>✔ Smart sales flows</li>
                <li>✔ Advanced customer segmentation</li>
                <li>✔ Enhanced lead capture</li>
                <li>✔ Social media integration</li>
                <li>✔ Intent-based responses</li>
                <li>✔ Custom automations</li>
                <li>✖ Unlimited messages not included</li>
              </ul>
              <a href="/checkout?priceId=price_1T15gVRap0JkQNsm59vukMuR" className="block mt-8 px-6 py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition">Choose Pro</a>
            </div>
            <div className="border rounded-2xl p-8 shadow-sm hover:shadow-md transition">
              <h3 className="text-2xl font-semibold">Premium</h3>
              <p className="mt-2 text-gray-600">For businesses that need maximum power</p>
              <p className="mt-6 text-4xl font-bold">$99<span className="text-lg text-gray-500">/mo</span></p>
              <ul className="mt-6 space-y-3 text-gray-600 text-left">
                <li>✔ Everything in Pro</li>
                <li>✔ Unlimited messages</li>
                <li>✔ Automated sales funnel</li>
                <li>✔ Advanced integrations</li>
                <li>✔ Priority support</li>
                <li>✔ Assisted setup</li>
                <li>✔ Premium automations</li>
              </ul>
              <a href="/checkout?priceId=price_1T15jDRap0JkQNsmQRvEkpcm" className="block mt-8 px-6 py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition">Choose Premium</a>
            </div>
          </div>
        </div>
      </section>

      {/* Additional Services */}
      <section id="services" className="py-24 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-extrabold">Additional Services</h2>
          <p className="mt-4 text-gray-600 max-w-2xl mx-auto">Take your NexoBot experience to the next level with professional setup, advanced customization, and tailored integrations.</p>
          <div className="mt-16 grid md:grid-cols-3 gap-10">
            <div className="border rounded-2xl p-8 bg-white shadow-sm hover:shadow-md transition">
              <h3 className="text-xl font-semibold">Advanced Customization</h3>
              <p className="mt-2 text-gray-600">Make your bot speak like your brand</p>
              <p className="mt-6 text-3xl font-bold">$99</p>
              <ul className="mt-6 space-y-3 text-gray-600 text-left"><li>✔ Custom adjustments</li><li>✔ Business-tailored responses</li><li>✔ Conversational flow optimization</li></ul>
              <a href="/checkout?priceId=price_1T161uRap0JkQNsm3BJZGOEu" className="block mt-8 px-6 py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition">Purchase</a>
            </div>
            <div className="border rounded-2xl p-8 bg-white shadow-sm hover:shadow-md transition">
              <h3 className="text-xl font-semibold">Advanced Automations</h3>
              <p className="mt-2 text-gray-600">Turn your bot into a sales machine</p>
              <p className="mt-6 text-3xl font-bold">$149</p>
              <ul className="mt-6 space-y-3 text-gray-600 text-left"><li>✔ Custom smart flows</li><li>✔ Advanced segmentation</li><li>✔ Automated funnels</li></ul>
              <a href="/checkout?priceId=price_1T163sRap0JkQNsmOrHBQuJp" className="block mt-8 px-6 py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition">Purchase</a>
            </div>
            <div className="border rounded-2xl p-8 bg-white shadow-sm hover:shadow-md transition">
              <h3 className="text-xl font-semibold">External Integrations</h3>
              <p className="mt-2 text-gray-600">Connect your bot with your ecosystem</p>
              <p className="mt-6 text-3xl font-bold">$199</p>
              <ul className="mt-6 space-y-3 text-gray-600 text-left"><li>✔ CRM integration</li><li>✔ External API connections</li><li>✔ Automatic data sync</li></ul>
              <a href="/checkout?priceId=price_1T166cRap0JkQNsmuPTOPBBu" className="block mt-8 px-6 py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition">Purchase</a>
            </div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="how-it-works" className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-extrabold">How NexoBot Works</h2>
          <p className="mt-4 text-gray-600 max-w-2xl mx-auto">Set up your intelligent assistant in minutes and let it automate sales, support, and lead generation 24/7.</p>
          <div className="mt-16 grid md:grid-cols-3 gap-12">
            <div className="text-center"><div className="text-blue-600 text-5xl mb-4">①</div><h3 className="text-2xl font-semibold">Set up your bot</h3><p className="mt-3 text-gray-600">Customize responses, define your brand tone, and configure your assistant to match your business needs.</p></div>
            <div className="text-center"><div className="text-blue-600 text-5xl mb-4">②</div><h3 className="text-2xl font-semibold">Connect your channels</h3><p className="mt-3 text-gray-600">WhatsApp, website, social media, or CRM — NexoBot integrates seamlessly to centralize all communication.</p></div>
            <div className="text-center"><div className="text-blue-600 text-5xl mb-4">③</div><h3 className="text-2xl font-semibold">Automate & scale</h3><p className="mt-3 text-gray-600">Your bot handles customers, captures leads, and generates sales automatically so you can scale without extra workload.</p></div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-24 bg-gray-50">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-4xl font-extrabold text-center">Frequently Asked Questions</h2>
          <p className="mt-4 text-gray-600 text-center max-w-2xl mx-auto">We answer the most common questions so you can start with full clarity and confidence.</p>
          <div className="mt-16 space-y-8">
            <div><h3 className="text-xl font-semibold">Do I need technical skills to use NexoBot?</h3><p className="mt-2 text-gray-600">No. NexoBot is designed so anyone can set it up in minutes. And if you prefer, we offer additional services to configure everything for you.</p></div>
            <div><h3 className="text-xl font-semibold">Can I use NexoBot on WhatsApp?</h3><p className="mt-2 text-gray-600">Yes. WhatsApp integration is included in the Pro and Premium plans.</p></div>
            <div><h3 className="text-xl font-semibold">What happens if I exceed my message limit?</h3><p className="mt-2 text-gray-600">{"We'll notify you before you reach the limit, and you can upgrade your plan anytime without interruption."}</p></div>
            <div><h3 className="text-xl font-semibold">Can I cancel anytime?</h3><p className="mt-2 text-gray-600">Yes. There are no contracts or commitments. Cancel your subscription anytime from your dashboard.</p></div>
            <div><h3 className="text-xl font-semibold">Do you offer support?</h3><p className="mt-2 text-gray-600">Yes. All plans include support, and the Premium plan includes priority support for faster responses.</p></div>
            <div><h3 className="text-xl font-semibold">Can I integrate NexoBot with my website?</h3><p className="mt-2 text-gray-600">Yes. All plans include a simple widget you can install on your website in minutes.</p></div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-extrabold">What our customers say</h2>
          <p className="mt-4 text-gray-600 max-w-2xl mx-auto">Real businesses are already using NexoBot to automate sales, save time, and serve customers effortlessly.</p>
          <div className="mt-16 grid md:grid-cols-3 gap-10">
            <div className="border rounded-2xl p-8 shadow-sm bg-gray-50"><p className="text-gray-700 italic">&ldquo;NexoBot replies to my customers even while I sleep. My sales increased by 40% in the first month without investing more time.&rdquo;</p><div className="mt-6"><h4 className="font-semibold">Maria Lopez</h4><p className="text-gray-500 text-sm">Online accessories store</p></div></div>
            <div className="border rounded-2xl p-8 shadow-sm bg-gray-50"><p className="text-gray-700 italic">&ldquo;WhatsApp integration was super fast. Now I have a fully automated sales flow handling all my prospects.&rdquo;</p><div className="mt-6"><h4 className="font-semibold">Carlos Fernandez</h4><p className="text-gray-500 text-sm">Professional services</p></div></div>
            <div className="border rounded-2xl p-8 shadow-sm bg-gray-50"><p className="text-gray-700 italic">&ldquo;The support is excellent. They helped me customize my bot, and now it handles over 300 daily inquiries flawlessly.&rdquo;</p><div className="mt-6"><h4 className="font-semibold">Ana Rodriguez</h4><p className="text-gray-500 text-sm">Digital entrepreneur</p></div></div>
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section id="cta" className="py-32 bg-blue-600 text-white text-center">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-5xl font-extrabold leading-tight">Automate your business today with NexoBot</h2>
          <p className="mt-6 text-lg text-blue-100 max-w-2xl mx-auto">Serve customers, generate sales, and scale your business 24/7 with your intelligent assistant.</p>
          <Link href="/auth/signup" className="inline-block mt-10 px-12 py-4 bg-white text-blue-600 font-semibold rounded-xl shadow-lg hover:bg-gray-100 transition-all text-lg">Get started free →</Link>
          <p className="mt-4 text-blue-200 text-sm">No credit card required · Cancel anytime</p>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t bg-gray-50">
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div><p className="text-xl font-extrabold text-blue-600">NexoBot</p><p className="text-sm text-gray-400 mt-1">© {new Date().getFullYear()} NexoBot — All rights reserved.</p></div>
          <div className="flex gap-6 text-sm text-gray-500">
            <a href="#pricing" className="hover:text-blue-600 transition">Pricing</a>
            <a href="#faq" className="hover:text-blue-600 transition">FAQ</a>
            <a href="#features" className="hover:text-blue-600 transition">Features</a>
            <Link href="/auth/login" className="hover:text-blue-600 transition">Sign in</Link>
          </div>
        </div>
      </footer>
    </main>
  );
}
