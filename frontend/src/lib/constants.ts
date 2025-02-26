import {
  GameEventKey,
  type FoundationType,
  type GameEvent,
  type SuperstructureType,
} from "@/lib/types";

export const INITIAL_BUDGET = 500000; // 500,000 NPR

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
  [GameEventKey.foundation]: {
    title: "Foundation",
    step: 1,
    description: "Choose the foundation type for your house.",
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
    description: "Choose the superstructure type for your house.",
    choices: [
      {
        choice: "adobe_mud",
        price: 100000,
      },
      {
        choice: "cement_mortar_stone",
        price: 250000,
      },
      {
        choice: "timber",
        price: 400000,
      },
      {
        choice: "bamboo",
        price: 450000,
      },
      {
        choice: "rc",
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
    description: "Choose the finishing type for your house.",
    choices: [
      {
        choice: "plaster",
        price: 100000,
      },
      {
        choice: "paint",
        price: 150000,
      },
      {
        choice: "tiles",
        price: 200000,
      },
      {
        choice: "other",
        price: 0,
      },
    ],
  },
};
