"use client";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { GameState, Character, availableCharacters } from "../../app/page";

export function characterSelectionPhase(gameState: GameState, handleCharacterSelect: (character: Character) => void) {
  return <div>
    <h2 className="text-2xl font-bold mb-4">Choose Your Character</h2>
    <p className="mb-6 text-slate-300">
      The demographic profile you choose will affect your starting budget
      and may influence other aspects of your experience. Different
      characters represent various socioeconomic groups from Nepal during
      the 2015 earthquake.
    </p>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {availableCharacters.map((character) => {
        const isSelected = gameState.character?.id === character.id;
        const modifiedBudget = Math.round(
          gameState.baseBudget * character.budgetModifier
        );

        return (
          <div
            key={character.id}
            className={cn(
              `bg-slate-800 hover:bg-slate-750 overflow-hidden rounded-xl flex flex-row cursor-pointer transition-all`,
              isSelected
                ? "ring-2 ring-blue-500 transform scale-[1.02]"
                : "ring-1 ring-slate-600"
            )}
            onClick={() => handleCharacterSelect(character)}
          >
            <div className="p-5 flex-1">
              <div className="flex justify-between items-center mb-2">
                <div className="text-xl font-bold">{character.name}</div>
                <div className="text-sm bg-slate-700 px-2 py-1 rounded-full">
                  Age: {character.age}
                </div>
              </div>

              <div className="mb-3 text-slate-300">
                {character.description}
              </div>

              <div className="text-sm">
                <span className="font-medium">Occupation:</span>{" "}
                {character.occupation}
              </div>

              <div className="mt-4 bg-slate-700 p-3 rounded-lg">
                <div className="text-sm mb-2">{character.backstory}</div>
                <div className="flex justify-between items-center mt-3">
                  <span className="text-sm">Starting Budget:</span>
                  <span className="text-green-400 font-bold">
                    ${modifiedBudget.toLocaleString()}
                  </span>
                </div>
              </div>
            </div>

            <div className="w-40 relative bg-slate-700">
              <Image
                src={character.image}
                alt={`${character.name}`}
                fill
                objectFit="cover" />
            </div>
          </div>
        );
      })}
    </div>
  </div>;
}
