export type CardColor = "Red" | "Blue" | "Green" | "Yellow";

export type NormalCard = {
  type: "Normal";
  name: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;
  color: CardColor;
  image: string;
};

export type ActionCard = {
  type: "Action";
  name: "Draw 2" | "Draw 4" | "Reverse" | "Skip" | "Skip All" | "Discard All";
  color: CardColor;
  image: string;
};

export type WildCard = {
  type: "Wild";
  name: "Draw 6" | "Draw 10" | "Color Roulette" | "Reverse Draw 4";
  chosenColor?: CardColor;
  image: string;
};

export type Card = NormalCard | ActionCard | WildCard;
