import { create } from "zustand";
import { toast } from "sonner";
import { authService } from "@/services/authService";
import type { AuthState } from "@/types/store";
import { persist } from "zustand/middleware";
import { useChatStore } from "./useChatStore";

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      accessToken: null,
      user: null,
      loading: false,

      clearState: () => {
        set({ accessToken: null, user: null, loading: false });
        localStorage.clear();
        useChatStore.getState().reset();
      },

      signUp: async (username, displayName, email, password) => {
        set({ loading: true });
        try {
          await authService.signUp(username, displayName, email, password);
          toast.success("Sign up successful!");
        } catch (error) {
          console.error("Sign up error:", error);
          toast.error("Sign up failed.");
        } finally {
          set({ loading: false });
        }
      },

      signIn: async (username, password) => {
        set({ loading: true });
        try {
          localStorage.clear();
          useChatStore.getState().reset();
          const { accessToken } = await authService.signIn(username, password);
          get().setAccessToken(accessToken);
          await get().fetchMe();
          useChatStore.getState().fetchConversations();
          toast.success("Sign in successful!");
        } catch (error) {
          console.error("Sign in error:", error);
          toast.error("Sign in failed.");
          throw error; // Re-throw so the form knows login failed
        } finally {
          set({ loading: false });
        }
      },

      signOut: async () => {
        try {
          get().clearState();
          await authService.signOut();
          toast.success("Sign out successful!");
        } catch (error) {
          console.error("Sign out error:", error);
          toast.error("Sign out failed.");
        }
      },
      fetchMe: async () => {
        try {
          set({ loading: true });
          const user = await authService.fetchMe();
          set({ user });
        } catch (error) {
          console.error("Fetch me error:", error);
          set({ user: null, accessToken: null });
          toast.error("Session expired. Please sign in again.");
        } finally {
          set({ loading: false });
        }
      },
      refresh: async () => {
        try {
          set({ loading: true });
          const { user, setAccessToken } = get();
          const accessToken = await authService.refresh();
          setAccessToken(accessToken);
          if (!user) {
            await get().fetchMe();
          }
        } catch (error) {
          console.error("Refresh token error:", error);
          get().clearState();
          toast.error("Session expired. Please sign in again.");
        } finally {
          set({ loading: false });
        }
      },
      setAccessToken: (accessToken) => set({ accessToken }),
    }),
    {
      name: "auth-storage",
      partialize: (state) => ({
        user: state.user,
      }),
    },
  ),
);
