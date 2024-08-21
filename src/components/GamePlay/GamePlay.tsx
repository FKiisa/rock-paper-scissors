import "./GamePlay.css";
import { useDispatch, useSelector } from "react-redux";
import { gameResultSelector, gameStateSelector } from "../../state/selectors";
import { useEffect, useRef, useState } from "react";
import { GameResult } from "../GameResult/GameResult";
import { resetGame, roundEnd } from "../../state/gameSlice";
import { EGameState } from "../../types/Types";
import { useTranslation } from "../../hooks/useTranslations";

export const GamePlay = () => {
  const gameResult = useSelector(gameResultSelector);
  const gameState = useSelector(gameStateSelector);
  const [showResult, setShowResult] = useState(false);
  const resetCalledRef = useRef(false);
  const dispatch = useDispatch();
  const t = useTranslation();

  useEffect(() => {
    if (gameState === EGameState.PLAY) {
      const timer = setTimeout(() => {
        dispatch(roundEnd());
        setShowResult(true);
      }, 3500);

      return () => clearTimeout(timer);
    }
  }, [gameState, dispatch]);

  const handleOnReset = () => {
    if (resetCalledRef.current || gameState !== EGameState.ENDED) return;
    resetCalledRef.current = true;
    setShowResult(false);
    dispatch(resetGame());
  };

  if (!gameResult) {
    return <></>;
  }

  const { playerBets, computerChoice } = gameResult;
  const playerChoice = playerBets.reduce((highest, current) => {
    return current.amount > highest.amount ? current : highest;
  });
  return (
    <>
      {!showResult && (
        <div className="gameWrapper">
          <div className="common player">
            <p className="choiceLabel">{t(playerChoice?.position)}</p>
            <p className="hintLabel">{t("player")}</p>
          </div>
          <p className="versusLabel">{t("VS")}</p>
          <div className="common computer">
            <p className="choiceLabel">{t(computerChoice)}</p>
            <p className="hintLabel">{t("computer")}</p>
          </div>
        </div>
      )}
      {showResult && (
        <GameResult result={gameResult} onReset={() => handleOnReset()} />
      )}
    </>
  );
};
