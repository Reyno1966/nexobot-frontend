import Link from "next/link";

export const metadata = {
  title: "Política de Privacidad | NexoBot",
  description: "Política de privacidad de NexoBot",
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto px-6 py-16">
        {/* Header */}
        <div className="mb-12">
          <Link href="/" className="text-blue-600 hover:underline text-sm">← Volver al inicio</Link>
          <h1 className="text-4xl font-extrabold mt-6 mb-3">Política de Privacidad</h1>
          <p className="text-gray-500">Última actualización: 7 de marzo de 2026</p>
        </div>

        <div className="prose prose-gray max-w-none space-y-8 text-gray-700 leading-relaxed">

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">1. Información que recopilamos</h2>
            <p>NexoBot recopila la siguiente información cuando utilizas nuestros servicios:</p>
            <ul className="list-disc pl-6 space-y-1 mt-3">
              <li><strong>Información de cuenta:</strong> nombre, dirección de correo electrónico y contraseña cifrada.</li>
              <li><strong>Información de pago:</strong> procesada de forma segura por Stripe. NexoBot no almacena datos de tarjetas de crédito.</li>
              <li><strong>Datos de uso:</strong> conversaciones de bots, estadísticas de mensajes y actividad en la plataforma.</li>
              <li><strong>Datos técnicos:</strong> dirección IP, tipo de navegador y sistema operativo para fines de seguridad.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">2. Cómo usamos tu información</h2>
            <p>Utilizamos la información recopilada para:</p>
            <ul className="list-disc pl-6 space-y-1 mt-3">
              <li>Proporcionar, operar y mejorar los servicios de NexoBot.</li>
              <li>Procesar pagos y gestionar suscripciones.</li>
              <li>Enviarte comunicaciones relacionadas con el servicio (facturas, notificaciones técnicas).</li>
              <li>Cumplir con obligaciones legales aplicables.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">3. Base legal (RGPD)</h2>
            <p>El tratamiento de tus datos se basa en:</p>
            <ul className="list-disc pl-6 space-y-1 mt-3">
              <li><strong>Ejecución de contrato:</strong> para prestarte los servicios contratados.</li>
              <li><strong>Interés legítimo:</strong> para mejorar nuestros servicios y garantizar la seguridad.</li>
              <li><strong>Consentimiento:</strong> para comunicaciones de marketing, que puedes retirar en cualquier momento.</li>
              <li><strong>Obligación legal:</strong> para cumplir con la legislación aplicable.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">4. Compartir información con terceros</h2>
            <p>No vendemos tus datos personales. Podemos compartir información con:</p>
            <ul className="list-disc pl-6 space-y-1 mt-3">
              <li><strong>Stripe:</strong> procesamiento seguro de pagos (<a href="https://stripe.com/privacy" className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">política de privacidad de Stripe</a>).</li>
              <li><strong>Supabase:</strong> almacenamiento seguro de datos de usuario.</li>
              <li><strong>Proveedores de servicios:</strong> únicamente aquellos necesarios para operar la plataforma, bajo acuerdos de confidencialidad.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">5. Retención de datos</h2>
            <p>Conservamos tus datos mientras tu cuenta esté activa o sea necesario para prestarte los servicios. Al cancelar tu cuenta, eliminamos tus datos personales en un plazo de 30 días, salvo que la ley nos obligue a conservarlos por más tiempo.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">6. Tus derechos</h2>
            <p>Bajo el RGPD y la legislación suiza (nLPD), tienes derecho a:</p>
            <ul className="list-disc pl-6 space-y-1 mt-3">
              <li><strong>Acceso:</strong> solicitar una copia de tus datos personales.</li>
              <li><strong>Rectificación:</strong> corregir datos inexactos.</li>
              <li><strong>Supresión:</strong> solicitar la eliminación de tus datos.</li>
              <li><strong>Portabilidad:</strong> recibir tus datos en formato estructurado.</li>
              <li><strong>Oposición:</strong> oponerte al tratamiento en determinadas circunstancias.</li>
            </ul>
            <p className="mt-3">Para ejercer estos derechos, escríbenos a <a href="mailto:support@nexobot.net" className="text-blue-600 hover:underline">support@nexobot.net</a>.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">7. Seguridad</h2>
            <p>Implementamos medidas técnicas y organizativas adecuadas para proteger tus datos, incluyendo cifrado en tránsito (HTTPS/TLS), autenticación segura y acceso restringido a datos personales.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">8. Cookies</h2>
            <p>NexoBot utiliza cookies estrictamente necesarias para el funcionamiento de la plataforma (gestión de sesión). No utilizamos cookies de seguimiento ni publicidad de terceros.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">9. Transferencias internacionales</h2>
            <p>Tus datos pueden ser procesados en servidores ubicados en la Unión Europea o Estados Unidos. En todos los casos garantizamos un nivel de protección adecuado conforme a la normativa aplicable.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">10. Contacto</h2>
            <p>Para cualquier consulta sobre esta política, contáctanos en:</p>
            <div className="mt-3 bg-gray-50 rounded-xl p-4">
              <p><strong>NexoBot</strong></p>
              <p>Suiza</p>
              <p>Email: <a href="mailto:support@nexobot.net" className="text-blue-600 hover:underline">support@nexobot.net</a></p>
            </div>
          </section>

        </div>

        <div className="mt-16 pt-8 border-t border-gray-100 flex gap-6 text-sm text-gray-500">
          <Link href="/terms" className="hover:text-gray-900">Términos de Uso</Link>
          <Link href="/" className="hover:text-gray-900">Inicio</Link>
        </div>
      </div>
    </div>
  );
}
