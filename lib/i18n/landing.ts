export interface LandingT {
  nav: { features: string; pricing: string; faq: string; login: string; cta: string };
  hero: {
    badge: string; h1: string; subtitle: string;
    cta1: string; cta2: string; noCard: string;
    stats: [{ value: string; label: string }, { value: string; label: string }, { value: string; label: string }];
    chatOnline: string; chatMsg1: string; chatMsg2: string; chatMsg3: string;
    chatPlaceholder: string; chatBadge1: string; chatBadge2: string;
  };
  trust: string;
  features: {
    label: string; title: string; subtitle: string;
    items: [{ title: string; desc: string }, { title: string; desc: string }, { title: string; desc: string }];
  };
  howItWorks: {
    label: string; title: string; subtitle: string;
    steps: [{ title: string; desc: string }, { title: string; desc: string }, { title: string; desc: string }];
  };
  demo: {
    label: string; title: string; titleHighlight: string; subtitle: string;
    bullets: [string, string, string, string];
    cta1: string; cta2: string; noCard: string;
  };
  services: {
    label: string; title: string; subtitle: string; badge: string; cta: string;
    items: [
      { title: string; desc: string; features: [string, string, string] },
      { title: string; desc: string; features: [string, string, string] },
      { title: string; desc: string; features: [string, string, string] }
    ];
  };
  testimonials: {
    label: string; title: string; subtitle: string;
    items: [
      { name: string; role: string; quote: string },
      { name: string; role: string; quote: string },
      { name: string; role: string; quote: string }
    ];
  };
  faq: {
    label: string; title: string; subtitle: string;
    items: Array<{ q: string; a: string }>;
  };
  cta: { title: string; titleHighlight: string; subtitle: string; button: string; noCard: string };
  footer: { copyright: string; pricing: string; faq: string; features: string; login: string; privacy: string; terms: string };
}

// ── ESPAÑOL (raíz) ──────────────────────────────────────────────────────────
export const es: LandingT = {
  nav: { features: "Características", pricing: "Precios", faq: "FAQ", login: "Iniciar sesión", cta: "Empezar gratis →" },
  hero: {
    badge: "Más de 500 negocios confían en NexoBot",
    h1: "Automatiza tus ventas y atención al cliente con NexoBot",
    subtitle: "Tu asistente con IA que responde clientes, genera ventas y trabaja por ti 24/7. Ahorra tiempo, aumenta ingresos y escala sin esfuerzo.",
    cta1: "Empezar gratis →", cta2: "Ver cómo funciona", noCard: "Sin tarjeta de crédito · Cancela cuando quieras",
    stats: [
      { value: "500+", label: "Negocios activos" },
      { value: "24/7", label: "Disponibilidad" },
      { value: "40%",  label: "+ Ventas promedio" },
    ],
    chatOnline: "En línea ahora",
    chatMsg1: "¡Hola! ¿En qué puedo ayudarte hoy? 👋",
    chatMsg2: "Quiero info sobre sus planes",
    chatMsg3: "¡Claro! Tenemos 3 planes desde $14/mes. ¿Cuál se adapta a tu negocio? 🚀",
    chatPlaceholder: "Escribe un mensaje...",
    chatBadge1: "✓ Respondido en 1s", chatBadge2: "🔥 +40% ventas",
  },
  trust: "Compatible con tus herramientas favoritas",
  features: {
    label: "Características", title: "Todo lo que necesitas para automatizar",
    subtitle: "NexoBot combina IA, automatización y multicanalidad para atender más clientes y vender más sin esfuerzo.",
    items: [
      { title: "Responde en segundos",  desc: "Tu bot atiende automáticamente 24/7, sin retrasos ni tiempos de espera." },
      { title: "Conecta tus canales",   desc: "WhatsApp, web, redes sociales o CRM. NexoBot se integra fácilmente con tu ecosistema." },
      { title: "Genera más ventas",     desc: "Flujos inteligentes, embudos automatizados y segmentación para convertir más clientes." },
    ],
  },
  howItWorks: {
    label: "Proceso", title: "Listo en 3 pasos", subtitle: "Configura tu asistente inteligente en minutos y empieza a vender.",
    steps: [
      { title: "Configura tu bot",          desc: "Personaliza respuestas, define el tono de tu marca y ajusta la lógica del asistente según tus necesidades." },
      { title: "Conéctalo a tus canales",   desc: "WhatsApp, web, redes sociales o CRM. NexoBot centraliza toda tu comunicación en un solo lugar." },
      { title: "Automatiza y escala",        desc: "Tu bot atiende clientes, captura leads y genera ventas automáticamente sin que tengas que intervenir." },
    ],
  },
  demo: {
    label: "Demo en vivo", title: "Habla con NexoBot", titleHighlight: "ahora mismo",
    subtitle: "No necesitas crear cuenta. Prueba en tiempo real cómo tu bot responderá a los clientes de tu negocio.",
    bullets: ["Respuestas en menos de 2 segundos", "IA real — no respuestas pregrabadas", "Personalizable con el tono de tu marca", "Funciona en web, WhatsApp e Instagram"],
    cta1: "Crear mi bot gratis →", cta2: "Ver precios", noCard: "Sin tarjeta de crédito · Cancela cuando quieras",
  },
  services: {
    label: "Servicios adicionales", title: "Lleva tu NexoBot al siguiente nivel",
    subtitle: "Configuraciones profesionales, personalización avanzada e integraciones a medida. Pago único.",
    badge: "Pago único", cta: "Comprar ahora",
    items: [
      { title: "Personalización avanzada",      desc: "Haz que tu bot hable como tu marca",       features: ["Ajustes personalizados", "Respuestas adaptadas a tu negocio", "Optimización del flujo conversacional"] },
      { title: "Automatizaciones avanzadas",    desc: "Convierte tu bot en una máquina de ventas", features: ["Flujos inteligentes personalizados", "Segmentación avanzada", "Embudos automatizados"] },
      { title: "Integración sistemas externos", desc: "Conecta tu bot con tu ecosistema",          features: ["Integración con CRM", "Conexión con APIs externas", "Sincronización de datos"] },
    ],
  },
  testimonials: {
    label: "Testimonios", title: "Lo que dicen nuestros clientes", subtitle: "Negocios reales, resultados reales.",
    items: [
      { name: "María López",      role: "Tienda online de accesorios",  quote: "NexoBot responde a mis clientes incluso cuando estoy durmiendo. En el primer mes mis ventas subieron un 40% sin invertir más tiempo." },
      { name: "Carlos Fernández", role: "Servicios profesionales",       quote: "La integración con WhatsApp fue rapidísima. Ahora tengo un flujo de ventas automatizado que atiende a todos mis prospectos sin que yo esté encima." },
      { name: "Ana Rodríguez",    role: "Emprendedora digital",          quote: "El soporte es excelente. Me ayudaron a personalizar mi bot y ahora atiende más de 300 consultas al día sin perder calidad." },
    ],
  },
  faq: {
    label: "FAQ", title: "Preguntas frecuentes", subtitle: "Resolvemos tus dudas para que empieces con total confianza.",
    items: [
      { q: "¿Necesito conocimientos técnicos para usar NexoBot?",  a: "No. NexoBot está diseñado para que cualquier persona pueda configurarlo en minutos sin conocimientos técnicos." },
      { q: "¿Puedo usar NexoBot en WhatsApp?",                      a: "Sí. Los planes Pro y Premium incluyen integración con WhatsApp para automatizar tus conversaciones y ventas." },
      { q: "¿Qué pasa si supero el límite de mensajes?",            a: "Te avisaremos antes de llegar al límite. Puedes actualizar tu plan en cualquier momento sin interrupciones." },
      { q: "¿Puedo cancelar cuando quiera?",                        a: "Sí. Sin contratos ni permanencias. Puedes cancelar tu suscripción cuando quieras desde tu panel de control." },
      { q: "¿Ofrecen soporte?",                                     a: "Todos los planes incluyen soporte. El plan Premium cuenta con soporte prioritario para respuestas más rápidas." },
      { q: "¿Puedo integrar NexoBot con mi sitio web?",             a: "Sí. Todos los planes incluyen un widget fácil de instalar para conectar NexoBot con tu sitio web en minutos." },
    ],
  },
  cta: {
    title: "Automatiza tu negocio hoy", titleHighlight: "con NexoBot",
    subtitle: "Responde clientes, genera ventas y escala tu negocio 24/7 con tu asistente inteligente.",
    button: "Empezar gratis →", noCard: "Sin tarjeta de crédito · Cancela cuando quieras",
  },
  footer: { copyright: "© {year} NexoBot — Todos los derechos reservados.", pricing: "Precios", faq: "FAQ", features: "Características", login: "Iniciar sesión", privacy: "Privacidad", terms: "Términos" },
};

