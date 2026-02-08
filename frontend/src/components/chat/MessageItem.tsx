import { cn, formatOnlineTime } from "@/lib/utils";
import type { Conversation, Message } from "@/types/chat"
import UserAvatar from "./UserAvatar";
import { Card } from "../ui/card";
import { Badge } from "../ui/badge";

interface MessageItemProps {
    message: Message;
    index: number;
    messages: Message[];
    selectedConversation: Conversation;
    lastMessageStatus: "delivered" | "seen";
}

const MessageItem = ({ message, index, messages, selectedConversation, lastMessageStatus }: MessageItemProps) => {
    const prev = messages[index - 1];
    const isGroupBreak = index === 0 ||
        message.senderId !== prev?.senderId ||
        new Date(message.createdAt).getTime() - new Date(prev.createdAt).getTime() > 5 * 60 * 1000;
    const participant = selectedConversation.participants.find(p => p._id.toString() === message.senderId.toString());


    return (
        <div className={cn("flex gap-2 message-bounce mt-2", message.isOwn ? "justify-end" : "justify-start")}>
            {/*Avatar */}
            {!message.isOwn && (
                <div className="w-8">
                    {isGroupBreak && (
                        <UserAvatar type="chat" name={participant?.displayName || "Unknown"} avatarUrl={participant?.avatarUrl || undefined} />
                    )}
                </div>
            )}
            {/*Messages */}
            <div className={cn("max-w-xs lg:max-w-md space-y-1 flex flex-col", message.isOwn ? "items-end" : "items-start")}>
                <Card className={cn("p-3", message.isOwn ? "bg-chat-bubble-sent border-0" : "bg-chat-bubble-received")}>
                    <p className="text-sm leading-relaxed wrap-break-word">{message.content}</p>
                </Card>
                {isGroupBreak && (
                    <span className="text-xs text-muted-foreground px-1">{formatOnlineTime(new Date(message.createdAt))}</span>
                )}

                {/*Seen || delivered */}
                {message.isOwn && message._id === selectedConversation.lastMessage?._id && (
                    <Badge variant='outline' className={cn("text-xs px-1.5 py-0.5 h-4 border-0", lastMessageStatus === "seen" ? "bg-primary/20 text-primary" : "bg-muted text-muted-foreground")}>
                        {lastMessageStatus}
                    </Badge>
                )}
            </div>

            {/*Timestamp */}
        </div>
    )
}

export default MessageItem