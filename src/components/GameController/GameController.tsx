import { GameControllerUtil } from "./utils/GameController.util";
import "./GameController.css";
import { BetChip } from "../BetChip/BetChip";
import { useDispatch, useSelector } from "react-redux";
import {
  EAmounts,
  EBetPosition,
  EGameState,
  EToolTipContent,
} from "../../types/Types";
import { placeBet, playGame, resetGame } from "../../state/gameSlice";
import {
  betSelector,
  gameStateSelector,
  playerBetsSelector,
} from "../../state/selectors";
import { useState } from "react";
import { ToolTip } from "../Tooltip/ToolTip";

export const GameController = () => {
  const [showTooltip, setShowTooltip] = useState(false);
  const [toolTipMessage, setToolTipMessage] = useState<EToolTipContent>(
    EToolTipContent.BET_ON_POSITION
  );
  const playerBets = useSelector(playerBetsSelector);
  const gameState = useSelector(gameStateSelector);
  const isPlayState = gameState === EGameState.PLAY;
  const getBetPositions = GameControllerUtil.getAllBetPositions();
  const getPositionsWithBet = GameControllerUtil.getPositionsWithBet();
  const canPlaceBet = GameControllerUtil.canPlaceBet(EAmounts.BET_500);
  const bets = useSelector(betSelector);
  const dispatch = useDispatch();
  // Handles adding new bets
  const handleBet = (position: EBetPosition) => {
    if (!canPlaceBet) {
      setToolTipMessage(EToolTipContent.INSUFFICIENT_FUNDS);
      setShowTooltip(true);
      return;
    }
    const positionsWithBets = getPositionsWithBet;
    const isAlreadyBetOn = positionsWithBets.some(
      (bet) => bet.position === position
    );

    // If already bet on this position, allow placing the bet
    if (isAlreadyBetOn) {
      dispatch(placeBet({ amount: EAmounts.BET_500, position }));
      setShowTooltip(false);
      return;
    }

    // If trying to bet on a third different position, show the tooltip
    if (positionsWithBets.length >= 2) {
      setToolTipMessage(EToolTipContent.MAX_BETS_REACHED);
      setShowTooltip(true);
      return;
    }
    dispatch(placeBet({ amount: EAmounts.BET_500, position }));
    setShowTooltip(false);
  };

  // Handles reset button click
  const handleReset = () => {
    dispatch(resetGame());
    setShowTooltip(false);
  };

  // Handles play button click
  const handlePlay = () => {
    if (bets.value === 0) {
      setShowTooltip(true);
    } else {
      dispatch(playGame());
      setShowTooltip(false);
    }
  };

  const handleOnToolTipClose = () => {
    setShowTooltip(false);
  };

  const getBetForPosition = (position: EBetPosition) => {
    const betPosition = playerBets.filter((bet) => bet.position === position);
    return betPosition.length > 0 ? betPosition[0].amount : 0;
  };
  return (
    <>
      <div className="gameControls">
        <div className="betContainer">
          {!isPlayState && (
            <div className="betContainerTitle">
              <p>Pick your positions</p>
            </div>
          )}
          {getBetPositions.map((position, index) => (
            <button
              key={index + position}
              className={`betPosition ${GameControllerUtil.getPositionColor(
                position
              )}`}
              disabled={isPlayState}
              onClick={() => handleBet(position)}
            >
              <div className="betItem">
                <div className="betChipWrapper">
                  <BetChip
                    amount={getBetForPosition(position)}
                    position={position}
                  />
                </div>
                <p className="betItemPositionName">{position}</p>
              </div>
            </button>
          ))}
        </div>
        <div className="actionContainer">
          <button
            className="action-item"
            disabled={isPlayState}
            onClick={() => handlePlay()}
          >
            Play
          </button>
          {(bets.value > 0 && !isPlayState) && (
            <button className="action-item" onClick={() => handleReset()}>
              Clear
            </button>
          )}
        </div>
      </div>
      {showTooltip && (
        <ToolTip
          message={toolTipMessage}
          onClose={() => handleOnToolTipClose()}
        />
      )}
    </>
  );
};
