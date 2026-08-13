import { UserPlus } from "lucide-react";
import { useState } from "react";
import {
  DialogHeader,
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import type { User } from "@/types/user";
import { useFriendStore } from "@/stores/useFriendStore";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import SearchForm from "../AddFriendModal/SearchForm";
import SendFriendRequest from "../AddFriendModal/SendFriendRequest";

export interface IFormValue {
  username: string;
  message: string;
}

const AddFriendModal = () => {
  const [isFound, setIsFound] = useState<boolean | null>(null);
  const [searchUser, setSearchUser] = useState<User>();
  const [searchedUsername, setSearchedUsername] = useState<string>("");
  const { loading, searchByUsername, addFriend } = useFriendStore();
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<IFormValue>({
    defaultValues: { username: "", message: "" },
  });
  const usernameValue = watch("username");
  const handleSearch = handleSubmit(async (data) => {
    const username = data.username.trim();
    if (!username) return;
    setIsFound(null);
    setSearchedUsername(username);

    try {
      const foundUser = await searchByUsername(username);
      if (foundUser) {
        setIsFound(true);
        setSearchUser(foundUser);
      } else {
        setIsFound(false);
      }
    } catch (error) {
      console.error(error);
      setIsFound(false);
    }
  });
  const handleSend = handleSubmit(async (data) => {
    if (!searchUser) return;
    try {
      const message = await addFriend(searchUser._id, data.message.trim());
      toast.success(message);
      handleCancel();
    } catch (error: any) {
      console.error("[handleSend] Error: ", error);
      toast.error(
        error?.response?.data?.message || "Failed to send friend request",
      );
    }
  });
  const handleCancel = () => {
    reset();
    setIsFound(null);
    setSearchedUsername("");
  };

  return (
    <Dialog>
      <DialogTrigger>
        <div className="flex justify-center items-center size-5 rounded-full hover:bg-sidebar-accent cursor-pointer z-10">
          <UserPlus className="size-4" />
          <span className="sr-only">Add Friend</span>
        </div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-107 border-none">
        <DialogHeader>
          <DialogTitle>Make Friends</DialogTitle>
        </DialogHeader>
        {!isFound && (
          <>
            <SearchForm
              register={register}
              errors={errors}
              usernameValue={usernameValue}
              loading={loading}
              isFound={isFound}
              searchedUsername={searchedUsername}
              onSubmit={handleSearch}
              onCancel={handleCancel}
            />
          </>
        )}
        {isFound && (
          <>
            <SendFriendRequest
              register={register}
              loading={loading}
              searchedUsername={searchedUsername}
              onSubmit={handleSend}
              onBack={() => setIsFound(null)}
            />
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default AddFriendModal;
