import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-white text-gray-900">

      {/* Navbar */}
      <nav className="max-w-6xl mx-auto px-6 py-5 flex items-center justify-between">
        <Link href="/" className="text-2xl font-extrabold text-blue-600">NexoBot</Link>
        <div className="flex items-center gap-4">
          <a href="#pricing" className="text-sm font-medium text-gray-600 hover:text-blue-600 transition">Precios</a>
          <a href="#faq" className="text-sm font-medium text-gray-600 hover:text-blue-600 transition">FAQ</a>
          <a href="/auth/login" className="text-sm font-medium text-gray-700 hover:text-blue-600 transition">Iniciar sesión</a>
          <a
            href="/auth/signup"
            className="px-4 py-2 bg-blue-600 text-white text-sm font-semibold rounded-lg hover:bg-blue-700 transition"
          >
            Empezar gratis
          </a>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="max-w-6xl mx-auto px-6 py-24 text-center">
        <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 text-sm font-medium px-4 py-1.5 rounded-full mb-8">
          <span>✨</span> Automatización con IA para tu negocio
        </div>
        <h1 className="text-6xl font-extrabold leading-tight tracking-tight">
          Automatiza tus ventas y atención al cliente con{" "}
          <span className="text-blue-600">NexoBot</span>
        </h1>

        <p className="mt-6 text-xl text-gray-600 max-w-2xl mx-auto">
          Tu asistente inteligente que responde clientes, genera ventas y trabaja por ti 24/7.
          Ahorra tiempo, aumenta ingresos y escala tu negocio sin esfuerzo.
        </p>

        <div className="mt-12 flex justify-center gap-4 flex-wrap">
          <a
            href="/auth/signup"
            className="px-10 py-4 bg-blue-600 text-white rounded-xl font-semibold shadow-md hover:bg-blue-700 hover:shadow-lg transition-all"
          >
            Empezar gratis →
          </a>
          <a
            href="#features"
            className="px-10 py-4 border border-gray-300 rounded-xl font-semibold hover:bg-gray-100 transition-all"
          >
            Ver cómo funciona
          </a>
        </div>

        <p className="mt-5 text-sm text-gray-400">Sin tarjeta de crédito · Cancela cuando quieras</p>
      </section>


      {/* Features */}
<section id="features" className="py-24 bg-gray-50">
  <div className="max-w-6xl mx-auto px-6 text-center">
    <h2 className="text-4xl font-extrabold">Todo lo que necesitas para automatizar tu negocio</h2>
    <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
      NexoBot combina inteligencia artificial, automatización y multicanalidad para que puedas atender más clientes y vender más sin esfuerzo.
    </p>

    <div className="mt-16 grid md:grid-cols-3 gap-12">

      {/* Feature 1 */}
      <div className="text-center">
        <div className="text-blue-600 text-5xl mb-4">⚡</div>
        <h3 className="text-2xl font-semibold">Responde en segundos</h3>
        <p className="mt-3 text-gray-600">
          Tu bot atiende automáticamente 24/7, sin retrasos ni tiempos de espera.
        </p>
      </div>

      {/* Feature 2 */}
      <div className="text-center">
        <div className="text-blue-600 text-5xl mb-4">💬</div>
        <h3 className="text-2xl font-semibold">Conecta tus canales</h3>
        <p className="mt-3 text-gray-600">
          WhatsApp, web, redes sociales o CRM. NexoBot se integra fácilmente con tu ecosistema.
        </p>
      </div>

      {/* Feature 3 */}
      <div className="text-center">
        <div className="text-blue-600 text-5xl mb-4">🚀</div>
        <h3 className="text-2xl font-semibold">Genera más ventas</h3>
        <p className="mt-3 text-gray-600">
          Flujos inteligentes, embudos automatizados y segmentación para convertir más clientes.
        </p>
      </div>

    </div>
  </div>
</section>


      {/* Pricing Section – Planes Mensuales */}
