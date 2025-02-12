// src/app/page.tsx
"use client";

import { GameProvider, useGame } from "@/contexts/GameContext";
import { BuildingChoices } from "@/components/game/BuildingChoices";
import { CurrentBalance } from "@/components/game/CurrentBalance";

export default function Home() {
  return (
    <GameProvider>
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">
          Nepal Earthquake Simulation: Build Your House
        </h1>
         <CurrentBalance />

        <BuildingChoices />
      </main>
    </GameProvider>
  );
}
