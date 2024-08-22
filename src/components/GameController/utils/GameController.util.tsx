import {
  EBetPosition,
  EGameState,
  EWinner,
  TBetItem,
  TWinnerItem,
} from "../../../types/Types";
import store from "../../../state/store";
import { GameResultUtil } from "../../GameResult/utils/GameResult.util";

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

export const getPlayerWinningPositions = (): TWinnerItem | null => {
  const gameResult = store.getState().game.gameResult;
  const gameState = store.getState().game.state;

  let winningHand: TWinnerItem | null = null;

  if (gameState === EGameState.ENDED && gameResult) {
    if (
      gameResult.winner === EWinner.PLAYER ||
      gameResult.winner === EWinner.DRAW
    ) {
      winningHand = GameResultUtil.findWinningHand(
        gameResult.playerBets,
        gameResult.computerChoice
      );
    }
  }

  return winningHand;
};

export * as GameControllerUtil from "./GameController.util";
