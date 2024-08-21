import { EToolTipContent } from "../../types/Types";
import "./ToolTip.css";

export type ToolTipProps = {
  message?: EToolTipContent;
  onClose?: () => void;
};

export const ToolTip = ({
  message = EToolTipContent.BET_ON_POSITION,
  onClose,
}: ToolTipProps) => {
  return (
    <div className="toolTip">
      <button className="toolTipCancelButton" onClick={onClose}>X</button>
      <span className="toolTipText">{message}</span>
    </div>
  );
};
