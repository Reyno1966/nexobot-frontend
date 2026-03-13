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
