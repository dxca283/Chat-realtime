import type { UseFormRegister } from "react-hook-form";
import type { IFormValue } from "../chat/AddFriendModal";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { DialogFooter } from "../ui/dialog";
import { Button } from "../ui/button";
import { UserPlus } from "lucide-react";

interface SendFriendRequestProps {
  register: UseFormRegister<IFormValue>;
  loading: boolean;
  searchedUsername: string;
  onSubmit?: (e?: React.FormEvent<HTMLFormElement>) => void;
  onBack: () => void;
}

const SendFriendRequest = ({
  register,
  loading,
  searchedUsername,
  onSubmit,
  onBack,
}: SendFriendRequestProps) => {
  return (
    <form onSubmit={onSubmit}>
      <div>
        <span className="success-text">
          Found <span className="font-semibold">@{searchedUsername}</span>
        </span>
        <div className="space-y-2 mb-3">
          <Label htmlFor="message" className="text-sm font-semibold">
            Say Hiiii
          </Label>
          <Textarea
            id="message"
            rows={3}
            placeholder="Type your message here..."
            className="glass border-border/50 focus:border-primary.50 transition-smooth resize-none"
            {...register("message")}
          ></Textarea>
        </div>
        <DialogFooter>
          <Button
            type="button"
            variant={"outline"}
            className="flex-1 glass hover:text-destructive"
            onClick={onBack}
          >
            Back
          </Button>
          <Button
            type="submit"
            className="flex-1 glass bg-gradient-chat text-white hover:opacity-90 transition-smooth"
            disabled={loading}
          >
            {loading ? (
              "Sending..."
            ) : (
              <>
                <UserPlus className="size-4 mr-2" /> Add Friend
              </>
            )}
          </Button>
        </DialogFooter>
      </div>
    </form>
  );
};

export default SendFriendRequest;
