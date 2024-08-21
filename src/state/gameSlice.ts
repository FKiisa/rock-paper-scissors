import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  TBet,
  EBetPosition,
  TGameResult,
  TBalance,
  TWin,
  TBetItem,
  EGameState,
} from "../types/Types";
import {
  calculateBalanceChange,
  determineGameResult,
  getRandomChoice,
} from "./gameHelpers";

interface GameState {
  balance: TBalance;
  win: TWin;
  bet: TBet;
  playerBets: TBetItem[];
  computerBet: EBetPosition | null;
  gameResult: TGameResult | null;
  state: EGameState;
}

const initialState: GameState = {
  balance: { itemName: "Balance: ", value: 5000 },
  win: { itemName: "Win: ", value: 0 },
  bet: { itemName: "Bet: ", value: 0 },
  playerBets: [],
  computerBet: null,
  gameResult: null,
  state: EGameState.START,
};

/* Helper functions */
const canPlaceBet = (state: GameState, newBetAmount: number): boolean => {
  const totalBetAmount = state.bet.value + newBetAmount;
  return totalBetAmount <= state.balance.value;
};

const updateBet = (state: GameState, newBet: TBetItem) => {
  const existingBet = state.playerBets.find(
    (bet) => bet.position === newBet.position
  );

  if (existingBet) {
    existingBet.amount += newBet.amount;
  } else {
    state.playerBets.push(newBet);
  }

  state.bet.value += newBet.amount;
};

const handlePlayGame = (state: GameState) => {
  if (state.balance.value < state.bet.value) return;

  state.state = EGameState.PLAY;
  state.computerBet = getRandomChoice();
  const balanceChange = calculateBalanceChange(
    state.playerBets,
    state.computerBet!
  );

  state.balance.value += balanceChange;
  state.win.value = balanceChange;
  state.gameResult = determineGameResult(
    state.playerBets,
    state.computerBet,
    balanceChange
  );
};

const gameSlice = createSlice({
  name: "game",
  initialState,
  reducers: {
    placeBet: (state, action: PayloadAction<TBetItem>) => {
      state.win.value = 0;
      const newBetAmount = action.payload.amount;

      if (canPlaceBet(state, newBetAmount)) {
        updateBet(state, action.payload);
      }
    },
    playGame: (state) => {
      handlePlayGame(state);
    },
    clearBets: (state) => {
      state.playerBets = [];
      state.bet.value = 0;
    },
    resetGame: (state) => {
      state.state = EGameState.START;
      state.playerBets = [];
      state.gameResult = null;
      state.computerBet = null;
      state.bet.value = 0;
    },
  },
});

export const { placeBet, playGame, resetGame, clearBets } = gameSlice.actions;

export default gameSlice.reducer;