// ── ENGLISH ─────────────────────────────────────────────────────────────────
export const en: LandingT = {
  nav: { features: "Features", pricing: "Pricing", faq: "FAQ", login: "Sign in", cta: "Get started free →" },
  hero: {
    badge: "500+ businesses trust NexoBot",
    h1: "Automate your sales and customer support with NexoBot",
    subtitle: "Your AI assistant that replies to customers, generates sales, and works for you 24/7. Save time, increase revenue, and scale effortlessly.",
    cta1: "Get started free →", cta2: "See how it works", noCard: "No credit card required · Cancel anytime",
    stats: [
      { value: "500+", label: "Active businesses" },
      { value: "24/7", label: "Availability" },
      { value: "40%",  label: "Avg. sales increase" },
    ],
    chatOnline: "Online now",
    chatMsg1: "Hi! How can I help you today? 👋",
    chatMsg2: "I want info about your plans",
    chatMsg3: "Sure! We have 3 plans starting at $14/mo. Which fits your business? 🚀",
    chatPlaceholder: "Type a message...",
    chatBadge1: "✓ Replied in 1s", chatBadge2: "🔥 +40% sales",
  },
  trust: "Works with your favorite tools",
  features: {
    label: "Features", title: "Everything you need to automate",
    subtitle: "NexoBot combines AI, automation, and multichannel to serve more customers and close more sales — effortlessly.",
    items: [
      { title: "Replies in seconds",    desc: "Your bot handles customers automatically 24/7, with no delays or waiting times." },
      { title: "Connect your channels", desc: "WhatsApp, web, social media or CRM. NexoBot integrates easily with your ecosystem." },
      { title: "Generate more sales",   desc: "Smart flows, automated funnels, and segmentation to convert more customers." },
    ],
  },
  howItWorks: {
    label: "Process", title: "Ready in 3 steps", subtitle: "Set up your intelligent assistant in minutes and start selling.",
    steps: [
      { title: "Set up your bot",        desc: "Customize responses, define your brand tone, and configure the assistant to your needs." },
      { title: "Connect your channels",  desc: "WhatsApp, web, social media or CRM. NexoBot centralizes all your communication." },
      { title: "Automate and scale",     desc: "Your bot handles customers, captures leads, and generates sales automatically." },
    ],
  },
  demo: {
    label: "Live Demo", title: "Talk to NexoBot", titleHighlight: "right now",
    subtitle: "No account needed. Test in real time how your bot will respond to your customers.",
    bullets: ["Responses in under 2 seconds", "Real AI — not scripted replies", "Customizable with your brand tone", "Works on web, WhatsApp and Instagram"],
    cta1: "Create my free bot →", cta2: "See pricing", noCard: "No credit card required · Cancel anytime",
  },
  services: {
    label: "Add-ons", title: "Take your NexoBot to the next level",
    subtitle: "Professional setup, advanced customization, and custom integrations. One-time payment.",
    badge: "One-time payment", cta: "Buy now",
    items: [
      { title: "Advanced customization",      desc: "Make your bot speak your brand",       features: ["Custom adjustments", "Responses adapted to your business", "Conversational flow optimization"] },
      { title: "Advanced automations",        desc: "Turn your bot into a sales machine",   features: ["Custom smart flows", "Advanced segmentation", "Automated funnels"] },
      { title: "External system integration", desc: "Connect your bot with your ecosystem", features: ["CRM integration", "External API connections", "Data synchronization"] },
    ],
  },
  testimonials: {
    label: "Testimonials", title: "What our customers say", subtitle: "Real businesses, real results.",
    items: [
      { name: "Maria Lopez",      role: "Online accessories store", quote: "NexoBot replies to my customers even while I sleep. My sales went up 40% in the first month without any extra effort." },
      { name: "Carlos Fernandez", role: "Professional services",    quote: "WhatsApp integration was lightning fast. Now I have an automated sales flow handling all my prospects without me being there." },
      { name: "Ana Rodriguez",    role: "Digital entrepreneur",     quote: "The support is excellent. They helped me customize my bot and now it handles over 300 inquiries a day without losing quality." },
    ],
  },
  faq: {
    label: "FAQ", title: "Frequently asked questions", subtitle: "Everything you need to start with full confidence.",
    items: [
      { q: "Do I need technical skills to use NexoBot?",    a: "No. NexoBot is designed so anyone can set it up in minutes without technical knowledge." },
      { q: "Can I use NexoBot on WhatsApp?",                a: "Yes. Pro and Premium plans include WhatsApp integration to automate your conversations and sales." },
      { q: "What happens if I exceed the message limit?",   a: "We'll notify you before you reach the limit. You can upgrade your plan anytime without interruption." },
      { q: "Can I cancel anytime?",                         a: "Yes. No contracts or commitments. Cancel your subscription anytime from your dashboard." },
      { q: "Do you offer support?",                         a: "All plans include support. The Premium plan has priority support for faster responses." },
      { q: "Can I integrate NexoBot with my website?",      a: "Yes. All plans include an easy-to-install widget to connect NexoBot with your website in minutes." },
    ],
  },
  cta: {
    title: "Automate your business today", titleHighlight: "with NexoBot",
    subtitle: "Reply to customers, generate sales, and scale 24/7 with your intelligent assistant.",
    button: "Get started free →", noCard: "No credit card required · Cancel anytime",
  },
  footer: { copyright: "© {year} NexoBot — All rights reserved.", pricing: "Pricing", faq: "FAQ", features: "Features", login: "Sign in", privacy: "Privacy", terms: "Terms" },
};

