"use client";

import { Dispatch, SetStateAction, useState } from "react";
import Image from "next/image";
import { buildingSizeTypes, buildingTypes } from "@/lib/constants";
import { Button } from "@/components/ui/button";

enum GamePhase {
  Initial = "Initial",
  BuildingSize = "BuildingSize",
  BuildingStructure = "BuildingStructure",
}

type GameState = {
  phase: GamePhase;
  availableFunds: number;
  buildingSize?: (typeof buildingSizeTypes)[keyof typeof buildingSizeTypes];
  buildingStructure?: (typeof buildingTypes)[keyof typeof buildingTypes];
};

const gameStateDefaults: GameState = {
  phase: GamePhase.Initial,
  availableFunds: 0,
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
  }

  return (
    <div className="flex justify-center p-5 w-full">
      <div className="max-w-5xl">
        <GameStateView gameState={gameState} onGameStateChange={setGameState} />

        <Button onClick={handleNextPhase}>Next Phase</Button>
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
    onGameStateChange((s) => ({
      ...s,
      buildingSize: sizeType,
    }));
  }

  switch (gameState.phase) {
    case GamePhase.Initial:
      return (
        <div>
          <h1 className="text-xl font-medium">Yo motherfucker</h1>
        </div>
      );
    case GamePhase.BuildingSize:
      return (
        <div className="grid grid-cols-2 gap-4">
          {Object.entries(buildingSizeTypes).map(([key, value]) => {
            const isSelected = gameState.buildingSize === value;
            return (
              <button
                key={key}
                className={`bg-white/10 hover:bg-white/20 border rounded-xl overflow-hidden h-[300px] ${
                  isSelected ? "border-blue-500" : "border-white/30"
                } rounded-xl p-4`}
                onClick={() => handleBuildingSizeSelect(value)}
              >
                <div className="p-4">
                  <div className="text-lg font-medium">{key}</div>
                  <div className="mb-2">{value.description}</div>
                  <div className="grid grid-cols-2 border border-white/30 rounded-lg py-1">
                    <div className="border-r border-r-white/30">
                      <i>Gross area</i> <br />
                      {value.plinth_area_sq_ft} ft2
                    </div>
                    <div className="">
                      <i>Number of floors</i> <br /> {value.count_floors_pre_eq}
                    </div>
                  </div>
                </div>
                <div className="w-full h-1/2 relative">
                  <Image
                    src="/images/foundation/cement_stone_brick.jpg"
                    alt="Building Image"
                    layout="fill"
                    objectFit="cover"
                  />
                </div>
              </button>
            );
          })}
        </div>
      );
    case GamePhase.BuildingStructure:
      return (
        <div className="grid grid-cols-2 gap-4">
          {Object.entries(buildingTypes).map(([key, value]) => {
            return (
              <button
                key={key}
                className="bg-white/10 hover:bg-white/20 border border-white/30 rounded-xl p-4"
              >
                <div className="text-lg font-medium">{key}</div>
                <div className="">{value.description}</div>
                <Image
                  src="/path-to-your-image.jpg"
                  alt="Building Image"
                  width={200}
                  height={200}
                />
              </button>
            );
          })}
        </div>
      );
  }
};

export default GamePage;
