import type { FieldErrors, UseFormRegister } from "react-hook-form";
import type { IFormValue } from "../chat/AddFriendModal";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { DialogClose, DialogFooter } from "../ui/dialog";
import { Button } from "../ui/button";
import { Search } from "lucide-react";

interface SearchFormProps {
  register: UseFormRegister<IFormValue>;
  errors: FieldErrors<IFormValue>;
  loading: boolean;
  usernameValue: string;
  isFound: boolean | null;
  searchedUsername: string;
  onSubmit?: (e?: React.FormEvent<HTMLFormElement>) => void;
  onCancel: () => void;
}

const SearchForm = ({
  register,
  errors,
  loading,
  usernameValue,
  isFound,
  searchedUsername,
  onCancel,
  onSubmit,
}: SearchFormProps) => {
  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="username" className="text-sm font-semibold">
          Find by username
        </Label>
        <Input
          id="username"
          placeholder="Enter username"
          className="glass border-border/50 focus:border-primary/50 transition-smooth"
          {...register("username")}
          required
        ></Input>
        {errors.username && (
          <p className="error-message">{errors.username.message}</p>
        )}
        {isFound === false && (
          <span className="error-message">
            Không tìm thấy người dùng
            <span className="font-semibold">@{searchedUsername}</span>
          </span>
        )}
      </div>
      <DialogFooter>
        <DialogClose asChild>
          <Button
            type="button"
            variant="outline"
            className="flex-1 glass hover:text-destructive"
            onClick={onCancel}
          >
            Cancel
          </Button>
        </DialogClose>
        <Button
          type="submit"
          className="flex-1 glass bg-gradient-chat hover:opacity-90 transition-smooth"
          disabled={loading || !usernameValue.trim()}
        >
          {loading ? (
            "Searching..."
          ) : (
            <>
              <Search className="size-4 mr-2" /> Find
            </>
          )}
        </Button>
      </DialogFooter>
    </form>
  );
};

export default SearchForm;
