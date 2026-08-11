import { create } from "zustand";
import { io, type Socket } from "socket.io-client";
import { useAuthStore } from "./useAuthStore";
import type { SocketState } from "@/types/store";
import { useChatStore } from "./useChatStore";

const baseUrl = import.meta.env.VITE_SOCKET_URL;

export const useSocketStore = create<SocketState>((set, get) => ({
  socket: null,
  onlineUsers: [],
  connect: () => {
    const { accessToken } = useAuthStore.getState();
    const existingSocket = get().socket;
    if (existingSocket) return;
    const socket: Socket = io(baseUrl, {
      auth: { token: accessToken },
      transports: ["websocket"],
    });
    set({ socket });
    socket.on("connect", () => {
      console.log("Socket connected");
    });
    //online users
    socket.on("online-users", (userId) => {
      set({ onlineUsers: userId });
    });
    //new message
    socket.on("new-message", ({ message, conversation, unreadCounts }) => {
      useChatStore.getState().addMessage(message);
      const lastMessage = {
        _id: conversation.lastMessage._id,
        content: conversation.lastMessage.content,
        createdAt: conversation.lastMessage.createdAt,
        sender: {
          _id: conversation.lastMessage._id,
          displayName: "",
          avatarUrl: null,
        },
      };
      const updatedConversation = {
        ...conversation,
        lastMessage,
        unreadCounts,
      };

      if (
        useChatStore.getState().activeConversationId === message.conversationId
      ) {
        //Mark as read
      }
      useChatStore.getState().updateConversation(updatedConversation);
    });
  },
  disconnect: () => {
    const { socket } = get();
    socket?.disconnect();
    set({ socket: null });
  },
}));
