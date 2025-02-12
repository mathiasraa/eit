import { useGame } from "@/contexts/GameContext";
import type { PropsWithChildren } from "react";
import { Coins } from "lucide-react"; // Assuming you're using lucide-react for icons

const GameStateHeader: React.FC<PropsWithChildren> = () => {
  const game = useGame();

  return (
    <header className="bg-muted/10 backdrop-blur-sm border-b border-muted/20 w-full top-0 z-50">
      <div className="max-w-7xl mx-auto px-10 py-10 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Coins className="w-5 h-5 text-yellow-500" />
          <span className="font-semibold">
            रु {game.state.available_cash.toLocaleString()}
          </span>
        </div>
        {/* You can add more game state info here */}
      </div>
    </header>
  );
};

export default GameStateHeader;
