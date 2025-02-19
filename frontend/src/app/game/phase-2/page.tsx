"use client";

import Layout from "@/components/layout";
import { Button } from "@/components/ui/button";
import { useGame } from "@/contexts/GameContext";
import type { SimulationFeatures } from "@/types/simulation";
import { useMutation } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";

async function simulateEarthquake(input: SimulationFeatures) {
  const body = {
    simulation_features: input,
  };

  const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

  const headers = new Headers();
  headers.set("Content-Type", "application/json");

  try {
    const response = await fetch(`${apiUrl}/simulate`, {
      method: "POST",
      body: JSON.stringify(body),
      headers,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Simulation request failed:", error);
    throw error;
  }
}

export default function Phase2() {
  const mutation = useMutation<
    { damage_grade: number },
    Error,
    SimulationFeatures
  >({
    mutationFn: (input: SimulationFeatures) => simulateEarthquake(input),
  });

  const { state } = useGame();

  const handleSimulation = () => {
    mutation.mutate({
      num_floors: state.num_floors,
      foundation_type: state.foundation_type,
      superstructure_type: state.superstructure_type,
      age: state.age,
      plinth_area: state.plinth_area,
    });
  };

  const getSurvivalColor = (grade: number) => {
    if (grade >= 75) return "text-green-500";
    if (grade >= 50) return "text-yellow-500";
    return "text-red-500";
  };

  return (
    <Layout className="w-full min-h-screen bg-gradient-to-b from-slate-900 to-slate-800">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl mx-auto h-full flex flex-col justify-center items-center p-8"
      >
        <h1 className="text-5xl font-bold text-white mb-8 text-center leading-tight">
          Earthquake Survival
          <span className="block text-3xl mt-2 text-slate-300">
            Simulation Analysis
          </span>
        </h1>

        <Button
          onClick={handleSimulation}
          disabled={mutation.isPending}
          className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 text-lg rounded-lg
            transition-all duration-200 transform hover:scale-105 shadow-lg"
        >
          {mutation.isPending ? (
            <>
              <Loader2 className="mr-2 h-5 w-5 animate-spin" /> Simulating...
            </>
          ) : (
            "Start Simulation"
          )}
        </Button>

        {mutation.isError && (
          <div className="mt-8 p-4 bg-red-500/10 border border-red-500 rounded-lg">
            <p className="text-red-500">Error: {mutation.error.message}</p>
          </div>
        )}

        {mutation.data && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mt-12 p-8 bg-white/10 backdrop-blur-sm rounded-xl shadow-xl w-full max-w-lg"
          >
            <h2 className="text-2xl font-semibold text-white mb-4">
              Simulation Results
            </h2>
            <div className="flex items-center justify-between">
              <span className="text-slate-300">Survival Chance:</span>
              <span
                className={`text-4xl font-bold ${getSurvivalColor(
                  Math.round(mutation.data.damage_grade * 1000) / 10
                )}`}
              >
                {Math.round(mutation.data.damage_grade * 1000) / 10}%
              </span>
            </div>
          </motion.div>
        )}
      </motion.div>
    </Layout>
  );
}
