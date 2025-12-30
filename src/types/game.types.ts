import type { Card } from "./card";

export type Player = {
  username: string;
  host: boolean;
  hand: Card[];
  cardCount: number;
};

export type Game = {
  players: Player[];
  gamePhase: "waiting" | "playing" | "finished";
  hostUsername: string;
};
