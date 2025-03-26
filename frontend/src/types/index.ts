import { buildingSizeTypes, buildingTypes } from "@/lib/constants";

export interface LocationCoordinates {
  lat: number; // Latitude
  lng: number; // Longitude
}

export interface Location {
  id: string;
  name: string;
  region: string;
  description: string;
  earthquakeRiskFactor: number; // 0-1 where higher means more risk
  geotechnicalRiskFactor: number; // 0-1 where higher means more risk
  coordinates: LocationCoordinates; // For positioning on the map
  image: string;
  historicalContext: string;
}

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

export interface Character {
  id: string;
  name: string;
  description: string;
  education: string;
  age: number;
  budget: number;
  image: string;
  backstory: string;
}
