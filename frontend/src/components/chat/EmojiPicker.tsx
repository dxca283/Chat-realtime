import { useThemeStore } from "@/stores/useThemeStore";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Smile } from "lucide-react";
import EmojiPickerReact, {
  type EmojiClickData,
  Theme,
} from "emoji-picker-react";

interface EmojiPickerProps {
  onChange: (value: string) => void;
}
const EmojiPicker = ({ onChange }: EmojiPickerProps) => {
  const { isDark } = useThemeStore();
  const handleEmojiClick = (emojiData: EmojiClickData) => {
    onChange(emojiData.emoji);
  };
  return (
    <Popover>
      <PopoverTrigger className="cursor-pointer">
        <Smile className="size-4" />
      </PopoverTrigger>
      <PopoverContent
        side="right"
        sideOffset={40}
        className="bg-transparent border-none drop-shadow-none shadow-none mb-12"
      >
        <EmojiPickerReact theme={isDark ? Theme.DARK : Theme.LIGHT} onEmojiClick={handleEmojiClick}/>
      </PopoverContent>
    </Popover>
  );
};

export default EmojiPicker;
