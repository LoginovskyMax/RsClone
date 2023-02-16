import { Routes, Route } from "react-router-dom";

import "./App.scss";
import Games from "./Pages/Games/Games";
import MainPage from "./Pages/MainPage";
import MemoryGame from "./Pages/MemoryGame/MemoryGame";
import NotFound from "./Pages/NotFound/NotFound";
import PreviewPage from "./Pages/PreviewPage/PreviewPage";
import { CreateGame } from "./Pages/SeaBattle/CreateGame";
import { SeaBattle } from "./Pages/SeaBattle/SeaBattle";
import StartPage from "./Pages/StartPage";
import Tetris from "./Pages/Tetris";
import themeStore from "./store/theme";

const App = () => {
  const isDark = themeStore((state)=>state.isDark)

  return (
    <div className={isDark ? "darkApp" : "App"}>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/main" element={<StartPage />} />
        <Route path="/Memorygame" element={<MemoryGame />} />
        <Route path="/tetris" element={<Tetris />} />
        <Route path="/preview/:game" element={<PreviewPage />} />
        <Route path="/room/:gameName" element={<CreateGame />} />
        <Route path="/SeaBattle/:id" element={<SeaBattle />} />
        <Route path="/games" element={<Games />} />
        <Route
          path="/qwe"
          element={
            <StarsView
              rating={2.8}
              canSet
              getSettedRating={() => 8}
              setCallback={(val) => alert(val)}
            />
          }
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
