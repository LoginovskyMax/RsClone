import { Routes, Route } from "react-router-dom";

import "./App.scss";
import LoginPage from "./Pages/LoginPage";
import MainPage from "./Pages/MainPage";
import MemoryGame from "./Pages/MemoryGame/MemoryGame";
import PreviewPage from "./Pages/PreviewPage/PreviewPage";
import { CreateGame } from "./Pages/SeaBattle/CreateGame";
import { SeaBattle } from "./Pages/SeaBattle/SeaBattle";
import StartPage from "./Pages/StartPage";

const App = () => (
  <div className="App">
    <Routes>
      <Route path="/" element={<StartPage />} />
      <Route path="/main" element={<MainPage />} />
      <Route path="/Memorygame" element={<MemoryGame />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/preview/:game" element={<PreviewPage />} />
      <Route path="/SeaBattle" element={<CreateGame />} />
      <Route path="/SeaBattle/:id" element={<SeaBattle />} />
    </Routes>
  </div>
);

export default App;
