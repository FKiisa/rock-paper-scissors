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

  if (firstBetDraws && secondBetDraws) {
    return firstBet.amount + secondBet.amount;
  }
  if (firstBetDraws || secondBetDraws) {
    if (firstBetWins || secondBetWins) {
      return (
        (firstBetWins ? firstBet.amount : secondBet.amount) * 3 +
        (firstBetDraws ? firstBet.amount : secondBet.amount)
      );
    }
    return firstBetDraws ? firstBet.amount : secondBet.amount;
  }
  if (firstBetWins || secondBetWins) {
    return (firstBetWins ? firstBet.amount : secondBet.amount) * 3;
  }
  return 0;
};

export const calculateBalanceChange = (
  bets: TBetItem[],
  computerChoice: EBetPosition
): number => {
  const totalBetAmount = bets.reduce((sum, bet) => sum + bet.amount, 0);
  let balanceChange = 0;

  if (bets.length === 1) {
    balanceChange = calculateSingleBetResult(bets[0], computerChoice);
  } else if (bets.length === 2) {
    balanceChange = calculateDoubleBetResult(bets[0], bets[1], computerChoice);
  }

  return balanceChange - totalBetAmount;
};
