// src/components/game/BuildingChoices.tsx
import { Button } from "@/components/ui/button";
import { useGame } from "@/contexts/GameContext";
import { FOUNDATION_COSTS } from "@/lib/constants";
import type { FoundationType } from "@/lib/types";

export function BuildingChoices() {
  const {
    state,
    updateFoundation,
    updateSuperstructure,
    canAfford,
    spendMoney,
  } = useGame();

  const handleFoundationChange = (type: FoundationType) => {
    const cost = FOUNDATION_COSTS[type];
    if (canAfford(cost)) {
      updateFoundation(type);
      spendMoney(cost);
    }
  };

  return (
    <div className="space-y-6 p-4">
      <div>
        <h3 className="text-lg font-semibold mb-2">Foundation Type</h3>
        <div className="grid grid-cols-3 gap-4">
          {Object.entries(FOUNDATION_COSTS).map(([type, cost]) => (
            <Button
              key={type}
              onClick={() => handleFoundationChange(type as FoundationType)}
              disabled={!canAfford(cost)}
              variant={state.foundation_type === type ? "default" : "outline"}
            >
              {type.replace("_", " ")}
              <span className="block text-sm">NPR {cost}</span>
            </Button>
          ))}
        </div>
      </div>
      {/* Add similar sections for other building choices */}
    </div>
  );
}
