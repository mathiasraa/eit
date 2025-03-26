import {
  GameEventKey,
  type FoundationType,
  type GameEvent,
  type SuperstructureType,
} from "@/lib/types";
import type { Character, Location } from "@/types";

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
    description:
      "Choose the foundation type for your house. This will determine the strength of the base of your house.",
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
    description:
      "Choose the superstructure type for your house. This will determine the material used for the walls and roof of your house.",
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
    description:
      "Choose the finishing type for your house. This will determine the material used for the walls and roof of your house.",
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

// https://www.skillsewa.com/blog-details/how-much-money-is-needed-to-construct-a-house-in-nepal
export const buildingTypes = {
  "Traditional Bamboo": {
    description: "Simple bamboo structure with timber framing",
    foundation_type: "Bamboo/Timber",
    roof_type: "Bamboo/Timber-Light roof",
    ground_floor_type: "Mud",
    other_floor_type: "Not applicable",
    has_superstructure_timber: 1,
    has_superstructure_bamboo: 1,
    base_cost: 909, // 1 LAKH NPR
    src: "/building_types/bamboo.png",
    averageDamageGrade: 2.4688940092165894,
  },

  "Basic Stone/Brick": {
    description: "Stone/brick home with light roof and mud mortar",
    foundation_type: "Mud mortar-Stone/Brick",
    roof_type: "Bamboo/Timber-Light roof",
    ground_floor_type: "Mud",
    other_floor_type: "TImber/Bamboo-Mud",
    has_superstructure_mud_mortar_stone: 1,
    base_cost: 1455, // NPR 100,000 to NPR 500,000
    src: "/building_types/brick_mud.png",
    averageDamageGrade: 4.005705185903206,
  },

  "Improved Stone/Brick": {
    description: "Stone/brick home with heavy timber roof for better stability",
    foundation_type: "Mud mortar-Stone/Brick",
    roof_type: "Bamboo/Timber-Heavy roof",
    ground_floor_type: "Brick/Stone",
    other_floor_type: "TImber/Bamboo-Mud",
    has_superstructure_mud_mortar_stone: 1,
    base_cost: 3637,
    src: "/building_types/improved_brick.png",
    averageDamageGrade: 4.031253052055865,
  },

  "Modern Concrete": {
    description: "Reinforced concrete structure with modern materials",
    foundation_type: "RC",
    roof_type: "RCC/RB/RBC",
    ground_floor_type: "RC",
    other_floor_type: "RCC/RB/RBC",
    has_superstructure_cement_mortar_brick: 1,
    base_cost: 7275,
    src: "/building_types/modern_concrete.png",
    averageDamageGrade: 1.6486562942008485,
  },
};

export const buildingSizeTypes = {
  "Small Single-Story": {
    description: "Compact single-story building",
    plinth_area_sq_ft: "180 to 407",
    height_ft_pre_eq: "5 to 11",
    count_floors_pre_eq: 1,
    cost_multiplier: 1.0,
    source_cluster: "Size_Type_2",
    src: "/building_size/small_1_story.png",
    insight:
      "Similar structures in Nepal experienced moderate damage in the 2015 earthquake.",
    capacity: "5-10 people",
  },

  "Medium Two-Story": {
    description: "Standard two-story building of moderate height",
    plinth_area_sq_ft: "180 to 407",
    height_ft_pre_eq: "11 to 16",
    count_floors_pre_eq: 2,
    cost_multiplier: 1.81,
    source_cluster: "Size_Type_1",
    src: "/building_size/medium_2_story.png",
    insight:
      "Similar structures in Nepal experienced moderate damage in the 2015 earthquake.",
    capacity: "10-15 people",
  },

  "Large Two-Story": {
    description: "Spacious two-story building",
    plinth_area_sq_ft: "407 to 633",
    height_ft_pre_eq: "11 to 16",
    count_floors_pre_eq: 2,
    cost_multiplier: 3.03,
    source_cluster: "Size_Type_4",
    src: "/building_size/large_2_story.png",
    insight:
      "Similar structures in Nepal experienced moderate damage in the 2015 earthquake.",
    capacity: "15-20 people",
  },

  "Tall Three-Story": {
    description: "Multi-story building with significant height",
    plinth_area_sq_ft: "180 to 407",
    height_ft_pre_eq: "16 to 22",
    count_floors_pre_eq: 3,
    cost_multiplier: 2.62,
    source_cluster: "Size_Type_3",
    src: "/building_size/small_3_story.png",
    insight:
      "Similar structures in Nepal experienced moderate damage in the 2015 earthquake.",
    capacity: "10-15 people",
  },

  "Large Three-Story": {
    description: "Spacious three-story building",
    plinth_area_sq_ft: "407 to 633",
    height_ft_pre_eq: "16 to 22",
    count_floors_pre_eq: 3,
    cost_multiplier: 4.38,
    source_cluster: "Size_Type_6",
    src: "/building_size/large_3_story.png",
    insight:
      "Similar structures in Nepal experienced moderate damage in the 2015 earthquake.",
    capacity: "15-20 people",
  },
};

