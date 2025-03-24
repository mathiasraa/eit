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


export const buildingTypes = {
  "Traditional Bamboo": {
    description: "Simple bamboo structure with timber framing",
    foundation_type: "Bamboo/Timber",
    roof_type: "Bamboo/Timber-Light roof",
    ground_floor_type: "Mud",
    other_floor_type: "Not applicable",
    has_superstructure_timber: 1,
    has_superstructure_bamboo: 1,
    cost_multiplier: 0.6,
    earthquake_vulnerability: "Very High",
    source_cluster: "Building_Type_1",
  },

  "Basic Stone/Brick": {
    description: "Stone/brick home with light roof and mud mortar",
    foundation_type: "Mud mortar-Stone/Brick",
    roof_type: "Bamboo/Timber-Light roof",
    ground_floor_type: "Mud",
    other_floor_type: "TImber/Bamboo-Mud",
    has_superstructure_mud_mortar_stone: 1,
    cost_multiplier: 0.8,
    earthquake_vulnerability: "High",
    source_cluster: "Building_Type_2",
  },

  "Improved Stone/Brick": {
    description: "Stone/brick home with heavy timber roof for better stability",
    foundation_type: "Mud mortar-Stone/Brick",
    roof_type: "Bamboo/Timber-Heavy roof",
    ground_floor_type: "Brick/Stone",
    other_floor_type: "TImber/Bamboo-Mud",
    has_superstructure_mud_mortar_stone: 1,
    cost_multiplier: 1.0,
    earthquake_vulnerability: "Medium-High",
    source_clusters: ["Building_Type_3", "Building_Type_5"],
  },

  "Modern Concrete": {
    description: "Reinforced concrete structure with modern materials",
    foundation_type: "RC",
    roof_type: "RCC/RB/RBC",
    ground_floor_type: "RC",
    other_floor_type: "RCC/RB/RBC",
    has_superstructure_cement_mortar_brick: 1,
    cost_multiplier: 1.5,
    earthquake_vulnerability: "Medium",
    source_cluster: "Building_Type_6",
  },

  "Engineered Earthquake-Resistant": {
    description: "Specially designed structure to resist earthquake forces",
    foundation_type: "RC",
    roof_type: "RCC/RB/RBC",
    ground_floor_type: "RC",
    other_floor_type: "RCC/RB/RBC",
    has_superstructure_rc_engineered: 1,
    cost_multiplier: 2.0,
    earthquake_vulnerability: "Very Low",
    source_cluster: "Enhanced Building_Type_6",
  },
};

export const buildingSizeTypes = {
  "Small Single-Story": {
    description: "Compact single-story building",
    plinth_area_sq_ft: "180 to 407",
    height_ft_pre_eq: "5 to 11",
    count_floors_pre_eq: 1,
    base_cost: 30000,
    source_cluster: "Size_Type_2",
  },

  "Medium Two-Story": {
    description: "Standard two-story building of moderate height",
    plinth_area_sq_ft: "180 to 407",
    height_ft_pre_eq: "11 to 16",
    count_floors_pre_eq: 2,
    base_cost: 50000,
    source_cluster: "Size_Type_1",
  },

  "Large Two-Story": {
    description: "Spacious two-story building",
    plinth_area_sq_ft: "407 to 633",
    height_ft_pre_eq: "11 to 16",
    count_floors_pre_eq: 2,
    base_cost: 70000,
    source_cluster: "Size_Type_4",
  },

  "Tall Three-Story": {
    description: "Multi-story building with significant height",
    plinth_area_sq_ft: "180 to 407",
    height_ft_pre_eq: "16 to 22",
    count_floors_pre_eq: 3,
    base_cost: 90000,
    source_cluster: "Size_Type_3",
  },

  "Large Three-Story": {
    description: "Spacious three-story building",
    plinth_area_sq_ft: "407 to 633",
    height_ft_pre_eq: "16 to 22",
    count_floors_pre_eq: 3,
    base_cost: 110000,
    source_cluster: "Size_Type_6",
  },
};
