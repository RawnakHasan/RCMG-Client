import type { Game } from "@/types/game.types";
import { Spinner } from "./ui/spinner";
import { useUsernameStore } from "@/hooks/store/useUsernameStore";
import Hand from "./Hand";
import { useState } from "react";
import PlayBoard from "./PlayBoard";

const GameBoard = ({ game }: { game: Game | undefined }) => {
  const { username } = useUsernameStore();
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  if (!game) return null;

  return (
    <div className="h-full w-12/16 border-2 rounded-lg p-4 flex flex-col items-center gap-4 justify-between overflow-visible">
      {game.gamePhase === "playing" && <PlayBoard />}
      {game.gamePhase === "waiting" && (
        <h1 className="h-full flex gap-2 items-center justify-center">
          <Spinner /> Waiting...
        </h1>
      )}
      {game.gamePhase === "playing" && (
        <div className="relative flex items-end justify-center pl-16 overflow-visible">
          {game.players
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
      {game.gamePhase === "finished" && <div>Game Finished</div>}
    </div>
  );
};
export default GameBoard;
