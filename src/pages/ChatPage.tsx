import { useState, useRef, useEffect } from "react";
import {
  ArrowUpTrayIcon,
  ArrowDownTrayIcon,
  Cog6ToothIcon,
} from "@heroicons/react/24/outline";
import { MySwal } from "../utils/sweetAlertConfig";
import ChatMessage from "../components/ChatMessage";
import FileUpload from "../components/FileUpload";
import { generateResponse } from "../api/ollama";

interface ChatMessageType {
  text: string;
  isUser: boolean;
  timestamp: string;
  files: File[];
}

interface ChatExport {
  version: string;
  messages: ChatMessageType[];
}

export default function ChatPage() {
  const [messages, setMessages] = useState<ChatMessageType[]>([]);
  const [input, setInput] = useState("");
  const [files, setFiles] = useState<File[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
      });
    }
  }, [messages]);

  const handleSend = async () => {
    if ((!input.trim() && files.length === 0) || isLoading) return;

    try {
      const fileContents = await Promise.all(
        files.map(async (file) => {
          try {
            return `\n[Arquivo: ${file.name}]\n${await file.text()}`;
          } catch (error) {
            console.error("Erro na leitura do arquivo:", error);
            return `\n[Erro: Não foi possível ler o arquivo ${file.name}]`;
          }
        })
      );

      const fullPrompt = [
        input,
        ...(fileContents.length > 0
          ? ["\n\nDocumentos anexados:", ...fileContents]
          : []),
      ].join("\n");

      setMessages((prev) => [
        ...prev,
        {
          text: input,
          isUser: true,
          timestamp: new Date().toISOString(),
          files: [...files],
        },
      ]);

      setInput("");
      setFiles([]);
      setIsLoading(true);

      const response = await generateResponse({
        model: "deepseek-r1:8b",
        prompt: fullPrompt,
        stream: false,
      });

      setMessages((prev) => [
        ...prev,
        {
          text: response.response,
          isUser: false,
          timestamp: new Date().toISOString(),
          files: [],
        },
      ]);
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Erro desconhecido";

      console.error("Erro na comunicação com a IA:", error);
      MySwal.fire({
        icon: "error",
        title: "Falha na geração de resposta",
        html: `
          <div class="text-left">
            <p class="text-red-300">${errorMessage}</p>
            <ul class="list-disc pl-6 mt-4">
              <li>Verifique a conexão com o servidor Ollama</li>
              <li>Confira se o modelo está instalado</li>
              <li>Tente novamente mais tarde</li>
            </ul>
          </div>
        `,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleExport = () => {
    try {
      const exportData: ChatExport = {
        version: "1.0",
        messages: messages.map((msg) => ({
          ...msg,
          files: [],
        })),
      };

      const blob = new Blob([JSON.stringify(exportData, null, 2)], {
        type: "application/json",
      });
      const url = URL.createObjectURL(blob);

      const a = document.createElement("a");
      a.href = url;
      a.download = `nexus-chat-${new Date()
        .toISOString()
        .replace(/[:.]/g, "-")}.json`;
      document.body.appendChild(a);
      a.click();

      URL.revokeObjectURL(url);
      document.body.removeChild(a);

      MySwal.fire({
        icon: "success",
        title: "Conversa exportada!",
        html: `
          <div class="text-center">
            <p class="text-neon-blue">${messages.length} mensagens salvas</p>
            <p class="text-sm text-neon-purple/80 mt-2">Arquivo baixado automaticamente</p>
          </div>
        `,
        timer: 3000,
      });
    } catch (error) {
      MySwal.fire({
        icon: "error",
        title: "Erro na exportação",
        text: "Não foi possível salvar a conversa",
      });
    }
  };

  const handleImport = () => {
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
      fileInputRef.current.click();
    }
  };

  const handleFileImport = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const reader = new FileReader();
      reader.onload = async (e) => {
        const result = e.target?.result;
        if (typeof result === "string") {
          const data: ChatExport = JSON.parse(result);

          if (
            !data.version ||
            !data.messages ||
            !Array.isArray(data.messages)
          ) {
            throw new Error("Formato de arquivo inválido");
          }

          setMessages(data.messages);
          MySwal.fire({
            icon: "success",
            title: "Conversa importada!",
            html: `
              <div class="text-center">
                <p class="text-neon-blue">${data.messages.length} mensagens carregadas</p>
                <p class="text-sm text-neon-purple/80 mt-2">Pronto para continuar o diálogo</p>
              </div>
            `,
            timer: 3000,
          });
        }
      };
      reader.onerror = () => {
        throw new Error("Erro na leitura do arquivo");
      };
      reader.readAsText(file);
    } catch (error) {
      MySwal.fire({
        icon: "error",
        title: "Falha na importação",
        html: `
          <div class="text-left">
            <p class="text-red-300">${
              error instanceof Error ? error.message : "Erro desconhecido"
            }</p>
            <ul class="list-disc pl-6 mt-4 text-sm">
              <li>Verifique se o arquivo é válido</li>
              <li>Certifique-se que foi exportado desta aplicação</li>
              <li>Tente novamente</li>
            </ul>
          </div>
        `,
      });
    }
  };

  return (
    <div className="min-h-screen bg-dark-bg text-gray-200 font-main flex flex-col">
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileImport}
        accept=".json"
        className="hidden"
        aria-label="Importar conversa"
      />

      <nav className="bg-dark-surface p-4 flex justify-between items-center sticky top-0 z-50 shadow-xl border-b border-neon-purple/20">
        <h1 className="text-2xl font-tech text-neon-purple tracking-wider">
          <span className="text-neon-blue">Nexus</span> DeepSeek
        </h1>

        <div className="flex gap-6">
          <a
            href="/setup"
            className="flex items-center gap-2 hover:text-neon-blue transition-colors group"
            aria-label="Configurações"
          >
            <Cog6ToothIcon className="h-6 w-6 group-hover:animate-spin-slow" />
            <span className="hidden md:inline">Configurações</span>
          </a>

          <button
            onClick={handleExport}
            className="flex items-center gap-2 hover:text-neon-blue transition-colors group"
            aria-label="Exportar conversa"
          >
            <ArrowUpTrayIcon className="h-6 w-6 group-hover:animate-bounce" />
            <span className="hidden md:inline">Exportar</span>
          </button>

          <button
            onClick={handleImport}
            className="flex items-center gap-2 hover:text-neon-purple transition-colors group"
            aria-label="Importar conversa"
          >
            <ArrowDownTrayIcon className="h-6 w-6 group-hover:animate-pulse" />
            <span className="hidden md:inline">Importar</span>
          </button>
        </div>
      </nav>

      <main className="flex-1 container mx-auto px-4 py-6 max-w-5xl flex flex-col">
        <div className="flex-1 overflow-y-auto mb-6 scrollbar-thin scrollbar-thumb-neon-purple/50 scrollbar-track-dark-surface/30">
          {messages.map((message, index) => (
            <ChatMessage
              key={`${message.timestamp}-${index}`}
              message={message}
            />
          ))}
          <div ref={messagesEndRef} />
        </div>

        <div className="border-2 border-neon-purple/30 rounded-xl bg-dark-surface/95 p-4 shadow-2xl backdrop-blur-sm">
          <FileUpload files={files} setFiles={setFiles} />

          <div className="relative">
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Digite sua consulta ou instrução..."
              className="w-full bg-transparent resize-none outline-none placeholder-gray-400/70 pr-20 focus:ring-2 focus:ring-neon-blue rounded-lg p-3"
              rows={3}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey && !isLoading) {
                  e.preventDefault();
                  handleSend();
                }
              }}
              disabled={isLoading}
            />

            <button
              onClick={handleSend}
              disabled={isLoading}
              className="absolute bottom-3 right-3 bg-gradient-to-r from-neon-purple to-neon-blue hover:from-neon-blue hover:to-neon-purple disabled:opacity-50 disabled:cursor-not-allowed text-white py-2 px-6 rounded-full transition-all duration-300 shadow-lg shadow-neon-purple/20"
            >
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <span className="animate-pulse">Processando</span>
                  <div className="animate-spin rounded-full h-4 w-4 border-2 border-t-transparent border-white"></div>
                </div>
              ) : (
                <>
                  Enviar
                  <span className="ml-2 opacity-70 text-sm">⏎</span>
                </>
              )}
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
