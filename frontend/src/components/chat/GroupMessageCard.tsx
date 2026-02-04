import { useAuthStore } from "@/stores/useAuthStore";
import { useChatStore } from "@/stores/useChatStore";
import type { Conversation } from "@/types/chat";
import ChatCard from "./ChatCard";
import UnreadBadge from "./UnreadBadge";
import GroupChatAvatar from "./GroupChatAvatar";

const GroupMessageCard = ({ conversation }: { conversation: Conversation }) => {
  const { user } = useAuthStore();
  const { activeConversationId, setActiveConversation, messages, fetchMessages } =
    useChatStore();
  if (!user) return null;
  const unreadCounts = conversation.unreadCounts[user._id];
  const name = conversation.group?.name ?? "";
  const handleSelectConversation = async (id: string) => {
    setActiveConversation(id);
    if (!messages[id]) {
      //fetch messages
      await fetchMessages(id);
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
      leftSection={<>
        {unreadCounts > 0 && <UnreadBadge unreadCount={unreadCounts} />}
        <GroupChatAvatar participants={conversation.participants} type="chat"/>
      </>}
      subtitle={
        <p className="text-sm truncate text-muted-foreground">
          {conversation.participants.length} members
        </p>
      }
    />
  );
};

export default GroupMessageCard;
