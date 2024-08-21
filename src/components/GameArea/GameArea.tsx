import { useSelector } from "react-redux";
import { computerBetSelector } from "../../state/selectors";
import { GameIntroduction } from "../GameIntroduction/GameIntroduction";
import { GamePlay } from "../GamePlay/GamePlay";

export const GameArea = () => {
  let computerBet = useSelector(computerBetSelector);

  return (
    <>
      {!computerBet && <GameIntroduction />}
      {computerBet && <GamePlay />}
    </>
  );
};
