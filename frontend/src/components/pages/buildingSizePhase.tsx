"use client";
import { buildingSizeTypes } from "@/lib/constants";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { GameState } from "@/types";
import { formatCost } from "@/lib/formatCost";

export function buildingSizePhase(
  gameState: GameState,
  handleBuildingSizeSelect: (
    sizeType: (typeof buildingSizeTypes)[keyof typeof buildingSizeTypes]
  ) => void
) {
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
          const buildingStructure = gameState.buildingStructure;
          const baseCost = buildingStructure?.base_cost || 0;
          const cost = baseCost * value.cost_multiplier - baseCost;
          const canAfford =
            cost <=
            gameState.availableFunds +
              (gameState.buildingSize?.cost_multiplier || 0) * baseCost;

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

                <div className="mb-4 text-slate-300">{value.description}</div>

                <div className="grid grid-cols-1 gap-2">
                  <div className="bg-slate-700 rounded-lg px-3 py-2 text-sm flex justify-between items-center">
                    <span className="font-medium block">
                      Ground floor area:
                    </span>
                    {formaPlinthAreaToM2(value.plinth_area_sq_ft)}
                  </div>
                  <div className="bg-slate-700 rounded-lg px-3 py-2 text-sm flex justify-between items-center">
                    <span className="font-medium block">Floors:</span>
                    {value.count_floors_pre_eq}
                  </div>
                  <div className="bg-slate-700 rounded-lg px-3 py-2 text-sm flex justify-between items-center">
                    <span className="font-medium block">Capacity:</span>
                    {value.capacity}
                  </div>
                </div>

                <div className="mt-4 text-sm text-slate-400">
                  <span className="font-medium text-slate-300">
                    Nepal Insight:
                  </span>
                  <br />
                  {value.insight}
                </div>
              </div>

              <div className="w-40 relative bg-[#eee8d5]">
                <Image
                  src={value.src}
                  alt={`${key} Building Size`}
                  fill
                  objectFit="contain"
                />
                <div className="absolute bottom-0 right-0 bg-slate-900/80 px-3 py-1 m-2 rounded-md">
                  <span className="text-green-400 font-medium">
                    {formatCost(cost)}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function sqFeetToSqM2(sqFeet: number): number {
  return Math.round(sqFeet * 0.092903);
}

function formaPlinthAreaToM2(plinthArea: string): string {
  const areaSplit = plinthArea.split(" ");
  const minArea = parseInt(areaSplit[0]);
  const maxArea = parseInt(areaSplit[areaSplit.length - 1]);

  return `${sqFeetToSqM2(minArea)} - ${sqFeetToSqM2(maxArea)} m²`;
}
