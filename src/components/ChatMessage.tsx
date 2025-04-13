import { PaperClipIcon } from "@heroicons/react/24/outline";

interface ChatMessageProps {
  message: {
    text: string;
    isUser: boolean;
    timestamp: string;
    files: File[];
  };
}

export default function ChatMessage({ message }: ChatMessageProps) {
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
        <p className="whitespace-pre-wrap text-gray-100">{message.text}</p>
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
