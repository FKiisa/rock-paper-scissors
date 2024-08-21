import { useEffect } from "react";
import { EWinner, TGameResult } from "../../types/Types";
import "./GameResult.css";
import { GameResultUtil } from "./utils/GameResult.util";

export type TGameResultProps = {
  result: TGameResult;
  onReset: () => void;
};

export const GameResult = ({ result, onReset }: TGameResultProps) => {
  const { balanceChange, winner, playerBets, computerChoice } = result;
  const winningHand = GameResultUtil.findWinningHand(
    playerBets,
    computerChoice
  );

  const getResultString = () => {
    if (winner === EWinner.DRAW) {
      return `DRAW WITH ${winningHand.winningHand}`;
    } else {
      return `${winner} WON WITH ${winningHand.winningHand}`;
    }
  };

  const getSubResultString = () => {
    if (winner === EWinner.DRAW) {
      return `YOU GET`;
    } else if (winner === EWinner.PLAYER) {
      return `YOU WIN`;
    } else {
      return `YOU LOSE`;
    }
  };

  const getWinAmount = () => {
    if (winner === EWinner.DRAW) return "MONEY BACK";
    else {
      return Intl.NumberFormat("en-EN", {
        style: "currency",
        currency: "EUR",
      }).format(balanceChange);
    }
  };

  useEffect(() => {
    setTimeout(() => {
      onReset();
    }, 3500);
  }, [onReset]);

  return (
    <div className="gameResult">
      <p className={`gameResultText ${winningHand.winner.toLowerCase()}`}>
        {getResultString()}
      </p>
      <div className="resultContainer">
        <p className="gameResultText winLose">{getSubResultString()}</p>
        <p className="gameResultText amount">{getWinAmount()}</p>
      </div>
    </div>
  );
};