// ── ITALIANO ─────────────────────────────────────────────────────────────────
export const it: LandingT = {
  nav: { features: "Funzionalità", pricing: "Prezzi", faq: "FAQ", login: "Accedi", cta: "Inizia gratis →" },
  hero: {
    badge: "Oltre 500 aziende si fidano di NexoBot",
    h1: "Automatizza le tue vendite e il supporto clienti con NexoBot",
    subtitle: "Il tuo assistente IA che risponde ai clienti, genera vendite e lavora per te 24/7. Risparmia tempo, aumenta le entrate e scala senza fatica.",
    cta1: "Inizia gratis →", cta2: "Scopri come funziona", noCard: "Nessuna carta di credito · Disdici quando vuoi",
    stats: [
      { value: "500+", label: "Aziende attive" },
      { value: "24/7", label: "Disponibilità" },
      { value: "40%",  label: "+ Vendite medie" },
    ],
    chatOnline: "Online ora",
    chatMsg1: "Ciao! Come posso aiutarti oggi? 👋",
    chatMsg2: "Voglio info sui vostri piani",
    chatMsg3: "Certo! Abbiamo 3 piani a partire da $14/mese. Quale si adatta al tuo business? 🚀",
    chatPlaceholder: "Scrivi un messaggio...",
    chatBadge1: "✓ Risposto in 1s", chatBadge2: "🔥 +40% vendite",
  },
  trust: "Compatibile con i tuoi strumenti preferiti",
  features: {
    label: "Funzionalità", title: "Tutto quello che ti serve per automatizzare",
    subtitle: "NexoBot combina IA, automazione e multicanalità per servire più clienti e vendere di più — senza sforzo.",
    items: [
      { title: "Risponde in secondi",     desc: "Il tuo bot gestisce i clienti automaticamente 24/7, senza ritardi né attese." },
      { title: "Connetti i tuoi canali",  desc: "WhatsApp, web, social o CRM. NexoBot si integra facilmente con il tuo ecosistema." },
      { title: "Genera più vendite",      desc: "Flussi intelligenti, funnel automatizzati e segmentazione per convertire più clienti." },
    ],
  },
  howItWorks: {
    label: "Come funziona", title: "Pronto in 3 passi", subtitle: "Configura il tuo assistente intelligente in pochi minuti e inizia a vendere.",
    steps: [
      { title: "Configura il tuo bot",       desc: "Personalizza le risposte, definisci il tono del tuo brand e adatta la logica dell'assistente alle tue esigenze." },
      { title: "Connetti i tuoi canali",     desc: "WhatsApp, web, social o CRM. NexoBot centralizza tutte le tue comunicazioni in un unico posto." },
      { title: "Automatizza e scala",        desc: "Il tuo bot gestisce i clienti, cattura lead e genera vendite automaticamente senza che tu debba intervenire." },
    ],
  },
  demo: {
    label: "Demo dal vivo", title: "Parla con NexoBot", titleHighlight: "adesso",
    subtitle: "Non è necessario creare un account. Prova in tempo reale come il tuo bot risponderà ai clienti.",
    bullets: ["Risposte in meno di 2 secondi", "IA reale — non risposte preregistrate", "Personalizzabile con il tono del tuo brand", "Funziona su web, WhatsApp e Instagram"],
    cta1: "Crea il mio bot gratis →", cta2: "Vedi i prezzi", noCard: "Nessuna carta di credito · Disdici quando vuoi",
  },
  services: {
    label: "Servizi aggiuntivi", title: "Porta NexoBot al livello successivo",
    subtitle: "Configurazioni professionali, personalizzazione avanzata e integrazioni su misura. Pagamento unico.",
    badge: "Pagamento unico", cta: "Acquista ora",
    items: [
      { title: "Personalizzazione avanzata",     desc: "Fai parlare il tuo bot come il tuo brand",   features: ["Personalizzazioni su misura", "Risposte adattate al tuo business", "Ottimizzazione del flusso conversazionale"] },
      { title: "Automazioni avanzate",           desc: "Trasforma il tuo bot in una macchina di vendite", features: ["Flussi intelligenti personalizzati", "Segmentazione avanzata", "Funnel automatizzati"] },
      { title: "Integrazione sistemi esterni",   desc: "Connetti il tuo bot con il tuo ecosistema",  features: ["Integrazione con CRM", "Connessione con API esterne", "Sincronizzazione dati"] },
    ],
  },
  testimonials: {
    label: "Testimonianze", title: "Cosa dicono i nostri clienti", subtitle: "Aziende reali, risultati reali.",
    items: [
      { name: "Maria Lopez",      role: "Negozio online di accessori", quote: "NexoBot risponde ai miei clienti anche mentre dormo. Nel primo mese le mie vendite sono aumentate del 40% senza investire più tempo." },
      { name: "Carlos Fernandez", role: "Servizi professionali",       quote: "L'integrazione con WhatsApp è stata rapidissima. Ora ho un flusso di vendite automatizzato che gestisce tutti i miei prospect." },
      { name: "Ana Rodriguez",    role: "Imprenditrice digitale",      quote: "Il supporto è eccellente. Mi hanno aiutato a personalizzare il bot e ora gestisce oltre 300 richieste al giorno senza perdere qualità." },
    ],
  },
  faq: {
    label: "FAQ", title: "Domande frequenti", subtitle: "Risolviamo i tuoi dubbi per iniziare con piena fiducia.",
    items: [
      { q: "Ho bisogno di competenze tecniche per usare NexoBot?", a: "No. NexoBot è progettato per essere configurato da chiunque in pochi minuti, senza competenze tecniche." },
      { q: "Posso usare NexoBot su WhatsApp?",                     a: "Sì. I piani Pro e Premium includono l'integrazione con WhatsApp per automatizzare conversazioni e vendite." },
      { q: "Cosa succede se supero il limite di messaggi?",         a: "Ti avviseremo prima di raggiungere il limite. Puoi aggiornare il piano in qualsiasi momento senza interruzioni." },
      { q: "Posso disdire quando voglio?",                          a: "Sì. Nessun contratto né vincolo. Puoi cancellare l'abbonamento quando vuoi dal pannello di controllo." },
      { q: "Offrite supporto?",                                     a: "Tutti i piani includono supporto. Il piano Premium include supporto prioritario per risposte più rapide." },
      { q: "Posso integrare NexoBot con il mio sito web?",          a: "Sì. Tutti i piani includono un widget facile da installare per connettere NexoBot al tuo sito in pochi minuti." },
    ],
  },
  cta: {
    title: "Automatizza il tuo business oggi", titleHighlight: "con NexoBot",
    subtitle: "Rispondi ai clienti, genera vendite e scala il tuo business 24/7 con il tuo assistente intelligente.",
    button: "Inizia gratis →", noCard: "Nessuna carta di credito · Disdici quando vuoi",
  },
  footer: { copyright: "© {year} NexoBot — Tutti i diritti riservati.", pricing: "Prezzi", faq: "FAQ", features: "Funzionalità", login: "Accedi", privacy: "Privacy", terms: "Termini" },
};

