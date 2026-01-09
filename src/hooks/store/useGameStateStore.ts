import type { Card } from "@/types/card";
import type { Game, GamePhase, Player } from "@/types/game.types";
import { create } from "zustand";

interface GameStateStore extends Game {
  setPlayers: (players: Player[]) => void;
  setRotation: (rotation: 1 | -1) => void;
  setDiscardPile: (cards: Card[]) => void;
  setGamePhase: (gamePhase: GamePhase) => void;
  setHostSocketId: (username: string) => void;
  setPlayerTurn: (player: Player) => void;
  setDrawCount: (count: number) => void;
  resetGameState: () => void;
}

const initialPlayer: Player = {
  uuid: "",
  id: 0,
  username: "",
  host: false,
  hand: [],
};

const initialState: Game = {
  players: [],
  discardPile: [],
  rotation: 1,
  gamePhase: "waiting",
  hostSocketId: "",
  drawCount: 0,
  playerTurn: initialPlayer,
};

export const useGameStateStore = create<GameStateStore>((set) => ({
  ...initialState,
  setPlayers: (players) => set({ players }),
  setRotation: (rotation) => set({ rotation }),
  setDiscardPile: (discardPile) => set({ discardPile }),
  setGamePhase: (gamePhase) => set({ gamePhase }),
  setHostSocketId: (hostSocketId) => set({ hostSocketId }),
  setPlayerTurn: (playerTurn) => set({ playerTurn }),
  setDrawCount: (drawCount) => set({ drawCount }),
  resetGameState: () => set({ ...initialState }),
}));
