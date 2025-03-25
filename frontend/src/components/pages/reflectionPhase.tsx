"use client";
import { GameState } from "../../app/page";

export function reflectionPhase(gameState: GameState) {
  return <div className="bg-slate-800 p-8 rounded-xl shadow-lg">
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
  </div>;
}
