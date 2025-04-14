export default function SetupGuide() {
  return (
    <div className="min-h-screen bg-dark-bg text-gray-200 p-8 font-main">
      <div className="max-w-3xl mx-auto">
        {/* Cabeçalho com botão de acesso */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-tech text-neon-purple">
            Configuração Necessária
          </h1>
          <a
            href="/chat"
            className="bg-gradient-to-r from-neon-purple to-neon-blue hover:from-neon-blue hover:to-neon-purple text-white py-2 px-6 rounded-full transition-all duration-300 shadow-lg shadow-neon-purple/20 flex items-center gap-2"
          >
            Acessar Chat
            <span className="text-xl animate-pulse">→</span>
          </a>
        </div>

        {/* Conteúdo do guia */}
        <div className="space-y-6">
          {/* Passo 1 - Instalação do Ollama */}
          <div className="bg-dark-surface p-6 rounded-lg border border-neon-blue neon-glow">
            <h2 className="text-xl text-neon-blue mb-4 font-tech">
              1. Instalação do Ollama
            </h2>
            <p className="mb-4">Baixe e instale o Ollama em seu computador:</p>
            <code className="block p-4 bg-black rounded mb-4 font-code animate-text-gradient">
              curl -fsSL https://ollama.ai/install.sh | sh
            </code>
            <p className="text-sm text-neon-blue/80">
              * Requer permissões de administrador
            </p>
          </div>

          {/* Passo 2 - Instalação do Modelo */}
          <div className="bg-dark-surface p-6 rounded-lg border border-neon-purple neon-glow">
            <h2 className="text-xl text-neon-purple mb-4 font-tech">
              2. Instalar Modelo DeepSeek
            </h2>
            <p className="mb-4">Execute no terminal após instalar o Ollama:</p>
            <code className="block p-4 bg-black rounded mb-4 font-code animate-text-gradient">
              ollama run deepseek-r1:8b
            </code>
            <p className="text-sm text-neon-purple/80">
              * A primeira execução pode demorar vários minutos
            </p>
          </div>

          {/* Passo 3 - Iniciar Serviço */}
          <div className="bg-dark-surface p-6 rounded-lg border border-neon-blue neon-glow">
            <h2 className="text-xl text-neon-blue mb-4 font-tech">
              3. Iniciar o Serviço
            </h2>
            <p>Certifique-se que o Ollama está rodando localmente:</p>
            <code className="block p-4 bg-black rounded mt-2 mb-4 font-code animate-text-gradient">
              ollama serve
            </code>
            <div className="flex items-center gap-2 text-sm text-neon-blue/80">
              <span className="animate-pulse">▶</span>
              <span>Mantenha este terminal aberto durante o uso</span>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-12 text-center border-t border-neon-purple/20 pt-8">
          <p className="text-neon-blue/80">
            Problemas? Verifique a documentação oficial ou reinicie o serviço
          </p>
        </div>
      </div>
    </div>
  );
}
