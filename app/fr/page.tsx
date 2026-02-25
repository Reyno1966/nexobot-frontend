export default function HomeFR() {
  return (
    <main className="bg-white text-gray-900">

      {/* HERO */}
      <section className="py-32 px-6 text-center max-w-4xl mx-auto">
        <h1 className="text-5xl font-extrabold leading-tight">
          Automatisez vos ventes et votre support client avec{" "}
          <span className="text-blue-600">NexoBot</span>
        </h1>

        <p className="mt-6 text-lg text-gray-600">
          Votre assistant intelligent qui répond aux clients, génère des ventes
          et travaille pour vous 24h/24 et 7j/7. Gagnez du temps, augmentez vos
          revenus et développez votre entreprise sans effort.
        </p>

        <div className="mt-10 flex justify-center gap-4">
          <a
            href="/en"
            className="px-10 py-4 bg-blue-600 text-white rounded-xl font-semibold shadow-md hover:bg-blue-700 transition-all"
          >
            Commencer
          </a>

          <a
            href="#how"
            className="px-10 py-4 bg-white border border-gray-300 rounded-xl font-semibold hover:bg-gray-100 transition-all"
          >
            Voir comment ça marche
          </a>
        </div>
      </section>

      {/* INTRO */}
      <section className="py-20 px-6 text-center max-w-3xl mx-auto">
        <h2 className="text-4xl font-bold">
          Tout ce dont vous avez besoin pour automatiser votre entreprise
        </h2>

        <p className="mt-6 text-gray-600 text-lg">
          NexoBot combine intelligence artificielle, automatisation et
          communication multicanale pour vous aider à servir plus de clients et
          conclure plus de ventes sans effort.
        </p>
      </section>

      {/* FEATURES */}
      <section className="py-20 px-6 max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10">

        <div className="p-8 border rounded-2xl shadow-sm hover:shadow-md transition">
          <h3 className="text-xl font-bold mb-3">Réponses automatiques 24/7</h3>
          <p className="text-gray-600">
            NexoBot répond à vos clients en temps réel, même pendant votre sommeil.
          </p>
        </div>

        <div className="p-8 border rounded-2xl shadow-sm hover:shadow-md transition">
          <h3 className="text-xl font-bold mb-3">Génération de ventes</h3>
          <p className="text-gray-600">
            Transformez les conversations en ventes grâce à des messages intelligents
            et personnalisés.
          </p>
        </div>

        <div className="p-8 border rounded-2xl shadow-sm hover:shadow-md transition">
          <h3 className="text-xl font-bold mb-3">Multicanal</h3>
          <p className="text-gray-600">
            WhatsApp, Instagram, Facebook et site web : tout en un seul endroit.
          </p>
        </div>

      </section>
      {/* PRICING */}
      <section className="py-24 px-6 bg-gray-50" id="pricing">
        <h2 className="text-4xl font-bold text-center mb-16">
          Choisissez le plan parfait pour votre entreprise
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-6xl mx-auto">

          {/* BASIC */}
          <div className="p-10 bg-white border rounded-2xl shadow-sm hover:shadow-md transition">
            <h3 className="text-2xl font-bold mb-4">Basic</h3>
            <p className="text-gray-600 mb-6">
              Idéal pour les petites entreprises qui souhaitent commencer avec l’automatisation.
            </p>
            <p className="text-4xl font-extrabold mb-6">19€<span className="text-lg">/mois</span></p>

            <ul className="text-gray-600 space-y-3 mb-8">
              <li>✔ Réponses automatiques 24/7</li>
              <li>✔ Jusqu’à 500 messages par mois</li>
              <li>✔ 1 canal connecté</li>
              <li>✔ Support basique</li>
            </ul>

            <a
              href="/en"
              className="block text-center px-8 py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition"
            >
              Commencer
            </a>
          </div>

          {/* PRO */}
          <div className="p-10 bg-white border-2 border-blue-600 rounded-2xl shadow-md hover:shadow-lg transition">
            <h3 className="text-2xl font-bold mb-4">Pro</h3>
            <p className="text-gray-600 mb-6">
              Parfait pour les entreprises qui veulent évoluer et augmenter leurs ventes.
            </p>
            <p className="text-4xl font-extrabold mb-6">49€<span className="text-lg">/mois</span></p>

            <ul className="text-gray-600 space-y-3 mb-8">
              <li>✔ Réponses automatiques avancées</li>
              <li>✔ Messages illimités</li>
              <li>✔ 3 canaux connectés</li>
              <li>✔ Automatisations intelligentes</li>
              <li>✔ Support prioritaire</li>
            </ul>

            <a
              href="/en"
              className="block text-center px-8 py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition"
            >
              Choisir Pro
            </a>
          </div>

          {/* ENTERPRISE */}
          <div className="p-10 bg-white border rounded-2xl shadow-sm hover:shadow-md transition">
            <h3 className="text-2xl font-bold mb-4">Enterprise</h3>
            <p className="text-gray-600 mb-6">
              Pour les entreprises ayant besoin de solutions personnalisées et d’une évolutivité totale.
            </p>
            <p className="text-4xl font-extrabold mb-6">99€<span className="text-lg">/mois</span></p>

            <ul className="text-gray-600 space-y-3 mb-8">
              <li>✔ Toutes les fonctionnalités Pro</li>
              <li>✔ Canaux illimités</li>
              <li>✔ Automatisations avancées</li>
              <li>✔ Support dédié</li>
              <li>✔ Intégrations personnalisées</li>
            </ul>

            <a
              href="/en"
              className="block text-center px-8 py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition"
            >
              Nous contacter
            </a>
          </div>

        </div>
      </section>

      {/* SERVICES SUPPLÉMENTAIRES */}
      <section className="py-24 px-6 max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-16">
          Services supplémentaires
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">

          <div className="p-8 border rounded-2xl shadow-sm hover:shadow-md transition">
            <h3 className="text-xl font-bold mb-3">Configuration WhatsApp</h3>
            <p className="text-gray-600 mb-4">
              Mise en place complète de votre canal WhatsApp Business API.
            </p>
            <p className="font-bold text-blue-600">49€ frais uniques</p>
          </div>

          <div className="p-8 border rounded-2xl shadow-sm hover:shadow-md transition">
            <h3 className="text-xl font-bold mb-3">Création de chatbot personnalisé</h3>
            <p className="text-gray-600 mb-4">
              Nous construisons un chatbot sur mesure pour votre entreprise.
            </p>
            <p className="font-bold text-blue-600">99€ frais uniques</p>
          </div>

          <div className="p-8 border rounded-2xl shadow-sm hover:shadow-md transition">
            <h3 className="text-xl font-bold mb-3">Intégration site web</h3>
            <p className="text-gray-600 mb-4">
              Nous intégrons NexoBot à votre site de manière professionnelle.
            </p>
            <p className="font-bold text-blue-600">39€ frais uniques</p>
          </div>

        </div>
      </section>

      {/* COMMENT ÇA MARCHE */}
      <section className="py-24 px-6 bg-gray-50" id="how">
        <h2 className="text-4xl font-bold text-center mb-16">
          Comment fonctionne NexoBot
        </h2>

        <div className="max-w-4xl mx-auto space-y-12">

          <div>
            <h3 className="text-2xl font-bold mb-3">1. Connectez vos canaux</h3>
            <p className="text-gray-600">
              WhatsApp, Instagram, Facebook ou site web : choisissez où automatiser.
            </p>
          </div>

          <div>
            <h3 className="text-2xl font-bold mb-3">2. Configurez vos automatisations</h3>
            <p className="text-gray-600">
              Définissez ce que NexoBot doit faire : répondre, vendre, qualifier les clients, etc.
            </p>
          </div>

          <div>
            <h3 className="text-2xl font-bold mb-3">3. Laissez-le travailler pour vous</h3>
            <p className="text-gray-600">
              NexoBot répond aux clients 24/7 et vous aide à générer plus de ventes.
            </p>
          </div>

        </div>
      </section>
      {/* FAQ */}
      <section className="py-24 px-6 max-w-5xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-16">
          Questions fréquentes
        </h2>

        <div className="space-y-10">

          <div>
            <h3 className="text-2xl font-bold mb-3">
              NexoBot fonctionne-t-il avec WhatsApp ?
            </h3>
            <p className="text-gray-600">
              Oui, NexoBot s’intègre parfaitement avec WhatsApp Business API pour
              automatiser les réponses, les ventes et le support.
            </p>
          </div>

          <div>
            <h3 className="text-2xl font-bold mb-3">
              Puis-je aussi l’utiliser sur Instagram et Facebook ?
            </h3>
            <p className="text-gray-600">
              Bien sûr. Vous pouvez connecter plusieurs canaux et tout gérer depuis
              une seule plateforme.
            </p>
          </div>

          <div>
            <h3 className="text-2xl font-bold mb-3">
              Ai-je besoin de compétences techniques ?
            </h3>
            <p className="text-gray-600">
              Non. NexoBot est conçu pour être simple et intuitif. Vous pouvez
              commencer en quelques minutes.
            </p>
          </div>

          <div>
            <h3 className="text-2xl font-bold mb-3">
              Puis-je annuler quand je veux ?
            </h3>
            <p className="text-gray-600">
              Oui, vous pouvez annuler ou changer de plan à tout moment sans frais
              supplémentaires.
            </p>
          </div>

        </div>
      </section>

      {/* TÉMOIGNAGES */}
      <section className="py-24 px-6 bg-gray-50">
        <h2 className="text-4xl font-bold text-center mb-16">
          Ce que disent nos clients
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-6xl mx-auto">

          <div className="p-8 bg-white border rounded-2xl shadow-sm">
            <p className="text-gray-700 italic mb-4">
              “NexoBot a réduit de 70% le temps passé à répondre aux clients.
              C’est incroyable.”
            </p>
            <p className="font-bold">Marc R.</p>
            <p className="text-gray-500 text-sm">E-commerce</p>
          </div>

          <div className="p-8 bg-white border rounded-2xl shadow-sm">
            <p className="text-gray-700 italic mb-4">
              “Nous avons augmenté nos ventes de 40% en un mois. Indispensable.”
            </p>
            <p className="font-bold">Julie S.</p>
            <p className="text-gray-500 text-sm">Services numériques</p>
          </div>

          <div className="p-8 bg-white border rounded-2xl shadow-sm">
            <p className="text-gray-700 italic mb-4">
              “Facile à utiliser, rapide à configurer et super efficace.”
            </p>
            <p className="font-bold">Lucas M.</p>
            <p className="text-gray-500 text-sm">Restauration</p>
          </div>

        </div>
      </section>

      {/* CTA FINALE */}
      <section className="py-32 px-6 text-center max-w-4xl mx-auto">
        <h2 className="text-5xl font-extrabold mb-6">
          Prêt à développer votre entreprise ?
        </h2>

        <p className="text-lg text-gray-600 mb-10">
          Commencez aujourd’hui avec NexoBot et automatisez vos ventes, votre support
          et votre communication.
        </p>

        <a
          href="/en"
          className="px-12 py-4 bg-blue-600 text-white rounded-xl font-semibold shadow-md hover:bg-blue-700 transition-all"
        >
          Commencer maintenant
        </a>
      </section>

      {/* FOOTER */}
      <footer className="py-10 text-center text-gray-500 text-sm border-t">
        © {new Date().getFullYear()} NexoBot — Tous droits réservés.
      </footer>

    </main>
  );
}
