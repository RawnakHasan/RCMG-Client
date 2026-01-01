import type { Card } from "./card";

export type Player = {
  username: string;
  host: boolean;
  hand: Card[];
};

export type GamePhase = "waiting" | "playing" | "finished";

export interface Game {
  players: Player[];
  discardPile: Card[];
  rotation: 1 | -1;
  gamePhase: GamePhase;
  hostUsername: string;
}
