import Link from "next/link";

export default function HomeFR() {
  return (
    <main className="min-h-screen bg-white text-gray-900">
      {/* Navbar */}
      <nav className="max-w-6xl mx-auto px-6 py-5 flex items-center justify-between">
        <Link href="/fr" className="text-2xl font-extrabold text-blue-600">NexoBot</Link>
        <div className="flex items-center gap-4">
          <a href="#pricing" className="text-sm font-medium text-gray-600 hover:text-blue-600 transition">Tarifs</a>
          <a href="#faq" className="text-sm font-medium text-gray-600 hover:text-blue-600 transition">FAQ</a>
          <Link href="/auth/login" className="text-sm font-medium text-gray-700 hover:text-blue-600 transition">Se connecter</Link>
          <Link href="/auth/signup" className="px-4 py-2 bg-blue-600 text-white text-sm font-semibold rounded-lg hover:bg-blue-700 transition">Commencer gratuitement</Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="max-w-4xl mx-auto px-6 py-24 text-center">
        <span className="inline-block bg-blue-100 text-blue-700 text-xs font-semibold px-3 py-1 rounded-full mb-6 uppercase tracking-wide">
          IA pour les Ventes &amp; le Support
        </span>
        <h1 className="text-5xl font-extrabold leading-tight mb-6">
          Automatisez vos Ventes et votre Support Client avec NexoBot
        </h1>
        <p className="text-xl text-gray-600 mb-10">
          NexoBot gère vos leads, répond aux clients et booste vos ventes 24h/24 — pendant que vous vous concentrez sur ce qui compte vraiment.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/auth/signup" className="px-8 py-4 bg-blue-600 text-white text-lg font-semibold rounded-xl hover:bg-blue-700 transition shadow-lg">
            Commencer gratuitement
          </Link>
          <a href="#pricing" className="px-8 py-4 border border-gray-300 text-gray-700 text-lg font-semibold rounded-xl hover:border-blue-600 hover:text-blue-600 transition">
            Voir les tarifs
          </a>
        </div>
        <p className="mt-4 text-sm text-gray-500">Aucune carte de crédit requise</p>
      </section>

      {/* Features */}
      <section className="bg-gray-50 py-20">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-extrabold text-center mb-4">Pourquoi choisir NexoBot ?</h2>
          <p className="text-center text-gray-500 mb-14 max-w-2xl mx-auto">
            Tout ce dont vous avez besoin pour automatiser votre activité et offrir une expérience client exceptionnelle.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
              <div className="text-3xl mb-4">🤖</div>
              <h3 className="text-xl font-bold mb-2">IA Conversationnelle</h3>
              <p className="text-gray-600">Répond automatiquement aux questions fréquentes et qualifie vos leads en temps réel, 24h/24 et 7j/7.</p>
            </div>
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
              <div className="text-3xl mb-4">📈</div>
              <h3 className="text-xl font-bold mb-2">Boost des Ventes</h3>
              <p className="text-gray-600">Convertissez plus de visiteurs en clients grâce à des conversations personnalisées et des relances automatiques.</p>
            </div>
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
              <div className="text-3xl mb-4">🔗</div>
              <h3 className="text-xl font-bold mb-2">Intégrations Faciles</h3>
              <p className="text-gray-600">Connectez NexoBot à vos outils existants : CRM, e-mail, WhatsApp, Slack et bien plus encore.</p>
            </div>
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
              <div className="text-3xl mb-4">📊</div>
              <h3 className="text-xl font-bold mb-2">Analyses &amp; Rapports</h3>
              <p className="text-gray-600">Suivez les performances de votre bot avec des tableaux de bord intuitifs et des rapports détaillés.</p>
            </div>
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
              <div className="text-3xl mb-4">🛡️</div>
              <h3 className="text-xl font-bold mb-2">Sécurité &amp; Conformité</h3>
              <p className="text-gray-600">Vos données sont protégées avec un chiffrement de bout en bout et une conformité RGPD garantie.</p>
            </div>
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
              <div className="text-3xl mb-4">⚡</div>
              <h3 className="text-xl font-bold mb-2">Configuration Rapide</h3>
              <p className="text-gray-600">Déployez votre bot en moins de 10 minutes sans aucune compétence technique requise.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-20">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-extrabold text-center mb-4">Tarifs simples et transparents</h2>
          <p className="text-center text-gray-500 mb-14 max-w-2xl mx-auto">
            Choisissez le plan qui correspond à vos besoins. Changez ou annulez à tout moment.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Starter */}
            <div className="rounded-2xl border border-gray-200 p-8 flex flex-col">
              <h3 className="text-xl font-bold mb-2">Starter</h3>
              <p className="text-gray-500 text-sm mb-6">Idéal pour les indépendants et petites équipes.</p>
              <div className="text-4xl font-extrabold mb-1">$29<span className="text-lg font-medium text-gray-500">/mois</span></div>
              <ul className="mt-6 mb-8 space-y-3 text-sm text-gray-700 flex-1">
                <li>✅ 1 bot actif</li>
                <li>✅ Jusqu&apos;à 500 conversations/mois</li>
                <li>✅ Intégrations de base</li>
                <li>✅ Support par e-mail</li>
              </ul>
              <Link href="/auth/signup?priceId=price_1T18BGRap0JkQNsmaUVhyNFr" className="block text-center px-6 py-3 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition">
                Commencer
              </Link>
            </div>
            {/* Pro */}
            <div className="rounded-2xl border-2 border-blue-600 p-8 flex flex-col relative shadow-lg">
              <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-blue-600 text-white text-xs font-bold px-4 py-1 rounded-full">Le plus populaire</span>
              <h3 className="text-xl font-bold mb-2">Pro</h3>
              <p className="text-gray-500 text-sm mb-6">Pour les entreprises en pleine croissance.</p>
              <div className="text-4xl font-extrabold mb-1">$59<span className="text-lg font-medium text-gray-500">/mois</span></div>
              <ul className="mt-6 mb-8 space-y-3 text-sm text-gray-700 flex-1">
                <li>✅ 5 bots actifs</li>
                <li>✅ Jusqu&apos;à 5 000 conversations/mois</li>
                <li>✅ Intégrations avancées</li>
                <li>✅ Support prioritaire</li>
                <li>✅ Analyses détaillées</li>
              </ul>
              <Link href="/auth/signup?priceId=price_1T15gVRap0JkQNsm59vukMuR" className="block text-center px-6 py-3 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition">
                Commencer
              </Link>
            </div>
            {/* Premium */}
            <div className="rounded-2xl border border-gray-200 p-8 flex flex-col">
              <h3 className="text-xl font-bold mb-2">Premium</h3>
              <p className="text-gray-500 text-sm mb-6">Pour les grandes entreprises avec des besoins avancés.</p>
              <div className="text-4xl font-extrabold mb-1">$99<span className="text-lg font-medium text-gray-500">/mois</span></div>
              <ul className="mt-6 mb-8 space-y-3 text-sm text-gray-700 flex-1">
                <li>✅ Bots illimités</li>
                <li>✅ Conversations illimitées</li>
                <li>✅ Toutes les intégrations</li>
                <li>✅ Support dédié 24/7</li>
                <li>✅ Personnalisation avancée</li>
                <li>✅ SLA garanti</li>
              </ul>
              <Link href="/auth/signup?priceId=price_1T15jDRap0JkQNsmQRvEkpcm" className="block text-center px-6 py-3 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition">
                Commencer
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Additional Services */}
      <section className="bg-gray-50 py-20">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-extrabold text-center mb-4">Services Additionnels</h2>
          <p className="text-center text-gray-500 mb-14 max-w-2xl mx-auto">
            Améliorez votre expérience NexoBot avec nos services complémentaires à la carte.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-2xl border border-gray-200 p-8 flex flex-col">
              <div className="text-3xl mb-4">🎨</div>
              <h3 className="text-xl font-bold mb-2">Personnalisation Avancée</h3>
              <p className="text-gray-600 mb-6 flex-1">Adaptez l&apos;apparence et le comportement de votre bot à votre identité de marque.</p>
              <div className="text-2xl font-extrabold mb-4">$99</div>
              <Link href="/auth/signup?priceId=price_1T161uRap0JkQNsm3BJZGOEu" className="block text-center px-6 py-3 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition">
                En savoir plus
              </Link>
            </div>
            <div className="bg-white rounded-2xl border border-gray-200 p-8 flex flex-col">
              <div className="text-3xl mb-4">⚙️</div>
              <h3 className="text-xl font-bold mb-2">Automatisations Avancées</h3>
              <p className="text-gray-600 mb-6 flex-1">Créez des flux de travail complexes et des automatisations pour optimiser vos processus métier.</p>
              <div className="text-2xl font-extrabold mb-4">$149</div>
              <Link href="/auth/signup?priceId=price_1T163sRap0JkQNsmOrHBQuJp" className="block text-center px-6 py-3 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition">
                En savoir plus
              </Link>
            </div>
            <div className="bg-white rounded-2xl border border-gray-200 p-8 flex flex-col">
              <div className="text-3xl mb-4">🔌</div>
              <h3 className="text-xl font-bold mb-2">Intégrations Externes</h3>
              <p className="text-gray-600 mb-6 flex-1">Connectez NexoBot à vos systèmes internes et outils tiers avec des intégrations sur mesure.</p>
              <div className="text-2xl font-extrabold mb-4">$199</div>
              <Link href="/auth/signup?priceId=price_1T166cRap0JkQNsmuPTOPBBu" className="block text-center px-6 py-3 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition">
                En savoir plus
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-20">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="text-3xl font-extrabold text-center mb-14">Questions Fréquentes</h2>
          <div className="space-y-8">
            <div>
              <h3 className="text-lg font-bold mb-2">Comment fonctionne NexoBot ?</h3>
              <p className="text-gray-600">NexoBot utilise l&apos;intelligence artificielle pour analyser les messages de vos clients et y répondre automatiquement de manière naturelle et pertinente, 24h/24.</p>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-2">Puis-je essayer NexoBot gratuitement ?</h3>
              <p className="text-gray-600">Oui ! Vous pouvez commencer avec notre essai gratuit sans carte de crédit. Découvrez toutes les fonctionnalités avant de vous engager.</p>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-2">Quelles plateformes sont supportées ?</h3>
              <p className="text-gray-600">NexoBot s&apos;intègre avec votre site web, WhatsApp, Facebook Messenger, Instagram, Slack et de nombreuses autres plateformes.</p>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-2">Puis-je changer de plan à tout moment ?</h3>
              <p className="text-gray-600">Absolument. Vous pouvez upgrader ou downgrader votre plan à n&apos;importe quel moment depuis votre tableau de bord, sans frais cachés.</p>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-2">Mes données sont-elles en sécurité ?</h3>
              <p className="text-gray-600">La sécurité est notre priorité. Toutes les données sont chiffrées et nous sommes conformes au RGPD. Vos informations ne sont jamais partagées avec des tiers.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="bg-blue-600 py-20">
        <div className="max-w-3xl mx-auto px-6 text-center text-white">
          <h2 className="text-3xl font-extrabold mb-4">Prêt à transformer votre activité ?</h2>
          <p className="text-blue-100 mb-8 text-lg">
            Rejoignez des milliers d&apos;entreprises qui utilisent NexoBot pour automatiser leur croissance.
          </p>
          <Link href="/auth/signup" className="inline-block px-10 py-4 bg-white text-blue-600 text-lg font-bold rounded-xl hover:bg-blue-50 transition shadow-lg">
            Commencer gratuitement
          </Link>
          <p className="mt-4 text-blue-200 text-sm">Aucune carte de crédit requise · Annulez à tout moment</p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-12">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div>
              <Link href="/fr" className="text-xl font-extrabold text-white">NexoBot</Link>
              <p className="text-sm mt-1">Automatisez vos ventes et votre support client.</p>
            </div>
            <div className="flex gap-6 text-sm">
              <a href="#pricing" className="hover:text-white transition">Tarifs</a>
              <a href="#faq" className="hover:text-white transition">FAQ</a>
              <Link href="/auth/login" className="hover:text-white transition">Se connecter</Link>
              <Link href="/auth/signup" className="hover:text-white transition">S&apos;inscrire</Link>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-xs">
            <p>&copy; {new Date().getFullYear()} NexoBot. Tous droits réservés.</p>
          </div>
        </div>
      </footer>
    </main>
  );
}
