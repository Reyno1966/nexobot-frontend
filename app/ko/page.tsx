import Link from "next/link";

export default function HomeKO() {
  return (
    <main className="min-h-screen bg-white text-gray-900">
      {/* Navbar */}
      <nav className="max-w-6xl mx-auto px-6 py-5 flex items-center justify-between">
        <Link href="/ko" className="text-2xl font-extrabold text-blue-600">NexoBot</Link>
        <div className="flex items-center gap-4">
          <a href="#pricing" className="text-sm font-medium text-gray-600 hover:text-blue-600 transition">요금제</a>
          <a href="#faq" className="text-sm font-medium text-gray-600 hover:text-blue-600 transition">FAQ</a>
          <Link href="/auth/login" className="text-sm font-medium text-gray-700 hover:text-blue-600 transition">로그인</Link>
          <Link href="/auth/signup" className="px-4 py-2 bg-blue-600 text-white text-sm font-semibold rounded-lg hover:bg-blue-700 transition">무료 시작</Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="max-w-6xl mx-auto px-6 py-24 text-center">
        <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 text-sm font-medium px-4 py-1.5 rounded-full mb-8">
          <span>✨</span> 비즈니스를 위한 AI 자동화
        </div>
        <h1 className="text-6xl font-extrabold leading-tight tracking-tight">
          <span className="text-blue-600">NexoBot</span>으로 판매 및 고객 지원 자동화
        </h1>
        <p className="mt-6 text-xl text-gray-600 max-w-2xl mx-auto">
          24/7 고객에게 응답하고, 매출을 창출하며, 당신을 위해 일하는 지능형 어시스턴트입니다. 시간을 절약하고, 수익을 늘리고, 비즈니스를 손쉽게 확장하세요.
        </p>
        <div className="mt-12 flex justify-center gap-4 flex-wrap">
          <Link href="/auth/signup" className="px-10 py-4 bg-blue-600 text-white rounded-xl font-semibold shadow-md hover:bg-blue-700 hover:shadow-lg transition-all">
            무료로 시작하기 →
          </Link>
          <a href="#features" className="px-10 py-4 border border-gray-300 rounded-xl font-semibold hover:bg-gray-100 transition-all">
            작동 방식 보기
          </a>
        </div>
        <p className="mt-5 text-sm text-gray-400">신용카드 불필요 · 언제든지 취소 가능</p>
      </section>

      {/* Features */}
      <section id="features" className="py-24 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-extrabold">NexoBot이 비즈니스를 어떻게 바꾸는가</h2>
          <div className="mt-16 grid md:grid-cols-3 gap-12">
            <div className="text-center">
              <div className="text-blue-600 text-5xl mb-4">⚡</div>
              <h3 className="text-2xl font-semibold">즉각적인 응답</h3>
              <p className="mt-3 text-gray-600">고객 문의에 24시간 365일 자동으로 응답합니다. 대기 시간 없이 최상의 서비스를 제공하세요.</p>
            </div>
            <div className="text-center">
              <div className="text-blue-600 text-5xl mb-4">💬</div>
              <h3 className="text-2xl font-semibold">모든 채널 연결</h3>
              <p className="mt-3 text-gray-600">WhatsApp, 웹사이트, SNS 등 모든 고객 채널을 하나의 플랫폼에서 통합 관리하세요.</p>
            </div>
            <div className="text-center">
              <div className="text-blue-600 text-5xl mb-4">🚀</div>
              <h3 className="text-2xl font-semibold">매출 향상</h3>
              <p className="mt-3 text-gray-600">잠재 고객을 구매 프로세스로 스마트하게 안내하여 자동으로 매출을 증대시킵니다.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-extrabold">요금제 선택</h2>
          <div className="mt-16 grid md:grid-cols-3 gap-10">
            <div className="border rounded-2xl p-8 shadow-sm hover:shadow-md transition">
              <h3 className="text-2xl font-semibold">Starter</h3>
              <p className="mt-2 text-gray-600">소규모 비즈니스에 적합한 플랜</p>
              <p className="mt-6 text-4xl font-bold">$29<span className="text-lg text-gray-500">/월</span></p>
              <ul className="mt-6 space-y-3 text-gray-600 text-left">
                <li>✔ 월 500건 대화</li>
                <li>✔ 기본 자동화 흐름</li>
                <li>✔ 이메일 지원</li>
                <li>✔ 기본 분석 리포트</li>
                <li>✖ 고급 커스터마이징</li>
              </ul>
              <a href="/checkout?priceId=price_1T18BGRap0JkQNsmaUVhyNFr" className="block mt-8 px-6 py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition">
                Starter 선택
              </a>
            </div>
            <div className="border-2 border-blue-600 rounded-2xl p-8 shadow-lg">
              <h3 className="text-2xl font-semibold text-blue-600">Pro</h3>
              <p className="mt-2 text-gray-600">성장하는 비즈니스에 적합한 플랜</p>
              <p className="mt-6 text-4xl font-bold">$59<span className="text-lg text-gray-500">/월</span></p>
              <ul className="mt-6 space-y-3 text-gray-600 text-left">
                <li>✔ 월 2000건 대화</li>
                <li>✔ 고급 자동화 흐름</li>
                <li>✔ 우선 지원</li>
                <li>✖ 전담 계정 매니저</li>
              </ul>
              <a href="/checkout?priceId=price_1T15gVRap0JkQNsm59vukMuR" className="block mt-8 px-6 py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition">
                Pro 선택
              </a>
            </div>
            <div className="border rounded-2xl p-8 shadow-sm hover:shadow-md transition">
              <h3 className="text-2xl font-semibold">Premium</h3>
              <p className="mt-2 text-gray-600">대기업 및 고수요 사용자를 위한 플랜</p>
              <p className="mt-6 text-4xl font-bold">$99<span className="text-lg text-gray-500">/월</span></p>
              <ul className="mt-6 space-y-3 text-gray-600 text-left">
                <li>✔ 무제한 대화</li>
                <li>✔ 모든 고급 기능</li>
                <li>✔ 전담 계정 매니저</li>
                <li>✔ 맞춤형 통합 개발</li>
              </ul>
              <a href="/checkout?priceId=price_1T15jDRap0JkQNsmQRvEkpcm" className="block mt-8 px-6 py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition">
                Premium 선택
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Additional Services */}
      <section id="services" className="py-24 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-extrabold">추가 서비스</h2>
          <div className="mt-16 grid md:grid-cols-3 gap-10">
            <div className="border rounded-2xl p-8 bg-white shadow-sm hover:shadow-md transition">
              <h3 className="text-xl font-semibold">고급 맞춤화</h3>
              <p className="mt-2 text-gray-600">브랜드와 비즈니스 요구사항에 맞게 NexoBot을 완전히 커스터마이징합니다.</p>
              <p className="mt-6 text-3xl font-bold">$99</p>
              <a href="/checkout?priceId=price_1T161uRap0JkQNsm3BJZGOEu" className="block mt-6 px-6 py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition">구매하기</a>
            </div>
            <div className="border rounded-2xl p-8 bg-white shadow-sm hover:shadow-md transition">
              <h3 className="text-xl font-semibold">고급 자동화</h3>
              <p className="mt-2 text-gray-600">복잡한 자동화 워크플로우를 구축하여 고급 비즈니스 요구사항을 충족시킵니다.</p>
              <p className="mt-6 text-3xl font-bold">$149</p>
              <a href="/checkout?priceId=price_1T163sRap0JkQNsmOrHBQuJp" className="block mt-6 px-6 py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition">구매하기</a>
            </div>
            <div className="border rounded-2xl p-8 bg-white shadow-sm hover:shadow-md transition">
              <h3 className="text-xl font-semibold">외부 통합</h3>
              <p className="mt-2 text-gray-600">NexoBot을 기존 CRM, ERP 또는 다른 비즈니스 시스템과 원활하게 통합합니다.</p>
              <p className="mt-6 text-3xl font-bold">$199</p>
              <a href="/checkout?priceId=price_1T166cRap0JkQNsmuPTOPBBu" className="block mt-6 px-6 py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition">구매하기</a>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-24 bg-white">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-4xl font-extrabold text-center">자주 묻는 질문</h2>
          <div className="mt-16 space-y-8">
            <div>
              <h3 className="text-xl font-semibold">NexoBot을 사용하려면 기술 지식이 필요한가요?</h3>
              <p className="mt-2 text-gray-600">아닙니다! NexoBot은 기술적 배경 없이도 쉽게 사용할 수 있도록 설계되었습니다. 직관적인 인터페이스로 몇 분 안에 설정을 완료할 수 있습니다.</p>
            </div>
            <div>
              <h3 className="text-xl font-semibold">NexoBot은 WhatsApp을 지원하나요?</h3>
              <p className="mt-2 text-gray-600">네! NexoBot은 WhatsApp Business API를 완벽하게 지원하며, Instagram, Facebook Messenger, 웹사이트 채팅 등 다양한 플랫폼도 지원합니다.</p>
            </div>
            <div>
              <h3 className="text-xl font-semibold">언제든지 구독을 취소할 수 있나요?</h3>
              <p className="mt-2 text-gray-600">물론입니다. 추가 요금이나 위약금 없이 언제든지 구독을 취소할 수 있습니다. 현재 청구 주기가 끝나면 서비스가 중단됩니다.</p>
            </div>
            <div>
              <h3 className="text-xl font-semibold">어떤 종류의 고객 지원을 제공하나요?</h3>
              <p className="mt-2 text-gray-600">온라인 채팅, 이메일, 화상 통화를 통해 24/7 고객 지원을 제공합니다. Pro 및 Premium 플랜 사용자는 우선 지원 서비스를 이용할 수 있습니다.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section id="cta" className="py-32 bg-blue-600 text-white text-center">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-5xl font-extrabold leading-tight">오늘 NexoBot으로 비즈니스 자동화</h2>
          <p className="mt-6 text-lg text-blue-100 max-w-2xl mx-auto">
            이미 수천 개의 기업이 NexoBot으로 매출과 고객 만족도를 높이고 있습니다. 지금 바로 시작하고 리스크 없이 체험해 보세요.
          </p>
          <Link href="/auth/signup" className="inline-block mt-10 px-12 py-4 bg-white text-blue-600 font-semibold rounded-xl shadow-lg hover:bg-gray-100 transition-all text-lg">
            무료로 시작하기 →
          </Link>
          <p className="mt-4 text-blue-200 text-sm">신용카드 불필요 · 언제든지 취소 가능</p>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t bg-gray-50">
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <p className="text-xl font-extrabold text-blue-600">NexoBot</p>
            <p className="text-sm text-gray-400 mt-1">© {new Date().getFullYear()} NexoBot — 모든 권리 보유</p>
          </div>
          <div className="flex gap-6 text-sm text-gray-500">
            <a href="#pricing" className="hover:text-blue-600 transition">요금제</a>
            <a href="#faq" className="hover:text-blue-600 transition">FAQ</a>
            <Link href="/auth/login" className="hover:text-blue-600 transition">로그인</Link>
          </div>
        </div>
      </footer>
    </main>
  );
}
