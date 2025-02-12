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
}
