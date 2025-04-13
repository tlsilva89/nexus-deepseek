import { PaperClipIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { ChangeEvent } from "react";

interface FileUploadProps {
  files: File[];
  setFiles: React.Dispatch<React.SetStateAction<File[]>>;
}

export default function FileUpload({ files, setFiles }: FileUploadProps) {
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFiles((prev) => [...prev, ...Array.from(e.target.files!)]);
    }
  };

  const removeFile = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="mb-4">
      <label className="flex items-center gap-2 text-neon-blue cursor-pointer hover:text-neon-purple transition-colors">
        <PaperClipIcon className="h-5 w-5" />
        <span>Anexar arquivos</span>
        <input
          type="file"
          multiple
          onChange={handleFileChange}
          className="hidden"
          aria-label="Selecionar arquivos"
        />
      </label>

      <div className="flex flex-wrap gap-2 mt-2">
        {files.map((file, index) => (
          <div
            key={index}
            className="flex items-center bg-dark-surface px-3 py-1.5 rounded-lg border border-neon-purple/30"
          >
            <span className="text-sm text-gray-300">{file.name}</span>
            <button
              onClick={() => removeFile(index)}
              className="ml-2 p-1 hover:bg-dark-bg rounded-full"
              aria-label="Remover arquivo"
            >
              <XMarkIcon className="h-4 w-4 text-red-400 hover:text-red-300" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
