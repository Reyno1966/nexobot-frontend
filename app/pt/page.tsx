export default function HomePT() {
  return (
    <main className="bg-white text-gray-900">

      {/* HERO */}
      <section className="py-32 px-6 text-center max-w-4xl mx-auto">
        <h1 className="text-5xl font-extrabold leading-tight">
          Automatize suas vendas e seu atendimento com{" "}
          <span className="text-blue-600">NexoBot</span>
        </h1>

        <p className="mt-6 text-lg text-gray-600">
          Seu assistente inteligente que responde clientes, gera vendas e trabalha
          para você 24 horas por dia. Economize tempo, aumente sua receita e
          escale seu negócio sem esforço.
        </p>

        <div className="mt-10 flex justify-center gap-4">
          <a
            href="/en"
            className="px-10 py-4 bg-blue-600 text-white rounded-xl font-semibold shadow-md hover:bg-blue-700 transition-all"
          >
            Começar agora
          </a>

          <a
            href="#how"
            className="px-10 py-4 bg-white border border-gray-300 rounded-xl font-semibold hover:bg-gray-100 transition-all"
          >
            Ver como funciona
          </a>
        </div>
      </section>

      {/* INTRO */}
      <section className="py-20 px-6 text-center max-w-3xl mx-auto">
        <h2 className="text-4xl font-bold">
          Tudo o que você precisa para automatizar seu negócio
        </h2>

        <p className="mt-6 text-gray-600 text-lg">
          O NexoBot combina inteligência artificial, automação e comunicação
          multicanal para ajudar você a atender mais clientes e fechar mais vendas
          sem esforço.
        </p>
      </section>

      {/* FEATURES */}
      <section className="py-20 px-6 max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10">

        <div className="p-8 border rounded-2xl shadow-sm hover:shadow-md transition">
          <h3 className="text-xl font-bold mb-3">Respostas automáticas 24/7</h3>
          <p className="text-gray-600">
            O NexoBot responde seus clientes em tempo real, mesmo enquanto você dorme.
          </p>
        </div>

        <div className="p-8 border rounded-2xl shadow-sm hover:shadow-md transition">
          <h3 className="text-xl font-bold mb-3">Geração de vendas</h3>
          <p className="text-gray-600">
            Transforme conversas em vendas com mensagens inteligentes e personalizadas.
          </p>
        </div>

        <div className="p-8 border rounded-2xl shadow-sm hover:shadow-md transition">
          <h3 className="text-xl font-bold mb-3">Multicanal</h3>
          <p className="text-gray-600">
            WhatsApp, Instagram, Facebook e site: tudo em um só lugar.
          </p>
        </div>

      </section>
      {/* PRICING */}
      <section className="py-24 px-6 bg-gray-50" id="pricing">
        <h2 className="text-4xl font-bold text-center mb-16">
          Escolha o plano ideal para o seu negócio
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-6xl mx-auto">

          {/* BASIC */}
          <div className="p-10 bg-white border rounded-2xl shadow-sm hover:shadow-md transition">
            <h3 className="text-2xl font-bold mb-4">Basic</h3>
            <p className="text-gray-600 mb-6">
              Ideal para pequenos negócios que desejam começar com automação.
            </p>
            <p className="text-4xl font-extrabold mb-6">€19<span className="text-lg">/mês</span></p>

            <ul className="text-gray-600 space-y-3 mb-8">
              <li>✔ Respostas automáticas 24/7</li>
              <li>✔ Até 500 mensagens por mês</li>
              <li>✔ 1 canal conectado</li>
              <li>✔ Suporte básico</li>
            </ul>

            <a
              href="/en"
              className="block text-center px-8 py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition"
            >
              Começar
            </a>
          </div>

          {/* PRO */}
          <div className="p-10 bg-white border-2 border-blue-600 rounded-2xl shadow-md hover:shadow-lg transition">
            <h3 className="text-2xl font-bold mb-4">Pro</h3>
            <p className="text-gray-600 mb-6">
              Perfeito para empresas que querem crescer e aumentar as vendas.
            </p>
            <p className="text-4xl font-extrabold mb-6">€49<span className="text-lg">/mês</span></p>

            <ul className="text-gray-600 space-y-3 mb-8">
              <li>✔ Respostas automáticas avançadas</li>
              <li>✔ Mensagens ilimitadas</li>
              <li>✔ 3 canais conectados</li>
              <li>✔ Automações inteligentes</li>
              <li>✔ Suporte prioritário</li>
            </ul>

            <a
              href="/en"
              className="block text-center px-8 py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition"
            >
              Escolher Pro
            </a>
          </div>

          {/* ENTERPRISE */}
          <div className="p-10 bg-white border rounded-2xl shadow-sm hover:shadow-md transition">
            <h3 className="text-2xl font-bold mb-4">Enterprise</h3>
            <p className="text-gray-600 mb-6">
              Para empresas que precisam de soluções personalizadas e escalabilidade total.
            </p>
            <p className="text-4xl font-extrabold mb-6">€99<span className="text-lg">/mês</span></p>

            <ul className="text-gray-600 space-y-3 mb-8">
              <li>✔ Todas as funcionalidades do Pro</li>
              <li>✔ Canais ilimitados</li>
              <li>✔ Automações avançadas</li>
              <li>✔ Suporte dedicado</li>
              <li>✔ Integrações personalizadas</li>
            </ul>

            <a
              href="/en"
              className="block text-center px-8 py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition"
            >
              Falar conosco
            </a>
          </div>

        </div>
      </section>

      {/* SERVIÇOS ADICIONAIS */}
      <section className="py-24 px-6 max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-16">
          Serviços adicionais
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">

          <div className="p-8 border rounded-2xl shadow-sm hover:shadow-md transition">
            <h3 className="text-xl font-bold mb-3">Configuração do WhatsApp</h3>
            <p className="text-gray-600 mb-4">
              Configuração completa do seu canal WhatsApp Business API.
            </p>
            <p className="font-bold text-blue-600">€49 pagamento único</p>
          </div>

          <div className="p-8 border rounded-2xl shadow-sm hover:shadow-md transition">
            <h3 className="text-xl font-bold mb-3">Criação de chatbot personalizado</h3>
            <p className="text-gray-600 mb-4">
              Criamos um chatbot sob medida para o seu negócio.
            </p>
            <p className="font-bold text-blue-600">€99 pagamento único</p>
          </div>

          <div className="p-8 border rounded-2xl shadow-sm hover:shadow-md transition">
            <h3 className="text-xl font-bold mb-3">Integração com site</h3>
            <p className="text-gray-600 mb-4">
              Adicionamos o NexoBot ao seu site de forma profissional.
            </p>
            <p className="font-bold text-blue-600">€39 pagamento único</p>
          </div>

        </div>
      </section>

      {/* COMO FUNCIONA */}
      <section className="py-24 px-6 bg-gray-50" id="how">
        <h2 className="text-4xl font-bold text-center mb-16">
          Como o NexoBot funciona
        </h2>

        <div className="max-w-4xl mx-auto space-y-12">

          <div>
            <h3 className="text-2xl font-bold mb-3">1. Conecte seus canais</h3>
            <p className="text-gray-600">
              WhatsApp, Instagram, Facebook ou site: escolha onde deseja automatizar.
            </p>
          </div>

          <div>
            <h3 className="text-2xl font-bold mb-3">2. Configure as automações</h3>
            <p className="text-gray-600">
              Defina o que o NexoBot deve fazer: responder, vender, qualificar clientes e muito mais.
            </p>
          </div>

          <div>
            <h3 className="text-2xl font-bold mb-3">3. Deixe ele trabalhar por você</h3>
            <p className="text-gray-600">
              O NexoBot responde clientes 24/7 e ajuda você a gerar mais vendas.
            </p>
          </div>

        </div>
      </section>
      {/* FAQ */}
      <section className="py-24 px-6 max-w-5xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-16">
          Perguntas frequentes
        </h2>

        <div className="space-y-10">

          <div>
            <h3 className="text-2xl font-bold mb-3">
              O NexoBot funciona com WhatsApp?
            </h3>
            <p className="text-gray-600">
              Sim, o NexoBot integra-se perfeitamente com o WhatsApp Business API
              para automatizar respostas, vendas e suporte.
            </p>
          </div>

          <div>
            <h3 className="text-2xl font-bold mb-3">
              Posso usar também no Instagram e Facebook?
            </h3>
            <p className="text-gray-600">
              Claro. Você pode conectar vários canais e gerenciar tudo em um só lugar.
            </p>
          </div>

          <div>
            <h3 className="text-2xl font-bold mb-3">
              Preciso de conhecimento técnico?
            </h3>
            <p className="text-gray-600">
              Não. O NexoBot foi criado para ser simples e intuitivo. Você pode
              começar em poucos minutos.
            </p>
          </div>

          <div>
            <h3 className="text-2xl font-bold mb-3">
              Posso cancelar quando quiser?
            </h3>
            <p className="text-gray-600">
              Sim, você pode cancelar ou alterar seu plano a qualquer momento sem
              taxas adicionais.
            </p>
          </div>

        </div>
      </section>

      {/* DEPOIMENTOS */}
      <section className="py-24 px-6 bg-gray-50">
        <h2 className="text-4xl font-bold text-center mb-16">
          O que nossos clientes dizem
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-6xl mx-auto">

          <div className="p-8 bg-white border rounded-2xl shadow-sm">
            <p className="text-gray-700 italic mb-4">
              “O NexoBot reduziu em 70% o tempo que gastávamos respondendo clientes.
              É impressionante.”
            </p>
            <p className="font-bold">Marcos R.</p>
            <p className="text-gray-500 text-sm">E-commerce</p>
          </div>

          <div className="p-8 bg-white border rounded-2xl shadow-sm">
            <p className="text-gray-700 italic mb-4">
              “Aumentamos nossas vendas em 40% em apenas um mês. Indispensável.”
            </p>
            <p className="font-bold">Juliana S.</p>
            <p className="text-gray-500 text-sm">Serviços digitais</p>
          </div>

          <div className="p-8 bg-white border rounded-2xl shadow-sm">
            <p className="text-gray-700 italic mb-4">
              “Fácil de usar, rápido de configurar e extremamente eficiente.”
            </p>
            <p className="font-bold">Lucas M.</p>
            <p className="text-gray-500 text-sm">Restaurante</p>
          </div>

        </div>
      </section>

      {/* CTA FINAL */}
      <section className="py-32 px-6 text-center max-w-4xl mx-auto">
        <h2 className="text-5xl font-extrabold mb-6">
          Pronto para crescer seu negócio?
        </h2>

        <p className="text-lg text-gray-600 mb-10">
          Comece hoje com o NexoBot e automatize suas vendas, suporte e comunicação.
        </p>

        <a
          href="/en"
          className="px-12 py-4 bg-blue-600 text-white rounded-xl font-semibold shadow-md hover:bg-blue-700 transition-all"
        >
          Começar agora
        </a>
      </section>

      {/* FOOTER */}
      <footer className="py-10 text-center text-gray-500 text-sm border-t">
        © {new Date().getFullYear()} NexoBot — Todos os direitos reservados.
      </footer>

    </main>
  );
}
