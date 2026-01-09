import { createFileRoute } from "@tanstack/react-router";
import { useEffect } from "react";
import { Play, Power, X } from "lucide-react";

import { useUsernameStore } from "@/hooks/store/useUsernameStore";
import { useRoomIdStore } from "@/hooks/store/useRoomIdStore";

import { socket } from "@/lib/socket";

import type { Game } from "@/types/game.types";

import GameBoard from "@/components/GameBoard";
import GameChat from "@/components/GameChat";
import { Button } from "@/components/ui/button";
import PlayerList from "@/components/PlayerList";
import { useGameStateStore } from "@/hooks/store/useGameStateStore";

export const Route = createFileRoute("/game/$roomId")({
  component: RouteComponent,
});

function RouteComponent() {
  const { username } = useUsernameStore();
  const { roomId } = Route.useParams();
  const { setRoomId } = useRoomIdStore();
  const {
    players,
    setPlayers,
    setDiscardPile,
    gamePhase,
    setGamePhase,
    hostSocketId,
    setHostSocketId,
    setRotation,
    setPlayerTurn,
    setDrawCount,
    resetGameState,
  } = useGameStateStore();

  useEffect(() => {
    socket.emit("updateGame", { roomId });

    setRoomId(roomId);

    socket.on("gameUpdate", (game: Game) => {
      setPlayers(game.players);
      setDiscardPile(game.discardPile);
      setGamePhase(game.gamePhase);
      setRotation(game.rotation);
      setHostSocketId(game.hostSocketId);
      setPlayerTurn(game.playerTurn);
      setDrawCount(game.drawCount);

      console.log(game);
    });

    return () => {
      setRoomId("");
    };
  }, [
    roomId,
    setRoomId,
    setPlayers,
    setDiscardPile,
    setGamePhase,
    setRotation,
    setHostSocketId,
    setDrawCount,
    setPlayerTurn,
  ]);

  const handleGameEnd = () => {
    socket.emit("endGame", { roomId });
    resetGameState();
  };

  return (
    <div className="h-full px-4 pb-4 flex gap-4">
      <div className="flex flex-col justify-between">
        <div className="top-0 border-2 min-w-48 h-fit rounded-lg">
          <PlayerList players={players} />
        </div>
        <div className="flex justify-between gap-4">
          <Button size="icon" variant="destructive">
            <Power />
          </Button>
          {hostSocketId === socket.id && (
            <>
              {gamePhase === "waiting" && (
                <Button
                  onClick={() => socket.emit("startGame", { roomId, username })}
                  size="icon"
                  className="bg-emerald-500 text-white hover:bg-emerald-500/90 focus-visible:ring-emerald-500/20 dark:focus-visible:ring-emerald-500/40 dark:bg-emerald-500/60"
                >
                  <Play />
                </Button>
              )}
              {gamePhase === "playing" && (
                <Button
                  onClick={handleGameEnd}
                  size="icon"
                  variant="destructive"
                >
                  <X />
                </Button>
              )}
            </>
          )}
        </div>
      </div>
      <GameBoard />
      <GameChat />
    </div>
  );
}
