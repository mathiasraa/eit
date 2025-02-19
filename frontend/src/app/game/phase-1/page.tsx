import { redirect } from "next/navigation";
import { GAME_EVENTS } from "@/lib/constants";

export default function Redirection() {
  redirect("/game/phase-1/" + Object.keys(GAME_EVENTS)[0]);
}
