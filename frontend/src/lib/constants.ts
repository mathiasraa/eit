import type { Character, Location } from "@/types";

export const INITIAL_BUDGET = 10815028; // 10,815,028 NPR OR 863 108,68 NOK

// https://www.skillsewa.com/blog-details/how-much-money-is-needed-to-construct-a-house-in-nepal
export const buildingTypes = {
  "Traditional Bamboo": {
    description:
      "A simple bamboo and timber-framed structure with a lightweight bamboo roof. The ground floor is made of mud, providing a traditional yet moderately resilient design.",
    foundation_type: "Bamboo/Timber",
    roof_type: "Bamboo/Timber-Light roof",
    ground_floor_type: "Mud",
    other_floor_type: "Not applicable",
    has_superstructure_timber: 1,
    has_superstructure_bamboo: 1,
    base_cost: 909, // 1 LAKH NPR
    src: "/building_types/bamboo.png",
    averageDamageGrade: 50,
    damage_description:
      "This house type gives moderate protection in the case of an earthquake",
    //2.4688940092165894,
  },

  "Basic Stone/Brick": {
    description:
      "A stone or brick house built with mud mortar, featuring a lightweight bamboo or timber roof. The floors are made of mud, with upper floors constructed using timber or bamboo with a mud finish.",
    foundation_type: "Mud mortar-Stone/Brick",
    roof_type: "Bamboo/Timber-Light roof",
    ground_floor_type: "Mud",
    other_floor_type: "TImber/Bamboo-Mud",
    has_superstructure_mud_mortar_stone: 1,
    base_cost: 1455, // NPR 100,000 to NPR 500,000
    src: "/building_types/brick_mud.png",
    averageDamageGrade: 20,
    damage_description:
      "This house type gives very little protection in the case of an earthquake",
    //4.005705185903206,
  },

  "Improved Stone/Brick": {
    description:
      "A stone or brick house with a reinforced heavy timber roof for improved stability. The ground floor is made of sturdy brick or stone, while upper floors use timber or bamboo with a mud finish.",
    foundation_type: "Mud mortar-Stone/Brick",
    roof_type: "Bamboo/Timber-Heavy roof",
    ground_floor_type: "Brick/Stone",
    other_floor_type: "TImber/Bamboo-Mud",
    has_superstructure_mud_mortar_stone: 1,
    base_cost: 3637,
    src: "/building_types/improved_brick.png",
    averageDamageGrade: 25,
    damage_description:
      "This house type gives litte protection in the case of an earthquake",
    //4.031253052055865,
  },

  "Modern Concrete": {
    description:
      "A reinforced concrete structure built with modern materials, providing both structural support and a durable roof for enhanced earthquake resistance.",
    foundation_type: "RC",
    roof_type: "RCC/RB/RBC",
    ground_floor_type: "RC",
    other_floor_type: "RCC/RB/RBC",
    has_superstructure_cement_mortar_brick: 1,
    base_cost: 7275,
    src: "/building_types/modern_concrete.png",
    averageDamageGrade: 90,
    damage_description:
      "This house type gives alot of protection in the case of an earthquake", //1.6486562942008485,
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
      "During the 2015 Gorkha earthquake, single-story buildings with smaller footprints generally experienced less severe damage compared to multi-story structures. Their low height and simple design contributed to better overall performance, though corner separation remained a common issue.",
    capacity: "3-5 people",
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
      "Two-story buildings of moderate size showed mixed performance in the 2015 earthquake. Their increased height compared to single-story structures made them more susceptible to lateral forces. However, those designed with proper vertical continuity and limited openings performed relatively well.",
    capacity: "5-8 people",
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
      "Large two-story buildings with substantial floor areas provided better evacuation options during the 2015 earthquake. Their wider base and lower height-to-width ratio contributed to improved stability compared to taller structures with similar floor areas.",
    capacity: "8-12 people",
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
      "Three-story buildings with smaller footprints were among the more vulnerable structures during the 2015 earthquake. Their height-to-width ratio made them susceptible to overturning forces and soft-story failures, especially in urban areas where they are common.",
    capacity: "7-10 people",
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
      "These larger three-story structures experienced varied outcomes in the 2015 earthquake. While their substantial floor area provided more options for internal bracing, the combination of height and mass made them vulnerable to significant lateral forces. Post-earthquake reconstruction has emphasized improved structural design for buildings of this size.",
    capacity: "10-15 people",
  },
};

// Example characters based on demographic clusters from Nepal data

