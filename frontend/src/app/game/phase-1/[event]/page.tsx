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

          <div className="grid grid-cols-2 gap-4">
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
                className="h-40 relative bg-cover bg-center p-0 overflow-hidden"
                style={{
                  backgroundImage: `url(${entry.image || '/nepal.png'})`,
                }}
              >
                <div className="absolute bottom-0 left-0 p-2 bg-black/50 rounded-tr-md">
                  <span className="font-bold text-lg text-white">{entry.title || entry.choice}</span>
                </div>
                <div className="absolute bottom-0 right-0 p-2 bg-black/50 rounded-tl-md">
                  <span className="block text-sm text-white">NPR {entry.price}</span>
                </div>
              </Button>
            ))}
          </div>
        </div>
      </div>
    </GameWrapper>
  );
}
