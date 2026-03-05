import Link from "next/link";

export default function HomeNL() {
  return (
    <main className="min-h-screen bg-white text-gray-900">
      {/* Navbar */}
      <nav className="max-w-6xl mx-auto px-6 py-5 flex items-center justify-between">
        <Link href="/nl" className="text-2xl font-extrabold text-blue-600">NexoBot</Link>
        <div className="flex items-center gap-4">
          <a href="#pricing" className="text-sm font-medium text-gray-600 hover:text-blue-600 transition">Prijzen</a>
          <a href="#faq" className="text-sm font-medium text-gray-600 hover:text-blue-600 transition">FAQ</a>
          <Link href="/auth/login" className="text-sm font-medium text-gray-700 hover:text-blue-600 transition">Inloggen</Link>
          <Link href="/auth/signup" className="px-4 py-2 bg-blue-600 text-white text-sm font-semibold rounded-lg hover:bg-blue-700 transition">Gratis starten</Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="max-w-4xl mx-auto px-6 py-24 text-center">
        <span className="inline-block bg-blue-100 text-blue-700 text-xs font-semibold px-3 py-1 rounded-full mb-6 uppercase tracking-wide">
          AI voor Verkoop &amp; Klantenservice
        </span>
        <h1 className="text-5xl font-extrabold leading-tight mb-6">
          Automatiseer uw Verkoop en Klantenservice met NexoBot
        </h1>
        <p className="text-xl text-gray-600 mb-10">
          NexoBot beheert uw leads, beantwoordt klanten en boogt uw omzet 24 uur per dag &mdash; terwijl u zich concentreert op wat echt belangrijk is.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/auth/signup" className="px-8 py-4 bg-blue-600 text-white text-lg font-semibold rounded-xl hover:bg-blue-700 transition shadow-lg">
            Gratis starten
          </Link>
          <a href="#pricing" className="px-8 py-4 border border-gray-300 text-gray-700 text-lg font-semibold rounded-xl hover:border-blue-600 hover:text-blue-600 transition">
            Bekijk prijzen
          </a>
        </div>
        <p className="mt-4 text-sm text-gray-500">Geen creditcard vereist</p>
      </section>

      {/* Features */}
      <section className="bg-gray-50 py-20">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-extrabold text-center mb-4">Waarom NexoBot kiezen?</h2>
          <p className="text-center text-gray-500 mb-14 max-w-2xl mx-auto">
            Alles wat u nodig heeft om uw bedrijf te automatiseren en een uitzonderlijke klantervaring te bieden.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
              <div className="text-3xl mb-4">🤖</div>
              <h3 className="text-xl font-bold mb-2">Conversationele AI</h3>
              <p className="text-gray-600">Beantwoordt automatisch veelgestelde vragen en kwalificeert uw leads in realtime, 24/7.</p>
            </div>
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
              <div className="text-3xl mb-4">📈</div>
              <h3 className="text-xl font-bold mb-2">Omzetverhoging</h3>
              <p className="text-gray-600">Converteer meer bezoekers naar klanten door gepersonaliseerde gesprekken en automatische follow-ups.</p>
            </div>
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
              <div className="text-3xl mb-4">🔗</div>
              <h3 className="text-xl font-bold mb-2">Eenvoudige Integraties</h3>
              <p className="text-gray-600">Verbind NexoBot met uw bestaande tools: CRM, e-mail, WhatsApp, Slack en veel meer.</p>
            </div>
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
              <div className="text-3xl mb-4">📊</div>
              <h3 className="text-xl font-bold mb-2">Analyses &amp; Rapporten</h3>
              <p className="text-gray-600">Volg de prestaties van uw bot met intuïtieve dashboards en gedetailleerde rapporten.</p>
            </div>
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
              <div className="text-3xl mb-4">🛡️</div>
              <h3 className="text-xl font-bold mb-2">Veiligheid &amp; Compliance</h3>
              <p className="text-gray-600">Uw gegevens zijn beschermd met end-to-end encryptie en volledige AVG-conformiteit.</p>
            </div>
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
              <div className="text-3xl mb-4">⚡</div>
              <h3 className="text-xl font-bold mb-2">Snelle Installatie</h3>
              <p className="text-gray-600">Start uw bot in minder dan 10 minuten zonder technische kennis vereist.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-20">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-extrabold text-center mb-4">Eenvoudige en transparante prijzen</h2>
          <p className="text-center text-gray-500 mb-14 max-w-2xl mx-auto">
            Kies het plan dat bij uw behoeften past. Wissel of annuleer op elk gewenst moment.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Starter */}
            <div className="rounded-2xl border border-gray-200 p-8 flex flex-col">
              <h3 className="text-xl font-bold mb-2">Starter</h3>
              <p className="text-gray-500 text-sm mb-6">Ideaal voor freelancers en kleine teams.</p>
              <div className="text-4xl font-extrabold mb-1">$29<span className="text-lg font-medium text-gray-500">/maand</span></div>
              <ul className="mt-6 mb-8 space-y-3 text-sm text-gray-700 flex-1">
                <li>✅ 1 actieve bot</li>
                <li>✅ Tot 500 gesprekken/maand</li>
                <li>✅ Basis integraties</li>
                <li>✅ E-mail ondersteuning</li>
              </ul>
              <Link href="/auth/signup?priceId=price_1T18BGRap0JkQNsmaUVhyNFr" className="block text-center px-6 py-3 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition">
                Nu starten
              </Link>
            </div>
            {/* Pro */}
            <div className="rounded-2xl border-2 border-blue-600 p-8 flex flex-col relative shadow-lg">
              <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-blue-600 text-white text-xs font-bold px-4 py-1 rounded-full">Meest populair</span>
              <h3 className="text-xl font-bold mb-2">Pro</h3>
              <p className="text-gray-500 text-sm mb-6">Voor groeiende bedrijven.</p>
              <div className="text-4xl font-extrabold mb-1">$59<span className="text-lg font-medium text-gray-500">/maand</span></div>
              <ul className="mt-6 mb-8 space-y-3 text-sm text-gray-700 flex-1">
                <li>✅ 5 actieve bots</li>
                <li>✅ Tot 5.000 gesprekken/maand</li>
                <li>✅ Geavanceerde integraties</li>
                <li>✅ Prioriteitsondersteuning</li>
                <li>✅ Gedetailleerde analyses</li>
              </ul>
              <Link href="/auth/signup?priceId=price_1T15gVRap0JkQNsm59vukMuR" className="block text-center px-6 py-3 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition">
                Nu starten
              </Link>
            </div>
            {/* Premium */}
            <div className="rounded-2xl border border-gray-200 p-8 flex flex-col">
              <h3 className="text-xl font-bold mb-2">Premium</h3>
              <p className="text-gray-500 text-sm mb-6">Voor grote bedrijven met geavanceerde behoeften.</p>
              <div className="text-4xl font-extrabold mb-1">$99<span className="text-lg font-medium text-gray-500">/maand</span></div>
              <ul className="mt-6 mb-8 space-y-3 text-sm text-gray-700 flex-1">
                <li>✅ Onbeperkte bots</li>
                <li>✅ Onbeperkte gesprekken</li>
                <li>✅ Alle integraties</li>
                <li>✅ Dedicated 24/7 support</li>
                <li>✅ Geavanceerde aanpassing</li>
                <li>✅ Gegarandeerde SLA</li>
              </ul>
              <Link href="/auth/signup?priceId=price_1T15jDRap0JkQNsmQRvEkpcm" className="block text-center px-6 py-3 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition">
                Nu starten
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Additional Services */}
      <section className="bg-gray-50 py-20">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-extrabold text-center mb-4">Extra Diensten</h2>
          <p className="text-center text-gray-500 mb-14 max-w-2xl mx-auto">
            Verbeter uw NexoBot-ervaring met onze aanvullende diensten.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-2xl border border-gray-200 p-8 flex flex-col">
              <div className="text-3xl mb-4">🎨</div>
              <h3 className="text-xl font-bold mb-2">Geavanceerde Aanpassing</h3>
              <p className="text-gray-600 mb-6 flex-1">Pas het uiterlijk en gedrag van uw bot aan uw merkidentiteit aan.</p>
              <div className="text-2xl font-extrabold mb-4">$99</div>
              <Link href="/auth/signup?priceId=price_1T161uRap0JkQNsm3BJZGOEu" className="block text-center px-6 py-3 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition">
                Meer informatie
              </Link>
            </div>
            <div className="bg-white rounded-2xl border border-gray-200 p-8 flex flex-col">
              <div className="text-3xl mb-4">⚙️</div>
              <h3 className="text-xl font-bold mb-2">Geavanceerde Automatiseringen</h3>
              <p className="text-gray-600 mb-6 flex-1">Maak complexe workflows en automatiseringen om uw bedrijfsprocessen te optimaliseren.</p>
              <div className="text-2xl font-extrabold mb-4">$149</div>
              <Link href="/auth/signup?priceId=price_1T163sRap0JkQNsmOrHBQuJp" className="block text-center px-6 py-3 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition">
                Meer informatie
              </Link>
            </div>
            <div className="bg-white rounded-2xl border border-gray-200 p-8 flex flex-col">
              <div className="text-3xl mb-4">🔌</div>
              <h3 className="text-xl font-bold mb-2">Externe Integraties</h3>
              <p className="text-gray-600 mb-6 flex-1">Verbind NexoBot met uw interne systemen en tools van derden met op maat gemaakte integraties.</p>
              <div className="text-2xl font-extrabold mb-4">$199</div>
              <Link href="/auth/signup?priceId=price_1T166cRap0JkQNsmuPTOPBBu" className="block text-center px-6 py-3 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition">
                Meer informatie
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-20">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="text-3xl font-extrabold text-center mb-14">Veelgestelde Vragen</h2>
          <div className="space-y-8">
            <div>
              <h3 className="text-lg font-bold mb-2">Hoe werkt NexoBot?</h3>
              <p className="text-gray-600">NexoBot gebruikt kunstmatige intelligentie om berichten van uw klanten te analyseren en automatisch op een natuurlijke en relevante manier te antwoorden, 24 uur per dag.</p>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-2">Kan ik NexoBot gratis proberen?</h3>
              <p className="text-gray-600">Ja! U kunt beginnen met onze gratis proefversie zonder creditcard. Ontdek alle functies voordat u zich vastlegt.</p>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-2">Welke platforms worden ondersteund?</h3>
              <p className="text-gray-600">NexoBot integreert met uw website, WhatsApp, Facebook Messenger, Instagram, Slack en vele andere platforms.</p>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-2">Kan ik op elk moment van plan wisselen?</h3>
              <p className="text-gray-600">Absoluut. U kunt uw plan op elk moment upgraden of downgraden via uw dashboard, zonder verborgen kosten.</p>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-2">Zijn mijn gegevens veilig?</h3>
              <p className="text-gray-600">Veiligheid is onze topprioriteit. Alle gegevens zijn versleuteld en wij zijn AVG-conform. Uw informatie wordt nooit gedeeld met derden.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="bg-blue-600 py-20">
        <div className="max-w-3xl mx-auto px-6 text-center text-white">
          <h2 className="text-3xl font-extrabold mb-4">Klaar om uw bedrijf te transformeren?</h2>
          <p className="text-blue-100 mb-8 text-lg">
            Sluit u aan bij duizenden bedrijven die NexoBot gebruiken om hun groei te automatiseren.
          </p>
          <Link href="/auth/signup" className="inline-block px-10 py-4 bg-white text-blue-600 text-lg font-bold rounded-xl hover:bg-blue-50 transition shadow-lg">
            Gratis starten
          </Link>
          <p className="mt-4 text-blue-200 text-sm">Geen creditcard vereist &middot; Op elk moment opzegbaar</p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-12">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div>
              <Link href="/nl" className="text-xl font-extrabold text-white">NexoBot</Link>
              <p className="text-sm mt-1">Automatiseer uw verkoop en klantenservice.</p>
            </div>
            <div className="flex gap-6 text-sm">
              <a href="#pricing" className="hover:text-white transition">Prijzen</a>
              <a href="#faq" className="hover:text-white transition">FAQ</a>
              <Link href="/auth/login" className="hover:text-white transition">Inloggen</Link>
              <Link href="/auth/signup" className="hover:text-white transition">Registreren</Link>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-xs">
            <p>&copy; {new Date().getFullYear()} NexoBot. Alle rechten voorbehouden.</p>
          </div>
        </div>
      </footer>
    </main>
  );
}
