import Link from "next/link";

export default function HomeZH() {
  return (
    <main className="min-h-screen bg-white text-gray-900">
      {/* Navbar */}
      <nav className="max-w-6xl mx-auto px-6 py-5 flex items-center justify-between">
        <Link href="/zh" className="text-2xl font-extrabold text-blue-600">NexoBot</Link>
        <div className="flex items-center gap-4">
          <a href="#pricing" className="text-sm font-medium text-gray-600 hover:text-blue-600 transition">定价</a>
          <a href="#faq" className="text-sm font-medium text-gray-600 hover:text-blue-600 transition">常见问题</a>
          <Link href="/auth/login" className="text-sm font-medium text-gray-700 hover:text-blue-600 transition">登录</Link>
          <Link href="/auth/signup" className="px-4 py-2 bg-blue-600 text-white text-sm font-semibold rounded-lg hover:bg-blue-700 transition">免费开始</Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="max-w-6xl mx-auto px-6 py-24 text-center">
        <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 text-sm font-medium px-4 py-1.5 rounded-full mb-8">
          <span>✨</span> 为您的业务提供AI自动化
        </div>
        <h1 className="text-6xl font-extrabold leading-tight tracking-tight">
          用<span className="text-blue-600">NexoBot</span>自动化您的销售和客户支持
        </h1>
        <p className="mt-6 text-xl text-gray-600 max-w-2xl mx-auto">
          您的智能助手，全天候回复客户、产生销售，为您24/7工作。节省时间，增加收入，轻松扩展您的业务。
        </p>
        <div className="mt-12 flex justify-center gap-4 flex-wrap">
          <Link href="/auth/signup" className="px-10 py-4 bg-blue-600 text-white rounded-xl font-semibold shadow-md hover:bg-blue-700 hover:shadow-lg transition-all">
            免费开始 →
          </Link>
          <a href="#features" className="px-10 py-4 border border-gray-300 rounded-xl font-semibold hover:bg-gray-100 transition-all">
            了解更多
          </a>
        </div>
        <p className="mt-5 text-sm text-gray-400">无需信用卡 · 随时取消</p>
      </section>

      {/* Features */}
      <section id="features" className="py-24 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-extrabold">NexoBot 如何帮助您的业务</h2>
          <div className="mt-16 grid md:grid-cols-3 gap-12">
            <div className="text-center">
              <div className="text-blue-600 text-5xl mb-4">⚡</div>
              <h3 className="text-2xl font-semibold">即时回复</h3>
              <p className="mt-3 text-gray-600">全天候自动回复客户询问，不再让客户等待，提升满意度。</p>
            </div>
            <div className="text-center">
              <div className="text-blue-600 text-5xl mb-4">💬</div>
              <h3 className="text-2xl font-semibold">连接所有渠道</h3>
              <p className="mt-3 text-gray-600">整合WhatsApp、网站、社交媒体等所有客户渠道，统一管理。</p>
            </div>
            <div className="text-center">
              <div className="text-blue-600 text-5xl mb-4">🚀</div>
              <h3 className="text-2xl font-semibold">提升销售额</h3>
              <p className="mt-3 text-gray-600">智能引导潜在客户完成购买流程，自动增加您的销售收入。</p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-extrabold">选择适合您的套餐</h2>
          <div className="mt-16 grid md:grid-cols-3 gap-10">
            <div className="border rounded-2xl p-8 shadow-sm hover:shadow-md transition">
              <h3 className="text-2xl font-semibold">初学者套餐</h3>
              <p className="mt-2 text-gray-600">适合刚起步的小型业务</p>
              <p className="mt-6 text-4xl font-bold">$29<span className="text-lg text-gray-500">/月</span></p>
              <ul className="mt-6 space-y-3 text-gray-600 text-left">
                <li>✔ 最多500次对话/月</li>
                <li>✔ 基础自动化流程</li>
                <li>✔ 邮件支持</li>
                <li>✔ 基础分析报告</li>
                <li>✖ 高级自定义功能</li>
              </ul>
              <a href="/checkout?priceId=price_1T18BGRap0JkQNsmaUVhyNFr" className="block mt-8 px-6 py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition">
                选择初学者
              </a>
            </div>
            <div className="border-2 border-blue-600 rounded-2xl p-8 shadow-lg">
              <h3 className="text-2xl font-semibold text-blue-600">专业套餐</h3>
              <p className="mt-2 text-gray-600">适合快速成长的业务</p>
              <p className="mt-6 text-4xl font-bold">$59<span className="text-lg text-gray-500">/月</span></p>
              <ul className="mt-6 space-y-3 text-gray-600 text-left">
                <li>✔ 最多2000次对话/月</li>
                <li>✔ 高级自动化流程</li>
                <li>✔ 优先客服支持</li>
                <li>✖ 专属客户经理</li>
              </ul>
              <a href="/checkout?priceId=price_1T15gVRap0JkQNsm59vukMuR" className="block mt-8 px-6 py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition">
                选择专业版
              </a>
            </div>
            <div className="border rounded-2xl p-8 shadow-sm hover:shadow-md transition">
              <h3 className="text-2xl font-semibold">高级套餐</h3>
              <p className="mt-2 text-gray-600">适合大型企业和高需求用户</p>
              <p className="mt-6 text-4xl font-bold">$99<span className="text-lg text-gray-500">/月</span></p>
              <ul className="mt-6 space-y-3 text-gray-600 text-left">
                <li>✔ 无限次对话</li>
                <li>✔ 全部高级功能</li>
                <li>✔ 专属客户经理</li>
                <li>✔ 自定义集成开发</li>
              </ul>
              <a href="/checkout?priceId=price_1T15jDRap0JkQNsmQRvEkpcm" className="block mt-8 px-6 py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition">
                选择高级版
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Additional Services */}
      <section id="services" className="py-24 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-extrabold">额外服务</h2>
          <div className="mt-16 grid md:grid-cols-3 gap-10">
            <div className="border rounded-2xl p-8 bg-white shadow-sm hover:shadow-md transition">
              <h3 className="text-xl font-semibold">高级定制</h3>
              <p className="mt-2 text-gray-600">根据您的品牌和业务需求完全定制NexoBot。</p>
              <p className="mt-6 text-3xl font-bold">$99</p>
              <a href="/checkout?priceId=price_1T161uRap0JkQNsm3BJZGOEu" className="block mt-6 px-6 py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition">购买</a>
            </div>
            <div className="border rounded-2xl p-8 bg-white shadow-sm hover:shadow-md transition">
              <h3 className="text-xl font-semibold">高级自动化</h3>
              <p className="mt-2 text-gray-600">构建复杂的自动化工作流程，满足您的高级业务需求。</p>
              <p className="mt-6 text-3xl font-bold">$149</p>
              <a href="/checkout?priceId=price_1T163sRap0JkQNsmOrHBQuJp" className="block mt-6 px-6 py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition">购买</a>
            </div>
            <div className="border rounded-2xl p-8 bg-white shadow-sm hover:shadow-md transition">
              <h3 className="text-xl font-semibold">外部集成</h3>
              <p className="mt-2 text-gray-600">将NexoBot与您现有的CRM、ERP或其他业务系统无缝集成。</p>
              <p className="mt-6 text-3xl font-bold">$199</p>
              <a href="/checkout?priceId=price_1T166cRap0JkQNsmuPTOPBBu" className="block mt-6 px-6 py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition">购买</a>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-24 bg-white">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-4xl font-extrabold text-center">常见问题</h2>
          <div className="mt-16 space-y-8">
            <div>
              <h3 className="text-xl font-semibold">使用NexoBot需要技术知识吗？</h3>
              <p className="mt-2 text-gray-600">不需要！NexoBot设计简单易用，无需任何编程或技术背景。我们的直观界面让您在几分钟内即可完成设置。</p>
            </div>
            <div>
              <h3 className="text-xl font-semibold">NexoBot支持WhatsApp吗？</h3>
              <p className="mt-2 text-gray-600">是的！NexoBot完全支持WhatsApp Business API，以及Instagram、Facebook Messenger、网站聊天等多个平台。</p>
            </div>
            <div>
              <h3 className="text-xl font-semibold">我可以随时取消订阅吗？</h3>
              <p className="mt-2 text-gray-600">当然可以。您可以随时取消订阅，不会产生任何额外费用或违约金。您的服务将在当前计费周期结束时停止。</p>
            </div>
            <div>
              <h3 className="text-xl font-semibold">你们提供什么样的客户支持？</h3>
              <p className="mt-2 text-gray-600">我们提供全天候的中文客服支持，包括在线聊天、电子邮件和视频通话。专业版和高级套餐用户还享有优先支持服务。</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section id="cta" className="py-32 bg-blue-600 text-white text-center">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-5xl font-extrabold leading-tight">今天就用NexoBot自动化您的业务</h2>
          <p className="mt-6 text-lg text-blue-100 max-w-2xl mx-auto">
            加入数千家已经使用NexoBot提升销售和客户满意度的企业。立即开始，无风险试用。
          </p>
          <Link href="/auth/signup" className="inline-block mt-10 px-12 py-4 bg-white text-blue-600 font-semibold rounded-xl shadow-lg hover:bg-gray-100 transition-all text-lg">
            免费开始 →
          </Link>
          <p className="mt-4 text-blue-200 text-sm">无需信用卡 · 随时取消</p>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t bg-gray-50">
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <p className="text-xl font-extrabold text-blue-600">NexoBot</p>
            <p className="text-sm text-gray-400 mt-1">© {new Date().getFullYear()} NexoBot — 版权所有</p>
          </div>
          <div className="flex gap-6 text-sm text-gray-500">
            <a href="#pricing" className="hover:text-blue-600 transition">定价</a>
            <a href="#faq" className="hover:text-blue-600 transition">常见问题</a>
            <Link href="/auth/login" className="hover:text-blue-600 transition">登录</Link>
          </div>
        </div>
      </footer>
    </main>
  );
}