<section id="pricing" className="py-24 bg-white">
  <div className="max-w-6xl mx-auto px-6 text-center">
    <h2 className="text-4xl font-extrabold">Planes diseñados para crecer contigo</h2>
    <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
      Elige el plan ideal para tu negocio y empieza a automatizar ventas, atención al cliente y generación de leads.
    </p>

    <div className="mt-16 grid md:grid-cols-3 gap-10">

      {/* Starter */}
      <div className="border rounded-2xl p-8 shadow-sm hover:shadow-md transition">
        <h3 className="text-2xl font-semibold">Starter</h3>
        <p className="mt-2 text-gray-600">Ideal para emprendedores que están comenzando</p>
        <p className="mt-6 text-4xl font-bold">$29<span className="text-lg text-gray-500">/mes</span></p>

        <ul className="mt-6 space-y-3 text-gray-600 text-left">
          <li>✔ Respuestas automáticas con IA</li>
          <li>✔ Chat embebido para tu web</li>
          <li>✔ Plantillas de mensajes</li>
          <li>✔ Atención 24/7 sin esfuerzo</li>
          <li>✔ Captura básica de leads</li>
          <li>✔ Panel de control intuitivo</li>
          <li>✔ Integración con tu sitio web</li>
          <li>✖ WhatsApp no incluido</li>
          <li>✖ Sin automatizaciones avanzadas</li>
          <li>✖ Sin segmentación</li>
          <li>✖ Sin embudo automático</li>
        </ul>

        <a
          href={`/checkout?priceId=price_1T18BGRap0JkQNsmaUVhyNFr`}
          className="block mt-8 px-6 py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition"
        >
          Elegir Starter
        </a>
      </div>

      {/* Pro */}
      <div className="border-2 border-blue-600 rounded-2xl p-8 shadow-lg">
        <h3 className="text-2xl font-semibold text-blue-600">Pro</h3>
        <p className="mt-2 text-gray-600">Perfecto para negocios que quieren escalar</p>
        <p className="mt-6 text-4xl font-bold">$59<span className="text-lg text-gray-500">/mes</span></p>

        <ul className="mt-6 space-y-3 text-gray-600 text-left">
          <li>✔ Todo lo del Starter</li>
          <li>✔ Integración con WhatsApp</li>
          <li>✔ Flujos inteligentes de ventas</li>
          <li>✔ Segmentación avanzada de clientes</li>
          <li>✔ Captura avanzada de leads</li>
          <li>✔ Integración con redes sociales</li>
          <li>✔ Respuestas basadas en intención</li>
          <li>✔ Automatizaciones personalizadas</li>
          <li>✖ Mensajes ilimitados no incluidos</li>
        </ul>

        <a
          href={`/checkout?priceId=price_1T15gVRap0JkQNsm59vukMuR`}
          className="block mt-8 px-6 py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition"
        >
          Elegir Pro
        </a>
      </div>

      {/* Premium */}
      <div className="border rounded-2xl p-8 shadow-sm hover:shadow-md transition">
        <h3 className="text-2xl font-semibold">Premium</h3>
        <p className="mt-2 text-gray-600">Para empresas que necesitan máxima potencia</p>
        <p className="mt-6 text-4xl font-bold">$99<span className="text-lg text-gray-500">/mes</span></p>

        <ul className="mt-6 space-y-3 text-gray-600 text-left">
          <li>✔ Todo lo del Pro</li>
          <li>✔ Mensajes ilimitados</li>
          <li>✔ Embudo de ventas automático</li>
          <li>✔ Integraciones avanzadas</li>
          <li>✔ Soporte prioritario</li>
          <li>✔ Configuración asistida</li>
          <li>✔ Automatizaciones premium</li>
        </ul>

        <a
          href={`/checkout?priceId=price_1T15jDRap0JkQNsmQRvEkpcm`}
          className="block mt-8 px-6 py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition"
        >
          Elegir Premium
        </a>
      </div>

    </div>
  </div>
</section>

{/* Servicios Adicionales – Pagos Únicos */}
<section id="services" className="py-24 bg-gray-50">
  <div className="max-w-6xl mx-auto px-6 text-center">
    <h2 className="text-4xl font-extrabold">Servicios Adicionales</h2>
    <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
      Lleva tu NexoBot al siguiente nivel con configuraciones profesionales, personalización avanzada e integraciones a medida.
    </p>

    <div className="mt-16 grid md:grid-cols-3 gap-10">

      {/* Personalización avanzada */}
      <div className="border rounded-2xl p-8 bg-white shadow-sm hover:shadow-md transition">
        <h3 className="text-xl font-semibold">Personalización avanzada</h3>
        <p className="mt-2 text-gray-600">Haz que tu bot hable como tu marca</p>
        <p className="mt-6 text-3xl font-bold">$99</p>

        <ul className="mt-6 space-y-3 text-gray-600 text-left">
          <li>✔ Ajustes personalizados</li>
          <li>✔ Respuestas adaptadas a tu negocio</li>
          <li>✔ Optimización del flujo conversacional</li>
        </ul>

        <a
          href={`/checkout?priceId=price_1T161uRap0JkQNsm3BJZGOEu`}
          className="block mt-8 px-6 py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition"
        >
          Comprar
        </a>
      </div>

      {/* Automatizaciones avanzadas */}
      <div className="border rounded-2xl p-8 bg-white shadow-sm hover:shadow-md transition">
        <h3 className="text-xl font-semibold">Automatizaciones avanzadas</h3>
        <p className="mt-2 text-gray-600">Convierte tu bot en una máquina de ventas</p>
        <p className="mt-6 text-3xl font-bold">$149</p>

        <ul className="mt-6 space-y-3 text-gray-600 text-left">
          <li>✔ Flujos inteligentes personalizados</li>
          <li>✔ Segmentación avanzada</li>
          <li>✔ Embudos automatizados</li>
        </ul>

        <a
          href={`/checkout?priceId=price_1T163sRap0JkQNsmOrHBQuJp`}
          className="block mt-8 px-6 py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition"
        >
          Comprar
        </a>
      </div>

      


      {/* Integración con sistemas externos */}
      <div className="border rounded-2xl p-8 bg-white shadow-sm hover:shadow-md transition">
        <h3 className="text-xl font-semibold">Integración con sistemas externos</h3>
        <p className="mt-2 text-gray-600">Conecta tu bot con tu ecosistema</p>
        <p className="mt-6 text-3xl font-bold">$199</p>

        <ul className="mt-6 space-y-3 text-gray-600 text-left">
          <li>✔ Integración con CRM</li>
          <li>✔ Conexión con APIs externas</li>
          <li>✔ Sincronización de datos</li>
        </ul>

        <a
          href={`/checkout?priceId=price_1T166cRap0JkQNsmuPTOPBBu`}
          className="block mt-8 px-6 py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition"
        >
          Comprar
        </a>
      </div>

    </div>
  </div>