// ── FRANÇAIS ─────────────────────────────────────────────────────────────────
export const fr: LandingT = {
  nav: { features: "Fonctionnalités", pricing: "Tarifs", faq: "FAQ", login: "Se connecter", cta: "Commencer gratuitement →" },
  hero: {
    badge: "Plus de 500 entreprises font confiance à NexoBot",
    h1: "Automatisez vos ventes et le support client avec NexoBot",
    subtitle: "Votre assistant IA qui répond aux clients, génère des ventes et travaille pour vous 24h/24. Gagnez du temps, augmentez vos revenus et évoluez sans effort.",
    cta1: "Commencer gratuitement →", cta2: "Voir comment ça marche", noCard: "Sans carte bancaire · Annulez quand vous voulez",
    stats: [
      { value: "500+", label: "Entreprises actives" },
      { value: "24/7", label: "Disponibilité" },
      { value: "40%",  label: "+ Ventes en moyenne" },
    ],
    chatOnline: "En ligne maintenant",
    chatMsg1: "Bonjour ! Comment puis-je vous aider aujourd'hui ? 👋",
    chatMsg2: "Je veux des infos sur vos offres",
    chatMsg3: "Bien sûr ! Nous avons 3 offres à partir de 14$/mois. Laquelle convient à votre activité ? 🚀",
    chatPlaceholder: "Écrivez un message...",
    chatBadge1: "✓ Répondu en 1s", chatBadge2: "🔥 +40% ventes",
  },
  trust: "Compatible avec vos outils préférés",
  features: {
    label: "Fonctionnalités", title: "Tout ce dont vous avez besoin pour automatiser",
    subtitle: "NexoBot combine IA, automatisation et multicanal pour servir plus de clients et vendre plus — sans effort.",
    items: [
      { title: "Répond en secondes",       desc: "Votre bot gère les clients automatiquement 24h/24, sans délai ni attente." },
      { title: "Connectez vos canaux",     desc: "WhatsApp, web, réseaux sociaux ou CRM. NexoBot s'intègre facilement à votre écosystème." },
      { title: "Générez plus de ventes",   desc: "Flux intelligents, tunnels automatisés et segmentation pour convertir plus de clients." },
    ],
  },
  howItWorks: {
    label: "Processus", title: "Prêt en 3 étapes", subtitle: "Configurez votre assistant intelligent en quelques minutes et commencez à vendre.",
    steps: [
      { title: "Configurez votre bot",      desc: "Personnalisez les réponses, définissez le ton de votre marque et adaptez la logique de l'assistant à vos besoins." },
      { title: "Connectez vos canaux",      desc: "WhatsApp, web, réseaux sociaux ou CRM. NexoBot centralise toute votre communication en un seul endroit." },
      { title: "Automatisez et évoluez",    desc: "Votre bot gère les clients, capture des prospects et génère des ventes automatiquement sans que vous ayez à intervenir." },
    ],
  },
  demo: {
    label: "Démo en direct", title: "Parlez à NexoBot", titleHighlight: "maintenant",
    subtitle: "Pas besoin de créer un compte. Testez en temps réel comment votre bot répondra à vos clients.",
    bullets: ["Réponses en moins de 2 secondes", "IA réelle — pas de réponses préenregistrées", "Personnalisable avec le ton de votre marque", "Fonctionne sur web, WhatsApp et Instagram"],
    cta1: "Créer mon bot gratuitement →", cta2: "Voir les tarifs", noCard: "Sans carte bancaire · Annulez quand vous voulez",
  },
  services: {
    label: "Services supplémentaires", title: "Portez NexoBot au niveau supérieur",
    subtitle: "Configurations professionnelles, personnalisation avancée et intégrations sur mesure. Paiement unique.",
    badge: "Paiement unique", cta: "Acheter maintenant",
    items: [
      { title: "Personnalisation avancée",         desc: "Faites parler votre bot comme votre marque",         features: ["Ajustements personnalisés", "Réponses adaptées à votre activité", "Optimisation du flux conversationnel"] },
      { title: "Automatisations avancées",         desc: "Transformez votre bot en machine à vendre",          features: ["Flux intelligents personnalisés", "Segmentation avancée", "Tunnels automatisés"] },
      { title: "Intégration de systèmes externes", desc: "Connectez votre bot à votre écosystème",             features: ["Intégration CRM", "Connexion avec des API externes", "Synchronisation des données"] },
    ],
  },
  testimonials: {
    label: "Témoignages", title: "Ce que disent nos clients", subtitle: "Des entreprises réelles, des résultats réels.",
    items: [
      { name: "Maria Lopez",      role: "Boutique en ligne d'accessoires", quote: "NexoBot répond à mes clients même pendant mon sommeil. Mes ventes ont augmenté de 40 % le premier mois sans effort supplémentaire." },
      { name: "Carlos Fernandez", role: "Services professionnels",          quote: "L'intégration WhatsApp a été ultra-rapide. J'ai maintenant un flux de ventes automatisé qui gère tous mes prospects sans que je sois là." },
      { name: "Ana Rodriguez",    role: "Entrepreneuse digitale",           quote: "Le support est excellent. Ils m'ont aidé à personnaliser mon bot et maintenant il gère plus de 300 demandes par jour sans perdre en qualité." },
    ],
  },
  faq: {
    label: "FAQ", title: "Questions fréquentes", subtitle: "Nous répondons à toutes vos questions pour démarrer en toute confiance.",
    items: [
      { q: "Ai-je besoin de compétences techniques pour utiliser NexoBot ?", a: "Non. NexoBot est conçu pour être configuré par n'importe qui en quelques minutes, sans compétences techniques." },
      { q: "Puis-je utiliser NexoBot sur WhatsApp ?",                         a: "Oui. Les plans Pro et Premium incluent l'intégration WhatsApp pour automatiser vos conversations et vos ventes." },
      { q: "Que se passe-t-il si je dépasse la limite de messages ?",         a: "Nous vous avertirons avant d'atteindre la limite. Vous pouvez mettre à niveau votre plan à tout moment sans interruption." },
      { q: "Puis-je annuler quand je veux ?",                                 a: "Oui. Sans contrat ni engagement. Annulez votre abonnement quand vous voulez depuis votre tableau de bord." },
      { q: "Proposez-vous un support ?",                                      a: "Tous les plans incluent un support. Le plan Premium bénéficie d'un support prioritaire pour des réponses plus rapides." },
      { q: "Puis-je intégrer NexoBot à mon site web ?",                       a: "Oui. Tous les plans incluent un widget facile à installer pour connecter NexoBot à votre site en quelques minutes." },
    ],
  },
  cta: {
    title: "Automatisez votre activité aujourd'hui", titleHighlight: "avec NexoBot",
    subtitle: "Répondez aux clients, générez des ventes et développez votre activité 24/7 avec votre assistant intelligent.",
    button: "Commencer gratuitement →", noCard: "Sans carte bancaire · Annulez quand vous voulez",
  },
  footer: { copyright: "© {year} NexoBot — Tous droits réservés.", pricing: "Tarifs", faq: "FAQ", features: "Fonctionnalités", login: "Se connecter", privacy: "Confidentialité", terms: "Conditions" },
};

