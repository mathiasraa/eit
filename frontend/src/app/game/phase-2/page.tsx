"use client";

import { Button } from "@/components/ui/button";
import type { SimulationFeatures } from "@/types/simulation";
import { useMutation } from "@tanstack/react-query";

async function simulateEarthquake(input: SimulationFeatures) {
  const body = {
    simulation_features: input,
  };

  console.log(body);

  const headers = new Headers();
  headers.set("Content-Type", "application/json");

  const response = await fetch("http://127.0.0.1:5000/simulate", {
    method: "POST",
    body: JSON.stringify(body),
    headers,
  });
  const data = await response.json();

  return data;
}

export default function Phase2() {
  const mutation = useMutation<
    { damage_grade: number },
    Error,
    SimulationFeatures
  >({
    mutationFn: (input: SimulationFeatures) => simulateEarthquake(input),
  });

  const handleSimulation = () => {
    console.log("Simulating earthquake");
    mutation.mutate({
      num_floors: 1,
      foundation_type: "cement_stone_brick",
      superstructure_type: ["adobe_mud"],
      age: 10,
      plinth_area: 100,
    });
  };

  return (
    <div>
      <h1>We will now simulate your survival chances</h1>
      <Button onClick={handleSimulation}>Simulate</Button>

      {mutation.isPending && <p>Simulating...</p>}
      {mutation.isError && <p>Error: {mutation.error.message}</p>}
      {mutation.data && (
        <div>
          <h2>Simulation Results</h2>
          <p>Survival Chance: {mutation.data.damage_grade}</p>
        </div>
      )}
    </div>
  );
}
