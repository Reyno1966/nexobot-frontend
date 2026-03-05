import Link from "next/link";

export default function HomeRU() {
  return (
    <main className="min-h-screen bg-white text-gray-900">
      {/* Navbar */}
      <nav className="max-w-6xl mx-auto px-6 py-5 flex items-center justify-between">
        <Link href="/ru" className="text-2xl font-extrabold text-blue-600">NexoBot</Link>
        <div className="flex items-center gap-4">
          <a href="#pricing" className="text-sm font-medium text-gray-600 hover:text-blue-600 transition">Цены</a>
          <a href="#faq" className="text-sm font-medium text-gray-600 hover:text-blue-600 transition">FAQ</a>
          <Link href="/auth/login" className="text-sm font-medium text-gray-700 hover:text-blue-600 transition">Войти</Link>
          <Link href="/auth/signup" className="px-4 py-2 bg-blue-600 text-white text-sm font-semibold rounded-lg hover:bg-blue-700 transition">Начать бесплатно</Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="max-w-6xl mx-auto px-6 py-24 text-center">
        <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 text-sm font-medium px-4 py-1.5 rounded-full mb-8">
          <span>✨</span> ИИ-автоматизация для вашего бизнеса
        </div>
        <h1 className="text-6xl font-extrabold leading-tight tracking-tight">
          Автоматизируйте продажи и поддержку клиентов с <span className="text-blue-600">NexoBot</span>
        </h1>
        <p className="mt-6 text-xl text-gray-600 max-w-2xl mx-auto">
          Ваш умный помощник, который отвечает клиентам, генерирует продажи и работает на вас 24/7. Экономьте время, увеличивайте доход и масштабируйте бизнес без усилий.
        </p>
        <div className="mt-12 flex justify-center gap-4 flex-wrap">
          <Link href="/auth/signup" className="px-10 py-4 bg-blue-600 text-white rounded-xl font-semibold shadow-md hover:bg-blue-700 hover:shadow-lg transition-all">
            Начать бесплатно →
          </Link>
          <a href="#features" className="px-10 py-4 border border-gray-300 rounded-xl font-semibold hover:bg-gray-100 transition-all">
            Как это работает
          </a>
        </div>
        <p className="mt-5 text-sm text-gray-400">Без кредитной карты · Отмена в любое время</p>
      </section>

      {/* Features */}
      <section id="features" className="py-24 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-extrabold">Как NexoBot помогает вашему бизнесу</h2>
          <div className="mt-16 grid md:grid-cols-3 gap-12">
            <div className="text-center">
              <div className="text-blue-600 text-5xl mb-4">⚡</div>
              <h3 className="text-2xl font-semibold">Мгновенные ответы</h3>
              <p className="mt-3 text-gray-600">Автоматически отвечайте на запросы клиентов круглосуточно. Никаких задержек — только мгновенное обслуживание.</p>
            </div>
            <div className="text-center">
              <div className="text-blue-600 text-5xl mb-4">💬</div>
              <h3 className="text-2xl font-semibold">Все каналы</h3>
              <p className="mt-3 text-gray-600">Объедините WhatsApp, сайт, социальные сети и другие каналы в одной платформе для удобного управления.</p>
            </div>
            <div className="text-center">
              <div className="text-blue-600 text-5xl mb-4">🚀</div>
              <h3 className="text-2xl font-semibold">Рост продаж</h3>
              <p className="mt-3 text-gray-600">Умно направляйте потенциальных клиентов по воронке продаж и автоматически увеличивайте выручку.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-extrabold">Выберите подходящий тариф</h2>
          <div className="mt-16 grid md:grid-cols-3 gap-10">
            <div className="border rounded-2xl p-8 shadow-sm hover:shadow-md transition">
              <h3 className="text-2xl font-semibold">Starter</h3>
              <p className="mt-2 text-gray-600">Идеально для малого бизнеса</p>
              <p className="mt-6 text-4xl font-bold">$29<span className="text-lg text-gray-500">/мес</span></p>
              <ul className="mt-6 space-y-3 text-gray-600 text-left">
                <li>✔ До 500 диалогов в месяц</li>
                <li>✔ Базовые сценарии автоматизации</li>
                <li>✔ Поддержка по email</li>
                <li>✔ Базовая аналитика</li>
                <li>✖ Расширенная настройка</li>
              </ul>
              <a href="/checkout?priceId=price_1T18BGRap0JkQNsmaUVhyNFr" className="block mt-8 px-6 py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition">
                Выбрать Starter
              </a>
            </div>
            <div className="border-2 border-blue-600 rounded-2xl p-8 shadow-lg">
              <h3 className="text-2xl font-semibold text-blue-600">Pro</h3>
              <p className="mt-2 text-gray-600">Для растущего бизнеса</p>
              <p className="mt-6 text-4xl font-bold">$59<span className="text-lg text-gray-500">/мес</span></p>
              <ul className="mt-6 space-y-3 text-gray-600 text-left">
                <li>✔ До 2000 диалогов в месяц</li>
                <li>✔ Продвинутые сценарии автоматизации</li>
                <li>✔ Приоритетная поддержка</li>
                <li>✖ Персональный менеджер</li>
              </ul>
              <a href="/checkout?priceId=price_1T15gVRap0JkQNsm59vukMuR" className="block mt-8 px-6 py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition">
                Выбрать Pro
              </a>
            </div>
            <div className="border rounded-2xl p-8 shadow-sm hover:shadow-md transition">
              <h3 className="text-2xl font-semibold">Premium</h3>
              <p className="mt-2 text-gray-600">Для крупного бизнеса с высокими требованиями</p>
              <p className="mt-6 text-4xl font-bold">$99<span className="text-lg text-gray-500">/мес</span></p>
              <ul className="mt-6 space-y-3 text-gray-600 text-left">
                <li>✔ Неограниченные диалоги</li>
                <li>✔ Все расширенные функции</li>
                <li>✔ Персональный менеджер</li>
                <li>✔ Разработка интеграций на заказ</li>
              </ul>
              <a href="/checkout?priceId=price_1T15jDRap0JkQNsmQRvEkpcm" className="block mt-8 px-6 py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition">
                Выбрать Premium
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Additional Services */}
      <section id="services" className="py-24 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-extrabold">Дополнительные услуги</h2>
          <div className="mt-16 grid md:grid-cols-3 gap-10">
            <div className="border rounded-2xl p-8 bg-white shadow-sm hover:shadow-md transition">
              <h3 className="text-xl font-semibold">Расширенная настройка</h3>
              <p className="mt-2 text-gray-600">Полная кастомизация NexoBot под ваш бренд и бизнес-требования.</p>
              <p className="mt-6 text-3xl font-bold">$99</p>
              <a href="/checkout?priceId=price_1T161uRap0JkQNsm3BJZGOEu" className="block mt-6 px-6 py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition">Купить</a>
            </div>
            <div className="border rounded-2xl p-8 bg-white shadow-sm hover:shadow-md transition">
              <h3 className="text-xl font-semibold">Расширенная автоматизация</h3>
              <p className="mt-2 text-gray-600">Создание сложных автоматизированных рабочих процессов для ваших бизнес-потребностей.</p>
              <p className="mt-6 text-3xl font-bold">$149</p>
              <a href="/checkout?priceId=price_1T163sRap0JkQNsmOrHBQuJp" className="block mt-6 px-6 py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition">Купить</a>
            </div>
            <div className="border rounded-2xl p-8 bg-white shadow-sm hover:shadow-md transition">
              <h3 className="text-xl font-semibold">Внешние интеграции</h3>
              <p className="mt-2 text-gray-600">Бесшовная интеграция NexoBot с вашей CRM, ERP или другими бизнес-системами.</p>
              <p className="mt-6 text-3xl font-bold">$199</p>
              <a href="/checkout?priceId=price_1T166cRap0JkQNsmuPTOPBBu" className="block mt-6 px-6 py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition">Купить</a>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-24 bg-white">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-4xl font-extrabold text-center">Часто задаваемые вопросы</h2>
          <div className="mt-16 space-y-8">
            <div>
              <h3 className="text-xl font-semibold">Нужны ли технические знания для использования NexoBot?</h3>
              <p className="mt-2 text-gray-600">Нет! NexoBot разработан так, чтобы быть простым в использовании без каких-либо технических навыков. Интуитивный интерфейс позволяет настроить систему за несколько минут.</p>
            </div>
            <div>
              <h3 className="text-xl font-semibold">Поддерживает ли NexoBot WhatsApp?</h3>
              <p className="mt-2 text-gray-600">Да! NexoBot полностью поддерживает WhatsApp Business API, а также Instagram, Facebook Messenger, чат на сайте и другие платформы.</p>
            </div>
            <div>
              <h3 className="text-xl font-semibold">Можно ли отменить подписку в любое время?</h3>
              <p className="mt-2 text-gray-600">Конечно. Вы можете отменить подписку в любое время без дополнительных платежей или штрафов. Сервис будет доступен до конца текущего расчётного периода.</p>
            </div>
            <div>
              <h3 className="text-xl font-semibold">Какую поддержку вы предоставляете?</h3>
              <p className="mt-2 text-gray-600">Мы предоставляем поддержку 24/7 через онлайн-чат, email и видеозвонки. Пользователи тарифов Pro и Premium пользуются приоритетным обслуживанием.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section id="cta" className="py-32 bg-blue-600 text-white text-center">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-5xl font-extrabold leading-tight">Автоматизируйте бизнес сегодня с NexoBot</h2>
          <p className="mt-6 text-lg text-blue-100 max-w-2xl mx-auto">
            Тысячи компаний уже используют NexoBot для увеличения продаж и повышения удовлетворённости клиентов. Начните прямо сейчас — без рисков.
          </p>
          <Link href="/auth/signup" className="inline-block mt-10 px-12 py-4 bg-white text-blue-600 font-semibold rounded-xl shadow-lg hover:bg-gray-100 transition-all text-lg">
            Начать бесплатно →
          </Link>
          <p className="mt-4 text-blue-200 text-sm">Без кредитной карты · Отмена в любое время</p>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t bg-gray-50">
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <p className="text-xl font-extrabold text-blue-600">NexoBot</p>
            <p className="text-sm text-gray-400 mt-1">© {new Date().getFullYear()} NexoBot — Все права защищены</p>
          </div>
          <div className="flex gap-6 text-sm text-gray-500">
            <a href="#pricing" className="hover:text-blue-600 transition">Цены</a>
            <a href="#faq" className="hover:text-blue-600 transition">FAQ</a>
            <Link href="/auth/login" className="hover:text-blue-600 transition">Войти</Link>
          </div>
        </div>
      </footer>
    </main>
  );
}