// ── DEUTSCH ──────────────────────────────────────────────────────────────────
export const de: LandingT = {
  nav: { features: "Funktionen", pricing: "Preise", faq: "FAQ", login: "Anmelden", cta: "Kostenlos starten →" },
  hero: {
    badge: "Über 500 Unternehmen vertrauen NexoBot",
    h1: "Automatisiere deinen Vertrieb und Kundensupport mit NexoBot",
    subtitle: "Dein KI-Assistent, der Kunden antwortet, Verkäufe generiert und rund um die Uhr für dich arbeitet. Spare Zeit, steigere Einnahmen und skaliere mühelos.",
    cta1: "Kostenlos starten →", cta2: "Sehen wie es funktioniert", noCard: "Keine Kreditkarte · Jederzeit kündbar",
    stats: [
      { value: "500+", label: "Aktive Unternehmen" },
      { value: "24/7", label: "Verfügbarkeit" },
      { value: "40%",  label: "Ø Umsatzsteigerung" },
    ],
    chatOnline: "Jetzt online",
    chatMsg1: "Hallo! Wie kann ich dir heute helfen? 👋",
    chatMsg2: "Ich möchte Infos über eure Pläne",
    chatMsg3: "Klar! Wir haben 3 Pläne ab 14$/Monat. Welcher passt zu deinem Unternehmen? 🚀",
    chatPlaceholder: "Nachricht eingeben...",
    chatBadge1: "✓ In 1s beantwortet", chatBadge2: "🔥 +40% Umsatz",
  },
  trust: "Kompatibel mit deinen Lieblingstools",
  features: {
    label: "Funktionen", title: "Alles, was du zur Automatisierung brauchst",
    subtitle: "NexoBot kombiniert KI, Automatisierung und Multi-Channel, um mehr Kunden zu bedienen und mehr zu verkaufen — mühelos.",
    items: [
      { title: "Antwortet in Sekunden",      desc: "Dein Bot betreut Kunden automatisch rund um die Uhr, ohne Verzögerungen." },
      { title: "Verbinde deine Kanäle",      desc: "WhatsApp, Web, soziale Medien oder CRM. NexoBot integriert sich nahtlos in dein Ökosystem." },
      { title: "Generiere mehr Umsatz",      desc: "Intelligente Flows, automatisierte Funnels und Segmentierung, um mehr Kunden zu konvertieren." },
    ],
  },
  howItWorks: {
    label: "Ablauf", title: "In 3 Schritten bereit", subtitle: "Richte deinen intelligenten Assistenten in Minuten ein und fang an zu verkaufen.",
    steps: [
      { title: "Richte deinen Bot ein",      desc: "Passe Antworten an, definiere den Ton deiner Marke und konfiguriere den Assistenten nach deinen Bedürfnissen." },
      { title: "Verbinde deine Kanäle",      desc: "WhatsApp, Web, soziale Medien oder CRM. NexoBot bündelt deine gesamte Kommunikation an einem Ort." },
      { title: "Automatisiere und skaliere", desc: "Dein Bot betreut Kunden, erfasst Leads und generiert Verkäufe automatisch, ohne dass du eingreifen musst." },
    ],
  },
  demo: {
    label: "Live-Demo", title: "Sprich mit NexoBot", titleHighlight: "jetzt",
    subtitle: "Kein Konto erforderlich. Teste in Echtzeit, wie dein Bot auf deine Kunden reagieren wird.",
    bullets: ["Antworten in unter 2 Sekunden", "Echte KI — keine vorgefertigten Antworten", "Anpassbar an den Ton deiner Marke", "Funktioniert auf Web, WhatsApp und Instagram"],
    cta1: "Meinen Bot kostenlos erstellen →", cta2: "Preise ansehen", noCard: "Keine Kreditkarte · Jederzeit kündbar",
  },
  services: {
    label: "Zusätzliche Dienste", title: "Bringe NexoBot auf das nächste Level",
    subtitle: "Professionelle Einrichtung, erweiterte Anpassung und maßgeschneiderte Integrationen. Einmalzahlung.",
    badge: "Einmalzahlung", cta: "Jetzt kaufen",
    items: [
      { title: "Erweiterte Anpassung",              desc: "Lass deinen Bot wie deine Marke sprechen",       features: ["Individuelle Anpassungen", "Auf dein Unternehmen zugeschnittene Antworten", "Optimierung des Gesprächsflusses"] },
      { title: "Erweiterte Automatisierungen",      desc: "Verwandle deinen Bot in eine Verkaufsmaschine",  features: ["Individuelle intelligente Flows", "Erweiterte Segmentierung", "Automatisierte Funnels"] },
      { title: "Externe Systemintegration",         desc: "Verbinde deinen Bot mit deinem Ökosystem",       features: ["CRM-Integration", "Externe API-Verbindungen", "Datensynchronisation"] },
    ],
  },
  testimonials: {
    label: "Erfahrungsberichte", title: "Was unsere Kunden sagen", subtitle: "Echte Unternehmen, echte Ergebnisse.",
    items: [
      { name: "Maria Lopez",      role: "Online-Accessoire-Shop",  quote: "NexoBot antwortet meinen Kunden selbst wenn ich schlafe. Im ersten Monat stiegen meine Verkäufe um 40 % ohne zusätzlichen Aufwand." },
      { name: "Carlos Fernandez", role: "Professionelle Dienste",  quote: "Die WhatsApp-Integration war blitzschnell. Ich habe jetzt einen automatisierten Verkaufsflow, der alle meine Interessenten betreut." },
      { name: "Ana Rodriguez",    role: "Digitale Unternehmerin",  quote: "Der Support ist ausgezeichnet. Sie halfen mir, meinen Bot anzupassen, und jetzt bearbeitet er über 300 Anfragen täglich ohne Qualitätsverlust." },
    ],
  },
  faq: {
    label: "FAQ", title: "Häufig gestellte Fragen", subtitle: "Wir beantworten deine Fragen, damit du mit vollem Vertrauen starten kannst.",
    items: [
      { q: "Brauche ich technische Kenntnisse, um NexoBot zu nutzen?", a: "Nein. NexoBot ist so konzipiert, dass es jeder in wenigen Minuten ohne technische Kenntnisse einrichten kann." },
      { q: "Kann ich NexoBot auf WhatsApp nutzen?",                     a: "Ja. Die Pro- und Premium-Pläne beinhalten die WhatsApp-Integration zur Automatisierung deiner Gespräche und Verkäufe." },
      { q: "Was passiert, wenn ich das Nachrichtenlimit überschreite?", a: "Wir benachrichtigen dich, bevor du das Limit erreichst. Du kannst deinen Plan jederzeit ohne Unterbrechung upgraden." },
      { q: "Kann ich jederzeit kündigen?",                              a: "Ja. Keine Verträge oder Verpflichtungen. Kündige dein Abonnement jederzeit über dein Dashboard." },
      { q: "Bietet ihr Support an?",                                    a: "Alle Pläne beinhalten Support. Der Premium-Plan bietet Priority-Support für schnellere Antworten." },
      { q: "Kann ich NexoBot in meine Website integrieren?",            a: "Ja. Alle Pläne beinhalten ein einfach zu installierendes Widget, um NexoBot in wenigen Minuten mit deiner Website zu verbinden." },
    ],
  },
  cta: {
    title: "Automatisiere dein Unternehmen heute", titleHighlight: "mit NexoBot",
    subtitle: "Beantworte Kunden, generiere Verkäufe und skaliere dein Unternehmen rund um die Uhr mit deinem intelligenten Assistenten.",
    button: "Kostenlos starten →", noCard: "Keine Kreditkarte · Jederzeit kündbar",
  },
  footer: { copyright: "© {year} NexoBot — Alle Rechte vorbehalten.", pricing: "Preise", faq: "FAQ", features: "Funktionen", login: "Anmelden", privacy: "Datenschutz", terms: "AGB" },
};

