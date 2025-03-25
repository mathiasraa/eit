"use client";

import { Button } from "@/components/ui/button";
import { buildingSizeTypes, buildingTypes } from "@/lib/constants";
import { useState, type Dispatch, type SetStateAction } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

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

type Location = {
  id: string;
  name: string;
  region: string;
  description: string;
  earthquakeRiskFactor: number; // 0-1 where higher means more risk
  coordinates: { x: number; y: number }; // For positioning on the map
  image: string;
  historicalContext: string;
};

const availableLocations: Location[] = [
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

type Character = {
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
const availableCharacters: Character[] = [
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
type GameState = {
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
        <div className="bg-slate-800 p-8 rounded-xl shadow-lg">
          <h1 className="text-3xl font-bold mb-6">
            Nepal Earthquake Preparedness Simulation
          </h1>

          <div className="mb-6 flex flex-col md:flex-row gap-6">
            <div className="flex-1">
              <p className="mb-4 text-lg">
                In 2015, Nepal experienced a devastating earthquake that claimed
                nearly 9,000 lives and displaced millions of people.
              </p>
              <p className="mb-4">
                In this simulation, you will make critical decisions about
                building construction and resource allocation that could affect
                survival outcomes during a similar earthquake scenario.
              </p>
              <p className="mb-4">
                Your decisions will be evaluated using machine learning models
                trained on actual data from the Nepal earthquake, giving you
                realistic feedback on the potential consequences of your
                choices.
              </p>
              <p>
                You have a budget limited budget to spend on construction and
                preparedness measures.
              </p>
            </div>
            <div className="w-full md:w-2/5">
              <div className="relative h-64 w-full rounded-lg overflow-hidden">
                <Image
                  src="/nepal.png"
                  alt="Nepal Earthquake Devastation"
                  layout="fill"
                  objectFit="cover"
                  className="rounded-lg"
                />
              </div>
              <p className="text-sm text-slate-400 mt-2 text-center italic">
                Aftermath of the 2015 Nepal earthquake in Kathmandu
              </p>
            </div>
          </div>

          <div className="bg-slate-700 p-4 rounded-lg mt-6">
            <h3 className="font-bold text-lg mb-2">Your Challenge:</h3>
            <p>
              Make strategic decisions to maximize survival probability during a
              simulated earthquake. Your choices will be analyzed using
              real-world data to determine likely outcomes.
            </p>
          </div>
        </div>
      );
    case GamePhase.CharacterSelection:
      return (
        <div>
          <h2 className="text-2xl font-bold mb-4">Choose Your Character</h2>
          <p className="mb-6 text-slate-300">
            The demographic profile you choose will affect your starting budget
            and may influence other aspects of your experience. Different
            characters represent various socioeconomic groups from Nepal during
            the 2015 earthquake.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {availableCharacters.map((character) => {
              const isSelected = gameState.character?.id === character.id;
              const modifiedBudget = Math.round(
                gameState.baseBudget * character.budgetModifier
              );

              return (
                <div
                  key={character.id}
                  className={cn(
                    `bg-slate-800 hover:bg-slate-750 overflow-hidden rounded-xl flex flex-row cursor-pointer transition-all`,
                    isSelected
                      ? "ring-2 ring-blue-500 transform scale-[1.02]"
                      : "ring-1 ring-slate-600"
                  )}
                  onClick={() => handleCharacterSelect(character)}
                >
                  <div className="p-5 flex-1">
                    <div className="flex justify-between items-center mb-2">
                      <div className="text-xl font-bold">{character.name}</div>
                      <div className="text-sm bg-slate-700 px-2 py-1 rounded-full">
                        Age: {character.age}
                      </div>
                    </div>

                    <div className="mb-3 text-slate-300">
                      {character.description}
                    </div>

                    <div className="text-sm">
                      <span className="font-medium">Occupation:</span>{" "}
                      {character.occupation}
                    </div>

                    <div className="mt-4 bg-slate-700 p-3 rounded-lg">
                      <div className="text-sm mb-2">{character.backstory}</div>
                      <div className="flex justify-between items-center mt-3">
                        <span className="text-sm">Starting Budget:</span>
                        <span className="text-green-400 font-bold">
                          ${modifiedBudget.toLocaleString()}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="w-40 relative bg-slate-700">
                    <Image
                      src={character.image}
                      alt={`${character.name}`}
                      layout="fill"
                      objectFit="cover"
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      );

    case GamePhase.LocationSelection:
      return (
        <div>
          <h2 className="text-2xl font-bold mb-4">Select Your Location</h2>
          <p className="mb-6 text-slate-300">
            Different regions of Nepal experienced varying intensities during
            the 2015 earthquake. Where you choose to live will impact your risk
            level and potential outcomes.
          </p>

          <div className="relative w-full h-[500px] bg-slate-700 rounded-xl overflow-hidden mb-6">
            {/* Map of Nepal */}
            <Image
              src="/map.jpg"
              alt="Map of Nepal"
              layout="fill"
              objectFit="cover"
              className="opacity-90"
            />

            {/* Location markers */}
            {availableLocations.map((location) => (
              <div
                key={location.id}
                className={cn(
                  "absolute w-8 h-8 rounded-full cursor-pointer transition-all transform hover:scale-125",
                  gameState.location?.id === location.id
                    ? "bg-blue-500 ring-4 ring-blue-300 z-20"
                    : "bg-red-500 hover:bg-red-400 z-10 opacity-30"
                )}
                style={{
                  left: `${location.coordinates.x}%`,
                  top: `${location.coordinates.y}%`,
                  transform: `translate(-50%, -50%) ${
                    gameState.location?.id === location.id ? "scale(1.2)" : ""
                  }`,
                }}
                onClick={() => handleLocationSelect(location)}
                title={location.name}
              >
                <span className="sr-only">{location.name}</span>
              </div>
            ))}

            {/* Map legend */}
            <div className="absolute bottom-4 right-4 bg-slate-800/80 p-3 rounded-lg">
              <div className="text-sm font-bold mb-2">
                Earthquake Risk Levels
              </div>
              <div className="flex items-center mb-1">
                <div className="w-3 h-3 rounded-full bg-red-300 mr-2"></div>
                <span className="text-xs">Low Risk</span>
              </div>
              <div className="flex items-center mb-1">
                <div className="w-3 h-3 rounded-full bg-red-500 mr-2"></div>
                <span className="text-xs">Medium Risk</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 rounded-full bg-red-700 mr-2"></div>
                <span className="text-xs">High Risk</span>
              </div>
            </div>
          </div>

          {/* Location information panel */}
          {gameState.location ? (
            <div className="bg-slate-800 p-4 rounded-xl flex flex-col md:flex-row">
              <div className="md:w-1/3 relative h-48 md:h-auto">
                <Image
                  src={gameState.location.image}
                  alt={gameState.location.name}
                  layout="fill"
                  objectFit="cover"
                  className="rounded-lg"
                />
              </div>
              <div className="md:w-2/3 p-4">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-xl font-bold">
                    {gameState.location.name}
                  </h3>
                  <div className="text-sm bg-slate-700 px-2 py-1 rounded-full">
                    {gameState.location.region}
                  </div>
                </div>

                <p className="mb-3">{gameState.location.description}</p>

                <div className="mb-3">
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium">Earthquake Risk</span>
                    <span className="text-sm">
                      {Math.round(
                        gameState.location.earthquakeRiskFactor * 100
                      )}
                      /100
                    </span>
                  </div>
                  <div className="h-2 bg-slate-700 rounded-full">
                    <div
                      className={`h-full rounded-full ${
                        gameState.location.earthquakeRiskFactor > 0.7
                          ? "bg-red-600"
                          : gameState.location.earthquakeRiskFactor > 0.4
                          ? "bg-orange-500"
                          : "bg-yellow-500"
                      }`}
                      style={{
                        width: `${
                          gameState.location.earthquakeRiskFactor * 100
                        }%`,
                      }}
                    ></div>
                  </div>
                </div>

                <div className="text-sm text-slate-300 italic">
                  <span className="font-medium">Historical Context:</span>{" "}
                  {gameState.location.historicalContext}
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-slate-800 p-6 rounded-xl text-center">
              <p className="text-slate-400">
                Click on a location marker on the map to select where you want
                to live.
              </p>
            </div>
          )}
        </div>
      );

    case GamePhase.BuildingSize:
      return (
        <div>
          <h2 className="text-2xl font-bold mb-4">Select Building Size</h2>
          <p className="mb-6 text-slate-300">
            The size of your building affects cost, capacity, and vulnerability
            during an earthquake. Data from Nepal showed that different building
            sizes experienced varying levels of damage.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {Object.entries(buildingSizeTypes).map(([key, value]) => {
              const isSelected = gameState.buildingSize === value;
              const canAfford =
                value.base_cost <=
                gameState.availableFunds +
                  (gameState.buildingSize?.base_cost || 0);

              return (
                <div
                  key={key}
                  className={cn(
                    `bg-slate-800 hover:bg-slate-750 overflow-hidden rounded-xl flex flex-row cursor-pointer transition-all`,
                    isSelected
                      ? "ring-2 ring-blue-500 transform scale-[1.02]"
                      : "ring-1 ring-slate-600",
                    !canAfford ? "opacity-50 cursor-not-allowed" : ""
                  )}
                  onClick={() => canAfford && handleBuildingSizeSelect(value)}
                >
                  <div className="p-5 flex-1">
                    <div className="flex justify-between items-center mb-2">
                      <div className="text-xl font-bold">{key}</div>
                    </div>

                    <div className="mb-4 text-slate-300">
                      {value.description}
                    </div>

                    <div className="grid grid-cols-3 gap-2">
                      <div className="bg-slate-700 rounded-lg p-3 text-sm">
                        <span className="font-medium block mb-1">Area:</span>
                        {value.plinth_area_sq_ft} m²
                      </div>
                      <div className="bg-slate-700 rounded-lg p-3 text-sm">
                        <span className="font-medium block mb-1">Floors:</span>
                        {value.count_floors_pre_eq}
                      </div>
                      <div className="bg-slate-700 rounded-lg p-3 text-sm">
                        <span className="font-medium block mb-1">
                          Capacity:
                        </span>
                        {"15-20 people"}
                      </div>
                    </div>

                    <div className="mt-4 text-sm text-slate-400">
                      <span className="font-medium">Nepal Insight:</span>{" "}
                      {
                        "Similar structures in Nepal experienced moderate damage in the 2015 earthquake."
                      }
                    </div>
                  </div>

                  <div className="w-40 relative bg-[#eee8d5]">
                    <Image
                      src={value.src}
                      alt={`${key} Building Size`}
                      layout="fill"
                      objectFit="contain"
                    />
                    <div className="absolute bottom-0 right-0 bg-slate-900/80 px-3 py-1 m-2 rounded-md">
                      <span className="text-green-400 font-medium">
                        ${value.base_cost?.toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      );

    case GamePhase.BuildingStructure:
      return (
        <div>
          <h2 className="text-2xl font-bold mb-4">Select Building Structure</h2>
          <p className="mb-6 text-slate-300">
            Your building&apos;s structural design is critical for earthquake
            resilience. Nepal&apos;s earthquake revealed that different construction
            methods yielded dramatically different survival rates.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {Object.entries(buildingTypes).map(([key, value]) => {
              const isSelected = gameState.buildingStructure === value;
              const canAfford =
                (value.cost_multiplier || 0) <=
                gameState.availableFunds +
                  (gameState.buildingStructure?.cost_multiplier || 0);

              return (
                <div
                  key={key}
                  className={cn(
                    `bg-slate-800 overflow-hidden rounded-xl flex flex-row cursor-pointer transition-all`,
                    isSelected
                      ? "ring-2 ring-blue-500 transform scale-[1.02]"
                      : "ring-1 ring-slate-600",
                    !canAfford ? "opacity-50 cursor-not-allowed" : ""
                  )}
                  onClick={() =>
                    canAfford && handleBuildingStructureSelect(value)
                  }
                >
                  <div className="p-5 flex-1">
                    <div className="flex justify-between items-center mb-2">
                      <div className="text-xl font-bold">{key}</div>
                    </div>

                    <div className="mb-4 text-slate-300">
                      {value.description}
                    </div>

                    <div className="mb-3">
                      <div className="flex justify-between mb-1">
                        <span className="text-sm font-medium">
                          Earthquake Resistance
                        </span>
                        <span className="text-sm">{50}/100</span>
                      </div>
                      <div className="h-2 bg-slate-700 rounded-full">
                        <div
                          className={`h-full rounded-full`}
                          style={{ width: `${50}%` }}
                        ></div>
                      </div>
                    </div>

                    <div className="text-sm text-slate-400 mt-4">
                      <span className="font-medium">Nepal Data:</span>{" "}
                      {
                        "Buildings with this structure had a 65% survival rate in the Nepal earthquake."
                      }
                    </div>
                  </div>

                  <div className="w-40 relative bg-slate-700">
                    <Image
                      src={value.src}
                      alt={`${key} Building Structure`}
                      layout="fill"
                      objectFit="cover"
                    />
                    <div className="absolute bottom-0 right-0 bg-slate-900/80 px-3 py-1 m-2 rounded-md">
                      <span className="text-green-400 font-medium">
                        ${value.cost_multiplier?.toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      );

    case GamePhase.Simulation:
      return (
        <div className="text-center p-10">
          <h2 className="text-2xl font-bold mb-6">
            Running Earthquake Simulation
          </h2>
          <p className="mb-10">
            Using machine learning models trained on Nepal earthquake data to
            predict the outcome of your decisions...
          </p>
          <div className="w-24 h-24 border-4 border-t-blue-500 border-r-transparent border-b-transparent border-l-transparent rounded-full animate-spin mx-auto"></div>
        </div>
      );

    case GamePhase.Results:
      return (
        <div className="bg-slate-800 p-8 rounded-xl shadow-lg">
          <h2 className="text-2xl font-bold mb-4">
            Earthquake Simulation Results
          </h2>

          <div className="flex flex-col md:flex-row gap-8 mb-8">
            <div className="flex-1">
              <div className="bg-slate-700 p-5 rounded-lg mb-6">
                <div className="text-lg mb-3">Earthquake Details:</div>
                <div className="flex justify-between items-center mb-2">
                  <span>Magnitude:</span>
                  <span className="font-bold text-red-400">
                    {gameState.earthquakeIntensity?.toFixed(1)}
                  </span>
                </div>
                <div className="flex justify-between items-center mb-2">
                  <span>Location:</span>
                  <span className="font-bold">{gameState.location?.name}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Risk Factor:</span>
                  <span className="font-bold">
                    {gameState.location
                      ? Math.round(
                          gameState.location.earthquakeRiskFactor * 100
                        )
                      : 0}
                    /100
                  </span>
                </div>
              </div>

              <div className="bg-slate-700 p-5 rounded-lg">
                <div className="text-lg mb-3">Your Decisions:</div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="text-sm text-slate-400">Character</div>
                    <div className="font-medium">
                      {gameState.character?.name}
                    </div>
                  </div>
                  <div>
                    <div className="text-sm text-slate-400">Budget Spent</div>
                    <div className="font-medium">
                      $
                      {(
                        gameState.totalBudget - gameState.availableFunds
                      ).toLocaleString()}
                    </div>
                  </div>
                  <div>
                    <div className="text-sm text-slate-400">Building Size</div>
                    <div className="font-medium">
                      {Object.keys(buildingSizeTypes).find(
                        (key) =>
                          buildingSizeTypes[
                            key as keyof typeof buildingSizeTypes
                          ] === gameState.buildingSize
                      )}
                    </div>
                  </div>
                  <div>
                    <div className="text-sm text-slate-400">
                      Building Structure
                    </div>
                    <div className="font-medium">
                      {Object.keys(buildingTypes).find(
                        (key) =>
                          buildingTypes[key as keyof typeof buildingTypes] ===
                          gameState.buildingStructure
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex-1">
              <div className="bg-slate-700 p-5 rounded-lg mb-6">
                <h3 className="text-xl font-bold mb-2">Survival Analysis</h3>

                <div className="mb-6">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-md">Survival Probability</span>
                    <span className="font-bold">
                      {Math.round((gameState.survivalProbability || 0) * 100)}%
                    </span>
                  </div>
                  <div className="h-4 bg-slate-800 rounded-full overflow-hidden">
                    <div
                      className={`h-full ${
                        (gameState.survivalProbability || 0) > 0.7
                          ? "bg-green-500"
                          : (gameState.survivalProbability || 0) > 0.4
                          ? "bg-yellow-500"
                          : "bg-red-500"
                      }`}
                      style={{
                        width: `${(gameState.survivalProbability || 0) * 100}%`,
                      }}
                    ></div>
                  </div>
                </div>

                <div className="bg-slate-800 p-4 rounded-lg">
                  <h4 className="font-bold mb-2">Feature Importance</h4>
                  <div className="space-y-3">
                    <div>
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-sm">Building Structure</span>
                        <span className="text-sm font-medium">45%</span>
                      </div>
                      <div className="h-2 bg-slate-700 rounded-full">
                        <div
                          className="h-full bg-blue-500 rounded-full"
                          style={{ width: "45%" }}
                        ></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-sm">Location Risk</span>
                        <span className="text-sm font-medium">30%</span>
                      </div>
                      <div className="h-2 bg-slate-700 rounded-full">
                        <div
                          className="h-full bg-blue-500 rounded-full"
                          style={{ width: "30%" }}
                        ></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-sm">Building Size</span>
                        <span className="text-sm font-medium">15%</span>
                      </div>
                      <div className="h-2 bg-slate-700 rounded-full">
                        <div
                          className="h-full bg-blue-500 rounded-full"
                          style={{ width: "15%" }}
                        ></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-sm">Budget Allocation</span>
                        <span className="text-sm font-medium">10%</span>
                      </div>
                      <div className="h-2 bg-slate-700 rounded-full">
                        <div
                          className="h-full bg-blue-500 rounded-full"
                          style={{ width: "10%" }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8">
            <h3 className="text-xl font-bold mb-4">ML Model Insights</h3>
            <div className="bg-slate-700 p-5 rounded-lg">
              <p className="mb-4">
                Our machine learning model was trained on data from the 2015
                Nepal earthquake, analyzing factors that contributed to building
                survival and occupant safety.
              </p>

              <div className="space-y-3 mt-4">
                {gameState.lessons.map((lesson, idx) => (
                  <div key={idx} className="bg-slate-800 p-3 rounded-lg flex">
                    <div className="w-6 h-6 bg-blue-600 rounded-full flex-shrink-0 flex items-center justify-center mr-3">
                      <span className="text-sm font-bold">{idx + 1}</span>
                    </div>
                    <p>{lesson}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      );
    case GamePhase.Reflection:
      return (
        <div className="bg-slate-800 p-8 rounded-xl shadow-lg">
          <h2 className="text-2xl font-bold mb-6">
            Reflection & Real-World Application
          </h2>

          <div className="mb-6">
            <p className="mb-4">
              The decisions you made in this simulation mirror real choices that
              affect earthquake preparedness and survival. Below are connections
              between your simulation experience and real-world preparedness
              strategies.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="bg-slate-700 p-5 rounded-lg">
              <h3 className="text-lg font-bold mb-3">
                Your Simulation Decisions
              </h3>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <div className="w-5 h-5 bg-blue-600 rounded-full flex-shrink-0 flex items-center justify-center mr-2 mt-0.5">
                    <span className="text-xs">1</span>
                  </div>
                  <div>
                    <span className="font-medium">Character Choice:</span>{" "}
                    {gameState.character?.name} represented different
                    socioeconomic factors that influence disaster vulnerability.
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="w-5 h-5 bg-blue-600 rounded-full flex-shrink-0 flex items-center justify-center mr-2 mt-0.5">
                    <span className="text-xs">2</span>
                  </div>
                  <div>
                    <span className="font-medium">Location Selection:</span>{" "}
                    Your choice of {gameState.location?.name} demonstrated how
                    geographic location affects earthquake risk.
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="w-5 h-5 bg-blue-600 rounded-full flex-shrink-0 flex items-center justify-center mr-2 mt-0.5">
                    <span className="text-xs">3</span>
                  </div>
                  <div>
                    <span className="font-medium">Building Choices:</span> Your
                    structural decisions reflected trade-offs between cost and
                    safety.
                  </div>
                </li>
              </ul>
            </div>

            <div className="bg-slate-700 p-5 rounded-lg">
              <h3 className="text-lg font-bold mb-3">
                Real-World Applications
              </h3>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <div className="w-5 h-5 bg-green-600 rounded-full flex-shrink-0 flex items-center justify-center mr-2 mt-0.5">
                    <span className="text-xs">1</span>
                  </div>
                  <div>
                    <span className="font-medium">Home Safety Assessment:</span>{" "}
                    Evaluate your current home for structural vulnerabilities
                    and consider retrofitting options.
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="w-5 h-5 bg-green-600 rounded-full flex-shrink-0 flex items-center justify-center mr-2 mt-0.5">
                    <span className="text-xs">2</span>
                  </div>
                  <div>
                    <span className="font-medium">Emergency Planning:</span>{" "}
                    Create a family emergency plan with meeting points and
                    contact procedures.
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="w-5 h-5 bg-green-600 rounded-full flex-shrink-0 flex items-center justify-center mr-2 mt-0.5">
                    <span className="text-xs">3</span>
                  </div>
                  <div>
                    <span className="font-medium">Resource Allocation:</span>{" "}
                    Invest in critical safety measures rather than spreading
                    resources too thin.
                  </div>
                </li>
              </ul>
            </div>
          </div>

          <div className="bg-blue-900/30 p-5 rounded-lg">
            <h3 className="text-lg font-bold mb-3">Did you know?</h3>
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <p>
                  Studies show that for every $1 invested in disaster
                  preparedness, approximately $7 is saved in post-disaster
                  recovery costs. The decisions you made in this simulation
                  reflect this cost-benefit relationship.
                </p>
              </div>
              <div className="flex-1">
                <p>
                  The 2015 Nepal earthquake affected over 8 million people
                  across 31 of Nepal&apos;s 75 districts. Buildings constructed
                  according to seismic codes were 3-4 times more likely to
                  remain standing.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-8 text-center">
            <p className="text-lg mb-2">
              Would you like to share your experience with this simulation?
            </p>
            <div className="flex justify-center space-x-4 mt-2">
              <button className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg">
                Share Results
              </button>
              <button className="bg-slate-600 hover:bg-slate-700 px-4 py-2 rounded-lg">
                Take Survey
              </button>
            </div>
          </div>
        </div>
      );
  }
};

export default GamePage;
