export default function HomeDE() {
  return (
    <main className="bg-white text-gray-900">

      {/* HERO */}
      <section className="py-32 px-6 text-center max-w-4xl mx-auto">
        <h1 className="text-5xl font-extrabold leading-tight">
          Automatisieren Sie Ihren Verkauf und Kundensupport mit{" "}
          <span className="text-blue-600">NexoBot</span>
        </h1>

        <p className="mt-6 text-lg text-gray-600">
          Ihr intelligenter Assistent, der Kundenanfragen beantwortet, Verkäufe
          generiert und 24/7 für Sie arbeitet. Sparen Sie Zeit, steigern Sie
          Ihren Umsatz und skalieren Sie Ihr Unternehmen mühelos.
        </p>

        <div className="mt-10 flex justify-center gap-4">
          <a
            href="/en"
            className="px-10 py-4 bg-blue-600 text-white rounded-xl font-semibold shadow-md hover:bg-blue-700 transition-all"
          >
            Jetzt starten
          </a>

          <a
            href="#how"
            className="px-10 py-4 bg-white border border-gray-300 rounded-xl font-semibold hover:bg-gray-100 transition-all"
          >
            So funktioniert es
          </a>
        </div>
      </section>

      {/* INTRO */}
      <section className="py-20 px-6 text-center max-w-3xl mx-auto">
        <h2 className="text-4xl font-bold">
          Alles, was Sie brauchen, um Ihr Unternehmen zu automatisieren
        </h2>

        <p className="mt-6 text-gray-600 text-lg">
          NexoBot kombiniert künstliche Intelligenz, Automatisierung und
          Multikanal-Kommunikation, um Ihnen zu helfen, mehr Kunden zu bedienen
          und mehr Verkäufe ohne zusätzlichen Aufwand abzuschließen.
        </p>
      </section>

      {/* FEATURES */}
      <section className="py-20 px-6 max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10">

        <div className="p-8 border rounded-2xl shadow-sm hover:shadow-md transition">
          <h3 className="text-xl font-bold mb-3">Automatische Antworten 24/7</h3>
          <p className="text-gray-600">
            NexoBot beantwortet Kundenanfragen in Echtzeit – sogar während Sie schlafen.
          </p>
        </div>

        <div className="p-8 border rounded-2xl shadow-sm hover:shadow-md transition">
          <h3 className="text-xl font-bold mb-3">Verkaufsautomatisierung</h3>
          <p className="text-gray-600">
            Verwandeln Sie Gespräche in Verkäufe mit intelligenten, personalisierten Nachrichten.
          </p>
        </div>

        <div className="p-8 border rounded-2xl shadow-sm hover:shadow-md transition">
          <h3 className="text-xl font-bold mb-3">Multikanal</h3>
          <p className="text-gray-600">
            WhatsApp, Instagram, Facebook und Website – alles an einem Ort.
          </p>
        </div>

      </section>

      {/* PRICING */}
      <section className="py-24 px-6 bg-gray-50" id="pricing">
        <h2 className="text-4xl font-bold text-center mb-16">
          Wählen Sie den perfekten Plan für Ihr Unternehmen
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-6xl mx-auto">

          {/* BASIC */}
          <div className="p-10 bg-white border rounded-2xl shadow-sm hover:shadow-md transition">
            <h3 className="text-2xl font-bold mb-4">Basic</h3>
            <p className="text-gray-600 mb-6">
              Ideal für kleine Unternehmen, die mit Automatisierung beginnen möchten.
            </p>
            <p className="text-4xl font-extrabold mb-6">19€<span className="text-lg">/Monat</span></p>

            <ul className="text-gray-600 space-y-3 mb-8">
              <li>✔ Automatische Antworten 24/7</li>
              <li>✔ Bis zu 500 Nachrichten pro Monat</li>
              <li>✔ 1 verbundener Kanal</li>
              <li>✔ Basis-Support</li>
            </ul>

            <a
              href="/en"
              className="block text-center px-8 py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition"
            >
              Jetzt starten
            </a>
          </div>

          {/* PRO */}
          <div className="p-10 bg-white border-2 border-blue-600 rounded-2xl shadow-md hover:shadow-lg transition">
            <h3 className="text-2xl font-bold mb-4">Pro</h3>
            <p className="text-gray-600 mb-6">
              Perfekt für Unternehmen, die wachsen und mehr Verkäufe erzielen möchten.
            </p>
            <p className="text-4xl font-extrabold mb-6">49€<span className="text-lg">/Monat</span></p>

            <ul className="text-gray-600 space-y-3 mb-8">
              <li>✔ Erweiterte automatische Antworten</li>
              <li>✔ Unbegrenzte Nachrichten</li>
              <li>✔ 3 verbundene Kanäle</li>
              <li>✔ Intelligente Automatisierungen</li>
              <li>✔ Priorisierter Support</li>
            </ul>

            <a
              href="/en"
              className="block text-center px-8 py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition"
            >
              Pro wählen
            </a>
          </div>

          {/* ENTERPRISE */}
          <div className="p-10 bg-white border rounded-2xl shadow-sm hover:shadow-md transition">
            <h3 className="text-2xl font-bold mb-4">Enterprise</h3>
            <p className="text-gray-600 mb-6">
              Für Unternehmen, die maßgeschneiderte Lösungen und volle Skalierbarkeit benötigen.
            </p>
            <p className="text-4xl font-extrabold mb-6">99€<span className="text-lg">/Monat</span></p>

            <ul className="text-gray-600 space-y-3 mb-8">
              <li>✔ Alle Pro-Funktionen</li>
              <li>✔ Unbegrenzte Kanäle</li>
              <li>✔ Erweiterte Automatisierungen</li>
              <li>✔ Dedizierter Support</li>
              <li>✔ Individuelle Integrationen</li>
            </ul>

            <a
              href="/en"
              className="block text-center px-8 py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition"
            >
              Kontaktieren Sie uns
            </a>
          </div>

        </div>
      </section>

      {/* ZUSÄTZLICHE DIENSTLEISTUNGEN */}
      <section className="py-24 px-6 max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-16">
          Zusätzliche Dienstleistungen
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">

          <div className="p-8 border rounded-2xl shadow-sm hover:shadow-md transition">
            <h3 className="text-xl font-bold mb-3">WhatsApp-Einrichtung</h3>
            <p className="text-gray-600 mb-4">
              Vollständige Einrichtung Ihres WhatsApp Business API-Kanals.
            </p>
            <p className="font-bold text-blue-600">49€ einmalig</p>
          </div>

          <div className="p-8 border rounded-2xl shadow-sm hover:shadow-md transition">
            <h3 className="text-xl font-bold mb-3">Individueller Chatbot</h3>
            <p className="text-gray-600 mb-4">
              Wir erstellen einen maßgeschneiderten Chatbot für Ihr Unternehmen.
            </p>
            <p className="font-bold text-blue-600">99€ einmalig</p>
          </div>

          <div className="p-8 border rounded-2xl shadow-sm hover:shadow-md transition">
            <h3 className="text-xl font-bold mb-3">Website-Integration</h3>
            <p className="text-gray-600 mb-4">
              Wir integrieren NexoBot professionell in Ihre Website.
            </p>
            <p className="font-bold text-blue-600">39€ einmalig</p>
          </div>

        </div>
      </section>

      {/* WIE ES FUNKTIONIERT */}
      <section className="py-24 px-6 bg-gray-50" id="how">
        <h2 className="text-4xl font-bold text-center mb-16">
          Wie NexoBot funktioniert
        </h2>

        <div className="max-w-4xl mx-auto space-y-12">

          <div>
            <h3 className="text-2xl font-bold mb-3">1. Verbinden Sie Ihre Kanäle</h3>
            <p className="text-gray-600">
              WhatsApp, Instagram, Facebook oder Website – wählen Sie, wo Sie automatisieren möchten.
            </p>
          </div>

          <div>
            <h3 className="text-2xl font-bold mb-3">2. Richten Sie Automatisierungen ein</h3>
            <p className="text-gray-600">
              Legen Sie fest, was NexoBot tun soll: antworten, verkaufen, Kunden qualifizieren und mehr.
            </p>
          </div>

          <div>
            <h3 className="text-2xl font-bold mb-3">3. Lassen Sie ihn für Sie arbeiten</h3>
            <p className="text-gray-600">
              NexoBot beantwortet Kundenanfragen 24/7 und hilft Ihnen, mehr Verkäufe zu erzielen.
            </p>
          </div>

        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 px-6 max-w-5xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-16">
          Häufig gestellte Fragen
        </h2>

        <div className="space-y-10">

          <div>
            <h3 className="text-2xl font-bold mb-3">
              Funktioniert NexoBot mit WhatsApp?
            </h3>
            <p className="text-gray-600">
              Ja, NexoBot integriert sich vollständig in die WhatsApp Business API,
              um Antworten, Verkäufe und Support zu automatisieren.
            </p>
          </div>

          <div>
            <h3 className="text-2xl font-bold mb-3">
              Kann ich es auch auf Instagram und Facebook nutzen?
            </h3>
            <p className="text-gray-600">
              Natürlich. Sie können mehrere Kanäle verbinden und alles über eine einzige Plattform verwalten.
            </p>
          </div>

          <div>
            <h3 className="text-2xl font-bold mb-3">
              Brauche ich technische Kenntnisse?
            </h3>
            <p className="text-gray-600">
              Nein. NexoBot ist einfach und intuitiv gestaltet. Sie können in wenigen Minuten starten.
            </p>
          </div>

          <div>
            <h3 className="text-2xl font-bold mb-3">
              Kann ich jederzeit kündigen?
            </h3>
            <p className="text-gray-600">
              Ja, Sie können Ihren Plan jederzeit ohne zusätzliche Gebühren kündigen oder ändern.
            </p>
          </div>

        </div>
      </section>

      {/* KUNDENBEWERTUNGEN */}
      <section className="py-24 px-6 bg-gray-50">
        <h2 className="text-4xl font-bold text-center mb-16">
          Was unsere Kunden sagen
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-6xl mx-auto">

          <div className="p-8 bg-white border rounded-2xl shadow-sm">
            <p className="text-gray-700 italic mb-4">
              “NexoBot hat die Zeit, die wir für Kundenanfragen benötigten, um 70% reduziert.
              Wirklich beeindruckend.”
            </p>
            <p className="font-bold">Markus R.</p>
            <p className="text-gray-500 text-sm">E‑Commerce</p>
          </div>

          <div className="p-8 bg-white border rounded-2xl shadow-sm">
            <p className="text-gray-700 italic mb-4">
              “Wir haben unsere Verkäufe in nur einem Monat um 40% gesteigert. Unverzichtbar.”
            </p>
            <p className="font-bold">Julia S.</p>
            <p className="text-gray-500 text-sm">Digitale Dienstleistungen</p>
          </div>

          <div className="p-8 bg-white border rounded-2xl shadow-sm">
            <p className="text-gray-700 italic mb-4">
              “Einfach zu bedienen, schnell einzurichten und extrem effektiv.”
            </p>
            <p className="font-bold">Lukas M.</p>
            <p className="text-gray-500 text-sm">Gastronomie</p>
          </div>

        </div>
      </section>

      {/* CTA FINALE */}
      <section className="py-32 px-6 text-center max-w-4xl mx-auto">
        <h2 className="text-5xl font-extrabold mb-6">
          Bereit, Ihr Unternehmen wachsen zu lassen?
        </h2>

        <p className="text-lg text-gray-600 mb-10">
          Starten Sie noch heute mit NexoBot und automatisieren Sie Verkauf,
          Support und Kommunikation.
        </p>

        <a
          href="/en"
          className="px-12 py-4 bg-blue-600 text-white rounded-xl font-semibold shadow-md hover:bg-blue-700 transition-all"
        >
          Jetzt starten
        </a>
      </section>

      {/* FOOTER */}
      <footer className="py-10 text-center text-gray-500 text-sm border-t">
        © {new Date().getFullYear()} NexoBot — Alle Rechte vorbehalten.
      </footer>

    </main>
  );
}
