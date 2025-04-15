import { useState, useEffect } from "react";
import { ClipboardDocumentIcon } from "@heroicons/react/24/outline";
import { FaGithub } from "react-icons/fa";

export default function SetupGuide() {
  const [selectedOS, setSelectedOS] = useState<"linux" | "windows" | "macos">(
    "linux"
  );
  const [copiedCommand, setCopiedCommand] = useState<string | null>(null);

  const copyToClipboard = async (command: string) => {
    await navigator.clipboard.writeText(command);
    setCopiedCommand(command);
  };

  useEffect(() => {
    if (copiedCommand) {
      const timer = setTimeout(() => setCopiedCommand(null), 2000);
      return () => clearTimeout(timer);
    }
  }, [copiedCommand]);

  const CodeBlock = ({ command }: { command: string }) => (
    <div className="relative group">
      <code
        className="block p-4 bg-black rounded mb-4 font-code animate-text-gradient cursor-pointer pr-10"
        onClick={() => copyToClipboard(command)}
      >
        {command}
        <ClipboardDocumentIcon
          className="h-5 w-5 text-neon-purple absolute right-3 top-3 opacity-50 group-hover:opacity-100 transition-opacity"
          onClick={() => copyToClipboard(command)}
        />
        {copiedCommand === command && (
          <span className="absolute right-2 top-2 text-sm text-neon-blue">
            ✓ Copiado!
          </span>
        )}
      </code>
    </div>
  );

  return (
    <div className="min-h-screen bg-dark-bg text-gray-200 p-8 font-main">
      <div className="max-w-5xl mx-auto">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-tech text-transparent bg-clip-text bg-gradient-to-r from-neon-purple to-neon-blue mb-6">
            Nexus DeepSeek
          </h1>
          <p className="text-xl text-neon-blue/90 mb-8">
            Execute modelos de linguagem avançados localmente com poder total e
            privacidade
          </p>

          <div className="flex justify-center gap-4 mb-12">
            <a
              href="/chat"
              className="bg-gradient-to-r from-neon-purple to-neon-blue hover:from-neon-blue hover:to-neon-purple text-white py-3 px-8 rounded-full transition-all duration-300 shadow-lg shadow-neon-purple/20 flex items-center gap-2"
            >
              Acessar o Chat
              <span className="text-xl animate-pulse">→</span>
            </a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <div className="bg-dark-surface p-6 rounded-lg border border-neon-purple/20 hover:border-neon-blue transition-all">
              <h3 className="text-neon-blue text-lg font-tech mb-2">
                ⚡ Performance
              </h3>
              <p className="text-sm">Utilização eficiente de recursos locais</p>
            </div>
            <div className="bg-dark-surface p-6 rounded-lg border border-neon-purple/20 hover:border-neon-blue transition-all">
              <h3 className="text-neon-blue text-lg font-tech mb-2">
                🔒 Privacidade Total
              </h3>
              <p className="text-sm">Seus dados nunca deixam seu computador</p>
            </div>
            <div className="bg-dark-surface p-6 rounded-lg border border-neon-purple/20 hover:border-neon-blue transition-all">
              <h3 className="text-neon-blue text-lg font-tech mb-2">
                💻 Multiplataforma
              </h3>
              <p className="text-sm">
                Suporte completo para Windows, Linux e macOS
              </p>
            </div>
          </div>
        </div>

        {/* Requisitos Mínimos */}
        <div className="bg-dark-surface rounded-lg border border-neon-purple p-6 mb-12 neon-glow">
          <h2 className="text-2xl font-tech text-neon-purple mb-6">
            Requisitos Mínimos
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-4 border border-neon-blue/30 rounded">
              <div className="text-neon-blue text-3xl mb-2">💻</div>
              <h3 className="font-tech">Sistema Operacional</h3>
              <p className="text-sm">
                Windows 10+
                <br />
                Linux x86_64
                <br />
                macOS 12+
              </p>
            </div>
            <div className="text-center p-4 border border-neon-blue/30 rounded">
              <div className="text-neon-blue text-3xl mb-2">🧠</div>
              <h3 className="font-tech">Memória RAM</h3>
              <p className="text-sm">
                16GB+
                <br />
                (8GB para uso básico)
              </p>
            </div>
            <div className="text-center p-4 border border-neon-blue/30 rounded">
              <div className="text-neon-blue text-3xl mb-2">💾</div>
              <h3 className="font-tech">Armazenamento</h3>
              <p className="text-sm">
                10GB+ livre
                <br />
                (SSD recomendado)
              </p>
            </div>
            <div className="text-center p-4 border border-neon-blue/30 rounded">
              <div className="text-neon-blue text-3xl mb-2">🔌</div>
              <h3 className="font-tech">Conexão</h3>
              <p className="text-sm">
                Internet apenas para
                <br />
                download inicial
              </p>
            </div>
          </div>
        </div>

        {/* Guia de Instalação */}
        <div className="space-y-12">
          {/* Seleção de OS */}
          <div className="flex gap-4 justify-center mb-8">
            {(["linux", "macos", "windows"] as const).map((os) => (
              <button
                key={os}
                onClick={() => setSelectedOS(os)}
                className={`px-6 py-3 rounded-full font-tech transition-all ${
                  selectedOS === os
                    ? "bg-gradient-to-r from-neon-purple to-neon-blue text-white"
                    : "border border-neon-purple/50 hover:border-neon-blue"
                }`}
              >
                {os === "linux" && "🐧 Linux"}
                {os === "macos" && "🍎 macOS"}
                {os === "windows" && "🪟 Windows"}
              </button>
            ))}
          </div>

          {/* Conteúdo Específico por OS */}
          <div className="bg-dark-surface p-8 rounded-lg border border-neon-blue neon-glow">
            {selectedOS === "linux" && (
              <>
                <h3 className="text-xl font-tech text-neon-blue mb-4">
                  Instalação no Linux
                </h3>
                <CodeBlock command="curl -fsSL https://ollama.ai/install.sh | sh" />
                <p className="text-sm text-neon-blue/80 mb-4">
                  * Requer permissões de administrador (sudo)
                </p>
              </>
            )}

            {selectedOS === "macos" && (
              <>
                <h3 className="text-xl font-tech text-neon-blue mb-4">
                  Instalação no macOS
                </h3>
                <CodeBlock command="brew install ollama" />
                <p className="text-sm text-neon-blue/80 mb-4">
                  🍺 Requer Homebrew instalado
                </p>
                <p className="text-sm text-neon-purple/80">
                  Ou baixe o instalador manual:{" "}
                  <a
                    href="https://ollama.ai/download/mac"
                    className="text-neon-blue hover:underline ml-2"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Download para macOS
                  </a>
                </p>
              </>
            )}

            {selectedOS === "windows" && (
              <>
                <h3 className="text-xl font-tech text-neon-blue mb-4">
                  Instalação no Windows
                </h3>
                <div className="space-y-4">
                  <p>1. Baixe o instalador:</p>
                  <a
                    href="https://ollama.com/download/windows"
                    className="inline-block bg-neon-purple/20 hover:bg-neon-purple/30 border border-neon-purple px-6 py-2 rounded transition-all cursor-pointer"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    📥 Baixar Ollama para Windows
                  </a>
                  <p>2. Execute o arquivo .exe</p>
                  <p>3. Permita acesso na firewall</p>
                  <p className="text-sm text-neon-blue/80">
                    * Requer Windows 10/11 64-bit
                  </p>
                </div>
              </>
            )}
          </div>

          {/* Passos Comuns */}
          <div className="space-y-6">
            <div className="bg-dark-surface p-6 rounded-lg border border-neon-purple neon-glow">
              <h2 className="text-xl font-tech text-neon-purple mb-4">
                ▶ Inicialização do Modelo
              </h2>
              <CodeBlock command="ollama run deepseek-r1:8b" />
              <p className="text-sm text-neon-purple/80">
                ⏳ A primeira execução baixará ~5GB de dados
              </p>
            </div>

            <div className="bg-dark-surface p-6 rounded-lg border border-neon-blue neon-glow">
              <h2 className="text-xl font-tech text-neon-blue mb-4">
                🚀 Iniciar Serviço
              </h2>
              <CodeBlock command="ollama serve" />
              <div className="flex items-center gap-2 text-sm text-neon-blue/80">
                <span className="animate-pulse">⚠️</span>
                <span>Mantenha o terminal aberto durante o uso</span>
              </div>
            </div>
          </div>

          {/* Validação */}
          <div className="bg-dark-surface/50 p-6 rounded-lg border border-neon-purple text-center">
            <h3 className="text-lg font-tech text-neon-purple mb-4">
              Valide sua Instalação
            </h3>
            <CodeBlock command="curl http://localhost:11434" />
            <p className="text-sm text-neon-blue/80">
              Resposta esperada: "Ollama is running"
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-12 text-center border-t border-neon-purple/20 pt-8">
          <div className="flex flex-col items-center gap-2">
            <p className="text-neon-blue/80">Desenvolvido por Digital Spark</p>
            <a
              href="https://github.com/seu-usuario/seu-repositorio"
              className="text-neon-purple hover:text-neon-blue transition-colors flex items-center gap-2"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaGithub className="h-6 w-6" />
              Confira o repositório
            </a>
          </div>
        </div>
      </div>

      {/* Notificação de cópia */}
      {copiedCommand && (
        <div className="fixed bottom-4 right-4 bg-neon-purple/90 text-white px-4 py-2 rounded-lg animate-fadeInOut">
          Comando copiado para a área de transferência!
        </div>
      )}
    </div>
  );
}
