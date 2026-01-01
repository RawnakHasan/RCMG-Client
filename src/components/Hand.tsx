import { useRoomIdStore } from "@/hooks/store/useRoomIdStore";
import { useUsernameStore } from "@/hooks/store/useUsernameStore";
import { socket } from "@/lib/socket";
import type { Card } from "@/types/card";

type HandProps = {
  card: Card;
  index: number;
  isHovered: boolean;
  onHover: () => void;
  onLeave: () => void;
};

const Hand = ({ card, index, isHovered, onHover, onLeave }: HandProps) => {
  const { roomId } = useRoomIdStore();
  const { username } = useUsernameStore();

  return (
    <div
      onClick={() => socket.emit("playCard", { card, roomId, username })}
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
      className="isthistheplace
        relative
        -ml-16
        transition-all duration-200 ease-out
      "
      style={{
        zIndex: isHovered ? 999 : index,
        transform: isHovered ? "translateY(-2rem)" : "translateY(0)",
      }}
    >
      <img
        src={card.image}
        alt={`${card.name}`}
        className="w-28 cursor-pointer select-none"
        draggable={false}
      />
    </div>
  );
};

export default Hand;
