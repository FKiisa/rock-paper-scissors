import {
  EBetPosition,
  EWinner,
  TBetItem,
  TWinnerItem,
} from "../../../types/Types";

export const findWinningHand = (
  playerBets: TBetItem[],
  computerBet: EBetPosition
): TWinnerItem => {
  // Find the player's strongest hand (the bet with the highest amount)
  const strongestBet = playerBets.reduce((highest, current) => {
    return current.amount > highest.amount ? current : highest;
  });

  // Determine the winner using the strongest hand and the computer's bet
  return calculateWinner(strongestBet.position, computerBet);
};

const calculateWinner = (
  playerHand: EBetPosition,
  computerHand: EBetPosition
): TWinnerItem => {
  if (playerHand === computerHand)
    return { winner: EWinner.DRAW, winningHand: playerHand };
  if (
    (playerHand === EBetPosition.ROCK &&
      computerHand === EBetPosition.SCISSORS) ||
    (playerHand === EBetPosition.PAPER && computerHand === EBetPosition.ROCK) ||
    (playerHand === EBetPosition.SCISSORS &&
      computerHand === EBetPosition.PAPER)
  ) {
    return { winner: EWinner.PLAYER, winningHand: playerHand };
  }
  return { winner: EWinner.COMPUTER, winningHand: computerHand };
};

export * as GameResultUtil from "./GameResult.util";
