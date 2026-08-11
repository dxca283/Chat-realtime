import { BrowserRouter, Route, Routes } from "react-router";
import { Toaster } from "sonner";
import { useThemeStore } from "./stores/useThemeStore";
import { useEffect } from "react";
import { useAuthStore } from "./stores/useAuthStore";
import { useSocketStore } from "./stores/useSocketStore";
import SignInPage from "./pages/SignInPage";
import SignUpPage from "./pages/SignUpPage";
import ChatAppPage from "./pages/ChatAppPage";
import ProtectedRoutes from "./components/auth/ProtectedRoute";


function App() {
  const { isDark, setTheme } = useThemeStore();
  const accessToken = useAuthStore((state) => state.accessToken);
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
       <BrowserRouter>
        <Routes>
          {/* public routes */}
          <Route
            path="/signin"
            element={<SignInPage />}
          />
          <Route
            path="/signup"
            element={<SignUpPage />}
          />

          {/* protectect routes */}
          <Route element={<ProtectedRoutes />}>
            <Route
              path="/"
              element={<ChatAppPage />}
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
