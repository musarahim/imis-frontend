"use client";

import {
    PromptInput,
    PromptInputBody,
    PromptInputFooter,
    type PromptInputMessage,
    PromptInputProvider,
    PromptInputSubmit,
    PromptInputTextarea,
    PromptInputTools,
} from "@/components/ai-elements/prompt-input";
import { useRef } from "react";

export type ChatInputStatus = "submitted" | "streaming" | "ready" | "error";

type Props = {
  status: ChatInputStatus;
  onSubmit: (message: PromptInputMessage) => void;
};

function ChatInput({ status, onSubmit }: Props) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  return (
    <div className="size-full">
      <PromptInputProvider>
        <PromptInput globalDrop multiple onSubmit={onSubmit}>
          <PromptInputBody>
            <PromptInputTextarea ref={textareaRef} />
          </PromptInputBody>

          <PromptInputFooter>
            <PromptInputTools>{/* tools/buttons/etc */}</PromptInputTools>
            <PromptInputSubmit status={status} />
          </PromptInputFooter>
        </PromptInput>
      </PromptInputProvider>
    </div>
  );
}

export default ChatInput;
