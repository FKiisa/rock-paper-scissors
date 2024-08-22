import "./ErrorPage.css";
import { useTranslation } from "../../hooks/useTranslations";
import { GameIntroduction } from "../GameIntroduction/GameIntroduction";

export const ErrorPage = () => {
  const t = useTranslation();
  return (
    <div className="error-page-wrapper">
      <GameIntroduction />
      <div className="error-page">
        <h1>{t("generalError")}</h1>
        <p>{t("defaultErrorMessage")}</p>
        <button
          onClick={() => window.location.reload()}
          className="error-page-button"
        >
          {t("reloadPage")}
        </button>
      </div>
    </div>
  );
};

export default ErrorPage;
