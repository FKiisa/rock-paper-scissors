import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  TBet,
  EBetPosition,
  TGameResult,
  TBalance,
  TWin,
  TBetItem,
  EWinner,
  EGameState,
} from "../types/Types";

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

const gameSlice = createSlice({
  name: "game",
  initialState,
  reducers: {
    placeBet: (state, action: PayloadAction<TBetItem>) => {
      state.win.value = 0;
      const newBetAmount = action.payload.amount;
      const totalBetAmount = state.bet.value + newBetAmount;

      // Check if total bet amount would exceed the balance
      if (totalBetAmount > state.balance.value) {
        // If so, do not allow placing the bet
        return;
      }

      // Proceed with adding the bet
      const existingBet = state.playerBets.find(
        (bet) => bet.position === action.payload.position
      );

      if (existingBet) {
        existingBet.amount += newBetAmount;
      } else {
        state.playerBets.push(action.payload);
      }

      state.bet.value += newBetAmount;
    },
    playGame: (state) => {
      if (state.balance.value < state.bet.value) return;
      state.computerBet = getRandomChoice();
      const balanceChange = calculateBalanceChange(
        state.playerBets,
        state.computerBet
      );
      state.balance.value += balanceChange;
      state.win.value = balanceChange;
      state.gameResult = {
        playerBets: state.playerBets,
        computerChoice: state.computerBet,
        balanceChange,
        winner: getWinner(balanceChange),
      };
      state.state = EGameState.PLAY;
    },
    clearBets: (state) => {
      state.playerBets = [];
      state.bet.value = 0;
    },
    resetGame: (state) => {
      state.playerBets = [];
      state.gameResult = null;
      state.computerBet = null;
      state.bet.value = 0;
      state.state = EGameState.START
    },
  },
});

const getRandomChoice = (): EBetPosition => {
  const choices: EBetPosition[] = [
    EBetPosition.ROCK,
    EBetPosition.PAPER,
    EBetPosition.SCISSORS,
  ];
  return choices[Math.floor(Math.random() * choices.length)];
};

const calculateBalanceChange = (
  bets: TBetItem[],
  computerChoice: EBetPosition
): number => {
  // Calculate the total amount bet
  const totalBetAmount = bets.reduce((sum, bet) => sum + bet.amount, 0);
  let balanceChange = 0;

  // If the player bet on one position
  if (bets.length === 1) {
    const bet = bets[0];

    if (bet.position === computerChoice) {
      // It's a draw, return the bet amount
      balanceChange = bet.amount;
    } else if (
      (bet.position === EBetPosition.ROCK &&
        computerChoice === EBetPosition.SCISSORS) ||
      (bet.position === EBetPosition.PAPER &&
        computerChoice === EBetPosition.ROCK) ||
      (bet.position === EBetPosition.SCISSORS &&
        computerChoice === EBetPosition.PAPER)
    ) {
      // The player wins, apply the 14x multiplier
      balanceChange = bet.amount * 14;
    } else {
      // The player loses, no return
      balanceChange = 0;
    }
  }

  // If the player bet on two positions
  if (bets.length === 2) {
    const firstBet = bets[0];
    const secondBet = bets[1];

    const firstBetWins =
      (firstBet.position === EBetPosition.ROCK &&
        computerChoice === EBetPosition.SCISSORS) ||
      (firstBet.position === EBetPosition.PAPER &&
        computerChoice === EBetPosition.ROCK) ||
      (firstBet.position === EBetPosition.SCISSORS &&
        computerChoice === EBetPosition.PAPER);

    const secondBetWins =
      (secondBet.position === EBetPosition.ROCK &&
        computerChoice === EBetPosition.SCISSORS) ||
      (secondBet.position === EBetPosition.PAPER &&
        computerChoice === EBetPosition.ROCK) ||
      (secondBet.position === EBetPosition.SCISSORS &&
        computerChoice === EBetPosition.PAPER);

    const firstBetDraws = firstBet.position === computerChoice;
    const secondBetDraws = secondBet.position === computerChoice;

    if (firstBetDraws && secondBetDraws) {
      // Both bets are draws, return both bet amounts
      balanceChange = totalBetAmount;
    } else if (firstBetDraws || secondBetDraws) {
      // One is a draw, one is a win or loss
      if (firstBetWins || secondBetWins) {
        // If the other bet wins, apply 3x multiplier to the winning bet
        balanceChange =
          (firstBetWins ? firstBet.amount : secondBet.amount) * 3 +
          (firstBetDraws ? firstBet.amount : secondBet.amount);
      } else {
        // If the other bet loses, return only the draw bet
        balanceChange = firstBetDraws ? firstBet.amount : secondBet.amount;
      }
    } else if (firstBetWins || secondBetWins) {
      // One wins, the other loses, apply 3x multiplier to the winning bet
      balanceChange = (firstBetWins ? firstBet.amount : secondBet.amount) * 3;
    } else {
      // Both lose, no return
      balanceChange = 0;
    }
  }

  // Subtract the total bet amount to get the net balance change
  return balanceChange - totalBetAmount;
};

const getWinner = (balanceChange: number) => {
  if (balanceChange > 0) return EWinner.PLAYER;
  if (balanceChange < 0) return EWinner.COMPUTER;
  return EWinner.DRAW;
};

export const { placeBet, playGame, resetGame, clearBets } = gameSlice.actions;

export default gameSlice.reducer;
