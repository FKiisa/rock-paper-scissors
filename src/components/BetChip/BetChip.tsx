import { BetChipUtils } from "./utils/BetChip.util";
import "./BetChip.css";
import { EBetPosition } from "../../types/Types";
import { getPositionColor } from "../GameController/utils/GameController.util";

export type BetChipProps = {
  amount: number;
  position: EBetPosition;
};

export const BetChip = ({ amount, position }: BetChipProps) => {
  if (amount === 0) return <></>;
  return (
    <div className="betChip">
      <div className={`betChipAmount ${getPositionColor(position)}`}>
        <p>{BetChipUtils.getChipFormattedValue(amount)}</p>
      </div>
    </div>
  );
};
