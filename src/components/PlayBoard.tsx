import { useRoomIdStore } from "@/hooks/store/useRoomIdStore";
import { useUsernameStore } from "@/hooks/store/useUsernameStore";
import { socket } from "@/lib/socket";
import { useState } from "react";

const PlayBoard = () => {
  const { username } = useUsernameStore();
  const { roomId } = useRoomIdStore();

  const [rotations] = useState(() =>
    Array.from({ length: 25 }, () => Math.random() * 360)
  );

  return (
    <div className="flex-1 flex border-2 p-4 w-full rounded-md relative items-center justify-center">
      {/* Deck */}
      <img
        onClick={() => socket.emit("getCard", { username, roomId })}
        src="/Cards/Back.svg"
        alt="Deck"
        className="absolute top-4 right-4 w-20 cursor-pointer hover:scale-105"
        draggable={false}
      />

      {/* Discard pile */}
      <div className="relative w-32 h-48">
        {rotations.map((r, index) => (
          <img
            key={index}
            src="/Cards/Blue 0.svg"
            className="absolute inset-0"
            style={{
              transform: `rotate(${r}deg)`,
              zIndex: index,
            }}
            draggable={false}
          />
        ))}
      </div>
    </div>
  );
};

export default PlayBoard;
