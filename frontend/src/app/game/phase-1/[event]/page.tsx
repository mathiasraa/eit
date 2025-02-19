"use client";

import GameWrapper from "@/components/game/GameWrapper";
import { Button } from "@/components/ui/button";
import { useGame } from "@/contexts/GameContext";
import { useCurrentEvent } from "@/hooks/useCurrentEvent";

export default function GameEventPage() {
  const { canAfford, setPendingChoice, pendingChoice } = useGame();
  const event = useCurrentEvent();

  const handleChoice = (choice: string, price: number) => {
    if (!canAfford(price)) {
      alert("You cannot afford this choice!");
      return;
    }

    setPendingChoice({
      type: event.key,
      choice,
      price,
    });
  };

  return (
    <GameWrapper>
      <div className="grid grid-cols-2">
        <div className="">
          <h1 className="text-3xl font-bold mb-8">{event.title}</h1>
          <p className="text-lg mb-8">{event.description}</p>

          <div className="grid grid-cols-1 gap-4">
            {event.choices.map((entry) => (
              <Button
                key={entry.choice}
                variant={
                  pendingChoice?.choice === entry.choice
                    ? "default"
                    : canAfford(entry.price)
                    ? "outline"
                    : "ghost"
                }
                disabled={!canAfford(entry.price)}
                onClick={() => handleChoice(entry.choice, entry.price)}
              >
                {entry.choice}
                <span className="block text-sm">NPR {entry.price}</span>
              </Button>
            ))}
          </div>
        </div>
      </div>
    </GameWrapper>
  );
}
