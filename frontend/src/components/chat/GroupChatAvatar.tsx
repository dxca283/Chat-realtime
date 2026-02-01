import type { Participant } from "@/types/chat";
import UserAvatar from "./UserAvatar";

interface GroupChatAvatarProps {
  participants: Participant[];
  type: "chat" | "sidebar";
}

const GroupChatAvatar = ({ participants, type }: GroupChatAvatarProps) => {
  const avatars = [];
  const limit = Math.min(participants.length, 4);

  for (let i = 0; i < limit; i++) {
    const member = participants[i];
    avatars.push(
        <UserAvatar key={i} type={type} name={member.displayName} avatarUrl={member.avatarUrl ?? undefined} />
    );
  }
  return <div>GroupChatAvatar</div>;
};

export default GroupChatAvatar;
