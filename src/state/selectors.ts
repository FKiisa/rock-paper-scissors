import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "./store";

export const gameSelector = (state: RootState) => state.game;
export const balanceSelector = (state: RootState) => state.game.balance;
export const winSelector = (state: RootState) => state.game.win;
export const betSelector = (state: RootState) => state.game.bet;
export const playerBetsSelector = createSelector(
  gameSelector,
  (game) => game.playerBets
);
export const gameResultSelector = createSelector(
  gameSelector,
  (game) => game.gameResult
);
export const computerBetSelector = (state: RootState) => state.game.computerBet;
export const gameStateSelector = (state: RootState) => state.game.state;
