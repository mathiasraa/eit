// src/app/page.tsx
"use client";

import { BuildingChoices } from "@/components/game/BuildingChoices";
import { CurrentBalance } from "@/components/game/CurrentBalance";

export default function Home() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">
        Nepal Earthquake Simulation: Build Your House
      </h1>
      <CurrentBalance />

      <BuildingChoices />
    </div>
  );
}