</section>
{/* Cómo funciona NexoBot */}
<section id="how-it-works" className="py-24 bg-white">
  <div className="max-w-6xl mx-auto px-6 text-center">
    <h2 className="text-4xl font-extrabold">Cómo funciona NexoBot</h2>
    <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
      Configura tu asistente inteligente en minutos y deja que automatice ventas, soporte y captación de clientes sin esfuerzo.
    </p>

    <div className="mt-16 grid md:grid-cols-3 gap-12">

      {/* Paso 1 */}
      <div className="text-center">
        <div className="text-blue-600 text-5xl mb-4">①</div>
        <h3 className="text-2xl font-semibold">Configura tu bot</h3>
        <p className="mt-3 text-gray-600">
          Personaliza respuestas, define el tono de tu marca y ajusta la lógica del asistente según tus necesidades.
        </p>
      </div>

      {/* Paso 2 */}
      <div className="text-center">
        <div className="text-blue-600 text-5xl mb-4">②</div>
        <h3 className="text-2xl font-semibold">Conéctalo a tus canales</h3>
        <p className="mt-3 text-gray-600">
          WhatsApp, web, redes sociales o CRM. NexoBot se integra fácilmente para centralizar toda tu comunicación.
        </p>
      </div>

      {/* Paso 3 */}
      <div className="text-center">
        <div className="text-blue-600 text-5xl mb-4">③</div>
        <h3 className="text-2xl font-semibold">Automatiza y escala</h3>
        <p className="mt-3 text-gray-600">
          Tu bot atiende clientes, captura leads y genera ventas automáticamente, permitiéndote escalar sin aumentar carga de trabajo.
        </p>
      </div>

    </div>
  </div>
</section>

{/* Preguntas Frecuentes (FAQ) */}
<section id="faq" className="py-24 bg-gray-50">
  <div className="max-w-4xl mx-auto px-6">
    <h2 className="text-4xl font-extrabold text-center">Preguntas Frecuentes</h2>
    <p className="mt-4 text-gray-600 text-center max-w-2xl mx-auto">
      Resolvemos las dudas más comunes para que empieces con total claridad y confianza.
    </p>

    <div className="mt-16 space-y-8">

      {/* FAQ 1 */}
      <div>
        <h3 className="text-xl font-semibold">¿Necesito conocimientos técnicos para usar NexoBot?</h3>
        <p className="mt-2 text-gray-600">
          No. NexoBot está diseñado para que cualquier persona pueda configurarlo en minutos.
          Y si prefieres no hacerlo tú, ofrecemos servicios adicionales para dejarlo todo listo por ti.
        </p>
      </div>

      {/* FAQ 2 */}
      <div>
        <h3 className="text-xl font-semibold">¿Puedo usar NexoBot en WhatsApp?</h3>
        <p className="mt-2 text-gray-600">
          Sí. Los planes Pro y Premium incluyen integración con WhatsApp para automatizar tus conversaciones y ventas.
        </p>
      </div>

      {/* FAQ 3 */}
      <div>
        <h3 className="text-xl font-semibold">¿Qué pasa si supero el límite de mensajes?</h3>
        <p className="mt-2 text-gray-600">
          Te avisaremos antes de llegar al límite. Puedes actualizar tu plan en cualquier momento sin interrupciones.
        </p>
      </div>

      {/* FAQ 4 */}
      <div>
        <h3 className="text-xl font-semibold">¿Puedo cancelar cuando quiera?</h3>
        <p className="mt-2 text-gray-600">
          Sí. No hay contratos ni permanencias. Puedes cancelar tu suscripción cuando quieras desde tu panel.
        </p>
      </div>

      {/* FAQ 5 */}
      <div>
        <h3 className="text-xl font-semibold">¿Ofrecen soporte?</h3>
        <p className="mt-2 text-gray-600">
          Claro. Todos los planes incluyen soporte, y el plan Premium cuenta con soporte prioritario para respuestas más rápidas.
        </p>
      </div>

      {/* FAQ 6 */}
      <div>
        <h3 className="text-xl font-semibold">¿Puedo integrar NexoBot con mi sitio web?</h3>
        <p className="mt-2 text-gray-600">
          Sí. Todos los planes incluyen un widget fácil de instalar para conectar NexoBot con tu sitio web en minutos.
        </p>
      </div>

    </div>
  </div>
