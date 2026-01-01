import type { Card } from "@/types/card";
import type { Game, GamePhase, Player } from "@/types/game.types";
import { create } from "zustand";

interface GameStateStore extends Game {
  setPlayers: (players: Player[]) => void;
  setRotation: (rotation: 1 | -1) => void;
  setDiscardPile: (cards: Card[]) => void;
  setGamePhase: (gamePhase: GamePhase) => void;
  setHostUsername: (username: string) => void;
  resetGameState: () => void;
}

const initialState: Game = {
  players: [],
  discardPile: [],
  rotation: 1,
  gamePhase: "waiting",
  hostUsername: "",
};

export const useGameStateStore = create<GameStateStore>((set) => ({
  ...initialState,
  setPlayers: (players) => set({ players }),
  setRotation: (rotation) => set({ rotation }),
  setDiscardPile: (discardPile) => set({ discardPile }),
  setGamePhase: (gamePhase) => set({ gamePhase }),
  setHostUsername: (hostUsername) => set({ hostUsername }),
  resetGameState: () => set({ ...initialState }),
}));