// Example characters based on demographic clusters from Nepal data

export const availableCharacters: Character[] = [
  {
    id: "rural-farmer",
    name: "Anil Tamang",
    description: "Rural farmer with limited resources but practical knowledge",
    occupation: "Subsistence Farmer",
    age: 45,
    budgetModifier: 0.8, // 80% of base budget
    image: "/character.png",
    backstory:
      "Anil has lived his entire life in a small village outside Kathmandu, working the same land as his ancestors. While his financial resources are limited, his practical knowledge of building with local materials could prove valuable.",
  },
  {
    id: "urban-professional",
    name: "Priya Sharma",
    description:
      "Urban professional with higher income but less practical experience",
    occupation: "Software Engineer",
    age: 32,
    budgetModifier: 1.2, // 120% of base budget
    image: "/character.png",
    backstory:
      "Priya moved to Kathmandu after university to work for a growing tech company. Her higher income provides more resources, but her apartment building was constructed quickly during the urban boom with questionable adherence to building codes.",
  },
  {
    id: "village-teacher",
    name: "Dipak Gurung",
    description:
      "Village teacher with community connections and moderate resources",
    occupation: "Primary School Teacher",
    age: 38,
    budgetModifier: 1.0, // 100% of base budget
    image: "/character.png",
    backstory:
      "As a respected teacher in his community, Dipak has developed strong local networks that could help during a crisis. His modest income provides average resources for preparation.",
  },
  {
    id: "elderly-resident",
    name: "Maya Thapa",
    description:
      "Elderly resident with limited mobility but valuable experience",
    occupation: "Retired Shopkeeper",
    age: 72,
    budgetModifier: 0.9, // 90% of base budget
    image: "/character.png",
    backstory:
      "Maya has lived through previous earthquakes and has invaluable historical knowledge. However, her age and limited mobility present additional challenges during emergencies.",
  },
];
export const availableLocations: Location[] = [
  {
    id: "kathmandu",
    name: "Kathmandu",
    region: "Central Nepal",
    description:
      "The densely populated capital city with many older buildings and infrastructure",
    earthquakeRiskFactor: 0.7, // High risk
    coordinates: { x: 60, y: 68 },
    image: "/locations/kathmandu.png",
    historicalContext:
      "Kathmandu experienced severe damage during the 2015 earthquake, with many historic buildings collapsing. Its high population density and older infrastructure contributed to higher casualty rates.",
  },
  {
    id: "gorkha",
    name: "Gorkha",
    region: "Epicenter Region",
    description: "Rural district that was the epicenter of the 2015 earthquake",
    earthquakeRiskFactor: 0.9, // Very high risk
    coordinates: { x: 53, y: 59 },
    image: "/locations/gorkha.png",
    historicalContext:
      "As the epicenter of the 2015 earthquake, Gorkha experienced catastrophic damage. Many remote villages in this district were completely cut off from aid for days.",
  },
  {
    id: "mustang",
    name: "Mustang",
    region: "Northern Nepal",
    description: "Remote mountainous region with traditional building methods",
    earthquakeRiskFactor: 0.4, // Medium-low risk
    coordinates: { x: 46, y: 32 },
    image: "/locations/mustang.png",
    historicalContext:
      "Mustang's traditional building techniques and less dense population resulted in fewer casualties, though its remoteness presented challenges for receiving aid.",
  },
];
