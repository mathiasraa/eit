"use client";

import { gameStateAdapter } from "@/lib/gameStateAdapter";
import type { GameState } from "@/types";
import { useMutation } from "@tanstack/react-query";
import { useEffect } from "react";

const BACKEND_ENDPOINT = "http://127.0.0.1:5000";

export function SimulationPhase({
  gameState,
  handleSimulationSuccess,
}: {
  gameState: GameState;
  handleSimulationSuccess: (data: unknown) => void;
}) {
  const { mutate, isPending } = useMutation({
    mutationFn: async (gameState: GameState) =>
      await fetch(`${BACKEND_ENDPOINT}/api/predict`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(gameStateAdapter(gameState)),
      }),
    onSuccess: async (data) => {
      const json = await data.json();
      handleSimulationSuccess(json);
    },
  });

  useEffect(() => {
    if (!isPending) mutate(gameState);
  }, [gameState, mutate, isPending]);

  return (
    <div className="text-center p-10">
      <h2 className="text-2xl font-bold mb-6">Running Earthquake Simulation</h2>
      <p className="mb-10">
        Using machine learning models trained on Nepal earthquake data to
        predict the outcome of your decisions...
      </p>
      {isPending && (
        <div className="w-24 h-24 border-4 border-t-blue-500 border-r-transparent border-b-transparent border-l-transparent rounded-full animate-spin mx-auto"></div>
      )}
    </div>
  );
}
