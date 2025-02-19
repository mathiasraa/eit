"use client";

import GameWrapper from "@/components/game/GameWrapper";
import { Button } from "@/components/ui/button";
import { useCurrentEvent } from "@/hooks/useCurrentEvent";

export default function GameEventPage() {
  // const game = useGame();
  const event = useCurrentEvent();

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
                variant="outline"
                // variant={state.foundation_type === type ? "default" : "outline"}
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
