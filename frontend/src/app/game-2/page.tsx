"use client";

import { useState } from "react";
import Image from "next/image";
import { buildingSizeTypes, buildingTypes } from "@/lib/constants";
import { Button } from "@/components/ui/button";

enum GamePhase {
  Initial = "Initial",
  BuildingSize = "BuildingSize",
  BuildingStructure = "BuildingStructure",
  Summary = "Summary",
}

type GameState = {
  phase: GamePhase;
  availableFunds: number;
  buildingSize?: (typeof buildingSizeTypes)[keyof typeof buildingSizeTypes];
  buildingStructure?: (typeof buildingTypes)[keyof typeof buildingTypes];
};

const gameStateDefaults: GameState = {
  phase: GamePhase.Initial,
  availableFunds: 1000000,
};

const GamePage: React.FC = () => {
  const [gameState, setGameState] = useState<GameState>(gameStateDefaults);

  function handleNextPhase() {
    const gamePhaseOrder = Object.values(GamePhase);
    const currGamePhaseIndex = gamePhaseOrder.indexOf(gameState.phase);

    if (currGamePhaseIndex < gamePhaseOrder.length - 1) {
      const nextGamePhase = gamePhaseOrder[currGamePhaseIndex + 1];
      setGameState((s) => ({ ...s, phase: nextGamePhase }));
    }

    if (gameState.phase === GamePhase.Summary) {
      // Need to add logic to submit things to the model
      alert("Game completed!");
    }
  }

  function handleBuildingSizeSelect(
    sizeType: (typeof buildingSizeTypes)[keyof typeof buildingSizeTypes]
  ) {
    setGameState((s) => ({
      ...s,
      buildingSize: sizeType,
    }));
  }

  function handleBuildingStructureSelect(
    structureType: (typeof buildingTypes)[keyof typeof buildingTypes]
  ) {
    setGameState((s) => ({
      ...s,
      buildingStructure: structureType,
    }));
  }

  function resetGame() {
    setGameState(gameStateDefaults);
  }

  const canProceedToNextPhase = () => {
    switch (gameState.phase) {
      case GamePhase.BuildingSize:
        return !!gameState.buildingSize;
      case GamePhase.BuildingStructure:
        return !!gameState.buildingStructure;
      default:
        return true;
    }
  };

  return (
    <div className="flex justify-center p-5 w-full">
      <div className="max-w-5xl w-full">
        <header className="mb-6">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold">Building Construction Simulator</h1>
            <div className="text-lg">
              Budget: रु. {gameState.availableFunds.toLocaleString()}
            </div>
          </div>
          <ProgressIndicator currentPhase={gameState.phase} />
        </header>

        <main className="mb-6">{renderPhaseContent()}</main>

        <footer className="flex justify-between">
          <Button variant="outline" onClick={resetGame}>
            Reset
          </Button>
          <Button onClick={handleNextPhase} disabled={!canProceedToNextPhase()}>
            {gameState.phase === GamePhase.Summary ? "Complete" : "Next Phase"}
          </Button>
        </footer>
      </div>
    </div>
  );

  function renderPhaseContent() {
    switch (gameState.phase) {
      case GamePhase.Initial:
        return <InitialPhase />;
      case GamePhase.BuildingSize:
        return (
          <BuildingSizePhase
            selectedSize={gameState.buildingSize}
            onSelect={handleBuildingSizeSelect}
          />
        );
      case GamePhase.BuildingStructure:
        return (
          <BuildingStructurePhase
            selectedStructure={gameState.buildingStructure}
            onSelect={handleBuildingStructureSelect}
          />
        );
      case GamePhase.Summary:
        return <SummaryPhase gameState={gameState} />;
    }
  }
};

const ProgressIndicator: React.FC<{ currentPhase: GamePhase }> = ({ currentPhase }) => {
  const phases = [
    { phase: GamePhase.Initial, label: "Start" },
    { phase: GamePhase.BuildingSize, label: "Building Size" },
    { phase: GamePhase.BuildingStructure, label: "Building Structure" },
    { phase: GamePhase.Summary, label: "Summary" },
  ];

  return (
    <div className="flex justify-between mt-4">
      {phases.map((item) => (
        <div
          key={item.phase}
          className={`flex-1 text-center p-2 rounded ${
            currentPhase === item.phase ? "bg-blue-500 text-white" : "bg-white/10"
          }`}
        >
          {item.label}
        </div>
      ))}
    </div>
  );
};

const InitialPhase = () => (
  <div className="bg-white/10 p-8 rounded-xl">
    <h2 className="text-2xl font-medium mb-4">Welcome to the Building Simulator</h2>
    <p className="mb-4">
      In this simulation, you'll make decisions about building construction that impact resilience
      against earthquakes. Start by selecting the size of your building, then choose construction
      materials and methods.
    </p>
    <p>Make your choices wisely to balance cost and safety.</p>
  </div>
);

