// src/components/game/CurrentBalance.tsx
import { useGame } from "@/contexts/GameContext";

export function CurrentBalance() {
  const { state } = useGame();

  return (
    <div>
      <h2 className="text-lg font-semibold mb-2">Current balance</h2>
      <p className="text-sm"> रु. {state.available_cash}</p>
    </div>
  );
}
