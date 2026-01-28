import ProtectedRoutes from "@/components/auth/ProtectedRoutes";
import ChatAppPage from "../pages/ChatAppPage";
import SignInPage from "../pages/SignInPage";
import SignUpPage from "../pages/SignUpPage";

export const routes = [
  /* Public routes */
  {
    path: "/sign-in",
    element: <SignInPage />,
  },
  {
    path: "/sign-up",
    element: <SignUpPage />,
  },

  /*Protected Routes */
  {
    path: "/",
    element: (
      <ProtectedRoutes>
        <ChatAppPage />
      </ProtectedRoutes>
    ),
  },
];
