import Link from "next/link";

export default function HomeIT() {
  return (
    <main className="min-h-screen bg-white text-gray-900">
      {/* Navbar */}
      <nav className="max-w-6xl mx-auto px-6 py-5 flex items-center justify-between">
        <Link href="/it" className="text-2xl font-extrabold text-blue-600">NexoBot</Link>
        <div className="flex items-center gap-4">
          <a href="#pricing" className="text-sm font-medium text-gray-600 hover:text-blue-600 transition">Prezzi</a>
          <a href="#faq" className="text-sm font-medium text-gray-600 hover:text-blue-600 transition">FAQ</a>
          <Link href="/auth/login" className="text-sm font-medium text-gray-700 hover:text-blue-600 transition">Accedi</Link>
          <Link href="/auth/signup" className="px-4 py-2 bg-blue-600 text-white text-sm font-semibold rounded-lg hover:bg-blue-700 transition">Inizia gratis</Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="max-w-4xl mx-auto px-6 py-24 text-center">
        <span className="inline-block bg-blue-100 text-blue-700 text-xs font-semibold px-3 py-1 rounded-full mb-6 uppercase tracking-wide">
          IA per Vendite &amp; Supporto
        </span>
        <h1 className="text-5xl font-extrabold leading-tight mb-6">
          Automatizza le tue Vendite e il Supporto Clienti con NexoBot
        </h1>
        <p className="text-xl text-gray-600 mb-10">
          NexoBot gestisce i tuoi lead, risponde ai clienti e aumenta le vendite 24 ore su 24 — mentre tu ti concentri su ciò che conta davvero.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/auth/signup" className="px-8 py-4 bg-blue-600 text-white text-lg font-semibold rounded-xl hover:bg-blue-700 transition shadow-lg">
            Inizia gratis
          </Link>
          <a href="#pricing" className="px-8 py-4 border border-gray-300 text-gray-700 text-lg font-semibold rounded-xl hover:border-blue-600 hover:text-blue-600 transition">
            Vedi i prezzi
          </a>
        </div>
        <p className="mt-4 text-sm text-gray-500">Nessuna carta di credito richiesta</p>
      </section>

      {/* Features */}
      <section className="bg-gray-50 py-20">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-extrabold text-center mb-4">Perché scegliere NexoBot?</h2>
          <p className="text-center text-gray-500 mb-14 max-w-2xl mx-auto">
            Tutto ciò di cui hai bisogno per automatizzare il tuo business e offrire un&apos;esperienza cliente eccezionale.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
              <div className="text-3xl mb-4">🤖</div>
              <h3 className="text-xl font-bold mb-2">IA Conversazionale</h3>
              <p className="text-gray-600">Risponde automaticamente alle domande frequenti e qualifica i tuoi lead in tempo reale, 24 ore su 24, 7 giorni su 7.</p>
            </div>
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
              <div className="text-3xl mb-4">📈</div>
              <h3 className="text-xl font-bold mb-2">Aumento delle Vendite</h3>
              <p className="text-gray-600">Converti più visitatori in clienti grazie a conversazioni personalizzate e follow-up automatici.</p>
            </div>
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
              <div className="text-3xl mb-4">🔗</div>
              <h3 className="text-xl font-bold mb-2">Integrazioni Facili</h3>
              <p className="text-gray-600">Collega NexoBot ai tuoi strumenti esistenti: CRM, email, WhatsApp, Slack e molto altro.</p>
            </div>
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
              <div className="text-3xl mb-4">📊</div>
              <h3 className="text-xl font-bold mb-2">Analisi &amp; Report</h3>
              <p className="text-gray-600">Monitora le prestazioni del tuo bot con dashboard intuitive e report dettagliati.</p>
            </div>
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
              <div className="text-3xl mb-4">🛡️</div>
              <h3 className="text-xl font-bold mb-2">Sicurezza &amp; Conformità</h3>
              <p className="text-gray-600">I tuoi dati sono protetti con crittografia end-to-end e piena conformità al GDPR.</p>
            </div>
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
              <div className="text-3xl mb-4">⚡</div>
              <h3 className="text-xl font-bold mb-2">Configurazione Rapida</h3>
              <p className="text-gray-600">Lancia il tuo bot in meno di 10 minuti senza alcuna competenza tecnica richiesta.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-20">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-extrabold text-center mb-4">Prezzi semplici e trasparenti</h2>
          <p className="text-center text-gray-500 mb-14 max-w-2xl mx-auto">
            Scegli il piano adatto alle tue esigenze. Cambia o annulla in qualsiasi momento.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Starter */}
            <div className="rounded-2xl border border-gray-200 p-8 flex flex-col">
              <h3 className="text-xl font-bold mb-2">Starter</h3>
              <p className="text-gray-500 text-sm mb-6">Ideale per freelance e piccoli team.</p>
              <div className="text-4xl font-extrabold mb-1">$29<span className="text-lg font-medium text-gray-500">/mese</span></div>
              <ul className="mt-6 mb-8 space-y-3 text-sm text-gray-700 flex-1">
                <li>✅ 1 bot attivo</li>
                <li>✅ Fino a 500 conversazioni/mese</li>
                <li>✅ Integrazioni base</li>
                <li>✅ Supporto via email</li>
              </ul>
              <Link href="/auth/signup?priceId=price_1T18BGRap0JkQNsmaUVhyNFr" className="block text-center px-6 py-3 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition">
                Inizia ora
              </Link>
            </div>
            {/* Pro */}
            <div className="rounded-2xl border-2 border-blue-600 p-8 flex flex-col relative shadow-lg">
              <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-blue-600 text-white text-xs font-bold px-4 py-1 rounded-full">Più popolare</span>
              <h3 className="text-xl font-bold mb-2">Pro</h3>
              <p className="text-gray-500 text-sm mb-6">Per le aziende in crescita.</p>
              <div className="text-4xl font-extrabold mb-1">$59<span className="text-lg font-medium text-gray-500">/mese</span></div>
              <ul className="mt-6 mb-8 space-y-3 text-sm text-gray-700 flex-1">
                <li>✅ 5 bot attivi</li>
                <li>✅ Fino a 5.000 conversazioni/mese</li>
                <li>✅ Integrazioni avanzate</li>
                <li>✅ Supporto prioritario</li>
                <li>✅ Analisi dettagliate</li>
              </ul>
              <Link href="/auth/signup?priceId=price_1T15gVRap0JkQNsm59vukMuR" className="block text-center px-6 py-3 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition">
                Inizia ora
              </Link>
            </div>
            {/* Premium */}
            <div className="rounded-2xl border border-gray-200 p-8 flex flex-col">
              <h3 className="text-xl font-bold mb-2">Premium</h3>
              <p className="text-gray-500 text-sm mb-6">Per grandi aziende con esigenze avanzate.</p>
              <div className="text-4xl font-extrabold mb-1">$99<span className="text-lg font-medium text-gray-500">/mese</span></div>
              <ul className="mt-6 mb-8 space-y-3 text-sm text-gray-700 flex-1">
                <li>✅ Bot illimitati</li>
                <li>✅ Conversazioni illimitate</li>
                <li>✅ Tutte le integrazioni</li>
                <li>✅ Supporto dedicato 24/7</li>
                <li>✅ Personalizzazione avanzata</li>
                <li>✅ SLA garantito</li>
              </ul>
              <Link href="/auth/signup?priceId=price_1T15jDRap0JkQNsmQRvEkpcm" className="block text-center px-6 py-3 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition">
                Inizia ora
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Additional Services */}
      <section className="bg-gray-50 py-20">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-extrabold text-center mb-4">Servizi Aggiuntivi</h2>
          <p className="text-center text-gray-500 mb-14 max-w-2xl mx-auto">
            Potenzia la tua esperienza NexoBot con i nostri servizi complementari.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-2xl border border-gray-200 p-8 flex flex-col">
              <div className="text-3xl mb-4">🎨</div>
              <h3 className="text-xl font-bold mb-2">Personalizzazione Avanzata</h3>
              <p className="text-gray-600 mb-6 flex-1">Adatta l&apos;aspetto e il comportamento del tuo bot all&apos;identità del tuo brand.</p>
              <div className="text-2xl font-extrabold mb-4">$99</div>
              <Link href="/auth/signup?priceId=price_1T161uRap0JkQNsm3BJZGOEu" className="block text-center px-6 py-3 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition">
                Scopri di più
              </Link>
            </div>
            <div className="bg-white rounded-2xl border border-gray-200 p-8 flex flex-col">
              <div className="text-3xl mb-4">⚙️</div>
              <h3 className="text-xl font-bold mb-2">Automazioni Avanzate</h3>
              <p className="text-gray-600 mb-6 flex-1">Crea flussi di lavoro complessi e automazioni per ottimizzare i tuoi processi aziendali.</p>
              <div className="text-2xl font-extrabold mb-4">$149</div>
              <Link href="/auth/signup?priceId=price_1T163sRap0JkQNsmOrHBQuJp" className="block text-center px-6 py-3 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition">
                Scopri di più
              </Link>
            </div>
            <div className="bg-white rounded-2xl border border-gray-200 p-8 flex flex-col">
              <div className="text-3xl mb-4">🔌</div>
              <h3 className="text-xl font-bold mb-2">Integrazioni Esterne</h3>
              <p className="text-gray-600 mb-6 flex-1">Collega NexoBot ai tuoi sistemi interni e strumenti di terze parti con integrazioni su misura.</p>
              <div className="text-2xl font-extrabold mb-4">$199</div>
              <Link href="/auth/signup?priceId=price_1T166cRap0JkQNsmuPTOPBBu" className="block text-center px-6 py-3 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition">
                Scopri di più
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-20">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="text-3xl font-extrabold text-center mb-14">Domande Frequenti</h2>
          <div className="space-y-8">
            <div>
              <h3 className="text-lg font-bold mb-2">Come funziona NexoBot?</h3>
              <p className="text-gray-600">NexoBot utilizza l&apos;intelligenza artificiale per analizzare i messaggi dei tuoi clienti e rispondere automaticamente in modo naturale e pertinente, 24 ore su 24.</p>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-2">Posso provare NexoBot gratuitamente?</h3>
              <p className="text-gray-600">Sì! Puoi iniziare con la nostra prova gratuita senza carta di credito. Scopri tutte le funzionalità prima di impegnarti.</p>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-2">Quali piattaforme sono supportate?</h3>
              <p className="text-gray-600">NexoBot si integra con il tuo sito web, WhatsApp, Facebook Messenger, Instagram, Slack e molte altre piattaforme.</p>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-2">Posso cambiare piano in qualsiasi momento?</h3>
              <p className="text-gray-600">Assolutamente. Puoi aggiornare o declassare il tuo piano in qualsiasi momento dalla tua dashboard, senza costi nascosti.</p>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-2">I miei dati sono al sicuro?</h3>
              <p className="text-gray-600">La sicurezza è la nostra priorità. Tutti i dati sono crittografati e siamo conformi al GDPR. Le tue informazioni non vengono mai condivise con terze parti.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="bg-blue-600 py-20">
        <div className="max-w-3xl mx-auto px-6 text-center text-white">
          <h2 className="text-3xl font-extrabold mb-4">Pronto a trasformare il tuo business?</h2>
          <p className="text-blue-100 mb-8 text-lg">
            Unisciti a migliaia di aziende che usano NexoBot per automatizzare la loro crescita.
          </p>
          <Link href="/auth/signup" className="inline-block px-10 py-4 bg-white text-blue-600 text-lg font-bold rounded-xl hover:bg-blue-50 transition shadow-lg">
            Inizia gratis
          </Link>
          <p className="mt-4 text-blue-200 text-sm">Nessuna carta di credito richiesta · Annulla in qualsiasi momento</p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-12">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div>
              <Link href="/it" className="text-xl font-extrabold text-white">NexoBot</Link>
              <p className="text-sm mt-1">Automatizza le tue vendite e il supporto clienti.</p>
            </div>
            <div className="flex gap-6 text-sm">
              <a href="#pricing" className="hover:text-white transition">Prezzi</a>
              <a href="#faq" className="hover:text-white transition">FAQ</a>
              <Link href="/auth/login" className="hover:text-white transition">Accedi</Link>
              <Link href="/auth/signup" className="hover:text-white transition">Registrati</Link>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-xs">
            <p>&copy; {new Date().getFullYear()} NexoBot. Tutti i diritti riservati.</p>
          </div>
        </div>
      </footer>
    </main>
  );
}
