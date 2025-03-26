"use client";
import { buildingTypes } from "@/lib/constants";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { GameState } from "@/types";
import { ProgressBar } from "@/components/ui/ProgressBar";

export function buildingStructurePhase(
  gameState: GameState,
  handleBuildingStructureSelect: (
    structureType: (typeof buildingTypes)[keyof typeof buildingTypes]
  ) => void
) {
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
              onClick={() => canAfford && handleBuildingStructureSelect(value)}
            >
              <div className="p-5 flex-1">
                <div className="flex justify-between items-center mb-2">
                  <div className="text-xl font-bold">{key}</div>
                </div>

                <div className="mb-4 text-slate-300">{value.description}</div>

                <div className="mb-3">
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium">
                      Earthquake Resistance
                    </span>
                    <span className="text-sm">{50}/100</span>
                  </div>
                  <ProgressBar value={50} max={100} colorClass="bg-blue-500" />
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
                  fill
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
}
