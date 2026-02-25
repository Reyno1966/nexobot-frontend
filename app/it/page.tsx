export default function HomeIT() {
  return (
    <main className="bg-white text-gray-900">

      {/* HERO */}
      <section className="py-32 px-6 text-center max-w-4xl mx-auto">
        <h1 className="text-5xl font-extrabold leading-tight">
          Automatizza le tue vendite e il supporto clienti con{" "}
          <span className="text-blue-600">NexoBot</span>
        </h1>

        <p className="mt-6 text-lg text-gray-600">
          Il tuo assistente intelligente che risponde ai clienti, genera vendite
          e lavora per te 24/7. Risparmia tempo, aumenta i ricavi e scala il tuo
          business senza sforzo.
        </p>

        <div className="mt-10 flex justify-center gap-4">
          <a
            href="/en"
            className="px-10 py-4 bg-blue-600 text-white rounded-xl font-semibold shadow-md hover:bg-blue-700 transition-all"
          >
            Inizia ora
          </a>

          <a
            href="#how"
            className="px-10 py-4 bg-white border border-gray-300 rounded-xl font-semibold hover:bg-gray-100 transition-all"
          >
            Guarda come funziona
          </a>
        </div>
      </section>

      {/* INTRO */}
      <section className="py-20 px-6 text-center max-w-3xl mx-auto">
        <h2 className="text-4xl font-bold">
          Tutto ciò di cui hai bisogno per automatizzare il tuo business
        </h2>

        <p className="mt-6 text-gray-600 text-lg">
          NexoBot combina intelligenza artificiale, automazione e comunicazione
          multicanale per aiutarti a servire più clienti e chiudere più vendite
          senza fatica.
        </p>
      </section>

      {/* FEATURES */}
      <section className="py-20 px-6 max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10">

        <div className="p-8 border rounded-2xl shadow-sm hover:shadow-md transition">
          <h3 className="text-xl font-bold mb-3">Risposte automatiche 24/7</h3>
          <p className="text-gray-600">
            NexoBot risponde ai tuoi clienti in tempo reale, anche quando dormi.
          </p>
        </div>

        <div className="p-8 border rounded-2xl shadow-sm hover:shadow-md transition">
          <h3 className="text-xl font-bold mb-3">Generazione di vendite</h3>
          <p className="text-gray-600">
            Trasforma conversazioni in vendite con messaggi intelligenti e
            personalizzati.
          </p>
        </div>

        <div className="p-8 border rounded-2xl shadow-sm hover:shadow-md transition">
          <h3 className="text-xl font-bold mb-3">Multicanale</h3>
          <p className="text-gray-600">
            WhatsApp, Instagram, Facebook e sito web: tutto in un unico posto.
          </p>
        </div>

      </section>
      {/* PRICING */}
      <section className="py-24 px-6 bg-gray-50" id="pricing">
        <h2 className="text-4xl font-bold text-center mb-16">
          Scegli il piano perfetto per il tuo business
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-6xl mx-auto">

          {/* BASIC */}
          <div className="p-10 bg-white border rounded-2xl shadow-sm hover:shadow-md transition">
            <h3 className="text-2xl font-bold mb-4">Basic</h3>
            <p className="text-gray-600 mb-6">
              Ideale per piccoli business che vogliono iniziare con l’automazione.
            </p>
            <p className="text-4xl font-extrabold mb-6">€19<span className="text-lg">/mese</span></p>

            <ul className="text-gray-600 space-y-3 mb-8">
              <li>✔ Risposte automatiche 24/7</li>
              <li>✔ Fino a 500 messaggi al mese</li>
              <li>✔ 1 canale collegato</li>
              <li>✔ Supporto base</li>
            </ul>

            <a
              href="/en"
              className="block text-center px-8 py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition"
            >
              Inizia ora
            </a>
          </div>

          {/* PRO */}
          <div className="p-10 bg-white border-2 border-blue-600 rounded-2xl shadow-md hover:shadow-lg transition">
            <h3 className="text-2xl font-bold mb-4">Pro</h3>
            <p className="text-gray-600 mb-6">
              Perfetto per aziende che vogliono scalare e aumentare le vendite.
            </p>
            <p className="text-4xl font-extrabold mb-6">€49<span className="text-lg">/mese</span></p>

            <ul className="text-gray-600 space-y-3 mb-8">
              <li>✔ Risposte automatiche avanzate</li>
              <li>✔ Messaggi illimitati</li>
              <li>✔ 3 canali collegati</li>
              <li>✔ Automazioni intelligenti</li>
              <li>✔ Supporto prioritario</li>
            </ul>

            <a
              href="/en"
              className="block text-center px-8 py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition"
            >
              Scegli Pro
            </a>
          </div>

          {/* ENTERPRISE */}
          <div className="p-10 bg-white border rounded-2xl shadow-sm hover:shadow-md transition">
            <h3 className="text-2xl font-bold mb-4">Enterprise</h3>
            <p className="text-gray-600 mb-6">
              Per aziende che necessitano di soluzioni personalizzate e scalabilità totale.
            </p>
            <p className="text-4xl font-extrabold mb-6">€99<span className="text-lg">/mese</span></p>

            <ul className="text-gray-600 space-y-3 mb-8">
              <li>✔ Tutte le funzionalità Pro</li>
              <li>✔ Canali illimitati</li>
              <li>✔ Automazioni avanzate</li>
              <li>✔ Supporto dedicato</li>
              <li>✔ Integrazioni personalizzate</li>
            </ul>

            <a
              href="/en"
              className="block text-center px-8 py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition"
            >
              Contattaci
            </a>
          </div>

        </div>
      </section>

      {/* SERVIZI AGGIUNTIVI */}
      <section className="py-24 px-6 max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-16">
          Servizi aggiuntivi
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">

          <div className="p-8 border rounded-2xl shadow-sm hover:shadow-md transition">
            <h3 className="text-xl font-bold mb-3">Configurazione WhatsApp</h3>
            <p className="text-gray-600 mb-4">
              Impostazione completa del tuo canale WhatsApp Business API.
            </p>
            <p className="font-bold text-blue-600">€49 una tantum</p>
          </div>

          <div className="p-8 border rounded-2xl shadow-sm hover:shadow-md transition">
            <h3 className="text-xl font-bold mb-3">Creazione chatbot personalizzato</h3>
            <p className="text-gray-600 mb-4">
              Costruiamo un chatbot su misura per il tuo business.
            </p>
            <p className="font-bold text-blue-600">€99 una tantum</p>
          </div>

          <div className="p-8 border rounded-2xl shadow-sm hover:shadow-md transition">
            <h3 className="text-xl font-bold mb-3">Integrazione sito web</h3>
            <p className="text-gray-600 mb-4">
              Aggiungiamo NexoBot al tuo sito in modo professionale.
            </p>
            <p className="font-bold text-blue-600">€39 una tantum</p>
          </div>

        </div>
      </section>

      {/* COME FUNZIONA */}
      <section className="py-24 px-6 bg-gray-50" id="how">
        <h2 className="text-4xl font-bold text-center mb-16">
          Come funziona NexoBot
        </h2>

        <div className="max-w-4xl mx-auto space-y-12">

          <div>
            <h3 className="text-2xl font-bold mb-3">1. Collega i tuoi canali</h3>
            <p className="text-gray-600">
              WhatsApp, Instagram, Facebook o sito web: scegli dove vuoi automatizzare.
            </p>
          </div>

          <div>
            <h3 className="text-2xl font-bold mb-3">2. Imposta le automazioni</h3>
            <p className="text-gray-600">
              Scegli cosa deve fare NexoBot: rispondere, vendere, qualificare clienti e altro.
            </p>
          </div>

          <div>
            <h3 className="text-2xl font-bold mb-3">3. Lascia che lavori per te</h3>
            <p className="text-gray-600">
              NexoBot risponde ai clienti 24/7 e ti aiuta a generare più vendite.
            </p>
          </div>

        </div>
      </section>
      {/* FAQ */}
      <section className="py-24 px-6 max-w-5xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-16">
          Domande frequenti
        </h2>

        <div className="space-y-10">

          <div>
            <h3 className="text-2xl font-bold mb-3">
              NexoBot funziona con WhatsApp?
            </h3>
            <p className="text-gray-600">
              Sì, NexoBot si integra perfettamente con WhatsApp Business API per
              automatizzare risposte, vendite e supporto.
            </p>
          </div>

          <div>
            <h3 className="text-2xl font-bold mb-3">
              Posso usarlo anche su Instagram e Facebook?
            </h3>
            <p className="text-gray-600">
              Certamente. Puoi collegare più canali e gestire tutto da un’unica
              piattaforma.
            </p>
          </div>

          <div>
            <h3 className="text-2xl font-bold mb-3">
              Serve esperienza tecnica per usarlo?
            </h3>
            <p className="text-gray-600">
              No. NexoBot è progettato per essere semplice e intuitivo. Puoi
              iniziare in pochi minuti.
            </p>
          </div>

          <div>
            <h3 className="text-2xl font-bold mb-3">
              Posso cancellare quando voglio?
            </h3>
            <p className="text-gray-600">
              Sì, puoi cancellare o cambiare piano in qualsiasi momento senza
              costi aggiuntivi.
            </p>
          </div>

        </div>
      </section>

      {/* TESTIMONIANZE */}
      <section className="py-24 px-6 bg-gray-50">
        <h2 className="text-4xl font-bold text-center mb-16">
          Cosa dicono i nostri clienti
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-6xl mx-auto">

          <div className="p-8 bg-white border rounded-2xl shadow-sm">
            <p className="text-gray-700 italic mb-4">
              “NexoBot ha ridotto del 70% il tempo che passavamo a rispondere ai
              clienti. È incredibile.”
            </p>
            <p className="font-bold">Marco R.</p>
            <p className="text-gray-500 text-sm">E-commerce</p>
          </div>

          <div className="p-8 bg-white border rounded-2xl shadow-sm">
            <p className="text-gray-700 italic mb-4">
              “Abbiamo aumentato le vendite del 40% in un mese. Non potrei più
              farne a meno.”
            </p>
            <p className="font-bold">Giulia S.</p>
            <p className="text-gray-500 text-sm">Servizi digitali</p>
          </div>

          <div className="p-8 bg-white border rounded-2xl shadow-sm">
            <p className="text-gray-700 italic mb-4">
              “Facile da usare, veloce da configurare e super efficace.”
            </p>
            <p className="font-bold">Luca M.</p>
            <p className="text-gray-500 text-sm">Ristorazione</p>
          </div>

        </div>
      </section>

      {/* CTA FINALE */}
      <section className="py-32 px-6 text-center max-w-4xl mx-auto">
        <h2 className="text-5xl font-extrabold mb-6">
          Pronto a far crescere il tuo business?
        </h2>

        <p className="text-lg text-gray-600 mb-10">
          Inizia oggi con NexoBot e automatizza vendite, supporto e comunicazione.
        </p>

        <a
          href="/en"
          className="px-12 py-4 bg-blue-600 text-white rounded-xl font-semibold shadow-md hover:bg-blue-700 transition-all"
        >
          Inizia ora
        </a>
      </section>

      {/* FOOTER */}
      <footer className="py-10 text-center text-gray-500 text-sm border-t">
        © {new Date().getFullYear()} NexoBot — Tutti i diritti riservati.
      </footer>

    </main>
  );
}
