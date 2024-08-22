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
  // If the player placed two bets, find the one with the best outcome
  if (playerBets.length === 2) {
    const [firstBet, secondBet] = playerBets;

    const firstBetWins = isWinningBet(firstBet.position, computerBet);
    const secondBetWins = isWinningBet(secondBet.position, computerBet);

    const firstBetDraws = isDraw(firstBet.position, computerBet);
    const secondBetDraws = isDraw(secondBet.position, computerBet);

    if (firstBetWins) {
      return { winner: EWinner.PLAYER, winningHand: firstBet.position };
    } else if (secondBetWins) {
      return { winner: EWinner.PLAYER, winningHand: secondBet.position };
    } else if (firstBetDraws) {
      return { winner: EWinner.DRAW, winningHand: firstBet.position };
    } else if (secondBetDraws) {
      return { winner: EWinner.DRAW, winningHand: secondBet.position };
    }
  }

  // If the player placed only one bet, determine the result based on that bet
  const strongestBet = playerBets[0];
  return calculateWinner(strongestBet.position, computerBet);
};

const calculateWinner = (
  playerHand: EBetPosition,
  computerHand: EBetPosition
): TWinnerItem => {
  if (playerHand === computerHand) {
    return { winner: EWinner.DRAW, winningHand: playerHand };
  }
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

export const findMostCompatibleBet = (
  playerBets: TBetItem[],
  computerChoice: EBetPosition
): TBetItem => {
  // Check if one of the bets wins or draws, otherwise return the first bet
  const winningBet = playerBets.find((bet) =>
    isWinningBet(bet.position, computerChoice)
  );
  const drawingBet = playerBets.find((bet) =>
    isDraw(bet.position, computerChoice)
  );

  return winningBet || drawingBet || playerBets[0]; // Return the most compatible bet or fallback to the first bet
};

const isWinningBet = (
  playerHand: EBetPosition,
  computerHand: EBetPosition
): boolean => {
  return (
    (playerHand === EBetPosition.ROCK &&
      computerHand === EBetPosition.SCISSORS) ||
    (playerHand === EBetPosition.PAPER && computerHand === EBetPosition.ROCK) ||
    (playerHand === EBetPosition.SCISSORS &&
      computerHand === EBetPosition.PAPER)
  );
};

const isDraw = (
  playerHand: EBetPosition,
  computerHand: EBetPosition
): boolean => {
  return playerHand === computerHand;
};

export * as GameResultUtil from "./GameResult.util";