// ── PORTUGUÊS ─────────────────────────────────────────────────────────────────
export const pt: LandingT = {
  nav: { features: "Funcionalidades", pricing: "Preços", faq: "FAQ", login: "Entrar", cta: "Começar grátis →" },
  hero: {
    badge: "Mais de 500 empresas confiam no NexoBot",
    h1: "Automatize suas vendas e suporte ao cliente com NexoBot",
    subtitle: "Seu assistente com IA que responde clientes, gera vendas e trabalha por você 24/7. Economize tempo, aumente receitas e escale sem esforço.",
    cta1: "Começar grátis →", cta2: "Ver como funciona", noCard: "Sem cartão de crédito · Cancele quando quiser",
    stats: [
      { value: "500+", label: "Empresas ativas" },
      { value: "24/7", label: "Disponibilidade" },
      { value: "40%",  label: "+ Vendas em média" },
    ],
    chatOnline: "Online agora",
    chatMsg1: "Olá! Como posso te ajudar hoje? 👋",
    chatMsg2: "Quero informações sobre os planos",
    chatMsg3: "Claro! Temos 3 planos a partir de $14/mês. Qual se adapta ao seu negócio? 🚀",
    chatPlaceholder: "Digite uma mensagem...",
    chatBadge1: "✓ Respondido em 1s", chatBadge2: "🔥 +40% vendas",
  },
  trust: "Compatível com suas ferramentas favoritas",
  features: {
    label: "Funcionalidades", title: "Tudo que você precisa para automatizar",
    subtitle: "NexoBot combina IA, automação e multicanal para atender mais clientes e vender mais — sem esforço.",
    items: [
      { title: "Responde em segundos",      desc: "Seu bot atende clientes automaticamente 24/7, sem atrasos nem esperas." },
      { title: "Conecte seus canais",       desc: "WhatsApp, web, redes sociais ou CRM. NexoBot se integra facilmente ao seu ecossistema." },
      { title: "Gere mais vendas",          desc: "Fluxos inteligentes, funis automatizados e segmentação para converter mais clientes." },
    ],
  },
  howItWorks: {
    label: "Processo", title: "Pronto em 3 passos", subtitle: "Configure seu assistente inteligente em minutos e comece a vender.",
    steps: [
      { title: "Configure seu bot",         desc: "Personalize respostas, defina o tom da sua marca e ajuste a lógica do assistente às suas necessidades." },
      { title: "Conecte seus canais",       desc: "WhatsApp, web, redes sociais ou CRM. NexoBot centraliza toda a sua comunicação em um só lugar." },
      { title: "Automatize e escale",       desc: "Seu bot atende clientes, captura leads e gera vendas automaticamente sem que você precise intervir." },
    ],
  },
  demo: {
    label: "Demo ao vivo", title: "Fale com NexoBot", titleHighlight: "agora mesmo",
    subtitle: "Não precisa criar conta. Teste em tempo real como seu bot responderá aos clientes do seu negócio.",
    bullets: ["Respostas em menos de 2 segundos", "IA real — não respostas gravadas", "Personalizável com o tom da sua marca", "Funciona em web, WhatsApp e Instagram"],
    cta1: "Criar meu bot grátis →", cta2: "Ver preços", noCard: "Sem cartão de crédito · Cancele quando quiser",
  },
  services: {
    label: "Serviços adicionais", title: "Leve seu NexoBot ao próximo nível",
    subtitle: "Configurações profissionais, personalização avançada e integrações sob medida. Pagamento único.",
    badge: "Pagamento único", cta: "Comprar agora",
    items: [
      { title: "Personalização avançada",      desc: "Faça seu bot falar como sua marca",           features: ["Ajustes personalizados", "Respostas adaptadas ao seu negócio", "Otimização do fluxo conversacional"] },
      { title: "Automações avançadas",         desc: "Transforme seu bot em uma máquina de vendas", features: ["Fluxos inteligentes personalizados", "Segmentação avançada", "Funis automatizados"] },
      { title: "Integração de sistemas externos", desc: "Conecte seu bot ao seu ecossistema",        features: ["Integração com CRM", "Conexão com APIs externas", "Sincronização de dados"] },
    ],
  },
  testimonials: {
    label: "Depoimentos", title: "O que nossos clientes dizem", subtitle: "Empresas reais, resultados reais.",
    items: [
      { name: "Maria Lopez",      role: "Loja online de acessórios", quote: "NexoBot responde meus clientes mesmo enquanto durmo. No primeiro mês minhas vendas subiram 40% sem investir mais tempo." },
      { name: "Carlos Fernandez", role: "Serviços profissionais",    quote: "A integração com WhatsApp foi rapidíssima. Agora tenho um fluxo de vendas automatizado que atende todos os meus prospects." },
      { name: "Ana Rodriguez",    role: "Empreendedora digital",     quote: "O suporte é excelente. Me ajudaram a personalizar meu bot e agora ele atende mais de 300 consultas por dia sem perder qualidade." },
    ],
  },
  faq: {
    label: "FAQ", title: "Perguntas frequentes", subtitle: "Respondemos suas dúvidas para você começar com total confiança.",
    items: [
      { q: "Preciso de conhecimento técnico para usar NexoBot?", a: "Não. NexoBot é projetado para que qualquer pessoa possa configurá-lo em minutos sem conhecimento técnico." },
      { q: "Posso usar NexoBot no WhatsApp?",                    a: "Sim. Os planos Pro e Premium incluem integração com WhatsApp para automatizar suas conversas e vendas." },
      { q: "O que acontece se eu ultrapassar o limite de mensagens?", a: "Avisaremos antes de atingir o limite. Você pode atualizar seu plano a qualquer momento sem interrupções." },
      { q: "Posso cancelar quando quiser?",                      a: "Sim. Sem contratos ou permanências. Cancele sua assinatura quando quiser pelo painel de controle." },
      { q: "Oferecem suporte?",                                  a: "Todos os planos incluem suporte. O plano Premium conta com suporte prioritário para respostas mais rápidas." },
      { q: "Posso integrar NexoBot ao meu site?",                a: "Sim. Todos os planos incluem um widget fácil de instalar para conectar NexoBot ao seu site em minutos." },
    ],
  },
  cta: {
    title: "Automatize seu negócio hoje", titleHighlight: "com NexoBot",
    subtitle: "Responda clientes, gere vendas e escale seu negócio 24/7 com seu assistente inteligente.",
    button: "Começar grátis →", noCard: "Sem cartão de crédito · Cancele quando quiser",
  },
  footer: { copyright: "© {year} NexoBot — Todos os direitos reservados.", pricing: "Preços", faq: "FAQ", features: "Funcionalidades", login: "Entrar", privacy: "Privacidade", terms: "Termos" },
};

