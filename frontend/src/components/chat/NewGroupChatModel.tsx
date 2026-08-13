import { useFriendStore } from "@/stores/useFriendStore";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { UserPlus, Users } from "lucide-react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import type { Friend } from "@/types/user";
import InviteSuggestionList from "../newGroupChat/InviteSuggestionList";
import SelectedUserList from "../newGroupChat/SelectedUserList";
import { toast } from "sonner";
import { useChatStore } from "@/stores/useChatStore";

const NewGroupChatModel = () => {
  const [groupName, setGroupName] = useState("");
  const [search, setSearch] = useState("");
  const { friends, getFriends } = useFriendStore();
  const { createConversation, loading } = useChatStore();

  const [invitedUsers, setInvitedUsers] = useState<Friend[]>([]);
  const handleGetFriends = async () => {
    await getFriends();
  };
  const filteredFriends = friends.filter(
    (friend) =>
      friend.displayName.toLowerCase().includes(search.toLowerCase()) &&
      !invitedUsers.some((u) => u._id === friend._id),
  );
  const handleSelectFriend = (friend: Friend) => {
    setInvitedUsers([...invitedUsers, friend]);
    setSearch("");
  };
  const handleRemoveUser = (user: Friend) => {
    setInvitedUsers(invitedUsers.filter((u) => u._id !== user._id));
  };
  const handleSubmit = async (e: React.FormEvent) => {
    try {
      e.preventDefault();
      if (invitedUsers.length === 0) {
        toast.warning(
          "You must invite at least one friend to create a group chat.",
        );
        return;
      }
      await createConversation(
        "group",
        groupName,
        invitedUsers.map((u) => u._id),
      );
      setSearch("");
      setInvitedUsers([]);
    } catch (error) {
      console.error("Error on create group chat: ", error);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant={"ghost"}
          onClick={handleGetFriends}
          className="flex z-10 justify-center items-center size-5 rounded-full hover:bg-sidebar-accent transition cursor-pointer"
        >
          <Users className="size-4" />
          <span className="sr-only">Group chat</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-107 border-none">
        <DialogHeader>
          <DialogTitle className="capitalize">
            Create new group chat
          </DialogTitle>
        </DialogHeader>
        <form className="spzce-y-4" onSubmit={handleSubmit}>
          {/* Group name */}
          <div className="space-y-2">
            <Label htmlFor="groupName" className="text-sm font-semibold">
              Group name
            </Label>
            <Input
              id="groupName"
              placeholder="Type group name here"
              className="glass border-border/50 focus:border-primary/50 transition-smooth"
              value={groupName}
              onChange={(e) => setGroupName(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="invite" className="text-sm font-semibold">
              Invite friends
            </Label>
            <Input
              id="invite"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search user here"
            />
            {/* Recommend invite user list*/}
            {search && filteredFriends.length > 0 && (
              <InviteSuggestionList
                filteredFriends={filteredFriends}
                onSelect={handleSelectFriend}
              />
            )}

            {/* selected user list */}
            <SelectedUserList
              invitedUsers={invitedUsers}
              onRemove={handleRemoveUser}
            />
          </div>
          <DialogFooter>
            <Button
              type="submit"
              disabled={loading}
              className="flex-1 bg-gradient-chat text-white hover:opacity-90 transition-smooth"
            >
              {loading ? (
                <span>Creating...</span>
              ) : (
                <><UserPlus className="size-4 mr-2"/>Create Group Chat</>
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default NewGroupChatModel;
