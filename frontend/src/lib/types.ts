export enum GameEventKey {
  foundation = "foundation",
  structure = "structure",
  finishing = "finishing",
}

export type EventChoice = {
  choice: string;
  price: number;
};

export type GameEvent = {
  key: GameEventKey;
  step: number;
  title: string;
  description: string;
  choices: EventChoice[];
};

export type FoundationType =
  | "mud_mortar_stone_brick"
  | "bamboo_timber"
  | "cement_stone_brick"
  | "reinforced_concrete"
  | "other";
export type SuperstructureType = (
  | "adobe_mud"
  | "mud_mortar_stone"
  | "stone_flag"
  | "cement_mortar_stone"
  | "mud_mortar_brick"
  | "cement_mortar_brick"
  | "timber"
  | "bamboo"
  | "rc_non_engineered"
  | "re_engineered"
  | "other"
)[];

export interface GameState {
  num_floors: number;
  foundation_type: FoundationType;
  superstructure_type: SuperstructureType;
  age: number;
  plinth_area: number;
  available_cash: number;
  gameStage: "foundation" | "structure" | "finishing" | "simulation";
  pendingChoice: PendingChoice | null;
}

export type PendingChoice = {
  type: GameEventKey;
  choice: string;
  price: number;
};
