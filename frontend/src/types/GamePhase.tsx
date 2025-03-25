"use client";

import { buildingSizeTypes, buildingTypes } from "@/lib/constants";
import { Character } from "./Character";
import { Location } from "./Location";

export enum GamePhase {
  Introduction = "Introduction",
  CharacterSelection = "CharacterSelection",// New phase
  LocationSelection = "LocationSelection",
  BuildingSize = "BuildingSize",
  BuildingStructure = "BuildingStructure",
  Simulation = "Simulation",
  Results = "Results",
  Reflection = "Reflection"
}// Update GameState to include location

export type GameState = {
  phase: GamePhase;
  baseBudget: number;
  totalBudget: number;
  availableFunds: number;
  character?: Character;
  location?: Location; // Selected location
  buildingSize?: (typeof buildingSizeTypes)[keyof typeof buildingSizeTypes];
  buildingStructure?: (typeof buildingTypes)[keyof typeof buildingTypes];
  earthquakeIntensity?: number;
  survivalProbability?: number;
  simulationComplete: boolean;
  lessons: string[];
};

