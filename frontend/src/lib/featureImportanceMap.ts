export function mapFeatureImportanceToUserFriendly(
  featureImportance: Record<string, number>
) {
  const featureDescriptions: Record<
    string,
    {
      displayName: string;
      description: string;
      unit?: string;
    }
  > = {
    age_building: {
      displayName: "Building Age",
      description: "How old the building is",
      unit: "years",
    },
    count_floors_pre_eq: {
      displayName: "Number of Floors",
      description: "The number of floors in the building",
    },
    has_geotechnical_risk: {
      displayName: "Ground Stability Risk",
      description: "Risk related to the stability of the ground",
    },
    height_plinth_ratio: {
      displayName: "Height to Base Size Ratio",
      description: "The ratio of building height to its base area",
    },
    has_superstructure_adobe_mud: {
      displayName: "Adobe Mud Construction",
      description: "Made with sun-dried mud bricks",
    },
    has_superstructure_mud_mortar_stone: {
      displayName: "Stone with Mud Mortar Construction",
      description: "Made with stones held together by mud mortar",
    },
    has_superstructure_stone_flag: {
      displayName: "Stone Flag Construction",
      description: "Made with flat stone pieces",
    },
    has_superstructure_cement_mortar_stone: {
      displayName: "Stone with Cement Mortar Construction",
      description: "Made with stones held together by cement mortar",
    },
    has_superstructure_mud_mortar_brick: {
      displayName: "Brick with Mud Mortar Construction",
      description: "Made with bricks held together by mud mortar",
    },
    has_superstructure_cement_mortar_brick: {
      displayName: "Brick with Cement Mortar Construction",
      description: "Made with bricks held together by cement mortar",
    },
    has_superstructure_timber: {
      displayName: "Timber Construction",
      description: "Made primarily with wooden structures",
    },
    has_superstructure_bamboo: {
      displayName: "Bamboo Construction",
      description: "Made primarily with bamboo structures",
    },
    has_superstructure_rc_non_engineered: {
      displayName: "Non-Engineered Reinforced Concrete",
      description:
        "Built with reinforced concrete but without proper engineering design",
    },
    has_superstructure_rc_engineered: {
      displayName: "Engineered Reinforced Concrete",
      description: "Built with professionally engineered reinforced concrete",
    },
    has_superstructure_other: {
      displayName: "Other Construction Materials",
      description: "Uses other types of construction materials",
    },
    "foundation_type_Bamboo/Timber": {
      displayName: "Bamboo/Timber Foundation",
      description: "Foundation made of bamboo or wood",
    },
    "foundation_type_Cement-Stone/Brick": {
      displayName: "Cement-Stone/Brick Foundation",
      description: "Foundation made of cement-bonded stone or brick",
    },
    "foundation_type_Mud mortar-Stone/Brick": {
      displayName: "Mud Mortar-Stone/Brick Foundation",
      description: "Foundation made of stone or brick with mud mortar",
    },
    foundation_type_Other: {
      displayName: "Other Foundation Type",
      description: "Uses other types of foundation materials",
    },
    foundation_type_RC: {
      displayName: "Reinforced Concrete Foundation",
      description: "Foundation made of reinforced concrete",
    },
    "roof_type_Bamboo/Timber": {
      displayName: "Bamboo/Timber Roof",
      description: "Roof made of bamboo or wood",
    },
    "roof_type_RCC/RB/RBC": {
      displayName: "Concrete Roof",
      description: "Roof made of reinforced cement concrete",
    },
    "ground_floor_type_Brick/Stone": {
      displayName: "Brick/Stone Ground Floor",
      description: "Ground floor made of brick or stone",
    },
    ground_floor_type_Mud: {
      displayName: "Mud Ground Floor",
      description: "Ground floor made of mud",
    },
    ground_floor_type_Other: {
      displayName: "Other Ground Floor Type",
      description: "Uses other types of ground floor materials",
    },
    ground_floor_type_RC: {
      displayName: "Reinforced Concrete Ground Floor",
      description: "Ground floor made of reinforced concrete",
    },
    ground_floor_type_Timber: {
      displayName: "Timber Ground Floor",
      description: "Ground floor made of wood",
    },
    "other_floor_type_Not applicable": {
      displayName: "No Upper Floors",
      description: "Building has only a ground floor",
    },
    "other_floor_type_RCC/RB/RBC": {
      displayName: "Concrete Upper Floors",
      description: "Upper floors made of reinforced cement concrete",
    },
    "other_floor_type_TImber/Bamboo-Mud": {
      displayName: "Timber/Bamboo-Mud Upper Floors",
      description: "Upper floors made of timber or bamboo with mud",
    },
    "other_floor_type_Timber-Planck": {
      displayName: "Timber Plank Upper Floors",
      description: "Upper floors made of timber planks",
    },
    "position_Attached-1 side": {
      displayName: "Attached on One Side",
      description: "Building is attached to another structure on one side",
    },
    "position_Attached-2 side": {
      displayName: "Attached on Two Sides",
      description: "Building is attached to other structures on two sides",
    },
    "position_Attached-3 side": {
      displayName: "Attached on Three Sides",
      description: "Building is attached to other structures on three sides",
    },
    "position_Not attached": {
      displayName: "Standalone Building",
      description: "Building is not attached to any other structures",
    },
  };

  // Group features by impact significance
  const highRisk = [];
  const moderateRisk = [];
  const lowRisk = [];
  const protective = [];
  const highlyProtective = [];

  // Categorize each feature based on its importance value
  for (const [feature, value] of Object.entries(featureImportance)) {
    // Skip if we don't have a description for this feature
    if (!featureDescriptions[feature]) continue;

    const featureInfo = {
      key: feature,
      name: featureDescriptions[feature].displayName,
      description: featureDescriptions[feature].description,
      impact: Math.abs(value).toFixed(1),
      rawImpact: value,
      unit: featureDescriptions[feature].unit || null,
    };

    // Categorize based on impact value and sign
    if (value >= 10) {
      highRisk.push(featureInfo);
    } else if (value >= 5 && value < 10) {
      moderateRisk.push(featureInfo);
    } else if (value > 0 && value < 5) {
      lowRisk.push(featureInfo);
    } else if (value <= -5) {
      highlyProtective.push(featureInfo);
    } else if (value < 0) {
      protective.push(featureInfo);
    }
  }

  // Sort features by impact within each category
  const sortByImpact = (a: { impact: string }, b: { impact: string }) =>
    parseFloat(b.impact) - parseFloat(a.impact);
  highRisk.sort(sortByImpact);
  moderateRisk.sort(sortByImpact);
  lowRisk.sort(sortByImpact);
  protective.sort(sortByImpact);
  highlyProtective.sort(sortByImpact);

  // Determine overall risk level
  let overallRisk = "moderate";
  let primaryFactors: string[] = [];

  if (highRisk.length > 0) {
    overallRisk = "high";
    primaryFactors = highRisk.slice(0, 2).map((f) => f.name);
  } else if (highlyProtective.length > 0 && moderateRisk.length === 0) {
    overallRisk = "low";
    primaryFactors = highlyProtective.slice(0, 2).map((f) => f.name);
  } else if (moderateRisk.length > 0) {
    primaryFactors = moderateRisk.slice(0, 2).map((f) => f.name);
  }

  return {
    summary: {
      riskLevel: overallRisk,
      primaryFactors: primaryFactors,
    },
    details: {
      highRisk,
      moderateRisk,
      lowRisk,
      protective,
      highlyProtective,
    },
    allFactors: [
      ...highRisk,
      ...moderateRisk,
      ...lowRisk,
      ...protective,
      ...highlyProtective,
    ].sort((a, b) => b.rawImpact - a.rawImpact),
  };
}
