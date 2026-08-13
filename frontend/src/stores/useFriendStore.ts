import { friendService } from "@/services/friendService";
import type { FriendState } from "@/types/store";
import { toast } from "sonner";
import { create } from "zustand";

export const useFriendStore = create<FriendState>((set, get) => ({
  loading: false,
  receivedList: [],
  sentList: [],
  friends: [],
  searchByUsername: async (username: string) => {
    try {
      set({ loading: true });
      const user = await friendService.searchByUsername(username);
      return user;
    } catch (error: any) {
      console.log(error);
      toast.error(error.response.data.message);
      return null;
    } finally {
      set({ loading: false });
    }
  },
  addFriend: async (to: string, message?: string) => {
    set({ loading: true });
    try {
      const res = await friendService.sendFriendRequest(to, message);
      return res;
    } catch (error: any) {
      console.log(error);
      throw error;
    } finally {
      set({ loading: false });
    }
  },
  getAllFriendRequest: async () => {
    try {
      set({ loading: true });
      const result = await friendService.getAllFriendRequest();
      if (!result) return;
      const { received, sent } = result;
      set({ receivedList: received, sentList: sent });
    } catch (error: any) {
      console.log(error);
      throw error;
    } finally {
      set({ loading: false });
    }
  },
  acceptRequest: async (requestId: string) => {
    try {
      set({ loading: true });
      await friendService.acceptRequest(requestId);
      set((state) => ({
        receivedList: state.receivedList.filter((r) => r._id !== requestId),
      }));
    } catch (error: any) {
      console.log(error);
      toast.error(error.response.data.message);
    } finally {
      set({ loading: false });
    }
  },
  declineRequest: async (requestId: string) => {
    try {
      set({ loading: true });
      await friendService.declineRequest(requestId);
      set((state) => ({
        receivedList: state.receivedList.filter((r) => r._id !== requestId),
      }));
    } catch (error: any) {
      console.log(error);
      toast.error(error.response.data.message);
    } finally {
      set({ loading: false });
    }
  },
  getFriends: async () => {
    try {
      set({loading: true});
      const friends = await friendService.getFriendList();
      set({friends: friends})
    } catch (error: any) {
      console.error("Error fetching friends:", error);
      toast.error(error.response.data.message);
      set({friends: []})
    } finally {
      set({loading: false});
    }
  },
}));
