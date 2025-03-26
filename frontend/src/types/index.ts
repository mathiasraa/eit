import { buildingSizeTypes, buildingTypes } from "@/lib/constants";

export type Location = {
  id: string;
  name: string;
  region: string;
  description: string;
  earthquakeRiskFactor: number; // 0-1 where higher means more risk
  coordinates: { x: number; y: number }; // For positioning on the map
  image: string;
  historicalContext: string;
};

export enum GamePhase {
  Introduction = "Introduction",
  CharacterSelection = "CharacterSelection",
  LocationSelection = "LocationSelection",
  BuildingStructure = "BuildingStructure",
  BuildingSize = "BuildingSize",
  Simulation = "Simulation",
  Results = "Results",
  Reflection = "Reflection",
}

export type GameState = {
  phase: GamePhase;
  baseBudget: number;
  totalBudget: number;
  availableFunds: number;
  character?: Character;
  location?: Location;
  buildingSize?: (typeof buildingSizeTypes)[keyof typeof buildingSizeTypes];
  buildingStructure?: (typeof buildingTypes)[keyof typeof buildingTypes];
  earthquakeIntensity?: number;
  survivalProbability?: number;
  simulationComplete: boolean;
  lessons: string[];
};

export type Character = {
  id: string;
  name: string;
  description: string;
  occupation: string;
  age: number;
  budgetModifier: number;
  image: string;
  backstory: string;
};
