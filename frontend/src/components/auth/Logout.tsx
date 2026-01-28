import { useAuthStore } from "@/stores/useAuthStore"
import { useNavigate } from "react-router-dom";
import { Button } from "../ui/button";

const Logout = () => {
  const { signOut } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut();
      navigate("/sign-in");
    } catch (error) {
      console.error("Logout error:", error);
    }
  }

  return (
    <div>
      <Button onClick={handleLogout}>Logout</Button>
    </div>
  )
}

export default Logout