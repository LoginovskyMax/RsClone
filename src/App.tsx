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

const App = () => (
  <div className="App">
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="/main" element={<Games />} />
      <Route path="/Memorygame" element={<MemoryGame />} />
      <Route path="/Tetris" element={<Tetris />} />
      <Route path="/preview/:game" element={<PreviewPage />} />
      <Route path="/room/:gameName" element={<CreateGame />} />
      <Route path="/SeaBattle/:id" element={<SeaBattle />} />
      <Route path="/games" element={<Games />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  </div>
);

export default App;
