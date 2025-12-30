import type { Game, Player } from "@/types/game.types";
import DiceBearAvatar from "./DiceBearAvatar";
import { Crown } from "lucide-react";
import { useUsernameStore } from "@/hooks/store/useUsernameStore";

const PlayerList = ({ game }: { game: Game }) => {
  const { username } = useUsernameStore();
  return (
    <>
      {game?.players.map((player: Player, i) => (
        <div
          key={i}
          className={`flex items-center px-4 py-2 gap-4 ${i === game.players.length - 1 ? "" : "border-b-2"}`}
        >
          <div className="relative">
            <DiceBearAvatar size={64} username={player.username} />
            {player.host ? (
              <Crown
                className="absolute top-0 -left-2 rotate-315"
                style={{ color: "#FFD700" }}
              />
            ) : null}
            {player.cardCount !== 0 && (
              <div className="counter absolute bottom-0 right-0 size-5 flex items-center justify-center text-sm text-zinc-950 bg-green-300 rounded-full">
                {player.cardCount}
              </div>
            )}
          </div>
          <h1
            className={`${player.username === username ? "text-cyan-600" : ""} flex items-center gap-2`}
          >
            {player.username}
          </h1>
        </div>
      ))}
    </>
  );
};
export default PlayerList;
