import {
  GameEventKey,
  type FoundationType,
  type GameEvent,
  type SuperstructureType,
} from "@/lib/types";

export const INITIAL_BUDGET = 10815028; // 10,815,028 NPR OR 863 108,68 NOK

export const FOUNDATION_COSTS: Record<FoundationType, number> = {
  mud_mortar_stone_brick: 100000,
  bamboo_timber: 50000,
  cement_stone_brick: 150000,
  reinforced_concrete: 200000,
  other: 0,
};

type ExtractArrayItem<T> = T extends (infer U)[] ? U : never;

export const SUPERSTRUCTURE_COSTS: Record<
  ExtractArrayItem<SuperstructureType>,
  number
> = {
  adobe_mud: 100000,
  mud_mortar_stone: 150000,
  stone_flag: 200000,
  cement_mortar_stone: 250000,
  mud_mortar_brick: 300000,
  cement_mortar_brick: 350000,
  timber: 400000,
  bamboo: 450000,
  rc_non_engineered: 500000,
  re_engineered: 550000,
  other: 0,
};

export const GAME_EVENTS: Record<GameEventKey, Omit<GameEvent, "key">> = {
  [GameEventKey.buy_or_build]: {
    title: "Buy or Build",
    step: 0,
    description: "Choose whether you want to buy a house or build a new one.",
    choices: [
      {
        choice: "0",
        title: "Build_new",
        price: 50000000,
      },
      {
        choice: "2",
        title: "Buy 2 year old house",
        price: 1000000,
      },
      {
        choice: "5",
        title: "Buy 5 year old house",
        price: 2000000,
      },
      {
        choice: "10",
        title: "Buy 10 year old house",
        price: 3000000,
      },
      {
        choice: "15",
        title: "Buy 15 year old house",
        price: 4000000,
      },
      {
        choice: "20",
        title: "Buy 20 year old house",
        price: 5000000,
      },
    ],
  },
  [GameEventKey.foundation]: {
    title: "Foundation",
    step: 1,
    description: "Choose the foundation type for your house. This will determine the strength of the base of your house.",
    choices: [
      {
        choice: "mud_mortar_stone_brick",
        title: "Mud Mortar Stone Brick",
        price: 100000,
        image: "/images/foundation/mud_mortar_stone_brick.png",
      },
      {
        choice: "bamboo_timber",
        title: "Bamboo Timber",
        price: 50000,
      },
      {
        choice: "cement_stone_brick",
        title: "Cement Stone Brick",
        price: 150000,
        image: "/images/foundation/cement_stone_brick.jpg",
      },
      {
        choice: "reinforced_concrete",
        title: "Reinforced Concrete",
        price: 200000,
        image: "/images/foundation/reinforced-concrete.jpg",
      },
      {
        choice: "other",
        price: 0,
      },
    ],
  },
  [GameEventKey.structure]: {
    title: "Structure",
    step: 2,
    description: "Choose the superstructure type for your house. This will determine the material used for the walls and roof of your house.",
    choices: [
      {
        choice: "adobe_mud",
        title: "Adobe Mud",
        price: 100000,
      },
      {
        choice: "cement_mortar_stone",
        title: "Cement Mortar Stone",
        price: 250000,
      },
      {
        choice: "timber",
        title: "Timber",
        price: 400000,
      },
      {
        choice: "bamboo",
        title: "Bamboo",
        price: 450000,
      },
      {
        choice: "rc",
        title: "Reinforced Concrete",
        price: 500000,
      },
      {
        choice: "other",
        price: 0,
      },
    ],
  },
  [GameEventKey.finishing]: {
    title: "Finishing",
    step: 3,
    description: "Choose the finishing type for your house. This will determine the material used for the walls and roof of your house.",
    choices: [
      {
        choice: "plaster",
        title: "Plaster",
        price: 100000,
      },
      {
        choice: "paint",
        title: "Paint",
        price: 150000,
      },
      {
        choice: "tiles",
        title: "Tiles",
        price: 200000,
      },
      {
        choice: "other",
        price: 0,
      },
    ],
  },
};
