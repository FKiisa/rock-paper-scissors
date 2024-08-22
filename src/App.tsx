import { AppBar } from "./components/AppBar/AppBar";
import { GameArea } from "./components/GameArea/GameArea";
import { GameController } from "./components/GameController/GameController";
import "./App.css";
import ErrorBoundary from "./components/ErrorBoundary/ErrorBoundary";

const App = () => {
  return (
    <ErrorBoundary>
      <div className="view">
        <div className="appBarWrapper">
          <AppBar />
        </div>
        <div className="gameAreaWrapper">
          <GameArea />
        </div>
        <div className="gameControlsWrapper">
          <GameController />
        </div>
      </div>
    </ErrorBoundary>
  );
};

export default App;
