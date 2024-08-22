import { useTranslation } from "../../hooks/useTranslations";
import { EWinner, TGameResult } from "../../types/Types";
import "./GameResult.css";
import { GameResultUtil } from "./utils/GameResult.util";

export type TGameResultProps = {
  result: TGameResult;
  onReset: () => void;
};

export const GameResult = ({ result, onReset }: TGameResultProps) => {
  const { balanceChange, winner, playerBets, computerChoice } = result;
  const t = useTranslation();
  const winningHand = GameResultUtil.findWinningHand(
    playerBets,
    computerChoice
  );

  const getResultString = () => {
    if (winner === EWinner.DRAW) {
      return `${t("drawWith")} ${t(winningHand.winningHand)}`;
    } else {
      return `${t(winner)} ${t("wonWith")} ${t(winningHand.winningHand)}`;
    }
  };

  const getSubResultString = () => {
    if (winner === EWinner.DRAW) {
      return `${t("youGet")}`;
    } else if (winner === EWinner.PLAYER) {
      return `${t("youWin")}`;
    } else {
      return `${t("youLose")}`;
    }
  };

  const getWinAmount = () => {
    if (winner === EWinner.DRAW) return t("moneyBack");
    else {
      return Intl.NumberFormat("en-EN", {
        style: "currency",
        currency: "EUR",
      }).format(balanceChange);
    }
  };

  setTimeout(() => {
    throw new Error("Test error!");
    onReset();
  }, 3500);

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
