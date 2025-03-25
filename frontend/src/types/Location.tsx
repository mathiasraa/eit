"use client";

export type Location = {
  id: string;
  name: string;
  region: string;
  description: string;
  earthquakeRiskFactor: number; // 0-1 where higher means more risk
  coordinates: { x: number; y: number; }; // For positioning on the map
  image: string;
  historicalContext: string;
};
