import { useRoomIdStore } from "@/hooks/store/useRoomIdStore";
import { useUsernameStore } from "@/hooks/store/useUsernameStore";
import { socket } from "@/lib/socket";
import type { Card, CardColor, WildCard } from "@/types/card";
import { useState } from "react";

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

  const [showColorPicker, setShowColorPicker] = useState(false);
  const [pendingWildCard, setPendingWildCard] = useState<WildCard | null>(null);

  const handlePlayCard = () => {
    if (card.type === "Wild") {
      setPendingWildCard(card);
      setShowColorPicker(true);
      return;
    }

    socket.emit("playCard", { card, roomId, username });
  };

  const handleChooseColor = (color: CardColor) => {
    if (!pendingWildCard) return;

    const updatedCard: WildCard = {
      ...pendingWildCard,
      chosenColor: color,
    };

    socket.emit("playCard", {
      card: updatedCard,
      roomId,
      username,
    });

    setPendingWildCard(null);
    setShowColorPicker(false);
  };

  return (
    <div
      onClick={handlePlayCard}
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
      {showColorPicker && (
        <div className="absolute bottom-40 left-1/2 -translate-x-1/2 z-1000 flex gap-2 rounded bg-black p-3">
          {(["Red", "Blue", "Green", "Yellow"] as CardColor[]).map((color) => (
            <button
              key={color}
              onClick={() => handleChooseColor(color)}
              className="h-10 w-10 rounded-full"
              style={{ backgroundColor: color.toLowerCase() }}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Hand;