// ── ARABIC (RTL) ──────────────────────────────────────────────────────────────
export const ar: LandingT = {
  nav: { features: "المميزات", pricing: "الأسعار", faq: "الأسئلة الشائعة", login: "تسجيل الدخول", cta: "← ابدأ مجانًا" },
  hero: {
    badge: "أكثر من 500 شركة تثق في NexoBot",
    h1: "أتمتة مبيعاتك ودعم عملائك مع NexoBot",
    subtitle: "مساعدك الذكي بالذكاء الاصطناعي الذي يرد على العملاء ويولّد المبيعات ويعمل لأجلك 24/7. وفّر الوقت، وزِد الإيرادات، واتسع بسهولة.",
    cta1: "← ابدأ مجانًا", cta2: "شاهد كيف يعمل", noCard: "بدون بطاقة ائتمان · ألغِ في أي وقت",
    stats: [
      { value: "+500", label: "شركة نشطة" },
      { value: "24/7", label: "متاح دائمًا" },
      { value: "40%",  label: "+ متوسط المبيعات" },
    ],
    chatOnline: "متاح الآن",
    chatMsg1: "مرحبًا! كيف يمكنني مساعدتك اليوم؟ 👋",
    chatMsg2: "أريد معلومات عن خططكم",
    chatMsg3: "بالطبع! لدينا 3 خطط تبدأ من 14$/شهر. أيها يناسب عملك؟ 🚀",
    chatPlaceholder: "اكتب رسالة...",
    chatBadge1: "✓ رد في ثانية واحدة", chatBadge2: "🔥 +40% مبيعات",
  },
  trust: "متوافق مع أدواتك المفضلة",
  features: {
    label: "المميزات", title: "كل ما تحتاجه للأتمتة",
    subtitle: "NexoBot يجمع الذكاء الاصطناعي والأتمتة والتعدد القنوات لخدمة المزيد من العملاء وزيادة المبيعات — بكل سهولة.",
    items: [
      { title: "يرد في ثوانٍ",           desc: "يتعامل الروبوت مع العملاء تلقائيًا على مدار الساعة، بدون تأخير." },
      { title: "اربط قنواتك",             desc: "واتساب، الويب، وسائل التواصل الاجتماعي أو CRM. NexoBot يتكامل بسهولة مع منظومتك." },
      { title: "ولّد المزيد من المبيعات", desc: "تدفقات ذكية وقمع مبيعات مؤتمت وتجزئة لتحويل المزيد من العملاء." },
    ],
  },
  howItWorks: {
    label: "العملية", title: "جاهز في 3 خطوات", subtitle: "أعدّ مساعدك الذكي في دقائق وابدأ البيع.",
    steps: [
      { title: "أعدّ الروبوت الخاص بك",  desc: "خصّص الردود وحدّد نبرة علامتك التجارية واضبط منطق المساعد وفق احتياجاتك." },
      { title: "اربط قنواتك",             desc: "واتساب، الويب أو CRM. NexoBot يجمع كل تواصلك في مكان واحد." },
      { title: "أتمتة وتوسّع",            desc: "يخدم الروبوت العملاء ويلتقط العملاء المحتملين ويولّد المبيعات تلقائيًا." },
    ],
  },
  demo: {
    label: "عرض مباشر", title: "تحدّث مع NexoBot", titleHighlight: "الآن",
    subtitle: "لا حاجة لإنشاء حساب. جرّب في الوقت الفعلي كيف سيرد الروبوت على عملاء عملك.",
    bullets: ["ردود في أقل من ثانيتين", "ذكاء اصطناعي حقيقي — لا ردود مسجلة مسبقًا", "قابل للتخصيص بنبرة علامتك التجارية", "يعمل على الويب وواتساب وإنستغرام"],
    cta1: "← أنشئ روبوتي مجانًا", cta2: "عرض الأسعار", noCard: "بدون بطاقة ائتمان · ألغِ في أي وقت",
  },
  services: {
    label: "خدمات إضافية", title: "ارفع NexoBot للمستوى التالي",
    subtitle: "إعدادات احترافية وتخصيص متقدم وتكاملات مخصصة. دفعة واحدة.",
    badge: "دفعة واحدة", cta: "اشترِ الآن",
    items: [
      { title: "تخصيص متقدم",               desc: "اجعل روبوتك يتحدث بأسلوب علامتك التجارية",  features: ["تعديلات مخصصة", "ردود مكيّفة لعملك", "تحسين تدفق المحادثة"] },
      { title: "أتمتة متقدمة",              desc: "حوّل روبوتك إلى آلة مبيعات",                features: ["تدفقات ذكية مخصصة", "تجزئة متقدمة", "قمع مبيعات مؤتمت"] },
      { title: "تكامل الأنظمة الخارجية",   desc: "اربط روبوتك بمنظومتك",                      features: ["تكامل مع CRM", "اتصال بـ APIs خارجية", "مزامنة البيانات"] },
    ],
  },
  testimonials: {
    label: "شهادات العملاء", title: "ماذا يقول عملاؤنا", subtitle: "شركات حقيقية، نتائج حقيقية.",
    items: [
      { name: "Maria Lopez",      role: "متجر إكسسوارات إلكتروني", quote: "NexoBot يرد على عملائي حتى أثناء نومي. في الشهر الأول ارتفعت مبيعاتي 40% دون بذل جهد إضافي." },
      { name: "Carlos Fernandez", role: "خدمات مهنية",              quote: "كان التكامل مع واتساب سريعًا للغاية. أصبح لديّ الآن تدفق مبيعات مؤتمت يتعامل مع جميع عملائي المحتملين." },
      { name: "Ana Rodriguez",    role: "رائدة أعمال رقمية",        quote: "الدعم ممتاز. ساعدوني في تخصيص الروبوت وأصبح يتعامل مع أكثر من 300 استفسار يوميًا دون فقدان الجودة." },
    ],
  },
  faq: {
    label: "الأسئلة الشائعة", title: "أسئلة شائعة", subtitle: "نجيب على تساؤلاتك لتبدأ بكل ثقة.",
    items: [
      { q: "هل أحتاج خبرة تقنية لاستخدام NexoBot؟",           a: "لا. NexoBot مصمم ليتمكن أي شخص من إعداده في دقائق بدون معرفة تقنية." },
      { q: "هل يمكنني استخدام NexoBot على واتساب؟",             a: "نعم. تشمل خطتا Pro وPremium تكاملًا مع واتساب لأتمتة محادثاتك ومبيعاتك." },
      { q: "ماذا يحدث إذا تجاوزت حد الرسائل؟",                a: "سنخطرك قبل الوصول إلى الحد. يمكنك ترقية خطتك في أي وقت دون انقطاع." },
      { q: "هل يمكنني الإلغاء في أي وقت؟",                     a: "نعم. بدون عقود أو التزامات. ألغِ اشتراكك متى تشاء من لوحة التحكم." },
      { q: "هل تقدمون دعمًا فنيًا؟",                           a: "جميع الخطط تشمل الدعم. خطة Premium تتميز بدعم ذي أولوية للردود الأسرع." },
      { q: "هل يمكنني دمج NexoBot مع موقعي الإلكتروني؟",      a: "نعم. جميع الخطط تشمل أداة تضمين سهلة التثبيت لربط NexoBot بموقعك في دقائق." },
    ],
  },
  cta: {
    title: "أتمتة عملك اليوم", titleHighlight: "مع NexoBot",
    subtitle: "رد على العملاء وولّد المبيعات وانمّ عملك على مدار الساعة مع مساعدك الذكي.",
    button: "← ابدأ مجانًا", noCard: "بدون بطاقة ائتمان · ألغِ في أي وقت",
  },
  footer: { copyright: "© {year} NexoBot — جميع الحقوق محفوظة.", pricing: "الأسعار", faq: "الأسئلة الشائعة", features: "المميزات", login: "تسجيل الدخول", privacy: "الخصوصية", terms: "الشروط" },
};

