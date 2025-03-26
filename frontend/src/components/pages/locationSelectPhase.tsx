"use client";
import { availableLocations } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { GameState, Location } from "@/types";
import Image from "next/image";

export function locationSelectPhase(
  gameState: GameState,
  handleLocationSelect: (location: Location) => void
) {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Select Your Location</h2>
      <p className="mb-6 text-slate-300">
        Different regions of Nepal experienced varying intensities during the
        2015 earthquake. Where you choose to live will impact your risk level
        and potential outcomes.
      </p>

      <div className="relative w-full h-[500px] bg-slate-700 rounded-xl overflow-hidden mb-6">
        {/* Map of Nepal */}
        <Image
          src="/map.jpg"
          alt="Map of Nepal"
          fill
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
          <div className="text-sm font-bold mb-2">Earthquake Risk Levels</div>
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
              fill
              objectFit="cover"
              className="rounded-lg"
            />
          </div>
          <div className="md:w-2/3 p-4">
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-xl font-bold">{gameState.location.name}</h3>
              <div className="text-sm bg-slate-700 px-2 py-1 rounded-full">
                {gameState.location.region}
              </div>
            </div>

            <p className="mb-3">{gameState.location.description}</p>

            <div className="mb-3">
              <div className="flex justify-between mb-1">
                <span className="text-sm font-medium">Earthquake Risk</span>
                <span className="text-sm">
                  {Math.round(gameState.location.earthquakeRiskFactor * 100)}
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
                    width: `${gameState.location.earthquakeRiskFactor * 100}%`,
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
            Click on a location marker on the map to select where you want to
            live.
          </p>
        </div>
      )}
    </div>
  );
}
