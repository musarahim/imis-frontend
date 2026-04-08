"use client";

import { Message, MessageContent } from "@/components/ai-elements/message";
import type { PromptInputMessage } from "@/components/ai-elements/prompt-input";
import ChatInput, { type ChatInputStatus } from "@/components/forms/ChatInput"; // adjust path to where you placed the file
import {
    Conversation,
    ConversationContent,
    ConversationEmptyState,
    ConversationScrollButton,
} from "@/components/ui/conversation";
import {
    useCreateInterimChatMutation,
    useGetInterimChatMessagesQuery,
} from "@/redux/features/license-api-slice";
import { MessageSquareIcon } from "lucide-react";
import { nanoid } from "nanoid";
import { useEffect, useState } from "react";

const SUBMITTING_TIMEOUT = 200;
const STREAMING_TIMEOUT = 2000;

function Chat({ applicationId }: { applicationId: string }) {
  const [createMessage] = useCreateInterimChatMutation();
  const { data: messagesData, refetch } = useGetInterimChatMessagesQuery({
    application_id: parseInt(applicationId),
  });

  const [visibleMessages, setVisibleMessages] = useState<
    {
      key: string;
      value: string;
      from: "reviewer" | "applicant";
    }[]
  >([]);

  const [status, setStatus] = useState<ChatInputStatus>("ready");

  // stream in messages
  useEffect(() => {
    if (messagesData && messagesData.length > 0) {
      let currentIndex = 0;
      const interval = setInterval(() => {
        if (currentIndex < messagesData.length && messagesData[currentIndex]) {
          const currentMessage = messagesData[currentIndex];
          setVisibleMessages((prev) => [
            ...prev,
            {
              key: String(currentMessage.id) || nanoid(),
              value: currentMessage.text || "",
              from:
                currentMessage.role === "reviewer" ? "reviewer" : "applicant",
            },
          ]);
          currentIndex += 1;
        } else {
          clearInterval(interval);
        }
      }, 500);

      return () => clearInterval(interval);
    }
  }, [messagesData]);

  const handleSubmit = async (message: PromptInputMessage) => {
    const hasText = Boolean(message.text);
    const hasAttachments = Boolean(message.files?.length);

    // validation now in parent
    if (!hasText && !hasAttachments) {
      setStatus("error");
      return;
    }

    setStatus("submitted");

    try {
      await createMessage({
        application: parseInt(applicationId),
        text: message.text ?? "",
        role: "reviewer",
      }).unwrap();

      // simulate streaming states
      setTimeout(() => {
        setStatus("streaming");
      }, SUBMITTING_TIMEOUT);

      setTimeout(() => {
        setStatus("ready");
        refetch();
      }, STREAMING_TIMEOUT);
    } catch (error) {
      console.error("Error sending message:", error);
      setStatus("error");
    }
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 min-h-0">
        <Conversation className="relative h-full">
          <ConversationContent>
            {visibleMessages.length === 0 ? (
              <ConversationEmptyState
                description="Messages will appear here as the conversation progresses."
                icon={<MessageSquareIcon className="size-6" />}
                title="Start a conversation"
              />
            ) : (
              visibleMessages.map(({ key, value, from }) => (
                <Message
                  from={from === "reviewer" ? "assistant" : "user"}
                  key={key}
                >
                  <MessageContent>{value}</MessageContent>
                </Message>
              ))
            )}
          </ConversationContent>
          <ConversationScrollButton />
        </Conversation>
      </div>

      <div className="shrink-0 border-gray-200 dark:border-gray-700">
        <ChatInput status={status} onSubmit={handleSubmit} />
      </div>
    </div>
  );
}

export default Chat;