// ── 中文 (简体) ───────────────────────────────────────────────────────────────
export const zh: LandingT = {
  nav: { features: "功能", pricing: "价格", faq: "常见问题", login: "登录", cta: "免费开始 →" },
  hero: {
    badge: "超过500家企业信赖NexoBot",
    h1: "用NexoBot自动化您的销售和客户支持",
    subtitle: "您的AI助手全天候回复客户、创造销售、为您工作。节省时间，增加收入，轻松扩展。",
    cta1: "免费开始 →", cta2: "了解工作原理", noCard: "无需信用卡 · 随时取消",
    stats: [
      { value: "500+", label: "活跃企业" },
      { value: "24/7", label: "全天候在线" },
      { value: "40%",  label: "平均销售增长" },
    ],
    chatOnline: "现在在线",
    chatMsg1: "您好！今天我能帮您什么？ 👋",
    chatMsg2: "我想了解你们的套餐",
    chatMsg3: "当然！我们有3个套餐，月费低至14美元。哪个适合您的业务？ 🚀",
    chatPlaceholder: "输入消息...",
    chatBadge1: "✓ 1秒内回复", chatBadge2: "🔥 +40% 销售额",
  },
  trust: "兼容您喜爱的工具",
  features: {
    label: "功能", title: "自动化所需的一切",
    subtitle: "NexoBot结合AI、自动化和多渠道，轻松服务更多客户、销售更多产品。",
    items: [
      { title: "秒速回复",         desc: "您的机器人全天候自动服务客户，无延迟、无等待。" },
      { title: "连接您的渠道",     desc: "WhatsApp、网页、社交媒体或CRM。NexoBot轻松与您的生态系统集成。" },
      { title: "创造更多销售",     desc: "智能流程、自动化漏斗和细分，转化更多客户。" },
    ],
  },
  howItWorks: {
    label: "流程", title: "3步即可就绪", subtitle: "几分钟内配置您的智能助手，开始销售。",
    steps: [
      { title: "配置您的机器人",   desc: "自定义回复，定义品牌语气，根据您的需求调整助手逻辑。" },
      { title: "连接您的渠道",     desc: "WhatsApp、网页或CRM。NexoBot将您的所有沟通集中在一处。" },
      { title: "自动化并扩展",     desc: "您的机器人自动服务客户、捕获潜在客户并创造销售。" },
    ],
  },
  demo: {
    label: "现场演示", title: "与NexoBot交流", titleHighlight: "立即体验",
    subtitle: "无需注册账户。实时测试您的机器人如何回应客户。",
    bullets: ["2秒内响应", "真正的AI — 非预设回复", "可根据品牌语气定制", "支持网页、WhatsApp和Instagram"],
    cta1: "免费创建我的机器人 →", cta2: "查看价格", noCard: "无需信用卡 · 随时取消",
  },
  services: {
    label: "附加服务", title: "将您的NexoBot提升到新水平",
    subtitle: "专业配置、高级定制和量身定制的集成。一次性付款。",
    badge: "一次性付款", cta: "立即购买",
    items: [
      { title: "高级定制",       desc: "让您的机器人用品牌的声音说话",     features: ["个性化调整", "适应您业务的回复", "对话流程优化"] },
      { title: "高级自动化",     desc: "将您的机器人变成销售机器",         features: ["定制智能流程", "高级细分", "自动化漏斗"] },
      { title: "外部系统集成",   desc: "将您的机器人与生态系统连接",       features: ["CRM集成", "外部API连接", "数据同步"] },
    ],
  },
  testimonials: {
    label: "客户评价", title: "我们的客户怎么说", subtitle: "真实企业，真实结果。",
    items: [
      { name: "Maria Lopez",      role: "配饰在线商店", quote: "即使在我睡觉时，NexoBot也在回复我的客户。第一个月我的销售额增长了40%，无需额外投入时间。" },
      { name: "Carlos Fernandez", role: "专业服务",     quote: "WhatsApp集成速度极快。现在我有了一个自动化销售流程，无需我在场就能处理所有潜在客户。" },
      { name: "Ana Rodriguez",    role: "数字创业者",   quote: "支持非常出色。他们帮我定制了机器人，现在每天处理超过300个咨询，质量丝毫不减。" },
    ],
  },
  faq: {
    label: "常见问题", title: "常见问题解答", subtitle: "我们解答您的疑虑，让您满怀信心地开始。",
    items: [
      { q: "使用NexoBot需要技术知识吗？",    a: "不需要。NexoBot专为任何人设计，无需技术知识，几分钟即可完成配置。" },
      { q: "我可以在WhatsApp上使用NexoBot吗？", a: "可以。Pro和Premium套餐包含WhatsApp集成，以自动化您的对话和销售。" },
      { q: "超过消息限制会怎样？",            a: "我们会在您达到限制之前通知您。您可以随时升级套餐，不会中断服务。" },
      { q: "我可以随时取消吗？",              a: "可以。无合同或约束。随时从控制面板取消订阅。" },
      { q: "是否提供支持？",                  a: "所有套餐均包含支持。Premium套餐提供优先支持，响应更快。" },
      { q: "我可以将NexoBot集成到我的网站吗？", a: "可以。所有套餐均包含易于安装的插件，几分钟内即可将NexoBot连接到您的网站。" },
    ],
  },
  cta: {
    title: "今天就自动化您的业务", titleHighlight: "与NexoBot",
    subtitle: "全天候回复客户、创造销售，用您的智能助手扩展业务。",
    button: "免费开始 →", noCard: "无需信用卡 · 随时取消",
  },
  footer: { copyright: "© {year} NexoBot — 保留所有权利。", pricing: "价格", faq: "常见问题", features: "功能", login: "登录", privacy: "隐私政策", terms: "服务条款" },
};
