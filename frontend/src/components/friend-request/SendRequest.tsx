import { useFriendStore } from "@/stores/useFriendStore";
import FriendRequestItem from "./FriendRequestItem";

const SendRequest = () => {
  const { sentList } = useFriendStore();
  if (!sentList || sentList.length === 0) {
    return (
      <p className="text-sm text-muted-foreground ">
        There are no sent requests
      </p>
    );
  }
  return (
    <div className="space-y-3 mt-4">
      {sentList.map((request) => (
        <FriendRequestItem
          key={request._id}
          requestInfo={request}
          type="sent"
          actions={
            <p className="text-muted-foreground text-sm">
              Waiting for accepting
            </p>
          }
        />
      ))}
    </div>
  );
};

export default SendRequest;
