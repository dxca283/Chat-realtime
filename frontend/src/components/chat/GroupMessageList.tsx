import { useChatStore } from "@/stores/useChatStore";
import GroupMessageCard from "./GroupMessageCard";

const GroupMessageList = () => {
  const { conversations } = useChatStore();
  if (!conversations) return;
  const groupConversations = conversations.filter(
    (convo) => convo.type === "group",
  );

  return (
    <div className="flex-1 overflow-y-auto p-2 space-y-2">
      {groupConversations.map((convo) => (
        <GroupMessageCard key={convo._id} conversation={convo} />
      ))}
    </div>
  );
};

export default GroupMessageList;
