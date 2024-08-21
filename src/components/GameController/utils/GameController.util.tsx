import { EBetPosition, TBetItem } from "../../../types/Types";
import store from "../../../state/store";

export const getAllBetPositions = (): EBetPosition[] => {
  return [EBetPosition.ROCK, EBetPosition.PAPER, EBetPosition.SCISSORS];
};

export const getPositionColor = (position: EBetPosition): string => {
  switch (position) {
    case EBetPosition.ROCK:
      return "position-rock";
    case EBetPosition.PAPER:
      return "position-paper";
    case EBetPosition.SCISSORS:
      return "position-scissors";
    default:
      return "";
  }
};

export const getPositionsWithBet = (): TBetItem[] => {
  const playerBets = store.getState().game.playerBets;
  return playerBets;
};

export const getItemFromBet = (
  position: TBetItem[],
  winningHand: EBetPosition
): TBetItem | undefined => {
  return position.find((bet) => bet.position === winningHand);
};

export const canPlaceBet = (amount: number): boolean => {
  const playerBalance = store.getState().game.balance.value;
  const totalBetAmount = store.getState().game.bet.value;
  return playerBalance >= totalBetAmount + amount;
};

export * as GameControllerUtil from "./GameController.util";
