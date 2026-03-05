import Link from "next/link";

export default function HomePT() {
  return (
    <main className="min-h-screen bg-white text-gray-900">
      <nav className="max-w-6xl mx-auto px-6 py-5 flex items-center justify-between">
        <Link href="/pt" className="text-2xl font-extrabold text-blue-600">NexoBot</Link>
        <div className="flex items-center gap-4">
          <a href="#pricing" className="text-sm font-medium text-gray-600 hover:text-blue-600 transition">Preços</a>
          <a href="#faq" className="text-sm font-medium text-gray-600 hover:text-blue-600 transition">FAQ</a>
          <Link href="/auth/login" className="text-sm font-medium text-gray-700 hover:text-blue-600 transition">Entrar</Link>
          <Link href="/auth/signup" className="px-4 py-2 bg-blue-600 text-white text-sm font-semibold rounded-lg hover:bg-blue-700 transition">Começar grátis</Link>
        </div>
      </nav>
      <section className="max-w-6xl mx-auto px-6 py-24 text-center">
        <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 text-sm font-medium px-4 py-1.5 rounded-full mb-8"><span>✨</span> Automação com IA para o seu negócio</div>
        <h1 className="text-6xl font-extrabold leading-tight tracking-tight">Automatize suas vendas e atendimento ao cliente com <span className="text-blue-600">NexoBot</span></h1>
        <p className="mt-6 text-xl text-gray-600 max-w-2xl mx-auto">Seu assistente inteligente que responde clientes, gera vendas e trabalha por você 24/7. Economize tempo, aumente receita e escale seu negócio sem esforço.</p>
        <div className="mt-12 flex justify-center gap-4 flex-wrap">
          <Link href="/auth/signup" className="px-10 py-4 bg-blue-600 text-white rounded-xl font-semibold shadow-md hover:bg-blue-700 hover:shadow-lg transition-all">Começar grátis →</Link>
          <a href="#features" className="px-10 py-4 border border-gray-300 rounded-xl font-semibold hover:bg-gray-100 transition-all">Ver como funciona</a>
        </div>
        <p className="mt-5 text-sm text-gray-400">Sem cartão de crédito · Cancele quando quiser</p>
      </section>
      <section id="features" className="py-24 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-extrabold">Tudo o que você precisa para automatizar seu negócio</h2>
          <p className="mt-4 text-gray-600 max-w-2xl mx-auto">O NexoBot combina inteligência artificial, automação e comunicação multicanal para atender mais clientes e vender mais sem esforço.</p>
          <div className="mt-16 grid md:grid-cols-3 gap-12">
            <div className="text-center"><div className="text-blue-600 text-5xl mb-4">⚡</div><h3 className="text-2xl font-semibold">Respostas instantâneas</h3><p className="mt-3 text-gray-600">Seu bot responde automaticamente 24/7, sem atrasos ou tempos de espera.</p></div>
            <div className="text-center"><div className="text-blue-600 text-5xl mb-4">💬</div><h3 className="text-2xl font-semibold">Conecte todos os canais</h3><p className="mt-3 text-gray-600">WhatsApp, site, redes sociais ou CRM. O NexoBot se integra perfeitamente ao seu ecossistema.</p></div>
            <div className="text-center"><div className="text-blue-600 text-5xl mb-4">🚀</div><h3 className="text-2xl font-semibold">Aumente suas vendas</h3><p className="mt-3 text-gray-600">Fluxos inteligentes, funis automatizados e segmentação para converter mais clientes.</p></div>
          </div>
        </div>
      </section>
      <section id="pricing" className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-extrabold">Planos criados para crescer com você</h2>
          <p className="mt-4 text-gray-600 max-w-2xl mx-auto">Escolha o plano ideal para o seu negócio e comece a automatizar vendas, atendimento e geração de leads.</p>
          <div className="mt-16 grid md:grid-cols-3 gap-10">
            <div className="border rounded-2xl p-8 shadow-sm hover:shadow-md transition">
              <h3 className="text-2xl font-semibold">Starter</h3><p className="mt-2 text-gray-600">Ideal para empreendedores que estão começando</p>
              <p className="mt-6 text-4xl font-bold">$29<span className="text-lg text-gray-500">/mês</span></p>
              <ul className="mt-6 space-y-3 text-gray-600 text-left"><li>✔ Respostas automáticas com IA</li><li>✔ Widget de chat para seu site</li><li>✔ Modelos de mensagens</li><li>✔ Atendimento 24/7</li><li>✔ Captura básica de leads</li><li>✔ Painel intuitivo</li><li>✖ WhatsApp não incluído</li><li>✖ Sem automações avançadas</li></ul>
              <a href="/checkout?priceId=price_1T18BGRap0JkQNsmaUVhyNFr" className="block mt-8 px-6 py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition">Escolher Starter</a>
            </div>
            <div className="border-2 border-blue-600 rounded-2xl p-8 shadow-lg">
              <h3 className="text-2xl font-semibold text-blue-600">Pro</h3><p className="mt-2 text-gray-600">Perfeito para negócios em crescimento</p>
              <p className="mt-6 text-4xl font-bold">$59<span className="text-lg text-gray-500">/mês</span></p>
              <ul className="mt-6 space-y-3 text-gray-600 text-left"><li>✔ Tudo do Starter</li><li>✔ Integração com WhatsApp</li><li>✔ Fluxos inteligentes de vendas</li><li>✔ Segmentação avançada</li><li>✔ Automações personalizadas</li><li>✖ Mensagens ilimitadas não incluídas</li></ul>
              <a href="/checkout?priceId=price_1T15gVRap0JkQNsm59vukMuR" className="block mt-8 px-6 py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition">Escolher Pro</a>
            </div>
            <div className="border rounded-2xl p-8 shadow-sm hover:shadow-md transition">
              <h3 className="text-2xl font-semibold">Premium</h3><p className="mt-2 text-gray-600">Para empresas que precisam do máximo</p>
              <p className="mt-6 text-4xl font-bold">$99<span className="text-lg text-gray-500">/mês</span></p>
              <ul className="mt-6 space-y-3 text-gray-600 text-left"><li>✔ Tudo do Pro</li><li>✔ Mensagens ilimitadas</li><li>✔ Funil de vendas automático</li><li>✔ Integrações avançadas</li><li>✔ Suporte prioritário</li><li>✔ Configuração assistida</li></ul>
              <a href="/checkout?priceId=price_1T15jDRap0JkQNsmQRvEkpcm" className="block mt-8 px-6 py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition">Escolher Premium</a>
            </div>
          </div>
        </div>
      </section>
      <section id="services" className="py-24 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-extrabold">Serviços Adicionais</h2>
          <p className="mt-4 text-gray-600 max-w-2xl mx-auto">Leve seu NexoBot ao próximo nível com configurações profissionais e integrações sob medida.</p>
          <div className="mt-16 grid md:grid-cols-3 gap-10">
            <div className="border rounded-2xl p-8 bg-white shadow-sm hover:shadow-md transition"><h3 className="text-xl font-semibold">Personalização Avançada</h3><p className="mt-2 text-gray-600">Faça seu bot falar como sua marca</p><p className="mt-6 text-3xl font-bold">$99</p><ul className="mt-4 space-y-2 text-gray-600 text-left text-sm"><li>✔ Ajustes personalizados</li><li>✔ Respostas adaptadas ao negócio</li></ul><a href="/checkout?priceId=price_1T161uRap0JkQNsm3BJZGOEu" className="block mt-6 px-6 py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition">Comprar</a></div>
            <div className="border rounded-2xl p-8 bg-white shadow-sm hover:shadow-md transition"><h3 className="text-xl font-semibold">Automações Avançadas</h3><p className="mt-2 text-gray-600">Transforme seu bot em uma máquina de vendas</p><p className="mt-6 text-3xl font-bold">$149</p><ul className="mt-4 space-y-2 text-gray-600 text-left text-sm"><li>✔ Fluxos inteligentes personalizados</li><li>✔ Funis automatizados</li></ul><a href="/checkout?priceId=price_1T163sRap0JkQNsmOrHBQuJp" className="block mt-6 px-6 py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition">Comprar</a></div>
            <div className="border rounded-2xl p-8 bg-white shadow-sm hover:shadow-md transition"><h3 className="text-xl font-semibold">Integrações Externas</h3><p className="mt-2 text-gray-600">Conecte seu bot ao seu ecossistema</p><p className="mt-6 text-3xl font-bold">$199</p><ul className="mt-4 space-y-2 text-gray-600 text-left text-sm"><li>✔ Integração com CRM</li><li>✔ Conexão com APIs externas</li></ul><a href="/checkout?priceId=price_1T166cRap0JkQNsmuPTOPBBu" className="block mt-6 px-6 py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition">Comprar</a></div>
          </div>
        </div>
      </section>
      <section id="faq" className="py-24 bg-white">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-4xl font-extrabold text-center">Perguntas Frequentes</h2>
          <div className="mt-16 space-y-8">
            <div><h3 className="text-xl font-semibold">Preciso de conhecimento técnico?</h3><p className="mt-2 text-gray-600">Não. O NexoBot foi criado para que qualquer pessoa possa configurá-lo em minutos.</p></div>
            <div><h3 className="text-xl font-semibold">O NexoBot funciona no WhatsApp?</h3><p className="mt-2 text-gray-600">Sim. A integração com WhatsApp está incluída nos planos Pro e Premium.</p></div>
            <div><h3 className="text-xl font-semibold">Posso cancelar quando quiser?</h3><p className="mt-2 text-gray-600">Sim. Sem contratos ou fidelidade. Cancele quando quiser pelo painel.</p></div>
            <div><h3 className="text-xl font-semibold">Oferecem suporte?</h3><p className="mt-2 text-gray-600">Sim. Todos os planos incluem suporte. O plano Premium inclui suporte prioritário.</p></div>
          </div>
        </div>
      </section>
      <section id="cta" className="py-32 bg-blue-600 text-white text-center">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-5xl font-extrabold leading-tight">Automatize seu negócio hoje com NexoBot</h2>
          <p className="mt-6 text-lg text-blue-100 max-w-2xl mx-auto">Atenda clientes, gere vendas e escale seu negócio 24/7 com seu assistente inteligente.</p>
          <Link href="/auth/signup" className="inline-block mt-10 px-12 py-4 bg-white text-blue-600 font-semibold rounded-xl shadow-lg hover:bg-gray-100 transition-all text-lg">Começar grátis →</Link>
          <p className="mt-4 text-blue-200 text-sm">Sem cartão de crédito · Cancele quando quiser</p>
        </div>
      </section>
      <footer className="py-12 border-t bg-gray-50">
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div><p className="text-xl font-extrabold text-blue-600">NexoBot</p><p className="text-sm text-gray-400 mt-1">© {new Date().getFullYear()} NexoBot — Todos os direitos reservados.</p></div>
          <div className="flex gap-6 text-sm text-gray-500">
            <a href="#pricing" className="hover:text-blue-600 transition">Preços</a>
            <a href="#faq" className="hover:text-blue-600 transition">FAQ</a>
            <Link href="/auth/login" className="hover:text-blue-600 transition">Entrar</Link>
          </div>
        </div>
      </footer>
    </main>
  );
}
