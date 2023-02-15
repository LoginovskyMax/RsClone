import { Routes, Route } from "react-router-dom";

import "./App.scss";
import Games from "./Pages/Games/Games";
import StarsView from "./Pages/Games/StarsView/StarsView";
import MainPage from "./Pages/MainPage";
import MemoryGame from "./Pages/MemoryGame/MemoryGame";
import NotFound from "./Pages/NotFound/NotFound";
import PreviewPage from "./Pages/PreviewPage/PreviewPage";
import { SeaBattle } from "./Pages/SeaBattle/SeaBattle";
import StartPage from "./Pages/StartPage";

const App = () => (
  <div className="App">
    <Routes>
      <Route path="/" element={<StartPage />} />
      <Route path="/main" element={<MainPage />} />
      <Route path="/Memorygame" element={<MemoryGame />} />
      {/* <Route path="/login" element={<LoginPage />} /> */}
      <Route path="/preview/:game" element={<PreviewPage />} />
      <Route path="/SeaBattle" element={<SeaBattle />} />
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

export default App;
