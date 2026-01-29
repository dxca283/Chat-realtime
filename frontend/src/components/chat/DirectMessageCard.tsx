import type { Conversation } from "@/types/chat";
import React from "react";
import ChatCard from "./ChatCard";
import { useAuthStore } from "@/stores/useAuthStore";

const DirectMessageCard = ({
  conversation,
}: {
  conversation: Conversation;
}) => {
  const {user} = useAuthStore
  return <ChatCard />;
};

export default DirectMessageCard;
