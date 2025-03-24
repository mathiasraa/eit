export const buildingStructureTypes = {
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
    vulnerability_multiplier: 0.8,
    source_cluster: "Size_Type_2",
  },

  "Medium Two-Story": {
    description: "Standard two-story building of moderate height",
    plinth_area_sq_ft: "180 to 407",
    height_ft_pre_eq: "11 to 16",
    count_floors_pre_eq: 2,
    base_cost: 50000,
    vulnerability_multiplier: 1.0,
    source_cluster: "Size_Type_1",
  },

  "Large Two-Story": {
    description: "Spacious two-story building",
    plinth_area_sq_ft: "407 to 633",
    height_ft_pre_eq: "11 to 16",
    count_floors_pre_eq: 2,
    base_cost: 70000,
    vulnerability_multiplier: 1.1,
    source_cluster: "Size_Type_4",
  },

  "Tall Three-Story": {
    description: "Multi-story building with significant height",
    plinth_area_sq_ft: "180 to 407",
    height_ft_pre_eq: "16 to 22",
    count_floors_pre_eq: 3,
    base_cost: 90000,
    vulnerability_multiplier: 1.3,
    source_cluster: "Size_Type_3",
  },

  "Large Three-Story": {
    description: "Spacious three-story building",
    plinth_area_sq_ft: "407 to 633",
    height_ft_pre_eq: "16 to 22",
    count_floors_pre_eq: 3,
    base_cost: 110000,
    vulnerability_multiplier: 1.4,
    source_cluster: "Size_Type_6",
  },
};
