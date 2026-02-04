import { useChatStore } from "@/stores/useChatStore"
import type { Conversation } from "@/types/chat"
import { SidebarTrigger } from "../ui/sidebar";
import { useAuthStore } from "@/stores/useAuthStore";
import { Separator } from "../ui/separator";

const ChatWindowHeader = ({ chat }: { chat?: Conversation }) => {
  const { conversations, activeConversationId } = useChatStore();
  const { user } = useAuthStore();
  let otherUser;

  chat = chat ?? conversations.find((c) => c._id === activeConversationId);
  if (!chat) return (
    <header className="md:hidden sticky top-0 z-10 flex items-center gap-2 px-4 py-2 w-full">
      <SidebarTrigger className="-ml-1 text-foreground " />
    </header>
  )
  if (chat.type === "direct") {
    const otherUsers = chat.participants.filter((p) => p._id !== user?._id);
    otherUser = otherUsers[0];
    if (!user || !otherUser) return;
  }

  return (
    <header className="sticky top-0 z-10 px-4 py-2 flex items-center bg-background">
      <div className="flex items-center gap-2 w-full">
        <SidebarTrigger className="-ml-1 text-foreground" />
        <Separator orientation="vertical" className=" mr-2 data-[orientation=vertical]:h-4" />
      </div>

    </header>
  )
}

export default ChatWindowHeader;