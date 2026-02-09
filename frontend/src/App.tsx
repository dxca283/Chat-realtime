import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { routes } from "./routes/router";
import { Toaster } from "sonner";
import { useThemeStore } from "./stores/useThemeStore";
import { useEffect } from "react";
import { useAuthStore } from "./stores/useAuthStore";
import { useSocketStore } from "./stores/useSocketStore";

function App() {
  const router = createBrowserRouter(routes);
  const { isDark, setTheme } = useThemeStore();
  const { accessToken } = useAuthStore();
  const { connect, disconnect } = useSocketStore();

  useEffect(() => {
    setTheme(isDark);
  }, [isDark]);

  useEffect(() => {
    if (accessToken) {
      connect();
    }
    return () => disconnect();
  }, [accessToken]);
  return (
    <>
      <Toaster richColors />
      <RouterProvider router={router} />
    </>
  );
}

export default App;
