declare module "@/components/ChatMessage" {
  import { FC } from "react";
  interface ChatMessageProps {
    message: {
      text: string;
      isUser: boolean;
      timestamp: string;
      files: File[];
    };
  }
  const ChatMessage: FC<ChatMessageProps>;
  export default ChatMessage;
}

declare module "@/components/FileUpload" {
  import { FC, Dispatch, SetStateAction } from "react";
  interface FileUploadProps {
    files: File[];
    setFiles: Dispatch<SetStateAction<File[]>>;
  }
  const FileUpload: FC<FileUploadProps>;
  export default FileUpload;
}
