import { useAuthStore } from "@/stores/useAuthStore";
import { useChatStore } from "@/stores/useChatStore";
import type { Conversation } from "@/types/chat";
import ChatCard from "./ChatCard";

const GroupMessageCard = ({ conversation }: { conversation: Conversation }) => {
  const { user } = useAuthStore();
  const { activeConversationId, setActiveConversation, messages } =
    useChatStore();
  if (!user) return null;
  const unreadCounts = conversation.unreadCounts[user._id];
  const name = conversation.group?.name ?? "";
  const handleSelectConversation = async (id: string) => {
    setActiveConversation(id);
    if (!messages[id]) {
      //fetch messages
    }
  };
  return (
    <ChatCard
      conversationId={conversation._id}
      name={name}
      timestamp={
        conversation.lastMessage?.createdAt
          ? new Date(conversation.lastMessage.createdAt)
          : undefined
      }
      isActive={activeConversationId === conversation._id}
      onSelect={handleSelectConversation}
      unreadCount={unreadCounts}
      leftSection={<></>}
      subtitle={
        <p className="text-sm truncate text-muted-foreground">
          {conversation.participants.length} members
        </p>
      }
    />
  );
};

export default GroupMessageCard;
