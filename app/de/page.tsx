import Link from "next/link";

export default function HomeDE() {
  return (
    <main className="min-h-screen bg-white text-gray-900">
      {/* Navbar */}
      <nav className="max-w-6xl mx-auto px-6 py-5 flex items-center justify-between">
        <Link href="/de" className="text-2xl font-extrabold text-blue-600">NexoBot</Link>
        <div className="flex items-center gap-4">
          <a href="#pricing" className="text-sm font-medium text-gray-600 hover:text-blue-600 transition">Preise</a>
          <a href="#faq" className="text-sm font-medium text-gray-600 hover:text-blue-600 transition">FAQ</a>
          <Link href="/auth/login" className="text-sm font-medium text-gray-700 hover:text-blue-600 transition">Anmelden</Link>
          <Link href="/auth/signup" className="px-4 py-2 bg-blue-600 text-white text-sm font-semibold rounded-lg hover:bg-blue-700 transition">Kostenlos starten</Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="max-w-4xl mx-auto px-6 py-24 text-center">
        <span className="inline-block bg-blue-100 text-blue-700 text-xs font-semibold px-3 py-1 rounded-full mb-6 uppercase tracking-wide">
          KI f&uuml;r Vertrieb &amp; Kundensupport
        </span>
        <h1 className="text-5xl font-extrabold leading-tight mb-6">
          Automatisieren Sie Ihren Vertrieb und Kundensupport mit NexoBot
        </h1>
        <p className="text-xl text-gray-600 mb-10">
          NexoBot verwaltet Ihre Leads, beantwortet Kundenanfragen und steigert Ihren Umsatz rund um die Uhr &mdash; w&auml;hrend Sie sich auf das Wesentliche konzentrieren.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/auth/signup" className="px-8 py-4 bg-blue-600 text-white text-lg font-semibold rounded-xl hover:bg-blue-700 transition shadow-lg">
            Kostenlos starten
          </Link>
          <a href="#pricing" className="px-8 py-4 border border-gray-300 text-gray-700 text-lg font-semibold rounded-xl hover:border-blue-600 hover:text-blue-600 transition">
            Preise ansehen
          </a>
        </div>
        <p className="mt-4 text-sm text-gray-500">Keine Kreditkarte erforderlich</p>
      </section>

      {/* Features */}
      <section className="bg-gray-50 py-20">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-extrabold text-center mb-4">Warum NexoBot w&auml;hlen?</h2>
          <p className="text-center text-gray-500 mb-14 max-w-2xl mx-auto">
            Alles, was Sie brauchen, um Ihr Gesch&auml;ft zu automatisieren und ein au&szlig;ergew&ouml;hnliches Kundenerlebnis zu bieten.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
              <div className="text-3xl mb-4">🤖</div>
              <h3 className="text-xl font-bold mb-2">Konversations-KI</h3>
              <p className="text-gray-600">Beantwortet automatisch h&auml;ufig gestellte Fragen und qualifiziert Ihre Leads in Echtzeit, 24/7.</p>
            </div>
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
              <div className="text-3xl mb-4">📈</div>
              <h3 className="text-xl font-bold mb-2">Umsatzsteigerung</h3>
              <p className="text-gray-600">Konvertieren Sie mehr Besucher in Kunden durch personalisierte Gespr&auml;che und automatische Follow-ups.</p>
            </div>
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
              <div className="text-3xl mb-4">🔗</div>
              <h3 className="text-xl font-bold mb-2">Einfache Integrationen</h3>
              <p className="text-gray-600">Verbinden Sie NexoBot mit Ihren bestehenden Tools: CRM, E-Mail, WhatsApp, Slack und vieles mehr.</p>
            </div>
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
              <div className="text-3xl mb-4">📊</div>
              <h3 className="text-xl font-bold mb-2">Analysen &amp; Berichte</h3>
              <p className="text-gray-600">Verfolgen Sie die Leistung Ihres Bots mit intuitiven Dashboards und detaillierten Berichten.</p>
            </div>
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
              <div className="text-3xl mb-4">🛡️</div>
              <h3 className="text-xl font-bold mb-2">Sicherheit &amp; Konformit&auml;t</h3>
              <p className="text-gray-600">Ihre Daten sind mit Ende-zu-Ende-Verschl&uuml;sselung und vollst&auml;ndiger DSGVO-Konformit&auml;t gesch&uuml;tzt.</p>
            </div>
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
              <div className="text-3xl mb-4">⚡</div>
              <h3 className="text-xl font-bold mb-2">Schnelle Einrichtung</h3>
              <p className="text-gray-600">Starten Sie Ihren Bot in weniger als 10 Minuten ohne technische Kenntnisse.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-20">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-extrabold text-center mb-4">Einfache und transparente Preise</h2>
          <p className="text-center text-gray-500 mb-14 max-w-2xl mx-auto">
            W&auml;hlen Sie den Plan, der Ihren Anforderungen entspricht. Jederzeit wechseln oder k&uuml;ndigen.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Starter */}
            <div className="rounded-2xl border border-gray-200 p-8 flex flex-col">
              <h3 className="text-xl font-bold mb-2">Starter</h3>
              <p className="text-gray-500 text-sm mb-6">Ideal f&uuml;r Freiberufler und kleine Teams.</p>
              <div className="text-4xl font-extrabold mb-1">$29<span className="text-lg font-medium text-gray-500">/Monat</span></div>
              <ul className="mt-6 mb-8 space-y-3 text-sm text-gray-700 flex-1">
                <li>✅ 1 aktiver Bot</li>
                <li>✅ Bis zu 500 Gespr&auml;che/Monat</li>
                <li>✅ Basis-Integrationen</li>
                <li>✅ E-Mail-Support</li>
              </ul>
              <Link href="/auth/signup?priceId=price_1T18BGRap0JkQNsmaUVhyNFr" className="block text-center px-6 py-3 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition">
                Jetzt starten
              </Link>
            </div>
            {/* Pro */}
            <div className="rounded-2xl border-2 border-blue-600 p-8 flex flex-col relative shadow-lg">
              <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-blue-600 text-white text-xs font-bold px-4 py-1 rounded-full">Beliebteste</span>
              <h3 className="text-xl font-bold mb-2">Pro</h3>
              <p className="text-gray-500 text-sm mb-6">F&uuml;r wachsende Unternehmen.</p>
              <div className="text-4xl font-extrabold mb-1">$59<span className="text-lg font-medium text-gray-500">/Monat</span></div>
              <ul className="mt-6 mb-8 space-y-3 text-sm text-gray-700 flex-1">
                <li>✅ 5 aktive Bots</li>
                <li>✅ Bis zu 5.000 Gespr&auml;che/Monat</li>
                <li>✅ Erweiterte Integrationen</li>
                <li>✅ Priorit&auml;ts-Support</li>
                <li>✅ Detaillierte Analysen</li>
              </ul>
              <Link href="/auth/signup?priceId=price_1T15gVRap0JkQNsm59vukMuR" className="block text-center px-6 py-3 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition">
                Jetzt starten
              </Link>
            </div>
            {/* Premium */}
            <div className="rounded-2xl border border-gray-200 p-8 flex flex-col">
              <h3 className="text-xl font-bold mb-2">Premium</h3>
              <p className="text-gray-500 text-sm mb-6">F&uuml;r gro&szlig;e Unternehmen mit erweiterten Anforderungen.</p>
              <div className="text-4xl font-extrabold mb-1">$99<span className="text-lg font-medium text-gray-500">/Monat</span></div>
              <ul className="mt-6 mb-8 space-y-3 text-sm text-gray-700 flex-1">
                <li>✅ Unbegrenzte Bots</li>
                <li>✅ Unbegrenzte Gespr&auml;che</li>
                <li>✅ Alle Integrationen</li>
                <li>✅ Dedizierter 24/7-Support</li>
                <li>✅ Erweiterte Anpassung</li>
                <li>✅ Garantiertes SLA</li>
              </ul>
              <Link href="/auth/signup?priceId=price_1T15jDRap0JkQNsmQRvEkpcm" className="block text-center px-6 py-3 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition">
                Jetzt starten
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Additional Services */}
      <section className="bg-gray-50 py-20">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-extrabold text-center mb-4">Zus&auml;tzliche Dienste</h2>
          <p className="text-center text-gray-500 mb-14 max-w-2xl mx-auto">
            Verbessern Sie Ihre NexoBot-Erfahrung mit unseren erg&auml;nzenden Diensten.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-2xl border border-gray-200 p-8 flex flex-col">
              <div className="text-3xl mb-4">🎨</div>
              <h3 className="text-xl font-bold mb-2">Erweiterte Anpassung</h3>
              <p className="text-gray-600 mb-6 flex-1">Passen Sie das Erscheinungsbild und Verhalten Ihres Bots an Ihre Markenidentit&auml;t an.</p>
              <div className="text-2xl font-extrabold mb-4">$99</div>
              <Link href="/auth/signup?priceId=price_1T161uRap0JkQNsm3BJZGOEu" className="block text-center px-6 py-3 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition">
                Mehr erfahren
              </Link>
            </div>
            <div className="bg-white rounded-2xl border border-gray-200 p-8 flex flex-col">
              <div className="text-3xl mb-4">⚙️</div>
              <h3 className="text-xl font-bold mb-2">Erweiterte Automatisierungen</h3>
              <p className="text-gray-600 mb-6 flex-1">Erstellen Sie komplexe Workflows und Automatisierungen zur Optimierung Ihrer Gesch&auml;ftsprozesse.</p>
              <div className="text-2xl font-extrabold mb-4">$149</div>
              <Link href="/auth/signup?priceId=price_1T163sRap0JkQNsmOrHBQuJp" className="block text-center px-6 py-3 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition">
                Mehr erfahren
              </Link>
            </div>
            <div className="bg-white rounded-2xl border border-gray-200 p-8 flex flex-col">
              <div className="text-3xl mb-4">🔌</div>
              <h3 className="text-xl font-bold mb-2">Externe Integrationen</h3>
              <p className="text-gray-600 mb-6 flex-1">Verbinden Sie NexoBot mit Ihren internen Systemen und Drittanbieter-Tools mit ma&szlig;geschneiderten Integrationen.</p>
              <div className="text-2xl font-extrabold mb-4">$199</div>
              <Link href="/auth/signup?priceId=price_1T166cRap0JkQNsmuPTOPBBu" className="block text-center px-6 py-3 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition">
                Mehr erfahren
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-20">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="text-3xl font-extrabold text-center mb-14">H&auml;ufig gestellte Fragen</h2>
          <div className="space-y-8">
            <div>
              <h3 className="text-lg font-bold mb-2">Wie funktioniert NexoBot?</h3>
              <p className="text-gray-600">NexoBot nutzt k&uuml;nstliche Intelligenz, um Kundennachrichten zu analysieren und automatisch nat&uuml;rlich und relevant zu antworten, 24 Stunden am Tag.</p>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-2">Kann ich NexoBot kostenlos testen?</h3>
              <p className="text-gray-600">Ja! Sie k&ouml;nnen mit unserer kostenlosen Testversion ohne Kreditkarte beginnen. Entdecken Sie alle Funktionen, bevor Sie sich festlegen.</p>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-2">Welche Plattformen werden unterst&uuml;tzt?</h3>
              <p className="text-gray-600">NexoBot l&auml;sst sich in Ihre Website, WhatsApp, Facebook Messenger, Instagram, Slack und viele weitere Plattformen integrieren.</p>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-2">Kann ich meinen Plan jederzeit &auml;ndern?</h3>
              <p className="text-gray-600">Absolut. Sie k&ouml;nnen Ihren Plan jederzeit &uuml;ber Ihr Dashboard upgraden oder downgraden, ohne versteckte Kosten.</p>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-2">Sind meine Daten sicher?</h3>
              <p className="text-gray-600">Sicherheit hat f&uuml;r uns h&ouml;chste Priorit&auml;t. Alle Daten sind verschl&uuml;sselt und wir sind DSGVO-konform. Ihre Informationen werden niemals an Dritte weitergegeben.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="bg-blue-600 py-20">
        <div className="max-w-3xl mx-auto px-6 text-center text-white">
          <h2 className="text-3xl font-extrabold mb-4">Bereit, Ihr Unternehmen zu transformieren?</h2>
          <p className="text-blue-100 mb-8 text-lg">
            Schlie&szlig;en Sie sich tausenden von Unternehmen an, die NexoBot nutzen, um ihr Wachstum zu automatisieren.
          </p>
          <Link href="/auth/signup" className="inline-block px-10 py-4 bg-white text-blue-600 text-lg font-bold rounded-xl hover:bg-blue-50 transition shadow-lg">
            Kostenlos starten
          </Link>
          <p className="mt-4 text-blue-200 text-sm">Keine Kreditkarte erforderlich &middot; Jederzeit k&uuml;ndbar</p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-12">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div>
              <Link href="/de" className="text-xl font-extrabold text-white">NexoBot</Link>
              <p className="text-sm mt-1">Automatisieren Sie Ihren Vertrieb und Kundensupport.</p>
            </div>
            <div className="flex gap-6 text-sm">
              <a href="#pricing" className="hover:text-white transition">Preise</a>
              <a href="#faq" className="hover:text-white transition">FAQ</a>
              <Link href="/auth/login" className="hover:text-white transition">Anmelden</Link>
              <Link href="/auth/signup" className="hover:text-white transition">Registrieren</Link>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-xs">
            <p>&copy; {new Date().getFullYear()} NexoBot. Alle Rechte vorbehalten.</p>
          </div>
        </div>
      </footer>
    </main>
  );
}
