export enum EBetPosition {
  ROCK = "ROCK",
  PAPER = "PAPER",
  SCISSORS = "SCISSORS",
}

export enum EWinner {
  PLAYER = "PLAYER",
  COMPUTER = "COMPUTER",
  DRAW = "DRAW",
}

export type TWinnerItem = {
  winner: EWinner;
  winningHand: EBetPosition
}

export type TBetItem = {
  position: EBetPosition;
  amount: number;
};

export enum EGameState {
  START = "START",
  PLAY = "PLAY",
};

export type TGameResult = {
  playerBets: TBetItem[];
  computerChoice: EBetPosition;
  balanceChange: number;
  winner: EWinner;
};

export type TBalance = {
  itemName: string;
  value: number;
};

export type TWin = {
  itemName: string;
  value: number;
};

export type TBet = {
  itemName: string;
  value: number;
};

export type TComputerBet = {
  position: EBetPosition;
};

export enum EToolTipContent {
  BET_ON_POSITION = "Bet on a position to play",
  MAX_BETS_REACHED = "You can only bet on 2 positions at a time",
  INSUFFICIENT_FUNDS = "Insufficient funds to place the bet",
}

export enum EAmounts {
  BET_500 = 500,
  BET_1000 = 1000,
}
