import api from "@/lib/axios";

export const authService = {
  signUp: async (
    username: string,
    displayName: string,
    email: string,
    password: string
  ) => {
    const res = await api.post(
      "/auth/sign-up",
      {
        username,
        fullname: displayName,
        email,
        password,
      },
      { withCredentials: true }
    );
    return res.data;
  },
  signIn: async (username: string, password: string) => {
    const res = await api.post(
      "/auth/sign-in",
      {
        username,
        password,
      },
      { withCredentials: true }
    );
    return res.data; // accessToken
  },
  signOut: async () => {
    const res = await api.post("/auth/sign-out", {}, { withCredentials: true });
    return res.data;
  },
  fetchMe: async () => {
    const res = await api.get("/users/me", { withCredentials: true });
    return res.data.user;
  },
  refresh: async () => {
    const res = await api.post("/auth/refresh-token", {}, { withCredentials: true });
    return res.data.accessToken; // accessToken
  }
  
};
