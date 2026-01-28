import { useAuthStore } from "@/stores/useAuthStore";
import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoutes = ({ children }: { children: React.ReactNode }) => {
  const { accessToken, user, loading, refresh, fetchMe } = useAuthStore();
  const [starting, setStarting] = useState(true);

  useEffect(() => {
    const init = async () => {
      if (!accessToken) {
        try {
          await refresh();
        } catch (error) {
          console.error("Error refreshing token:", error);
        }
      }
      if (accessToken && !user) {
        try {
          await fetchMe();
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      }
      setStarting(false);
    };
    init();
  }, []);
  if (loading || starting) {
    return (
      <div className="flex h-screen items-center justify-center">
        Loading...
      </div>
    );
  }
  if (!accessToken) {
    return <Navigate to="/sign-in" replace />;
  }
  return children;
};

export default ProtectedRoutes;