</section>

{/* Testimonios */}
<section id="testimonials" className="py-24 bg-white">
  <div className="max-w-6xl mx-auto px-6 text-center">
    <h2 className="text-4xl font-extrabold">Lo que dicen nuestros clientes</h2>
    <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
      Emprendedores y negocios reales ya están usando NexoBot para automatizar ventas, ahorrar tiempo y atender clientes sin esfuerzo.
    </p>

    <div className="mt-16 grid md:grid-cols-3 gap-10">

      {/* Testimonio 1 */}
      <div className="border rounded-2xl p-8 shadow-sm bg-gray-50">
        <p className="text-gray-700 italic">
          “NexoBot responde a mis clientes incluso cuando estoy durmiendo. En el primer mes mis ventas subieron un 40% sin invertir más tiempo.”
        </p>
        <div className="mt-6">
          <h4 className="font-semibold">María López</h4>
          <p className="text-gray-500 text-sm">Tienda online de accesorios</p>
        </div>
      </div>

      {/* Testimonio 2 */}
      <div className="border rounded-2xl p-8 shadow-sm bg-gray-50">
        <p className="text-gray-700 italic">
          “La integración con WhatsApp fue rapidísima. Ahora tengo un flujo de ventas automatizado que atiende a todos mis prospectos sin que yo esté encima.”
        </p>
        <div className="mt-6">
          <h4 className="font-semibold">Carlos Fernández</h4>
          <p className="text-gray-500 text-sm">Servicios profesionales</p>
        </div>
      </div>

      {/* Testimonio 3 */}
      <div className="border rounded-2xl p-8 shadow-sm bg-gray-50">
        <p className="text-gray-700 italic">
          “El soporte es excelente. Me ayudaron a personalizar mi bot y ahora atiende más de 300 consultas al día sin perder calidad.”
        </p>
        <div className="mt-6">
          <h4 className="font-semibold">Ana Rodríguez</h4>
          <p className="text-gray-500 text-sm">Emprendedora digital</p>
        </div>
      </div>

    </div>
  </div>
</section>

{/* Call To Action (CTA) Final */}
<section id="cta" className="py-32 bg-blue-600 text-white text-center">
  <div className="max-w-4xl mx-auto px-6">
    <h2 className="text-5xl font-extrabold leading-tight">
      Automatiza tu negocio hoy con NexoBot
    </h2>

    <p className="mt-6 text-lg text-blue-100 max-w-2xl mx-auto">
      Responde clientes, genera ventas y escala tu negocio 24/7 con tu asistente inteligente.
    </p>

    <a
      href="/auth/signup"
      className="inline-block mt-10 px-12 py-4 bg-white text-blue-600 font-semibold rounded-xl shadow-lg hover:bg-gray-100 transition-all text-lg"
    >
      Empezar gratis →
    </a>
    <p className="mt-4 text-blue-200 text-sm">Sin tarjeta de crédito · Cancela cuando quieras</p>
  </div>
</section>


      {/* Footer */}
      <footer className="py-12 border-t bg-gray-50">
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <p className="text-xl font-extrabold text-blue-600">NexoBot</p>
            <p className="text-sm text-gray-400 mt-1">© {new Date().getFullYear()} NexoBot — Todos los derechos reservados.</p>
          </div>
          <div className="flex gap-6 text-sm text-gray-500">
            <a href="#pricing" className="hover:text-blue-600 transition">Precios</a>
            <a href="#faq" className="hover:text-blue-600 transition">FAQ</a>
            <a href="#features" className="hover:text-blue-600 transition">Características</a>
            <a href="/auth/login" className="hover:text-blue-600 transition">Iniciar sesión</a>
          </div>
        </div>
      </footer>

    </main>
  );
}
