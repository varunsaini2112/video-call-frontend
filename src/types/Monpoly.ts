interface Player {
  id: string;
  name: string;
}

type CardType =
  | "start"
  | "location"
  | "jail"
  | "random"
  | "goToJail"
  | "parking"
  | "tax"
  | "station"
  | "utility";

type Card = {
  name: string;
  id: string;
} & (
  | {
      type: "start" | "jail" | "goToJail" | "parking" | "utility" | "random";
    }
  | {
      type: "tax";
      taxAmount: number;
    }
  | {
      type: "station";
      price: number;
    }
  | {
      type: "location";
      group: number;
      price: number;
      rent: number;
      rentWithColorSet: number;
      rent1H: number;
      rent2H: number;
      rent3H: number;
      rent4H: number;
      rentHotel: number;
      houseCost: number;
    }
);

export type { Player, Card };
