import { useTranslation } from "../../hooks/useTranslations";
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
  const t = useTranslation();
  return (
    <div className="toolTip">
      <button className="toolTipCancelButton" onClick={onClose}>
        X
      </button>
      <span className="toolTipText">{t(message)}</span>
    </div>
  );
};
