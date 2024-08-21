import "./GamePlay.css";
import { useDispatch, useSelector } from "react-redux";
import { gameResultSelector } from "../../state/selectors";
import { useState } from "react";
import { GameResult } from "../GameResult/GameResult";
import { clearBets, resetGame } from "../../state/gameSlice";

export const GamePlay = () => {
  const gameResult = useSelector(gameResultSelector);
  const [showResult, setShowResult] = useState(false);
  const dispatch = useDispatch();
  if (!gameResult) {
    return <></>;
  }

  setTimeout(() => {
    setShowResult(true);
    dispatch(clearBets());
  }, 3500);

  const handleOnReset = () => {
    dispatch(resetGame());
    setShowResult(false);
  };

  const { playerBets, computerChoice } = gameResult;
  const playerChoice = playerBets.reduce((highest, current) => {
    return current.amount > highest.amount ? current : highest;
  });
  return (
    <>
      {!showResult && (
        <div className="gameWrapper">
          <div className="common player">
            <p className="choiceLabel">{playerChoice?.position}</p>
            <p className="hintLabel">player</p>
          </div>
          <p className="versusLabel">VS</p>
          <div className="common computer">
            <p className="choiceLabel">{computerChoice}</p>
            <p className="hintLabel">computer</p>
          </div>
        </div>
      )}
      {showResult && (
        <GameResult result={gameResult} onReset={() => handleOnReset()} />
      )}
    </>
  );
};
