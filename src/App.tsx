import { Routes, Route } from "react-router-dom";

import "./App.scss";
import MainPage from "./Pages/MainPage";
import MemoryGame from "./Pages/MemoryGame";
import StartPage from "./Pages/StartPage";

const App = () => (
  <div className="App">
    <Routes>
      <Route path="/" element={<StartPage />} />
      <Route path="/main" element={<MainPage />} />
      <Route path="/memorygame" element={<MemoryGame />} />
    </Routes>
  </div>
);

export default App;
