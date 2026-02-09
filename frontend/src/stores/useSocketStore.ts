import { create } from "zustand";
import { io, type Socket } from "socket.io-client";
import { useAuthStore } from "./useAuthStore";
import type { SocketState } from "@/types/store";

const baseUrl = import.meta.env.VITE_SOCKET_URL;

export const useSocketStore = create<SocketState>((set, get) => ({
  socket: null,
  connect: () => {
    const { accessToken } = useAuthStore.getState();
    const existingSocket = get().socket;
    if (existingSocket) return;
    const socket: Socket = io(baseUrl, {
      auth: { token: accessToken },
      transports: ["websocket"],
    });
    set({socket});
    socket.on("connect", () => {
      console.log("Socket connected");
    });
  },
  disconnect: () => {
    const { socket } = get();
    socket?.disconnect();
    set({ socket: null });
  },
}));
