import { useState, useEffect } from "react";
import {
  ClipboardDocumentIcon,
  CpuChipIcon,
  CommandLineIcon,
  CheckCircleIcon,
  ArrowDownTrayIcon,
  BeakerIcon,
  ShieldCheckIcon,
} from "@heroicons/react/24/outline";
import { FaGithub, FaWindows, FaLinux, FaApple } from "react-icons/fa";
import { RiTerminalLine } from "react-icons/ri";

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
      <div className="relative">
        <code
          className="block p-4 bg-black/80 rounded-lg mb-4 font-code text-neon-text border border-neon-purple/30 
            hover:border-neon-blue transition-all cursor-pointer pr-10 select-text neon-glow"
          onClick={() => copyToClipboard(command)}
        >
          <RiTerminalLine className="h-5 w-5 text-neon-blue inline-block mr-2" />
          {command}
        </code>
        <ClipboardDocumentIcon
          className="h-5 w-5 text-neon-purple absolute right-3 top-3 opacity-50 group-hover:opacity-100 
            transition-opacity cursor-pointer hover:text-neon-blue"
          onClick={(e) => {
            e.stopPropagation();
            copyToClipboard(command);
          }}
        />
        {copiedCommand === command && (
          <span className="absolute right-2 top-2 text-sm text-neon-blue flex items-center gap-1">
            <CheckCircleIcon className="h-4 w-4" /> Copiado!
          </span>
        )}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-dark-bg text-gray-200 p-8 font-main select-auto">
      <div className="max-w-5xl mx-auto">
        {/* Seção Hero */}
        <div className="text-center mb-16 animate-fadeIn">
          <div className="inline-block bg-gradient-to-r from-neon-purple to-neon-blue p-1 rounded-full mb-8">
            <div className="bg-dark-bg rounded-full px-8 py-4">
              <h1
                className="text-5xl font-tech text-transparent bg-clip-text bg-gradient-to-r 
                from-neon-purple to-neon-blue mb-4"
              >
                Nexus DeepSeek
              </h1>
              <p className="text-xl text-neon-blue/90 max-w-2xl mx-auto">
                Plataforma avançada para execução local de modelos de linguagem
                com privacidade total e controle completo
              </p>
            </div>
          </div>

          <div className="flex justify-center gap-4 mb-12">
            <a
              href="/chat"
              className="bg-gradient-to-r from-neon-purple to-neon-blue hover:from-neon-blue hover:to-neon-purple 
                text-white py-3 px-8 rounded-full transition-all duration-300 shadow-xl shadow-neon-purple/30 
                flex items-center gap-2 hover:scale-105 group"
            >
              <CommandLineIcon className="h-5 w-5 group-hover:animate-pulse" />
              Iniciar Experiência
              <span className="text-xl animate-bounce">→</span>
            </a>
          </div>
        </div>

        {/* Pré-requisitos */}
        <div className="mb-20">
          <h2 className="text-3xl font-tech text-neon-blue mb-8 flex items-center gap-3">
            <ShieldCheckIcon className="h-8 w-8 text-neon-purple" />
            Pré-requisitos do Sistema
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: CpuChipIcon,
                title: "Hardware",
                content:
                  "CPU moderno (4+ núcleos), 8GB+ RAM, 10GB+ espaço livre",
              },
              {
                icon: BeakerIcon,
                title: "Software",
                content: "Docker ou WSL2 (Windows), Terminal moderno",
              },
              {
                icon: ArrowDownTrayIcon,
                title: "Conexão",
                content: "Internet estável para download dos modelos",
              },
            ].map((item, index) => (
              <div
                key={index}
                className="bg-dark-surface p-6 rounded-xl border border-neon-purple/20 
                  hover:border-neon-blue transition-all group"
              >
                <item.icon className="h-10 w-10 text-neon-blue mb-4" />
                <h3 className="text-xl font-tech text-neon-purple mb-2">
                  {item.title}
                </h3>
                <p className="text-sm text-neon-text/80">{item.content}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Guia de Instalação */}
        <div className="space-y-12">
          <h2 className="text-3xl font-tech text-neon-blue mb-8 flex items-center gap-3">
            <ArrowDownTrayIcon className="h-8 w-8 text-neon-purple" />
            Guia de Instalação
          </h2>

          {/* Seleção de OS */}
          <div className="flex gap-4 justify-center mb-8 flex-wrap">
            {(
              [
                { os: "linux", icon: FaLinux },
                { os: "macos", icon: FaApple },
                { os: "windows", icon: FaWindows },
              ] as const
            ).map(({ os, icon: Icon }) => (
              <button
                key={os}
                onClick={() => setSelectedOS(os)}
                className={`px-6 py-3 rounded-xl font-tech transition-all flex items-center gap-2
                  ${
                    selectedOS === os
                      ? "bg-gradient-to-r from-neon-purple to-neon-blue text-white shadow-neon-purple/50"
                      : "border border-neon-purple/50 hover:border-neon-blue hover:text-neon-blue"
                  } hover:scale-105 active:scale-95`}
              >
                <Icon className="h-5 w-5" />
                {os === "linux" && "Linux"}
                {os === "macos" && "macOS"}
                {os === "windows" && "Windows"}
              </button>
            ))}
          </div>

          {/* Conteúdo Específico por OS */}
          <div className="bg-dark-surface p-8 rounded-xl border border-neon-blue neon-glow">
            {selectedOS === "linux" && (
              <div className="space-y-6">
                <h3 className="text-2xl font-tech text-neon-blue mb-4 flex items-center gap-2">
                  <FaLinux className="h-6 w-6" />
                  Instalação no Linux
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center gap-2 text-neon-text/80">
                    <span className="w-6 h-6 bg-neon-purple/20 rounded-full flex items-center justify-center">
                      1
                    </span>
                    <p>Instalação via terminal:</p>
                  </div>
                  <CodeBlock command="curl -fsSL https://ollama.ai/install.sh | sh" />
                  <div className="flex items-center gap-2 text-neon-text/80 ml-8">
                    <ShieldCheckIcon className="h-4 w-4 text-neon-blue" />
                    <span className="text-sm">
                      Requer privilégios de administrador (sudo)
                    </span>
                  </div>
                </div>
              </div>
            )}

            {selectedOS === "macos" && (
              <div className="space-y-6">
                <h3 className="text-2xl font-tech text-neon-blue mb-4 flex items-center gap-2">
                  <FaApple className="h-6 w-6" />
                  Instalação no macOS
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center gap-2 text-neon-text/80">
                    <span className="w-6 h-6 bg-neon-purple/20 rounded-full flex items-center justify-center">
                      1
                    </span>
                    <p>Instalação via Homebrew:</p>
                  </div>
                  <CodeBlock command="brew install ollama" />
                  <div className="flex items-center gap-2 text-neon-text/80 ml-8">
                    <BeakerIcon className="h-4 w-4 text-neon-blue" />
                    <span className="text-sm">Requer Homebrew instalado</span>
                  </div>
                  <div className="flex items-center gap-2 text-neon-text/80">
                    <span className="w-6 h-6 bg-neon-purple/20 rounded-full flex items-center justify-center">
                      2
                    </span>
                    <p>Ou faça o download manual:</p>
                  </div>
                  <a
                    href="https://ollama.com/download/Ollama-darwin.zip"
                    className="inline-flex items-center gap-2 bg-neon-purple/20 hover:bg-neon-purple/30 
                      border border-neon-purple px-6 py-3 rounded-lg transition-all cursor-pointer 
                      hover:scale-[1.02] active:scale-95 relative z-10"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <ArrowDownTrayIcon className="h-5 w-5 text-neon-blue" />
                    <span>Download para macOS</span>
                  </a>
                </div>
              </div>
            )}

            {selectedOS === "windows" && (
              <div className="space-y-6">
                <h3 className="text-2xl font-tech text-neon-blue mb-4 flex items-center gap-2">
                  <FaWindows className="h-6 w-6" />
                  Instalação no Windows
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center gap-2 text-neon-text/80">
                    <span className="w-6 h-6 bg-neon-purple/20 rounded-full flex items-center justify-center">
                      1
                    </span>
                    <p>Baixe o instalador oficial:</p>
                  </div>
                  <a
                    href="https://ollama.com/download/OllamaSetup.exe"
                    className="inline-flex items-center gap-2 bg-gradient-to-r from-neon-purple to-neon-blue 
                      text-white px-6 py-3 rounded-lg transition-all cursor-pointer hover:scale-[1.02] 
                      active:scale-95 shadow-lg shadow-neon-purple/30 relative z-10"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    download="OllamaSetup.exe"
                  >
                    <ArrowDownTrayIcon className="h-5 w-5" />
                    <span>Baixar para Windows</span>
                  </a>

                  <div className="flex items-center gap-2 text-neon-text/80 mt-4">
                    <span className="w-6 h-6 bg-neon-purple/20 rounded-full flex items-center justify-center">
                      2
                    </span>
                    <p>Execute o instalador e siga as instruções</p>
                  </div>

                  <div className="flex items-center gap-2 text-neon-text/80">
                    <span className="w-6 h-6 bg-neon-purple/20 rounded-full flex items-center justify-center">
                      3
                    </span>
                    <p>Permita acesso na firewall quando solicitado</p>
                  </div>

                  <div className="ml-8 text-sm text-neon-blue/80 flex items-center gap-2">
                    <ShieldCheckIcon className="h-4 w-4" />
                    <span>Requer Windows 10/11 64-bit com WSL2 habilitado</span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Passos Comuns */}
          <div className="space-y-8">
            <div className="bg-dark-surface p-6 rounded-xl border border-neon-purple neon-glow">
              <h2 className="text-xl font-tech text-neon-purple mb-4 flex items-center gap-2">
                <RiTerminalLine className="h-5 w-5 text-neon-blue" />
                Inicialização do Modelo
              </h2>
              <CodeBlock command="ollama run deepseek-r1:8b" />
              <div className="flex items-center gap-2 text-sm text-neon-purple/80 ml-4">
                <span className="animate-pulse">⏳</span>
                <span>
                  A primeira execução baixará aproximadamente 5GB de dados
                </span>
              </div>
            </div>

            <div className="bg-dark-surface p-6 rounded-xl border border-neon-blue neon-glow">
              <h2 className="text-xl font-tech text-neon-blue mb-4 flex items-center gap-2">
                <CommandLineIcon className="h-5 w-5 text-neon-purple" />
                Iniciar Serviço
              </h2>
              <CodeBlock command="ollama serve" />
              <div className="flex items-center gap-2 text-sm text-neon-blue/80 ml-4">
                <span className="animate-pulse">⚠️</span>
                <span>Mantenha o terminal aberto durante o uso do serviço</span>
              </div>
            </div>
          </div>

          {/* Validação */}
          <div className="bg-dark-surface/50 p-6 rounded-xl border border-neon-purple text-center neon-glow">
            <h3 className="text-lg font-tech text-neon-purple mb-4 flex items-center gap-2 justify-center">
              <CheckCircleIcon className="h-5 w-5 text-neon-blue" />
              Validação da Instalação
            </h3>
            <CodeBlock command="curl http://localhost:11434" />
            <p className="text-sm text-neon-blue/80 mt-2">
              Resposta esperada: "Ollama is running"
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-16 text-center border-t border-neon-purple/20 pt-8">
          <div className="flex flex-col items-center gap-4">
            <p className="text-neon-blue/80 flex items-center gap-2">
              Desenvolvido com
              <span className="text-neon-purple animate-pulse">❤️</span>
              por{" "}
              <a href="https://digitalspark.dev/" target="_blank">
                Digital Spark
              </a>
            </p>
            <a
              href="https://github.com/tlsilva89/nexus-deepseek"
              className="text-neon-purple hover:text-neon-blue transition-colors flex items-center gap-2 
                hover:scale-105"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaGithub className="h-6 w-6" />
              Contribua no GitHub
            </a>
          </div>
        </div>
      </div>

      {/* Notificação de cópia */}
      {copiedCommand && (
        <div
          className="fixed bottom-4 right-4 bg-neon-purple/90 text-white px-4 py-2 rounded-lg animate-fadeInOut 
          select-none flex items-center gap-2 shadow-lg border border-neon-blue/30"
        >
          <CheckCircleIcon className="h-5 w-5" />
          Comando copiado!
        </div>
      )}
    </div>
  );
}
