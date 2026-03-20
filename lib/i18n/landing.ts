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
  pricingSection: {
    label: string; title: string; subtitle: string;
    monthly: string; annual: string; saveBadge: string;
    perMonth: string; perYear: string;
    mostPopular: string; comingSoon: string;
    plans: [
      { desc: string; features: string[]; excluded: string[]; cta: string },
      { desc: string; features: string[]; excluded: string[]; cta: string },
      { desc: string; features: string[]; excluded: string[]; cta: string },
      { desc: string; features: string[]; excluded: string[]; cta: string }
    ];
  };
}

// ── ESPAÑOL (raíz) ──────────────────────────────────────────────────────────
export const es: LandingT = {
  nav: { features: "Características", pricing: "Precios", faq: "FAQ", login: "Iniciar sesión", cta: "Empezar gratis →" },
  hero: {
    badge: "Más de 500 negocios confían en NexoBot",
    h1: "Tu negocio responde solo, por WhatsApp, las 24 horas",
    subtitle: "NexoBot atiende a tus clientes por WhatsApp automáticamente — agenda citas, responde preguntas y cierra ventas mientras tú duermes.",
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
      { title: "WhatsApp Business integrado", desc: "Tus clientes escriben donde ya están. El bot responde en segundos con info real de tu negocio." },
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
      { q: "¿Puedo usar NexoBot en WhatsApp?",                      a: "Sí. Todos los planes de pago (Starter, Pro y Business) incluyen WhatsApp Business para automatizar tus conversaciones y ventas." },
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
  pricingSection: {
    label: "Precios", title: "Planes diseñados para crecer contigo",
    subtitle: "Elige el plan ideal para tu negocio y empieza a automatizar ventas y atención al cliente.",
    monthly: "Mensual", annual: "Anual", saveBadge: "2 meses gratis",
    perMonth: "/mes", perYear: "/año · 2 meses gratis",
    mostPopular: "⭐ MÁS POPULAR", comingSoon: "Plan anual próximamente",
    plans: [
      { desc: "Para explorar NexoBot sin costo", features: ["1 bot", "100 mensajes/mes", "Chat web", "Panel de control"], excluded: ["WhatsApp no incluido"], cta: "Empezar gratis" },
      { desc: "Para negocios que empiezan a crecer", features: ["2 bots", "1.000 mensajes/mes", "Chat web", "WhatsApp Business", "Soporte por email"], excluded: [], cta: "Elegir Starter" },
      { desc: "Para negocios en plena expansión", features: ["5 bots", "5.000 mensajes/mes", "Chat web + WhatsApp Business", "Inventario en tiempo real", "Agendamiento automático", "Soporte prioritario"], excluded: [], cta: "Elegir Pro" },
      { desc: "Para empresas que necesitan el máximo", features: ["Bots ilimitados", "Mensajes ilimitados", "Todo lo del Pro", "Agente AI dedicado", "Soporte dedicado"], excluded: [], cta: "Elegir Business" },
    ],
  },
};

// ── ENGLISH ─────────────────────────────────────────────────────────────────
export const en: LandingT = {
  nav: { features: "Features", pricing: "Pricing", faq: "FAQ", login: "Sign in", cta: "Get started free →" },
  hero: {
    badge: "500+ businesses trust NexoBot",
    h1: "Your business responds on its own, on WhatsApp, 24 hours a day",
    subtitle: "NexoBot automatically handles your customers on WhatsApp — schedules appointments, answers questions, and closes sales while you sleep.",
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
      { title: "WhatsApp Business integrated", desc: "Your customers write where they already are. The bot replies in seconds with real info about your business." },
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
      { q: "Can I use NexoBot on WhatsApp?",                a: "Yes. All paid plans (Starter, Pro and Business) include WhatsApp Business to automate your conversations and sales." },
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
  pricingSection: {
    label: "Pricing", title: "Plans designed to grow with you",
    subtitle: "Choose the perfect plan for your business and start automating sales and customer support.",
    monthly: "Monthly", annual: "Annual", saveBadge: "2 months free",
    perMonth: "/mo", perYear: "/year · 2 months free",
    mostPopular: "⭐ MOST POPULAR", comingSoon: "Annual plan coming soon",
    plans: [
      { desc: "Start for free, no card needed", features: ["1 bot", "100 messages/month", "Web chat", "Control panel"], excluded: ["WhatsApp not included"], cta: "Start for free" },
      { desc: "For businesses starting to grow", features: ["2 bots", "1,000 messages/month", "Web chat", "WhatsApp Business", "Email support"], excluded: [], cta: "Choose Starter" },
      { desc: "For businesses scaling up", features: ["5 bots", "5,000 messages/month", "Web chat + WhatsApp Business", "Real-time inventory", "Automatic scheduling", "Priority support"], excluded: [], cta: "Choose Pro" },
      { desc: "For companies that need maximum power", features: ["Unlimited bots", "Unlimited messages", "Everything in Pro", "Dedicated AI agent", "Dedicated support"], excluded: [], cta: "Choose Business" },
    ],
  },
};

// ── ITALIANO ─────────────────────────────────────────────────────────────────
export const it: LandingT = {
  nav: { features: "Funzionalità", pricing: "Prezzi", faq: "FAQ", login: "Accedi", cta: "Inizia gratis →" },
  hero: {
    badge: "Oltre 500 aziende si fidano di NexoBot",
    h1: "Il tuo business risponde da solo, su WhatsApp, 24 ore su 24",
    subtitle: "NexoBot gestisce automaticamente i tuoi clienti su WhatsApp — fissa appuntamenti, risponde a domande e chiude vendite mentre dormi.",
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
      { title: "WhatsApp Business integrato", desc: "I tuoi clienti scrivono dove già sono. Il bot risponde in secondi con informazioni reali del tuo business." },
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
      { q: "Posso usare NexoBot su WhatsApp?",                     a: "Sì. Tutti i piani a pagamento (Starter, Pro e Business) includono WhatsApp Business per automatizzare conversazioni e vendite." },
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
  pricingSection: {
    label: "Prezzi", title: "Piani progettati per crescere con te",
    subtitle: "Scegli il piano ideale per la tua attività e inizia ad automatizzare vendite e assistenza clienti.",
    monthly: "Mensile", annual: "Annuale", saveBadge: "2 mesi gratis",
    perMonth: "/mese", perYear: "/anno · 2 mesi gratis",
    mostPopular: "⭐ PIÙ POPOLARE", comingSoon: "Piano annuale in arrivo",
    plans: [
      { desc: "Per provare NexoBot senza costo", features: ["1 bot", "100 messaggi/mese", "Chat web", "Pannello di controllo"], excluded: ["WhatsApp non incluso"], cta: "Inizia gratis" },
      { desc: "Per aziende che iniziano a crescere", features: ["2 bot", "1.000 messaggi/mese", "Chat web", "WhatsApp Business", "Supporto email"], excluded: [], cta: "Scegli Starter" },
      { desc: "Per aziende in espansione", features: ["5 bot", "5.000 messaggi/mese", "Chat web + WhatsApp Business", "Inventario in tempo reale", "Appuntamenti automatici", "Supporto prioritario"], excluded: [], cta: "Scegli Pro" },
      { desc: "Per aziende che hanno bisogno del massimo", features: ["Bot illimitati", "Messaggi illimitati", "Tutto di Pro", "Agente AI dedicato", "Supporto dedicato"], excluded: [], cta: "Scegli Business" },
    ],
  },
};

// ── FRANÇAIS ─────────────────────────────────────────────────────────────────
export const fr: LandingT = {
  nav: { features: "Fonctionnalités", pricing: "Tarifs", faq: "FAQ", login: "Se connecter", cta: "Commencer gratuitement →" },
  hero: {
    badge: "Plus de 500 entreprises font confiance à NexoBot",
    h1: "Votre entreprise répond seule, sur WhatsApp, 24h/24",
    subtitle: "NexoBot gère automatiquement vos clients sur WhatsApp — planifie des rendez-vous, répond aux questions et conclut des ventes pendant que vous dormez.",
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
      { title: "WhatsApp Business intégré", desc: "Vos clients écrivent là où ils se trouvent déjà. Le bot répond en quelques secondes avec des infos réelles sur votre entreprise." },
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
      { q: "Puis-je utiliser NexoBot sur WhatsApp ?",                         a: "Oui. Tous les plans payants (Starter, Pro et Business) incluent WhatsApp Business pour automatiser vos conversations et vos ventes." },
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
  pricingSection: {
    label: "Tarifs", title: "Des forfaits conçus pour grandir avec vous",
    subtitle: "Choisissez le forfait idéal pour votre entreprise et commencez à automatiser ventes et support client.",
    monthly: "Mensuel", annual: "Annuel", saveBadge: "2 mois offerts",
    perMonth: "/mois", perYear: "/an · 2 mois offerts",
    mostPopular: "⭐ LE PLUS POPULAIRE", comingSoon: "Forfait annuel bientôt disponible",
    plans: [
      { desc: "Pour commencer sans frais", features: ["1 bot", "100 messages/mois", "Chat web", "Tableau de bord"], excluded: ["WhatsApp non inclus"], cta: "Commencer gratuitement" },
      { desc: "Pour les entreprises qui commencent à croître", features: ["2 bots", "1 000 messages/mois", "Chat web", "WhatsApp Business", "Support par email"], excluded: [], cta: "Choisir Starter" },
      { desc: "Pour les entreprises en pleine expansion", features: ["5 bots", "5 000 messages/mois", "Chat web + WhatsApp Business", "Inventaire en temps réel", "Prise de rendez-vous automatique", "Support prioritaire"], excluded: [], cta: "Choisir Pro" },
      { desc: "Pour les entreprises qui ont besoin du maximum", features: ["Bots illimités", "Messages illimités", "Tout de Pro", "Agent IA dédié", "Support dédié"], excluded: [], cta: "Choisir Business" },
    ],
  },
};

// ── DEUTSCH ──────────────────────────────────────────────────────────────────
export const de: LandingT = {
  nav: { features: "Funktionen", pricing: "Preise", faq: "FAQ", login: "Anmelden", cta: "Kostenlos starten →" },
  hero: {
    badge: "Über 500 Unternehmen vertrauen NexoBot",
    h1: "Dein Unternehmen antwortet automatisch, über WhatsApp, rund um die Uhr",
    subtitle: "NexoBot betreut deine Kunden automatisch über WhatsApp — vereinbart Termine, beantwortet Fragen und schließt Verkäufe ab, während du schläfst.",
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
      { title: "WhatsApp Business integriert", desc: "Deine Kunden schreiben dort, wo sie bereits sind. Der Bot antwortet in Sekunden mit echten Infos über dein Unternehmen." },
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
      { q: "Kann ich NexoBot auf WhatsApp nutzen?",                     a: "Ja. Alle kostenpflichtigen Pläne (Starter, Pro und Business) beinhalten WhatsApp Business zur Automatisierung deiner Gespräche und Verkäufe." },
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
  pricingSection: {
    label: "Preise", title: "Pläne, die mit Ihnen wachsen",
    subtitle: "Wählen Sie den idealen Plan für Ihr Unternehmen und automatisieren Sie Verkäufe und Kundensupport.",
    monthly: "Monatlich", annual: "Jährlich", saveBadge: "2 Monate gratis",
    perMonth: "/Monat", perYear: "/Jahr · 2 Monate gratis",
    mostPopular: "⭐ AM BELIEBTESTEN", comingSoon: "Jahresplan demnächst verfügbar",
    plans: [
      { desc: "Kostenlos starten", features: ["1 Bot", "100 Nachrichten/Monat", "Web-Chat", "Kontrollpanel"], excluded: ["WhatsApp nicht enthalten"], cta: "Kostenlos starten" },
      { desc: "Für Unternehmen, die wachsen möchten", features: ["2 Bots", "1.000 Nachrichten/Monat", "Web-Chat", "WhatsApp Business", "E-Mail-Support"], excluded: [], cta: "Starter wählen" },
      { desc: "Für expandierende Unternehmen", features: ["5 Bots", "5.000 Nachrichten/Monat", "Web-Chat + WhatsApp Business", "Echtzeit-Inventar", "Automatische Terminplanung", "Prioritätssupport"], excluded: [], cta: "Pro wählen" },
      { desc: "Für Unternehmen, die maximale Leistung benötigen", features: ["Unbegrenzte Bots", "Unbegrenzte Nachrichten", "Alles aus Pro", "Dedizierter KI-Agent", "Dedizierter Support"], excluded: [], cta: "Business wählen" },
    ],
  },
};

// ── PORTUGUÊS ─────────────────────────────────────────────────────────────────
export const pt: LandingT = {
  nav: { features: "Funcionalidades", pricing: "Preços", faq: "FAQ", login: "Entrar", cta: "Começar grátis →" },
  hero: {
    badge: "Mais de 500 empresas confiam no NexoBot",
    h1: "Seu negócio responde sozinho, pelo WhatsApp, 24 horas por dia",
    subtitle: "NexoBot atende seus clientes pelo WhatsApp automaticamente — agenda compromissos, responde perguntas e fecha vendas enquanto você dorme.",
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
      { title: "WhatsApp Business integrado", desc: "Seus clientes escrevem onde já estão. O bot responde em segundos com informações reais do seu negócio." },
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
      { q: "Posso usar NexoBot no WhatsApp?",                    a: "Sim. Todos os planos pagos (Starter, Pro e Business) incluem WhatsApp Business para automatizar suas conversas e vendas." },
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
  pricingSection: {
    label: "Preços", title: "Planos criados para crescer com você",
    subtitle: "Escolha o plano ideal para o seu negócio e comece a automatizar vendas e atendimento ao cliente.",
    monthly: "Mensal", annual: "Anual", saveBadge: "2 meses grátis",
    perMonth: "/mês", perYear: "/ano · 2 meses grátis",
    mostPopular: "⭐ MAIS POPULAR", comingSoon: "Plano anual em breve",
    plans: [
      { desc: "Para começar sem custo", features: ["1 bot", "100 mensagens/mês", "Chat web", "Painel de controle"], excluded: ["WhatsApp não incluído"], cta: "Começar grátis" },
      { desc: "Para negócios que estão crescendo", features: ["2 bots", "1.000 mensagens/mês", "Chat web", "WhatsApp Business", "Suporte por email"], excluded: [], cta: "Escolher Starter" },
      { desc: "Para negócios em expansão", features: ["5 bots", "5.000 mensagens/mês", "Chat web + WhatsApp Business", "Inventário em tempo real", "Agendamento automático", "Suporte prioritário"], excluded: [], cta: "Escolher Pro" },
      { desc: "Para empresas que precisam do máximo", features: ["Bots ilimitados", "Mensagens ilimitadas", "Tudo do Pro", "Agente IA dedicado", "Suporte dedicado"], excluded: [], cta: "Escolher Business" },
    ],
  },
};

// ── ARABIC (RTL) ──────────────────────────────────────────────────────────────
export const ar: LandingT = {
  nav: { features: "المميزات", pricing: "الأسعار", faq: "الأسئلة الشائعة", login: "تسجيل الدخول", cta: "← ابدأ مجانًا" },
  hero: {
    badge: "أكثر من 500 شركة تثق في NexoBot",
    h1: "عملك يرد تلقائيًا، عبر واتساب، على مدار الساعة",
    subtitle: "NexoBot يخدم عملاءك عبر واتساب تلقائيًا — يحدد المواعيد، ويجيب على الأسئلة، ويُتم الصفقات بينما أنت نائم.",
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
      { title: "WhatsApp Business مدمج",   desc: "عملاؤك يكتبون من حيث هم. الروبوت يرد في ثوانٍ بمعلومات حقيقية عن عملك." },
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
      { q: "هل يمكنني استخدام NexoBot على واتساب؟",             a: "نعم. جميع الخطط المدفوعة (Starter وPro وBusiness) تشمل واتساب بيزنس لأتمتة محادثاتك ومبيعاتك." },
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
  pricingSection: {
    label: "الأسعار", title: "خطط مصممة للنمو معك",
    subtitle: "اختر الخطة المثالية لعملك وابدأ في أتمتة المبيعات ودعم العملاء.",
    monthly: "شهري", annual: "سنوي", saveBadge: "شهران مجانان",
    perMonth: "/شهر", perYear: "/سنة · شهران مجانان",
    mostPopular: "⭐ الأكثر شعبية", comingSoon: "الخطة السنوية قريباً",
    plans: [
      { desc: "للبدء بدون تكلفة", features: ["1 بوت", "100 رسالة/شهر", "دردشة ويب", "لوحة تحكم"], excluded: ["واتساب غير مشمول"], cta: "← ابدأ مجانًا" },
      { desc: "للشركات التي تبدأ في النمو", features: ["2 بوت", "1,000 رسالة/شهر", "دردشة ويب", "واتساب بيزنس", "دعم عبر البريد الإلكتروني"], excluded: [], cta: "اختر Starter" },
      { desc: "للشركات في مرحلة التوسع", features: ["5 بوت", "5,000 رسالة/شهر", "دردشة ويب + واتساب بيزنس", "مخزون في الوقت الفعلي", "جدولة تلقائية", "دعم ذو أولوية"], excluded: [], cta: "اختر Pro" },
      { desc: "للشركات التي تحتاج إلى أقصى قدرة", features: ["بوتات غير محدودة", "رسائل غير محدودة", "كل شيء في Pro", "وكيل AI مخصص", "دعم مخصص"], excluded: [], cta: "اختر Business" },
    ],
  },
};

// ── 中文 (简体) ───────────────────────────────────────────────────────────────
export const zh: LandingT = {
  nav: { features: "功能", pricing: "价格", faq: "常见问题", login: "登录", cta: "免费开始 →" },
  hero: {
    badge: "超过500家企业信赖NexoBot",
    h1: "您的业务通过WhatsApp全天候自动回复",
    subtitle: "NexoBot自动通过WhatsApp服务您的客户 — 预约预定、回答问题、促成交易，而您只需安心休息。",
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
      { title: "WhatsApp Business 集成", desc: "您的客户在他们常用的地方发消息。机器人在几秒内用您业务的真实信息回复。" },
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
      { q: "我可以在WhatsApp上使用NexoBot吗？", a: "可以。所有付费套餐（Starter、Pro和Business）均包含WhatsApp Business，以自动化您的对话和销售。" },
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
  pricingSection: {
    label: "价格", title: "专为与您共同成长而设计的方案",
    subtitle: "选择适合您业务的最佳方案，开始自动化销售和客户支持。",
    monthly: "月付", annual: "年付", saveBadge: "免费2个月",
    perMonth: "/月", perYear: "/年 · 免费2个月",
    mostPopular: "⭐ 最受欢迎", comingSoon: "年付方案即将推出",
    plans: [
      { desc: "免费开始体验", features: ["1个机器人", "100条消息/月", "网站聊天", "控制面板"], excluded: ["不含WhatsApp"], cta: "免费开始" },
      { desc: "适合刚起步的企业", features: ["2个机器人", "1,000条消息/月", "网站聊天", "WhatsApp Business", "邮件支持"], excluded: [], cta: "选择Starter" },
      { desc: "适合快速成长的企业", features: ["5个机器人", "5,000条消息/月", "网站聊天 + WhatsApp Business", "实时库存", "自动预约", "优先支持"], excluded: [], cta: "选择Pro" },
      { desc: "适合需要最大能力的企业", features: ["无限机器人", "无限消息", "包含Pro所有功能", "专属AI代理", "专属支持"], excluded: [], cta: "选择Business" },
    ],
  },
};

// ── 日本語 ────────────────────────────────────────────────────────────────────
export const ja: LandingT = {
  nav: { features: "機能", pricing: "料金", faq: "よくある質問", login: "ログイン", cta: "無料で始める →" },
  hero: {
    badge: "500社以上がNexoBotを信頼",
    h1: "あなたのビジネスがWhatsAppで24時間自動応答",
    subtitle: "NexoBotがWhatsAppであなたの顧客を自動対応 — 予約を調整し、質問に答え、あなたが眠っている間に販売を成立させます。",
    cta1: "無料で始める →", cta2: "仕組みを見る", noCard: "クレジットカード不要 · いつでもキャンセル可",
    stats: [
      { value: "500+", label: "稼働中の企業" },
      { value: "24/7", label: "稼働時間" },
      { value: "40%",  label: "平均売上増加" },
    ],
    chatOnline: "オンライン中",
    chatMsg1: "こんにちは！今日はどのようにお役に立てますか？👋",
    chatMsg2: "プランについて知りたいです",
    chatMsg3: "もちろんです！月$14からの3つのプランをご用意しています。あなたのビジネスに合うのはどれですか？🚀",
    chatPlaceholder: "メッセージを入力...",
    chatBadge1: "✓ 1秒以内に返信", chatBadge2: "🔥 +40%の売上",
  },
  trust: "お気に入りのツールと連携",
  features: {
    label: "機能", title: "自動化に必要なすべて",
    subtitle: "NexoBotはAI、自動化、マルチチャネルを組み合わせ、より多くの顧客にサービスを提供し、売上を増加させます。",
    items: [
      { title: "数秒で返信",         desc: "ボットが24時間365日自動的に顧客対応。遅延も待ち時間もありません。" },
      { title: "WhatsApp Business 統合", desc: "顧客はすでに使っているアプリでメッセージを送ります。ボットがあなたのビジネスの実際の情報で数秒以内に返信。" },
      { title: "売上を増やす",       desc: "スマートフロー、自動ファネル、セグメンテーションでより多くの顧客をコンバージョン。" },
    ],
  },
  howItWorks: {
    label: "プロセス", title: "3ステップで準備完了", subtitle: "数分でインテリジェントアシスタントをセットアップして販売を開始。",
    steps: [
      { title: "ボットを設定",         desc: "レスポンスをカスタマイズし、ブランドのトーンを定義し、ニーズに合わせてアシスタントを設定。" },
      { title: "チャネルを接続",       desc: "WhatsApp、ウェブ、SNS、CRM。NexoBotがすべてのコミュニケーションを一元管理。" },
      { title: "自動化してスケール",   desc: "ボットが自動的に顧客対応、リード獲得、売上生成を担当。" },
    ],
  },
  demo: {
    label: "ライブデモ", title: "NexoBotと話す", titleHighlight: "今すぐ",
    subtitle: "アカウント不要。ボットが顧客にどう応答するかリアルタイムでテスト。",
    bullets: ["2秒以内に返信", "本物のAI — スクリプト応答ではない", "ブランドトーンでカスタマイズ可能", "ウェブ、WhatsApp、Instagramで動作"],
    cta1: "無料ボットを作成 →", cta2: "料金を見る", noCard: "クレジットカード不要 · いつでもキャンセル可",
  },
  services: {
    label: "アドオン", title: "NexoBotを次のレベルへ",
    subtitle: "プロによるセットアップ、高度なカスタマイズ、カスタム統合。一回払い。",
    badge: "一回払い", cta: "今すぐ購入",
    items: [
      { title: "高度なカスタマイズ",     desc: "ボットをあなたのブランドの声に",     features: ["カスタム調整", "ビジネスに合わせた応答", "会話フローの最適化"] },
      { title: "高度な自動化",           desc: "ボットを販売マシンに変える",         features: ["カスタムスマートフロー", "高度なセグメンテーション", "自動化ファネル"] },
      { title: "外部システム統合",       desc: "ボットをエコシステムに接続",         features: ["CRM統合", "外部API接続", "データ同期"] },
    ],
  },
  testimonials: {
    label: "お客様の声", title: "お客様からの評価", subtitle: "実際のビジネス、実際の結果。",
    items: [
      { name: "Maria Lopez",      role: "オンラインアクセサリーショップ", quote: "NexoBotは私が寝ている間も顧客に返信してくれます。最初の月に40%の売上増加を達成しました。" },
      { name: "Carlos Fernandez", role: "プロフェッショナルサービス",     quote: "WhatsApp統合はあっという間でした。今では自動化された営業フローがすべての見込み客を管理しています。" },
      { name: "Ana Rodriguez",    role: "デジタル起業家",                 quote: "サポートは素晴らしいです。ボットをカスタマイズするのを助けてもらい、今では1日300件以上の問い合わせを処理しています。" },
    ],
  },
  faq: {
    label: "よくある質問", title: "よくある質問", subtitle: "安心してスタートするために必要なすべて。",
    items: [
      { q: "NexoBotを使うのに技術的な知識は必要ですか？",   a: "不要です。NexoBotは誰でも数分でセットアップできるよう設計されています。" },
      { q: "WhatsAppでNexoBotを使えますか？",               a: "はい。すべての有料プラン（Starter、Pro、Business）にWhatsApp Businessが含まれています。" },
      { q: "メッセージ制限を超えるとどうなりますか？",       a: "制限に達する前にお知らせします。いつでもプランをアップグレードできます。" },
      { q: "いつでもキャンセルできますか？",                 a: "はい。契約や縛りはありません。ダッシュボードからいつでもキャンセル可能です。" },
      { q: "サポートはありますか？",                         a: "すべてのプランにサポートが含まれています。Premiumプランは優先サポートです。" },
      { q: "NexoBotをウェブサイトに統合できますか？",        a: "はい。すべてのプランに簡単に設置できるウィジェットが含まれています。" },
    ],
  },
  cta: {
    title: "今日からビジネスを自動化", titleHighlight: "NexoBotで",
    subtitle: "24時間365日、顧客への返信、売上創出、スケールアップをインテリジェントアシスタントで実現。",
    button: "無料で始める →", noCard: "クレジットカード不要 · いつでもキャンセル可",
  },
  footer: { copyright: "© {year} NexoBot — 全著作権所有。", pricing: "料金", faq: "よくある質問", features: "機能", login: "ログイン", privacy: "プライバシーポリシー", terms: "利用規約" },
  pricingSection: {
    label: "料金", title: "あなたと共に成長するプラン",
    subtitle: "あなたのビジネスに最適なプランを選び、販売とカスタマーサポートの自動化を始めましょう。",
    monthly: "月払い", annual: "年払い", saveBadge: "2ヶ月無料",
    perMonth: "/月", perYear: "/年 · 2ヶ月無料",
    mostPopular: "⭐ 最も人気", comingSoon: "年払いプラン近日公開",
    plans: [
      { desc: "無料で始める", features: ["1ボット", "100メッセージ/月", "ウェブチャット", "コントロールパネル"], excluded: ["WhatsApp非対応"], cta: "無料で始める" },
      { desc: "成長を始める企業向け", features: ["2ボット", "月1,000メッセージ", "ウェブチャット", "WhatsApp Business", "メールサポート"], excluded: [], cta: "Starterを選ぶ" },
      { desc: "拡大中の企業向け", features: ["5ボット", "月5,000メッセージ", "ウェブチャット + WhatsApp Business", "リアルタイム在庫", "自動予約", "優先サポート"], excluded: [], cta: "Proを選ぶ" },
      { desc: "最大のパワーが必要な企業向け", features: ["無制限ボット", "無制限メッセージ", "Proの全機能", "専任AIエージェント", "専任サポート"], excluded: [], cta: "Businessを選ぶ" },
    ],
  },
};

// ── РУССКИЙ ───────────────────────────────────────────────────────────────────
export const ru: LandingT = {
  nav: { features: "Возможности", pricing: "Цены", faq: "FAQ", login: "Войти", cta: "Начать бесплатно →" },
  hero: {
    badge: "Более 500 компаний доверяют NexoBot",
    h1: "Ваш бизнес отвечает сам, через WhatsApp, круглосуточно",
    subtitle: "NexoBot автоматически обслуживает ваших клиентов через WhatsApp — назначает встречи, отвечает на вопросы и заключает сделки, пока вы спите.",
    cta1: "Начать бесплатно →", cta2: "Узнать как это работает", noCard: "Без кредитной карты · Отмена в любое время",
    stats: [
      { value: "500+", label: "Активных компаний" },
      { value: "24/7", label: "Доступность" },
      { value: "40%",  label: "Рост продаж" },
    ],
    chatOnline: "Онлайн сейчас",
    chatMsg1: "Привет! Как я могу помочь вам сегодня? 👋",
    chatMsg2: "Хочу узнать о ваших тарифах",
    chatMsg3: "Конечно! У нас есть 3 тарифа от $14/мес. Какой подходит вашему бизнесу? 🚀",
    chatPlaceholder: "Написать сообщение...",
    chatBadge1: "✓ Ответ за 1 сек", chatBadge2: "🔥 +40% продаж",
  },
  trust: "Совместимость с вашими любимыми инструментами",
  features: {
    label: "Возможности", title: "Всё необходимое для автоматизации",
    subtitle: "NexoBot сочетает AI, автоматизацию и многоканальность для обслуживания большего числа клиентов и увеличения продаж.",
    items: [
      { title: "Отвечает за секунды",      desc: "Ваш бот автоматически обслуживает клиентов 24/7 без задержек и ожидания." },
      { title: "WhatsApp Business интегрирован", desc: "Ваши клиенты пишут там, где им удобно. Бот отвечает за секунды с реальной информацией о вашем бизнесе." },
      { title: "Генерируйте больше продаж", desc: "Умные сценарии, автоматические воронки и сегментация для конверсии большего числа клиентов." },
    ],
  },
  howItWorks: {
    label: "Процесс", title: "Готово за 3 шага", subtitle: "Настройте интеллектуального ассистента за несколько минут и начните продавать.",
    steps: [
      { title: "Настройте бота",         desc: "Настройте ответы, определите тон бренда и адаптируйте ассистента под ваши потребности." },
      { title: "Подключите каналы",      desc: "WhatsApp, веб, соцсети или CRM. NexoBot централизует все ваши коммуникации." },
      { title: "Автоматизируйте и расти", desc: "Ваш бот обслуживает клиентов, захватывает лиды и генерирует продажи автоматически." },
    ],
  },
  demo: {
    label: "Живое демо", title: "Поговорите с NexoBot", titleHighlight: "прямо сейчас",
    subtitle: "Аккаунт не нужен. Протестируйте в реальном времени, как ваш бот будет отвечать клиентам.",
    bullets: ["Ответы менее чем за 2 секунды", "Настоящий AI — не заскриптованные ответы", "Настраивается под тон вашего бренда", "Работает в веб, WhatsApp и Instagram"],
    cta1: "Создать бесплатного бота →", cta2: "Посмотреть цены", noCard: "Без кредитной карты · Отмена в любое время",
  },
  services: {
    label: "Дополнения", title: "Выведите NexoBot на новый уровень",
    subtitle: "Профессиональная настройка, расширенная кастомизация и пользовательские интеграции. Единовременная оплата.",
    badge: "Единовременная оплата", cta: "Купить сейчас",
    items: [
      { title: "Расширенная кастомизация", desc: "Сделайте бота голосом вашего бренда",    features: ["Индивидуальные настройки", "Ответы под ваш бизнес", "Оптимизация сценариев"] },
      { title: "Расширенная автоматизация", desc: "Превратите бота в машину продаж",        features: ["Пользовательские умные сценарии", "Расширенная сегментация", "Автоматические воронки"] },
      { title: "Интеграция с системами",    desc: "Подключите бота к вашей экосистеме",     features: ["Интеграция с CRM", "Подключение к внешним API", "Синхронизация данных"] },
    ],
  },
  testimonials: {
    label: "Отзывы", title: "Что говорят наши клиенты", subtitle: "Реальный бизнес, реальные результаты.",
    items: [
      { name: "Maria Lopez",      role: "Интернет-магазин аксессуаров", quote: "NexoBot отвечает моим клиентам даже пока я сплю. Продажи выросли на 40% в первый месяц без лишних усилий." },
      { name: "Carlos Fernandez", role: "Профессиональные услуги",      quote: "Интеграция с WhatsApp была молниеносной. Теперь автоматизированная воронка продаж ведёт всех моих клиентов без моего участия." },
      { name: "Ana Rodriguez",    role: "Цифровой предприниматель",     quote: "Поддержка отличная. Помогли настроить бота, и теперь он обрабатывает более 300 запросов в день без потери качества." },
    ],
  },
  faq: {
    label: "FAQ", title: "Часто задаваемые вопросы", subtitle: "Всё, что нужно для уверенного старта.",
    items: [
      { q: "Нужны ли технические знания для использования NexoBot?", a: "Нет. NexoBot разработан так, чтобы любой мог настроить его за несколько минут без технических знаний." },
      { q: "Могу ли я использовать NexoBot в WhatsApp?",              a: "Да. Все платные тарифы (Starter, Pro и Business) включают WhatsApp Business для автоматизации диалогов и продаж." },
      { q: "Что будет, если я превышу лимит сообщений?",             a: "Мы уведомим вас до достижения лимита. Вы можете обновить тариф в любое время без перебоев." },
      { q: "Могу ли я отменить в любое время?",                      a: "Да. Без договоров и обязательств. Отмените подписку в любое время из панели управления." },
      { q: "Предоставляется ли поддержка?",                          a: "Все тарифы включают поддержку. Тариф Premium предоставляет приоритетную поддержку." },
      { q: "Могу ли я интегрировать NexoBot на свой сайт?",          a: "Да. Все тарифы включают простой в установке виджет для подключения NexoBot к вашему сайту за несколько минут." },
    ],
  },
  cta: {
    title: "Автоматизируйте бизнес сегодня", titleHighlight: "с NexoBot",
    subtitle: "Отвечайте клиентам, генерируйте продажи и масштабируйтесь 24/7 с вашим интеллектуальным ассистентом.",
    button: "Начать бесплатно →", noCard: "Без кредитной карты · Отмена в любое время",
  },
  footer: { copyright: "© {year} NexoBot — Все права защищены.", pricing: "Цены", faq: "FAQ", features: "Возможности", login: "Войти", privacy: "Конфиденциальность", terms: "Условия" },
  pricingSection: {
    label: "Цены", title: "Планы, разработанные для роста вместе с вами",
    subtitle: "Выберите оптимальный план для вашего бизнеса и начните автоматизировать продажи и поддержку клиентов.",
    monthly: "Ежемесячно", annual: "Ежегодно", saveBadge: "2 месяца бесплатно",
    perMonth: "/мес", perYear: "/год · 2 месяца бесплатно",
    mostPopular: "⭐ САМЫЙ ПОПУЛЯРНЫЙ", comingSoon: "Годовой план скоро появится",
    plans: [
      { desc: "Начните бесплатно", features: ["1 бот", "100 сообщений/мес", "Веб-чат", "Панель управления"], excluded: ["WhatsApp не включён"], cta: "Начать бесплатно" },
      { desc: "Для бизнеса, который начинает расти", features: ["2 бота", "1 000 сообщений/мес", "Веб-чат", "WhatsApp Business", "Поддержка по email"], excluded: [], cta: "Выбрать Starter" },
      { desc: "Для бизнеса в фазе роста", features: ["5 ботов", "5 000 сообщений/мес", "Веб-чат + WhatsApp Business", "Инвентарь в реальном времени", "Автоматическое планирование", "Приоритетная поддержка"], excluded: [], cta: "Выбрать Pro" },
      { desc: "Для компаний, которым нужна максимальная мощность", features: ["Неограниченные боты", "Неограниченные сообщения", "Всё из Pro", "Выделенный ИИ-агент", "Выделенная поддержка"], excluded: [], cta: "Выбрать Business" },
    ],
  },
};

// ── 한국어 ────────────────────────────────────────────────────────────────────
export const ko: LandingT = {
  nav: { features: "기능", pricing: "요금", faq: "자주 묻는 질문", login: "로그인", cta: "무료로 시작 →" },
  hero: {
    badge: "500개 이상의 기업이 NexoBot을 신뢰합니다",
    h1: "당신의 비즈니스가 WhatsApp으로 24시간 자동 응답합니다",
    subtitle: "NexoBot이 WhatsApp으로 고객을 자동 응대합니다 — 당신이 자는 동안 예약을 잡고, 질문에 답하고, 판매를 성사시킵니다.",
    cta1: "무료로 시작 →", cta2: "작동 방식 보기", noCard: "신용카드 불필요 · 언제든지 취소 가능",
    stats: [
      { value: "500+", label: "활성 기업" },
      { value: "24/7", label: "가동 시간" },
      { value: "40%",  label: "평균 매출 증가" },
    ],
    chatOnline: "지금 온라인",
    chatMsg1: "안녕하세요! 오늘 어떻게 도와드릴까요? 👋",
    chatMsg2: "요금제에 대해 알고 싶어요",
    chatMsg3: "물론이죠! 월 $14부터 시작하는 3가지 요금제가 있습니다. 어떤 것이 귀하의 비즈니스에 맞나요? 🚀",
    chatPlaceholder: "메시지를 입력하세요...",
    chatBadge1: "✓ 1초 내 응답", chatBadge2: "🔥 +40% 매출",
  },
  trust: "좋아하는 도구와 호환 가능",
  features: {
    label: "기능", title: "자동화에 필요한 모든 것",
    subtitle: "NexoBot은 AI, 자동화, 멀티채널을 결합하여 더 많은 고객을 서비스하고 더 많이 판매합니다.",
    items: [
      { title: "몇 초 만에 응답",     desc: "봇이 24/7 자동으로 고객을 처리합니다. 지연이나 대기 없이." },
      { title: "WhatsApp Business 통합", desc: "고객이 이미 사용하는 곳에서 메시지를 보냅니다. 봇이 몇 초 안에 실제 비즈니스 정보로 답합니다." },
      { title: "더 많은 매출 창출",   desc: "스마트 플로우, 자동화된 퍼널, 세분화로 더 많은 고객을 전환하세요." },
    ],
  },
  howItWorks: {
    label: "프로세스", title: "3단계로 준비 완료", subtitle: "몇 분 안에 지능형 어시스턴트를 설정하고 판매를 시작하세요.",
    steps: [
      { title: "봇 설정",           desc: "응답을 맞춤화하고, 브랜드 톤을 정의하고, 어시스턴트를 필요에 맞게 구성하세요." },
      { title: "채널 연결",         desc: "WhatsApp, 웹, 소셜 미디어 또는 CRM. NexoBot이 모든 커뮤니케이션을 중앙화합니다." },
      { title: "자동화 및 확장",    desc: "봇이 자동으로 고객을 처리하고, 리드를 포착하고, 판매를 생성합니다." },
    ],
  },
  demo: {
    label: "라이브 데모", title: "NexoBot과 대화하기", titleHighlight: "지금 바로",
    subtitle: "계정 불필요. 봇이 고객에게 어떻게 응답하는지 실시간으로 테스트하세요.",
    bullets: ["2초 이내 응답", "진짜 AI — 스크립트 답변이 아님", "브랜드 톤으로 맞춤화 가능", "웹, WhatsApp 및 Instagram에서 작동"],
    cta1: "무료 봇 만들기 →", cta2: "요금 보기", noCard: "신용카드 불필요 · 언제든지 취소 가능",
  },
  services: {
    label: "애드온", title: "NexoBot을 다음 단계로",
    subtitle: "전문 설정, 고급 맞춤화, 커스텀 통합. 일회성 결제.",
    badge: "일회성 결제", cta: "지금 구매",
    items: [
      { title: "고급 맞춤화",     desc: "봇을 브랜드의 목소리로",         features: ["맞춤 조정", "비즈니스에 맞는 응답", "대화 플로우 최적화"] },
      { title: "고급 자동화",     desc: "봇을 판매 기계로 변환",           features: ["커스텀 스마트 플로우", "고급 세분화", "자동화된 퍼널"] },
      { title: "외부 시스템 통합", desc: "봇을 에코시스템과 연결",         features: ["CRM 통합", "외부 API 연결", "데이터 동기화"] },
    ],
  },
  testimonials: {
    label: "후기", title: "고객들의 이야기", subtitle: "실제 비즈니스, 실제 결과.",
    items: [
      { name: "Maria Lopez",      role: "온라인 액세서리 스토어", quote: "NexoBot은 제가 자는 동안에도 고객에게 응답합니다. 첫 달에 추가 노력 없이 40% 매출 증가를 달성했어요." },
      { name: "Carlos Fernandez", role: "전문 서비스",            quote: "WhatsApp 통합은 순식간이었습니다. 이제 자동화된 영업 플로우가 제 모든 잠재 고객을 관리합니다." },
      { name: "Ana Rodriguez",    role: "디지털 기업가",          quote: "지원이 훌륭합니다. 봇을 맞춤화하도록 도와줬고, 이제 하루 300건 이상의 문의를 처리합니다." },
    ],
  },
  faq: {
    label: "자주 묻는 질문", title: "자주 묻는 질문", subtitle: "완전한 자신감으로 시작하는 데 필요한 모든 것.",
    items: [
      { q: "NexoBot을 사용하는 데 기술적인 지식이 필요한가요?", a: "아니요. NexoBot은 누구나 기술적 지식 없이 몇 분 안에 설정할 수 있도록 설계되었습니다." },
      { q: "WhatsApp에서 NexoBot을 사용할 수 있나요?",          a: "예. 모든 유료 플랜(Starter, Pro, Business)에는 대화와 판매를 자동화하는 WhatsApp Business가 포함됩니다." },
      { q: "메시지 한도를 초과하면 어떻게 되나요?",             a: "한도에 도달하기 전에 알려드립니다. 중단 없이 언제든지 플랜을 업그레이드할 수 있습니다." },
      { q: "언제든지 취소할 수 있나요?",                        a: "예. 계약이나 약정이 없습니다. 대시보드에서 언제든지 구독을 취소하세요." },
      { q: "지원이 제공되나요?",                                a: "모든 플랜에 지원이 포함됩니다. Premium 플랜은 우선 지원을 제공합니다." },
      { q: "NexoBot을 웹사이트에 통합할 수 있나요?",            a: "예. 모든 플랜에는 몇 분 안에 NexoBot을 웹사이트에 연결하는 설치하기 쉬운 위젯이 포함됩니다." },
    ],
  },
  cta: {
    title: "오늘 비즈니스를 자동화하세요", titleHighlight: "NexoBot으로",
    subtitle: "인텔리전트 어시스턴트로 24/7 고객 응답, 판매 창출, 확장을 실현하세요.",
    button: "무료로 시작 →", noCard: "신용카드 불필요 · 언제든지 취소 가능",
  },
  footer: { copyright: "© {year} NexoBot — 모든 권리 보유.", pricing: "요금", faq: "자주 묻는 질문", features: "기능", login: "로그인", privacy: "개인정보처리방침", terms: "이용약관" },
  pricingSection: {
    label: "요금", title: "함께 성장하는 플랜",
    subtitle: "비즈니스에 맞는 최적의 플랜을 선택하고 판매 및 고객 지원을 자동화하세요.",
    monthly: "월간", annual: "연간", saveBadge: "2개월 무료",
    perMonth: "/월", perYear: "/년 · 2개월 무료",
    mostPopular: "⭐ 가장 인기", comingSoon: "연간 플랜 출시 예정",
    plans: [
      { desc: "무료로 시작하기", features: ["봇 1개", "월 100개 메시지", "웹 채팅", "제어판"], excluded: ["WhatsApp 미포함"], cta: "무료로 시작" },
      { desc: "성장을 시작하는 비즈니스를 위한 플랜", features: ["봇 2개", "월 1,000개 메시지", "웹 채팅", "WhatsApp Business", "이메일 지원"], excluded: [], cta: "Starter 선택" },
      { desc: "성장 중인 비즈니스를 위한 플랜", features: ["봇 5개", "월 5,000개 메시지", "웹 채팅 + WhatsApp Business", "실시간 재고", "자동 예약", "우선 지원"], excluded: [], cta: "Pro 선택" },
      { desc: "최대 성능이 필요한 기업을 위한 플랜", features: ["무제한 봇", "무제한 메시지", "Pro의 모든 기능", "전담 AI 에이전트", "전담 지원"], excluded: [], cta: "Business 선택" },
    ],
  },
};

// ── NEDERLANDS ────────────────────────────────────────────────────────────────
export const nl: LandingT = {
  nav: { features: "Functies", pricing: "Prijzen", faq: "FAQ", login: "Inloggen", cta: "Gratis starten →" },
  hero: {
    badge: "Meer dan 500 bedrijven vertrouwen NexoBot",
    h1: "Uw bedrijf antwoordt vanzelf, via WhatsApp, 24 uur per dag",
    subtitle: "NexoBot bedient uw klanten automatisch via WhatsApp — plant afspraken, beantwoordt vragen en sluit verkopen terwijl u slaapt.",
    cta1: "Gratis starten →", cta2: "Bekijk hoe het werkt", noCard: "Geen creditcard vereist · Altijd opzegbaar",
    stats: [
      { value: "500+", label: "Actieve bedrijven" },
      { value: "24/7", label: "Beschikbaarheid" },
      { value: "40%",  label: "Gem. omzetgroei" },
    ],
    chatOnline: "Nu online",
    chatMsg1: "Hallo! Hoe kan ik u vandaag helpen? 👋",
    chatMsg2: "Ik wil informatie over uw plannen",
    chatMsg3: "Zeker! We hebben 3 plannen vanaf $14/maand. Welk past bij uw bedrijf? 🚀",
    chatPlaceholder: "Schrijf een bericht...",
    chatBadge1: "✓ Beantwoord in 1s", chatBadge2: "🔥 +40% omzet",
  },
  trust: "Compatibel met uw favoriete tools",
  features: {
    label: "Functies", title: "Alles wat u nodig heeft om te automatiseren",
    subtitle: "NexoBot combineert AI, automatisering en meerdere kanalen om meer klanten te bedienen en meer te verkopen.",
    items: [
      { title: "Antwoordt in seconden",      desc: "Uw bot bedient klanten automatisch 24/7 zonder vertragingen of wachttijden." },
      { title: "WhatsApp Business geïntegreerd", desc: "Uw klanten schrijven waar ze al zijn. De bot antwoordt in seconden met echte informatie over uw bedrijf." },
      { title: "Genereer meer verkopen",     desc: "Slimme flows, geautomatiseerde funnels en segmentatie om meer klanten te converteren." },
    ],
  },
  howItWorks: {
    label: "Proces", title: "Klaar in 3 stappen", subtitle: "Stel uw intelligente assistent in minuten in en begin met verkopen.",
    steps: [
      { title: "Stel uw bot in",         desc: "Pas antwoorden aan, definieer uw merktoon en configureer de assistent naar uw behoeften." },
      { title: "Verbind uw kanalen",     desc: "WhatsApp, web, social media of CRM. NexoBot centraliseert al uw communicatie." },
      { title: "Automatiseer en schaal", desc: "Uw bot bedient klanten, legt leads vast en genereert automatisch verkopen." },
    ],
  },
  demo: {
    label: "Live demo", title: "Praat met NexoBot", titleHighlight: "nu meteen",
    subtitle: "Geen account nodig. Test in realtime hoe uw bot uw klanten zal beantwoorden.",
    bullets: ["Antwoorden in minder dan 2 seconden", "Echte AI — geen gescripte antwoorden", "Aanpasbaar met uw merktoon", "Werkt op web, WhatsApp en Instagram"],
    cta1: "Maak mijn gratis bot →", cta2: "Bekijk prijzen", noCard: "Geen creditcard vereist · Altijd opzegbaar",
  },
  services: {
    label: "Add-ons", title: "Breng uw NexoBot naar het volgende niveau",
    subtitle: "Professionele installatie, geavanceerde aanpassing en maatwerkintegraties. Eenmalige betaling.",
    badge: "Eenmalige betaling", cta: "Nu kopen",
    items: [
      { title: "Geavanceerde aanpassing", desc: "Laat uw bot spreken in uw merkstem",    features: ["Aangepaste aanpassingen", "Antwoorden afgestemd op uw bedrijf", "Optimalisatie van conversatieflow"] },
      { title: "Geavanceerde automatisering", desc: "Maak van uw bot een verkoopkracht", features: ["Aangepaste slimme flows", "Geavanceerde segmentatie", "Geautomatiseerde funnels"] },
      { title: "Externe systeemintegratie", desc: "Verbind uw bot met uw ecosysteem",    features: ["CRM-integratie", "Verbindingen met externe API's", "Datasynchronisatie"] },
    ],
  },
  testimonials: {
    label: "Getuigenissen", title: "Wat onze klanten zeggen", subtitle: "Echte bedrijven, echte resultaten.",
    items: [
      { name: "Maria Lopez",      role: "Online accessoirewinkel", quote: "NexoBot beantwoordt mijn klanten zelfs terwijl ik slaap. Mijn verkoop steeg 40% in de eerste maand zonder extra moeite." },
      { name: "Carlos Fernandez", role: "Professionele diensten",  quote: "WhatsApp-integratie was bliksemsnel. Nu heb ik een geautomatiseerde verkoopflow die al mijn prospects beheert." },
      { name: "Ana Rodriguez",    role: "Digitale ondernemer",     quote: "De ondersteuning is uitstekend. Ze hielpen mij mijn bot aan te passen en nu verwerkt het meer dan 300 vragen per dag." },
    ],
  },
  faq: {
    label: "FAQ", title: "Veelgestelde vragen", subtitle: "Alles wat u nodig heeft om vol vertrouwen te starten.",
    items: [
      { q: "Heb ik technische kennis nodig om NexoBot te gebruiken?", a: "Nee. NexoBot is ontworpen zodat iedereen het in minuten kan instellen zonder technische kennis." },
      { q: "Kan ik NexoBot op WhatsApp gebruiken?",                   a: "Ja. Alle betaalde plannen (Starter, Pro en Business) bevatten WhatsApp Business om uw gesprekken en verkoop te automatiseren." },
      { q: "Wat gebeurt er als ik de berichtenlimiet overschrijd?",   a: "We stellen u op de hoogte voordat u de limiet bereikt. U kunt uw plan op elk moment upgraden." },
      { q: "Kan ik op elk moment opzeggen?",                         a: "Ja. Geen contracten of verplichtingen. Zeg uw abonnement op elk moment op via uw dashboard." },
      { q: "Biedt u ondersteuning?",                                 a: "Alle plannen omvatten ondersteuning. Het Premium-plan heeft prioriteitsondersteuning." },
      { q: "Kan ik NexoBot integreren met mijn website?",            a: "Ja. Alle plannen omvatten een eenvoudig te installeren widget om NexoBot in minuten met uw website te verbinden." },
    ],
  },
  cta: {
    title: "Automatiseer uw bedrijf vandaag", titleHighlight: "met NexoBot",
    subtitle: "Beantwoord klanten, genereer verkopen en schaal 24/7 op met uw intelligente assistent.",
    button: "Gratis starten →", noCard: "Geen creditcard vereist · Altijd opzegbaar",
  },
  footer: { copyright: "© {year} NexoBot — Alle rechten voorbehouden.", pricing: "Prijzen", faq: "FAQ", features: "Functies", login: "Inloggen", privacy: "Privacy", terms: "Voorwaarden" },
  pricingSection: {
    label: "Prijzen", title: "Plannen die met u meegroeien",
    subtitle: "Kies het ideale plan voor uw bedrijf en begin met het automatiseren van verkoop en klantenservice.",
    monthly: "Maandelijks", annual: "Jaarlijks", saveBadge: "2 maanden gratis",
    perMonth: "/mnd", perYear: "/jaar · 2 maanden gratis",
    mostPopular: "⭐ MEEST POPULAIR", comingSoon: "Jaarplan binnenkort beschikbaar",
    plans: [
      { desc: "Start gratis", features: ["1 bot", "100 berichten/maand", "Webchat", "Controlepaneel"], excluded: ["WhatsApp niet inbegrepen"], cta: "Gratis starten" },
      { desc: "Voor bedrijven die beginnen te groeien", features: ["2 bots", "1.000 berichten/maand", "Webchat", "WhatsApp Business", "E-mailondersteuning"], excluded: [], cta: "Starter kiezen" },
      { desc: "Voor bedrijven in volle expansie", features: ["5 bots", "5.000 berichten/maand", "Webchat + WhatsApp Business", "Realtime inventaris", "Automatisch inroosteren", "Prioriteitsondersteuning"], excluded: [], cta: "Pro kiezen" },
      { desc: "Voor bedrijven die maximale kracht nodig hebben", features: ["Onbeperkte bots", "Onbeperkte berichten", "Alles van Pro", "Toegewijde AI-agent", "Toegewijde ondersteuning"], excluded: [], cta: "Business kiezen" },
    ],
  },
};

// ── TÜRKÇE ────────────────────────────────────────────────────────────────────
export const tr: LandingT = {
  nav: { features: "Özellikler", pricing: "Fiyatlar", faq: "SSS", login: "Giriş yap", cta: "Ücretsiz başla →" },
  hero: {
    badge: "500'den fazla şirket NexoBot'a güveniyor",
    h1: "İşletmeniz WhatsApp'ta 7/24 otomatik yanıt veriyor",
    subtitle: "NexoBot, müşterilerinizi WhatsApp üzerinden otomatik olarak karşılar — siz uyurken randevu alır, soruları yanıtlar ve satışları kapatır.",
    cta1: "Ücretsiz başla →", cta2: "Nasıl çalıştığını gör", noCard: "Kredi kartı gerekmez · İstediğiniz zaman iptal",
    stats: [
      { value: "500+", label: "Aktif şirket" },
      { value: "24/7", label: "Erişilebilirlik" },
      { value: "40%",  label: "Ortalama satış artışı" },
    ],
    chatOnline: "Şu an çevrimiçi",
    chatMsg1: "Merhaba! Bugün size nasıl yardımcı olabilirim? 👋",
    chatMsg2: "Planlarınız hakkında bilgi almak istiyorum",
    chatMsg3: "Tabii ki! Ayda $14'dan başlayan 3 planımız var. İşletmenize hangisi uygun? 🚀",
    chatPlaceholder: "Mesaj yazın...",
    chatBadge1: "✓ 1 saniyede yanıt", chatBadge2: "🔥 +40% satış",
  },
  trust: "Favori araçlarınızla uyumlu",
  features: {
    label: "Özellikler", title: "Otomatikleştirmek için ihtiyacınız olan her şey",
    subtitle: "NexoBot, daha fazla müşteriye hizmet vermek ve daha fazla satmak için yapay zeka, otomasyon ve çok kanallılığı birleştirir.",
    items: [
      { title: "Saniyeler içinde yanıt",    desc: "Botunuz müşterileri 7/24 otomatik olarak karşılar. Gecikme veya bekleme yok." },
      { title: "WhatsApp Business entegre", desc: "Müşterileriniz zaten kullandıkları yerde yazar. Bot saniyeler içinde işletmeniz hakkında gerçek bilgilerle yanıt verir." },
      { title: "Daha fazla satış üretin",  desc: "Akıllı akışlar, otomatik huniler ve segmentasyon ile daha fazla müşteriyi dönüştürün." },
    ],
  },
  howItWorks: {
    label: "Süreç", title: "3 adımda hazır", subtitle: "Dakikalar içinde akıllı asistanınızı kurun ve satışa başlayın.",
    steps: [
      { title: "Botunuzu kurun",           desc: "Yanıtları özelleştirin, marka tonunuzu tanımlayın ve asistanı ihtiyaçlarınıza göre yapılandırın." },
      { title: "Kanallarınızı bağlayın",   desc: "WhatsApp, web, sosyal medya veya CRM. NexoBot tüm iletişiminizi merkezileştirir." },
      { title: "Otomatikleştir ve büyü",   desc: "Botunuz otomatik olarak müşterileri karşılar, lead yakalar ve satış üretir." },
    ],
  },
  demo: {
    label: "Canlı demo", title: "NexoBot ile konuş", titleHighlight: "hemen şimdi",
    subtitle: "Hesap gerekmez. Botunuzun müşterilere nasıl yanıt vereceğini gerçek zamanlı test edin.",
    bullets: ["2 saniyeden az yanıt süresi", "Gerçek yapay zeka — komut dosyası yanıtları değil", "Marka tonunuzla özelleştirilebilir", "Web, WhatsApp ve Instagram'da çalışır"],
    cta1: "Ücretsiz botumu oluştur →", cta2: "Fiyatları gör", noCard: "Kredi kartı gerekmez · İstediğiniz zaman iptal",
  },
  services: {
    label: "Eklentiler", title: "NexoBot'unuzu bir üst seviyeye taşıyın",
    subtitle: "Profesyonel kurulum, gelişmiş özelleştirme ve özel entegrasyonlar. Tek seferlik ödeme.",
    badge: "Tek seferlik ödeme", cta: "Şimdi satın al",
    items: [
      { title: "Gelişmiş özelleştirme",   desc: "Botunuzu markanızın sesi yapın",      features: ["Özel ayarlamalar", "İşletmenize uygun yanıtlar", "Konuşma akışı optimizasyonu"] },
      { title: "Gelişmiş otomasyonlar",   desc: "Botunuzu satış makinesine dönüştürün", features: ["Özel akıllı akışlar", "Gelişmiş segmentasyon", "Otomatik huniler"] },
      { title: "Harici sistem entegrasyonu", desc: "Botunuzu ekosisteминize bağlayın", features: ["CRM entegrasyonu", "Harici API bağlantıları", "Veri senkronizasyonu"] },
    ],
  },
  testimonials: {
    label: "Referanslar", title: "Müşterilerimiz ne diyor", subtitle: "Gerçek işletmeler, gerçek sonuçlar.",
    items: [
      { name: "Maria Lopez",      role: "Online aksesuar mağazası", quote: "NexoBot uyurken bile müşterilerime yanıt veriyor. İlk ayda ek çaba olmadan %40 satış artışı elde ettim." },
      { name: "Carlos Fernandez", role: "Profesyonel hizmetler",    quote: "WhatsApp entegrasyonu çok hızlıydı. Artık otomatik satış akışım tüm potansiyel müşterilerimi yönetiyor." },
      { name: "Ana Rodriguez",    role: "Dijital girişimci",        quote: "Destek mükemmel. Botumu özelleştirmeme yardım ettiler ve artık günde 300'den fazla soruyu kalite kaybetmeden işliyor." },
    ],
  },
  faq: {
    label: "SSS", title: "Sık sorulan sorular", subtitle: "Tam güvenle başlamak için ihtiyacınız olan her şey.",
    items: [
      { q: "NexoBot'u kullanmak için teknik bilgi gerekiyor mu?", a: "Hayır. NexoBot, herkesin teknik bilgi olmadan dakikalar içinde kurabilmesi için tasarlanmıştır." },
      { q: "NexoBot'u WhatsApp'ta kullanabilir miyim?",           a: "Evet. Tüm ücretli planlar (Starter, Pro ve Business), konuşmalarınızı ve satışlarınızı otomatikleştirmek için WhatsApp Business içerir." },
      { q: "Mesaj limitini aşarsam ne olur?",                    a: "Limite ulaşmadan önce sizi bilgilendiririz. Kesinti olmadan istediğiniz zaman planınızı yükseltebilirsiniz." },
      { q: "İstediğim zaman iptal edebilir miyim?",              a: "Evet. Sözleşme veya taahhüt yok. Aboneliğinizi panodan istediğiniz zaman iptal edin." },
      { q: "Destek sunuyor musunuz?",                            a: "Tüm planlar destek içerir. Premium plan, daha hızlı yanıtlar için öncelikli destek sunar." },
      { q: "NexoBot'u web siteme entegre edebilir miyim?",       a: "Evet. Tüm planlar, NexoBot'u dakikalar içinde web sitenize bağlamak için kolay kurulumlu bir widget içerir." },
    ],
  },
  cta: {
    title: "İşletmenizi bugün otomatikleştirin", titleHighlight: "NexoBot ile",
    subtitle: "Akıllı asistanınızla 7/24 müşterilere yanıt verin, satış üretin ve büyüyün.",
    button: "Ücretsiz başla →", noCard: "Kredi kartı gerekmez · İstediğiniz zaman iptal",
  },
  footer: { copyright: "© {year} NexoBot — Tüm hakları saklıdır.", pricing: "Fiyatlar", faq: "SSS", features: "Özellikler", login: "Giriş yap", privacy: "Gizlilik", terms: "Koşullar" },
  pricingSection: {
    label: "Fiyatlar", title: "Sizinle birlikte büyümek için tasarlanmış planlar",
    subtitle: "İşletmeniz için ideal planı seçin ve satışları ve müşteri desteğini otomatikleştirmeye başlayın.",
    monthly: "Aylık", annual: "Yıllık", saveBadge: "2 ay ücretsiz",
    perMonth: "/ay", perYear: "/yıl · 2 ay ücretsiz",
    mostPopular: "⭐ EN POPÜLER", comingSoon: "Yıllık plan yakında",
    plans: [
      { desc: "Ücretsiz başla", features: ["1 bot", "100 mesaj/ay", "Web sohbet", "Kontrol paneli"], excluded: ["WhatsApp dahil değil"], cta: "Ücretsiz başla" },
      { desc: "Büyümeye başlayan işletmeler için", features: ["2 bot", "Ayda 1.000 mesaj", "Web sohbet", "WhatsApp Business", "E-posta desteği"], excluded: [], cta: "Starter'ı seç" },
      { desc: "Büyüyen işletmeler için", features: ["5 bot", "Ayda 5.000 mesaj", "Web sohbet + WhatsApp Business", "Gerçek zamanlı envanter", "Otomatik randevu", "Öncelikli destek"], excluded: [], cta: "Pro'yu seç" },
      { desc: "Maksimum güce ihtiyaç duyan işletmeler için", features: ["Sınırsız bot", "Sınırsız mesaj", "Pro'daki her şey", "Özel AI ajanı", "Özel destek"], excluded: [], cta: "Business'ı seç" },
    ],
  },
};

// ── BAHASA INDONESIA ──────────────────────────────────────────────────────────
export const id: LandingT = {
  nav: { features: "Fitur", pricing: "Harga", faq: "FAQ", login: "Masuk", cta: "Mulai gratis →" },
  hero: {
    badge: "Lebih dari 500 bisnis mempercayai NexoBot",
    h1: "Otomatiskan penjualan dan dukungan pelanggan dengan NexoBot",
    subtitle: "Asisten AI Anda yang membalas pelanggan, menghasilkan penjualan, dan bekerja untuk Anda 24/7. Hemat waktu, tingkatkan pendapatan, dan skalakan tanpa kesulitan.",
    cta1: "Mulai gratis →", cta2: "Lihat cara kerjanya", noCard: "Tanpa kartu kredit · Batalkan kapan saja",
    stats: [
      { value: "500+", label: "Bisnis aktif" },
      { value: "24/7", label: "Ketersediaan" },
      { value: "40%",  label: "Rata-rata peningkatan penjualan" },
    ],
    chatOnline: "Online sekarang",
    chatMsg1: "Halo! Bagaimana saya bisa membantu Anda hari ini? 👋",
    chatMsg2: "Saya ingin info tentang paket kalian",
    chatMsg3: "Tentu! Kami punya 3 paket mulai dari $14/bulan. Mana yang cocok untuk bisnis Anda? 🚀",
    chatPlaceholder: "Tulis pesan...",
    chatBadge1: "✓ Dibalas dalam 1 detik", chatBadge2: "🔥 +40% penjualan",
  },
  trust: "Kompatibel dengan alat favorit Anda",
  features: {
    label: "Fitur", title: "Semua yang Anda butuhkan untuk otomatisasi",
    subtitle: "NexoBot menggabungkan AI, otomasi, dan multisaluran untuk melayani lebih banyak pelanggan dan menjual lebih banyak.",
    items: [
      { title: "Membalas dalam hitungan detik", desc: "Bot Anda melayani pelanggan secara otomatis 24/7 tanpa penundaan atau menunggu." },
      { title: "Hubungkan saluran Anda",        desc: "WhatsApp, web, media sosial, atau CRM. NexoBot terintegrasi dengan mudah ke ekosistem Anda." },
      { title: "Hasilkan lebih banyak penjualan", desc: "Alur cerdas, corong otomatis, dan segmentasi untuk mengonversi lebih banyak pelanggan." },
    ],
  },
  howItWorks: {
    label: "Proses", title: "Siap dalam 3 langkah", subtitle: "Siapkan asisten cerdas Anda dalam hitungan menit dan mulai berjualan.",
    steps: [
      { title: "Atur bot Anda",              desc: "Sesuaikan respons, tentukan nada merek Anda, dan konfigurasikan asisten sesuai kebutuhan." },
      { title: "Hubungkan saluran Anda",     desc: "WhatsApp, web, media sosial, atau CRM. NexoBot memusatkan semua komunikasi Anda." },
      { title: "Otomatisasi dan skalakan",   desc: "Bot Anda secara otomatis melayani pelanggan, menangkap prospek, dan menghasilkan penjualan." },
    ],
  },
  demo: {
    label: "Demo langsung", title: "Bicara dengan NexoBot", titleHighlight: "sekarang juga",
    subtitle: "Tidak perlu akun. Uji secara real-time bagaimana bot Anda akan membalas pelanggan.",
    bullets: ["Respons dalam kurang dari 2 detik", "AI nyata — bukan balasan terskripsi", "Dapat disesuaikan dengan nada merek Anda", "Berfungsi di web, WhatsApp, dan Instagram"],
    cta1: "Buat bot gratis saya →", cta2: "Lihat harga", noCard: "Tanpa kartu kredit · Batalkan kapan saja",
  },
  services: {
    label: "Add-on", title: "Bawa NexoBot Anda ke level berikutnya",
    subtitle: "Penyiapan profesional, kustomisasi lanjutan, dan integrasi kustom. Pembayaran satu kali.",
    badge: "Pembayaran satu kali", cta: "Beli sekarang",
    items: [
      { title: "Kustomisasi lanjutan",      desc: "Buat bot berbicara dengan suara merek Anda",     features: ["Penyesuaian kustom", "Respons disesuaikan bisnis", "Optimasi alur percakapan"] },
      { title: "Otomasi lanjutan",          desc: "Ubah bot Anda menjadi mesin penjualan",          features: ["Alur cerdas kustom", "Segmentasi lanjutan", "Corong otomatis"] },
      { title: "Integrasi sistem eksternal", desc: "Hubungkan bot Anda dengan ekosistem Anda",      features: ["Integrasi CRM", "Koneksi API eksternal", "Sinkronisasi data"] },
    ],
  },
  testimonials: {
    label: "Testimoni", title: "Apa yang dikatakan pelanggan kami", subtitle: "Bisnis nyata, hasil nyata.",
    items: [
      { name: "Maria Lopez",      role: "Toko aksesori online",    quote: "NexoBot membalas pelanggan saya bahkan saat saya tidur. Penjualan saya naik 40% di bulan pertama tanpa usaha ekstra." },
      { name: "Carlos Fernandez", role: "Layanan profesional",     quote: "Integrasi WhatsApp sangat cepat. Kini saya punya alur penjualan otomatis yang menangani semua prospek tanpa saya harus hadir." },
      { name: "Ana Rodriguez",    role: "Pengusaha digital",       quote: "Dukungannya luar biasa. Mereka membantu saya menyesuaikan bot, dan sekarang menangani lebih dari 300 pertanyaan per hari tanpa kehilangan kualitas." },
    ],
  },
  faq: {
    label: "FAQ", title: "Pertanyaan yang sering diajukan", subtitle: "Semua yang Anda butuhkan untuk memulai dengan penuh keyakinan.",
    items: [
      { q: "Apakah saya perlu keahlian teknis untuk menggunakan NexoBot?", a: "Tidak. NexoBot dirancang agar siapa saja dapat mengaturnya dalam hitungan menit tanpa pengetahuan teknis." },
      { q: "Bisakah saya menggunakan NexoBot di WhatsApp?",                a: "Ya. Semua paket berbayar (Starter, Pro dan Business) mencakup WhatsApp Business untuk mengotomatiskan percakapan dan penjualan Anda." },
      { q: "Apa yang terjadi jika saya melebihi batas pesan?",             a: "Kami akan memberi tahu Anda sebelum mencapai batas. Anda dapat meningkatkan paket kapan saja tanpa gangguan." },
      { q: "Bisakah saya membatalkan kapan saja?",                         a: "Ya. Tidak ada kontrak atau komitmen. Batalkan langganan kapan saja dari dasbor Anda." },
      { q: "Apakah Anda menyediakan dukungan?",                            a: "Semua paket mencakup dukungan. Paket Premium memiliki dukungan prioritas untuk respons lebih cepat." },
      { q: "Bisakah saya mengintegrasikan NexoBot ke website saya?",       a: "Ya. Semua paket mencakup widget mudah dipasang untuk menghubungkan NexoBot ke website Anda dalam hitungan menit." },
    ],
  },
  cta: {
    title: "Otomatiskan bisnis Anda hari ini", titleHighlight: "dengan NexoBot",
    subtitle: "Balas pelanggan, hasilkan penjualan, dan skalakan 24/7 dengan asisten cerdas Anda.",
    button: "Mulai gratis →", noCard: "Tanpa kartu kredit · Batalkan kapan saja",
  },
  footer: { copyright: "© {year} NexoBot — Semua hak dilindungi.", pricing: "Harga", faq: "FAQ", features: "Fitur", login: "Masuk", privacy: "Privasi", terms: "Ketentuan" },
  pricingSection: {
    label: "Harga", title: "Paket yang dirancang untuk tumbuh bersama Anda",
    subtitle: "Pilih paket ideal untuk bisnis Anda dan mulai otomatisasi penjualan dan dukungan pelanggan.",
    monthly: "Bulanan", annual: "Tahunan", saveBadge: "2 bulan gratis",
    perMonth: "/bln", perYear: "/thn · 2 bulan gratis",
    mostPopular: "⭐ PALING POPULER", comingSoon: "Paket tahunan segera hadir",
    plans: [
      { desc: "Mulai tanpa biaya", features: ["1 bot", "100 pesan/bulan", "Chat web", "Panel kontrol"], excluded: ["WhatsApp tidak termasuk"], cta: "Mulai gratis" },
      { desc: "Untuk bisnis yang mulai berkembang", features: ["2 bot", "1.000 pesan/bulan", "Chat web", "WhatsApp Business", "Dukungan email"], excluded: [], cta: "Pilih Starter" },
      { desc: "Untuk bisnis yang sedang berkembang pesat", features: ["5 bot", "5.000 pesan/bulan", "Chat web + WhatsApp Business", "Inventaris real-time", "Jadwal otomatis", "Dukungan prioritas"], excluded: [], cta: "Pilih Pro" },
      { desc: "Untuk bisnis yang membutuhkan kekuatan maksimal", features: ["Bot tak terbatas", "Pesan tak terbatas", "Semua fitur Pro", "Agen AI khusus", "Dukungan khusus"], excluded: [], cta: "Pilih Business" },
    ],
  },
};
