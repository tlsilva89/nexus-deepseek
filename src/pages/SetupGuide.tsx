export default function SetupGuide() {
  return (
    <div className="min-h-screen bg-dark-bg text-gray-200 p-8 font-main">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-tech text-neon-purple mb-8">
          Configuração Necessária
        </h1>

        <div className="space-y-6">
          <div className="bg-dark-surface p-6 rounded-lg border border-neon-blue">
            <h2 className="text-xl text-neon-blue mb-4">
              1. Instalação do Ollama
            </h2>
            <p className="mb-4">Baixe e instale o Ollama em seu computador:</p>
            <code className="block p-4 bg-black rounded mb-4">
              curl -fsSL https://ollama.ai/install.sh | sh
            </code>
          </div>

          <div className="bg-dark-surface p-6 rounded-lg border border-neon-purple">
            <h2 className="text-xl text-neon-purple mb-4">
              2. Instalar Modelo DeepSeek
            </h2>
            <p className="mb-4">Execute no terminal após instalar o Ollama:</p>
            <code className="block p-4 bg-black rounded mb-4">
              ollama run deepseek-r1:8b
            </code>
          </div>

          <div className="bg-dark-surface p-6 rounded-lg border border-neon-blue">
            <h2 className="text-xl text-neon-blue mb-4">
              3. Iniciar o Serviço
            </h2>
            <p>Certifique-se que o Ollama está rodando localmente:</p>
            <code className="block p-4 bg-black rounded mt-2">
              ollama serve
            </code>
          </div>
        </div>
      </div>
    </div>
  );
}
