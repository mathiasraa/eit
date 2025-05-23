"use client";
import { buildingSizeTypes, buildingTypes } from "@/lib/constants";
import { mapFeatureImportanceToUserFriendly } from "@/lib/featureImportanceMap";
import { GameState } from "@/types";

export function resultPhase(gameState: GameState) {
  const survivalProbability = gameState.survivalProbability![0] || [100, 0, 0];
  const featureImportance = gameState.results?.feature_importance;
  const contributingFactors = mapFeatureImportanceToUserFriendly(
    featureImportance as Record<string, number>
  );

  const survivalProbabilityScore =
    100 -
    (100 *
      (0 * survivalProbability[0] +
        1 * survivalProbability[1] +
        2 * survivalProbability[2])) /
      2;

  console.log(survivalProbability, survivalProbability[0]);
  return (
    <div className="bg-slate-800 p-8 rounded-xl shadow-lg">
      <h2 className="text-2xl font-bold mb-4">Earthquake Simulation Results</h2>

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
                  ? Math.round(gameState.location.earthquakeRiskFactor * 100)
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
                <div className="font-medium">{gameState.character?.name}</div>
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
                <div className="text-sm text-slate-400">Building Structure</div>
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
                {/* <span className="font-bold">{survivalProbability}%</span> */}
              </div>
              <div className="h-8 bg-slate-800 rounded-full overflow-hidden flex text-black text-sm font-bold">
                <div
                  className={`h-full flex items-center justify-center ${
                    (survivalProbabilityScore / 100 || 0) > 0.7
                      ? "bg-green-500"
                      : (survivalProbabilityScore / 100 || 0) > 0.4
                      ? "bg-yellow-500"
                      : "bg-red-500"
                  }`}
                  style={{
                    width: `${(survivalProbabilityScore / 100 || 0) * 100}%`,
                  }}
                >
                  {`${Math.round(survivalProbabilityScore)}%`}
                </div>
              </div>

              {/* <div
                  className="h-full bg-green-500 flex items-center justify-center"
                  style={{ width: `${survivalProbability[0] * 100}%` }}
                >
                  {`${Math.round(survivalProbability[0] * 100)}%`}
                </div>
                <div
                  className="h-full bg-yellow-500 flex items-center justify-center"
                  style={{
                    width: `${survivalProbability[1] * 100}%`,
                  }}
                >
                  {`${Math.round(survivalProbability[1] * 100)}%`}
                </div>
                <div
                  className="h-full bg-red-500 flex items-center justify-center"
                  style={{
                    width: `${survivalProbability[2] * 100}%`,
                  }}
                >
                  {`${Math.round(survivalProbability[2] * 100)}%`}
                </div>
              </div> */}
            </div>

            <div className="bg-slate-800 p-4 rounded-lg">
              <h4 className="font-bold mb-2">Contributing factors</h4>
              <div className="space-y-3">
                {contributingFactors.allFactors.map((factor) => (
                  <div key={factor.name} className="flex justify-between">
                    <span className="text-sm">{factor.name}</span>
                    <span className="text-sm font-medium">{factor.impact}</span>
                  </div>
                ))}
                {/* <div>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm">Building Structure</span>
                    <span className="text-sm font-medium">45%</span>
                  </div>
                  <ProgressBar value={45} max={100} colorClass="bg-blue-500" />
                </div>
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm">Location Risk</span>
                    <span className="text-sm font-medium">30%</span>
                  </div>
                  <ProgressBar value={30} max={100} colorClass="bg-blue-500" />
                </div>
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm">Building Size</span>
                    <span className="text-sm font-medium">15%</span>
                  </div>
                  <ProgressBar value={15} max={100} colorClass="bg-blue-500" />
                </div>
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm">Budget Allocation</span>
                    <span className="text-sm font-medium">10%</span>
                  </div>
                  <ProgressBar value={10} max={100} colorClass="bg-blue-500" />
                </div> */}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8">
        <h3 className="text-xl font-bold mb-4">ML Model Insights</h3>
        <div className="bg-slate-700 p-5 rounded-lg">
          <p className="mb-4">
            Our machine learning model was trained on data from the 2015 Nepal
            earthquake, analyzing factors that contributed to building survival
            and occupant safety.
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
}
