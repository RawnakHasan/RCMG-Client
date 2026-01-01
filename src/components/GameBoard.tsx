import { Spinner } from "./ui/spinner";
import { useUsernameStore } from "@/hooks/store/useUsernameStore";
import Hand from "./Hand";
import { useState } from "react";
import PlayBoard from "./PlayBoard";
import { useGameStateStore } from "@/hooks/store/useGameStateStore";

const GameBoard = () => {
  const { username } = useUsernameStore();
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const { gamePhase, players } = useGameStateStore();

  return (
    <div className="h-full w-12/16 border-2 rounded-lg p-4 flex flex-col items-center gap-4 justify-between overflow-visible">
      {gamePhase === "playing" && <PlayBoard />}
      {gamePhase === "waiting" && (
        <h1 className="h-full flex gap-2 items-center justify-center">
          <Spinner /> Waiting...
        </h1>
      )}
      {gamePhase === "playing" && (
        <div className="relative flex items-end justify-center pl-16 overflow-visible">
          {players
            .find((player) => player.username === username)
            ?.hand.map((card, index) => (
              <Hand
                key={index}
                card={card}
                index={index}
                isHovered={hoveredIndex === index}
                onHover={() => setHoveredIndex(index)}
                onLeave={() => setHoveredIndex(null)}
              />
            ))}
        </div>
      )}
      {gamePhase === "finished" && <div>Game Finished</div>}
    </div>
  );
};
export default GameBoard;
