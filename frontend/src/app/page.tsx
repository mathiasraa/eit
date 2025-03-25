"use client";

import { Button } from "@/components/ui/button";
import { buildingSizeTypes, buildingTypes } from "@/lib/constants";
import { useState, type Dispatch, type SetStateAction } from "react";
import { introductionPhase } from "../components/pages/introductionPhase";
import { characterSelectionPhase } from "../components/pages/characterSelectionPhase";
import { locationSelectPhase } from "../components/pages/locationSelectPhase";
import { buildingSizePhase } from "../components/pages/buildingSizePhase";
import { reflectionPhase } from "../components/pages/reflectionPhase";
import { resultPhase } from "../components/pages/resultPhase";
import { buildingStructurePhase } from "../components/pages/buildingStructurePhase";
import { simulationPhase } from "../components/pages/simulationPhase";

enum GamePhase {
  Introduction = "Introduction",
  CharacterSelection = "CharacterSelection", // New phase
  LocationSelection = "LocationSelection",
  BuildingSize = "BuildingSize",
  BuildingStructure = "BuildingStructure",
  Simulation = "Simulation",
  Results = "Results",
  Reflection = "Reflection",
}

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

export type Character = {
  id: string;
  name: string;
  description: string;
  occupation: string;
  age: number;
  budgetModifier: number; // Percentage modifier to apply to base budget
  image: string;
  backstory: string;
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

// Update GameState to include location
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

const gameStateDefaults: GameState = {
  phase: GamePhase.Introduction,
  baseBudget: 200000, // Base budget amount
  totalBudget: 0, // Will be modified based on character selection
  availableFunds: 0, // Will be modified based on character selection
  simulationComplete: false,
  lessons: [],
};

const GamePage: React.FC = () => {
  const [gameState, setGameState] = useState<GameState>(gameStateDefaults);

  function handleNextPhase() {
    const gamePhaseOrder = Object.values(GamePhase);
    const currGamePhaseIndex = gamePhaseOrder.indexOf(gameState.phase);

    if (currGamePhaseIndex < gamePhaseOrder.length - 1) {
      const nextGamePhase = gamePhaseOrder[currGamePhaseIndex + 1];

      // Special case for simulation phase
      if (nextGamePhase === GamePhase.Simulation) {
        runSimulation();
      } else {
        setGameState((s) => ({ ...s, phase: nextGamePhase }));
      }
    }
  }

  function handlePreviousPhase() {
    const gamePhaseOrder = Object.values(GamePhase);
    const currGamePhaseIndex = gamePhaseOrder.indexOf(gameState.phase);

    if (currGamePhaseIndex > 0) {
      const prevGamePhase = gamePhaseOrder[currGamePhaseIndex - 1];
      setGameState((s) => ({ ...s, phase: prevGamePhase }));
    }
  }

  function resetGame() {
    setGameState(gameStateDefaults);
  }

  function runSimulation() {
    const earthquakeIntensity = Math.random() * 3 + 6.5; // Random intensity between 6.5 and 9.5
    const survivalProbability = Math.random(); // Random survival probability between 0 and 1

    // Generate lessons based on decisions
    const lessons = generateLessons(
      gameState,
      survivalProbability,
      earthquakeIntensity
    );

    setGameState((s) => ({
      ...s,
      phase: GamePhase.Results,
      earthquakeIntensity,
      survivalProbability,
      simulationComplete: true,
      lessons,
    }));
  }

  function generateLessons(
    state: GameState,
    survivalProbability: number,
    intensity: number
  ): string[] {
    const lessons: string[] = [];

    // Building structure lessons
    if (!state.buildingStructure || 0 < 50) {
      lessons.push(
        "Building structural integrity is critical during severe earthquakes. Reinforced concrete and steel frames significantly increase survival rates in Nepal."
      );
    }

    // Intensity-specific lessons
    if (intensity > 7.5) {
      lessons.push(
        `At magnitude ${intensity.toFixed(
          1
        )}, this earthquake was comparable to the 7.8 magnitude Nepal earthquake, which caused catastrophic damage to unreinforced structures.`
      );
    }

    // Budget lessons
    if (state.availableFunds > state.totalBudget * 0.3) {
      lessons.push(
        "Underspending on preparedness can be costly. Data from Nepal shows that each dollar spent on preparedness saved approximately seven dollars in recovery costs."
      );
    }

    if (state.location) {
      if (state.location.earthquakeRiskFactor > 0.7) {
        lessons.push(
          `Living in ${state.location.name}, a high-risk area, meant your building experienced stronger shaking than many other regions of Nepal. Data from 2015 showed that buildings in this region needed additional reinforcement to withstand such forces.`
        );
      } else if (state.location.earthquakeRiskFactor < 0.4) {
        lessons.push(
          `Though ${state.location.name} experienced less intense shaking than other regions, the 2015 earthquake showed that distance from urban centers created challenges for emergency response and aid distribution.`
        );
      }
    }

    return lessons;
  }

  const canProceed = () => {
    switch (gameState.phase) {
      case GamePhase.Introduction:
        return true;
      case GamePhase.CharacterSelection:
        return !!gameState.character;
      case GamePhase.LocationSelection:
        return !!gameState.location;
      case GamePhase.BuildingSize:
        return !!gameState.buildingSize;
      case GamePhase.BuildingStructure:
        return !!gameState.buildingStructure;
      case GamePhase.Simulation:
        return gameState.simulationComplete;
      case GamePhase.Results:
        return true;
      case GamePhase.Reflection:
        return true;
      default:
        return true;
    }
  };

  return (
    <div className="flex justify-center p-5 w-full min-h-screen bg-gradient-to-b from-slate-900 to-slate-800 text-white">
      <div className="max-w-5xl w-full">
        {gameState.phase !== GamePhase.Introduction && (
          <header className="mb-8">
            <h1 className="text-3xl font-bold text-center mb-4">
              Nepal Earthquake Preparedness Simulation
            </h1>
            <div className="flex justify-between items-center p-4 bg-slate-800 rounded-lg shadow-md">
              <div className="text-xl">
                Budget:{" "}
                <span className="font-bold text-green-400">
                  ${gameState.availableFunds.toLocaleString()}
                </span>
                <span className="text-slate-400 text-sm ml-2">
                  of ${gameState.totalBudget.toLocaleString()}
                </span>
              </div>
              <div className="text-lg flex items-center">
                <span className="mr-2">Phase:</span>
                <span className="font-medium bg-blue-900 px-3 py-1 rounded-full text-sm">
                  {gameState.phase}
                </span>
              </div>
            </div>
          </header>
        )}

        <GameStateView gameState={gameState} onGameStateChange={setGameState} />

        <div className="flex justify-between mt-8">
          {gameState.phase !== GamePhase.Introduction && (
            <Button
              variant="outline"
              onClick={handlePreviousPhase}
              className="px-6 border-slate-600"
              disabled={
                gameState.phase === GamePhase.Results ||
                gameState.phase === GamePhase.Reflection
              }
            >
              Back
            </Button>
          )}

          <div className="flex-grow"></div>

          {gameState.phase === GamePhase.Reflection ? (
            <Button
              variant="default"
              onClick={resetGame}
              className="bg-green-600 hover:bg-green-700 px-6"
            >
              Start New Simulation
            </Button>
          ) : (
            <Button
              onClick={handleNextPhase}
              disabled={!canProceed()}
              className="bg-blue-600 hover:bg-blue-700 px-6 disabled:opacity-50"
            >
              {gameState.phase === GamePhase.Results
                ? "Reflect on Experience"
                : "Next Phase"}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

const GameStateView: React.FC<{
  gameState: GameState;
  onGameStateChange: Dispatch<SetStateAction<GameState>>;
}> = ({ gameState, onGameStateChange }) => {
  function handleBuildingSizeSelect(
    sizeType: (typeof buildingSizeTypes)[keyof typeof buildingSizeTypes]
  ) {
    onGameStateChange((s) => {
      const costDifference =
        (sizeType.base_cost || 0) - (s.buildingSize?.base_cost || 0);
      return {
        ...s,
        buildingSize: sizeType,
        availableFunds: s.availableFunds - costDifference,
      };
    });
  }

  function handleBuildingStructureSelect(
    structureType: (typeof buildingTypes)[keyof typeof buildingTypes]
  ) {
    onGameStateChange((s) => {
      const costDifference =
        (structureType.cost_multiplier || 0) -
        (s.buildingStructure?.cost_multiplier || 0);
      return {
        ...s,
        buildingStructure: structureType,
        availableFunds: s.availableFunds - costDifference,
      };
    });
  }

  function handleCharacterSelect(character: Character) {
    onGameStateChange((s) => {
      const modifiedBudget = Math.round(
        s.baseBudget * character.budgetModifier
      );
      return {
        ...s,
        character: character,
        totalBudget: modifiedBudget,
        availableFunds: modifiedBudget,
      };
    });
  }

  function handleLocationSelect(location: Location) {
    onGameStateChange((s) => ({
      ...s,
      location: location,
      // Could also modify budget or other factors based on location if desired
    }));
  }

  switch (gameState.phase) {
    case GamePhase.Introduction:
      return (
        introductionPhase()
      );
    case GamePhase.CharacterSelection:
      return (
        characterSelectionPhase(gameState, handleCharacterSelect)
      );

    case GamePhase.LocationSelection:
      return (
        locationSelectPhase(gameState, handleLocationSelect)
      );

    case GamePhase.BuildingSize:
      return (
        buildingSizePhase(gameState, handleBuildingSizeSelect)
      );

    case GamePhase.BuildingStructure:
      return (
        buildingStructurePhase(gameState, handleBuildingStructureSelect)
      );

    case GamePhase.Simulation:
      return (
        simulationPhase()
      );

    case GamePhase.Results:
      return (
        resultPhase(gameState)
      );
    case GamePhase.Reflection:
      return (
        reflectionPhase(gameState)
      );
  }
};

export default GamePage;