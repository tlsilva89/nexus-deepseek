import { useCallback } from "react";
import { PaperClipIcon } from "@heroicons/react/24/outline";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { materialDark } from "react-syntax-highlighter/dist/cjs/styles/prism";
import remarkGfm from "remark-gfm";
import { MySwal } from "../utils/sweetAlertConfig";

interface ChatMessageProps {
  message: {
    text: string;
    isUser: boolean;
    timestamp: string;
    files: File[];
  };
}

export default function ChatMessage({ message }: ChatMessageProps) {
  const handleCopyCode = useCallback((code: string) => {
    navigator.clipboard.writeText(code).then(() => {
      MySwal.fire({
        icon: "success",
        title: "Código copiado!",
        showConfirmButton: false,
        timer: 2000,
        background: "#1a1b26",
        color: "#a9b4d2",
      });
    });
  }, []);

  return (
    <div
      className={`flex ${
        message.isUser ? "justify-end" : "justify-start"
      } mb-4`}
    >
      <div
        className={`max-w-[85%] rounded-2xl p-4 ${
          message.isUser
            ? "bg-neon-purple/20 border border-neon-purple"
            : "bg-dark-surface/80 border border-neon-blue"
        }`}
      >
        {message.files.length > 0 && (
          <div className="mb-3 space-y-2">
            {message.files.map((file, index) => (
              <div
                key={index}
                className="flex items-center text-sm text-gray-300"
              >
                <PaperClipIcon className="h-4 w-4 mr-2 text-neon-blue" />
                <span className="truncate">{file.name}</span>
              </div>
            ))}
          </div>
        )}

        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          components={{
            code({ inline, className, children, ...props }) {
              const match = /language-(\w+)/.exec(className || "");
              const code = String(children).replace(/\n$/, "");

              return !inline && match ? (
                <div className="relative group">
                  <div className="absolute right-2 top-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                      onClick={() => handleCopyCode(code)}
                      className="bg-neon-purple/80 hover:bg-neon-purple text-white px-3 py-1 rounded text-sm"
                    >
                      Copiar
                    </button>
                  </div>
                  <SyntaxHighlighter
                    style={
                      materialDark as unknown as Record<
                        string,
                        React.CSSProperties
                      >
                    }
                    language={match[1]}
                    PreTag="div"
                    {...props}
                  >
                    {code}
                  </SyntaxHighlighter>
                </div>
              ) : (
                <code
                  className="bg-gray-800 px-2 py-1 rounded text-sm"
                  {...props}
                >
                  {children}
                </code>
              );
            },
            h1: ({ children, ...props }) => (
              <h1 className="text-2xl font-bold mb-4 text-neon-blue" {...props}>
                {children}
              </h1>
            ),
            h2: ({ children, ...props }) => (
              <h2
                className="text-xl font-semibold mb-3 text-neon-purple"
                {...props}
              >
                {children}
              </h2>
            ),
            h3: ({ children, ...props }) => (
              <h3
                className="text-lg font-medium mb-2 text-neon-green"
                {...props}
              >
                {children}
              </h3>
            ),
            a: ({ children, ...props }) => (
              <a
                className="text-neon-blue underline hover:text-neon-purple"
                target="_blank"
                rel="noopener noreferrer"
                {...props}
              >
                {children}
              </a>
            ),
            ul: ({ children, ...props }) => (
              <ul className="list-disc pl-6 mb-4" {...props}>
                {children}
              </ul>
            ),
            ol: ({ children, ...props }) => (
              <ol className="list-decimal pl-6 mb-4" {...props}>
                {children}
              </ol>
            ),
            blockquote: ({ children, ...props }) => (
              <blockquote
                className="border-l-4 border-neon-purple pl-4 my-4 text-gray-300"
                {...props}
              >
                {children}
              </blockquote>
            ),
          }}
          className="prose prose-invert max-w-none"
        >
          {message.text}
        </ReactMarkdown>

        <div className="mt-2 text-xs text-gray-400 text-right">
          {new Date(message.timestamp).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </div>
      </div>
    </div>
  );
}
