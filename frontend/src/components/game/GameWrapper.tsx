"use client";

import GameStateHeader from "@/components/game/GameStateHeader";
import { Button } from "@/components/ui/button";
import { useCurrentEvent } from "@/hooks/useCurrentEvent";
import { GAME_EVENTS } from "@/lib/constants";
import { useRouter } from "next/navigation";

import type { PropsWithChildren } from "react";

const GameWrapper: React.FC<PropsWithChildren> = ({ children }) => {
  const event = useCurrentEvent();
  const router = useRouter();

  const navigateNextStep = () => {
    const currentStep = event.step;
    const nextStep = currentStep + 1;
    const nextEventKey = Object.entries(GAME_EVENTS).find(
      ([, event]) => event.step === nextStep
    )?.[0];

    if (!nextEventKey) {
      router.push("/game/phase-3");
      return;
    }

    router.push(`/game/phase-2/${nextEventKey}`);
  };

  return (
    <div className="bg-background">
      <GameStateHeader />
      <div className="p-10">{children}</div>

      <div className="w-full fixed bottom-0 px-10 py-5 bg-white/20 flex justify-end">
        <Button size="lg" onClick={navigateNextStep} variant="secondary">
          Next
        </Button>
      </div>
    </div>
  );
};

export default GameWrapper;
