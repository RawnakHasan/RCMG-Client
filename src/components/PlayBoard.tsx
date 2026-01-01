import { useGameStateStore } from "@/hooks/store/useGameStateStore";
import { useRoomIdStore } from "@/hooks/store/useRoomIdStore";
import { useUsernameStore } from "@/hooks/store/useUsernameStore";
import { socket } from "@/lib/socket";
import type { Card } from "@/types/card";
import { RotateCcw, RotateCw } from "lucide-react";

function rotationFromCard(card: Card) {
  const str = card.image ?? "";
  let hash = 0;

  for (let i = 0; i < str.length; i++) {
    hash = (hash << 5) - hash + str.charCodeAt(i);
    hash |= 0;
  }

  return Math.abs(hash) % 360;
}

const PlayBoard = () => {
  const { username } = useUsernameStore();
  const { roomId } = useRoomIdStore();
  const { rotation, discardPile } = useGameStateStore();

  return (
    <div className="flex-1 flex border-2 p-4 w-full rounded-md relative items-center justify-center">
      <span className="absolute top-4 left-4">
        {rotation === 1 ? <RotateCw size={32} /> : <RotateCcw size={32} />}
      </span>

      <img
        onClick={() => socket.emit("getCard", { username, roomId })}
        src="/Cards/Back.svg"
        alt="Deck"
        className="absolute top-4 right-4 w-20 cursor-pointer hover:scale-105"
        draggable={false}
      />

      {/* Discard pile */}
      <div className="relative w-32 h-48">
        <div className="relative w-32 h-48">
          {discardPile.map((card, index) => (
            <img
              key={index}
              src={card.image}
              className="absolute inset-0"
              style={{
                transform: `rotate(${rotationFromCard(card)}deg)`,
                zIndex: index + 1,
              }}
              draggable={false}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default PlayBoard;
