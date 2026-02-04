import api from "@/lib/axios";
import type { ConversationResponse, Message } from "@/types/chat";

interface FetchMessageProps {
  messages: Message[];
  cursor: string;
}
const LIMIT = 50;
export const chatService = {
  async fetchConversation(): Promise<ConversationResponse> {
    const res = await api.get("/conversations");
    return res.data;
  },
  async fetchMessages(id: string, cursor: string) : Promise<FetchMessageProps> {
    const res = await api.get(`/conversations/${id}/messages?limit=${LIMIT}&cursor=${cursor}`);
    return {
      messages: res.data.messages,
      cursor: res.data.nextCursor,
    }
  }
};
