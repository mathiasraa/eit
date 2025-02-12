// src/app/page.tsx
"use client";

import { GameProvider } from "@/contexts/GameContext";
import { BuildingChoices } from "@/components/game/BuildingChoices";

export default function Home() {
  return (
    <GameProvider>
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">
          Nepal Earthquake Simulation: Build Your House
        </h1>

        <BuildingChoices />
      </main>
    </GameProvider>
  );
}