export const availableCharacters: Character[] = [
  {
    id: "rural-farmer",
    name: "Anil Tamang",
    description: "Rural farmer with limited resources but practical knowledge",
    education: "Illiterate",
    age: 48,
    budget: (((11450 / 101) * 12 * 1) / 1.6) * 5, // 80% of base budget
    image: "/character.png",
    backstory:
      "Anil has lived his entire life in a small village outside Kathmandu, working the same land as his ancestors. While his financial resources are limited, his practical knowledge of building with local materials could prove valuable.",
  },
  {
    id: "urban-professional",
    name: "Priya Sharma",
    description:
      "Urban professional with higher income but less practical experience",
    education: "Bachelor level",
    age: 38,
    budget: (((24000 / 101) * 12 * 1) / 1.6) * 5, // 120% of base budget
    image: "/character.png",
    backstory:
      "Priya moved to Kathmandu after university to work for a growing tech company. His higher income provides more resources, but his apartment building was constructed quickly during the urban boom with questionable adherence to building codes.",
  },
  {
    id: "village-teacher",
    name: "Dipak Gurung",
    description:
      "Village teacher with community connections and moderate resources",
    education: "Non formal education",
    age: 45,
    budget: (((15900 / 101) * 12 * 1) / 1.6) * 5, // 120% of base budget
    image: "/character.png",
    backstory:
      "As a respected teacher in his community, Dipak has developed strong local networks that could help during a crisis. His modest income provides average resources for preparation.",
  },
  {
    id: "housekeeper",
    name: "Maya Thapa",
    description:
      "Maya Thapa works as a housekeeper, handling tasks like cleaning, cooking, and organizing. Her reliability and attention to detail make her a trusted presence in the community.",
    education: "Illiterate",
    age: 51,
    budget: (((11910 / 101) * 12 * 1) / 1.6) * 5, // 90% of base budget
    image: "/character.png",
    backstory:
      "Maya has spent years as a housekeeper, taking pride in maintaining clean and organized homes. Known for her strong work ethic and warm personality, she finds fulfillment in helping others create comfortable living spaces.",
  },
];
export const availableLocations: Location[] = [
  {
    id: "sindhupalchok",
    name: "Sindhupalchok",
    region: "Central Nepal",
    description:
      "A mountainous district severely affected by the 2015 earthquake with high seismic activity",
    earthquakeRiskFactor: 0.96, // Very high earthquake risk
    geotechnicalRiskFactor: 0.23, // Moderate geotechnical risk
    coordinates: {
      lat: 27.9512,
      lng: 85.6846,
    },
    image: "/locations/kathmandu.png", // Using existing image as placeholder
    historicalContext:
      "Sindhupalchok was one of the worst-affected districts in the 2015 earthquake, with nearly 2,000 casualties and widespread destruction of buildings and infrastructure. Its mountainous terrain contributed to numerous landslides triggered by the quake.",
  },
  {
    id: "gorkha",
    name: "Gorkha",
    region: "Central-Western Nepal",
    description: "Rural district that was the epicenter of the 2015 earthquake",
    earthquakeRiskFactor: 0.6, // High earthquake risk
    geotechnicalRiskFactor: 0.13, // Low-moderate geotechnical risk
    coordinates: {
      lat: 28.0,
      lng: 84.6333,
    },
    image: "/locations/gorkha.png",
    historicalContext:
      "As the epicenter of the 2015 earthquake, Gorkha experienced catastrophic damage. Many remote villages in this district were completely cut off from aid for days, though its relatively stable ground conditions limited additional geotechnical hazards.",
  },
  {
    id: "makwanpur",
    name: "Makwanpur",
    region: "Central Nepal",
    description:
      "A diverse district with both hilly terrain and flat land areas with lower seismic risk",
    earthquakeRiskFactor: 0.24, // Low earthquake risk
    geotechnicalRiskFactor: 0.12, // Low geotechnical risk
    coordinates: {
      lat: 27.5545,
      lng: 85.0233,
    },
    image: "/locations/mustang.png", // Using existing image as placeholder
    historicalContext:
      "Makwanpur experienced relatively less damage during the 2015 earthquake compared to northern districts. Its varied terrain includes both susceptible hill slopes and more stable flat areas, providing a diverse range of building conditions.",
  },
  {
    id: "sindhuli",
    name: "Sindhuli",
    region: "Central-Eastern Nepal",
    description:
      "A hilly district with moderate earthquake risk but higher landslide potential",
    earthquakeRiskFactor: 0.3, // Moderate earthquake risk
    geotechnicalRiskFactor: 0.2, // Moderate geotechnical risk
    coordinates: {
      lat: 27.2569,
      lng: 85.9713,
    },
    image: "/locations/gorkha.png", // Using existing image as placeholder
    historicalContext:
      "Sindhuli district experienced moderate damage during the 2015 earthquake, but its hilly terrain makes it susceptible to rainfall-induced landslides which can be triggered by even moderate seismic activity, increasing the overall risk to buildings and infrastructure.",
  },
];
