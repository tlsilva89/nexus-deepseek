import { useState, useRef, useEffect } from "react";
import {
  ArrowUpTrayIcon,
  ArrowDownTrayIcon,
} from "@heroicons/react/24/outline";
import { MySwal } from "../utils/sweetAlertConfig";
import ChatMessage from "../components/ChatMessage";
import FileUpload from "../components/FileUpload";

interface ChatMessageType {
  text: string;
  isUser: boolean;
  timestamp: string;
  files: File[];
}

export default function ChatPage() {
  const [messages, setMessages] = useState<ChatMessageType[]>([]);
  const [input, setInput] = useState("");
  const [files, setFiles] = useState<File[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Efeito para rolagem automática
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Ajusta altura do textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [input]);

  const handleSend = async () => {
    if (!input.trim() && files.length === 0) return;

    // Mensagem do usuário
    const userMessage: ChatMessageType = {
      text: input,
      isUser: true,
      timestamp: new Date().toISOString(),
      files: [...files],
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setFiles([]);

    try {
      // Mensagem do assistente (placeholder)
      let assistantMessage: ChatMessageType = {
        text: "",
        isUser: false,
        timestamp: new Date().toISOString(),
        files: [],
      };

      // Simulação de resposta assíncrona
      setMessages((prev) => [...prev, assistantMessage]);

      // Requisição para API do Ollama
      const response = await fetch("http://localhost:11434/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "deepseek-r1:8b",
          prompt: input,
          files: files.map((f) => f.name),
        }),
      });

      if (!response.body) throw new Error("Erro na conexão com o servidor");

      const reader = response.body.getReader();
      const decoder = new TextDecoder();

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value, { stream: true });
        assistantMessage = {
          ...assistantMessage,
          text: assistantMessage.text + chunk,
        };

        // Atualização otimizada do estado
        setMessages((prev) => {
          const lastMessage = prev[prev.length - 1];
          return lastMessage.isUser
            ? [...prev.slice(0, -1), assistantMessage]
            : [...prev.slice(0, -1), { ...assistantMessage }];
        });
      }
    } catch (error) {
      setMessages((prev) => prev.slice(0, -1)); // Remove mensagem de carregamento
      MySwal.fire({
        icon: "error",
        title: "Erro na conexão",
        text: error instanceof Error ? error.message : "Erro desconhecido",
        background: "#0a0a0f",
        color: "#e5e7eb",
      });
    }
  };

  const handleExport = async () => {
    const { value: fileName } = await MySwal.fire({
      title: <span className="text-neon-purple">Exportar Conversa</span>,
      html: (
        <input
          type="text"
          className="mt-1 w-full bg-dark-surface text-gray-200 rounded p-2 border border-neon-purple focus:outline-none focus:ring-2 focus:ring-neon-blue"
          placeholder="Nome do arquivo"
          autoFocus
        />
      ),
      showCancelButton: true,
      confirmButtonText: "Exportar",
      cancelButtonText: "Cancelar",
      background: "#0a0a0f",
      preConfirm: () => {
        const input = document.querySelector(
          ".swal2-input"
        ) as HTMLInputElement;
        return (
          input?.value || `conversa-${new Date().toISOString().slice(0, 10)}`
        );
      },
    });

    if (fileName) {
      const data = {
        messages,
        metadata: {
          exportedAt: new Date().toISOString(),
          model: "deepseek-r1:8b",
        },
      };

      // Cria e dispara download
      const blob = new Blob([JSON.stringify(data, null, 2)], {
        type: "application/json",
      });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `${fileName}.json`;
      link.click();
      URL.revokeObjectURL(url);

      MySwal.fire({
        icon: "success",
        title: "Exportação concluída!",
        html: `<div class="text-gray-300">Arquivo: <span class="text-neon-blue">${fileName}.json</span></div>`,
        background: "#0a0a0f",
      });
    }
  };

  const handleImport = async () => {
    const { value: file } = await MySwal.fire({
      title: <span className="text-neon-blue">Importar Conversa</span>,
      html: (
        <input
          type="file"
          className="mt-1 w-full bg-dark-surface text-gray-200 rounded p-2 border border-neon-blue focus:outline-none focus:ring-2 focus:ring-neon-purple"
          accept=".json"
        />
      ),
      showCancelButton: true,
      confirmButtonText: "Importar",
      cancelButtonText: "Cancelar",
      background: "#0a0a0f",
      preConfirm: () => {
        const input = document.querySelector(".swal2-file") as HTMLInputElement;
        return input?.files?.[0];
      },
    });

    if (file) {
      try {
        const reader = new FileReader();
        reader.onload = (e) => {
          const data = JSON.parse(e.target?.result as string);
          if (data.messages && Array.isArray(data.messages)) {
            setMessages(data.messages);
            MySwal.fire({
              icon: "success",
              title: "Importação concluída!",
              timer: 2000,
              background: "#0a0a0f",
              showConfirmButton: false,
            });
          } else {
            throw new Error("Formato de arquivo inválido");
          }
        };
        reader.readAsText(file);
      } catch (error) {
        MySwal.fire({
          icon: "error",
          title: "Erro na importação",
          text: error instanceof Error ? error.message : "Arquivo corrompido",
          background: "#0a0a0f",
        });
      }
    }
  };

  return (
    <div className="min-h-screen bg-dark-bg text-gray-200 font-main flex flex-col">
      {/* Cabeçalho */}
      <nav className="bg-dark-surface p-4 flex justify-between items-center sticky top-0 z-50 shadow-lg">
        <h1 className="text-2xl font-tech text-neon-purple tracking-wider">
          Nexus DeepSeek
        </h1>

        <div className="flex gap-6">
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

      {/* Área de mensagens */}
      <main className="flex-1 container mx-auto px-4 py-6 max-w-5xl overflow-hidden flex flex-col">
        <div className="flex-1 overflow-y-auto mb-6 scrollbar-thin scrollbar-thumb-neon-purple scrollbar-track-dark-surface">
          {messages.map((message, index) => (
            <ChatMessage
              key={`msg-${index}-${message.timestamp}`}
              message={message}
            />
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* Área de input */}
        <div className="border-2 border-neon-purple/30 rounded-xl bg-dark-surface p-4 shadow-xl">
          <FileUpload files={files} setFiles={setFiles} />

          <div className="relative">
            <textarea
              ref={textareaRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Digite sua consulta..."
              className="w-full bg-transparent resize-none outline-none placeholder-gray-400 pr-16"
              rows={1}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  handleSend();
                }
              }}
            />

            <button
              onClick={handleSend}
              disabled={!input.trim() && files.length === 0}
              className="absolute bottom-2 right-2 bg-neon-purple hover:bg-neon-blue disabled:opacity-50 disabled:cursor-not-allowed text-white p-2 rounded-lg transition-all"
              aria-label="Enviar mensagem"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                />
              </svg>
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
