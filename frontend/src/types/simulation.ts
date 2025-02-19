import type { FoundationType, SuperstructureType } from "@/lib/types";

export interface SimulationFeatures {
  num_floors: number;
  foundation_type: FoundationType;
  superstructure_type: SuperstructureType;
  age: number;
  plinth_area: number;
}
