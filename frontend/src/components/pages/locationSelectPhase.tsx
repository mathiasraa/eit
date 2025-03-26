"use client";
import { availableLocations } from "@/lib/constants";
import { GameState, Location } from "@/types";
import Image from "next/image";
import NepalMap from "../ui/NepalMap";

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

      <div className="relative w-full mb-6">
        {/* OpenStreetMap of Nepal */}
        <NepalMap 
          locations={availableLocations}
          selectedLocationId={gameState.location?.id || null}
          onLocationSelect={handleLocationSelect}
        />
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

            <div className="mb-3">
              <div className="flex justify-between mb-1">
                <span className="text-sm font-medium">Geotechnical Risk</span>
                <span className="text-sm">
                  {Math.round(gameState.location.geotechnicalRiskFactor * 100)}
                  /100
                </span>
              </div>
              <div className="h-2 bg-slate-700 rounded-full">
                <div
                  className={`h-full rounded-full ${
                    gameState.location.geotechnicalRiskFactor > 0.7
                      ? "bg-red-600"
                      : gameState.location.geotechnicalRiskFactor > 0.4
                      ? "bg-orange-500"
                      : "bg-green-500"
                  }`}
                  style={{
                    width: `${gameState.location.geotechnicalRiskFactor * 100}%`,
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
