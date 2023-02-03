import { Routes, Route } from "react-router-dom";

import "./App.scss";
import MainPage from "./pages/MainPage";
import StartPage from "./pages/StartPage";

const App = () => (
  <div className="App">
    <Routes>
      <Route path="/" element={<StartPage />} />
      <Route path="/main" element={<MainPage />} />
    </Routes>
  </div>
);

export default App;
