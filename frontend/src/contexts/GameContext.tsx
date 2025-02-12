import { INITIAL_BUDGET } from "@/lib/constants";
import {
  GameState,
  type FoundationType,
  type SuperstructureType,
} from "@/lib/types";
import { createContext, useContext, useReducer } from "react";

interface GameContextType {
  state: GameState;
  updateFloors: (floors: number) => void;
  updateFoundation: (foundation: FoundationType) => void;
  updateSuperstructure: (superstructure: SuperstructureType) => void;
  updateAge: (age: number) => void;
  updatePlinthArea: (area: number) => void;
  canAfford: (cost: number) => boolean;
  spendMoney: (amount: number) => void;
}

const GameContext = createContext<GameContextType | undefined>(undefined);

const initialState: GameState = {
  num_floors: 1,
  foundation_type: "cement_stone_brick",
  superstructure_type: ["cement_mortar_brick"],
  age: 2,
  plinth_area: 3,
  available_cash: INITIAL_BUDGET,
  gameStage: "foundation",
};

type GameAction =
  | { type: "UPDATE_FLOORS"; payload: number }
  | { type: "UPDATE_FOUNDATION"; payload: FoundationType }
  | { type: "UPDATE_SUPERSTRUCTURE"; payload: SuperstructureType }
  | { type: "UPDATE_AGE"; payload: number }
  | { type: "UPDATE_PLINTH_AREA"; payload: number }
  | { type: "SPEND_MONEY"; payload: number };

function gameReducer(state: GameState, action: GameAction): GameState {
  switch (action.type) {
    case "UPDATE_FLOORS":
      return { ...state, num_floors: action.payload };
    case "UPDATE_FOUNDATION":
      return { ...state, foundation_type: action.payload };
    case "UPDATE_SUPERSTRUCTURE":
      return { ...state, superstructure_type: action.payload };
    case "UPDATE_AGE":
      return { ...state, age: action.payload };
    case "UPDATE_PLINTH_AREA":
      return { ...state, plinth_area: action.payload };
    case "SPEND_MONEY":
      return {
        ...state,
        available_cash: state.available_cash - action.payload,
      };
    default:
      return state;
  }
}

export const useGame = () => {
  const context = useContext(GameContext);
  if (context === undefined) {
    throw new Error("useGame must be used within a GameProvider");
  }
  return context;
};

export function GameProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(gameReducer, initialState);

  const value = {
    state,
    updateFloors: (floors: number) =>
      dispatch({ type: "UPDATE_FLOORS", payload: floors }),
    updateFoundation: (foundation: FoundationType) =>
      dispatch({ type: "UPDATE_FOUNDATION", payload: foundation }),
    updateSuperstructure: (superstructure: SuperstructureType) =>
      dispatch({ type: "UPDATE_SUPERSTRUCTURE", payload: superstructure }),
    updateAge: (age: number) => dispatch({ type: "UPDATE_AGE", payload: age }),
    updatePlinthArea: (area: number) =>
      dispatch({ type: "UPDATE_PLINTH_AREA", payload: area }),
    canAfford: (cost: number) => state.available_cash >= cost,
    spendMoney: (amount: number) =>
      dispatch({ type: "SPEND_MONEY", payload: amount }),
  };

  return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
}
