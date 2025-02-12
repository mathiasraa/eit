import { GAME_EVENTS } from "@/lib/constants";
import { GameEventKey, type GameEvent } from "@/lib/types";
import { useParams } from "next/navigation";

export const useCurrentEvent = (): GameEvent => {
  const params = useParams();

  // Check if the event is valid
  const validEvents = Object.keys(GameEventKey);
  if (!validEvents.includes(params.event as string)) {
    throw new Error("Invalid event");
  }

  return {
    ...GAME_EVENTS[params.event as GameEventKey],
    key: params.event as GameEventKey,
  };
};
