export default function HomeNL() {
  return (
    <main className="bg-white text-gray-900">

      {/* HERO */}
      <section className="py-32 px-6 text-center max-w-4xl mx-auto">
        <h1 className="text-5xl font-extrabold leading-tight">
          Automatiseer uw verkoop en klantenservice met{" "}
          <span className="text-blue-600">NexoBot</span>
        </h1>

        <p className="mt-6 text-lg text-gray-600">
          Uw slimme assistent die klanten beantwoordt, verkopen genereert en
          24/7 voor u werkt. Bespaar tijd, verhoog uw omzet en schaal uw bedrijf
          zonder moeite.
        </p>

        <div className="mt-10 flex justify-center gap-4">
          <a
            href="/en"
            className="px-10 py-4 bg-blue-600 text-white rounded-xl font-semibold shadow-md hover:bg-blue-700 transition-all"
          >
            Start nu
          </a>

          <a
            href="#how"
            className="px-10 py-4 bg-white border border-gray-300 rounded-xl font-semibold hover:bg-gray-100 transition-all"
          >
            Bekijk hoe het werkt
          </a>
        </div>
      </section>

      {/* INTRO */}
      <section className="py-20 px-6 text-center max-w-3xl mx-auto">
        <h2 className="text-4xl font-bold">
          Alles wat u nodig heeft om uw bedrijf te automatiseren
        </h2>

        <p className="mt-6 text-gray-600 text-lg">
          NexoBot combineert kunstmatige intelligentie, automatisering en
          multichannel-communicatie om u te helpen meer klanten te bedienen en
          meer verkopen te sluiten zonder extra inspanning.
        </p>
      </section>

      {/* FEATURES */}
      <section className="py-20 px-6 max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10">

        <div className="p-8 border rounded-2xl shadow-sm hover:shadow-md transition">
          <h3 className="text-xl font-bold mb-3">Automatische antwoorden 24/7</h3>
          <p className="text-gray-600">
            NexoBot reageert in realtime op klanten – zelfs terwijl u slaapt.
          </p>
        </div>

        <div className="p-8 border rounded-2xl shadow-sm hover:shadow-md transition">
          <h3 className="text-xl font-bold mb-3">Verkoopgeneratie</h3>
          <p className="text-gray-600">
            Zet gesprekken om in verkopen met slimme, gepersonaliseerde berichten.
          </p>
        </div>

        <div className="p-8 border rounded-2xl shadow-sm hover:shadow-md transition">
          <h3 className="text-xl font-bold mb-3">Multichannel</h3>
          <p className="text-gray-600">
            WhatsApp, Instagram, Facebook en website – alles op één plek.
          </p>
        </div>

      </section>

      {/* PRIJZEN */}
      <section className="py-24 px-6 bg-gray-50" id="pricing">
        <h2 className="text-4xl font-bold text-center mb-16">
          Kies het perfecte plan voor uw bedrijf
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-6xl mx-auto">

          {/* BASIC */}
          <div className="p-10 bg-white border rounded-2xl shadow-sm hover:shadow-md transition">
            <h3 className="text-2xl font-bold mb-4">Basic</h3>
            <p className="text-gray-600 mb-6">
              Ideaal voor kleine bedrijven die willen beginnen met automatisering.
            </p>
            <p className="text-4xl font-extrabold mb-6">€19<span className="text-lg">/maand</span></p>

            <ul className="text-gray-600 space-y-3 mb-8">
              <li>✔ Automatische antwoorden 24/7</li>
              <li>✔ Tot 500 berichten per maand</li>
              <li>✔ 1 gekoppeld kanaal</li>
              <li>✔ Basis ondersteuning</li>
            </ul>

            <a
              href="/en"
              className="block text-center px-8 py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition"
            >
              Starten
            </a>
          </div>

          {/* PRO */}
          <div className="p-10 bg-white border-2 border-blue-600 rounded-2xl shadow-md hover:shadow-lg transition">
            <h3 className="text-2xl font-bold mb-4">Pro</h3>
            <p className="text-gray-600 mb-6">
              Perfect voor bedrijven die willen groeien en meer verkopen willen genereren.
            </p>
            <p className="text-4xl font-extrabold mb-6">€49<span className="text-lg">/maand</span></p>

            <ul className="text-gray-600 space-y-3 mb-8">
              <li>✔ Geavanceerde automatische antwoorden</li>
              <li>✔ Onbeperkte berichten</li>
              <li>✔ 3 gekoppelde kanalen</li>
              <li>✔ Slimme automatiseringen</li>
              <li>✔ Prioritaire ondersteuning</li>
            </ul>

            <a
              href="/en"
              className="block text-center px-8 py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition"
            >
              Kies Pro
            </a>
          </div>

          {/* ENTERPRISE */}
          <div className="p-10 bg-white border rounded-2xl shadow-sm hover:shadow-md transition">
            <h3 className="text-2xl font-bold mb-4">Enterprise</h3>
            <p className="text-gray-600 mb-6">
              Voor bedrijven die maatwerkoplossingen en volledige schaalbaarheid nodig hebben.
            </p>
            <p className="text-4xl font-extrabold mb-6">€99<span className="text-lg">/maand</span></p>

            <ul className="text-gray-600 space-y-3 mb-8">
              <li>✔ Alle Pro-functies</li>
              <li>✔ Onbeperkte kanalen</li>
              <li>✔ Geavanceerde automatiseringen</li>
              <li>✔ Toegewijde ondersteuning</li>
              <li>✔ Aangepaste integraties</li>
            </ul>

            <a
              href="/en"
              className="block text-center px-8 py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition"
            >
              Neem contact op
            </a>
          </div>

        </div>
      </section>

      {/* EXTRA DIENSTEN */}
      <section className="py-24 px-6 max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-16">
          Extra diensten
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">

          <div className="p-8 border rounded-2xl shadow-sm hover:shadow-md transition">
            <h3 className="text-xl font-bold mb-3">WhatsApp-configuratie</h3>
            <p className="text-gray-600 mb-4">
              Volledige installatie van uw WhatsApp Business API-kanaal.
            </p>
            <p className="font-bold text-blue-600">€49 eenmalig</p>
          </div>

          <div className="p-8 border rounded-2xl shadow-sm hover:shadow-md transition">
            <h3 className="text-xl font-bold mb-3">Aangepaste chatbot</h3>
            <p className="text-gray-600 mb-4">
              Wij bouwen een chatbot op maat voor uw bedrijf.
            </p>
            <p className="font-bold text-blue-600">€99 eenmalig</p>
          </div>

          <div className="p-8 border rounded-2xl shadow-sm hover:shadow-md transition">
            <h3 className="text-xl font-bold mb-3">Website-integratie</h3>
            <p className="text-gray-600 mb-4">
              Wij integreren NexoBot professioneel in uw website.
            </p>
            <p className="font-bold text-blue-600">€39 eenmalig</p>
          </div>

        </div>
      </section>

      {/* HOE HET WERKT */}
      <section className="py-24 px-6 bg-gray-50" id="how">
        <h2 className="text-4xl font-bold text-center mb-16">
          Hoe NexoBot werkt
        </h2>

        <div className="max-w-4xl mx-auto space-y-12">

          <div>
            <h3 className="text-2xl font-bold mb-3">1. Verbind uw kanalen</h3>
            <p className="text-gray-600">
              WhatsApp, Instagram, Facebook of website – kies waar u wilt automatiseren.
            </p>
          </div>

          <div>
            <h3 className="text-2xl font-bold mb-3">2. Stel automatiseringen in</h3>
            <p className="text-gray-600">
              Bepaal wat NexoBot moet doen: antwoorden, verkopen, klanten kwalificeren en meer.
            </p>
          </div>

          <div>
            <h3 className="text-2xl font-bold mb-3">3. Laat hem voor u werken</h3>
            <p className="text-gray-600">
              NexoBot reageert 24/7 op klanten en helpt u meer verkopen te genereren.
            </p>
          </div>

        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 px-6 max-w-5xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-16">
          Veelgestelde vragen
        </h2>

        <div className="space-y-10">

          <div>
            <h3 className="text-2xl font-bold mb-3">
              Werkt NexoBot met WhatsApp?
            </h3>
            <p className="text-gray-600">
              Ja, NexoBot integreert volledig met de WhatsApp Business API om
              antwoorden, verkoop en ondersteuning te automatiseren.
            </p>
          </div>

          <div>
            <h3 className="text-2xl font-bold mb-3">
              Kan ik het ook gebruiken op Instagram en Facebook?
            </h3>
            <p className="text-gray-600">
              Zeker. U kunt meerdere kanalen koppelen en alles beheren vanuit één platform.
            </p>
          </div>

          <div>
            <h3 className="text-2xl font-bold mb-3">
              Heb ik technische kennis nodig?
            </h3>
            <p className="text-gray-600">
              Nee. NexoBot is ontworpen om eenvoudig en intuïtief te zijn. U kunt binnen enkele minuten starten.
            </p>
          </div>

          <div>
            <h3 className="text-2xl font-bold mb-3">
              Kan ik op elk moment opzeggen?
            </h3>
            <p className="text-gray-600">
              Ja, u kunt uw abonnement op elk moment wijzigen of annuleren zonder extra kosten.
            </p>
          </div>

        </div>
      </section>

      {/* KLANTBEOORDELINGEN */}
      <section className="py-24 px-6 bg-gray-50">
        <h2 className="text-4xl font-bold text-center mb-16">
          Wat onze klanten zeggen
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-6xl mx-auto">

          <div className="p-8 bg-white border rounded-2xl shadow-sm">
            <p className="text-gray-700 italic mb-4">
              “NexoBot heeft de tijd die we aan klantreacties besteedden met 70% verminderd.
              Echt indrukwekkend.”
            </p>
            <p className="font-bold">Mark R.</p>
            <p className="text-gray-500 text-sm">E‑commerce</p>
          </div>

          <div className="p-8 bg-white border rounded-2xl shadow-sm">
            <p className="text-gray-700 italic mb-4">
              “We hebben onze verkoop in één maand met 40% verhoogd. Onmisbaar.”
            </p>
            <p className="font-bold">Julia S.</p>
            <p className="text-gray-500 text-sm">Digitale diensten</p>
          </div>

          <div className="p-8 bg-white border rounded-2xl shadow-sm">
            <p className="text-gray-700 italic mb-4">
              “Makkelijk te gebruiken, snel in te stellen en extreem effectief.”
            </p>
            <p className="font-bold">Lucas M.</p>
            <p className="text-gray-500 text-sm">Horeca</p>
          </div>

        </div>
      </section>

      {/* CTA FINAAL */}
      <section className="py-32 px-6 text-center max-w-4xl mx-auto">
        <h2 className="text-5xl font-extrabold mb-6">
          Klaar om uw bedrijf te laten groeien?
        </h2>

        <p className="text-lg text-gray-600 mb-10">
          Begin vandaag nog met NexoBot en automatiseer uw verkoop, ondersteuning en communicatie.
        </p>

        <a
          href="/en"
          className="px-12 py-4 bg-blue-600 text-white rounded-xl font-semibold shadow-md hover:bg-blue-700 transition-all"
        >
          Start nu
        </a>
      </section>

      {/* FOOTER */}
      <footer className="py-10 text-center text-gray-500 text-sm border-t">
        © {new Date().getFullYear()} NexoBot — Alle rechten voorbehouden.
      </footer>

    </main>
  );
}
