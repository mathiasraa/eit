import type { GameState } from "@/types";
import type { ModelData } from "@/types/api";
import assert from "assert";

export function gameStateAdapter(gameState: GameState): ModelData {
  const { buildingSize, buildingStructure, location } = gameState;

  assert(buildingSize, "Building size is required");
  assert(buildingStructure, "Building structure is required");

  return {
    count_floors_pre_eq: buildingSize.count_floors_pre_eq || 0,
    age_building: 0,
    has_superstructure_adobe_mud:
      "has_superstructure_adobe_mud" in buildingStructure ? 1 : 0,
    has_superstructure_mud_mortar_stone:
      "has_superstructure_mud_mortar_stone" in buildingStructure ? 1 : 0,
    has_superstructure_stone_flag:
      "has_superstructure_stone_flag" in buildingStructure ? 1 : 0,
    has_superstructure_cement_mortar_stone:
      "has_superstructure_cement_mortar_stone" in buildingStructure ? 1 : 0,
    has_superstructure_mud_mortar_brick:
      "has_superstructure_mud_mortar_brick" in buildingStructure ? 1 : 0,
    has_superstructure_cement_mortar_brick:
      "has_superstructure_cement_mortar_brick" in buildingStructure ? 1 : 0,
    has_superstructure_timber:
      "has_superstructure_timber" in buildingStructure ? 1 : 0,
    has_superstructure_bamboo:
      "has_superstructure_bamboo" in buildingStructure ? 1 : 0,
    has_superstructure_rc_non_engineered:
      "has_superstructure_rc_non_engineered" in buildingStructure ? 1 : 0,
    has_superstructure_rc_engineered:
      "has_superstructure_rc_engineered" in buildingStructure ? 1 : 0,
    has_superstructure_other:
      "has_superstructure_other" in buildingStructure ? 1 : 0,
    geotechnical_risk: location?.geotechnicalRiskFactor || 0,
    height_plinth_ratio: getHeightPlinthRatio(buildingSize),
    "foundation_type_Bamboo/Timber": convertBinary(
      "foundation_type",
      "foundation_type_Bamboo/Timber",
      buildingStructure?.foundation_type
    ),
    "foundation_type_Cement-Stone/Brick": convertBinary(
      "foundation_type",
      "foundation_type_Cement-Stone/Brick",
      buildingStructure?.foundation_type
    ),
    "foundation_type_Mud mortar-Stone/Brick": convertBinary(
      "foundation_type",
      "foundation_type_Mud mortar-Stone/Brick",
      buildingStructure?.foundation_type
    ),
    foundation_type_Other: convertBinary(
      "foundation_type",
      "foundation_type_Other",
      buildingStructure?.foundation_type
    ),
    foundation_type_RC: convertBinary(
      "foundation_type",
      "foundation_type_RC",
      buildingStructure?.foundation_type
    ),
    "roof_type_Bamboo/Timber": convertBinary(
      "roof_type",
      "roof_type_Bamboo/Timber",
      buildingStructure?.roof_type
    ),
    "roof_type_RCC/RB/RBC": convertBinary(
      "roof_type",
      "roof_type_RCC/RB/RBC",
      buildingStructure?.roof_type
    ),
    "ground_floor_type_Brick/Stone": convertBinary(
      "ground_floor_type",
      "ground_floor_type_Brick/Stone",
      buildingStructure?.ground_floor_type
    ),
    ground_floor_type_Mud: convertBinary(
      "ground_floor_type",
      "ground_floor_type_Mud",
      buildingStructure?.ground_floor_type
    ),
    ground_floor_type_Other: convertBinary(
      "ground_floor_type",
      "ground_floor_type_Other",
      buildingStructure?.ground_floor_type
    ),
    ground_floor_type_RC: convertBinary(
      "ground_floor_type",
      "ground_floor_type_RC",
      buildingStructure?.ground_floor_type
    ),
    ground_floor_type_Timber: convertBinary(
      "ground_floor_type",
      "ground_floor_type_Timber",
      buildingStructure?.ground_floor_type
    ),
    "other_floor_type_Not applicable": convertBinary(
      "other_floor_type",
      "other_floor_type_Not applicable",
      buildingStructure?.other_floor_type
    ),
    "other_floor_type_RCC/RB/RBC": convertBinary(
      "other_floor_type",
      "other_floor_type_RCC/RB/RBC",
      buildingStructure?.other_floor_type
    ),
    "other_floor_type_TImber/Bamboo-Mud": convertBinary(
      "other_floor_type",
      "other_floor_type_TImber/Bamboo-Mud",
      buildingStructure?.other_floor_type
    ),
    "other_floor_type_Timber-Planck": convertBinary(
      "other_floor_type",
      "other_floor_type_Timber-Planck",
      buildingStructure?.other_floor_type
    ),
    "position_Attached-1 side": 0,
    "position_Attached-2 side": 0,
    "position_Attached-3 side": 0,
    "position_Not attached": 0,
  };
}

function getHeightPlinthRatio(
  buildingSize: Required<GameState>["buildingSize"]
): number {
  const heightSplit = buildingSize.height_ft_pre_eq.split(" ");
  const minHeight = heightSplit[0];
  const maxHeight = heightSplit[heightSplit.length - 1];

  const areaSplit = buildingSize.plinth_area_sq_ft.split(" ");
  const minArea = areaSplit[0];
  const maxArea = areaSplit[areaSplit.length - 1];

  const height = (parseInt(minHeight) + parseInt(maxHeight)) / 2;
  const area = (parseInt(minArea) + parseInt(maxArea)) / 2;

  return height / area;
}

function convertBinary(key: string, property: string, value?: string): 0 | 1 {
  const core = property.replace(key, "");

  return value === core ? 1 : 0;
}
