import { useFriendStore } from "@/stores/useFriendStore";
import FriendRequestItem from "./FriendRequestItem";
import { Button } from "../ui/button";
import { toast } from "sonner";

const ReceivedRequest = () => {
  const { acceptRequest, declineRequest, loading, receivedList } =
    useFriendStore();
  if (!receivedList || receivedList.length === 0) {
    return (
      <p className="text-sm text-muted-foreground">There's no one at all</p>
    );
  }
  const handleAccept = async (requestId: string) => {
    try {
      await acceptRequest(requestId);
      toast.success("Accepted friend request!!!");
    } catch (error) {
      console.error("Failed to accept request", error);
    }
  };
  const handleDecline = async (requestId: string) => {
    try {
      await declineRequest(requestId);
      toast.info("Decline friend request");
    } catch (error) {
      console.error("Failed to decline request", error);
    }
  };
  return (
    <div className="space-y-3 mt-4">
      {receivedList.map((req) => (
        <FriendRequestItem
          type="received"
          key={req._id}
          requestInfo={req}
          actions={
            <div className="flex gap-2">
              <Button
                size="sm"
                variant="primary"
                onClick={() => handleAccept(req._id)}
                disabled={loading}
              >
                Accept
              </Button>
              <Button
                size="sm"
                variant="destructiveOutline"
                onClick={() => handleDecline(req._id)}
                disabled={loading}
              >
                Decline
              </Button>
            </div>
          }
        />
      ))}
    </div>
  );
};

export default ReceivedRequest;