const BuildingSizePhase: React.FC<{
  selectedSize?: (typeof buildingSizeTypes)[keyof typeof buildingSizeTypes];
  onSelect: (size: (typeof buildingSizeTypes)[keyof typeof buildingSizeTypes]) => void;
}> = ({ selectedSize, onSelect }) => (
  <div>
    <h2 className="text-xl font-medium mb-4">Select Building Size</h2>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {Object.entries(buildingSizeTypes).map(([key, value]) => {
        const isSelected = selectedSize === value;
        return (
          <button
            key={key}
            className={`bg-white/10 hover:bg-white/20 border transition-all rounded-xl overflow-hidden h-[300px] ${
              isSelected ? "border-blue-500 ring-2 ring-blue-300" : "border-white/30"
            }`}
            onClick={() => onSelect(value)}
          >
            <div className="p-4">
              <div className="text-lg font-medium">{key}</div>
              <div className="mb-2">{value.description}</div>
              <div className="grid grid-cols-2 border border-white/30 rounded-lg py-1">
                <div className="border-r border-r-white/30 p-2">
                  <span className="text-sm opacity-70">Gross area</span>
                  <div className="font-medium">{value.plinth_area_sq_ft} ft²</div>
                </div>
                <div className="p-2">
                  <span className="text-sm opacity-70">Floors</span>
                  <div className="font-medium">{value.count_floors_pre_eq}</div>
                </div>
              </div>
              {isSelected && <div className="mt-2 text-blue-500 font-medium">✓ Selected</div>}
            </div>
            <div className="w-full h-1/2 relative">
              <Image
                src="/images/foundation/cement_stone_brick.jpg"
                alt={`${key} Building Size`}
                layout="fill"
                objectFit="cover"
              />
            </div>
          </button>
        );
      })}
    </div>
  </div>
);

const BuildingStructurePhase: React.FC<{
  selectedStructure?: (typeof buildingTypes)[keyof typeof buildingTypes];
  onSelect: (structure: (typeof buildingTypes)[keyof typeof buildingTypes]) => void;
}> = ({ selectedStructure, onSelect }) => (
  <div>
    <h2 className="text-xl font-medium mb-4">Select Building Structure</h2>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {Object.entries(buildingTypes).map(([key, value]) => {
        const isSelected = selectedStructure === value;
        return (
          <button
            key={key}
            className={`bg-white/10 hover:bg-white/20 border transition-all rounded-xl overflow-hidden h-[300px] ${
              isSelected ? "border-blue-500 ring-2 ring-blue-300" : "border-white/30"
            }`}
            onClick={() => onSelect(value)}
          >
            <div className="p-4">
              <div className="text-lg font-medium">{key}</div>
              <div className="mb-2">{value.description}</div>
              <div className="grid grid-cols-2 border border-white/30 rounded-lg py-1">
                <div className="border-r border-r-white/30 p-2">
                  <span className="text-sm opacity-70">Cost</span>
                  <div className="font-medium">Cost multiplier {value.cost_multiplier?.toLocaleString() || "N/A"}</div>
                </div>
                <div className="p-2">
                  <span className="text-sm opacity-70">Resilience</span>
                  <div className="font-medium">
                    {value.earthquake_vulnerability ? `${value.earthquake_vulnerability}` : "Medium"}
                  </div>
                </div>
              </div>
              {isSelected && <div className="mt-2 text-blue-500 font-medium">✓ Selected</div>}
            </div>
            <div className="w-full h-1/2 relative">
              <Image
                src={`/images/foundation/cement_stone_brick.jpg`}
                alt={`${key} Structure`}
                width={200}
                height={200}
                objectFit="cover"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = "/images/foundation/cement_stone_brick.jpg";
                }}
              />
            </div>
          </button>
        );
      })}
    </div>
  </div>
);

const SummaryPhase: React.FC<{ gameState: GameState }> = ({ gameState }) => {
  const selectedSizeName = Object.entries(buildingSizeTypes).find(
    ([_, value]) => value === gameState.buildingSize
  )?.[0] || "Unknown";

  const selectedStructureName = Object.entries(buildingTypes).find(
    ([_, value]) => value === gameState.buildingStructure
  )?.[0] || "Unknown";

  return (
    <div className="bg-white/10 rounded-xl p-6">
      <h2 className="text-2xl font-medium mb-4">Building Summary</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div className="bg-white/10 p-4 rounded-lg">
          <h3 className="text-lg font-medium mb-2">Building Specifications</h3>
          <ul className="space-y-2">
            <li>
              <strong>Size:</strong> {selectedSizeName}
            </li>
            <li>
              <strong>Area:</strong> {gameState.buildingSize?.plinth_area_sq_ft} ft²
            </li>
            <li>
              <strong>Floors:</strong> {gameState.buildingSize?.count_floors_pre_eq}
            </li>
            <li>
              <strong>Structure Type:</strong> {selectedStructureName}
            </li>
          </ul>
        </div>
        <div className="bg-white/10 p-4 rounded-lg">
          <h3 className="text-lg font-medium mb-2">Cost & Resilience</h3>
          <p className="mb-2">
            <strong>Construction Cost:</strong> रु.{" "}
            {((gameState.buildingSize?.base_cost || 0) * (gameState.buildingStructure?.cost_multiplier || 0 )).toLocaleString()  || "N/A"}
          </p>
          <p>
            <strong>Earthquake Resilience:</strong>{" "}
            {gameState.buildingStructure?.earthquake_vulnerability || "Medium"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default GamePage;
