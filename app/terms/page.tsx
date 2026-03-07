import Link from "next/link";

export const metadata = {
  title: "Términos de Uso | NexoBot",
  description: "Términos y condiciones de uso de NexoBot",
};

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto px-6 py-16">
        {/* Header */}
        <div className="mb-12">
          <Link href="/" className="text-blue-600 hover:underline text-sm">← Volver al inicio</Link>
          <h1 className="text-4xl font-extrabold mt-6 mb-3">Términos de Uso</h1>
          <p className="text-gray-500">Última actualización: 7 de marzo de 2026</p>
        </div>

        <div className="prose prose-gray max-w-none space-y-8 text-gray-700 leading-relaxed">

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">1. Aceptación de los términos</h2>
            <p>Al acceder y utilizar NexoBot (nexobot.net), aceptas estar vinculado por estos Términos de Uso. Si no estás de acuerdo con alguna parte de estos términos, no debes utilizar el servicio.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">2. Descripción del servicio</h2>
            <p>NexoBot es una plataforma de asistentes virtuales con inteligencia artificial que permite a empresas y particulares crear, configurar y desplegar chatbots en múltiples canales de comunicación incluyendo WhatsApp, Instagram, Facebook Messenger y sitios web.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">3. Cuentas de usuario</h2>
            <ul className="list-disc pl-6 space-y-1 mt-3">
              <li>Debes tener al menos 18 años para crear una cuenta.</li>
              <li>Eres responsable de mantener la confidencialidad de tu contraseña.</li>
              <li>Debes notificarnos inmediatamente sobre cualquier uso no autorizado de tu cuenta.</li>
              <li>NexoBot se reserva el derecho de suspender cuentas que violen estos términos.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">4. Planes y pagos</h2>
            <ul className="list-disc pl-6 space-y-1 mt-3">
              <li><strong>Facturación:</strong> los planes de suscripción se facturan mensualmente por adelantado.</li>
              <li><strong>Renovación automática:</strong> las suscripciones se renuevan automáticamente hasta que sean canceladas.</li>
              <li><strong>Cancelación:</strong> puedes cancelar en cualquier momento desde tu panel de control. El acceso continúa hasta el final del período facturado.</li>
              <li><strong>Reembolsos:</strong> no ofrecemos reembolsos por períodos parciales, salvo que la ley aplicable lo requiera.</li>
              <li><strong>Cambios de precio:</strong> notificaremos cualquier cambio de precio con al menos 30 días de antelación.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">5. Uso aceptable</h2>
            <p>Al usar NexoBot, te comprometes a NO:</p>
            <ul className="list-disc pl-6 space-y-1 mt-3">
              <li>Usar el servicio para enviar spam, contenido ilegal o dañino.</li>
              <li>Intentar acceder a sistemas no autorizados.</li>
              <li>Revender o sublicenciar el servicio sin autorización escrita.</li>
              <li>Usar el servicio para actividades fraudulentas o engañosas.</li>
              <li>Violar derechos de propiedad intelectual de terceros.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">6. Propiedad intelectual</h2>
            <p>NexoBot y todo su contenido, características y funcionalidades son propiedad de NexoBot y están protegidos por las leyes de propiedad intelectual aplicables. Los usuarios conservan la propiedad del contenido que crean mediante la plataforma.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">7. Disponibilidad del servicio</h2>
            <p>NexoBot se esfuerza por mantener una disponibilidad del 99.9%. Sin embargo, no garantizamos que el servicio sea ininterrumpido o libre de errores. Nos reservamos el derecho de realizar mantenimientos programados con aviso previo.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">8. Limitación de responsabilidad</h2>
            <p>En la máxima medida permitida por la ley, NexoBot no será responsable por daños indirectos, incidentales, especiales o consecuentes. La responsabilidad total de NexoBot no excederá el importe pagado por el usuario en los últimos 3 meses.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">9. Modificaciones</h2>
            <p>Nos reservamos el derecho de modificar estos términos en cualquier momento. Notificaremos cambios significativos por correo electrónico con al menos 15 días de antelación. El uso continuado del servicio después de dicha notificación constituye la aceptación de los nuevos términos.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">10. Ley aplicable</h2>
            <p>Estos términos se rigen por la ley suiza. Cualquier disputa se someterá a la jurisdicción exclusiva de los tribunales de Suiza.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">11. Contacto</h2>
            <p>Para cualquier consulta sobre estos términos:</p>
            <div className="mt-3 bg-gray-50 rounded-xl p-4">
              <p><strong>NexoBot</strong></p>
              <p>Suiza</p>
              <p>Email: <a href="mailto:support@nexobot.net" className="text-blue-600 hover:underline">support@nexobot.net</a></p>
            </div>
          </section>

        </div>

        <div className="mt-16 pt-8 border-t border-gray-100 flex gap-6 text-sm text-gray-500">
          <Link href="/privacy" className="hover:text-gray-900">Política de Privacidad</Link>
          <Link href="/" className="hover:text-gray-900">Inicio</Link>
        </div>
      </div>
    </div>
  );
}
