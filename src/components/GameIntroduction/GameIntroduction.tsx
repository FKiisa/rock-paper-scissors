import { useTranslation } from "../../hooks/useTranslations";
import "./GameIntroduction.css";

export const GameIntroduction = () => {
  const t = useTranslation()
  return (
    <div className="gameIntroductionWrapper">
      <p className="demoLabel">{t("rock")}</p>
      <p className="demoLabel">{t("paper")}</p>
      <p className="demoLabel">{t("scissors")}</p>
    </div>
  );
};
