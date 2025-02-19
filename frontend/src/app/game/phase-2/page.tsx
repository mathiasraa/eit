"use client";

import { Button } from "@/components/ui/button";
import type { SimulationFeatures } from "@/types/simulation";
import { useMutation } from "@tanstack/react-query";

async function simulateEarthquake(input: SimulationFeatures) {
  const response = await fetch("http://localhost:5000/simulate", {
    method: "POST",
    body: JSON.stringify(input),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await response.json();

  console.log(data);

  return data;
}

export default function Phase2() {
  const mutation = useMutation<
    { damage_grade: number },
    Error,
    SimulationFeatures
  >({
    mutationFn: simulateEarthquake,
  });

  return (
    <div>
      <h1>We will now simulate your survival chances</h1>
      <Button
        onClick={() =>
          mutation.mutate({
            num_floors: 1,
            foundation_type: "cement_stone_brick",
            superstructure_type: ["adobe_mud"],
            age: 10,
            plinth_area: 100,
          })
        }
      >
        Simulate
      </Button>

      {/* Do something with the data */}
      {mutation.data && (
        <div>
          <h2>Simulation Results</h2>
          <p>Survival Chance: {mutation.data.damage_grade}</p>
        </div>
      )}
    </div>
  );
}
