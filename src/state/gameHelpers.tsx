import { EBetPosition, EWinner, TBetItem, TGameResult } from "../types/Types";

const WINNING_COMBINATIONS = {
  [EBetPosition.ROCK]: EBetPosition.SCISSORS,
  [EBetPosition.PAPER]: EBetPosition.ROCK,
  [EBetPosition.SCISSORS]: EBetPosition.PAPER,
};

export const getWinner = (balanceChange: number): EWinner => {
  if (balanceChange > 0) return EWinner.PLAYER;
  if (balanceChange < 0) return EWinner.COMPUTER;
  return EWinner.DRAW;
};

export const determineGameResult = (
  playerBets: TBetItem[],
  computerChoice: EBetPosition,
  balanceChange: number
): TGameResult => {
  return {
    playerBets,
    computerChoice,
    balanceChange,
    winner: getWinner(balanceChange),
  };
};

export const getRandomChoice = (): EBetPosition => {
  const choices: EBetPosition[] = [
    EBetPosition.ROCK,
    EBetPosition.PAPER,
    EBetPosition.SCISSORS,
  ];
  return choices[Math.floor(Math.random() * choices.length)];
};

const isWinningBet = (
  bet: EBetPosition,
  computerChoice: EBetPosition
): boolean => {
  return WINNING_COMBINATIONS[bet] === computerChoice;
};

const isDraw = (bet: EBetPosition, computerChoice: EBetPosition): boolean => {
  return bet === computerChoice;
};

const calculateSingleBetResult = (
  bet: TBetItem,
  computerChoice: EBetPosition
): number => {
  if (isDraw(bet.position, computerChoice)) {
    return bet.amount;
  }
  if (isWinningBet(bet.position, computerChoice)) {
    return bet.amount * 14;
  }
  return 0;
};

const calculateDoubleBetResult = (
  firstBet: TBetItem,
  secondBet: TBetItem,
  computerChoice: EBetPosition
): number => {
  const firstBetWins = isWinningBet(firstBet.position, computerChoice);
  const secondBetWins = isWinningBet(secondBet.position, computerChoice);

  const firstBetDraws = isDraw(firstBet.position, computerChoice);
  const secondBetDraws = isDraw(secondBet.position, computerChoice);

  if (firstBetWins) {
    return firstBet.amount * 3;
  } else if (secondBetWins) {
    return secondBet.amount * 3;
  }

  // If one of the bets draws, we ignore it and do not return any payout
  if (firstBetDraws || secondBetDraws) {
    return 0;
  }

  return 0; // Loss
};

export const calculateBalanceChange = (
  bets: TBetItem[],
  computerChoice: EBetPosition
): number => {
  let balanceChange = 0;

  if (bets.length === 1) {
    balanceChange = calculateSingleBetResult(bets[0], computerChoice);
  } else if (bets.length === 2) {
    balanceChange = calculateDoubleBetResult(bets[0], bets[1], computerChoice);
  }

  const totalBetAmount = bets.reduce((sum, bet) => sum + bet.amount, 0);
  return balanceChange - totalBetAmount;
};
